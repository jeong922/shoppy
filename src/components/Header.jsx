import React, { useEffect, useState } from 'react';
import { CgShoppingBag } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import CartStatus from './CartStatus';
import SideMenu from './SideMenu';
import Button from './ui/Button';

const USER_MENU_STYLE =
  'w-full py-2 text-center cursor-pointer hover:bg-userMenuBg group';
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const [show, setShow] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const handleLogout = () => {
    auth.logout();
    handleHiddenUserMenu();
    navigate('/');
  };
  const handleShowUserMenu = () => setShow(true);
  const handleHiddenUserMenu = () => setShow(false);
  const handleUserMenu = () => (show ? setShow(false) : setShow(true));
  const handleShowSideMenu = () => {
    showSideMenu ? setShowSideMenu(false) : setShowSideMenu(true);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) {
        setShowSideMenu(false);
      }
      return () => {
        window.removeEventListener('resize', () => {
          if (window.innerWidth > 640) {
            setShowSideMenu(false);
          }
        });
      };
    });
  }, []);

  return (
    <header className='fixed flex items-center w-full h-[4.5rem] px-6 bg-white border-b border-b-neutral-200 z-20'>
      <Link
        to='/'
        className='items-center hidden text-2xl cursor-pointer sm:flex shrink-0'
      >
        <CgShoppingBag className='mr-2 text-mainColor' />
        <span className='font-semibold'>J Shop</span>
      </Link>

      <GiHamburgerMenu
        onClick={handleShowSideMenu}
        className='block text-lg cursor-pointer sm:hidden'
      />

      {/* 사이드 메뉴 배경 */}
      {showSideMenu && (
        <div
          onClick={handleShowSideMenu}
          className='fixed top-0 z-30 w-full h-full'
        ></div>
      )}

      {/* 사이드 메뉴 */}
      <div
        className={`${
          showSideMenu ? 'translate-x-0' : '-translate-x-44'
        } fixed top-0 left-0 h-full px-6 bg-white w-44 z-50`}
      >
        <SideMenu onClick={handleShowSideMenu} />
      </div>

      <div className='hidden w-2/3 ml-7 sm:flex'>
        <Link to='women'>
          <span
            className={`${
              location.pathname === '/women' ? 'font-semibold' : 'font-normal'
            } mr-5 hover:opacity-70`}
          >
            WOMEN
          </span>
        </Link>
        <Link to='men'>
          <span
            className={`${
              location.pathname === '/men' ? 'font-semibold' : 'font-normal'
            } mr-5 hover:opacity-70`}
          >
            MEN
          </span>
        </Link>
        <Link to='acc-shoes'>
          <span
            className={`${
              location.pathname === '/acc-shoes'
                ? 'font-semibold'
                : 'font-normal'
            } mr-5 hover:opacity-70`}
          >
            ACC&SHOES
          </span>
        </Link>
      </div>

      <div className='relative flex items-center justify-end w-full h-full'>
        {user && <CartStatus />}

        <div
          className='flex items-center justify-center h-full mx-2 shrink-0'
          onClick={handleUserMenu}
          onMouseEnter={handleShowUserMenu}
          onMouseLeave={handleHiddenUserMenu}
        >
          {user && <Avatar user={user} />}
        </div>

        {user && (
          <ul
            className={`${
              show
                ? 'absolute right-0 flex flex-col items-center justify-center w-24 py-2 text-sm rounded-md shadow-md top-16 bg-neutral-50 z-50'
                : 'hidden'
            }`}
            onMouseEnter={handleShowUserMenu}
            onMouseLeave={handleHiddenUserMenu}
          >
            {user && user.isAdmin && (
              <li className={USER_MENU_STYLE} onClick={handleHiddenUserMenu}>
                <Link to='products/add'>
                  <div>
                    <span>상품 등록</span>
                  </div>
                </Link>
              </li>
            )}
            {!user.isAdmin && (
              <li className={USER_MENU_STYLE}>
                <Link to='/profile'>
                  <div>
                    <span>회원 정보</span>
                  </div>
                </Link>
              </li>
            )}
            <li className={USER_MENU_STYLE}>
              <div onClick={handleLogout}>
                <span>로그아웃</span>
              </div>
            </li>
          </ul>
        )}

        {!user && (
          <div className='shrink-0'>
            <Button text={'로그인'} onClick={() => navigate('login')} />
          </div>
        )}
      </div>
    </header>
  );
}
