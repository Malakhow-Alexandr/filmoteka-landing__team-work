import Notiflix from 'notiflix';
import { refs } from './refs';
import MoviesApiService from './moviesApiService';

const moviesApiService = new MoviesApiService();

const youTubeTrailer = refs.trailerBox;

export function onOpenTrailer(e) {
  let id = e.currentTarget.dataset.id;

  moviesApiService
    .getMovieVideos(id)
    .then(({ results }) => {
      const SITE = 'YOUTUBE';
      const youtubeSite = results.find(
        ({ site }) => site.toUpperCase() === SITE
      );

      if (!youtubeSite) {
        Notiflix.Notify.failure('No trailer found');
      }

      const keyTrailer = youtubeSite.key;

      createMarkupTrailer(keyTrailer);
    })
    .catch(error => error);
}

function createMarkupTrailer(keyTrailer) {
  youTubeTrailer.innerHTML = `
  <iframe
   class="trailer__iframe"
   src="https://www.youtube.com/embed/${keyTrailer}"
   title="YouTube video player"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen
   ></iframe>
  `;

  youTubeTrailer.classList.remove('visually-hidden');
  refs.trailerBackdrop.classList.remove('is-hidden');
  youTubeTrailer.classList.add('active');
  refs.trailerBackdrop.addEventListener('click', onBackdropTrailer);
  refs.trailerBtnClose.addEventListener('click', onCloseTrailer);
  window.addEventListener('keydown', onEscTrailer);
}

function onBackdropTrailer(e) {
  if (e.currentTarget === e.target) {
    removeYouTubeTrailer();
  }
}

function onCloseTrailer() {
  removeYouTubeTrailer();
}

function removeYouTubeTrailer() {
  youTubeTrailer.innerHTML = '';
  youTubeTrailer.classList.add('visually-hidden');
  youTubeTrailer.classList.remove('active');
  refs.trailerBackdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscTrailer);
}

function onEscTrailer(e) {
  console.log('ESC', e);
  const ESC_KEY_CODE = 'Escape';
  const active = youTubeTrailer.classList.contains('active');

  if (active) {
    if (e.code === ESC_KEY_CODE) {
      removeYouTubeTrailer();
    }
  }
}
