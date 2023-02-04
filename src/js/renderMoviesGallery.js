import { refs } from "./refs"
export function renderMoviesCard(movies) {
    // console.log(title, poster_path, genre_ids, release_date, vote_average);

    const markup = movies.map(({ id, title, poster_path, genre_ids, release_date, vote_average }) => {
        const releasedDate = release_date.slice(0,4) || '';
        const poster = poster_path === null ? 'http://www.interlog.com/~tfs/images/posters/TFSMoviePosterUnavailable.jpg' : poster_path; 
        const movieRating = vote_average.toFixed(1) || '';
        return `
<li class="movie-card__item" data-card-id="${id}">
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
          </li>`
    }
).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}