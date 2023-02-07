import Notiflix from 'notiflix';

export default searchNotifikashka = Notiflix.Notify.init({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  messageMaxLength: 400,
  position: 'center-top',
  opacity: 1,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  fontAwesomeIconStyle: 'shadow',
  distance: '120px',

  success: {
    background: '#FF6B02',
    textColor: 'green',
  },

  failure: {
    background: '#FF6B02',
    textColor: 'black',
  },
  // ...
});

// function notifikashka() {
//   Notiflix.Notify.success('За ваши запитом показано 230 результатів', {
//     searchNotifikashka,
//   });
// }
// const button = document.querySelector('.notif');
const body = document.querySelector('body');
// console.log(body);
// button.addEventListener('click', notificashka);

// export default

function notificashka() {
  const murkup = `<div class="notif-container">
  <p class="notif-text">За вашим запитом знайдено 100 результатів</p>
  </div>`;
  body.insertAdjacentHTML('beforeend', murkup);
  const container = document.querySelector('.notif-container');

  setTimeout(function clear() {
    container.remove();
  }, 5000);
}
