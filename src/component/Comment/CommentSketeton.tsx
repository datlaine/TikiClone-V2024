import React from 'react'

const CommentSketeton = () => {
      return (
            <div className='animate-pulse relative flex flex-col xl:flex-row min-h-[350px] h-max py-[16px] border-t-[2px] border-[rgb(245_245_250)] gap-[16px] xl:gap-0 bg-gray-100'>
                  <div className=' w-full xl:w-[35%] min-h-[90px] flex flex-col xl:flex-row  gap-[10px]'>
                        <div className='animate-pulse bg-gray-300 w-[40px] h-[40px] rounded-full'></div>

                        <div className='flex flex-col gap-[6px] text-[14px]'>
                              <p className='animate-pulse bg-gray-300  w-[150px] h-[15px]  flex flex-col xl:flex-row gap-[5px]  font-semibold rounded'>
                                    <span className='text-slate-900'></span>
                              </p>
                              <p className='animate-pulse bg-gray-300 w-[150px] h-[15px] rounded'></p>
                        </div>
                  </div>
                  <div className='w-full xl:w-[35%] flex  flex-col gap-[12px]'>
                        <div className='animate-pulse bg-gray-300 flex flex-col xl:flex-row xl:items-center gap-[8px] rounded'>
                              <span className='w-[40px] h-[20px]'></span>
                              <span className='text-[15px] text-slate-600 font-bold'></span>
                        </div>
                        <div className='animate-pulse bg-gray-300 w-full min-h-[20px] h-max break-words text-[11px] text-gray-500 rounded'></div>
                        <div className='animate-pulse bg-gray-300 w-full min-h-[80px] h-max flex flex-col gap-[12px] rounded'></div>
                        <p className='text-gray-500 w-[150px]'></p>
                  </div>
            </div>
      )
}

export default CommentSketeton
