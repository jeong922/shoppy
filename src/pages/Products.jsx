import React, { useEffect } from 'react';
import Product from '../components/Product';
import useProducts from '../hooks/useProducts';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

export default function ProductsList() {
  const location = useLocation();
  const pathname = location.pathname;
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getPageName = (pathname) => {
    let pageName;
    switch (pathname) {
      case '/women':
        pageName = 'women';
        break;
      case '/men':
        pageName = 'men';
        break;
      case '/acc-shoes':
        pageName = 'acc&shoes';
        break;
      case '/':
        pageName = 'all';
        break;
      default:
        console.log(`${pathname}이 존재하지 않음`);
    }
    return pageName;
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <span>{error}</span>}
      {products && (
        <main className='h-full mx-auto max-w-[1440px] pt-5'>
          <span className='px-4 text-2xl font-semibold uppercase'>
            {getPageName(pathname)}
          </span>
          <ul className='grid grid-cols-1 gap-3 px-2 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
            {/* FIXME:다른 방법 찾아보기 */}
            {pathname === '/women' &&
              products
                .filter((v) => v.category === '여성')
                .map((product) => (
                  <Product key={product.id} product={product} />
                ))}

            {pathname === '/men' &&
              products
                .filter((v) => v.category === '남성')
                .map((product) => (
                  <Product key={product.id} product={product} />
                ))}

            {pathname === '/acc-shoes' &&
              products
                .filter((v) => v.category !== '남성' && v.category !== '여성')
                .map((product) => (
                  <Product key={product.id} product={product} />
                ))}

            {pathname === '/' &&
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </ul>
        </main>
      )}
    </>
  );
}
