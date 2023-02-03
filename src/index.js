import MoviesApiService from "./js/moviesApiService";
import { renderMoviesCard } from "./js/renderMoviesGallery";

const moviesApiService = new MoviesApiService();

moviesApiService.fetchTrendingMovies().then(data => renderMoviesCard(data.results));



import axios from "axios";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";



// fetch function

import './js/moviesApiService';




// footer
import './js/footer/footer-heart';
import './js/footer/footer-modal';
