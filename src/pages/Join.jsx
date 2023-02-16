import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const onValid = (data) => {
    const { email, password } = data;
    auth
      .createEmailAndPassword(email, password)
      .then((data) => {
        if (data) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error.code);
        let code = error.code;
        switch (code) {
          //FIXME: 에러 코드 추가하기
          case 'auth/email-already-in-use':
            setError('이미 존재하는 이메일 입니다.');
            break;
          case 'auth/weak-password':
            setError('비밀번호는 6자리 이상 입력해 주세요.');
            break;
          default:
            console.log('해당하는 에러 코드가 없음!');
        }
      });
  };
  return (
    <main>
      <section className='flex flex-col items-center mt-40'>
        <UserForm title={'회원가입'} onValid={onValid} isName={true} />
        {error && <span className='mb-2 text-sm text-red-600'>{error}</span>}
      </section>
    </main>
  );
}
