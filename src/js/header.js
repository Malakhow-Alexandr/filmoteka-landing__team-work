import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';
// close the toggle menu if user clicks outside of the menu

const profileMenu = document.querySelector('.dropdown-menu');

profileMenu.addEventListener('click', function (event) {
  if (profileMenu.className.includes('checked')) {
    profileMenu.classList.remove('checked');
  }
  if (!profileMenu.className.includes('checked')) {
    profileMenu.classList.add('checked');
  }
});
