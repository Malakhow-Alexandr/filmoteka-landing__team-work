import MoviesApiService from '../moviesApiService';
import { filmIndex } from '../renderMoviesGallery';
import { refs } from '../refs';

const filmModalBackdrop = document.querySelector('.film-backdrop');
const filmModalInfo = document.querySelector('.modal-card');
const filmModalCloseBtn = document.querySelector('.modal__btn--close');
const filmModalOpen = document.querySelector('.film-modal--open');

window.addEventListener('keydown', onEscBtn);
filmModalOpen.addEventListener('click', onFilmModalOpen);
filmModalCloseBtn.addEventListener('click', onFilmModalClose);
filmModalBackdrop.addEventListener('click', onFilmModalBackdrop);
refs.backdropForm.addEventListener('click', onFilmModalBackdrop)


function onFilmModalOpen(event) {
  event.preventDefault();
  const { id } = event.target.closest('li');
  const numberId = Number(id);
  //   console.log(filmIndex.arr[numberId]);
  const filmIndexArr = [];
  const filmCardObject = filmIndex.arr[numberId];
  filmIndexArr.push(filmCardObject);
  console.log(filmCardObject);
  console.log(filmCardObject.id);

  createFilmModalCardMarkup(filmIndexArr);

  refs.btnTrailer.setAttribute('data-id', `${filmCardObject.id}`);

  window.addEventListener('keydown', onEscBtn);
  filmModalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onFilmModalClose(event) {
  refs.backdropForm.classList.add('is-hidden')
  filmModalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscBtn);
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
      }) => `
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
                            <td class="modal-card__info-value modal-card__info-value--lh">${genre_ids}</td>
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
