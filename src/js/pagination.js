import { refs } from "./refs"
import MoviesApiService from '../js/moviesApiService';
import RenderMoviesCard from '../js/renderMoviesGallery';


const ApiService = new MoviesApiService();


refs.paginationList.addEventListener('click', onPaginationBtnClick);

console.log(ApiService.page)
renderPagesList()



function onPaginationBtnClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  } else if (evt.target.classList.contains('pagination__list-item')) {
    onClickPage = Number(evt.target.textContent);
    console.log(onClickPage)
  } else if (evt.target.classList.contains('js-previous')) {
    onClickPage -= 1;
  } else if (evt.target.classList.contains('js-next')) {
    onClickPage += 1;
  }

  // cleanInnerMarkup()
  //render img
   
  // checkBtnOpacity();
  
}


function cleanInnerMarkup() {
  refs.gallery.innerHTML = ''
}





function setLastPageNumber(totalPages) {
  refs.lastPaginationBtn.textContent = totalPages;
}
function renderPagesList() {
  const start = 2;
  const end = 5;
  for (let i = start; i <= end; i += 1) {
    if (i > 1 && i < 1000) {
      refs.paginationBtnList.insertAdjacentHTML(
        'beforeend',
        `<li class=""><button type="button" class="pagination__list-item">${i}</button></li>`,
        );
      }
    }
  }

  





  
  // function checkBtnOpacity() {
  //   onClickPage === 1? refs.previousArrow.classList.add('visually-hidden-pagination')
  //     : refs.previousArrow.classList.remove('visually-hidden-pagination');
  //   onClickPage === Number(refs.lastPaginationBtn.textContent)
  //     ? refs.nextArrow.classList.add('visually-hidden-pagination')
  //     : refs.nextArrow.classList.remove('visually-hidden-pagination');
    
  //   if (document.body.clientWidth <= 320) {
  //     refs.paginationLeftDots.classList.add('visually-hidden-pagination');
  //     refs.paginationRightDots.classList.add('visually-hidden-pagination');
  //     onClickPage > 3
  //       ? refs.firstPaginationBtn.classList.add('visually-hidden-pagination')
  //       : refs.firstPaginationBtn.classList.remove('visually-hidden-pagination');
  //     onClickPage < Number(refs.lastPaginationBtn.textContent) - 2
  //       ? refs.refs.lastPaginationBtn.classList.add('visually-hidden-pagination')
  //       : refs.refs.lastPaginationBtn.classList.remove('visually-hidden-pagination');
  //   } else {
  //     onClickPage < 5
  //       ? refs.paginationLeftDots.classList.add('visually-hidden-pagination')
  //       : refs.paginationLeftDots.classList.remove('visually-hidden-pagination');
  //     onClickPage > Number(refs.lastPaginationBtn.textContent) - 4
  //       ? refs.paginationRightDots.classList.add('visually-hidden-pagination')
  //       : refs.paginationRightDots.classList.remove('visually-hidden-pagination');
  //   }
  // }