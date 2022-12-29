import React from 'react';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const onValid = (data) => {
    const { email, password } = data;
    auth.createEmailAndPassword(email, password);
    navigate('/');
  };
  return (
    <main>
      <section className='flex flex-col items-center mt-40'>
        <UserForm title={'회원가입'} onValid={onValid} />
      </section>
    </main>
  );
}
