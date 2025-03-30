import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const Layout = ({ children }) => {
  return (
    <div  className='px-5'>
      <div className='flex-items-center justify-between mb-5'>
        <h1 className='text-6xl bg-gradient-to-b from-gray-800 via-gray-600 to-gray-900 
    dark:from-gray-400 dark:via-gray-200 dark:to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2'>Industry Insights</h1>
      </div>
      <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='gray' />}>{children}</Suspense>
    </div>
  )
}

export default Layout