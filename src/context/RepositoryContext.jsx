import { createContext, useContext } from 'react';
import Repository from '../api/repository';

const RepositoryContext = createContext();
const repository = new Repository();

export function RepositoryProvider({ children }) {
  return (
    <RepositoryContext.Provider value={{ repository }}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  return useContext(RepositoryContext);
}
