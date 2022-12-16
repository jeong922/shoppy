import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepositoryProvider } from './context/RepositoryContext';
import Footer from './components/Footer';
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <AuthProvider>
        <RepositoryProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <div className='h-auto min-h-full pt-20'>
              <Outlet />
            </div>
            <Footer />
          </QueryClientProvider>
        </RepositoryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
