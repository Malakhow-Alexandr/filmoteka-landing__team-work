import { onEscBtn } from "./film-modal/film-modal-render-card"

const closeModalSignIn = document.querySelector('.close__sign-in')
const backdropForm = document.querySelector('.backdrop_form')

closeModalSignIn.addEventListener('click', closelSignIn)

function closelSignIn() {
  backdropForm.classList.add('is-hidden')

}