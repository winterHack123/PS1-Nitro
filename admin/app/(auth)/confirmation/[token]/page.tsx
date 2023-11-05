'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Token = () => {
  const pathname = usePathname();
  const [letters, setLetters] = useState('');

  return (
    <div className="h-screen w-screen fixed z-50 left-0 top-0 bg-white flex flex-col items-center justify-center">
      <input
        className="bg-slate-200 mb-3 rounded-md text-sm px-4 py-2"
        placeholder="Type abcd"
        onChange={(e) => setLetters(e.target.value)}
      />

      <button
        onClick={() => {
          if (letters !== 'abcd') return alert('Please enter abcd in the box');
          else {
            window.location.replace(
              `https://envmlpgayiwqbudvahva.supabase.co/auth/v1/verify?redirect_to=https://hia.mediax.co.in/password-reset&token=${
                pathname.split('/')[2]
              }&type=recovery`
            );
          }
        }}
        className="bg-[#01B4BC] text-white cursor-pointer px-6 py-2 rounded-md"
      >
        Reset Password
      </button>

      <Link
        href={'/login'}
        className="mt-2 text-sm text-slate-600 cursor-pointer"
      >
        Take me back to login screen
      </Link>
    </div>
  );
};

export default Token;
