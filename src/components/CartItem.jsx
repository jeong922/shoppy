import React from 'react';
import { replacePrice } from '../util/data';
import { TbMinus, TbPlus } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import useCart from '../hooks/useCart';

export default function CartItem({
  product: { id, imageURL, option, price, quantity, title },
  product,
}) {
  const { removeItem, updateItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) {
      return;
    }
    updateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    updateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <tr className='w-full border-b border-neutral-200 last:border-none'>
      <td className='flex flex-col items-center p-2 sm:flex-row'>
        <div
          className='w-full mr-3 bg-center bg-no-repeat bg-cover h-72 sm:h-48 sm:w-44 '
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
        <div className='flex flex-col w-full mt-2'>
          <span className='mb-2 font-semibold'>{title}</span>
          <span className='text-sm opacity-70'>사이즈 : {option}</span>
        </div>
      </td>

      <td className='p-2 inline-table sm:table-cell'>
        <div className='flex items-center justify-center p-2'>
          <TbMinus
            onClick={handleMinus}
            className='cursor-pointer hover:opacity-70'
          />
          <span className='mx-2'>{quantity}</span>
          <TbPlus
            onClick={handlePlus}
            className='cursor-pointer hover:opacity-70'
          />
        </div>
      </td>

      <td className='relative p-2 text-center'>
        <span>{replacePrice(price)}원</span>
      </td>

      <td>
        <button
          onClick={handleDelete}
          className='hover:opacity-70 top-4 right-3'
        >
          <AiOutlineClose />
        </button>
      </td>
    </tr>
  );
}
