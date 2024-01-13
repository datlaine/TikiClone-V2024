import React, { SetStateAction } from 'react'

type TProps = {
      setModelAvatarUpdate: React.Dispatch<SetStateAction<boolean>>
      setModelAvatar: React.Dispatch<SetStateAction<boolean>>
      setFileAvatar: React.Dispatch<SetStateAction<File | undefined>>
      setFilePreview: React.Dispatch<SetStateAction<string | undefined>>

      filePreview: string | undefined
      handleUploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// () => api
const ModelAvatarUpdate = (props: TProps) => {
      const { setModelAvatar, setModelAvatarUpdate, filePreview, handleUploadAvatar, setFileAvatar, setFilePreview } = props

      const modelControllClose = () => {
            setModelAvatar(false)
            setModelAvatarUpdate(false)
            setFileAvatar(undefined)
            if (filePreview) URL.revokeObjectURL(filePreview)
            setFilePreview('')
      }

      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                  <div className={`w-[650px] ${filePreview ? 'h-[450px]' : 'h-[740px]'} bg-white rounded-2xl p-[40px] relative`}>
                        <div className='text-[25px] absolute top-[25px] right-[25px]' onClick={modelControllClose}>
                              X
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Cập nhập ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <div
                              className={`flex ${
                                    filePreview ? 'h-[calc(80%-85px)]' : 'justify-center h-[calc(100%-85px)]'
                              } mt-[25px] bg-stone-100 mb-[25px] p-[20px] `}
                        >
                              {filePreview && <img src={filePreview} width={200} height={200} alt='avatar_update' className='order-1' />}
                              <label
                                    htmlFor='avatar_update'
                                    className={`${
                                          filePreview ? 'text-center order-2' : ''
                                    } w-full h-full border-[2px] border-dashed border-slate-700 flex justify-center items-center text-blue-500`}
                              >
                                    {filePreview ? 'Chọn ảnh khác' : 'Nhấn để chọn hoặc kéo thả hình ảnh vào khung này'}
                              </label>
                              <input type='file' id='avatar_update' hidden onChange={handleUploadAvatar} />
                        </div>

                        {filePreview && (
                              <div className='w-full min-w-[100px] flex gap-[2%]'>
                                    <button className='w-[49%] px-[12px] py-[6px] bg-stone-200 text-blue-500' onClick={modelControllClose}>
                                          Hủy bỏ
                                    </button>
                                    <button className='w-[49%] px-[12px] py-[6px] bg-blue-500 text-white'>Lưu thay đổi</button>
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default ModelAvatarUpdate
