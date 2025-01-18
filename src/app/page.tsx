'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {Finger_Paint, Wellfleet} from 'next/font/google'

const fp = Finger_Paint({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
})

const wf = Wellfleet({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
})
const SignUpLanding = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleKeyPress = () => {
        router.push('/start');
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [router]);

  const handleClick = () => {
    router.push('/start');
  };

  return (
    <div className="relative min-h-screen w-full cursor-pointer" onClick={handleClick}>
      {/* Background Image using next/image */}
      <div className="absolute inset-0">
        <Image
          src="/sp.svg"
          alt="Background pattern"
          fill
          priority
          className="object-cover"
          style={{
            filter: 'brightness(100)',
            opacity: 1
          }}
        />
      </div>

      {/* Content - adjusted positioning */}
      <div className="z-10 absolute w-full flex flex-col items-center mt-[-15vh]" style={{ top: '50%' }}>
        <h1 className="text-8xl mb-8 font-bold text-center">
        <span className={wf.className}>Sign Up!</span>
        </h1>
        <p className="text-2xl animate-pulse text-center">
          <span className={fp.className}>Press &lt;any&gt; to start</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpLanding;