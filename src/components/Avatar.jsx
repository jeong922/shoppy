import React from 'react';

export default function Avatar({ user: { photoURL, displayName } }) {
  return (
    <>
      <img
        className='rounded-full'
        src={photoURL}
        alt={displayName}
        referrerPolicy='no-referrer'
        title={displayName}
      />
    </>
  );
}
