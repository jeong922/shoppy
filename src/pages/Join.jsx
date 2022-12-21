import React from 'react';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';

export default function Join() {
  const { auth } = useAuth();
  const onValid = (data) => {
    const { email, password } = data;
    auth.createEmailAndPassword(email, password);
  };
  return (
    <main>
      <section className='flex flex-col items-center mt-40'>
        <UserForm title={'회원가입'} onValid={onValid} />
      </section>
    </main>
  );
}
