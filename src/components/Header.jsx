import React, { useState } from 'react';
import { CgShoppingBag } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import CartStatus from './CartStatus';
import Button from './ui/Button';

export default function Header() {
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    auth.logout();
  };
  // const handleShowUserMenu = () => setShow(true);
  const handleHiddenUserMenu = () => setShow(false);
  const handleUserMenu = () => (show ? setShow(false) : setShow(true));
  return (
    <header
      onMouseLeave={handleHiddenUserMenu}
      className='fixed flex justify-between items-center w-full h-[4.5rem] p-4 px-6 bg-white border-b border-b-neutral-200 z-20'
    >
      <Link
        to='/'
        className='flex items-center text-2xl cursor-pointer shrink-0'
      >
        <CgShoppingBag className='mr-2 text-mainColor' />
        <span className='font-semibold'>J Shop</span>
      </Link>

      <div className='hidden w-2/3 px-4 md:flex'>
        <span className='mr-3'>WOMEN</span>
        <span className='mr-3'>MEN</span>
        <span className='mr-3'>ACC&SHOES</span>
      </div>

      <div className='flex items-center'>
        {user && <CartStatus />}
        {user && (
          <div
            className={`${
              user.isAdmin && 'cursor-pointer'
            } w-8 h-8 shrink-0 mx-2`}
            onClick={handleUserMenu}
          >
            <Avatar user={user} />
            {user && user.isAdmin && show && (
              <Link to='products/add'>
                <div className='w-20 p-2 mt-2 text-sm text-center rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-50'>
                  <span>상품 등록</span>
                </div>
              </Link>
            )}
          </div>
        )}

        {!user ? (
          <div className='shrink-0'>
            <Button text={'로그인'} onClick={() => navigate('login')} />
          </div>
        ) : (
          <div className='shrink-0'>
            <Button text={'로그아웃'} onClick={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
}
