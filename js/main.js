const navigationLinks = [...document.querySelectorAll('.site-header nav a')];
const galleryImageExtensions = /\.(avif|gif|jpe?g|png|webp)$/i;

const createGalleryCard = ({ image, title, text, alt }) => {
    const card = document.createElement('figure');
    const imageElement = document.createElement('img');
    const caption = document.createElement('figcaption');
    const titleElement = document.createElement('strong');
    const textElement = document.createElement('span');

    imageElement.alt = alt || title;
    imageElement.loading = 'lazy';
    imageElement.src = image;
    titleElement.textContent = title;
    textElement.textContent = text;
    caption.append(titleElement, textElement);
    card.append(imageElement, caption);
    return card;
};

const renderGalleries = () => {
    document.querySelectorAll('.project-gallery').forEach((gallery) => {
        const images = (projectGalleries[gallery.dataset.project] || [])
            .filter((item) => item.image && galleryImageExtensions.test(item.image));

        if (!images.length) {
            gallery.classList.add('is-empty');
            gallery.innerHTML = '<span>ADD PHOTOS / PROJECT GALLERY</span>';
            return;
        }

        gallery.append(...images.map(createGalleryCard));
    });
};

renderGalleries();

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
