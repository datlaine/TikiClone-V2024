import React from 'react'

const CustomerWrapperItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex w-full bg-[#ffffff] shadow-lg rounded-md min-h-[calc(100vh-240px)] my-[150px] xl:mt-0 xl:min-h-[550px] h-auto  max-h-auto p-[8px]'>
            {children}
        </div>
    )
}

export default CustomerWrapperItem
