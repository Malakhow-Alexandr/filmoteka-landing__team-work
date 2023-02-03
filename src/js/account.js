import { authentitification } from './authentitificatiom';

const refs = {
  profile: document.querySelector(''),
  buttonsAuthorization: document.querySelector('.buttonsAuthorizationJs'),
  buttonSignUp: document.querySelector('.btnSigUpJS'),
  buttonSignIn: document.querySelector('.btnSigInJs'),
  formSignUp: document.querySelector('.formSignUpJs'),
  formSignIn: document.querySelector('.formSignInJs'),
  signOut: document.querySelector(''),
  removeAccount: document.querySelector(''),
};

refs.buttonSignUp.addEventListener('click', onSignUpButtonClick);
refs.buttonSignIn.addEventListener('click', onSignInButtonClick);
refs.formSignUp.addEventListener('submit', onFormSignUpSubmit);
refs.formSignIn.addEventListener('submit', onFormSignInSubmit);

function onSignUpButtonClick(e) {}

function onSignInButtonClick(e) {}

function onFormSignUpSubmit(e) {}

function onFormSignInSubmit(e) {}

authentitification.auth();
