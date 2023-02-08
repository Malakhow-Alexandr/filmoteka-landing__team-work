import { API_URL, API_USER_KEY } from "./moviesApiService";
import axios from 'axios';

// функція для відображення жанрів
(async function() {
  try {
    const url = `${API_URL}genre/movie/list?api_key=${API_USER_KEY}`;
    const response = await axios.get(url);

    GENRES.push(...response.data.genres);
  } catch (error) {
    // Error handling
    console.log(error);
  }
})();

export const GENRES = [];
