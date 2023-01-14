import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../api/authService';
import { app } from '../api/firebase';

const AuthContext = createContext();
const auth = new AuthService(app);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthChange((userInfo) => {
      setUser(userInfo);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ auth, uid: user && user.uid, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
