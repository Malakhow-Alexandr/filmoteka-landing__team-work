import { refs } from "./refs";
import { moviesApiService } from "./entryPoint";
import { renderMoviesCard } from "./renderMoviesGallery";


refs.headerForm.addEventListener('submit', onSearchFormSubmit);
async function onSearchFormSubmit(e) {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.search.value.trim();
    moviesApiService.searchQuery = searchInput;
    
    if (searchInput !== '') {

        try {
            const genres = await moviesApiService.fetchGenres();
            const data = await moviesApiService.fetchMoviesByName(searchInput);
            renderMoviesCard(data.results, genres);
        } catch (error) {
            console.log(error)
        }
    }
}
