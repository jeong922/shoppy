import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgShoppingBag } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const MENU_TEXT_STYLE = 'py-3 cursor-pointer hover:opacity-70';
export default function SideMenu({ onClick }) {
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
      <ul className='text-sm'>
        <li className={MENU_TEXT_STYLE}>
          <span>WOMEN</span>
        </li>
        <li className={MENU_TEXT_STYLE}>
          <span>MEN</span>
        </li>
        <li className={MENU_TEXT_STYLE}>
          <span>ACC&SHOES</span>
        </li>
      </ul>
    </section>
  );
}
