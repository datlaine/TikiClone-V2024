import React, { SetStateAction } from 'react'
import BoxModal from './BoxModal'
import { X } from 'lucide-react'

type TProps = {
      filePreview: string
      setModalFilePreview: React.Dispatch<SetStateAction<boolean>>
}

const BoxModalPreview = (props: TProps) => {
      const { filePreview, setModalFilePreview } = props

      return (
            <BoxModal>
                  <div className='relative w-[450px] h-[650px]'>
                        <img src={filePreview} alt='preview' className='w-full h-full bg-yellow-700' />
                        <div
                              className='absolute top-[-10px] right-[-10px] bg-slate-900 flex items-center justify-center rounded-md'
                              onClick={() => setModalFilePreview(false)}
                        >
                              <X color='white' size={40} />
                        </div>
                  </div>
            </BoxModal>
      )
}

export default BoxModalPreview
