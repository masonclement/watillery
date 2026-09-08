/* ==========================================================================
   Shared page chrome (nav, footer, modals) injected into every page so there
   is one source of truth. Every link stays inside this project folder.
   Drop <div data-partial="nav"></div>, <div data-partial="footer"></div> and
   <div data-partial="modals"></div> into a page, then load this before main.js.
   ========================================================================== */

const NAV_HTML = `
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <a href="index.html"><img src="img/logo.png" alt="Watillery" class="watillery-logo"></a>
        </div>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link" data-nav="home">Home</a></li>
            <li><a href="index.html#about" class="nav-link" data-nav="about">About</a></li>
            <li><a href="shop.html" class="nav-link" data-nav="shop">Shop</a></li>
            <li><a href="events.html" class="nav-link" data-nav="events">Events</a></li>
            <li><a href="contact.html" class="nav-link" data-nav="contact">Contact</a></li>
        </ul>
        <div class="nav-actions">
            <button class="cart-btn" id="cartBtn" type="button" aria-label="Open cart">
                <span class="material-symbols-rounded" aria-hidden="true">shopping_bag</span>
                <span class="cart-label">Cart</span>
                <span class="cart-count" id="cartCount">0</span>
            </button>

            <div class="auth-buttons">
                <button class="auth-btn login-btn open-login">
                    <span class="material-symbols-rounded" aria-hidden="true">account_circle</span>
                    Sign In
                </button>
            </div>

            <div class="user-menu" hidden>
                <div class="user-avatar"><span class="user-initial"></span></div>
                <button class="user-name-btn" type="button">
                    <span class="user-display-name"></span>
                    <span class="material-symbols-rounded" aria-hidden="true">expand_more</span>
                </button>
                <div class="user-dropdown">
                    <div class="user-info">
                        <div class="user-name"></div>
                        <div class="user-email"></div>
                        <span class="admin-badge" hidden>
                            <span class="material-symbols-rounded" aria-hidden="true">shield_person</span>
                            Admin
                        </span>
                    </div>
                    <div class="user-menu-items">
                        <a href="my-account.html" class="user-menu-item">
                            <span class="material-symbols-rounded" aria-hidden="true">package_2</span> My Orders
                        </a>
                        <a href="my-account.html" class="user-menu-item">
                            <span class="material-symbols-rounded" aria-hidden="true">settings</span> Account Settings
                        </a>
                        <button class="user-menu-item logout-btn">
                            <span class="material-symbols-rounded" aria-hidden="true">logout</span> Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <button class="hamburger" id="hamburger" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
    <div class="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,48 C240,4 480,4 720,44 C960,84 1200,92 1440,52 L1440,100 L0,100 Z"></path>
        </svg>
    </div>
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="#" id="teamLink">Our Team</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Documentation</h4>
                <ul>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="shipping.html">Shipping</a></li>
                    <li><a href="refund-returns.html">Refunds &amp; Returns</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Socials</h4>
                <ul>
                    <li><a href="https://www.facebook.com/people/Watillery/61577575467704/">Facebook</a></li>
                    <li><a href="https://instagram.com/watillery">Instagram</a></li>
                    <li><a href="https://tiktok.com/@watillery">TikTok</a></li>
                    <li><a href="https://youtube.com/@Watillery">YouTube</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Newsletter</h4>
                <p>Subscribe for exclusive deals and new product updates!</p>
                <form class="newsletter">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Watillery Corp. All rights reserved.</p>
        </div>
    </div>
</footer>`;

