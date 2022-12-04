import { createContext, useContext, useState } from 'react';
import AuthService from '../api/authService';
import { firebaseApp } from '../api/firebase';

export const AuthContext = createContext();
const auth = new AuthService(firebaseApp);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const handleUser = (userInfo) => {
    setUser(userInfo);
  };
  return (
    <AuthContext.Provider value={{ auth, user, handleUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
