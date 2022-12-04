import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <span className='p-2 mb-12 text-5xl font-bold text-center'>
        Page Not Found😱
      </span>
      <div className=''>
        <button
          className='p-2 mr-3 duration-300 ease-in-out transform rounded-lg bg-lightGray hover:bg-purple-100'
          onClick={() => navigate('/')}
        >
          홈으로 가기
        </button>
        <button
          className='p-2 duration-300 ease-in-out transform rounded-lg bg-lightGray hover:bg-purple-100'
          onClick={() => navigate(-1)}
        >
          이전 페이지로 가기
        </button>
      </div>
    </div>
  );
}
