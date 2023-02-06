import MoviesApiService from "./moviesApiService";
import { renderMoviesCard } from "./renderMoviesGallery";

export const moviesApiService = new MoviesApiService();

export function loadTrendingMoviesOnHomePage() {
    moviesApiService.fetchTrendingMovies().then(data => renderMoviesCard(data.results));
}

loadTrendingMoviesOnHomePage();