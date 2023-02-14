import React, { useEffect, useState } from 'react';
import Title from '../components/ui/Title';
import { FaUserCircle } from 'react-icons/fa';

const LABEL_STYLES = 'inline-block w-20';
const INPUT_STYLES = 'p-3 mb-3 border rounded-md border-neutral-200';
export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 pb-10 mx-auto mt-9'>
      <Title text={'회원정보'} />
      <form className='flex justify-center w-full'>
        <section className='flex flex-col items-center justify-center mr-5'>
          <div className='w-32 h-32'>
            <FaUserCircle className='w-full h-full fill-neutral-400' />
          </div>
          {/* {file && (
            <img
              className='bg-neutral-500 w-200'
              src={URL.createObjectURL(file)}
              alt='local file'
            />
          )} */}
          <div className='mt-3'>
            <label
              htmlFor='file'
              className='p-2 px-3 text-sm text-white bg-black cursor-pointer hover:opacity-70'
            >
              이미지 선택
            </label>
            {file && <span className='ml-2 text-sm'>{file.name}</span>}
          </div>
        </section>

        <section className='flex flex-col'>
          <div>
            <label className={LABEL_STYLES} htmlFor='name'>
              이름
            </label>
            <input className={INPUT_STYLES} id='name' type='text' />
          </div>
          <div>
            <label className={LABEL_STYLES} htmlFor='email'>
              이메일
            </label>
            <input className={INPUT_STYLES} id='email' type='email' />
          </div>
          <div>
            <label className={LABEL_STYLES} htmlFor='password'>
              비밀번호
            </label>
            <input className={INPUT_STYLES} id='password' type='password' />
          </div>
        </section>
      </form>
    </div>
  );
}
