/* ==========================================================================
   Developer panel. Available to anyone signed in with an ADMIN_EMAILS address.
   Lets the team add products, upload product images, set colours, tags and
   stock status, and manage the homepage Events section. Everything persists
   to localStorage until a real backend/CMS is connected.
   ========================================================================== */

const PALETTE = [
    { key: 'R', name: 'Red', hex: '#E23636' },
    { key: 'O', name: 'Orange', hex: '#F2711C' },
    { key: 'Y', name: 'Yellow', hex: '#FFD900' },
    { key: 'G', name: 'Green', hex: '#21BA45' },
    { key: 'B', name: 'Blue', hex: '#2563EB' },
    { key: 'I', name: 'Indigo', hex: '#4B0082' },
    { key: 'V', name: 'Violet', hex: '#8B5CF6' },
    { key: 'W', name: 'White', hex: '#FFFFFF' },
    { key: 'Bk', name: 'Black', hex: '#111111' },
    { key: 'Br', name: 'Brown', hex: '#8B5E3C' },
    { key: 'Gy', name: 'Gray', hex: '#6B7280' },
    { key: 'P', name: 'Pink', hex: '#FF69B4' },
];

const PRODUCT_CATEGORIES = [
    { value: 'water-guns', label: 'Water Guns' },
    { value: 'gel-pellet-shooters', label: 'Gel-Pellet Shooters' },
    { value: 'toys', label: 'Aquatic Toys' },
    { value: 'misc', label: 'Miscellaneous' },
];

const PRODUCT_TAGS = [
    'Best Seller',
    'Best Value',
    'Highest Rating',
    'Longest Range',
    'New Arrival',
    'Limited Edition',
];

const CUSTOM_PRODUCTS_KEY = 'watillery_products_custom';
const PRODUCT_OVERRIDES_KEY = 'watillery_products_overrides';

const productStore = {
    custom() {
        try {
            return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY)) || [];
        } catch (e) {
            return [];
        }
    },
    saveCustom(list) {
        persist(CUSTOM_PRODUCTS_KEY, list);
    },
    overrides() {
        try {
            return JSON.parse(localStorage.getItem(PRODUCT_OVERRIDES_KEY)) || {};
        } catch (e) {
            return {};
        }
    },
    saveOverrides(map) {
        persist(PRODUCT_OVERRIDES_KEY, map);
    },
};

function persist(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        showNotification(
            'Storage is full. Uploaded images are large; remove some before saving more.',
            'error'
        );
        return false;
    }
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

class AdminPanel {
    constructor() {
        this.activeTab = 'overview';
        this.draftColors = new Set();
        this.draftTags = new Set();
        this.draftImages = [];
        this.editingEventId = null;
        this.build();
    }

    build() {
        const el = document.createElement('div');
        el.id = 'adminPanel';
        el.className = 'admin-panel';
        el.innerHTML = `
            <div class="admin-shell">
                <div class="admin-header">
                    <h2><span class="material-symbols-rounded">shield_person</span> Watillery Developer Panel</h2>
                    <button class="close-btn" id="closeAdminPanel" aria-label="Close">
                        <span class="material-symbols-rounded">close</span>
                    </button>
                </div>
                <div class="admin-tabs">
                    <button class="admin-tab active" data-pane="overview">Overview</button>
                    <button class="admin-tab" data-pane="products">Products</button>
                    <button class="admin-tab" data-pane="events">Events</button>
                </div>
                <div class="admin-content">
                    <div class="admin-pane active" data-pane="overview"></div>
                    <div class="admin-pane" data-pane="products"></div>
                    <div class="admin-pane" data-pane="events"></div>
                </div>
            </div>`;
        document.body.appendChild(el);
        this.el = el;

        el.querySelector('#closeAdminPanel').addEventListener('click', () => this.hide());
        el.addEventListener('click', (e) => {
            if (e.target === el) this.hide();
        });
        el.querySelectorAll('.admin-tab').forEach((tab) => {
            tab.addEventListener('click', () => this.showTab(tab.dataset.pane));
        });

        this.addMenuOption();
    }

