import React, { SetStateAction } from 'react'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'

type TProps = {
      setModelAvatarSee?: React.Dispatch<SetStateAction<boolean>>
      setModelAvatarUpdate?: React.Dispatch<SetStateAction<boolean>>
      setModelAvatar: React.Dispatch<SetStateAction<boolean>>
      children: React.ReactNode
}

const ModelAvatarSee = (props: TProps) => {
      const { setModelAvatarSee, setModelAvatar, setModelAvatarUpdate, children } = props

      const modelControllClose = () => {
            if (setModelAvatarSee) setModelAvatarSee(false)
            if (setModelAvatarUpdate) setModelAvatarUpdate(false)

            setModelAvatar(false)
      }

      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                  <div className='w-[650px] min-h-[340px] h-auto bg-white rounded-2xl p-[40px] relative'>
                        <div className='text-[25px] absolute top-[25px] right-[25px]' onClick={modelControllClose}>
                              <X />
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Xem ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <div className='w-full h-[150px] rounded-full mt-[50px] flex justify-center'>{children}</div>
                  </div>
            </div>
      )
}

export default ModelAvatarSee
