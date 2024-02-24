import { Image } from 'lucide-react'
import React from 'react'

const ProductFormSkeleton = () => {
      return (
            <div className='flex w-full mt-[30px] justify-between h-max px-[16px] animate-pulse'>
                  <div className=' w-[full] lg:w-[65%]  h-full flex flex-col gap-[25px] '>
                        <p className='h-[18px] w-[25%] bg-gray-300'></p>
                        <div className='flex flex-col gap-[15px] w-[50%]'>
                              <p className='h-[18px] bg-gray-300'></p>
                              <div className='h-[40px] bg-gray-300 rounded-md'></div>
                        </div>

                        <div className='flex flex-col gap-[15px] w-[50%]'>
                              <p className='h-[18px] bg-gray-300'></p>
                              <div className='h-[40px] bg-gray-300 rounded-md'></div>
                        </div>

                        <div className=' bg-gray-100 w-[20%] h-[72px] flex items-center justify-center'>
                              <Image color='#666666' size={50} />
                        </div>
                        <div className='w-[20%] bg-gray-300 h-[40px] rounded-md'></div>

                        <div className='flex gap-[8px]'>
                              {Array(4)
                                    .fill(0)
                                    .map((image, index) => {
                                          return (
                                                <div
                                                      className='  bg-gray-100 w-[20%] h-[72px] flex items-center justify-center'
                                                      key={index}
                                                >
                                                      <Image color='#666666' size={50} />
                                                </div>
                                          )
                                    })}
                        </div>
                        <div className='w-[20%] bg-gray-300 h-[40px] rounded-lg'></div>
                        <div className='w-[50%] h-[350px] bg-gray-300'></div>
                        <div className='w-[50%] bg-gray-300 h-[30px] rounded-lg'></div>
                  </div>
                  <div className='min-h-[1000px] w-[30%] bg-gray-300'></div>
            </div>
      )
}

export default ProductFormSkeleton
