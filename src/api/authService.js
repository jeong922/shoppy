import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';

export default class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleAuthProvider = new GoogleAuthProvider();
    this.githubAuthProvider = new GithubAuthProvider();
  }
  async login(provider) {
    const authProvider = this.getProvider(provider);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  async logout() {
    this.firebaseAuth.signOut();
  }

  async onAuthChange(onUserChanged) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
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
