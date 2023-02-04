
const paginationList = document.querySelector('.pagination')
const paginationBtnList =  document.querySelector('.pagination__list')
const firstPaginationBtn = document.querySelector('#first-btn')
const lastPaginationBtn = document.querySelector('#last-btn')
const previousArrow = document.querySelector('.js-previous')
const nextArrow = document.querySelector('.js-next')
const paginationRightDots = document.querySelector('.js-right-dots')
const paginationLeftDots = document.querySelector('.js-left-dots')
//нужно запихнуть в рефсы



function createImagesMarkup(element, place, data) {
  element.insertAdjacentHTML(place, data);
}

function createInnerMarkup(element, data) {
  element.innerHTML = data;
}

function cleanInnerMarkup(element) {
  element.innerHTML = '';
}
/////////////////////////////////////////////////////////

function renderImages(query) {
  getApiData(query).then(result => {
    if (result.results.length === 0) {
      alertNothingIsFound();
    }
    pagination(query, result);
    createInnerMarkup(filmsEl, filmsTemplate(result.results));
  });
}
/////////////////////////////////////////////////////



paginationList.addEventListener('click', onPaginationBtnClick);

let searchQuery = '';
let onClickPage = 1;
let totalPages = 0;
let btnSummary = 2;

