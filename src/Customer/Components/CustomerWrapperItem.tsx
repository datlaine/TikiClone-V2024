import React from 'react'

const CustomerWrapperItem = ({ children }: { children: React.ReactNode }) => {
      return (
            <div className='flex w-full bg-[#ffffff] shadow-lg rounded-md h-max my-[30px] xl:mt-0 xl:min-h-[150px] max-h-auto  max-h-auto p-[30px_8px] xl:p-[8px]'>
                  {children}
            </div>
      )
}

export default CustomerWrapperItem
