import { filmIndex } from '../renderMoviesGallery';
import { filmIndexWatchedQueue } from '../watchQueueBtns';
import { onOpenTrailer } from '../trailer';
import { filmIndexWatched, filmIndexQueue } from '../watchQueueBtns';
import {
  createLibralyQueueMarkup,
  createLibralyWatchedMarkup,
} from '../watchQueueBtns';
import { refs } from '../refs';
import LocalStorage from '../localStorage';
import { GENRES } from '../fetch-genres';
import { authentitification } from '../account';
import { onOpenTrailer } from '../trailer';

// import { checkInNotifikashka } from '../notifikashka';
import Notiflix from 'notiflix';

export const localStorage = new LocalStorage();

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
    const array = [];
    if (localStorage.load('watched') !== undefined) {
      localStorage.load('watched').map(el => array.unshift(el));
    }

    if (
      !refs.btnWatched.className.includes('isOpenWatched') &&
      !refs.btnQueue.className.includes('isOpenQueue')
    ) {
      filmIndex.newObject();
      array.unshift(filmIndex.object);

      localStorage.save('watched', array);
    }

    if (refs.btnQueue.className.includes('isOpenQueue')) {
      filmIndexQueue.newObject();
      array.unshift(filmIndexQueue.object);

      localStorage.save('watched', array);
    }
    if (refs.btnWatched.className.includes('isOpenWatched')) {
      const arrWatched = [];

      localStorage.load('watched').map(el => arrWatched.unshift(el));

      arrWatched.unshift(filmIndexWatched.removeEl[0]);

      localStorage.save('watched', arrWatched);
      createLibralyWatchedMarkup(arrWatched);
    }

    refs.addWatchedBtn.classList.add('visually-hidden');
    refs.removeWatchedBtn.classList.remove('visually-hidden');
  }
  //********************* */

  if (e.target.name === 'addToQueue') {
    const array = [];
    if (localStorage.load('queue') !== undefined) {
      localStorage.load('queue').map(el => {
        return array.unshift(el);
      });
    }
    if (
      !refs.btnWatched.className.includes('isOpenWatched') &&
      !refs.btnQueue.className.includes('isOpenQueue')
    ) {
      filmIndex.newObject();
      array.unshift(filmIndex.object);

      localStorage.save('queue', array);
      authentitification.userSetQueue(array);
      authentitification.writeToDataBase();
    }
    if (refs.btnWatched.className.includes('isOpenWatched')) {
      filmIndexWatched.newObject();
      array.unshift(filmIndexWatched.object);

      localStorage.save('queue', array);
    }
    if (refs.btnQueue.className.includes('isOpenQueue')) {
      const arrQueue = [];

      localStorage.load('queue').map(el => arrQueue.unshift(el));

      arrQueue.unshift(filmIndexQueue.removeEl[0]);

      localStorage.save('queue', arrQueue);
      createLibralyQueueMarkup(arrQueue);
    }

    refs.addQueue.classList.add('visually-hidden');
    refs.removeQueue.classList.remove('visually-hidden');
  }

  if (e.target.name === 'removeFromWatched') {
    const array = [];
    let index = 0;
    localStorage.load('watched').map(el => array.unshift(el));
    if (
      !refs.btnWatched.className.includes('isOpenWatched') &&
      !refs.btnQueue.className.includes('isOpenQueue')
    ) {
      filmIndex.newObject();

      array.map((el, idx) => {
        if (el.id === filmIndex.object.id) {
          index = idx;
          return index;
        }
      });

      array.splice(index, 1);
      localStorage.save('watched', array);
    }
    if (refs.btnQueue.className.includes('isOpenQueue')) {
      filmIndexQueue.newObject();

      array.map((el, idx) => {
        if (el.id === filmIndexQueue.object.id) {
          index = idx;
          return index;
        }
      });

      array.splice(index, 1);
      localStorage.save('watched', array);
    }
    if (refs.btnWatched.className.includes('isOpenWatched')) {
      filmIndexWatched.newObject();

      array.map((el, idx) => {
        if (el.id === filmIndexWatched.object.id) {
          index = idx;
          return index;
        }
      });

      const remEl = array.splice(index, 1);
      filmIndexWatched.removeEl = remEl;

      localStorage.save('watched', array);

      createLibralyWatchedMarkup(array);
    }
    refs.addWatchedBtn.classList.remove('visually-hidden');
    refs.removeWatchedBtn.classList.add('visually-hidden');
  }
  if (e.target.name === 'removeFromQueue') {
    const arrays = localStorage.load('queue');
    let index = 0;

    if (
      !refs.btnWatched.className.includes('isOpenWatched') &&
      !refs.btnQueue.className.includes('isOpenQueue')
    ) {
      filmIndex.newObject();

      arrays.map((el, idx) => {
        if (el.id === filmIndex.object.id) {
          index = idx;
          return index;
        }
      });

      arrays.splice(index, 1);
      localStorage.save('queueu', arrays);
    }

    if (refs.btnWatched.className.includes('isOpenWatched')) {
      filmIndexWatched.newObject();

      arrays.map((el, idx) => {
        if (el.id === filmIndexWatched.object.id) {
          index = idx;
          return index;
        }
      });

      arrays.splice(index, 1);
      localStorage.save('watched', arrays);
    }
    if (refs.btnQueue.className.includes('isOpenQueue')) {
      filmIndexQueue.newObject();

      arrays.map((el, idx) => {
        if (el.id === filmIndexQueue.object.id) {
          index = idx;
          return index;
        }
      });

      const remEl = arrays.splice(index, 1);
      filmIndexQueue.removeEl = remEl;
      localStorage.save('queue', arrays);
      createLibralyQueueMarkup(arrays);
    }
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

  if (refs.btnWatched.className.includes('isOpenWatched')) {
    const filmArrWatched = [];

    filmIndexWatched.id = numberId;

    const filmCardObjWatch = filmIndexWatched.arr[numberId];

    filmArrWatched.unshift(filmCardObjWatch);

    createFilmModalCardMarkup(filmArrWatched);

    refs.trailerBtn.setAttribute('data-id', `${filmCardObjWatch.id}`);

    chekButton(filmCardObjWatch);
  }

  if (refs.btnQueue.className.includes('isOpenQueue')) {
    const filmArrQueue = [];

    filmIndexQueue.id = numberId;

    const filmCardObjQueue = filmIndexQueue.arr[numberId];

    filmArrQueue.unshift(filmCardObjQueue);

    createFilmModalCardMarkup(filmArrQueue);

    refs.btnTrailer.setAttribute('data-id', `${filmCardObjQueue.id}`);

    chekButton(filmCardObjQueue);
  }

  window.addEventListener('keydown', onEscBtn);
  filmModalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  refs.scrollToTop.classList.add('isShownBtn_hide');

  //* =======================================

  //*========================================
}

function onFilmModalClose(event) {
  refs.backdropForm.classList.add('is-hidden');
  filmModalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  refs.scrollToTop.classList.remove('isShownBtn_hide');
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
      }) => {
        let genresList = genre_ids.map(
          genreId => GENRES.find(item => item.id === genreId).name
        );
        genresList.length === 0
          ? genresList.push('unknown genre')
          : genresList.join(', ');

        return `
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
                            <td class="modal-card__info-value modal-card__info-value--lh"> ${genresList} </td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="modal-card__desc card-uppertext">About</h3>
                <p class="modal-card__desc-text">
                    ${overview}
                </p>
            `;
      }
    )
    .join('');

  filmModalInfo.innerHTML = markup;
}

// export {onFilmModalOpen}

//*==========================================

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

// Notiflix.Notify.success('text', { checkInNotifikashka });
