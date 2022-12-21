import React from 'react';
import Banner from '../components/Banner';

import Products from './Products';

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      <Banner />
      <Products />
    </div>
  );
}
