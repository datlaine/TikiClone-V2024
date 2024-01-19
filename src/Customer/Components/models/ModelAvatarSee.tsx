import React from 'react'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { TAvatarActions } from '../../../reducer/customer.reducer'

type TProps = {
      children: React.ReactNode
      modeDispatch: React.Dispatch<TAvatarActions>
}

const ModelAvatarSee = (props: TProps) => {
      const { children, modeDispatch } = props

      const modelControllClose = () => {
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
      }

      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                  <div className='w-[650px] min-h-[340px] h-auto bg-white rounded-2xl p-[40px] relative shadow-2xl'>
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
