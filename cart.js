let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('watillery-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('watillery-cart', JSON.stringify(cart));
}

function addToCart(productId, selectedColor = null) {
    const product = getProductById(productId);
    if (!product) return;

    const color = selectedColor || product.defaultColor;
    const cartItemId = `${productId}-${color}`;
    
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            selectedColor: color,
            colorHex: product.colors.find(c => c.name === color)?.hex || '#2563EB'
        });
    }
    
    updateCartCount();
    saveCart();
    showAddedToCartAnimation(productId);
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCartCount();
    saveCart();
    renderCartItems();
}

function updateQuantity(cartItemId, change) {
    const item = cart.find(item => item.cartItemId === cartItemId);
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
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-color">
                    <span class="color-dot" style="background-color: ${item.colorHex}"></span>
                    ${item.selectedColor}
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
            </div>
            <button class="quantity-btn remove-btn" onclick="removeFromCart('${item.cartItemId}')" title="Remove item">×</button>
        </div>
    `).join('');
    
    cartTotal.textContent = getCartTotal().toFixed(2);
}

function showAddedToCartAnimation(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
        const button = productCard.querySelector('.add-to-cart-btn');
        const originalText = button.textContent;
        button.textContent = 'Added! ✓';
        button.style.background = '#10B981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', loadCart);