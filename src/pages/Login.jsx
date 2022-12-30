import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

export default function Login() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const onLogin = (e) => {
    auth.login(e.currentTarget.name).then((user) => {
      if (user) {
        navigate('/');
      }
    });
  };

  const onValid = (data) => {
    const { email, password } = data;
    auth.signInEmailAndPassword(email, password).then((user) => {
      if (user) {
        navigate('/');
      }
    });
  };

  return (
    <main className='w-full h-screen'>
      <section className='flex flex-col items-center mt-40'>
        <UserForm title={'로그인'} onValid={onValid} />
        <span
          onClick={() => navigate('/join')}
          className='mb-3 text-sm cursor-pointer text-neutral-500 hover:text-neutral-700'
        >
          이메일 회원가입
        </span>

        <div className='flex flex-col items-center justify-center text-center'>
          <h4 className='text-neutral-500'>SNS 계정으로 로그인</h4>
          <div className='mt-3'>
            <button
              name='Google'
              onClick={onLogin}
              title='Google 로그인'
              className='mr-2'
            >
              <svg
                className='w-10 h-10 mr-4'
                viewBox='0 0 20 20'
                preserveAspectRatio='xMidYMid meet'
                focusable='false'
              >
                <path
                  d='M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z'
                  fill='#4285F4'
                ></path>
                <path
                  d='M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z'
                  fill='#34A853'
                ></path>
                <path
                  d='M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z'
                  fill='#FBBC05'
                ></path>
                <path
                  d='M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z'
                  fill='#EA4335'
                ></path>
              </svg>
            </button>
            <button name='Github' onClick={onLogin} title='Github 로그인'>
              <svg
                className='w-10 h-10'
                viewBox='0 0 20 20'
                preserveAspectRatio='xMidYMid meet'
                focusable='false'
              >
                <path
                  d='M10 0C4.476 0 0 4.477 0 10c0 4.418 2.865 8.166 6.84 9.49.5.09.68-.218.68-.483 0-.237-.007-.866-.012-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.464-1.11-1.464-.907-.62.07-.608.07-.608 1.003.07 1.53 1.03 1.53 1.03.893 1.53 2.342 1.087 2.912.83.09-.645.35-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.683-.105-.253-.448-1.27.096-2.647 0 0 .84-.268 2.75 1.026A9.555 9.555 0 0110 4.836a9.59 9.59 0 012.504.337c1.91-1.294 2.747-1.026 2.747-1.026.548 1.377.204 2.394.1 2.647.64.7 1.03 1.592 1.03 2.683 0 3.842-2.34 4.687-4.566 4.935.36.308.678.92.678 1.852 0 1.336-.01 2.415-.01 2.743 0 .267.18.578.687.48A10 10 0 0020 10c0-5.522-4.478-10-10-10'
                  fillRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
