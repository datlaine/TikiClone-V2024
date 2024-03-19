import React from 'react'
import { FeaturedBook } from '../books/utils/importImage.util'

const FeaturedCategoryItem = () => {
      return (
            <>
                  {FeaturedBook.map((product, index) => (
                        <div
                              key={index}
                              className='flex flex-col justify-center items-center min-w-[calc(100%/3)] xl:min-w-[calc(100%/6.2)] h-full  xl:gap-[8px] snap-center snap-always xl:snap-none'
                        >
                              <img
                                    src={product.image}
                                    className='w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] bg-gray-300  rounded-full'
                                    alt='product'
                              ></img>
                              <span className='text-center break-all'>{product.title}</span>
                        </div>
                  ))}
            </>
      )
}

export default FeaturedCategoryItem
