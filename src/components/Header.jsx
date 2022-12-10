import React, { useEffect, useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import Button from './ui/Button';

export default function Header() {
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    auth.logout();
  };
  const handleShowUserMenu = () => setShow(true);
  const handleHiddenUserMenu = () => setShow(false);
  return (
    <header className='fixed flex justify-between w-full p-4 px-6 border-b'>
      <Link to='/' className='flex items-center text-2xl cursor-pointer'>
        <CgShoppingBag className='mr-2 text-mainColor' />
        <span className='font-semibold'>J Shop</span>
      </Link>

      <div className='flex items-center'>
        {user && (
          <Link to='/cart' className='relative cursor-pointer'>
            <AiOutlineShopping className='mr-2 text-4xl' />
            <div className='absolute w-4 h-4 rounded-full bg-mainColor top-5 right-1'>
              <span className='flex items-center justify-center text-xs text-white'>
                0
              </span>
            </div>
          </Link>
        )}
        {user && (
          <div
            onMouseEnter={handleShowUserMenu}
            className={`${
              user.isAdmin && 'cursor-pointer'
            } w-8 h-8 shrink-0 mx-2`}
          >
            <Avatar user={user} />
            {user && user.isAdmin && show && (
              <Link to='products/add'>
                <div
                  onClick={handleHiddenUserMenu}
                  onMouseLeave={handleHiddenUserMenu}
                  className='w-20 p-2 mt-2 text-sm text-center rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-50'
                >
                  <span>상품 등록</span>
                </div>
              </Link>
            )}
          </div>
        )}

        {!user ? (
          <Button text={'로그인'} onClick={() => navigate('login')} />
        ) : (
          <Button text={'로그아웃'} onClick={handleLogout} />
        )}
      </div>
    </header>
  );
}
