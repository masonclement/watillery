/* ==========================================================================
   Client-side data store (localStorage).
   This is a stand-in until a real backend is wired up. Everything here runs
   in the browser, so treat it as demo persistence, not real security.
   ========================================================================== */

// Emails that unlock the developer / admin panel. Add more as needed.
const ADMIN_EMAILS = [
    'masontoddclement@gmail.com',
    'ferhan_qureshi@yahoo.com',
    'info@watillery.com',
];

class SecureDatabase {
    constructor() {
        this.tables = ['users', 'email_verification', 'password_reset'];
        this.initializeDatabase();
    }

    initializeDatabase() {
        this.tables.forEach((t) => {
            if (localStorage.getItem(`db_table_${t}`) === null) {
                localStorage.setItem(`db_table_${t}`, JSON.stringify([]));
            }
        });
        if (!localStorage.getItem('watillery_db_initialized')) {
            this.createDefaultAdmin();
            localStorage.setItem('watillery_db_initialized', 'true');
        }
    }

    createDefaultAdmin() {
        if (this.findUserByEmail('info@watillery.com')) return;
        const salt = this.generateSalt();
        this.insertUser({
            id: this.generateId(),
            username: 'watillery',
            email: 'info@watillery.com',
            password_hash: this.hashPassword('admin!', salt),
            salt,
            first_name: 'Watillery',
            last_name: 'Admin',
            role: 'admin',
            provider: 'password',
            email_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_login: null,
        });
    }

    /* ---------- helpers ---------- */

    hashPassword(password, salt) {
        // Lightweight non-cryptographic hash. Swap for bcrypt on the server.
        let hash = 0;
        const combined = `${password}::${salt}`;
        for (let i = 0; i < combined.length; i++) {
            hash = (hash << 5) - hash + combined.charCodeAt(i);
            hash |= 0;
        }
        return `w${hash}`;
    }

    generateSalt() {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    }

    generateId() {
        return `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    generateToken() {
        return (
            Math.random().toString(36).slice(2) +
            Math.random().toString(36).slice(2) +
            Date.now().toString(36)
        );
    }

    getTable(name) {
        try {
            return JSON.parse(localStorage.getItem(`db_table_${name}`)) || [];
        } catch (e) {
            return [];
        }
    }

    saveTable(name, data) {
        localStorage.setItem(`db_table_${name}`, JSON.stringify(data));
    }

    /* ---------- users ---------- */

    insertUser(user) {
        const users = this.getTable('users');
        users.push(user);
        this.saveTable('users', users);
        return user;
    }

    findUserByEmail(email) {
        if (!email) return undefined;
        return this.getTable('users').find((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    findUserByUsername(username) {
        if (!username) return undefined;
        return this.getTable('users').find(
            (u) => (u.username || '').toLowerCase() === username.toLowerCase()
        );
    }

    findUserByIdentifier(identifier) {
        return identifier && identifier.includes('@')
            ? this.findUserByEmail(identifier)
            : this.findUserByUsername(identifier);
    }

    findUserById(id) {
        return this.getTable('users').find((u) => u.id === id);
    }

    updateUser(id, updates) {
        const users = this.getTable('users');
        const i = users.findIndex((u) => u.id === id);
        if (i === -1) return null;
        users[i] = { ...users[i], ...updates, updated_at: new Date().toISOString() };
        this.saveTable('users', users);
        return users[i];
    }

    countUsers() {
        return this.getTable('users').length;
    }

    isAdminEmail(email) {
        return !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
    }

    sanitizeUser(user) {
        if (!user) return null;
        const { password_hash, salt, verification_token, ...safe } = user;
        return safe;
    }

    /* ---------- email verification ---------- */

    createEmailVerification(userId) {
        const verification = {
            id: this.generateId(),
            user_id: userId,
            token: this.generateToken(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
        };
        const rows = this.getTable('email_verification');
        rows.push(verification);
        this.saveTable('email_verification', rows);
        return verification;
    }

    findEmailVerification(token) {
        return this.getTable('email_verification').find(
            (v) => v.token === token && new Date(v.expires_at) > new Date()
        );
    }

    deleteEmailVerification(token) {
        this.saveTable(
            'email_verification',
            this.getTable('email_verification').filter((v) => v.token !== token)
        );
    }
}

const secureDB = new SecureDatabase();
window.secureDB = secureDB;
window.ADMIN_EMAILS = ADMIN_EMAILS;
