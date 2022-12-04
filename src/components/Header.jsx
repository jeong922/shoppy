import React, { useEffect, useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { auth, user, handleUser } = useAuth();
  const handleLogout = () => {
    auth.logout().then(() => {
      handleUser(null);
    });
  };

  useEffect(() => {
    auth.onAuthChange((userInfo) => {
      console.log(userInfo);
      handleUser(userInfo);
    });
  });

  console.log(user);
  return (
    <header className='flex justify-between w-full p-4 px-6 border-b'>
      <Link to='/' className='flex items-center text-2xl cursor-pointer'>
        <CgShoppingBag className='mr-2 text-mainColor' />
        <span>J Shop</span>
      </Link>

      <div className='flex items-center'>
        <Link to='/cart' className='relative cursor-pointer'>
          <AiOutlineShopping className='mr-2 text-2xl' />
          <div className='absolute w-4 h-4 rounded-full bg-mainColor top-3 right-1'>
            <span className='flex items-center justify-center text-xs text-white'>
              0
            </span>
          </div>
        </Link>

        {!user ? (
          <button onClick={() => navigate('login')} className='px-2 py-1 '>
            로그인
          </button>
        ) : (
          <button onClick={handleLogout} className='px-2 py-1 '>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
