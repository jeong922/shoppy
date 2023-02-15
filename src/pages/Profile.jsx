import React, { useEffect } from 'react';
import Title from '../components/ui/Title';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SPAN_STYLES = 'inline-block w-28';
export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 pb-10 mx-auto mt-9'>
      <Title text={'회원정보'} />
      <div className='flex justify-center w-full'>
        <section className='flex flex-col items-center justify-center mr-5'>
          {user && user.photoURL ? (
            <div className='w-32 h-32 overflow-hidden rounded-full'>
              <img src={user.photoURL} alt='' className='w-full h-full' />
            </div>
          ) : (
            <div className='w-32 h-32'>
              <FaUserCircle className='w-full h-full fill-neutral-400' />
            </div>
          )}
        </section>

        <section className='flex flex-col justify-center'>
          <div>
            <span className={SPAN_STYLES}>이름</span>
            <span>{user && user.displayName}</span>
          </div>
          <div>
            <span className={SPAN_STYLES}>이메일</span>
            <span>{user && user.email}</span>
          </div>

          <div>
            <div className='text-center text-white bg-black hover:opacity-70'>
              <Button
                onClick={() => navigate('/editProfile')}
                text={'회원 정보 수정'}
              />
            </div>
          </div>
        </section>
      </div>
      <div className='flex justify-end w-full'>
        <div className='text-center text-white bg-black hover:opacity-70 mt-36'>
          <Button text={'회원 탈퇴'} />
        </div>
      </div>
    </div>
  );
}
