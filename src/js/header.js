import { refs } from './refs';

refs.btnWatched.addEventListener("click", onLibraryClick);

references={
bcgHeader: document.querySelector(".bcg"),
searchForm: document.querySelector(".header_form_search"),
activeLib: document.querySelector('.library'),
libMenu: document.querySelector('header-lib__menu'),
// activeBtnWatched: document.querySelector('watched-active')
}
  
function onLibraryClick(e) {
    e.preventDefault();
    references.bcgHeader.classList.remove('header-bg');
    references.bcgHeader.classList.add('header-lib');
    references.libMenu.classList.remove('.hide');
    references.searchForm.classList.add('.hide');
    references.activeLib.classList.add('.current');
    references.btnWatched.classList.add('.watched-active');
  }
