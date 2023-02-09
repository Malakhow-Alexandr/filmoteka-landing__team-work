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
      watched: [],
      queue: [],
      obj: {},
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

  userSetWatched(arr) {
    const { watched } = this.state;
    const length = watched.length;
    watched.splice(0, length);
    arr.map(el => watched.unshift(el));
  }

  userSetQueue(arr) {
    const { queue } = this.state;
    const length = queue.length;
    queue.splice(0, length);
    arr.map(el => queue.unshift(el));
  }

  userName() {
    const nameEmail = this.state.email.split('');
    const idx = nameEmail.indexOf('@');
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
      profile: document.querySelector('.profile_menu'),
      checkInButton: document.querySelector('.openRegisterModalJs'),
      auth: document.querySelector('autorization'),
    };
    return onAuthStateChanged(authe, user => {
      if (user) {
        // if (!refs.checkInButton.classList.value.includes('visually-hidden')) {
        //   refs.checkInButton.classList.add('visually-hidden');
        // }
        refs.profile.classList.remove('hide');

        this.state.email = user.email;
        this.state.user = user;
      } else {
        refs.checkInButton.classList.remove('hide');
        refs.profile.classList.add('notAcces');

        // refs.header.classList.add('notAccess');
      }
    });
  }

  async readData() {
    const db = getDatabase();
    const auth = getAuth();

    const { user } = this.state;

    const userId = auth.currentUser.uid;
    return onValue(
      ref(db, this.userName() + userId),
      snapshot => {
        this.state.obj = snapshot.exportVal();
        return snapshot.exportVal();
      },
      {
        onlyOnce: true,
      }
    );
  }
  writeToDataBase() {
    const db = getDatabase();
    const userName = this.userName();

    const { watched, queue, user } = this.state;
    set(ref(db, userName + user.uid), {
      watched: watched,
      queue: queue,
    });
  }
}
