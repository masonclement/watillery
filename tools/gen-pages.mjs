// Generates the simple documentation / account pages so they all share the
// same chrome and script order. Run: node tools/gen-pages.mjs
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const head = (title, desc) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="icon" type="image/png" href="img/icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="sections.css">
    <link rel="stylesheet" href="auth-styles.css">
</head>`;

const scripts = `    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script>window.emailjs && emailjs.init({ publicKey: 'oIzl4RHrfOtpbyh72' });</script>
    <script src="database.js"></script>
    <script src="email-service.js"></script>
    <script src="partials.js"></script>
    <script src="team.js"></script>
    <script src="events.js"></script>
    <script src="promos.js"></script>
    <script src="admin-panel.js"></script>
    <script src="products.js"></script>
    <script src="cart.js"></script>
    <script src="slideshow.js"></script>
    <script src="main.js"></script>`;

const docPage = ({ page, title, desc, heading, sub, note, body }) => `${head(title, desc)}
<body data-page="${page}">
    <div data-partial="nav"></div>
    <section class="page-hero short">
        <div class="container">
            <h1>${heading}</h1>
            <p>${sub}</p>
        </div>
        <div class="hero-wave" aria-hidden="true">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,52 C240,96 480,96 720,56 C960,16 1200,8 1440,48 L1440,100 L0,100 Z"></path></svg>
        </div>
    </section>
    <section class="doc-page">
        <div class="container">
${note ? `            <div class="doc-note">${note}</div>\n` : ''}${body}
        </div>
    </section>
    <div data-partial="footer"></div>
    <div data-partial="modals"></div>
