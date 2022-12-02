import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className='w-full flex justify-between p-4 px-6 border-b'>
      <div
        onClick={() => navigate('/')}
        className='cursor-pointer flex items-center text-2xl'
      >
        <CgShoppingBag className='mr-2' />
        <span>Shoppy</span>
      </div>
      <div className='flex items-center'>
        <div className='relative'>
          <AiOutlineShopping className='mr-2 text-2xl' />
          <div className='w-4 h-4 absolute bg-purple-400 top-3 right-1 rounded-full'>
            <span className='text-xs flex justify-center items-center text-white'>
              0
            </span>
          </div>
        </div>
        <LoginButton title='로그인' />
      </div>
    </header>
  );
}
