import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useRepository } from '../context/RepositoryContext';
import { useAuth } from '../context/AuthContext';

export default function CartStatus() {
  const { uid } = useAuth();
  const { repository } = useRepository();
  const { data } = useQuery(['carts'], () => repository.getCart(uid));
  console.log(data);
  return (
    <>
      <Link to='/cart' className='relative cursor-pointer'>
        <AiOutlineShopping className='mr-2 text-4xl' />
        <div className='absolute w-4 h-4 rounded-full bg-mainColor top-5 right-1'>
          <span className='flex items-center justify-center text-xs text-white'>
            {data && data.length}
          </span>
        </div>
      </Link>
    </>
  );
}
