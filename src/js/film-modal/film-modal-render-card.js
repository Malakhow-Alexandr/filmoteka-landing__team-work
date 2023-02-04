import MoviesApiService from '../moviesApiService';
import { filmIndex } from '../renderMoviesGallery';

const filmModalBackdrop = document.querySelector('.film-backdrop');
const filmModalInfo = document.querySelector('.modal-card');

const filmModalOpen = document.querySelector('.film-modal--open');

filmModalOpen.addEventListener('click', onFilmClick);

function onFilmClick(event) {
  event.preventDefault();

  const { id } = event.target.closest('li');
  //   console.log(event.target.closest('li'));
  //   console.log(id);

  const numberId = Number(id);
  //   console.log(filmIndex.arr[numberId]);

  const filmIndexArr = [];
  const filmCardObject = filmIndex.arr[numberId];
  filmIndexArr.push(filmCardObject);

  createFilmModalCardMarkup(filmIndexArr);

  filmModalBackdrop.classList.remove('is-hidden');
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
            <div class="modal-card__img">
                <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy"/>
            </div>

            <div>
                <h2 class="modal-card__title  card-uppertext">${title}</h2>
                <table modal-card__table>
                    <tbody class="modal-card__info">
                        <tr>
                            <td class="modal-card__info-name">Vote / Votes</td>
                            <td class="modal-card__info-value  modal-card__info-value--mod"> 
                            <span class="vote-value">${vote_average}</span> 
                            <span class="${vote_count}">1260</span> </td>
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
