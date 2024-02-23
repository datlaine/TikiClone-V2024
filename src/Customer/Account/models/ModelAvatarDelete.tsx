import React, { SetStateAction, useEffect } from 'react'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../../Redux/authenticationSlice'
import { RootState } from '../../../store'
import { addToast } from '../../../Redux/toast'
import AccountService from '../../../apis/account.service'

type Tprops = {
      modeDispatch: React.Dispatch<TAvatarActions>

      setModelAvatar?: React.Dispatch<SetStateAction<boolean>>
      setModelAvatarDelete?: React.Dispatch<SetStateAction<boolean>>
}

// () => api
const ModelAvatarDelete = (props: Tprops) => {
      const dispatch = useDispatch()
      const { modeDispatch } = props
      const user = useSelector((state: RootState) => state.authentication.user)
      const deleteAvatar = useMutation({ mutationKey: ['delete-avatar'], mutationFn: () => AccountService.deleteAvatar() })

      const handleCancelActionDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_DELETE', payload: { modeAvatarDelete: false, boxModeAvatar: false } })
      }

      const handleDeleteAvatar = () => {
            if (user.avatar) {
                  deleteAvatar.mutate()
                  return
            }

            dispatch(addToast({ type: 'WARNNING', message: 'Không thể xóa avatar mặc định', id: Math.random().toString() }))
      }

      useEffect(() => {
            if (deleteAvatar.isSuccess) {
                  modeDispatch({ type: 'CLOSE_MODE_AVATAR_DELETE', payload: { modeAvatarDelete: false, boxModeAvatar: false } })

                  dispatch(fetchUser({ user: deleteAvatar.data.data.metadata.user }))
            }
      }, [deleteAvatar.isSuccess, deleteAvatar.data?.data.metadata, dispatch, modeDispatch])

      return (
            <div
                  className='fixed w-full min-h-screen top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.7)] z-[11]'
                  onClick={() => {
                        modeDispatch({ type: 'CLOSE_MODE_AVATAR_DELETE', payload: { modeAvatarDelete: false, boxModeAvatar: false } })
                  }}
            >
                  <div
                        className='w-[400px] h-[150px] p-[16px] bg-white rounded-lg shadow-2xl flex flex-col gap-[12px]'
                        onClick={(e) => e.stopPropagation()}
                  >
                        <p>Bạn có chắc muốn xóa bỏ ảnh đại diện ?</p>
                        <p>Hình ảnh đại diện sẽ quay về mặc định của Tiki</p>
                        <div className='flex justify-end gap-[10px] mt-[12px]'>
                              <button
                                    className='px-[8px] py-[4px] rounded-md border-[1px] border-blue-400 text-blue-400 w-[40px] flex justify-center items-center'
                                    onClick={handleCancelActionDelete}
                              >
                                    Hủy
                              </button>
                              <button
                                    className='px-[8px] py-[4px] rounded-md bg-blue-400 w-[70px] flex justify-center items-center text-white'
                                    onClick={handleDeleteAvatar}
                              >
                                    Xóa bỏ
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default ModelAvatarDelete
