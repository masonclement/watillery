// Events shown on the homepage. Managed through the developer panel and
// persisted to localStorage so non-developers never touch the code.
const EVENTS_STORAGE_KEY = 'watillery_events';
const EVENTS_SEED_FLAG = 'watillery_events_seeded_v2';

// Events we have already done. These are seeded into localStorage once; after
// that the developer panel owns the list. Bump the flag suffix when this list
// changes so browsers pick up the new version (user-added events are kept).
const SEED_EVENTS = [
    {
        id: 'evt_boatshow_2026',
        title: 'Toronto International Boat Show 2026',
        startDate: '2026-01-17',
        endDate: '2026-01-25',
        location: 'Enercare Centre, Exhibition Place, Toronto',
        description:
            'Ten days on the show floor to kick off our 2026 run. We set up a Watillery booth and handed a blaster to anyone who wanted a go.',
        url: '',
        image: '',
    },
    {
        id: 'evt_cottagelife_2026',
        title: 'Spring Cottage Life Show 2026',
        startDate: '2026-03-26',
        endDate: '2026-03-29',
        location: 'The International Centre, Mississauga',
        description:
            'Our first Cottage Life Show. The perfect crowd for dock battles and poolside soakers, and we came home with a long list of products people asked us to carry.',
        url: '',
        image: '',
    },
    {
        id: 'evt_canadaday_2026',
        title: 'Canada Day 2026',
        startDate: '2026-07-01',
        endDate: '2026-07-01',
        location: 'Downtown Toronto',
        description:
            'We spent Canada Day at the park downtown with a Watillery table, free test-fires, and a lot of very wet, very happy kids.',
        url: '',
        image: '',
    },
    {
        id: 'evt_kempenfest_2026',
        title: 'Kempenfest 2026',
        startDate: '2026-07-31',
        endDate: '2026-08-03',
        location: 'Barrie Waterfront',
        description:
            "Four days on Barrie's waterfront for the long weekend. Art, music, and one very popular water gun booth right on the lake.",
        url: '',
        image: '',
    },
    {
        id: 'evt_cne_2025',
        title: 'The CNE 2025',
        startDate: '2025-08-15',
        endDate: '2025-09-01',
        location: 'Exhibition Place, Toronto',
        description:
            'Our first year at the Canadian National Exhibition. We ran a booth for the whole fair and figured out fast that Watillery belongs at the Ex.',
        url: '',
        image: '',
    },
    {
        id: 'evt_cne_2026',
        title: 'The CNE 2026',
        startDate: '2026-08-21',
        endDate: '2026-09-07',
        location: 'Exhibition Place, Toronto',
        description:
            'Year two at the Canadian National Exhibition. Eighteen days, a bigger booth, non-stop test-fires, and more water-fight fanatics than we could count. Thanks to everyone who stopped by.',
        url: '',
        image: '',
    },
];

function seedEventsIfNeeded() {
    if (localStorage.getItem(EVENTS_SEED_FLAG)) return;
    try {
        const seedIds = new Set(SEED_EVENTS.map((e) => e.id));
        const existing = JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY)) || [];
        // Keep anything added through the panel; refresh the seeded ones.
        const kept = existing.filter((e) => !seedIds.has(e.id));
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify([...kept, ...SEED_EVENTS]));
        localStorage.setItem(EVENTS_SEED_FLAG, '1');
        // Clear the old flag so we don't re-run when it flips back.
        localStorage.removeItem('watillery_events_seeded');
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
