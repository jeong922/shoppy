import React, { useEffect } from 'react';
import Title from '../components/ui/Title';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '../hooks/useUserInfo';

const INPUT_STYLES =
  'p-2 mb-3 border rounded-md border-neutral-200 w-60 outline-none';
const LABEL_STYLES = 'inline-block w-28';
export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    userInfoQuery: { isLoading, data: userInfo },
  } = useUserInfo();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(userInfo);

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
            <label className={LABEL_STYLES} htmlFor='name'>
              이름
            </label>
            <input
              className={INPUT_STYLES}
              type='text'
              id='name'
              value={user.displayName}
              name='name'
              readOnly
            />
          </div>
          <div>
            <label className={LABEL_STYLES} htmlFor='email'>
              이메일
            </label>
            <input
              className={INPUT_STYLES}
              type='email'
              id='email'
              value={user.email}
              readOnly
            />
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
    </div>
  );
}
