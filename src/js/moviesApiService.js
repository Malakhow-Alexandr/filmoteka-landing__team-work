import axios from 'axios';

import searchNotificashka from './notifikashka';

import { refs } from './refs';

// import { clearLibrary } from './watchQueueBtns';

export const API_URL = 'https://api.themoviedb.org/3/';
export const API_USER_KEY = 'ea73d929c285b7e8f7948351eebc9766';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // Get movie array by searching word

  // How to use :   1. import :  import MoviesApiService;

  // 2. create instance :  const moviesApiService = new MoviesApiService();

  // 3. Run this method to get movies :  const data = moviesApiService.fetchTrendingMovies();

  // 4. Run to check result :  console.log(data);

  async fetchTrendingMovies() {
    try {
      refs.spinner.classList.remove('is-hidden');
      const url = `${API_URL}trending/movie/week?api_key=${API_USER_KEY}&page=${this.page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Error handling
      console.log(error);
    } finally {
      refs.spinner.classList.add('is-hidden');
    }
  }

  // Get array of movies by searching name

  // How to use :   1. import :  import MoviesApiService;

  // 2. create instance :  const moviesApiService = new MoviesApiService();

  // 3. Set searchQuery for the instance :  moviesApiService.searchQuery = 'Avatar';

  // 4. Run this method to get movie  :  const data = moviesApiService.fetchMoviesByName();

  //5. Run to check result :  console.log(data);

  async fetchMoviesByName() {
    try {
      refs.spinner.classList.remove('is-hidden');
      const searchParams = new URLSearchParams({
        api_key: API_USER_KEY,
        query: this.searchQuery,
        page: this.page,
        include_adult: false,
      });
      const url = `${API_URL}search/movie?${searchParams}&page=${this.page}`;

      const response = await axios.get(url);
      searchNotificashka(response.data.total_results);

      return response.data;
    } catch (error) {
      // Error handling
      console.log(error);
    } finally {
      refs.spinner.classList.add('is-hidden');
    }
  }

  // Get detail movie info by movie id

  // How to use :   1. import :  import MoviesApiService;

  // 2. create instance :  const moviesApiService = new MoviesApiService();

  // 4. Run this method to get movie  :  const data = moviesApiService.getMovieInfo(19995);

  //5. Check result(Avatar) :  console.log(data);

  async getMovieInfo(id) {
    try {
      const url = `${API_URL}movie/${id}?api_key=${API_USER_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      // Error handling
    }
  }

  // Get movie videos by movie id

  // How to use :   1. import :  import MoviesApiService;

  // 2. create instance :  const moviesApiService = new MoviesApiService();

  // 4. Run this method to get movie  :  const data = moviesApiService.getMovieVideos(19995);

  //5. Check result(Avatar) :  console.log(data);

  async getMovieVideos(id) {
    try {
      const url = `${API_URL}movie/${id}/videos?api_key=${API_USER_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      // Error handling
    }
  }

  getPage() {
    return this.page;
  }

  setPage(page) {
    this.page = page;
  }
}
//
