import 'animate.css';
const refs = {
  scrollToTop: document.querySelector('.isShownBtn_hide'),
};

window.onscroll = () => {
  if (window.scrollY > 700) {
    refs.scrollToTop.classList.remove('isShownBtn_hide');
    refs.scrollToTop.classList.add(
      'animate__animated',
      'animate__bounceInRight'
    );
  } else if (window.scrollY < 700) {
    refs.scrollToTop.classList.add('isShownBtn_hide');
    refs.scrollToTop.classList.remove(
      'animate__animated',
      'animate__bounceInRight'
    );
  }
};
refs.scrollToTop.onclick = () => {
  window.scrollTo(0, 0);
};
