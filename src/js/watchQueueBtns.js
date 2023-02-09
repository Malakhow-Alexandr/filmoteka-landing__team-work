import { renderMoviesCard } from './renderMoviesGallery';
import { refs } from './refs';
import FilmIndex from './film-index';
import { GENRES } from './fetch-genres';
import { authentitification } from './account';
import { read } from './account';
import { checkInNotifikashka } from './notifikashka';
import Notiflix from 'notiflix';

export const filmIndexWatched = new FilmIndex();
export const filmIndexQueue = new FilmIndex();

refs.btnWatched.addEventListener('click', onBtnWatchedClick);
refs.btnQueue.addEventListener('click', onBtnQueueClick);
refs.myLibrary.addEventListener('click', onMyLibraryClick);

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function onMyLibraryClick(e) {
  if (refs.profile.className.includes('notAcces')) {
    return Notiflix.Notify.failure('Login please, for use the library', {
      checkInNotifikashka,
    });
  }

  if (!refs.btnWatched.className.includes('isOpenWatched')) {
    refs.btnWatched.classList.add('isOpenWatched');
  }
  refs.btnQueue.classList.remove('isOpenQueue');
  refs.headerForm.classList.add('hide');
  refs.btnWatchedQueue.classList.remove('hide');
  refs.headerQueueAcive.classList.add('header-lib_btn');

  refs.headerContainer.classList.remove('header-bg');
  refs.headerContainer.classList.add('header-lib');

  document.querySelector('.pagination-hide').classList.add('hide');
  document.querySelector('.home-current').classList.remove('current');
  refs.myLibrary.classList.add('current');

  const array = load('watched');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyWatchedMarkup(array);
  }
}

function onBtnWatchedClick() {
  refs.btnWatched.classList.add('isOpenWatched');
  refs.btnQueue.classList.remove('isOpenQueue');

  refs.headerWatchedAcive.classList.remove('header-lib_btn');
  refs.headerQueueAcive.classList.add('header-lib_btn');

  // read();
  // const read = async () => {
  //   try {
  //     const readObj = await authentitification.readData();
  //     // const read = await readObj.getThisObj();
  //     console.log(authentitification.state.obj);
  //     return readObj;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // read();

  const array = load('watched');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyWatchedMarkup(array);
  }
}

function onBtnQueueClick() {
  refs.btnQueue.classList.add('isOpenQueue');
  refs.btnWatched.classList.remove('isOpenWatched');

  refs.headerWatchedAcive.classList.add('header-lib_btn');
  refs.headerQueueAcive.classList.remove('header-lib_btn');

  const array = load('queue');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyQueueMarkup(array);
  }
}

export function clearLibrary() {
  refs.gallery.innerHTML = `
  <li style="margin-left: auto; margin-right: auto;">
      <img 
      src='https://www.askideas.com/media/12/Add-Me-Please-Kitten-Face-Picture.jpg' 
      alt=''
  </li>
  `;
}

export function createLibralyWatchedMarkup(arr) {
  refs.gallery.innerHTML = ' ';
  filmIndexWatched.newArr(arr);

  const markup = arr
    .map(
      (
        { id, title, poster_path, genre_ids, release_date, vote_average },
        index
      ) => {
        let genresList = genre_ids.map(
          genreId => GENRES.find(item => item.id === genreId).name
        );
        genresList.length === 0
          ? genresList.push('unknown genre')
          : genresList.join(', ');

        const releasedDate = release_date.slice(0, 4) || '';
        const poster =
          poster_path === null
            ? 'http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg'
            : poster_path;
        const movieRating = vote_average.toFixed(1) || '';
        return `
            <li class="movie-card__item" id="${index}" data-card-id="${id}">
            <div class="movie-card__image-container">
              <img
              
                src="https://image.tmdb.org/t/p/w500/${poster}"
                
                alt="${title}"
                loading="lazy"
              />
            </div>
            <div class="movie-card__info">
              <h2 class="movie-card__title">${title}</h2>
              <p class="movie-card__text">
                ${genresList}  |  ${releasedDate}
                <span class="movie-card__rating">${movieRating}</span>
              </p>
            </div>
          </li>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export function createLibralyQueueMarkup(arr) {
  refs.gallery.innerHTML = ' ';
  filmIndexQueue.newArr(arr);

  const markup = arr
    .map(
      (
        { id, title, poster_path, genre_ids, release_date, vote_average },
        index
      ) => {
        let genresList = genre_ids.map(
          genreId => GENRES.find(item => item.id === genreId).name
        );
        genresList.length === 0
          ? genresList.push('unknown genre')
          : genresList.join(', ');

        const releasedDate = release_date.slice(0, 4) || '';
        const poster =
          poster_path === null
            ? 'http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg'
            : poster_path;
        const movieRating = vote_average.toFixed(1) || '';
        return `
            <li class="movie-card__item" id="${index}" data-card-id="${id}">
            <div class="movie-card__image-container">
              <img
              
                src="https://image.tmdb.org/t/p/w500/${poster}"
                
                alt="${title}"
                loading="lazy"
              />
            </div>
            <div class="movie-card__info">
              <h2 class="movie-card__title">${title}</h2>
              <p class="movie-card__text">
                ${genresList}  |  ${releasedDate}
                <span class="movie-card__rating">${movieRating}</span>
              </p>
            </div>
          </li>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
