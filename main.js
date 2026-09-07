/* ==========================================================================
   Watillery homepage behaviour: navigation, modals, auth, contact, events.
   Product catalogue lives on watillery.com/shop/ and is not rendered here.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeModals();
    initializeContactForm();
    initializeNewsletter();
    initializeCheckout();
    initializeAuth();
    initializeEmailVerification();
    createBubbles();
});

if (window.console) {
    setTimeout(() => {
        console.log(
            '%c STOP ',
            'color:#ffeb53; background:#006aff; font-size:40px; font-weight:bold; padding:8px 16px; border-radius:6px;'
        );
        console.log(
            '%cThis browser feature is for developers.\nWatillery will never ask you to paste anything here.',
            'color:#ffeb53; background:#006aff; font-size:15px; padding:6px 12px; border-radius:6px;'
        );
    }, 1000);
}

/* ==========================================================================
   Authentication (client-side stub)
   ========================================================================== */

class AuthSystem {
    constructor() {
        this.currentUser = this.loadCurrentUser();
        this.pendingVerification = null;
    }

    loadCurrentUser() {
        try {
            const session = JSON.parse(localStorage.getItem('watillery_session'));
            if (!session) return null;
            if (new Date(session.expiresAt) <= new Date()) {
                localStorage.removeItem('watillery_session');
                return null;
            }
            return secureDB.sanitizeUser(secureDB.findUserById(session.userId));
        } catch (e) {
            return null;
        }
    }

    createSession(user, remember = false) {
        const days = remember ? 30 : 1;
        localStorage.setItem(
            'watillery_session',
            JSON.stringify({
                userId: user.id,
                expiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
            })
        );
        this.currentUser = secureDB.sanitizeUser(user);
        this.updateUI();
    }

    async login(identifier, password, remember = false) {
        const user = secureDB.findUserByIdentifier(identifier.trim());
        if (!user || user.provider === 'google') {
            throw new Error('Invalid username / email or password');
        }
        if (user.password_hash !== secureDB.hashPassword(password, user.salt)) {
            throw new Error('Invalid username / email or password');
        }
        if (!user.email_verified) {
            throw new Error('Please verify your email address before signing in.');
        }
        secureDB.updateUser(user.id, { last_login: new Date().toISOString() });
        this.createSession(user, remember);
        return this.currentUser;
    }

    async register({ username, email, password, confirmPassword }) {
        username = (username || '').trim();
        email = (email || '').trim().toLowerCase();

        if (username.length < 3) throw new Error('Username must be at least 3 characters');
        if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
            throw new Error('Username can only use letters, numbers, and . _ -');
        }
        if (!this.validateEmail(email)) throw new Error('Please enter a valid email address');

        const passwordCheck = this.validatePassword(password);
        if (!passwordCheck.isValid) throw new Error(passwordCheck.errors[0]);
        if (password !== confirmPassword) throw new Error('Passwords do not match');

        if (secureDB.findUserByUsername(username)) throw new Error('That username is taken');
        if (secureDB.findUserByEmail(email)) {
            throw new Error('An account with this email already exists');
        }

        const salt = secureDB.generateSalt();
        const user = secureDB.insertUser({
            id: secureDB.generateId(),
            username,
            email,
            password_hash: secureDB.hashPassword(password, salt),
            salt,
            first_name: '',
            last_name: '',
            role: 'user',
            provider: 'password',
            email_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_login: null,
        });

        const verification = secureDB.createEmailVerification(user.id);
        let emailResult = { success: false, verificationUrl: null };
        try {
            emailResult = await emailService.sendVerificationEmail(
                user.email,
                username,
                verification.token
            );
        } catch (e) {
            /* email service optional in demo mode */
        }
        const verificationUrl =
            emailResult.verificationUrl ||
            `${window.location.origin}${window.location.pathname}?token=${verification.token}`;

