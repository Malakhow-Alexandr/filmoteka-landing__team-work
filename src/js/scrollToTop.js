const refs = {
  scrollToTop: document.querySelector('.isShownBtn_hide'),
};

window.onscroll = () => {
  if (window.scrollY > 700) {
    refs.scrollToTop.classList.remove('isShownBtn_hide');
  } else if (window.scrollY < 700) {
    refs.scrollToTop.classList.add('isShownBtn_hide');
  }
};
refs.scrollToTop.onclick = () => {
  window.scrollTo(0, 0);
};
