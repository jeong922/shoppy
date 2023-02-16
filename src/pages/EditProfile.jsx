import React, { useEffect, useState } from 'react';
import Title from '../components/ui/Title';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { ImageUploader } from '../api/uploader';
import Button from '../components/ui/Button';
import useUserInfo from '../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';

const imageUploader = new ImageUploader();
const INPUT_STYLES = 'p-2 mb-3 border rounded-md border-neutral-200';
const LABEL_STYLES = 'inline-block w-28';
export default function EditProfile() {
  // 이름, 아이디(변경 불가),이메일, 프로필 변경
  const navigate = useNavigate();
  const { user } = useAuth();
  const [file, setFile] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [newUserInfo, setNewUserInfo] = useState({});
  const [success, setSuccess] = useState('');
  const { updateUserInfo } = useUserInfo();
  const {
    userInfoQuery: { isLoading, data: userInfo },
  } = useUserInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = '';
    file
      ? imageUploader.upload(file).then((data) => {
          const url = data.url;
          updateUserInfo.mutate(
            { newUserInfo, url },
            {
              onSuccess: () => {
                setSuccess('회원 정보가 변경 되었습니다.');
                setTimeout(() => {
                  setSuccess(null);
                  navigate(-1);
                }, 3000);
              },
            }
          );
        })
      : updateUserInfo.mutate(
          { newUserInfo, url },
          {
            onSuccess: () => {
              setSuccess('회원 정보가 변경 되었습니다.');
              setTimeout(() => {
                setSuccess(null);
                navigate(-1);
              }, 3000);
            },
          }
        );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    setNewUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  const onScroll = () => {
    setScrollY(window.scrollY);
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center max-w-3xl px-3 pb-10 mx-auto mt-9'>
      <Title text={'회원정보 수정'} />
      <form onSubmit={handleSubmit} className='flex justify-center w-full'>
        <section className='flex flex-col items-center justify-center mr-5'>
          {file ? (
            <div className='w-32 h-32 overflow-hidden rounded-full'>
              <img
                src={URL.createObjectURL(file)}
                alt='local file'
                className='object-cover w-full h-full'
              />
            </div>
          ) : (
            <div className='w-32 h-32 overflow-hidden rounded-full'>
              {userInfo.imageURL ? (
                <img
                  className='object-cover w-full h-full'
                  src={userInfo.imageURL}
                  alt='user'
                />
              ) : (
                <FaUserCircle className='w-full h-full fill-neutral-400' />
              )}
            </div>
          )}

          <div className='mt-5'>
            <label
              htmlFor='file'
              className='p-2 px-3 text-sm text-white bg-black cursor-pointer hover:opacity-70'
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
          />
        </section>

        <section>
          <div>
            <label className={LABEL_STYLES} htmlFor='name'>
              이름
            </label>
            <input
              className={INPUT_STYLES}
              type='text'
              id='name'
              value={newUserInfo.name ?? user.displayName ?? ''}
              name='name'
              onChange={handleChange}
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
              name='email'
              value={newUserInfo.email ?? user.email ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className='inline-block text-sm text-center text-white bg-black hover:opacity-70'>
            <Button text={'확인'} />
          </div>
        </section>
      </form>
      {success && (
        <div className='fixed top-0 z-50 flex items-center justify-center w-full h-full bg-modal_bg'>
          <div className='z-50 p-5 m-3 text-lg rounded-md bg-neutral-50'>
            <span>{success}</span>
          </div>
        </div>
      )}
    </div>
  );
}