${scripts}
</body>
</html>
`;

const pages = [
    {
        file: 'privacy-policy.html', page: 'privacy',
        title: 'Privacy Policy | Watillery', desc: 'How Watillery collects, uses and protects your information.',
        heading: 'Privacy Policy', sub: 'What we collect, why, and what you can do about it.',
        note: 'Last updated: August 4, 2025. This is a plain-language summary of how Watillery handles personal information.',
        body: `            <p>This policy covers watillery.com and everything you do on it: browsing, creating an account, placing an order, or contacting us. By using the site you agree to what is described here.</p>

            <h2>What we collect</h2>
            <p><strong>Information you give us.</strong> When you create an account, place an order, subscribe to the newsletter, or message us, we collect what you provide: username, email address, name, phone number, and shipping and billing address.</p>
            <p><strong>Information collected automatically.</strong> Like most sites, we log basic technical data when you visit: IP address, browser type and version, the pages you view, and the date, time and length of your visit. On mobile this may also include device type and operating system.</p>

            <h2>Cookies</h2>
            <p>We use cookies and similar technologies for a few purposes:</p>
            <ul>
                <li><strong>Essential</strong> cookies keep you signed in and keep your cart working. The site does not function properly without them.</li>
                <li><strong>Preference</strong> cookies remember choices like language so you do not have to set them every visit.</li>
                <li><strong>Consent</strong> cookies remember that you have seen the cookie notice.</li>
            </ul>
            <p>You can block or delete cookies in your browser settings, but some parts of the site may stop working.</p>

            <h2>How we use your information</h2>
            <ul>
                <li>To take payment, fulfil and ship your orders, and provide support.</li>
                <li>To manage your account and keep it secure.</li>
                <li>To reply to your messages and requests.</li>
                <li>To send order updates, and, only if you opt in, occasional news and offers. You can unsubscribe any time.</li>
                <li>To understand how the site is used so we can improve it.</li>
            </ul>

            <h2>When we share it</h2>
            <p>We do not sell your personal information. We share it only with service providers who help us run the business (payment processing, shipping, email delivery, analytics), and only what they need to do that job. We may also disclose information if the law requires it, or if the business is ever sold or merged, in which case we will let you know first.</p>

            <h2>How long we keep it</h2>
            <p>We keep personal data only as long as needed for the purposes above, or as long as the law requires us to (for example, tax and order records). Technical logs are kept for a shorter period.</p>

            <h2>Your rights</h2>
            <p>You can ask us to show you, correct, or delete the personal information we hold about you. If you have an account you can update most details in your account settings. For anything else, email <a href="contact.html">info@watillery.com</a>. We may need to keep certain records where we have a legal obligation to.</p>

            <h2>Children</h2>
            <p>The site is not aimed at children under 13 and we do not knowingly collect their information. If you believe a child has given us personal data, contact us and we will remove it.</p>

            <h2>Other sites</h2>
            <p>Pages here may link to sites we do not run. We are not responsible for their content or privacy practices, so check their policies before sharing anything.</p>

            <h2>Changes</h2>
            <p>If this policy changes we will post the new version here and update the date above. Significant changes will also be sent by email or shown on the site.</p>

            <h2>Contact</h2>
            <p>Questions about privacy: <a href="contact.html">info@watillery.com</a>, or use the <a href="contact.html">contact form</a>.</p>`,
    },
    {
        file: 'shipping.html', page: 'shipping',
        title: 'Shipping | Watillery', desc: 'Watillery shipping times, rates and tracking.',
        heading: 'Shipping', sub: 'Where we ship and how long it takes.',
        note: 'Placeholder copy for the rebuild. Final wording comes from the real watillery.com pages once we have access.',
        body: `            <h2>Processing</h2>
            <p>Orders are usually packed and handed to the carrier within 1 to 3 business days.</p>
            <h2>Delivery estimates</h2>
            <ul>
                <li>Canada: 3 to 8 business days after dispatch.</li>
                <li>United States: 5 to 12 business days after dispatch.</li>
                <li>International: 10 to 25 business days, depending on customs.</li>
            </ul>
            <h2>Tracking</h2>
            <p>Every parcel ships with tracking. You get the number by email as soon as the label is created.</p>
            <h2>Duties and taxes</h2>
            <p>Orders outside Canada may be charged import duties or taxes on delivery. Those are set by your country and are the buyer's responsibility.</p>`,
    },
    {
        file: 'refund-returns.html', page: 'refunds',
        title: 'Refunds & Returns | Watillery', desc: 'Watillery refund and return policy.',
        heading: 'Refunds & Returns', sub: 'The short version: we help with anything that arrives broken.',
        note: 'Placeholder copy for the rebuild. Final wording comes from the real watillery.com pages once we have access.',
        body: `            <h2>Damaged or wrong items</h2>
            <p>If your order shows up damaged, defective, or not what you ordered, email <a href="contact.html">info@watillery.com</a> within 7 days of delivery with photos and your order number. We will replace it or refund it.</p>
            <h2>Change of mind</h2>
            <p>Because these are water toys that get used outdoors, we do not accept change-of-mind returns on opened items. Unopened items can be returned within 14 days at the buyer's shipping cost.</p>
            <h2>Refund timing</h2>
            <p>Approved refunds go back to the original payment method within 5 to 10 business days.</p>`,
    },
    {
        file: 'terms.html', page: 'terms',
        title: 'Terms of Service | Watillery', desc: 'Terms for using the Watillery site and buying from us.',
        heading: 'Terms of Service', sub: 'The ground rules for using this site.',
        note: 'Placeholder copy for the rebuild. Final wording comes from the real watillery.com pages once we have access.',
        body: `            <h2>Using the site</h2>
            <p>By using this site you agree to these terms. If you do not agree, please do not use the site.</p>
            <h2>Orders</h2>
            <p>Placing an order is an offer to buy. We may decline or cancel an order, for example if an item is mispriced or out of stock, and will refund anything already charged.</p>
            <h2>Product use</h2>
            <p>Our products are recreational water toys. Use them responsibly, follow the age guidance on the packaging, and supervise young children.</p>
            <h2>Liability</h2>
            <p>To the extent the law allows, Watillery is not liable for indirect or incidental damages arising from use of the products or the site.</p>`,
    },
    {
        file: 'faq.html', page: 'faq',
        title: 'FAQ | Watillery', desc: 'Common questions about Watillery products and orders.',
        heading: 'FAQ', sub: 'Quick answers to the questions we get most.',
        note: '',
        body: `            <h2>Are the batteries included?</h2>
            <p>Rechargeable models ship with the battery and a USB charging cable. A few basic models take AA batteries, which are not included; the product page says which.</p>
            <h2>How far do they shoot?</h2>
            <p>Range is listed on each product page. Electric models generally reach further than manual pump blasters.</p>
            <h2>Are gel-pellet shooters safe?</h2>
            <p>They fire soft water-filled gel beads. Eye protection is still recommended and they are not for young children.</p>
            <h2>Can I change or cancel my order?</h2>
            <p>Email us right away at <a href="contact.html">info@watillery.com</a>. If it has not shipped yet we can usually change it.</p>`,
    },
    {
        file: 'my-account.html', page: 'account',
        title: 'My Account | Watillery', desc: 'Your Watillery account and orders.',
        heading: 'My Account', sub: 'Orders and account settings.',
        note: 'Accounts currently live in this browser only. Order history and profile editing land when the backend is connected.',
        body: `            <h2>Signed in</h2>
            <p>Use the account menu in the top right to sign out. To change your password for now, sign out and use "Forgot password?" on the sign-in screen.</p>
            <h2>Orders</h2>
            <p>Past orders will appear here once checkout is live.</p>`,
    },
];

for (const p of pages) {
    await writeFile(path.resolve(p.file), docPage(p));
    console.log('wrote', p.file);
}
