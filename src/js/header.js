import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';
// close the toggle menu if user clicks outside of the menu

const profileMenu = document.querySelector('.dropdown-menu');
profileMenu.addEventListener('click', function(event) {
  if(
    $('.toggle > input').is(':checked') && !$(event.target).parents('.toggle').is('.toggle')
  ) {
    $('.toggle > input').prop('checked', false);
  }
})

