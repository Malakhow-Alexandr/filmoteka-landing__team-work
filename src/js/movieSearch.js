import { refs } from './refs';
import { moviesApiService } from './entryPoint';
import { renderMoviesCard } from './renderMoviesGallery';
import { createAPagination } from './pagination-copy';

refs.headerForm.addEventListener('submit', onSearchFormSubmit);
async function onSearchFormSubmit(e) {
  e.preventDefault();
  const searchInput = e.currentTarget.elements.search.value.trim();
  moviesApiService.searchQuery = searchInput;

  moviesApiService.setPage(1);

  if (searchInput !== '') {
    try {
      const data = await moviesApiService.fetchMoviesByName(searchInput);
      if (data.total_results === 0) {
        return clearGaleryMarkup();
      }
      renderMoviesCard(data.results);
      createAPagination(data);
    } catch (error) {
      console.log(error);
    }
  }
}
//

function clearGaleryMarkup() {
  refs.gallery.innerHTML = `
  <li style="margin-left: auto; margin-right: auto;">
      <img 
      src='https://thumbs.dreamstime.com/b/ooops-cartoon-patch-pop-art-style-coloful-icon-stars-cloud-vector-illustration-ooops-pop-art-style-icon-111975304.jpg' 
      alt=''
  </li>
  `;
}
