import React, { SetStateAction } from 'react'

type Tprops = {
      setModelAvatar: React.Dispatch<SetStateAction<boolean>>
      setModelAvatarDelete: React.Dispatch<SetStateAction<boolean>>
}

// () => api
const ModelAvatarDelete = (props: Tprops) => {
      const { setModelAvatar, setModelAvatarDelete } = props

      const handleCancelActionDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setModelAvatar(false)
            setModelAvatarDelete(false)
      }

      return (
            <div className='fixed w-full min-h-screen top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.7)] z-[500px]'>
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
                              <button className='px-[8px] py-[4px] rounded-md bg-blue-400 w-[70px] flex justify-center items-center text-white'>
                                    Xóa bỏ
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default ModelAvatarDelete
