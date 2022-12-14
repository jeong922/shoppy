import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Repository from '../api/repository';

const repository = new Repository();
export default function ProductsList() {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const stopSync = repository.getItem('products', (product) =>
      setProducts(product)
    );
    return () => stopSync();
  }, []);
  return (
    <main className='h-full mx-auto max-w-[1440px]'>
      <ul className='grid grid-cols-1 gap-3 px-2 pt-10 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
        {Object.keys(products).map((key) => (
          <Product key={key} product={products[key]} />
        ))}
      </ul>
    </main>
  );
}
