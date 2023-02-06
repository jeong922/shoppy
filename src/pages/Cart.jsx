import React, { useEffect } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import Button from '../components/ui/Button';
import Title from '../components/ui/Title';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { TbEqual, TbPlus } from 'react-icons/tb';
import { replacePrice } from '../util/data';
import useCart from '../hooks/useCart';
import Loading from '../components/Loading';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  const tatalPrice =
    products &&
    products.reduce((acc, cur) => acc + parseInt(cur.price) * cur.quantity, 0);

  const deliveryCharge =
    products && products.length === 0 ? 0 : tatalPrice > 30000 ? 0 : 3000;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {products && (
        <div className='flex flex-col items-center justify-center max-w-3xl px-8 pb-10 mx-auto mt-9 sm:px-3'>
          <Title text={'장바구니'} />
          <section className='flex justify-center w-full mt-7 border-y-2 border-y-neutral-200'>
            {!products.length ? (
              <div className='flex flex-col items-center py-28'>
                <AiOutlineShopping className='mb-4 mr-2 text-7xl text-neutral-300' />
                <span className='text-neutral-500'>
                  장바구니에 담긴 상품이 없습니다.
                </span>
              </div>
            ) : (
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-neutral-200'>
                    <th className='py-3'>상품 정보</th>
                    <th className='hidden py-3 sm:block'>수량</th>
                    <th className='py-3'>금액</th>
                    <th className='py-3'></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <CartItem key={product.itemId} product={product} />
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className='flex items-center justify-around w-full px-3 py-8 mt-8 border-y-2 border-neutral-200'>
            <div className='text-center'>
              <p className='text-lg font-semibold'>
                {replacePrice(tatalPrice)}원
              </p>
              <p className='text-sm text-neutral-600'>상품금액</p>
            </div>
            <TbPlus className='text-xl' />
            <div className='text-center'>
              <p className='text-lg font-semibold'>
                {replacePrice(deliveryCharge)}원
              </p>
              <p className='text-sm text-neutral-600'>배송비</p>
            </div>
            <TbEqual />
            <div className='text-center'>
              <p className='text-lg font-semibold'>
                {replacePrice(tatalPrice + deliveryCharge)}원
              </p>
              <p className='text-sm text-neutral-600'>총 주문금액</p>
            </div>
          </section>
          <div className='flex mt-5'>
            {/* <div className='mr-2 border-2 border-neutral-200 hover:opacity-70'>
          <Button text={'선택상품 주문'} />
        </div> */}
            <div className='mr-2 border-2 border-neutral-200 hover:opacity-70'>
              <Button text={'쇼핑계속하기'} onClick={() => navigate(-1)} />
            </div>
            <div className='flex text-white bg-black hover:opacity-70'>
              <Button text={'전체상품주문'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
