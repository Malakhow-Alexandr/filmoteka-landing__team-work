import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';
import MoviesApiService from './moviesApiService';

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.btnTrailer.addEventListener('click', onClickTrailer);
refs.backdrop.addEventListener('click', onBackdropClick);

const moviesApiService = new MoviesApiService();

function onClickTrailer(e) {
  let id = e.currentTarget.dataset.id;

  moviesApiService
    .getMovieVideos(id)
    .then(({ results }) => {
      return results.forEach(({ site, key }) => {
        if (site === 'YouTube') {
          createMarkupTrailer(key);
        }
      });
    })
    .catch(() => {
      return Notiflix.Notify.failure('This film has no one trailer');
    });
}

function createMarkupTrailer(key) {
  //   console.log(key);
  refs.trailerBox.innerHTML = `
  <iframe
   class="trailer-iframe"
   width="100%"
   height="100%"
   src="https://www.youtube.com/embed/${key}"
   title="YouTube video player"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen
   ></iframe>
  `;
}

function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.remove('is-hidden');
  disabledStart(true);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.add('is-hidden');
  disabledStop();
}

function onBackdropClick(e) {
  disabledStop(true);
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

function disabledStart(params) {
  refs.openModalBtn.disabled = params;
}

function disabledStop(params) {
  refs.openModalBtn.disabled = params;
}
