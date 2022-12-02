import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import LoginButton from './LoginButton';

export default function Header() {
  return (
    <header className='w-full flex justify-between p-4 bg-black text-white'>
      <div className='flex items-center text-2xl'>
        <CgShoppingBag className='mr-2' />
        <span>Shoppy</span>
      </div>
      <div className='flex items-center'>
        <AiOutlineShopping className='mr-2' />
        <LoginButton title='로그인' />
      </div>
    </header>
  );
}
