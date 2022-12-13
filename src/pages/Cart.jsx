import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import Button from '../components/ui/Button';
import Title from '../components/ui/Title';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 pb-10 mx-auto mt-9'>
      <Title text={'장바구니'} />
      <section className='flex justify-center w-full mt-7 border-y-2 border-y-neutral-200'>
        <div className='flex flex-col items-center py-28'>
          <AiOutlineShopping className='mb-4 mr-2 text-7xl text-neutral-300' />
          <span className='text-neutral-500'>
            장바구니에 담긴 상품이 없습니다.
          </span>
        </div>
      </section>
      <div className='flex mt-5'>
        <div className='mr-2 border-2 border-neutral-200 hover:opacity-70'>
          <Button text={'선택상품 주문'} />
        </div>
        <div className='mr-2 border-2 border-neutral-200 hover:opacity-70'>
          <Button text={'쇼핑계속하기'} onClick={() => navigate(-1)} />
        </div>
        <div className='flex text-white bg-mainColor hover:opacity-70'>
          <Button text={'전체상품주문'} />
        </div>
      </div>
    </div>
  );
}
