import MoviesApiService from './moviesApiService';
import { renderMoviesCard } from './renderMoviesGallery';
import { createAPagination } from './pagination-copy';

export const moviesApiService = new MoviesApiService();

export async function loadTrendingMoviesOnHomePage() {
  try {
    const data = await moviesApiService.fetchTrendingMovies();
    moviesApiService.setPage(data.page);
    console.log(moviesApiService.getPage());
    renderMoviesCard(data.results);
    createAPagination(data);
  } catch (error) {
    console.log(error);
  }
}

loadTrendingMoviesOnHomePage();
