import React from 'react'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { Image, X } from 'lucide-react'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { useQuery } from '@tanstack/react-query'
import Account from '../../../apis/account.service'
import AvatarUsed from './AvatarUsed'
import { UserAvatarUsed } from '../../../types/user.type'
import AccountService from '../../../apis/account.service'

type TProps = {
      modeDispatch: React.Dispatch<TAvatarActions>
}

const ModelAvatarSee = (props: TProps) => {
      const { modeDispatch } = props
      const user = useSelector((state: RootState) => state.authentication.user)
      const userAvatarUsed = useQuery({
            queryKey: ['avatar-used'],
            queryFn: () => AccountService.getAllAvatar(),
      })

      const modelControllClose = () => {
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
      }

      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] px-[25px] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
                  }
            >
                  <div
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
                        className='scroll-pt-[50px] w-[650px] min-h-[200px] h-[auto] max-h-[600px] bg-white  p-[40px] relative shadow-2xl overflow-y-scroll'
                  >
                        <div className='absolute text-[25px] max-w-max top-[25px] right-[25px]' onClick={modelControllClose}>
                              <X />
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Xem ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <div className='w-full h-[250px] rounded-full mt-[30px] flex justify-center'>
                              <img
                                    src={user.avatar?.secure_url || user.avartar_url_default || ''}
                                    alt='user_avatar'
                                    className='w-[250px] h-full '
                              />
                        </div>
                        {userAvatarUsed.data?.data.metadata.avatar_used &&
                              userAvatarUsed?.data?.data?.metadata?.avatar_used?.length > 0 && (
                                    <div className='mt-[70px] w-full min-h-[360px] h-auto flex flex-col gap-[20px] '>
                                          <span>Các hình đại diện trước đó</span>
                                          {userAvatarUsed.isSuccess && (
                                                <div className='flex gap-[45px] mb-[70px] min-h-[360px] h-auto flex-wrap '>
                                                      {userAvatarUsed?.data?.data.metadata?.avatar_used
                                                            ?.reverse()
                                                            .map((avatar: UserAvatarUsed) => <AvatarUsed avatar={avatar} />)}
                                                </div>
                                          )}

                                          {userAvatarUsed.isPending && (
                                                <div className='w-full h-full flex gap-[15px]'>
                                                      <div className='animate-pulse bg-gray-200 rounded-lg basis-[50%] h-[360px] flex justify-center items-center '>
                                                            <Image size={40} />
                                                      </div>
                                                      <div className='animate-pulse bg-gray-200 rounded-lg basis-[50%] h-[360px] flex justify-center items-center '>
                                                            <Image size={40} />
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              )}
                  </div>
            </div>
      )
}

export default ModelAvatarSee
