import images from "./gallery-items.js"

const refs = {
  galleryListEl: document.querySelector('.js-gallery'),
  lightboxEl: document.querySelector('.lightbox'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('.lightbox__button'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
};

// 1 Епат

const createGalleryCards = image => {
        return`
<li class="gallery__item">
<a
  class="gallery__link"
  href="${image.original}"
>
  <img
    class="gallery__image"
    src="${image.preview}"
    data-source="${image.original}"
    alt="${image.description}"
  />
</a>
</li>`
};
const makeGalleryRow = images.map(createGalleryCards).join('');
refs.galleryListEl.insertAdjacentHTML('afterbegin', makeGalleryRow);

// 2 Етап

function onImageClickHandler(el) {
  el.preventDefault();
  
  if(el.target.nodeName === 'IMG') {
    refs.lightboxEl.classList.add('is-open');
    refs.lightboxImageEl.src = el.target.dataset.source;
    refs.lightboxImageEl.alt = el.target.alt;
  }
}

function onImageCloseHandler(el) {
  if(el.target.nodeName === 'BUTTON') {
    refs.lightboxEl.classList.remove('is-open');
    refs.lightboxImageEl.removeAttribute('src');
    refs.lightboxImageEl.removeAttribute('alt');
  }
}

refs.galleryListEl.addEventListener('click', onImageClickHandler);
refs.lightboxBtn.addEventListener('click', onImageCloseHandler);

// Доп задания //

// Не работате...........................................................

function closeModalByEsc() {
  window.removeEventListener('click', onPressEsc);
  refs.lightboxEl.classList.remove('is-open');
  refs.lightboxImageEl.removeAttribute('src');
  refs.lightboxImageEl.removeAttribute('alt');
}

function onPressEsc(event) {
  if(event.key === 'Escape' || event.key === "Esc"){
    closeModalByEsc();
  }
}

//........... Работает только при 1 разе:..............

// document.onkeydown = function(event) {
//   event = event || window.event;
//   if (event.key === "Escape" || event.key === "Esc"){
//     refs.lightboxEl.classList.remove('is-open');
//   }
// }

// Закрытие по lightboxOverlay

    function onCloseImageToClickLightboxOverlay(event) {
      if (event.target === refs.lightboxOverlayEl) {
        refs.lightboxEl.classList.remove('is-open');
        refs.lightboxImageEl.removeAttribute('src');
        refs.lightboxImageEl.removeAttribute('alt');
      }
    }

    refs.lightboxEl.addEventListener('click', onCloseImageToClickLightboxOverlay);






    
    
    // Для точного попадагния на елемент
    
    // function onGalleryCardsClick(evt) {
    //     const isGalleryEl = evt.target.classList.contains('gallery__image');
    //     if(!isGalleryEl) {
    //         return
    //     }
    //     console.log(evt.target);
    // }