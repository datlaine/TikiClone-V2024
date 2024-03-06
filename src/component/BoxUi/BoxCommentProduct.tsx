import { Rate } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import { X } from 'lucide-react'
import React, { SetStateAction, useState } from 'react'

type TProps = {
      onClose: React.Dispatch<SetStateAction<boolean>>
      product_image: string
}

const BoxCommentProduct = (props: TProps) => {
      const { onClose, product_image } = props

      const [countStar, setCountStar] = useState<number>(0)

      const onChangeStar = (value: number) => {
            console.log({ star: value })
            setCountStar(value)
      }

      return (
            <div className='fixed inset-0 bg-[rgba(0,0,0,.4)] h-screen flex items-center justify-center z-[500]'>
                  <div className='animate-authBox relative w-[350px] xl:w-[420px] h-[600px] mx-[16px] xl:mx-0 bg-[#ffffff] p-[16px] flex flex-col gap-[8px] rounded '>
                        <button className='absolute top-[20px] right-[20px]' onClick={() => onClose(false)}>
                              <X />
                        </button>
                        <div className='flex-1 flex flex-col gap-[16px]'>
                              <div className='w-full h-[80px] flex  gap-[16px]'>
                                    <img src={product_image} className='w-[65px] h-[65px]' alt='product' />
                                    {/* <div className='min-w-[65px] w-[65px] h-[65px] bg-red-800'></div> */}
                                    <div className='flex-1 flex flex-col gap-[8px]'>
                                          <p className='w-[180px] xl:w-[250px] text-[14px] truncate'>
                                                sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                          </p>
                                          <Rate value={countStar} onChange={onChangeStar} className='flex-1 text-[28px]' />
                                    </div>
                              </div>
                              <div className='w-[calc(100%+32px)] ml-[-16px] bg-gray-200 h-[1px]'></div>
                              <div className='flex flex-col gap-[8px]'>
                                    <p>Điều gì làm bạn hài lòng?</p>
                                    <TextArea autoSize={{ minRows: 3 }} />
                              </div>
                              <div className='flex-1 mt-[20px] '>
                                    <input type='file' hidden />
                                    <button className='w-[65px] h-[65px] border-[1px] border-dashed border-blue-400'></button>
                              </div>
                        </div>
                        <button className='w-full h-[40px] bg-blue-400 text-white rounded'>Gửi đánh giá</button>
                  </div>
            </div>
      )
}

export default BoxCommentProduct
