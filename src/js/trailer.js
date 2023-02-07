import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';
import MoviesApiService from './moviesApiService';

refs.btnTrailer.addEventListener('click', onShowTrailer);
refs.backdrop.addEventListener('click', onBackdropTrailer);
refs.backdrop.addEventListener('click', onCloseModalTrailer);

const moviesApiService = new MoviesApiService();

function onShowTrailer(e) {
  let id = e.currentTarget.dataset.id;

  window.addEventListener('keydown', onEscBtn);
  refs.backdrop.classList.remove('is-hidden');

  moviesApiService
    .getMovieVideos(id)
    .then(({ results }) => {
      return results.forEach(({ site, key }) => {
        if (site === 'YouTube') {
          createMarkupTrailer(key);
        }
      });
    })
    .catch(() => Notiflix.Notify.failure('This film has no one trailer'));
}

function createMarkupTrailer(key) {
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

function onCloseModalTrailer(e) {
  window.removeEventListener('keydown', onEscBtn);
  refs.backdrop.classList.add('is-hidden');
  refs.trailerBox.innerHTML = '';

  console.log('target', e.target);
  console.log('currentTarget', e.currentTarget);
}

function onBackdropTrailer(e) {
  if (e.currentTarget === e.target) {
    onCloseModalTrailer();
  }
}

function onEscBtn(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModalTrailer();
  }
}
