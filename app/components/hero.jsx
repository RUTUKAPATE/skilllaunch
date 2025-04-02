import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className='w-full pt-36 md:pt-48 pb-20'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-gradient font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 via-gray-600 to-gray-900 
    dark:from-gray-400 dark:via-gray-200 dark:to-gray-600 pb-2 pr-2 '>Your AI Career Guide for
            <br />
            Professional Success
          </h1>
          <p className='mx-auto max-w-[600] text-muted-foreground md:text-xl'>
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
          <div className='mt-6 mx-auto max-w-[600]'>
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
