import React from 'react';

import Products from './Products';

export default function Home() {
  return (
    <div className='flex flex-col w-full h-full'>
      <div className='mx-auto w-full max-w-[1420px] h-full max-h-60 bg-cover bg-neutral-500'>
        <h4>이미지 들어갈 자리</h4>
      </div>
      {/* <div className="mx-auto w-[1420px] h-full max-h-60 bg-cover bg-[url('../public/img/bannerImg.jpg')]" /> */}
      <Products />
    </div>
  );
}
