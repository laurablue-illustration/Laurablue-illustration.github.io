document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const categoryButtons = document.querySelectorAll('.category-button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function showCategory(category) {
    galleryItems.forEach((item) => {
      const isMatch = item.classList.contains(`category-${category}`);
      item.style.display = isMatch ? 'block' : 'none';
      item.classList.toggle('is-visible', isMatch);
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const category = button.dataset.category;

      categoryButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      showCategory(category);
    });
  });

  showCategory('ilustracion');

  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.innerHTML = `
    <button class="gallery-modal-close" type="button" aria-label="Cerrar">×</button>
    <div class="gallery-modal-content">
      <img class="gallery-modal-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector('.gallery-modal-image');
  const closeButton = modal.querySelector('.gallery-modal-close');

  function openImage(image) {
    const preload = new Image();
    preload.onload = () => {
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modal.classList.add('is-open');
      document.body.classList.add('gallery-modal-open');
    };
    preload.src = image.src;
  }

  function closeImage() {
    modal.classList.remove('is-open');
    document.body.classList.remove('gallery-modal-open');
    modalImage.src = '';
  }

  galleryItems.forEach((item) => {
    const image = item.querySelector('img');
    if (!image) return;

    if (!item.hasAttribute('data-title')) {
      item.setAttribute('data-title', image.alt);
    }

    item.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openImage(image);
    });
  });

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeImage();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeImage();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeImage();
  });

  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', () => {
      formNote.classList.add('is-visible');
    });
  }
});

