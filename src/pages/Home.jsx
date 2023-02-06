import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Products from './Products';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex flex-col w-full'>
      <Banner />
      <Products />
    </div>
  );
}
