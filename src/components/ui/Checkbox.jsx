import React from 'react';

export default function Checkbox({ text }) {
  return (
    <div className='mr-4'>
      <label className='mr-2' htmlFor={text}>
        {text}
      </label>
      <input id={text} type='checkbox' />
    </div>
  );
}
