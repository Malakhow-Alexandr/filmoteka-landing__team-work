import { async } from '@firebase/util';
import { ref } from 'firebase/database';
import AccountManagment from './authentitificatiom';

const authentitification = new AccountManagment();

authentitification.auth();
authentitification.database();
authentitification.checkStatusAcc();

const refs = {
  openRegisterModal: document.querySelector('.openRegisterModalJs'),
  signInButton: document.querySelector('.signInJs'),
  signUpButton: document.querySelector('.signUpJs'),
  hiddenSignUp: document.querySelectorAll('.hiddenSignUp'),
  hiddenSignIn: document.querySelectorAll('.hiddenSignIn'),
  backdropForm: document.querySelector('.backdrop_form'),

  formSign: document.querySelector('.formSignJs'),
  profile: document.querySelector('.profile_menu'),
  signOut: document.querySelector('.logOutJs'),
  removeAccount: document.querySelector('.removeAccountJs'),
};

refs.openRegisterModal.addEventListener(
  'click',
  onOpenRegisterModalButtonClick
);

refs.signUpButton.addEventListener('click', onSignUpButtonClick);
refs.signInButton.addEventListener('click', onSignInButtonClick);

refs.signOut.addEventListener('click', onSignOutClick);
refs.removeAccount.addEventListener('click', onRemoveClick);

refs.formSign.addEventListener('submit', onFormSignSubmit);

function onOpenRegisterModalButtonClick(e) {
  e.preventDefault();

  refs.formSign.classList.remove('visually-hidden');
  refs.backdropForm.classList.remove('is-hidden')

}

function onSignUpButtonClick(e) {
  e.preventDefault();

  refs.hiddenSignUp.forEach(el => el.classList.remove('visually-hidden'));
  refs.hiddenSignIn.forEach(el => el.classList.add('visually-hidden'));
}

function onSignInButtonClick(e) {
  e.preventDefault();

  refs.hiddenSignIn.forEach(el => el.classList.remove('visually-hidden'));
  refs.hiddenSignUp.forEach(el => el.classList.add('visually-hidden'));
}

function onSignOutClick(e) {
  e.preventDefault();

  refs.profile.classList.add('visually-hidden');
  refs.openRegisterModal.classList.remove('visually-hidden');

  authentitification.logOut();
  authentitification.userOnline(false);

  // authentitification.writeToDataBase();
}

function onRemoveClick(e) {
  e.preventDefault();

  const removeAccount = async () => {
    try {
      const removeUser = await authentitification.deleteAccount();
      refs.profile.classList.add('visually-hidden');
      authentitification.userHasAccount(false);
      authentitification.userOnline(false);
      // authentitification.writeToDataBase();
      return removeUser;
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  removeAccount();
}

function onFormSignSubmit(e) {
  e.preventDefault();

  const { email, password, createAccount, login, google } =
    e.currentTarget.elements;

  authentitification.setEmailAndPassword(email.value, password.value);

  if (e.submitter === createAccount) {
    return signUp();
  }
  if (e.submitter === login) {
    return signIn();
  }
  if (e.submitter === google) {
    return googleLogin();
  }
}

async function signUp() {
  try {
    const createAcc = await authentitification.createUser();

    authentitification.state.user = createAcc.user;
    authentitification.userOnline(true);
    authentitification.userHasAccount(true);
    // writeToDataBase();

    refs.profile.classList.remove('visually-hidden');
    refs.formSign.classList.add('visually-hidden');
    refs.openRegisterModal.classList.add('visually-hidden');

    return createAcc;
  } catch (error) {
    console.log(error);
  }
}

async function signIn() {
  try {
    const loginUser = await authentitification.loginWithEmailAndPassword();

    authentitification.state.user = loginUser.user;
    authentitification.userOnline(true);
    authentitification.userHasAccount(true);
    // authentitification.writeToDataBase();

    refs.profile.classList.remove('visually-hidden');
    refs.formSign.classList.add('visually-hidden');
    refs.openRegisterModal.classList.add('visually-hidden');

    return loginUser;
  } catch (error) {
    console.log(error);
  }
}

async function googleLogin() {
  try {
    const signWithGoogle = await authentitification.loginWithGoogle();

    authentitification.state.user = signWithGoogle.user;
    authentitification.userOnline(true);
    authentitification.userHasAccount(true);
    // authentitification.writeToDataBase();

    refs.profile.classList.remove('visually-hidden');
    refs.formSign.classList.add('visually-hidden');
    refs.openRegisterModal.classList.add('visually-hidden');

    return signWithGoogle;
  } catch (error) {
    console.log(error);
  }
}
