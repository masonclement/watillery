// Events shown on the homepage. Managed through the developer panel and
// persisted to localStorage so non-developers never touch the code.
const EVENTS_STORAGE_KEY = 'watillery_events';
const EVENTS_SEED_FLAG = 'watillery_events_seeded';

// Events we have already done. Seeded once; after that the developer panel owns
// the list. More get added over time.
const SEED_EVENTS = [
    {
        id: 'evt_cne_2026',
        title: 'The CNE 2026',
        startDate: '2026-08-21',
        endDate: '2026-09-07',
        location: 'Exhibition Place, Toronto',
        description:
            'Our first year at the Canadian National Exhibition. We ran a Watillery booth for all 18 days of the fair, let people test-fire the electric blasters, and talked to more water-fight fanatics than we can count. Thanks to everyone who stopped by.',
        url: '',
        image: '',
    },
];

function seedEventsIfNeeded() {
    if (localStorage.getItem(EVENTS_SEED_FLAG)) return;
    try {
        const existing = JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY)) || [];
        const ids = new Set(existing.map((e) => e.id));
        const merged = existing.concat(SEED_EVENTS.filter((e) => !ids.has(e.id)));
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(merged));
        localStorage.setItem(EVENTS_SEED_FLAG, '1');
    } catch (e) {
        /* ignore */
    }
}
seedEventsIfNeeded();

const eventsStore = {
    all() {
        try {
            const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
            const list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list : [];
        } catch (e) {
            return [];
        }
    },

    save(list) {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(list));
        renderEvents();
    },

    upsert(event) {
        const list = this.all();
        const index = list.findIndex((e) => e.id === event.id);
        if (index === -1) {
            list.push({ ...event, id: event.id || `evt_${Date.now()}` });
        } else {
            list[index] = { ...list[index], ...event };
        }
        this.save(list);
    },

    remove(id) {
        this.save(this.all().filter((e) => e.id !== id));
    },
};

function formatEventDate(event) {
    if (!event.startDate) return '';
    const opts = { month: 'short', day: 'numeric', year: 'numeric' };
    const start = new Date(event.startDate + 'T00:00:00');
    if (!event.endDate || event.endDate === event.startDate) {
        return start.toLocaleDateString(undefined, opts);
    }
    const end = new Date(event.endDate + 'T00:00:00');
    return `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString(undefined, opts)}`;
}

function eventCardHTML(event) {
    const link = event.url
        ? `<a class="event-link" href="${event.url}" target="_blank" rel="noopener">Details <span class="material-symbols-rounded" aria-hidden="true">arrow_outward</span></a>`
        : '';
    const media = event.image
        ? `<div class="event-media"><img src="${event.image}" alt="${event.title || 'Watillery event'}" loading="lazy"></div>`
        : '';
    return `
        <article class="event-card">
            ${media}
            <div class="event-body">
                <div class="event-date">
                    <span class="material-symbols-rounded" aria-hidden="true">event</span>
                    ${formatEventDate(event)}
                </div>
                <h4>${event.title || 'Untitled event'}</h4>
                ${event.location ? `<div class="event-location"><span class="material-symbols-rounded" aria-hidden="true">location_on</span>${event.location}</div>` : ''}
                ${event.description ? `<p>${event.description}</p>` : ''}
                ${link}
            </div>
        </article>
    `;
}

function renderEvents() {
    const upcomingEl = document.getElementById('upcomingEvents');
    const pastEl = document.getElementById('pastEvents');
    if (!upcomingEl || !pastEl) return;

    const today = new Date().toISOString().slice(0, 10);
    const list = eventsStore.all().slice().sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));

    // An event is "past" once its last day has arrived.
    const endOf = (e) => e.endDate || e.startDate || '';
    const upcoming = list.filter((e) => endOf(e) > today);
    const past = list.filter((e) => endOf(e) <= today).reverse();

    upcomingEl.innerHTML = upcoming.length
        ? upcoming.map(eventCardHTML).join('')
        : `<div class="events-empty"><span class="material-symbols-rounded" aria-hidden="true">calendar_month</span><p>No upcoming events right now. Check back soon.</p></div>`;

    pastEl.innerHTML = past.length
        ? past.map(eventCardHTML).join('')
        : `<div class="events-empty subtle"><p>Past events will be listed here.</p></div>`;

    pastEl.closest('.events-block').hidden = past.length === 0;
}

window.eventsStore = eventsStore;
document.addEventListener('DOMContentLoaded', renderEvents);
