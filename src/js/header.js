import { refs } from './refs';
import {clearLibrary} from './watchQueueBtns';

const libraryLink = document.querySelector(".library");
libraryLink.addEventListener("click", onLibraryClick);

refs={
navList: document.querySelector(".navigation_list"),
searchForm: document.querySelector(".header_form"),
autorization: document.querySelector('.autorization')
}
  
function onLibraryClick(e) {
    e.preventDefault();
    navList.classList.add('.hide');
    searchForm.classList.add('.hide');
    autorization.classList.add('.hide');
    
    refs.btnWatched.classList.add('.show');
    refs.btnQueue.classList.add('.show');

    clearLibrary();
  }