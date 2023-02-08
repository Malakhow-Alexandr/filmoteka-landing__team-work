import { renderMoviesCard } from './renderMoviesGallery';
import { refs } from './refs';
import FilmIndex from './film-index';
import { GENRES } from './fetch-genres';
import { authentitification } from './account';
import { read } from './account';

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
  if (!refs.btnWatched.className.includes('isOpenWatched')) {
    refs.btnWatched.classList.add('isOpenWatched');
  }
  refs.btnQueue.classList.remove('isOpenQueue');
  refs.headerForm.classList.add('visually-hidden');
  refs.btnWatchedQueue.classList.remove('visually-hidden');

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

  const array = load('queue');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyQueueMarkup(array);
  }
}

function clearLibrary() {
  refs.gallery.innerHTML = `
  <li>
      <p> There are no films!</p>
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
