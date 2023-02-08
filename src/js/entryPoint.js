import MoviesApiService from "./moviesApiService";
import { renderMoviesCard } from "./renderMoviesGallery";

export const moviesApiService = new MoviesApiService();

export async function loadTrendingMoviesOnHomePage() {
    
           try {
            const genres = await moviesApiService.fetchGenres();
            const data = await moviesApiService.fetchTrendingMovies();
            renderMoviesCard(data.results, genres);
        } catch (error) {
            console.log(error)
        }
        
}

loadTrendingMoviesOnHomePage();
 


//         export function loadTrendingMoviesOnHomePage() {
    
//     moviesApiService.fetchGenres()
//         .then((genres) => {
//             moviesApiService.fetchTrendingMovies()
//                 .then(data => {
//                     console.log(data, genres)
//                     renderMoviesCard(data.results, genres);
//         });
        
//         })
//         .catch(error => console.log(error));
        
// }