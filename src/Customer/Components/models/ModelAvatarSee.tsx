import React from 'react'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { useQuery } from '@tanstack/react-query'
import axiosCustom from '../../../apis/http'

type TProps = {
      modeDispatch: React.Dispatch<TAvatarActions>
}

const ModelAvatarSee = (props: TProps) => {
      const { modeDispatch } = props
      const user = useSelector((state: RootState) => state.authentication.user)

      const modelControllClose = () => {
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
      }

      const avatars = useQuery({
            queryKey: ['avatar_used'],
            queryFn: () => axiosCustom.get('/v1/api/account/getAllAvatar'),
      })

      console.log('avatar', avatars)

      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                  <div className='w-[650px] min-h-[200px] h-auto bg-white rounded-2xl p-[40px] relative shadow-2xl'>
                        <div className='text-[25px] absolute top-[25px] right-[25px]' onClick={modelControllClose}>
                              <X />
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Xem ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <div className='w-full h-[100px] rounded-full mt-[30px] flex justify-center'>
                              <img
                                    src={user.avatar?.secure_url || user.avartar_url_default || ''}
                                    alt='user_avatar'
                                    className='w-[100px] h-full rounded-full'
                              />
                        </div>
                  </div>
            </div>
      )
}

export default ModelAvatarSee
