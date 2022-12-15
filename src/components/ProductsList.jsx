import React from 'react';
import Product from '../components/Product';
import Loading from './Loading';
import useProducts from '../hooks/useProducts';

export default function ProductsList() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <Loading />}
      {error && <span>{error}</span>}
      {products && (
        <main className='h-full mx-auto max-w-[1440px]'>
          <ul className='grid grid-cols-1 gap-3 px-2 pt-10 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
