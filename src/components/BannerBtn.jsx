import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function BannerBtn({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${direction === 'right' ? 'right-0' : 'left-0'} 
        absolute h-full bg-transparent z-50 cursor-pointer px-2
      `}
    >
      {direction === 'left' ? (
        <MdKeyboardArrowLeft className='text-3xl sm:text-6xl text-neutral-100' />
      ) : (
        <MdKeyboardArrowRight className='text-3xl sm:text-6xl text-neutral-100' />
      )}
    </button>
  );
}
