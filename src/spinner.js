window.addEventListener('load', () => {
  const spin = document.querySelector('.spinner');
  spin.classList.add('spinner--hidden');
  spin.addEventListener('transitionend', () => {
    document.body.removeChild(spin);
  });
});
