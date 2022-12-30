import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { replacePrice } from '../util/data';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function ProductDetail() {
  const { updateItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { category, description, id, image, options, price, title, imageURL } =
    location.state;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSelectOption = (e) => {
    if (e.target.checked) {
      setSelectedOption(e.target.value);
    }
  };

  const handleModal = () => {
    isSuccess ? setIsSuccess(false) : setIsSuccess(true);
  };

  const handleAddCart = () => {
    const itemId = uuid();
    console.log(itemId);
    const product = {
      itemId,
      id,
      option: selectedOption,
      price,
      title,
      imageURL: image || imageURL,
      quantity: 1,
    };
    updateItem.mutate(product);
    setIsSuccess(true);
  };

  const handleGoToCategory = (e) => {
    const data = e.target.firstChild.data;
    if (data === '여성') {
      navigate('/women');
      return;
    }

    if (data === '남성') {
      navigate('/men');
      return;
    }

    navigate('/acc-shoes');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col w-full max-w-4xl px-3 py-12 mx-auto md:flex-row'>
      <section className='mb-3 md:w-1/2'>
        <div
          className='mx-auto bg-no-repeat bg-cover bg-center h-[30rem] w-full max-w-sm'
          style={{ backgroundImage: `url(${image || imageURL})` }}
        ></div>
      </section>
      <section className='flex flex-col w-full px-2 md:w-1/2'>
        <h4 className='mb-3 text-3xl font-semibold'>{title}</h4>
        <div
          onClick={handleGoToCategory}
          className='flex items-center mb-3 cursor-pointer text-neutral-500'
        >
          <span className='text-sm'>{category}</span>
          <IoIosArrowForward />
        </div>

        <span className='text-lg'>{replacePrice(price)}원</span>
        <p className='my-3 text-neutral-500'>{description}</p>
        <div className='flex flex-col py-3 border-y border-neutral-200'>
          <span className='mb-2'>사이즈</span>
          <ul className='flex flex-wrap'>
            {options.map((option) => (
              <li
                key={option}
                className={`${
                  selectedOption === option
                    ? 'border-2 border-mainColor'
                    : 'border-2 border-neutral-200'
                } mb-2 mr-2 text-center w-14 shrink-0`}
              >
                <input
                  onChange={handleSelectOption}
                  className='hidden'
                  id={option}
                  type='radio'
                  value={option}
                  checked={selectedOption === option}
                />
                <label
                  className='block px-2 py-1 cursor-pointer'
                  htmlFor={option}
                >
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-3'>
          <div className='px-3 py-2 text-white bg-black hover:opacity-70'>
            <Button
              onClick={handleAddCart}
              text={'장바구니'}
              state={!selectedOption}
            />
          </div>
        </div>
      </section>
      {isSuccess && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-modal_bg'>
          <div className='relative z-50 px-10 m-3 text-center rounded-md py-7 text-md bg-neutral-50'>
            <AiOutlineClose
              onClick={handleModal}
              className='absolute cursor-pointer top-3 right-3 hover:opacity-70'
            />
            <p className='text-base'>장바구니에 상품이 담겼습니다.</p>
            <p className='text-base'>장바구니로 이동하시겠습니까?</p>
            <div className='flex justify-center mt-3'>
              <div className='w-32 mr-2 text-sm text-white bg-black border-2 border-black hover:opacity-70'>
                <Button
                  onClick={() => navigate('/cart')}
                  text={'확인'}
                ></Button>
              </div>
              <div className='w-32 text-sm border-2 border-neutral-200 hover:opacity-70'>
                <Button onClick={handleModal} text={'취소'}></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
