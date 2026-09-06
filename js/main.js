const navigationLinks = [...document.querySelectorAll('.site-header nav a')];
const galleryImageExtensions = /\.(avif|gif|jpe?g|png|webp)$/i;

const lightbox = document.createElement('dialog');
lightbox.className = 'photo-lightbox';
lightbox.innerHTML = `
    <button class="photo-lightbox-close" type="button" aria-label="Close photo">×</button>
    <figure>
        <img alt="">
        <figcaption>
            <strong></strong>
            <span></span>
        </figcaption>
    </figure>
`;
document.body.append(lightbox);

const openLightbox = (card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('strong');
    const text = card.querySelector('span');
    const lightboxImage = lightbox.querySelector('img');

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.querySelector('strong').textContent = title.textContent;
    lightbox.querySelector('span').textContent = text.textContent;
    lightbox.showModal();
};

const closeLightbox = () => lightbox.close();

lightbox.querySelector('.photo-lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
});
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

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
    card.tabIndex = 0;
    card.role = 'button';
    card.ariaLabel = `Enlarge photo: ${title}`;
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox(card);
        }
    });
    return card;
};

const createDocumentCard = ({ file, title, text, label }) => {
    const card = document.createElement('a');
    card.className = 'project-document';
    card.href = file;
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `
        <span class="project-document-type"></span>
        <strong></strong>
        <span class="project-document-description"></span>
        <span class="project-document-action"></span>
    `;
    card.querySelector('.project-document-type').textContent =
        file.toLowerCase().endsWith('.pdf') ? 'PRESENTATION / PDF' : 'PRESENTATION / PPTX';
    card.querySelector('strong').textContent = title;
    card.querySelector('.project-document-description').textContent = text;
    card.querySelector('.project-document-action').textContent = label || 'OPEN FILE';
    return card;
};

const renderGalleries = () => {
    document.querySelectorAll('.project-gallery').forEach((gallery) => {
        const media = projectGalleries[gallery.dataset.project] || [];
        const images = media
            .filter((item) => item.image && galleryImageExtensions.test(item.image));
        const documents = media.filter((item) => item.file);

        if (!images.length && !documents.length) {
            gallery.classList.add('is-empty');
            gallery.innerHTML = '<span>ADD PHOTOS / PROJECT GALLERY</span>';
            return;
        }

        gallery.append(
            ...images.map(createGalleryCard),
            ...documents.map(createDocumentCard)
        );
    });
};

renderGalleries();

document.querySelectorAll('.project-details').forEach((project) => {
    project.addEventListener('toggle', () => {
        if (!project.open) {
            return;
        }

        project.querySelectorAll('.project-subproject').forEach((subproject) => {
            subproject.open = true;
        });
    });
});

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
