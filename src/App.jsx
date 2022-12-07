import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className='h-full pt-20'>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
