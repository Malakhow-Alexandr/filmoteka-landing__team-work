import MoviesApiService from "./js/moviesApiService";
import { renderMoviesCard } from "./js/renderMoviesGallery";

const moviesApiService = new MoviesApiService();

moviesApiService.fetchTrendingMovies().then(data => renderMoviesCard(data.results));



