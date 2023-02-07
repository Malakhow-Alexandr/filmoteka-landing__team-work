import { onEscBtn } from "./film-modal/film-modal-render-card"
// import { onFilmModalBackdrop } from "./film-modal/film-modal-render-card"
import { refs } from "./refs"

const closeModalSignIn = document.querySelector('.close__sign-in')
const backdropForm = document.querySelector('.backdrop_form')
const body = document.querySelector("body")
const googleAuth = document.querySelector('.google__auth')

googleAuth.addEventListener('click', removeClassBody)
closeModalSignIn.addEventListener('click', closelSignIn)

function closelSignIn() {

  backdropForm.classList.add('is-hidden')
  body.classList.remove('modal-open');
}

function removeClassBody(){
  body.classList.remove('modal-open');
  backdropForm.classList.add('is-hidden')

}

