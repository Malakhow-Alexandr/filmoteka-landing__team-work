import { refs } from "./refs";
import { moviesApiService } from "./entryPoint";
import { renderMoviesCard } from "./renderMoviesGallery";


refs.headerForm.addEventListener('submit', onSearchFormSubmit);
function onSearchFormSubmit(e) {
    e.preventDefault();
    searchInput = e.currentTarget.elements.search.value.trim();
    moviesApiService.searchQuery = searchInput;
    
    moviesApiService.fetchMoviesByName(searchInput)
        .then(data => renderMoviesCard(data.results))
        .catch(error => console.log(error));
}
