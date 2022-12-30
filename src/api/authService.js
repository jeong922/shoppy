import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { firebaseApp } from './firebase';

export default class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleAuthProvider = new GoogleAuthProvider();
    this.githubAuthProvider = new GithubAuthProvider();
    this.database = getDatabase(firebaseApp);
  }

  async createEmailAndPassword(email, password) {
    return await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
  }

  async signInEmailAndPassword(email, password) {
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  login(provider) {
    const authProvider = this.getProvider(provider);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    this.firebaseAuth.onAuthStateChanged(async (user) => {
      const updatedUser = user ? await this.adminUser(user) : null;
      onUserChanged(updatedUser);
    });
  }

  async adminUser(user) {
    return get(ref(this.database, 'admins')).then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        // console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return {
          ...user,
          isAdmin,
        };
      }
      return user;
    });
  }

  getProvider(provider) {
    switch (provider) {
      case 'Google':
        return this.googleAuthProvider;
      case 'Github':
        return this.githubAuthProvider;
      default:
        throw new Error(`not supported provider: ${provider}`);
    }
  }
}
