
const paginationList = document.querySelector('.pagination');
//midle btn list
const paginationBtnList =  document.querySelector('.pagination__list');
const firstPaginationBtn = document.querySelector('#first-btn');
const lastPaginationBtn = document.querySelector('#last-btn');
const previousArrow = document.querySelector('.js-previous');
const nextArrow = document.querySelector('.js-next');
const paginationRightDots = document.querySelector('.js-right-dots');
const paginationLeftDots = document.querySelector('.js-left-dots');
const filmsEl = document.querySelector('.films');
// for spiner
const pagePreloader = document.getElementById('page-preloader');
//в рефсы


///слушатель на лист с кнопками 
paginationList.addEventListener('click', onPaginationBtnClick);

let searchQuery = '';
let onClickPage = 1;
let totalPages = 0;
let btnSummary = 2;


function onPaginationBtnClick(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  } else if (evt.target.classList.contains('pagination__list-item')) {
    onClickPage = Number(evt.target.textContent);
  } else if (evt.target.classList.contains('js-previous')) {
    onClickPage -= 1;
  } else if (evt.target.classList.contains('js-next')) {
    onClickPage += 1;
  }


  // clean window
  cleanInnerMarkup(paginationBtnList);

  //request page?? (to fetch)
  const newPage = `${searchQuery}&page=${onClickPage}`;

  //render img
  renderImages(newPage, filmsEl);

  // check btn 
  checkBtnOpacity();
  
}

//render IMG
function renderImages(query) {
  getApiData(query).then(result => {
    if (result.results.length === 0) {
      console.log('длина результата 0')
    }
    pagination(query, result);
    createInnerMarkup(filmsEl, filmsTemplate(result.results));
  });
}


function createImagesMarkup(element, place, data) {
  element.insertAdjacentHTML(place, data);
}
function createInnerMarkup(element, data) {
  element.innerHTML = data;
}
function cleanInnerMarkup(element) {
  element.innerHTML = '';
}



/// пока тут(конект в наш апи )
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '0fa5981d55037b4698e315d74908e1b9';
export const getApiData = query => {
  showSpiner();
  let langs = getFromLocalStorage('lang')
  return axios
    .get(`${query}&api_key=${API_KEY}&append_to_response=videos&language=${langs}`)
    .then(response => {
      return response.data;
    })
    .catch(onFetchError)
    .finally(hideSpiner);
};

///

/// SPINER пагинации (можно вынести) ///
function showSpiner() {
  pagePreloader.classList.remove('done');
}
function hideSpiner() {
  pagePreloader.classList.add('done');
}

window.addEventListener('load', () => {
  setTimeout(() => {
    pagePreloader.classList.add('done');
  }, 1000);
});

///

/// GET||SET from LOCAL STORAGE /////
function setToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const savedData = localStorage.getItem(key);
  const parsedData = JSON.parse(savedData);
  return parsedData;
}
////


/// NOTIFICATION ERROR (отдельно)///
import Notiflix from 'notiflix';

function showNotify(key, text) {
  Notiflix.Notify[key](text);
}

function onFetchError(error) {
  showNotify('failure', 'Something went wrong.\r\n(Error code: ' + error.response.status + ')');
}

function alertEnterQuery() {
  showNotify('warning', 'Please, type your search');
}

function alertNothingIsFound() {
  showNotify('warning', 'No movie titles found');
}

// settings
Notiflix.Notify.init({
  width: '240px',
  position: 'center-top',
  distance: '20px',
  timeout: 3000,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,
  fontSize: '14px',

  warning: {
    background: '#ff6b08',
    notiflixIconColor: 'rgba(255,255,255,0.9)',
  },
  failure: {
    background: '#f00',
    notiflixIconColor: 'rgba(255,255,255,0.9)',
  },
  success: {
    background: '#32c682',
    notiflixIconColor: 'rgba(255,255,255,0.9)',
  },
  info: {
    background: '#26c0d3',
    notiflixIconColor: 'rgba(255,255,255,0.9)',
  },
});

///


/// check btn ///

function checkBtnOpacity() {
  onClickPage === 1
    ? previousArrow.classList.add('visually-hidden')
    : previousArrow.classList.remove('visually-hidden');
  onClickPage === Number(lastPaginationBtn.textContent)
    ? nextArrow.classList.add('visually-hidden')
    : nextArrow.classList.remove('visually-hidden');
  if (document.body.clientWidth <= 320) {
    paginationLeftDots.classList.add('visually-hidden');
    paginationRightDots.classList.add('visually-hidden');
    onClickPage > 3
      ? firstPaginationBtn.classList.add('visually-hidden')
      : firstPaginationBtn.classList.remove('visually-hidden');
    onClickPage < Number(lastPaginationBtn.textContent) - 2
      ? lastPaginationBtn.classList.add('visually-hidden')
      : lastPaginationBtn.classList.remove('visually-hidden');
  } else {
    onClickPage < 5
      ? paginationLeftDots.classList.add('visually-hidden')
      : paginationLeftDots.classList.remove('visually-hidden');
    onClickPage > Number(lastPaginationBtn.textContent) - 4
      ? paginationRightDots.classList.add('visually-hidden')
      : paginationRightDots.classList.remove('visually-hidden');
  }
}
///



///pafination fn //
function pagination(query, result) {
  searchQuery = query;
  onClickPage = result.page;
  cleanInnerMarkup(paginationBtnList);
  exchangeObjectData(result);
  setLastPageNumber(result.total_pages);
  renderPagesList(result.total_pages);
  currentBtnClass();
  checkBtnOpacity();
}
///
function setLastPageNumber(totalPages) {
  lastPaginationBtn.textContent = totalPages;
}
////

////перебор жанров ///
function getGenreNameById(genreIds) {
  let newArray = [];
  genreIds.forEach(genreId => {
    getGenresFromLocalStorage().map(genre => {
      if (genre.id === genreId) {
        newArray.push(genre.name);
      }
    });
  });
  return newArray;
}

function exchangeObjectData(result) {
  result.results.forEach(obj => {
    if (obj.genre_ids) {
      obj.genre_ids = getGenreNameById(obj.genre_ids);
    }
    if (obj.release_date) {
      obj.release_date = obj.release_date.slice(0, 4);
    }
  });
}
//////
function setGenresToLocalStorage() {
  let query = `genre/movie/list?`;
  getApiData(query)
    .then(result => {
      setToLocalStorage('genres', result)
    });
}
setGenresToLocalStorage()

function getGenresFromLocalStorage() {
  return getFromLocalStorage('genres').genres
}



////
function renderPagesList(totalPages) {
  const start = onClickPage - btnSummary;
  const end = onClickPage + btnSummary;
  for (let i = start; i <= end; i += 1) {
    if (i > 1 && i < totalPages) {
      paginationBtnList.insertAdjacentHTML(
        'beforeend',
        `<li class=""><button type="button" class="pagination__list-item">${i}</button></li>`,
      );
    }
  }
}
/////
function currentBtnClass() {
  let paginationBtns = paginationList.querySelectorAll('button');
  for (let i = 0; i < paginationBtns.length; i += 1) {
    if (Number(paginationBtns[i].textContent) === onClickPage) {
      paginationBtns[i].classList.add('pagination__current-btn');
    } else if (Number(paginationBtns[i].textContent) !== onClickPage) {
      paginationBtns[i].classList.remove('pagination__current-btn');
    }
  }
}