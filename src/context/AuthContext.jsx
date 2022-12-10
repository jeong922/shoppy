import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../api/authService';
import { firebaseApp } from '../api/firebase';

const AuthContext = createContext();
const auth = new AuthService(firebaseApp);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthChange((userInfo) => {
      setUser(userInfo);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ auth, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
