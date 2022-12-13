import React, { useEffect, useState } from 'react';
import Repository from '../api/repository';
import Product from '../components/Product';

const repository = new Repository();
export default function Home() {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const stopSync = repository.getItem('products', (product) =>
      setProducts(product)
    );
    return () => stopSync();
  }, []);

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='mx-auto w-full max-w-[1420px] h-full max-h-60 bg-cover bg-neutral-500'>
        <h4>이미지 들어갈 자리</h4>
      </div>
      {/* <div className="mx-auto w-[1420px] h-full max-h-60 bg-cover bg-[url('../public/img/bannerImg.jpg')]" /> */}
      <main className='h-full mx-auto max-w-[1440px]'>
        <ul className='grid grid-cols-1 gap-3 px-2 pt-10 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {Object.keys(products).map((key) => (
            <Product key={key} product={products[key]} />
          ))}
        </ul>
      </main>
    </div>
  );
}
