/* ==========================================================================
   Shop page: product grid, filters, search, pagination, product modal.
   Only loaded on shop.html.
   ========================================================================== */

const SHOP_PER_PAGE = 9;
let shopState = { filter: 'all', search: '', page: 1, list: [] };

function shopRender() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    shopState.list = getFilteredProducts(shopState.filter, shopState.search);
    const total = shopState.list.length;
    const pages = Math.max(1, Math.ceil(total / SHOP_PER_PAGE));
    if (shopState.page > pages) shopState.page = pages;

    const start = (shopState.page - 1) * SHOP_PER_PAGE;
    const pageItems = shopState.list.slice(start, start + SHOP_PER_PAGE);

    if (!pageItems.length) {
        grid.innerHTML = '<div class="loading">No products match that search.</div>';
    } else {
        grid.innerHTML = pageItems.map(productCardHTML).join('');
    }
    wireCards(grid);
    shopRenderPagination(pages);
}

function productCardHTML(product) {
    const outOfStock = !!product.outOfStock || (product.note || '').toLowerCase().includes('unavailable');
    const image = product.image || (product.images && product.images[0]) || 'img/icon.png';
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.note ? `<div class="product-note">${product.note}</div>` : ''}
            <img src="${image}" alt="${product.name}" class="product-image" loading="lazy"
                 onerror="this.onerror=null;this.src='img/icon.png';this.classList.add('img-fallback')">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-colors">
                    ${(product.colors || [])
                        .map(
                            (color) => `
                        <span class="color-option ${color.name === product.defaultColor ? 'active' : ''}"
                              style="background-color:${color.hex}"
                              title="${color.name}"
                              data-color="${color.name}"
                              data-image="${color.image || image}"></span>`
                        )
                        .join('')}
                </div>
                <div class="product-price">$${Number(product.price).toFixed(2)}</div>
                <button class="add-to-cart-btn${outOfStock ? ' unavailable' : ''}" ${outOfStock ? 'disabled' : ''}
                    onclick="event.stopPropagation(); ${outOfStock ? '' : `addToCartWithColor(${product.id}, this)`}">
                    ${outOfStock ? 'Unavailable' : 'Add to Cart'}
                </button>
            </div>
        </div>`;
}

function wireCards(grid) {
    grid.querySelectorAll('.color-option').forEach((opt) => {
        opt.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            card.querySelectorAll('.color-option').forEach((o) => o.classList.remove('active'));
            this.classList.add('active');
            card.querySelector('.product-image').src = this.dataset.image;
        });
    });
    grid.querySelectorAll('.product-card').forEach((card) => {
        card.addEventListener('click', function (e) {
            if (e.target.classList.contains('add-to-cart-btn') || e.target.classList.contains('color-option')) return;
            openProductModal(this.getAttribute('data-product-id'));
        });
    });
}

function shopRenderPagination(pages) {
    const box = document.getElementById('pagination');
    if (!box) return;
    if (pages <= 1) {
        box.innerHTML = '';
        return;
    }
    let html = '';
    for (let i = 1; i <= pages; i++) {
        html += `<button class="pagination-btn${i === shopState.page ? ' active' : ''}" data-page="${i}">${i}</button>`;
    }
    box.innerHTML = html;
    box.querySelectorAll('.pagination-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            shopState.page = Number(btn.dataset.page);
            shopRender();
            window.scrollTo({ top: document.getElementById('shop').offsetTop - 80, behavior: 'smooth' });
        });
    });
}

function addToCartWithColor(productId, buttonElement) {
    const card = buttonElement.closest('.product-card');
    const active = card.querySelector('.color-option.active');
    addToCart(productId, active ? active.dataset.color : null);
}

function addToCartFromModal(productId) {
    const checked = document.querySelector(`input[name="color-${productId}"]:checked`);
    addToCart(productId, checked ? checked.value : null);
}

function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const detail = document.getElementById('productDetail');
    const modal = document.getElementById('productModal');
    const images = product.images && product.images.length ? product.images : [product.image];
    const outOfStock = !!product.outOfStock;

    detail.innerHTML = `
        <div class="product-detail-image">
            <div class="slideshow-container modal-slideshow-container">
                <div class="slideshow-wrapper">
                    ${images.map((img, i) => `<div class="slide${i === 0 ? ' active' : ''}"><img src="${img}" alt="${product.name}" onerror="this.onerror=null;this.src='img/icon.png';this.classList.add('img-fallback')"></div>`).join('')}
                </div>
                <button class="slideshow-nav prev" id="modalPrevSlide"><span class="material-symbols-rounded">chevron_left</span></button>
                <button class="slideshow-nav next" id="modalNextSlide"><span class="material-symbols-rounded">chevron_right</span></button>
                <div class="slideshow-dots">
                    ${images.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}" data-slide="${i}"></span>`).join('')}
                </div>
            </div>
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-price">$${Number(product.price).toFixed(2)}</div>
            <p class="product-detail-description">${product.longDescription || product.description || ''}</p>
            <div class="color-selection">
                <h4>Choose Color:</h4>
                <div class="color-options-large">
                    ${(product.colors || [])
                        .map(
                            (color) => `
                        <label class="color-option-large ${color.name === product.defaultColor ? 'active' : ''}">
                            <input type="radio" name="color-${product.id}" value="${color.name}" ${color.name === product.defaultColor ? 'checked' : ''}>
                            <span class="color-circle" style="background-color:${color.hex}"></span>
                            <span class="color-name">${color.name}</span>
                        </label>`
                        )
                        .join('')}
                </div>
            </div>
            <button class="add-to-cart-btn${outOfStock ? ' unavailable' : ''}" ${outOfStock ? 'disabled' : ''}
                onclick="${outOfStock ? '' : `addToCartFromModal(${product.id})`}">
                ${outOfStock ? 'Unavailable' : 'Add to Cart'}
            </button>
        </div>`;

    detail.querySelectorAll('.color-option-large').forEach((opt) => {
        opt.addEventListener('click', function () {
            detail.querySelectorAll('.color-option-large').forEach((o) => o.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const slides = detail.querySelectorAll('.slide');
    const dots = detail.querySelectorAll('.dot');
    let current = 0;
    const show = (idx) => {
        current = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };
    detail.querySelector('#modalPrevSlide').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    detail.querySelector('#modalNextSlide').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
    dots.forEach((dot, i) => dot.addEventListener('click', (e) => { e.stopPropagation(); show(i); }));

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function initializeShop() {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
            this.classList.add('active');
            shopState.filter = this.getAttribute('data-filter');
            shopState.page = 1;
            shopRender();
        });
    });

    const search = document.getElementById('searchInput');
    if (search) {
        let t;
        search.addEventListener('input', function () {
            clearTimeout(t);
            t = setTimeout(() => {
                shopState.search = this.value;
                shopState.page = 1;
                shopRender();
            }, 250);
        });
    }

    shopRender();
}

document.addEventListener('DOMContentLoaded', initializeShop);
window.reloadCatalogue = function () {
    if (document.getElementById('productsGrid')) shopRender();
};
