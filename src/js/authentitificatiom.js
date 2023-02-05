import { initializeApp } from 'firebase/app';
import { get, set, getDatabase, ref, onValue, child } from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export default class AccountManagment {
  constructor() {
    this.state = {
      email: '',
      password: '',
      user: {},
      isOnline: false,
      hasAccount: false,
    };
    this.firebaseConfig = {
      apiKey: 'AIzaSyDeT-dGvxxhBoToHkpCqsX7i-ne2DJAg_c',
      authDomain: 'filmo-8db62.firebaseapp.com',
      databaseURL:
        'https://filmo-8db62-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'filmo-8db62',
      storageBucket: 'filmo-8db62.appspot.com',
      messagingSenderId: '149168873978',
      appId: '1:149168873978:web:0a78e8fdaccd0ecfa7c443',
    };
  }

  setEmailAndPassword(newEmail, newPassword) {
    this.state.email = newEmail;
    this.state.password = newPassword;
  }

  userOnline(bool) {
    this.state.isOnline = bool;
  }

  userHasAccount(bool) {
    this.state.hasAccount = bool;
  }

  userName() {
    const nameEmail = this.state.email.split('');
    const idx = newEmail.indexOf('@');
    return nameEmail.slice(0, idx).join('');
  }

  auth() {
    const app = initializeApp(this.firebaseConfig);
    return getAuth(app);
  }

  database() {
    const app = initializeApp(this.firebaseConfig);
    return getDatabase(app);
  }

  async createUser() {
    const { email, password } = this.state;

    const response = await createUserWithEmailAndPassword(
      this.auth(),
      email,
      password
    );

    return response;
  }

  async loginWithEmailAndPassword() {
    const { email, password } = this.state;

    const response = await signInWithEmailAndPassword(
      this.auth(),
      email,
      password
    );

    return response;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const response = await signInWithPopup(auth, provider);

    return response;
  }

  async loginWithFacebook() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const response = await signInWithPopup(auth, provider);

    return response;
  }

  async loginWithGithub() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const response = await signInWithPopup(auth, provider);

    return response;
  }

  logOut() {
    return signOut(this.auth());
  }

  async deleteAccount() {
    const response = await deleteUser(this.state.user);
    return response;
  }

  checkStatusAcc() {
    const authe = getAuth();
    const refs = {
      profile: document.querySelector('.profileJs'),
      checkInButton: document.querySelector('.openRegisterModalJs'),
    };
    return onAuthStateChanged(authe, user => {
      if (user) {
        if (!refs.checkInButton.classList.value.includes('visually-hidden')) {
          refs.checkInButton.classList.add('visually-hidden');
        }
        refs.profile.classList.remove('visually-hidden');
      } else {
        refs.checkInButton.classList.remove('visually-hidden');
      }
    });
  }

  //   async readDatabase() {
  //     const databaseRef = ref(getDatabase());
  //     const userName = this.userName();
  //     const { user } = this.state;

  //     get(child(databaseRef, `${userName}${user.uid}`));
  //   }
}