const MODALS_HTML = `
<div class="modal auth-modal" id="authModal">
    <div class="modal-content auth-modal-content">
        <button class="close-btn" id="closeAuth" aria-label="Close">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
        <div class="auth-tabs" role="tablist">
            <button class="auth-tab active" data-tab="login" role="tab">Sign In</button>
            <button class="auth-tab" data-tab="register" role="tab">Register</button>
        </div>
        <div id="loginFormContainer" class="auth-form-container">
            <div class="auth-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your Watillery account</p>
            </div>
            <form id="loginForm" class="auth-form">
                <div class="error-message" hidden></div>
                <div class="form-group">
                    <label for="loginIdentifier">Username or Email</label>
                    <input type="text" id="loginIdentifier" name="identifier" autocomplete="username" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <div class="password-input">
                        <input type="password" id="loginPassword" name="password" autocomplete="current-password" required>
                        <button type="button" class="password-toggle" data-target="loginPassword" aria-label="Show password">
                            <span class="material-symbols-rounded" aria-hidden="true">visibility</span>
                        </button>
                    </div>
                </div>
                <div class="form-row-inline">
                    <label class="checkbox-line">
                        <input type="checkbox" name="remember" id="rememberMe"><span>Remember me</span>
                    </label>
                    <button type="button" class="link-btn forgot-password">Forgot password?</button>
                </div>
                <button type="submit" class="auth-submit-btn">Sign In</button>
                <div class="auth-divider"><span>or</span></div>
                <button type="button" class="google-btn" data-mode="login">
                    <span class="google-g" aria-hidden="true">G</span> Continue with Google
                </button>
            </form>
        </div>
        <div id="registerFormContainer" class="auth-form-container" hidden>
            <div class="auth-header">
                <h2>Create Account</h2>
                <p>Join Watillery for the ultimate water play experience</p>
            </div>
            <form id="registerForm" class="auth-form">
                <div class="error-message" hidden></div>
                <div class="form-group">
                    <label for="registerUsername">Username</label>
                    <input type="text" id="registerUsername" name="username" autocomplete="username" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email Address</label>
                    <input type="email" id="registerEmail" name="email" autocomplete="email" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <div class="password-input">
                        <input type="password" id="registerPassword" name="password" autocomplete="new-password" required>
                        <button type="button" class="password-toggle" data-target="registerPassword" aria-label="Show password">
                            <span class="material-symbols-rounded" aria-hidden="true">visibility</span>
                        </button>
                    </div>
                    <div class="password-strength">
                        <div class="strength-indicator">
                            <div class="strength-bar"></div><div class="strength-bar"></div><div class="strength-bar"></div>
                        </div>
                    </div>
                    <div class="password-requirements">
                        <small>8+ characters, with an uppercase letter, a lowercase letter, a number and a special character.</small>
                    </div>
                </div>
                <div class="form-group">
                    <label for="registerConfirmPassword">Re-type Password</label>
                    <div class="password-input">
                        <input type="password" id="registerConfirmPassword" name="confirmPassword" autocomplete="new-password" required>
                        <button type="button" class="password-toggle" data-target="registerConfirmPassword" aria-label="Show password">
                            <span class="material-symbols-rounded" aria-hidden="true">visibility</span>
                        </button>
                    </div>
                </div>
                <button type="submit" class="auth-submit-btn">Create Account</button>
                <div class="auth-divider"><span>or</span></div>
                <button type="button" class="google-btn" data-mode="register">
                    <span class="google-g" aria-hidden="true">G</span> Sign up with Google
                </button>
            </form>
        </div>
        <div id="verifyContainer" class="auth-form-container" hidden>
            <div class="auth-header">
                <h2>Check Your Email</h2>
                <p>We sent a verification link to <span class="verify-email"></span></p>
            </div>
            <div class="verification-notice">
                <h4><span class="material-symbols-rounded" aria-hidden="true">mark_email_unread</span> Verification required</h4>
                <p>Click the link in that email to finish setting up your account. It expires in 24 hours.</p>
                <div class="verify-demo-link" hidden></div>
            </div>
            <div class="verify-actions">
                <button type="button" class="auth-submit-btn verify-done">Got it</button>
                <button type="button" class="auth-btn login-btn verify-resend">Resend Email</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="cartModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Shopping Cart</h3>
            <button class="close-btn" id="closeCart" aria-label="Close">
                <span class="material-symbols-rounded" aria-hidden="true">close</span>
            </button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-footer">
            <div class="cart-promo">
                <input type="text" id="promoInput" placeholder="Promo code" autocomplete="off">
                <button type="button" id="applyPromoBtn">Apply</button>
            </div>
            <div class="cart-promo-msg" id="promoMsg" hidden></div>
            <div class="cart-subtotal" id="cartSubtotalRow" hidden>
                <span>Subtotal</span><span>$<span id="cartSubtotal">0.00</span></span>
            </div>
            <div class="cart-discount" id="cartDiscountRow" hidden>
                <span id="cartDiscountLabel">Discount</span><span>-$<span id="cartDiscount">0.00</span></span>
            </div>
            <div class="cart-total"><strong>Total: $<span id="cartTotal">0.00</span></strong></div>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>
</div>

<div class="modal" id="productModal">
    <div class="modal-content product-modal-content">
        <button class="close-btn" id="closeProduct" aria-label="Close">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
        <div class="product-detail" id="productDetail"></div>
    </div>
</div>

<div class="modal" id="teamModal">
    <div class="modal-content team-modal-content">
        <button class="close-btn" id="closeTeam" aria-label="Close">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
        <div class="team-detail" id="teamDetail">
            <h2>The Watillery Team</h2>
            <div class="team-grid" id="teamGrid"></div>
        </div>
    </div>
</div>`;

(function injectChrome() {
    const slots = {
        nav: NAV_HTML,
        footer: FOOTER_HTML,
        modals: MODALS_HTML,
    };
    Object.entries(slots).forEach(([key, html]) => {
        const holder = document.querySelector(`[data-partial="${key}"]`);
        if (holder) holder.outerHTML = html;
    });

    // Mark the active nav link
    const page = document.body.getAttribute('data-page');
    if (page) {
        const link = document.querySelector(`.nav-link[data-nav="${page}"]`);
        if (link) link.classList.add('active');
    }
})();
