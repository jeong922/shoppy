import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepositoryProvider } from './context/RepositoryContext';
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <AuthProvider>
        <RepositoryProvider>
          <Header />
          <div className='h-full pt-20'>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </RepositoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
