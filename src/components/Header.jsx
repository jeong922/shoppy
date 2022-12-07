import React, { useEffect } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

export default function Header() {
  const navigate = useNavigate();
  const { auth, user, handleUser } = useAuth();
  const handleLogout = () => {
    auth.logout();
  };
  useEffect(() => {
    auth.onAuthChange((userInfo) => {
      console.log(userInfo);
      handleUser(userInfo);
    });
  }, []);

  return (
    <header className='fixed flex justify-between w-full p-4 px-6 border-b'>
      <Link to='/' className='flex items-center text-2xl cursor-pointer'>
        <CgShoppingBag className='mr-2 text-mainColor' />
        <span className='font-semibold'>J Shop</span>
      </Link>

      <div className='flex items-center'>
        <Link to='/cart' className='relative cursor-pointer'>
          <AiOutlineShopping className='mr-2 text-4xl' />
          <div className='absolute w-4 h-4 rounded-full bg-mainColor top-5 right-1'>
            <span className='flex items-center justify-center text-xs text-white'>
              0
            </span>
          </div>
        </Link>
        {user && (
          <div className='w-8 h-8 mx-3'>
            <Avatar user={user} />
          </div>
        )}

        {!user ? (
          <button
            onClick={() => navigate('login')}
            className='px-2 py-1 font-semibold'
          >
            로그인
          </button>
        ) : (
          <button onClick={handleLogout} className='px-2 py-1 font-semibold'>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
