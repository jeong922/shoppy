import React, { useState } from 'react';
import Repository from '../api/repository';
import { ImageUploader } from '../api/uploader';
import Checkbox from '../components/ui/Checkbox';

const imageUploader = new ImageUploader();
const repository = new Repository();

export default function AddProduct() {
  const [product, setProduct] = useState({});
  const [optionValue, setOptionValue] = useState([]);
  const [file, setFile] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    imageUploader.upload(file).then((data) => {
      const url = data.url;
      repository.addNewProduct(product, url);
    });
  };

  const handleOption = (value, isCheck) => {
    if (isCheck) {
      setOptionValue([...optionValue, value]);
    } else {
      setOptionValue(optionValue.filter((item) => item !== value));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value,
      option: optionValue,
    }));
  };

  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 mx-auto'>
      <h2 className='text-2xl text-center '>새로운 제품 등록</h2>
      {file && (
        <img
          className='w-4/5 mb-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form onSubmit={handleSubmit} className='flex flex-col w-full '>
        <input
          className='mb-3'
          type='file'
          accept='image/*'
          name='file'
          onChange={handleChange}
          required
        />
        <input
          className='p-3 mb-3 border rounded-md border-neutral-200'
          type='text'
          placeholder='제품명'
          name={'title'}
          value={product.title ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='p-3 mb-3 border rounded-md border-neutral-200'
          type='text'
          placeholder='카테고리'
          name={'category'}
          value={product.category ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='p-3 mb-3 border rounded-md border-neutral-200'
          type='number'
          placeholder='가격'
          name={'price'}
          value={product.price ?? ''}
          required
          onChange={handleChange}
        />
        <input
          className='p-3 mb-3 border rounded-md border-neutral-200'
          type='text'
          placeholder='제품설명'
          name={'description'}
          value={product.description ?? ''}
          required
          onChange={handleChange}
        />
        <div className='flex mb-3'>
          <span className='mr-3'>사이즈 옵션</span>
          <div className='flex'>
            <Checkbox text={'F'} onValue={handleOption} />
            <Checkbox text={'S'} onValue={handleOption} />
            <Checkbox text={'M'} onValue={handleOption} />
            <Checkbox text={'L'} onValue={handleOption} />
            <Checkbox text={'XL'} onValue={handleOption} />
          </div>
        </div>
        <button>상품 추가</button>
      </form>
    </div>
  );
}
