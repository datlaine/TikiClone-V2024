import React from 'react'

const NotificationSkeleton = () => {
      return (
            <div className='w-full min-h-[100px] h-[70%] flex gap-[16px] bg-transparent'>
                  <div className='w-[30%] h-full animate-pulse bg-gray-300'></div>
                  <div className='flex-1 flex flex-col gap-[8px] animate-pulse bg-gray-100'>
                        <div className='basis-[30%] rounded h-full bg-gray-300 animate-pulse'></div>
                        <div className='basis-[30%] rounded h-full bg-gray-300 animate-pulse'></div>
                        <div className='basis-[30%] rounded h-full bg-gray-300 animate-pulse'></div>
                  </div>
            </div>
      )
}

export default NotificationSkeleton
