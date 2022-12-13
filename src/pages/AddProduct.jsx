import React, { useEffect, useState } from 'react';
import Repository from '../api/repository';
import { ImageUploader } from '../api/uploader';
import Checkbox from '../components/ui/Checkbox';
import { useNavigate } from 'react-router-dom';
import Title from '../components/ui/Title';
import Button from '../components/ui/Button';

const imageUploader = new ImageUploader();
const repository = new Repository();

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [file, setFile] = useState('');
  const [success, setSuccess] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [optionText, setOptionText] = useState('');
  const [istext, setIsText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.length) {
      imageUploader.upload(file).then((data) => {
        const url = data.url;
        repository.addNewProduct(product, url).then(() => {
          setSuccess('제품이 등록 되었습니다.');
          setTimeout(() => {
            setSuccess(null);
            navigate(-1);
          }, 3000);
        });
      });
    }
  };

  const handleOption = (value, isCheck) => {
    if (isCheck) {
      setOptions([...options, value]);
    } else {
      setOptions(options.filter((item) => item !== value));
    }
  };

  const handleTextOption = (value, isCheck) => {
    if (isCheck && value === '직접 입력') {
      setIsText(true);
    } else {
      setIsText(false);
    }
  };

  const handleTextOptionChange = (e) => {
    setOptionText(e.target.value);
  };

  const addTextOption = () => {
    const value = options.join(',');
    if (optionText === '') {
      setOptions([]);
      return;
    }

    if (value !== optionText) {
      setOptions([...optionText.split(',')]);
      return;
    }

    setOptions([...options, ...optionText.split(',')]);
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
    }));
  };

  const onScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    setProduct((product) => ({
      ...product,
      options,
    }));
  }, [options]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (success) {
      document.body.style.cssText = `
    position: fixed;
    top: -${scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [scrollY, success]);

  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 pb-10 mx-auto mt-9'>
      <Title text={'새로운 제품 등록'} />
      {file && (
        <img
          className='w-2/4 mb-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form onSubmit={handleSubmit} className='flex flex-col w-full '>
        <div className='mb-3'>
          <label
            htmlFor='file'
            className='p-2 px-3 text-sm text-white cursor-pointer bg-mainColor hover:opacity-70'
          >
            이미지 선택
          </label>
          {file && <span className='ml-2 text-sm'>{file.name}</span>}
        </div>
        <input
          id='file'
          className='hidden mb-3'
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
          min={0}
        />
        <textarea
          className='h-64 p-3 mb-3 border rounded-md resize-none border-neutral-200'
          type='text'
          placeholder='제품설명'
          name={'description'}
          value={product.description ?? ''}
          required
          onChange={handleChange}
        />
        <div className='flex flex-col mb-3'>
          <div className='flex mb-2'>
            <span className='mr-3 font-semibold'>사이즈 옵션</span>
            <Checkbox text={'F'} onValue={handleOption} state={istext} />
            <Checkbox text={'S'} onValue={handleOption} state={istext} />
            <Checkbox text={'M'} onValue={handleOption} state={istext} />
            <Checkbox text={'L'} onValue={handleOption} state={istext} />
            <Checkbox text={'XL'} onValue={handleOption} state={istext} />
            <Checkbox text={'2XL'} onValue={handleOption} state={istext} />
            <Checkbox text={'직접 입력'} onValue={handleTextOption} />
          </div>
          <div>
            <input
              disabled={!istext}
              name='inputOption'
              onChange={handleTextOptionChange}
              className='w-3/4 px-2 py-1 border rounded-md border-neutral-200 placeholder:text-sm'
              type='text'
              placeholder='원하는 사이즈 옵션이 없다면 ,(쉼표)로 구분하여 입력해 주세요.'
            />
            <button
              type='button'
              onClick={addTextOption}
              className='px-2 py-1 ml-2 text-sm text-white bg-mainColor'
            >
              사이즈 등록
            </button>
          </div>
        </div>
        {!options.length && (
          <span className='mb-2 text-sm text-red-600'>
            ❗사이즈 옵션을 선택해주세요.
          </span>
        )}
        <div className='text-center text-white bg-mainColor hover:opacity-70'>
          <Button text={'상품 추가'} />
        </div>
      </form>
      {success && (
        <div className='fixed top-0 flex items-center justify-center w-full h-full bg-modal_bg'>
          <div className='z-50 p-5 m-3 text-lg rounded-md bg-neutral-50'>
            <span>{success}</span>
          </div>
        </div>
      )}
    </div>
  );
}