        this.pendingVerification = { userId: user.id, email: user.email };
        return { user: secureDB.sanitizeUser(user), emailSent: !!emailResult.success, verificationUrl };
    }

    async registerWithGoogle(mode) {
        // Placeholder for Google Identity Services. Wire a real OAuth client id
        // and token verification here, then create/lookup the user below.
        throw new Error(
            'Google sign-in is not configured yet. Add a Google OAuth client id to enable it.'
        );
    }

    async verifyEmail(token) {
        const verification = secureDB.findEmailVerification(token);
        if (!verification) throw new Error('Invalid or expired verification link');
        const user = secureDB.updateUser(verification.user_id, { email_verified: true });
        secureDB.deleteEmailVerification(token);
        if (!user) throw new Error('Account not found');
        this.createSession(user);
        return this.currentUser;
    }

    async resendVerificationEmail() {
        if (!this.pendingVerification) throw new Error('Nothing pending');
        const user = secureDB.findUserById(this.pendingVerification.userId);
        if (!user) throw new Error('Account not found');
        if (user.email_verified) throw new Error('Email already verified');
        const verification = secureDB.createEmailVerification(user.id);
        try {
            return await emailService.sendVerificationEmail(
                user.email,
                user.username,
                verification.token
            );
        } catch (e) {
            return { success: false };
        }
    }

    requestPasswordReset(identifier) {
        const user = secureDB.findUserByIdentifier((identifier || '').trim());
        // Always report success so we don't leak which accounts exist.
        if (user && user.provider !== 'google') {
            const token = secureDB.generateToken();
            const rows = secureDB.getTable('password_reset');
            rows.push({ user_id: user.id, token, created_at: new Date().toISOString() });
            secureDB.saveTable('password_reset', rows);
            try {
                emailService.sendPasswordResetEmail(user.email, token);
            } catch (e) {
                /* optional */
            }
        }
        return true;
    }

    validatePassword(password) {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters');
        if (!/[A-Z]/.test(password)) errors.push('Password needs an uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('Password needs a lowercase letter');
        if (!/\d/.test(password)) errors.push('Password needs a number');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password needs a special character');
        return { isValid: errors.length === 0, errors, strength: this.passwordStrength(password) };
    }

    passwordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    logout() {
        localStorage.removeItem('watillery_session');
        this.currentUser = null;
        this.pendingVerification = null;
        this.updateUI();
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    isAdmin() {
        return (
            this.isAuthenticated() &&
            (this.currentUser.role === 'admin' || secureDB.isAdminEmail(this.currentUser.email))
        );
    }

    displayName() {
        if (!this.currentUser) return '';
        return this.currentUser.first_name || this.currentUser.username || this.currentUser.email;
    }

    updateUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.querySelector('.user-menu');

        if (this.isAuthenticated()) {
            if (authButtons) authButtons.hidden = true;
            if (userMenu) {
                userMenu.hidden = false;
                this.updateUserMenu();
            }
        } else {
            if (authButtons) authButtons.hidden = false;
            if (userMenu) userMenu.hidden = true;
        }

        if (window.adminPanel) adminPanel.updateAdminMenuVisibility();
    }

    updateUserMenu() {
        const u = this.currentUser;
        const set = (sel, val) => {
            const el = document.querySelector(sel);
            if (el) el.textContent = val;
        };
        set('.user-display-name', this.displayName());
        set('.user-name', u.first_name ? `${u.first_name} ${u.last_name}`.trim() : u.username);
        set('.user-email', u.email);
        set('.user-initial', this.displayName().charAt(0).toUpperCase());
        const badge = document.querySelector('.admin-badge');
        if (badge) badge.hidden = !this.isAdmin();
    }
}

const authSystem = new AuthSystem();

