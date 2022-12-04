import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { auth, user, handleUser } = useAuth();
  const onLogin = (e) => {
    console.log(e.currentTarget.textContent);
    // 로그인
    auth
      .login(e.currentTarget.textContent)
      .then((result) => {
        const userInfo = result.user;
        console.log(userInfo);
        handleUser(userInfo);
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <main className='flex flex-col items-center justify-center w-full'>
      <h3 className='text-3xl font-bold'>로그인</h3>
      <div className='flex flex-col items-center justify-center text-center '>
        <h4>SNS 계정으로 로그인</h4>
        <div>
          <button onClick={onLogin} className='mr-2'>
            Google
          </button>
          <button onClick={onLogin}>Github</button>
        </div>
      </div>
    </main>
  );
}
