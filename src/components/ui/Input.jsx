import React from 'react';

export default function Input({ text, type }) {
  return (
    <input
      className='p-3 mb-3 border rounded-md border-neutral-200'
      type={type}
      placeholder={text}
    />
  );
}
