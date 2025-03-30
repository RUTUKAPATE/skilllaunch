import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/quiz';

const MockInterviewPage = () => {
  return (
    <div className='container mx-auto space-y-4 py-6'>
      <div className='flex flex-col space-y-2 mx-2'>
        <Link href={"/interview"}>
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className='h-4 w-4' />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className='text-6xl bg-gradient-to-b from-gray-800 via-gray-600 to-gray-900 
    dark:from-gray-400 dark:via-gray-200 dark:to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2'>Mock Interview</h1>
          <p className='text-muted-foreground'>Test your knowledge with industry-specific questions</p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default MockInterviewPage