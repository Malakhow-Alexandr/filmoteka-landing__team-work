import Notiflix from 'notiflix';

export const searchNotifikashka = Notiflix.Notify.init({
  width: '30%',
  position: 'center-top',
  opacity: 1,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  fontAwesomeIconStyle: 'shadow',
  distance: '100px',

  success: {
    background: 'transparent',
    textColor: 'black',
  },

  failure: {
    background: 'transparent',
    textColor: 'black',
  },
  // ...
});
