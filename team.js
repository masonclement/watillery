// The Watillery team, listed in order of importance.
// Photos fall back to the generic avatars in img/.
const TEAM_MEMBERS = [
    {
        name: 'Ferhan Qureshi',
        roles: ['Founder', 'CEO', 'Sales Representative', 'Logistics Manager'],
        photo: 'img/pfp_male.png',
    },
    {
        name: 'Arfa Shah',
        roles: ['CFO', 'Sales Representative'],
        photo: 'img/pfp_female.png',
    },
    {
        name: 'Mason Clement',
        roles: ['Marketing Director', 'Web Developer', 'Sales Representative'],
        photo: 'img/pfp_male.png',
    },
    {
        name: 'Hayqa Shah',
        roles: ['Marketing Manager', 'Sales Representative'],
        photo: 'img/pfp_female.png',
    },
    {
        name: 'Rida Shah',
        roles: ['Content Creator', 'Sales Representative'],
        photo: 'img/pfp_female.png',
    },
    {
        name: 'Zoya Agloria',
        roles: ['Sales Representative'],
        photo: 'img/pfp_female.png',
    },
    {
        name: 'Ermina Qureshi',
        roles: ['Sales Representative'],
        photo: 'img/pfp_female.png',
    },
];

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    grid.innerHTML = TEAM_MEMBERS.map((member) => `
        <div class="team-card">
            <img src="${member.photo}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.roles.join('<br>')}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderTeam);
