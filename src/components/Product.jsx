import React from 'react';
import { useNavigate } from 'react-router-dom';
import { replacePrice } from '../util/data';

export default function Product({ product }) {
  const navigate = useNavigate();
  const { id, image, price, title, imageURL } = product;

  const goToProductDetails = () => {
    navigate(`products/${id}`, { state: product });
  };

  return (
    <li
      onClick={goToProductDetails}
      className='cursor-pointer hover:opacity-70'
    >
      <div
        className='bg-no-repeat bg-cover bg-center  h-[30rem]'
        style={{ backgroundImage: `url(${image || imageURL})` }}
      ></div>
      <div className='flex flex-col py-2'>
        <span className='font-semibold truncate'>{title}</span>
        <span className='font-semibold truncate opacity-70'>
          {replacePrice(price)}원
        </span>
      </div>
    </li>
  );
}
