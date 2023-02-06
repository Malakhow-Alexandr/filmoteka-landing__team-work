import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/card-films-slider.hbs';
import {onClickTrailer} from './trailer.js';


const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 10,
  gap: 10,
  autoplay: 1500,
  hoverpause: true,
  keyboard: true,
  bound: true,
  swipeThreshold: false,
  animationDuration: 800,
  breakpoints: {
    768: {
      perView: 2,
    },
    480: {
      perView: 1,
    },
  },
});

glide.mount();

function renderTrendy() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ea73d929c285b7e8f7948351eebc9766`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(err => {
      console.log(err);
      // sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(
    document.querySelectorAll('.btn-youtube-slider')
  );
}

// import Glide from '@glidejs/glide';

// import  MoviesApiService  from './moviesApiService';

// // import renderMoviesCard from './renderMoviesGallery';
// // import trailer from '';
// // import { axios } from '';
// import axios from "axios";
// // import { API_KEY, URL } from '../utils/constants';

// const API_URL = "https://api.themoviedb.org/3/";
// const API_USER_KEY = "ea73d929c285b7e8f7948351eebc9766";

// const sliderContainer = document.querySelector('.js-slider-container');
// renderTrendy();

// const glide = new Glide('.glide', {
//   type: 'slider',
//   startAt: 0,
//   perView: 8,
//   autoplay: 3000,
//   hoverpause: true,
//   bound: true,
// });

// glide.mount();

// function renderTrendy() {
//   try {
//     const response = MoviesApiService();
//     return response
//       .then(({ data }) => {
//         renderSliderFilms(data.results);
//         localStorage.setItem('slider-en', `${JSON.stringify(data.results)}`);
//         axios.get(`${URL}trending/movie/week?api_key=${API_USER_KEY}`).then(({ data }) => { localStorage.setItem('slider', `${JSON.stringify(data.results)}`) });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }
