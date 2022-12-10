import React from 'react';

export default function Checkbox({ text, onValue }) {
  const handleChange = (e) => {
    onValue(text, e.target.checked);
  };
  return (
    <div className='mr-4'>
      <label className='mr-2' htmlFor={text}>
        {text}
      </label>
      <input onChange={handleChange} id={text} type='checkbox' value={text} />
    </div>
  );
}
