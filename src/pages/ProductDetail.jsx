import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { replacePrice } from '../util/data';

export default function ProductDetail() {
  const location = useLocation();
  const { category, description, id, image, options, price, title, imageURL } =
    location.state;
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = (e) => {
    if (e.target.checked) {
      setSelectedOption(e.target.value);
    }
  };

  console.log(selectedOption);
  return (
    <div className='flex flex-col w-full max-w-4xl px-3 py-12 mx-auto md:flex-row'>
      <section className='mb-3 md:w-1/2'>
        <div
          className='mx-auto bg-no-repeat bg-cover bg-center h-[30rem] w-full max-w-sm'
          style={{ backgroundImage: `url(${image || imageURL})` }}
        ></div>
      </section>
      <section className='w-full px-2 md:w-1/2'>
        <h4 className='mb-3 text-3xl font-semibold'>{title}</h4>
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
                    : 'border border-neutral-200'
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
          <div className='px-3 py-2 text-white bg-black'>
            <Button text={'장바구니'} />
          </div>
        </div>
      </section>
    </div>
  );
}
