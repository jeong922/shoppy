import React from 'react';
import { useNavigate } from 'react-router-dom';
import { replacePrice } from '../util/data';

export default function Product({ product }) {
  const navigate = useNavigate();
  const { id, image, price, title, imageURL } = product;

  const goToProductDetails = () => {
    navigate(`/products/${id}`, { state: product });
  };

  return (
    <li
      onClick={goToProductDetails}
      className='p-2 cursor-pointer hover:shadow-lg hover:opacity-70'
    >
      <div className='flex justify-center bg-neutral-100 sm:h-[25rem] w-full h-[35rem] '>
        <img
          src={image || imageURL}
          alt=''
          className='object-cover w-full h-full'
        />
      </div>

      <div className='flex flex-col py-2'>
        <span className='font-semibold truncate'>{title}</span>
        <span className='font-semibold truncate opacity-70'>
          {replacePrice(price)}원
        </span>
      </div>
    </li>
  );
}
