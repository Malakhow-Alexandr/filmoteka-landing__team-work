import { refs } from './refs';
import FilmIndex from './film-index';

export const filmIndex = new FilmIndex();

export function renderMoviesCard(movies) {
  // console.log(title, poster_path, genre_ids, release_date, vote_average);
  refs.gallery.innerHTML = '';
  filmIndex.newArr(movies);


 

  const markup = movies.map(({ id, title, poster_path, genre_ids, release_date, vote_average }, index) => {
    const releasedDate = release_date === undefined ? 'No release date provided' : release_date.slice(0, 4);
    console.log(releasedDate);
        const poster = poster_path === null ? 'http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg' : `https://image.tmdb.org/t/p/w500/${poster_path}`; 

        const movieRating = vote_average.toFixed(1) || '';
        return `
<li class="movie-card__item" id="${index}" data-card-id="${id}">
            <div class="movie-card__image-container">
              <img
              
                src="${poster}"
                
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
