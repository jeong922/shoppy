import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProtectedPath from './pages/ProtectedPath';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'products',
        element: (
          <ProtectedPath requireAdmin>
            <Products />
          </ProtectedPath>
        ),
      },
      {
        path: 'products/add',
        element: (
          <ProtectedPath>
            <AddProduct />
          </ProtectedPath>
        ),
      },
      { path: 'products/:productId', element: <ProductDetail /> },
      { path: 'women', element: <Products /> },
      { path: 'men', element: <Products /> },
      { path: 'acc-shoes', element: <Products /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
