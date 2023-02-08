import MoviesApiService from '../moviesApiService';
import { filmIndex } from '../renderMoviesGallery';
import { filmIndexWatchedQueue } from '../watchQueueBtns';
import { onOpenTrailer } from '../trailer';
import { refs } from '../refs';
//*=================
import LocalStorage from '../localStorage';

export const localStorage = new LocalStorage();
//*=====================

const filmModalBackdrop = document.querySelector('.film-backdrop');
const filmModalInfo = document.querySelector('.modal-card');
const filmModalCloseBtn = document.querySelector('.modal__btn--close');
const filmModalOpen = document.querySelector('.film-modal--open');

window.addEventListener('keydown', onEscBtn);
filmModalOpen.addEventListener('click', onFilmModalOpen);
filmModalCloseBtn.addEventListener('click', onFilmModalClose);
filmModalBackdrop.addEventListener('click', onFilmModalBackdrop);
refs.backdropForm.addEventListener('click', onFilmModalBackdrop);
refs.trailerBtn.addEventListener('click', onOpenTrailer);

//*======================================================
refs.addRemoveWatchedQueueBtn.addEventListener('click', onAddWatchedBtnClick);

function onAddWatchedBtnClick(e) {
  e.preventDefault();

  if (e.target.name === 'addToWatched') {
    addToLocalStorage('watched');
    refs.addWatchedBtn.classList.add('visually-hidden');
    refs.removeWatchedBtn.classList.remove('visually-hidden');
  }
  if (e.target.name === 'addToQueue') {
    addToLocalStorage('queue');
    refs.addQueue.classList.add('visually-hidden');
    refs.removeQueue.classList.remove('visually-hidden');
  }
  if (e.target.name === 'removeFromWatched') {
    removeFromStorage('watched');
    refs.addWatchedBtn.classList.remove('visually-hidden');
    refs.removeWatchedBtn.classList.add('visually-hidden');
  }
  if (e.target.name === 'removeFromQueue') {
    removeFromStorage('queue');

    refs.addQueue.classList.remove('visually-hidden');
    refs.removeQueue.classList.add('visually-hidden');
  }
}
//*=======================================================

function onFilmModalOpen(event) {
  event.preventDefault();
  const { id } = event.target.closest('li');
  const numberId = Number(id);

  if (
    !refs.btnWatched.className.includes('isOpenWatched') &&
    !refs.btnQueue.className.includes('isOpenQueue')
  ) {
    const filmIndexArr = [];

    const filmCardObject = filmIndex.arr[numberId];

    filmIndexArr.push(filmCardObject);
    filmIndex.id = numberId;

    createFilmModalCardMarkup(filmIndexArr);

    refs.trailerBtn.setAttribute('data-id', `${filmCardObject.id}`);

    chekButton(filmCardObject);
  }

  if (
    refs.btnWatched.className.includes('isOpenWatched') ||
    refs.btnQueue.className.includes('isOpenQueue')
  ) {
    const filmArrWatchedQueue = [];

    filmIndexWatchedQueue.id = numberId;

    const filmCardObjWatchQueue = filmIndexWatchedQueue.arr[numberId];

    filmArrWatchedQueue.push(filmCardObjWatchQueue);

    createFilmModalCardMarkup(filmArrWatchedQueue);

    refs.btnTrailer.setAttribute('data-id', `${filmCardObjWatchQueue.id}`);

    chekButton(filmCardObjWatchQueue);
  }

  window.addEventListener('keydown', onEscBtn);
  filmModalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  //* =======================================

  //*========================================
}

function onFilmModalClose(event) {
  refs.backdropForm.classList.add('is-hidden');
  filmModalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscBtn);

  //*===============================================
  refs.addWatchedBtn.classList.remove('visually-hidden');
  refs.removeWatchedBtn.classList.add('visually-hidden');
  refs.addQueue.classList.remove('visually-hidden');
  refs.removeQueue.classList.add('visually-hidden');
  //*===============================================
}

export function onFilmModalBackdrop(event) {
  if (event.currentTarget === event.target) {
    onFilmModalClose();
  }
}

export function onEscBtn(event) {
  if (event.code === 'Escape') {
    onFilmModalClose();
  }
}

function createFilmModalCardMarkup(arr) {
  const markup = arr
    .map(
      ({
        id,
        poster_path,
        title,
        original_title,
        vote_average,
        vote_count,
        popularity,
        overview,
        genre_ids,
      }) =>
        `
            <div class="modal-card__poster">
                <img class="modal-card__poster--img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy"/>
            </div>

            <div class="modal-card__layout" >
                <h2 class="modal-card__title  card-uppertext">${title}</h2>
                <table modal-card__table>
                    <tbody class="modal-card__info">
                        <tr>
                            <td class="modal-card__info-name">Vote / Votes</td>
                            <td class="modal-card__info-value  modal-card__info-value--mod">
                            <span class="vote-value">${vote_average}</span>
                            <span class="votes-value">${vote_count}</span> </td>
                        </tr>
                    </tbody>


                    <tbody class="modal-card__info">
                        <tr>
                            <td class="modal-card__info-name">Popularity</td>
                            <td class="modal-card__info-value">${popularity}</td>
                        </tr>
                    </tbody>

                    <tbody class="modal-card__info">
                        <tr>
                            <td class="modal-card__info-name">Original Title</td>
                            <td class="modal-card__info-value  modal-card__info-value--lh">${original_title}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td class="modal-card__info-name">Genre</td>
                            <td class="modal-card__info-value modal-card__info-value--lh"> ${genre_ids} </td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="modal-card__desc card-uppertext">About</h3>
                <p class="modal-card__desc-text">
                    ${overview}
                </p>
            `
    )
    .join('');

  filmModalInfo.innerHTML = markup;
}

// export {onFilmModalOpen}

//*==========================================

function addToLocalStorage(keyToLocalStorage) {
  const array = [];
  if (localStorage.load(keyToLocalStorage) !== undefined) {
    localStorage.load(keyToLocalStorage).map(el => array.push(el));
  }
  filmIndex.newObject();
  array.push(filmIndex.object);

  localStorage.save(keyToLocalStorage, array);
}

function removeFromStorage(keyFromLocalStorage) {
  const array = [];
  let index = 0;
  localStorage.load(keyFromLocalStorage).map(el => array.push(el));
  filmIndex.newObject();

  array.map((el, idx) => {
    if (el.id === filmIndex.object.id) {
      index = idx;
      return index;
    }
  });

  array.splice(index, 1);
  console.log(array);
  localStorage.save(keyFromLocalStorage, array);
}
//*=====================================================

function chekButton(filmObj) {
  if (localStorage.load('watched') !== undefined) {
    localStorage.load('watched').map(el => {
      if (el.id === filmObj.id) {
        refs.addWatchedBtn.classList.add('visually-hidden');
        refs.removeWatchedBtn.classList.remove('visually-hidden');
      }
    });
  }
  if (localStorage.load('queue') !== undefined) {
    localStorage.load('queue').map(el => {
      if (el.id === filmObj.id) {
        refs.addQueue.classList.add('visually-hidden');
        refs.removeQueue.classList.remove('visually-hidden');
      }
    });
  }
}
