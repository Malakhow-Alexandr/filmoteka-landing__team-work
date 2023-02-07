import { onEscBtn } from "./film-modal/film-modal-render-card"
// import { onFilmModalBackdrop } from "./film-modal/film-modal-render-card"
import { refs } from "./refs"

const closeModalSignIn = document.querySelector('.close__sign-in')
const backdropForm = document.querySelector('.backdrop_form')
const body = document.querySelector("body")
console.log(body)
closeModalSignIn.addEventListener('click', closelSignIn)

function closelSignIn() {
  console.log("mds")
  backdropForm.classList.add('is-hidden')
  body.classList.remove('modal-open');

}

