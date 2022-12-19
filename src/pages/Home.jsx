import React from 'react';
import Banner from '../components/Banner';

import Products from './Products';

export default function Home() {
  return (
    <div className='flex flex-col w-full'>
      {/* <div className='mx-auto w-full max-w-[1420px] h-full bg-cover bg-neutral-500'>
        <Banner />
      </div> */}
      <Banner />
      <Products />
    </div>
  );
}
