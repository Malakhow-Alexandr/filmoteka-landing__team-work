import Notiflix from 'notiflix';

export const checkInNotifikashka = Notiflix.Notify.init({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  messageMaxLength: 400,
  width: '180px',
  // distance: '100px',
  opacity: 1,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  fontAwesomeIconStyle: 'shadow',

  success: {
    background: '#FF6B02',
    textColor: '#fff',
  },

  failure: {
    background: '#e20202',
    textColor: '#fff',
  },
  // ...
});

// function notifikashka() {
//   Notiflix.Notify.success('user admin', {
//     checkInNotifikashka,
//   });
// }

const body = document.querySelector('body');

export default function searchNotificashka(result) {
  const murkup = `<div class="notif-container">
  <p class="notif-text">We found ${result} movies for you</p>
  </div>`;
  body.insertAdjacentHTML('beforeend', murkup);
  const container = document.querySelector('.notif-container');

  setTimeout(function clear() {
    container.remove();
  }, 5000);
}
