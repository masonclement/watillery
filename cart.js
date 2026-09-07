let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('watillery-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart) || [];
        } catch (e) {
            cart = [];
        }
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('watillery-cart', JSON.stringify(cart));
}

function addToCart(productId, selectedColor = null) {
    const product = getProductById(productId);
    if (!product) return;
    if (product.outOfStock) {
        if (typeof showNotification === 'function') showNotification('That item is out of stock.', 'error');
        return;
    }

    const color = selectedColor || product.defaultColor;
    const cartItemId = `${productId}-${color}`;
    const existingItem = cart.find((item) => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            image: (product.images && product.images[0]) || product.image,
            quantity: 1,
            selectedColor: color,
            colorHex: (product.colors.find((c) => c.name === color) || {}).hex || '#2563EB',
        });
    }

    updateCartCount();
    saveCart();
    showAddedToCartAnimation(productId);
}

function removeFromCart(cartItemId) {
    cart = cart.filter((item) => item.cartItemId !== cartItemId);
    updateCartCount();
    saveCart();
    renderCartItems();
}

function updateQuantity(cartItemId, change) {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        updateCartCount();
        saveCart();
        renderCartItems();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('has-items', totalItems > 0);
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function getCartSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Total after any applied promo code.
function getCartTotal() {
    const subtotal = getCartSubtotal();
    const discount = typeof currentDiscount === 'function' ? currentDiscount(subtotal) : null;
    return Math.max(0, subtotal - (discount ? discount.amount : 0));
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItemsContainer || !cartTotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p style="text-align:center;color:#6B7280;padding:2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        setPromoRows(0, null);
        return;
    }

    cartItemsContainer.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='img/icon.png'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-color">
                    <span class="color-dot" style="background-color:${item.colorHex}"></span>
                    ${item.selectedColor}
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
            </div>
            <button class="quantity-btn remove-btn" onclick="removeFromCart('${item.cartItemId}')" title="Remove item">&times;</button>
        </div>`
        )
        .join('');

    const subtotal = getCartSubtotal();
    const discount = typeof currentDiscount === 'function' ? currentDiscount(subtotal) : null;
    setPromoRows(subtotal, discount);
    cartTotal.textContent = Math.max(0, subtotal - (discount ? discount.amount : 0)).toFixed(2);
}

function setPromoRows(subtotal, discount) {
    const subtotalRow = document.getElementById('cartSubtotalRow');
    const discountRow = document.getElementById('cartDiscountRow');
    const promoInput = document.getElementById('promoInput');
    if (!subtotalRow || !discountRow) return;

    if (discount) {
        subtotalRow.hidden = false;
        document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
        discountRow.hidden = false;
        document.getElementById('cartDiscountLabel').textContent = `Discount (${discount.code})`;
        document.getElementById('cartDiscount').textContent = discount.amount.toFixed(2);
        if (promoInput && !promoInput.value) promoInput.value = discount.code;
    } else {
        subtotalRow.hidden = true;
        discountRow.hidden = true;
    }
}

function initializePromoField() {
    const applyBtn = document.getElementById('applyPromoBtn');
    const input = document.getElementById('promoInput');
    const msg = document.getElementById('promoMsg');
    if (!applyBtn || !input) return;

    const showMsg = (text, ok) => {
        if (!msg) return;
        msg.hidden = false;
        msg.textContent = text;
        msg.classList.toggle('ok', !!ok);
        msg.classList.toggle('bad', !ok);
    };

    applyBtn.addEventListener('click', () => {
        const code = input.value.trim();
        if (!code) {
            appliedPromo.clear();
            showMsg('Promo code removed.', false);
            renderCartItems();
            return;
        }
        const result = validatePromo(code, getCartSubtotal());
        if (result.ok) {
            appliedPromo.set(code);
            showMsg(result.message, true);
        } else {
            appliedPromo.clear();
            showMsg(result.message, false);
        }
        renderCartItems();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyBtn.click();
        }
    });
}

function showAddedToCartAnimation(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (!productCard) return;
    const button = productCard.querySelector('.add-to-cart-btn');
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = 'Added';
    button.style.background = '#10B981';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializePromoField();
});
