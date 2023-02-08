import { refs } from "./refs";
import { moviesApiService } from "./entryPoint";
import { renderMoviesCard } from "./renderMoviesGallery";
import { createAPagination } from "./pagination-copy";


refs.headerForm.addEventListener('submit', onSearchFormSubmit);
async function onSearchFormSubmit(e) {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.search.value.trim();
    moviesApiService.searchQuery = searchInput;

    moviesApiService.setPage(1);

    if (searchInput !== '') {

        try {
            const genres = await moviesApiService.fetchGenres();
            const data = await moviesApiService.fetchMoviesByName(searchInput);
            renderMoviesCard(data.results, genres);
            createAPagination(data);
        } catch (error) {
            console.log(error)
        }
    }
}
