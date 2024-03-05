import React from 'react'

const BoxLoading = () => {
      return (
            <span
                  className=' inline-block h-[25px] w-[25px] text-[#ffffff] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
            ></span>
      )
}

export default BoxLoading
