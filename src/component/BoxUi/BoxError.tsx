import { FolderLock } from 'lucide-react'
import React from 'react'

type TProps = {
      message?: string
}

const BoxError = (props: TProps) => {
      const { message = 'Không thể kết nối tới máy chủ' } = props
      return (
            <div className=' h-full  w-full flex justify-center items-center gap-[30px]  text-[40px] shadow'>
                  <FolderLock size={40} />
                  <span>{message}</span>
            </div>
      )
}

export default BoxError
