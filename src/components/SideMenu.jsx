import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgShoppingBag } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';

const MENU_TEXT_STYLE = 'py-5 cursor-pointer hover:opacity-70';
export default function SideMenu({ onClick }) {
  const location = useLocation();
  return (
    <section className=''>
      <div className='h-[4.5rem] flex items-center '>
        <div className='mr-3 text-lg cursor-pointer hover:opacity-70'>
          <GiHamburgerMenu onClick={onClick} />
        </div>
        <Link
          to='/'
          className='flex items-center cursor-pointer'
          onClick={onClick}
        >
          <CgShoppingBag className='mr-2 text-lg text-mainColor' />
          <span className='text-lg font-semibold'>J Shop</span>
        </Link>
      </div>
      <ul className='flex flex-col text-sm'>
        <Link to='women' onClick={onClick}>
          <span
            className={`${
              location.pathname === '/women' ? 'font-semibold' : 'font-normal'
            } ${MENU_TEXT_STYLE}`}
          >
            WOMEN
          </span>
        </Link>
        <Link to='men' className={MENU_TEXT_STYLE} onClick={onClick}>
          <span
            className={`${
              location.pathname === '/men' ? 'font-semibold' : 'font-normal'
            } ${MENU_TEXT_STYLE}`}
          >
            MEN
          </span>
        </Link>
        <Link to='acc-shoes' onClick={onClick}>
          <span
            className={`${
              location.pathname === '/acc-shoes'
                ? 'font-semibold'
                : 'font-normal'
            } ${MENU_TEXT_STYLE}`}
          >
            ACC&SHOES
          </span>
        </Link>
      </ul>
    </section>
  );
}
