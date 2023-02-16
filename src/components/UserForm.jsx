import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserForm({ title, onValid, isName }) {
  const [invalidEmail, setInvalidEmail] = useState(null);
  const [invalidPassword, setInvalidPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onInvalid = (error) => {
    const { email, password } = error;
    email ? setInvalidEmail(email.message) : setInvalidEmail(null);
    password ? setInvalidPassword(password.message) : setInvalidPassword(null);
  };

  const handleShowPassword = (e) => {
    e.target.checked ? setShowPassword(true) : setShowPassword(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h3 className='text-3xl font-bold'>{title}</h3>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className='flex flex-col m-6 mb-3'
      >
        {isName && (
          <input
            {...register('name', { required: '이름을 입력해 주세요.' })}
            className='p-2 px-3 mb-3 border border-neutral-400'
            type='text'
            placeholder='이름'
          />
        )}
        <input
          {...register('email', { required: '이메일을 입력해 주세요.' })}
          className='p-2 px-3 mb-3 border border-neutral-400'
          type='email'
          placeholder='이메일'
        />
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: { message: '6글자 이상 입력해주세요.', value: 6 },
            maxLength: { message: '20글자 이하로 입력해주세요.', value: 20 },
            valueAsNumber: true,
          })}
          className='p-2 px-3 mb-3 border border-neutral-400'
          type={showPassword ? 'text' : 'password'}
          placeholder='비밀번호'
        />
        <div onChange={handleShowPassword} className='mb-3 text-sm'>
          <input className='mr-2' id='passwordCheck' type='checkbox' />
          <label htmlFor='passwordCheck'>비밀번호 표시</label>
        </div>
        <button className='p-2 px-3 text-white bg-black hover:opacity-70'>
          {title}
        </button>
      </form>
      {invalidEmail && (
        <span className='text-xs text-red-600'>{invalidEmail}</span>
      )}
      {invalidPassword && (
        <span className='text-xs text-red-600'>{invalidPassword}</span>
      )}
    </div>
  );
}
