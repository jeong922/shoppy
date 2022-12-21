import React from 'react';

export default function Avatar({ user: { photoURL, displayName }, user }) {
  return (
    <>
      {photoURL ? (
        <img
          className='rounded-full'
          src={photoURL}
          alt={displayName}
          referrerPolicy='no-referrer'
          title={displayName}
        />
      ) : (
        <div className='flex items-center justify-center w-8 h-8 font-semibold text-white rounded-full bg-mainColor'>
          {user.email[0].toUpperCase()}
        </div>
      )}
    </>
  );
}
