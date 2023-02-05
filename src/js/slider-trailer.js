import Glide from '@glidejs/glide';
import { MoviesApiService } from './moviesApiService';
// import renderMoviesCard from './renderMoviesGallery';
// import trailer from '';
// import { axios } from '';
import axios from "axios";
// import { API_KEY, URL } from '../utils/constants';

const API_URL = "https://api.themoviedb.org/3/";
const API_USER_KEY = "ea73d929c285b7e8f7948351eebc9766";

const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderTrendy() {
  try {
    const response = MoviesApiService();
    return response
      .then(({ data }) => {
        renderSliderFilms(data.results);
        localStorage.setItem('slider-en', `${JSON.stringify(data.results)}`);
        axios.get(`${URL}trending/movie/week?api_key=${API_USER_KEY}`).then(({ data }) => { localStorage.setItem('slider', `${JSON.stringify(data.results)}`) });
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

