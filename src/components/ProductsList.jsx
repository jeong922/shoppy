import React from 'react';
import Product from '../components/Product';
import { useRepository } from '../context/RepositoryContext';
import { useQuery } from '@tanstack/react-query';

export default function ProductsList() {
  const { repository } = useRepository();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], () => repository.getProducts());

  return (
    <>
      <main className='h-full mx-auto max-w-[1440px]'>
        {isLoading && <span>로딩중</span>}
        {error && <span>{error}</span>}
        <ul className='grid grid-cols-1 gap-3 px-2 pt-10 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </ul>
      </main>
    </>
  );
}
