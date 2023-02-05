import MoviesApiService from '../moviesApiService';
import { filmIndex } from '../renderMoviesGallery';

const filmModalBackdrop = document.querySelector('.film-backdrop');
const filmModalInfo = document.querySelector('.modal-card');
const filmModalCloseBtn = document.querySelector('.modal__btn--close');
const filmModalOpen = document.querySelector('.film-modal--open');

window.addEventListener('keydown', onEscBtn);
filmModalOpen.addEventListener('click', onFilmModalOpen);
filmModalCloseBtn.addEventListener('click', onFilmModalClose);
filmModalBackdrop.addEventListener('click', onFilmModalBackdrop);

function onFilmModalOpen(event) {
  event.preventDefault();
  const { id } = event.target.closest('li');
  const numberId = Number(id);
  //   console.log(filmIndex.arr[numberId]);
  const filmIndexArr = [];
  const filmCardObject = filmIndex.arr[numberId];
  filmIndexArr.push(filmCardObject);
  console.log(filmCardObject);

  createFilmModalCardMarkup(filmIndexArr);

  window.addEventListener('keydown', onEscBtn);
  filmModalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function onFilmModalClose(event) {
  filmModalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscBtn);
}

function onFilmModalBackdrop(event) {
  if (event.currentTarget === event.target) {
    onFilmModalClose();
  }
}

function onEscBtn(event) {
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
     

  <button class="btn-trailer" type="button" data-id="/${id}" data-action="open-modal">
                YouTube
            </button>
            <div class="backdrop is-hidden js-backdrop">
                <div class="modal-trailer">
                    <div class="trailer-box"></div>
                </div>
            </div>



            <div class="modal-card__poster">
                <img class="modal-card__poster--img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy"/>
            </div>

            <div>
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