    addMenuOption() {
        const items = document.querySelector('.user-menu-items');
        if (!items) return;
        const btn = document.createElement('button');
        btn.className = 'user-menu-item admin-panel-btn';
        btn.hidden = true;
        btn.innerHTML = '<span class="material-symbols-rounded">terminal</span> Developer Panel';
        btn.addEventListener('click', () => this.show());
        items.insertBefore(btn, items.querySelector('.logout-btn'));
    }

    updateAdminMenuVisibility() {
        const btn = document.querySelector('.admin-panel-btn');
        if (btn) btn.hidden = !authSystem.isAdmin();
    }

    show() {
        if (!authSystem.isAdmin()) {
            showNotification('Developer access only.', 'error');
            return;
        }
        this.render();
        this.el.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.el.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    showTab(pane) {
        this.activeTab = pane;
        this.el.querySelectorAll('.admin-tab').forEach((t) => t.classList.toggle('active', t.dataset.pane === pane));
        this.el.querySelectorAll('.admin-pane').forEach((p) => p.classList.toggle('active', p.dataset.pane === pane));
        this.render();
    }

    render() {
        if (this.activeTab === 'overview') this.renderOverview();
        if (this.activeTab === 'products') this.renderProducts();
        if (this.activeTab === 'events') this.renderEvents();
    }

    /* ---------- Overview ---------- */

    renderOverview() {
        const pane = this.el.querySelector('.admin-pane[data-pane="overview"]');
        const builtIn = typeof products !== 'undefined' ? products.length : 0;
        const custom = productStore.custom().length;
        const events = window.eventsStore ? eventsStore.all().length : 0;
        const users = secureDB.countUsers();
        pane.innerHTML = `
            <div class="admin-stat-grid">
                <div class="admin-stat"><div class="num">${builtIn + custom}</div><div class="lbl">Products</div></div>
                <div class="admin-stat"><div class="num">${custom}</div><div class="lbl">Added here</div></div>
                <div class="admin-stat"><div class="num">${events}</div><div class="lbl">Events</div></div>
                <div class="admin-stat"><div class="num">${users}</div><div class="lbl">Accounts</div></div>
            </div>
            <div class="admin-card">
                <p class="muted">Signed in as <strong>${authSystem.currentUser.email}</strong>.</p>
                <p class="muted">Products and events added here are saved to this browser until the live backend is connected. Use the tabs above to manage them.</p>
            </div>`;
    }

    /* ---------- Products ---------- */

    renderProducts() {
        const pane = this.el.querySelector('.admin-pane[data-pane="products"]');
        const overrides = productStore.overrides();
        const custom = productStore.custom();
        const builtIn = typeof products !== 'undefined' ? products : [];

        const rowHTML = (p, isCustom) => {
            const o = overrides[p.id] || {};
            const outOfStock = isCustom ? p.outOfStock : !!o.outOfStock;
            const price = isCustom ? p.price : o.price != null ? o.price : p.price;
            const note = isCustom ? p.note : o.note != null ? o.note : p.note;
            return `
                <div class="admin-row" data-id="${p.id}" data-custom="${isCustom}">
                    <img src="${(p.images && p.images[0]) || p.image || 'img/icon.png'}" alt="">
                    <div>
                        <strong>${p.name}</strong>
                        <div class="muted">${categoryLabel(p.category)} &middot; $${Number(price).toFixed(2)} ${note ? '&middot; ' + note : ''} ${outOfStock ? '&middot; OUT OF STOCK' : ''}</div>
                    </div>
                    <div class="admin-row-actions">
                        <button class="admin-btn secondary" data-act="toggle-stock">${outOfStock ? 'Mark in stock' : 'Mark out of stock'}</button>
                        ${isCustom ? '<button class="admin-btn danger" data-act="delete">Delete</button>' : ''}
                    </div>
                </div>`;
        };

        pane.innerHTML = `
            <div class="admin-card">
                <h3>Add a product</h3>
                <div class="admin-grid-2">
                    <div class="admin-field"><label>Name</label><input id="np-name" type="text" placeholder="Gel-Pellet Shooting Glock"></div>
                    <div class="admin-field"><label>Price (USD)</label><input id="np-price" type="number" step="0.01" min="0" placeholder="59.99"></div>
                </div>
                <div class="admin-grid-2">
                    <div class="admin-field"><label>Category</label>
                        <select id="np-category">${PRODUCT_CATEGORIES.map((c) => `<option value="${c.value}">${c.label}</option>`).join('')}</select>
                    </div>
                    <div class="admin-field"><label>Stock</label>
                        <select id="np-stock"><option value="in">In stock</option><option value="out">Out of stock</option></select>
                    </div>
                </div>
                <div class="admin-field"><label>Short description</label><input id="np-desc" type="text" placeholder="One line shown on the product card"></div>
                <div class="admin-field"><label>Long description</label><textarea id="np-long" rows="3" placeholder="Full detail. Use line breaks for bullet points."></textarea></div>
                <div class="admin-field"><label>Available colours (ROYGBIV W Bk Br Gy P)</label>
                    <div class="admin-color-picker" id="np-colors">
                        ${PALETTE.map((c) => `<span class="admin-color-swatch" title="${c.name}" data-hex="${c.hex}" data-name="${c.name}" style="background:${c.hex}"></span>`).join('')}
                    </div>
                </div>
                <div class="admin-field"><label>Tags</label>
                    <div class="admin-tags" id="np-tags">
                        ${PRODUCT_TAGS.map((t) => `<button type="button" class="admin-tag-toggle" data-tag="${t}">${t}</button>`).join('')}
                    </div>
                </div>
                <div class="admin-field"><label>Images / video stills</label>
                    <div class="admin-image-drop" id="np-image-drop">Click to choose image files (PNG, JPG, WebP)</div>
                    <input id="np-image-input" type="file" accept="image/*" multiple hidden>
                    <div class="admin-image-previews" id="np-image-previews"></div>
                </div>
                <button class="admin-btn" id="np-save">Save product</button>
            </div>
            <div class="admin-card">
                <h3>Catalogue</h3>
                ${custom.length ? '<h4 class="muted">Added here</h4>' + custom.map((p) => rowHTML(p, true)).join('') : ''}
                <h4 class="muted">Built-in</h4>
                ${builtIn.map((p) => rowHTML(p, false)).join('')}
            </div>`;

        this.wireProductForm(pane);
        this.wireCatalogueRows(pane);
    }

    wireProductForm(pane) {
        this.draftColors = new Set();
        this.draftTags = new Set();
        this.draftImages = [];

        pane.querySelectorAll('#np-colors .admin-color-swatch').forEach((sw) => {
            sw.addEventListener('click', () => {
                const name = sw.dataset.name;
                if (this.draftColors.has(name)) this.draftColors.delete(name);
                else this.draftColors.add(name);
                sw.classList.toggle('selected');
            });
        });

        pane.querySelectorAll('#np-tags .admin-tag-toggle').forEach((btn) => {
            btn.addEventListener('click', () => {
                const tag = btn.dataset.tag;
                if (this.draftTags.has(tag)) this.draftTags.delete(tag);
                else this.draftTags.add(tag);
                btn.classList.toggle('active');
            });
        });

        const input = pane.querySelector('#np-image-input');
        pane.querySelector('#np-image-drop').addEventListener('click', () => input.click());
        input.addEventListener('change', async () => {
            for (const file of input.files) {
                try {
                    this.draftImages.push(await readFileAsDataUrl(file));
                } catch (e) {
                    /* ignore */
                }
            }
            input.value = '';
            this.renderImagePreviews(pane);
        });

        pane.querySelector('#np-save').addEventListener('click', () => this.saveNewProduct(pane));
    }

    renderImagePreviews(pane) {
        const wrap = pane.querySelector('#np-image-previews');
        wrap.innerHTML = this.draftImages
            .map(
                (src, i) => `<figure><img src="${src}" alt=""><button data-i="${i}" aria-label="Remove">&times;</button></figure>`
            )
            .join('');
        wrap.querySelectorAll('button').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.draftImages.splice(Number(btn.dataset.i), 1);
                this.renderImagePreviews(pane);
            });
        });
    }

    saveNewProduct(pane) {
        const name = pane.querySelector('#np-name').value.trim();
        const price = parseFloat(pane.querySelector('#np-price').value);
        if (!name || isNaN(price) || price < 0) {
            showNotification('A name and a valid price are required.', 'error');
            return;
        }
        const colors = [...this.draftColors].map((cn) => {
            const c = PALETTE.find((p) => p.name === cn);
            return { name: cn, value: c.hex, hex: c.hex };
        });
        const list = productStore.custom();
        const id = 1001 + list.length + Math.floor(Math.random() * 50);
        const product = {
            id,
            name,
            price,
            category: pane.querySelector('#np-category').value,
            description: pane.querySelector('#np-desc').value.trim(),
            longDescription: pane.querySelector('#np-long').value.trim().replace(/\n/g, '<br>'),
            image: this.draftImages[0] || 'img/icon.png',
            images: this.draftImages.slice(),
            colors: colors.length ? colors : [{ name: 'Default', value: '#2563EB', hex: '#2563EB' }],
            defaultColor: colors[0] ? colors[0].name : 'Default',
            tags: [...this.draftTags],
            note: this.draftTags.size ? [...this.draftTags][0] : '',
            outOfStock: pane.querySelector('#np-stock').value === 'out',
            createdVia: 'developer-panel',
        };
        list.push(product);
        if (!productStore.saveCustom(list)) return;
        if (typeof reloadCatalogue === 'function') reloadCatalogue();
        showNotification(`"${name}" added to the catalogue.`, 'success');
        this.renderProducts();
    }

    wireCatalogueRows(pane) {
        pane.querySelectorAll('.admin-row').forEach((row) => {
            const id = Number(row.dataset.id);
            const isCustom = row.dataset.custom === 'true';
            row.querySelectorAll('[data-act]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.act === 'toggle-stock') this.toggleStock(id, isCustom);
                    if (btn.dataset.act === 'delete') this.deleteCustom(id);
                });
            });
        });
    }

    toggleStock(id, isCustom) {
        if (isCustom) {
            const list = productStore.custom();
            const p = list.find((x) => x.id === id);
            if (p) p.outOfStock = !p.outOfStock;
            productStore.saveCustom(list);
        } else {
            const map = productStore.overrides();
            map[id] = map[id] || {};
            map[id].outOfStock = !map[id].outOfStock;
            map[id].note = map[id].outOfStock ? 'Currently Unavailable' : '';
            productStore.saveOverrides(map);
        }
        if (typeof reloadCatalogue === 'function') reloadCatalogue();
        this.renderProducts();
    }

    deleteCustom(id) {
        if (!window.confirm('Delete this product?')) return;
        productStore.saveCustom(productStore.custom().filter((p) => p.id !== id));
        if (typeof reloadCatalogue === 'function') reloadCatalogue();
        this.renderProducts();
    }

    /* ---------- Events ---------- */

    renderEvents() {
        const pane = this.el.querySelector('.admin-pane[data-pane="events"]');
        const list = window.eventsStore ? eventsStore.all() : [];
        const editing = this.editingEventId
            ? list.find((e) => e.id === this.editingEventId) || {}
            : {};

        pane.innerHTML = `
            <div class="admin-card">
                <h3>${this.editingEventId ? 'Edit event' : 'Add an event'}</h3>
                <div class="admin-field"><label>Title</label><input id="ne-title" type="text" value="${attr(editing.title)}" placeholder="Watillery at the CNE"></div>
                <div class="admin-grid-2">
                    <div class="admin-field"><label>Start date</label><input id="ne-start" type="date" value="${attr(editing.startDate)}"></div>
                    <div class="admin-field"><label>End date (optional)</label><input id="ne-end" type="date" value="${attr(editing.endDate)}"></div>
                </div>
                <div class="admin-field"><label>Location</label><input id="ne-location" type="text" value="${attr(editing.location)}" placeholder="Exhibition Place, Toronto"></div>
                <div class="admin-field"><label>Description</label><textarea id="ne-desc" rows="2" placeholder="Come find our booth...">${editing.description || ''}</textarea></div>
                <div class="admin-field"><label>Link (optional)</label><input id="ne-url" type="url" value="${attr(editing.url)}" placeholder="https://..."></div>
                <div class="admin-field"><label>Image (optional)</label>
                    <div class="admin-image-drop" id="ne-image-drop">Click to choose an image</div>
                    <input id="ne-image-input" type="file" accept="image/*" hidden>
                    <div class="admin-image-previews" id="ne-image-previews">${
                        editing.image ? `<figure><img src="${editing.image}" alt=""><button data-clear aria-label="Remove">&times;</button></figure>` : ''
                    }</div>
                </div>
                <button class="admin-btn" id="ne-save">${this.editingEventId ? 'Update event' : 'Add event'}</button>
                ${this.editingEventId ? '<button class="admin-btn secondary" id="ne-cancel">Cancel</button>' : ''}
            </div>
            <div class="admin-card">
                <h3>All events</h3>
                ${
                    list.length
                        ? list
                              .slice()
                              .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))
                              .map(
                                  (e) => `
                        <div class="admin-row" data-id="${e.id}">
                            <img src="${e.image || 'img/icon.png'}" alt="">
                            <div><strong>${e.title || 'Untitled'}</strong><div class="muted">${e.startDate || 'no date'} ${e.location ? '&middot; ' + e.location : ''}</div></div>
                            <div class="admin-row-actions">
                                <button class="admin-btn secondary" data-act="edit">Edit</button>
                                <button class="admin-btn danger" data-act="delete">Delete</button>
                            </div>
                        </div>`
                              )
                              .join('')
                        : '<p class="muted">No events yet.</p>'
                }
            </div>`;

        this.wireEventForm(pane, editing);
    }

    wireEventForm(pane, editing) {
        let imageData = editing.image || null;
        const input = pane.querySelector('#ne-image-input');
        pane.querySelector('#ne-image-drop').addEventListener('click', () => input.click());
        input.addEventListener('change', async () => {
            if (input.files[0]) {
                imageData = await readFileAsDataUrl(input.files[0]);
                pane.querySelector('#ne-image-previews').innerHTML =
                    `<figure><img src="${imageData}" alt=""><button data-clear aria-label="Remove">&times;</button></figure>`;
                wireClear();
            }
        });
        const wireClear = () => {
            const clr = pane.querySelector('[data-clear]');
            if (clr)
                clr.addEventListener('click', () => {
                    imageData = null;
                    pane.querySelector('#ne-image-previews').innerHTML = '';
                });
        };
        wireClear();

        pane.querySelector('#ne-save').addEventListener('click', () => {
            const title = pane.querySelector('#ne-title').value.trim();
            const startDate = pane.querySelector('#ne-start').value;
            if (!title || !startDate) {
                showNotification('An event needs a title and a start date.', 'error');
                return;
            }
            eventsStore.upsert({
                id: this.editingEventId || `evt_${Date.now()}`,
                title,
                startDate,
                endDate: pane.querySelector('#ne-end').value || '',
                location: pane.querySelector('#ne-location').value.trim(),
                description: pane.querySelector('#ne-desc').value.trim(),
                url: pane.querySelector('#ne-url').value.trim(),
                image: imageData || '',
            });
            showNotification(this.editingEventId ? 'Event updated.' : 'Event added.', 'success');
            this.editingEventId = null;
            this.renderEvents();
        });

        const cancel = pane.querySelector('#ne-cancel');
        if (cancel)
            cancel.addEventListener('click', () => {
                this.editingEventId = null;
                this.renderEvents();
            });

        pane.querySelectorAll('.admin-row').forEach((row) => {
            const id = row.dataset.id;
            row.querySelectorAll('[data-act]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.act === 'edit') {
                        this.editingEventId = id;
                        this.renderEvents();
                        this.el.querySelector('.admin-content').scrollTop = 0;
                    }
                    if (btn.dataset.act === 'delete') {
                        if (window.confirm('Delete this event?')) {
                            eventsStore.remove(id);
                            this.renderEvents();
                        }
                    }
                });
            });
        });
    }
}

function categoryLabel(value) {
    const c = PRODUCT_CATEGORIES.find((x) => x.value === value);
    return c ? c.label : value;
}

function attr(v) {
    return (v == null ? '' : String(v)).replace(/"/g, '&quot;');
}

const adminPanel = new AdminPanel();
window.adminPanel = adminPanel;
window.productStore = productStore;
