import MoviesApiService from '../moviesApiService';

const filmModalBackdrop = document.querySelector('.film-backdrop')
const filmModalInfo = document.querySelector('.modal-card')
const targetFilm = document.querySelector('body')
targetFilm.addEventListener('click', onFilmClick)

const moviesApiService = new MoviesApiService();

console.dir(moviesApiService)

// let id = 'id';

// const data = moviesApiService.getMovieInfo(3456);

// console.log(data);



function renderFilmModalCard(id) {
    moviesApiService.getMovieInfo(id).then(data => {
        console.log(data);
        // createFilmModalCardMarkup(data)
    }).catch(error => {
        console.log(error)
    })  
}


function onFilmClick(event) {
    console.log(event.target.dataset)

    id = event.target.dataset.id;
    filmModalBackdrop.classList.remove('is-hidden')
    
    renderFilmModalCard(id)
}

const modalCardEl = document.querySelector('.modal-card')


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
                <img src="${poster_path}" alt="${title}" loading="lazy"/>
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
