import React, { useEffect, useState } from 'react';
import Repository from '../api/repository';
import { ImageUploader } from '../api/uploader';
import Checkbox from '../components/ui/Checkbox';
import { useNavigate } from 'react-router-dom';

const imageUploader = new ImageUploader();
const repository = new Repository();

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [option, setOption] = useState([]);
  const [file, setFile] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (option.length) {
      imageUploader
        .upload(file)
        .then((data) => {
          const url = data.url;
          repository.addNewProduct(product, url).then(() => {
            setSuccess('제품이 등록 되었습니다.');
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          });
        })
        .finally(() => setIsUploading(false));
    }
  };

  const handleOption = (value, isCheck) => {
    if (isCheck) {
      setOption([...option, value]);
    } else {
      setOption(option.filter((item) => item !== value));
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
    }));
  };

  const onScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    setProduct((product) => ({
      ...product,
      option,
    }));
  }, [option]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  console.log(scrollY);

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
      <h2 className='mb-3 text-2xl text-center'>새로운 제품 등록</h2>
      {file && (
        <img
          className='w-2/4 mb-2'
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
        <div className='flex mb-3'>
          <span className='mr-3 font-semibold'>사이즈 옵션</span>
          <div className='flex'>
            <Checkbox text={'F'} onValue={handleOption} />
            <Checkbox text={'S'} onValue={handleOption} />
            <Checkbox text={'M'} onValue={handleOption} />
            <Checkbox text={'L'} onValue={handleOption} />
            <Checkbox text={'XL'} onValue={handleOption} />
          </div>
        </div>
        {!option.length && (
          <span className='mb-2 text-sm text-red-600'>
            ❗사이즈 옵션을 선택해주세요.
          </span>
        )}
        <button className='p-2 text-white bg-mainColor hover:opacity-70'>
          상품 추가
        </button>
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
