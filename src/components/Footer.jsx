import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className='relative bottom-0 flex py-5 text-xs leading-6 h-36 px-9 bg-neutral-100 text-neutral-500'>
      <div className='mr-10'>
        <p className='text-sm font-semibold'>J Shop</p>
        <p>고객센터 1234-1234</p>
        <p>jeong922@email.com</p>
        <a
          href='https://github.com/jeong922/shoppy'
          className='flex items-center mt-1 hover:opacity-70'
        >
          <AiFillGithub className='mr-2 text-xl' />
          jeong922
        </a>
      </div>
      <div>
        <ul>
          <li>브랜드소개</li>
          <li>오프라인 매장안내</li>
        </ul>
      </div>
    </footer>
  );
}
