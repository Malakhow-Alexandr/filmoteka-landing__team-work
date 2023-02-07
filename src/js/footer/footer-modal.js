const refs = {
  openModalLink: document.querySelector('.footer-authors-list__authors-link'),
  closeModalBtn: document.querySelector('.footer-modal__button-close'),
  backdrop: document.querySelector('.footer-backdrop'),
  scrollToTop: document.querySelector('.isShownBtn_hide'),
};

refs.openModalLink.addEventListener('click', onOpenModalLinkClick);
refs.closeModalBtn.addEventListener('click', onCloseModalBtnClick);
refs.backdrop.addEventListener('click', onBackDropClick);

function onOpenModalLinkClick(event) {
  event.preventDefault();
  document.body.classList.add('modal-open');
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscBtnPress);
  refs.scrollToTop.classList.add('isShownBtn_hide');
}

function onCloseModalBtnClick(event) {
  document.body.classList.remove('modal-open');
  refs.backdrop.classList.add('is-hidden');
  refs.scrollToTop.classList.remove('isShownBtn_hide');
  window.removeEventListener('keydown', onEscBtnPress);
}

function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModalBtnClick();
  }
}

function onEscBtnPress(event) {
  console.log(event);
  if (event.code === 'Escape') {
    onCloseModalBtnClick();
  }
}