function initializeAuth() {
    authSystem.updateUI();

    // Tab switching
    document.querySelectorAll('.auth-tab').forEach((tab) => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });

    // Open / close
    document.querySelectorAll('.open-login').forEach((btn) =>
        btn.addEventListener('click', () => openAuthModal('login'))
    );
    const closeAuthBtn = document.getElementById('closeAuth');
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);

    // Password reveal
    document.querySelectorAll('.password-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            if (!input) return;
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            btn.querySelector('.material-symbols-rounded').textContent = show
                ? 'visibility_off'
                : 'visibility';
            btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        });
    });

    // Forgot password
    document.querySelectorAll('.forgot-password').forEach((btn) => {
        btn.addEventListener('click', () => {
            const guess = document.getElementById('loginIdentifier').value;
            const identifier = window.prompt(
                'Enter the username or email on your account and we will send a reset link.',
                guess || ''
            );
            if (identifier === null) return;
            authSystem.requestPasswordReset(identifier);
            showNotification(
                'If that account exists, a password reset link is on its way.',
                'info'
            );
        });
    });

    // Google (stub)
    document.querySelectorAll('.google-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            try {
                await authSystem.registerWithGoogle(btn.dataset.mode);
            } catch (e) {
                showNotification(e.message, 'warning');
            }
        });
    });

    // Login submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(loginForm);
            const btn = loginForm.querySelector('button[type="submit"]');
            const err = loginForm.querySelector('.error-message');
            try {
                btn.disabled = true;
                btn.textContent = 'Signing In...';
                if (err) err.hidden = true;
                await authSystem.login(
                    data.get('identifier'),
                    data.get('password'),
                    data.get('remember') === 'on'
                );
                closeAuthModal();
                showNotification(`Welcome back, ${authSystem.displayName()}!`, 'success');
            } catch (error) {
                if (err) {
                    err.textContent = error.message;
                    err.hidden = false;
                }
            } finally {
                btn.disabled = false;
                btn.textContent = 'Sign In';
            }
        });
    }

    // Register submit
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const pw = registerForm.querySelector('input[name="password"]');
        if (pw) pw.addEventListener('input', () => updatePasswordStrength(pw.value));

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(registerForm);
            const btn = registerForm.querySelector('button[type="submit"]');
            const err = registerForm.querySelector('.error-message');
            try {
                btn.disabled = true;
                btn.textContent = 'Creating Account...';
                if (err) err.hidden = true;
                const result = await authSystem.register({
                    username: data.get('username'),
                    email: data.get('email'),
                    password: data.get('password'),
                    confirmPassword: data.get('confirmPassword'),
                });
                registerForm.reset();
                updatePasswordStrength('');
                showVerifyStep(result.user.email, result.emailSent ? null : result.verificationUrl);
            } catch (error) {
                if (err) {
                    err.textContent = error.message;
                    err.hidden = false;
                }
            } finally {
                btn.disabled = false;
                btn.textContent = 'Create Account';
            }
        });
    }

    // Verify step buttons
    const verifyDone = document.querySelector('.verify-done');
    if (verifyDone) verifyDone.addEventListener('click', closeAuthModal);
    const verifyResend = document.querySelector('.verify-resend');
    if (verifyResend) {
        verifyResend.addEventListener('click', async () => {
            const result = await authSystem.resendVerificationEmail();
            showNotification(
                result && result.success
                    ? 'Verification email sent again.'
                    : 'Could not resend right now, try later.',
                result && result.success ? 'success' : 'error'
            );
        });
    }

    // Logout + dropdown toggle
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authSystem.logout();
            showNotification('Signed out.', 'info');
        });
    }
    const userNameBtn = document.querySelector('.user-name-btn');
    if (userNameBtn) {
        userNameBtn.addEventListener('click', () =>
            document.querySelector('.user-menu').classList.toggle('open')
        );
    }
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('loginFormContainer').hidden = tab !== 'login';
    document.getElementById('registerFormContainer').hidden = tab !== 'register';
    document.getElementById('verifyContainer').hidden = true;
    document.querySelectorAll('.auth-tabs').forEach((el) => (el.hidden = false));
}

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    switchAuthTab(mode === 'register' ? 'register' : 'login');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showVerifyStep(email, demoUrl) {
    document.getElementById('loginFormContainer').hidden = true;
    document.getElementById('registerFormContainer').hidden = true;
    document.querySelectorAll('.auth-tabs').forEach((el) => (el.hidden = true));
    const verify = document.getElementById('verifyContainer');
    verify.hidden = false;
    verify.querySelector('.verify-email').textContent = email;
    const demo = verify.querySelector('.verify-demo-link');
    if (demoUrl) {
        demo.hidden = false;
        demo.innerHTML = `Demo mode link: <a href="${demoUrl}">${demoUrl}</a>`;
    } else {
        demo.hidden = true;
    }
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updatePasswordStrength(password) {
    const bars = document.querySelectorAll('#registerForm .strength-bar');
    if (!bars.length) return;
    const { strength } = authSystem.validatePassword(password);
    const levels = { weak: 1, medium: 2, strong: 3 };
    const level = password ? levels[strength] || 0 : 0;
    bars.forEach((bar, i) => {
        bar.classList.remove('active', 'weak', 'medium');
        if (i < level) bar.classList.add('active', strength);
    });
}

function initializeEmailVerification() {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) return;
    authSystem
        .verifyEmail(token)
        .then((user) => {
            const url = new URL(window.location);
            url.searchParams.delete('token');
            window.history.replaceState({}, document.title, url);
            showNotification(`Email verified. You are signed in, ${authSystem.displayName()}.`, 'success');
        })
        .catch((e) => showNotification(`Verification failed: ${e.message}`, 'error'));
}

/* ==========================================================================
   Navigation
   ========================================================================== */

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const raw = this.getAttribute('href');
            if (!raw || raw === '#' || raw === '') return;
            const [path, hash] = raw.split('#');
            if (!hash) return;
            // Only hijack links that point at a section on THIS page.
            const samePage = path === '' || path === currentPath || path === './' + currentPath;
            if (!samePage) return;
            const target = document.getElementById(hash);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            history.replaceState(null, '', '#' + hash);
        });
    });

    // Close the user dropdown on outside click
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('.user-menu');
        if (menu && !menu.contains(e.target)) menu.classList.remove('open');
    });
}

/* ==========================================================================
   Modals (cart, product, team, auth backdrop)
   ========================================================================== */

