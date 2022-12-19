import React from 'react';

export default function Banner() {
  const images = ['banner1', 'banner2', 'banner3'];
  return (
    <section className='relative w-full h-96 bg-neutral-600'>
      {/* {images.map((img, index) => (
        <div
          key={index}
          className={`bg-${img} w-full h-full bg-cover opacity-70`}
        ></div>
      ))} */}
      <div className={`bg-banner1 w-full h-full bg-cover opacity-70`}></div>
      <div className='absolute w-full text-center top-40 text-neutral-100'>
        <h2 className='text-5xl'>J Shop</h2>
      </div>
    </section>
  );
}
