import { renderMoviesCard } from './renderMoviesGallery';
import { refs } from './refs';
import FilmIndex from './film-index';

export const filmIndexWatchedQueue = new FilmIndex();

refs.btnWatched.addEventListener('click', onBtnWatchedClick);
refs.btnQueue.addEventListener('click', onBtnQueueClick);

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function onBtnWatchedClick() {
  refs.btnWatched.classList.add('isOpenWatched');

  const array = load('watched');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyWatchedQueueMarkup(array);
  }
}

function onBtnQueueClick() {
  refs.btnQueue.classList.add('isOpenQueue');

  const array = load('queue');

  if (!array || array.length === 0) {
    clearLibrary();
  } else {
    createLibralyWatchedQueueMarkup(array);
  }
}

function clearLibrary() {
  refs.gallery.innerHTML = `
  <li>
      <p> There are no films!</p>
  </li>
  `;
}

function createLibralyWatchedQueueMarkup(arr) {
  refs.gallery.innerHTML = ' ';
  filmIndexWatchedQueue.newArr(arr);

  const markup = arr
    .map(
      (
        { id, title, poster_path, genre_ids, release_date, vote_average },
        index
      ) => {
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
                ${genre_ids}  |  ${releasedDate}
                <span class="movie-card__rating">${movieRating}</span>
              </p>
            </div>
          </li>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
