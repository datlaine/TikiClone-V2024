import React from 'react'

const OrderCommentSkeleton = () => {
      return (
            <section className='animate-pulse w-full h-[600px] xl:h-[300px] bg-gray-100   '>
                  <div className=' w-full h-[40%] flex flex-col xl:flex-row gap-[20px] xl:gap-[30px]'>
                        <div className='w-full xl:w-[40%] h-full p-[10px] xl:p-[20px] flex flex-col gap-[20px] justify-center  '>
                              <div className='min-w-[150px] w-[200px] xl:w-[300px] h-[30px] break-words truncate bg-gray-300 rounded'></div>
                              <div className='xl:flex-1 h-[80px] w-[200px]  bg-slate-300 rounded'></div>
                        </div>
                        <div className='w-full xl:w-[50%] h-full p-[10px] xl:p-[20px] flex flex-col gap-[20px] '>
                              <div className='w-full h-[80px] flex gap-[16px] '>
                                    <div className='w-[80px] h-[80px] rounded-full bg-gray-400'></div>
                                    <div className='w-[40%] xl:w-[70%] flex flex-col justify-center gap-[8px] '>
                                          <p className='h-[36%] w-full bg-gray-300 rounded'></p>
                                          <p className='h-[36%] w-full bg-slate-300 rounded'></p>
                                    </div>
                              </div>
                              <div className='xl:flex-1 min-h-[80px] h-max w-full bg-gray-300 rounded'></div>
                              <p className='w-full h-[20px] bg-slate-300 rounded'></p>
                        </div>
                  </div>
            </section>
      )
}

export default OrderCommentSkeleton
