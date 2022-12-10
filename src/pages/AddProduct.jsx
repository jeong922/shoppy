import React from 'react';
import Checkbox from '../components/ui/Checkbox';
import Input from '../components/ui/Input';

export default function AddProduct() {
  const handleImgChange = () => {};
  return (
    <div className='max-w-3xl px-3 mx-auto bg-slate-200'>
      <h2 className='text-2xl text-center '>새로운 제품 등록</h2>
      <form className='flex flex-col'>
        <img />
        <input
          className='mb-3'
          type='file'
          accept='image/*'
          name='file'
          onChange={handleImgChange}
        />
        <Input type={'text'} text={'제품명'} />
        <Input type={'text'} text={'카테고리'} />
        <Input type={'number'} text={'가격'} />
        <Input type={'제품설명'} text={'제품설명'} />
        <div>
          <span>사이즈 옵션</span>
          <div className='flex'>
            <Checkbox text={'F'} />
            <Checkbox text={'S'} />
            <Checkbox text={'M'} />
            <Checkbox text={'L'} />
            <Checkbox text={'XL'} />
          </div>
        </div>
      </form>
    </div>
  );
}
