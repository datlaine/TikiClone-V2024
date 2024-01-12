import React from 'react'

const CustomerWrapperItem = ({ children }: { children: React.ReactNode }) => {
      return (
            <div className='w-full bg-white border-[1px] border-zinc-300 rounded-lg min-h-[350px] h-[550px] max-h-auto p-[16px]'>
                  {children}
            </div>
      )
}

export default CustomerWrapperItem
