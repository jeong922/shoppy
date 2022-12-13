import React from 'react';

export default function Product({ product }) {
  const { category, description, id, image, options, price, title, imageURL } =
    product;
  console.log(title, image);
  return (
    <li>
      <div
        className='bg-no-repeat bg-cover bg-center sm:h-[27rem] h-[30rem]'
        style={{ backgroundImage: `url(${image || imageURL})` }}
      ></div>
      {/* <img src={image || imageURL} alt='title' className='h-[rem]' /> */}
      <div className='flex flex-col py-2'>
        <span className='font-semibold truncate'>{title}</span>
        <span className='font-semibold truncate opacity-70'>{price}원</span>
      </div>
    </li>
  );
}