function initializeModals() {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');
    const teamModal = document.getElementById('teamModal');
    const authModal = document.getElementById('authModal');

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', () => {
            if (typeof renderCartItems === 'function') renderCartItems();
            cartModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMap = [
        ['closeCart', cartModal],
        ['closeProduct', productModal],
        ['closeTeam', teamModal],
    ];
    closeMap.forEach(([id, modal]) => {
        const btn = document.getElementById(id);
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });

    const teamLink = document.getElementById('teamLink');
    if (teamLink && teamModal) {
        teamLink.addEventListener('click', (e) => {
            e.preventDefault();
            teamModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    window.addEventListener('click', (event) => {
        [cartModal, productModal, teamModal, authModal].forEach((modal) => {
            if (modal && event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        [cartModal, productModal, teamModal, authModal].forEach((modal) => {
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

/* ==========================================================================
   Contact + newsletter
   ========================================================================== */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const done = (ok) => {
            showNotification(
                ok ? 'Message sent successfully!' : 'Error sending message. Please try again.',
                ok ? 'success' : 'error'
            );
            if (ok) contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        };

        if (window.emailjs) {
            emailjs
                .sendForm('service_fymwtjg', 'template_nwy232w', this)
                .then(() => done(true))
                .catch((err) => {
                    console.error('Email send failed:', err);
                    done(false);
                });
        } else {
            done(true);
        }
    });
}

function initializeNewsletter() {
    document.querySelectorAll('.newsletter').forEach((form) => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            if (!emailInput || !emailInput.value) return;
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            try {
                await new Promise((r) => setTimeout(r, 800));
                showNotification('Subscribed. Thanks for joining the list!', 'success');
                emailInput.value = '';
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    });
}

/* ==========================================================================
   Checkout (demo)
   ========================================================================== */

function initializeCheckout() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('checkout-btn')) {
            e.preventDefault();
            showCheckoutForm();
        }
    });
}

function showCheckoutForm() {
    if (typeof cart === 'undefined' || cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content checkout-form">
            <div class="modal-header">
                <h3>Checkout</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove(); document.body.style.overflow='auto';">
                    <span class="material-symbols-rounded">close</span>
                </button>
            </div>
            <form id="checkoutForm" class="checkout-form-content">
                <div class="form-section">
                    <h4>Customer Information</h4>
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="email" name="email" placeholder="Email Address" required>
                    <input type="tel" name="phone" placeholder="Phone Number (Optional)">
                </div>
                <div class="order-summary-section">
                    <h4>Order Summary</h4>
                    <div class="checkout-items">
                        ${cart
                            .map(
                                (item) => `
                            <div class="checkout-item">
                                <img src="${item.image}" alt="${item.name}">
                                <div class="item-details">
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-color">
                                        <span class="color-dot" style="background-color:${item.colorHex}"></span>
                                        ${item.selectedColor}
                                    </div>
                                    <div class="item-quantity">Qty: ${item.quantity}</div>
                                </div>
                                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>`
                            )
                            .join('')}
                    </div>
                    ${(() => {
                        const sub = getCartSubtotal();
                        const disc = typeof currentDiscount === 'function' ? currentDiscount(sub) : null;
                        return disc
                            ? `<div class="checkout-line"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
                               <div class="checkout-line discount"><span>Discount (${disc.code})</span><span>-$${disc.amount.toFixed(2)}</span></div>`
                            : '';
                    })()}
                    <div class="checkout-total"><strong>Total: $${getCartTotal().toFixed(2)}</strong></div>
                </div>
                <button type="submit" class="checkout-submit-btn">Complete Order</button>
            </form>
        </div>`;
    document.body.appendChild(modal);

    modal.querySelector('#checkoutForm').addEventListener('submit', function (e) {
        e.preventDefault();
        modal.remove();
        document.body.style.overflow = 'auto';
        showNotification('Order placed successfully! (Demo mode)', 'success');
        cart.length = 0;
        if (typeof appliedPromo !== 'undefined') appliedPromo.clear();
        updateCartCount();
        saveCart();
    });
}

/* ==========================================================================
   Notifications, bubbles, scroll polish
   ========================================================================== */

function showNotification(message, type = 'info') {
    const colors = { success: '#10B981', error: '#EF4444', info: '#2563EB', warning: '#F59E0B' };
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.textContent = message;
    n.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem 1.5rem;border-radius:8px;color:#fff;font-weight:500;z-index:9999;animation:slideInRight .3s ease;max-width:320px;background:${
        colors[type] || colors.info
    };`;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOutRight .3s ease';
        setTimeout(() => n.remove(), 300);
    }, 5000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
}

function createBubbles() {
    const bubbleContainer = document.querySelector('.bubble-container');
    if (!bubbleContainer) return;
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20;
        bubble.style.width = bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;
        bubbleContainer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 6000);
    }, 800);
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const scrolled = window.scrollY > 50;
    navbar.style.background = scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
    navbar.style.boxShadow = scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document
        .querySelectorAll('.why-card, .event-card, .about-text, .contact-info, .review-card')
        .forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
});

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(notificationStyles);
