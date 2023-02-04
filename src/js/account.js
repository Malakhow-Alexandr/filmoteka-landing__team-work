import { authentitification } from './authentitificatiom';

const refs = {
  openRegisterModal: document.querySelector('.openRegisterModalJs'),
  signInButton: document.querySelector('.signInJs'),
  signUpButton: document.querySelector('.signUpJs'),
  hiddenSignUp: document.querySelectorAll('.hiddenSignUp'),
  hiddenSignIn: document.querySelectorAll('.hiddenSignIn'),

  formSign: document.querySelector('.formSignJs'),
  profile: document.querySelector('.profileJs'),
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

function onOpenRegisterModalButtonClick(e) {
  e.preventDefault();

  refs.formSign.classList.remove('visually-hidden');
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

// refs.buttonSignUp.addEventListener('click', onSignUpButtonClick);
// refs.buttonSignIn.addEventListener('click', onSignInButtonClick);
// refs.formSign.addEventListener('submit', onFormSignSubmit);

// function onSignUpButtonClick(e) {}

// function onSignInButtonClick(e) {}

// function onFormSignSubmit(e) {}

// authentitification.auth();
function onSignOutClick(e) {
  e.preventDefault();

  refs.profile.classList.add('visually-hidden');

  authentitification.logOut();
  authentitification.online(false);

  authentitification.writeToDataBase();
}

function onRemoveClick(e) {
  e.preventDefault();

  const removeAccount = async () => {
    try {
      const removeUser = await authentitification.deleteAccount();
      refs.profile.classList.add('visually-hidden');
      authentitification.hasAccountTrueOrFalse(false);
      authentitification.online(false);
      authentitification.writeToDataBase();
      return removeUser;
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  removeAccount();
}
