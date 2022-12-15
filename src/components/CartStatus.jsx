import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <>
      <Link to='/cart' className='relative cursor-pointer'>
        <AiOutlineShopping className='mr-2 text-4xl' />
        <div className='absolute w-4 h-4 rounded-full bg-mainColor top-5 right-1'>
          {products && (
            <span className='flex items-center justify-center text-xs text-white'>
              {products.length}
            </span>
          )}
        </div>
      </Link>
    </>
  );
}
