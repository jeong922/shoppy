import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button className='px-2 py-1 font-semibold' onClick={onClick}>
      {text}
    </button>
  );
}
