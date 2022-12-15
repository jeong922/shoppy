import React from 'react';

export default function Button({ text, onClick, state }) {
  return (
    <button
      className='w-full px-3 py-2 font-semibold'
      onClick={onClick}
      disabled={state}
    >
      {text}
    </button>
  );
}
