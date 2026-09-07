/* ==========================================================================
   Promo codes. Created in the developer panel, applied in the cart.
   Each code has a discount (percent or fixed dollars), an active window, and
   an optional minimum subtotal. Stored in localStorage until the backend lands.
   ========================================================================== */

const PROMOS_KEY = 'watillery_promos';
const APPLIED_PROMO_KEY = 'watillery_applied_promo';

const promoStore = {
    all() {
        try {
            const list = JSON.parse(localStorage.getItem(PROMOS_KEY)) || [];
            return Array.isArray(list) ? list : [];
        } catch (e) {
            return [];
        }
    },
    save(list) {
        localStorage.setItem(PROMOS_KEY, JSON.stringify(list));
    },
    upsert(promo) {
        const code = promo.code.trim().toUpperCase();
        const list = this.all();
        const i = list.findIndex((p) => p.code === code);
        const record = {
            code,
            type: promo.type === 'fixed' ? 'fixed' : 'percent',
            value: Math.max(0, Number(promo.value) || 0),
            starts: promo.starts || '',
            expires: promo.expires || '',
            minSubtotal: Math.max(0, Number(promo.minSubtotal) || 0),
            active: promo.active !== false,
        };
        if (i === -1) list.push(record);
        else list[i] = record;
        this.save(list);
        return record;
    },
    remove(code) {
        this.save(this.all().filter((p) => p.code !== code.toUpperCase()));
    },
    find(code) {
        return this.all().find((p) => p.code === (code || '').trim().toUpperCase());
    },
};

function promoWindowText(promo) {
    if (promo.starts && promo.expires) return `${promo.starts} to ${promo.expires}`;
    if (promo.expires) return `until ${promo.expires}`;
    if (promo.starts) return `from ${promo.starts}`;
    return 'no end date';
}

// Returns { ok, promo, discount, message }
function validatePromo(code, subtotal) {
    const promo = promoStore.find(code);
    if (!promo) return { ok: false, message: 'That code is not valid.' };
    if (!promo.active) return { ok: false, message: 'That code is not active.' };

    const today = new Date().toISOString().slice(0, 10);
    if (promo.starts && today < promo.starts) {
        return { ok: false, message: `That code starts on ${promo.starts}.` };
    }
    if (promo.expires && today > promo.expires) {
        return { ok: false, message: 'That code has expired.' };
    }
    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
        return {
            ok: false,
            message: `Spend $${promo.minSubtotal.toFixed(2)} to use this code.`,
        };
    }

    const discount =
        promo.type === 'percent'
            ? +(subtotal * (promo.value / 100)).toFixed(2)
            : Math.min(promo.value, subtotal);

    return {
        ok: true,
        promo,
        discount,
        message:
            promo.type === 'percent'
                ? `${promo.value}% off applied`
                : `$${promo.value.toFixed(2)} off applied`,
    };
}

const appliedPromo = {
    get() {
        return localStorage.getItem(APPLIED_PROMO_KEY) || '';
    },
    set(code) {
        if (code) localStorage.setItem(APPLIED_PROMO_KEY, code.trim().toUpperCase());
        else localStorage.removeItem(APPLIED_PROMO_KEY);
    },
    clear() {
        localStorage.removeItem(APPLIED_PROMO_KEY);
    },
};

// Discount that currently applies to a given subtotal, or null.
function currentDiscount(subtotal) {
    const code = appliedPromo.get();
    if (!code) return null;
    const result = validatePromo(code, subtotal);
    if (!result.ok) return null;
    return { code, amount: result.discount, label: result.message, type: result.promo.type, value: result.promo.value };
}

window.promoStore = promoStore;
window.validatePromo = validatePromo;
window.appliedPromo = appliedPromo;
window.currentDiscount = currentDiscount;
window.promoWindowText = promoWindowText;
