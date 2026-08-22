const navigationLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const updateActiveLink = () => {
    const currentSection = sections.reduce((activeSection, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 100);
        return distance < activeSection.distance ? { section, distance } : activeSection;
    }, { section: sections[0], distance: Infinity }).section;

    navigationLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
    });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
updateActiveLink();
