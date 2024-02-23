import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import Portal from '../../Portal'
import BoxButton from '../BoxButton'
import { X } from 'lucide-react'

type BoxConfirmDeleteProps<ParamsActive> = {
      content: string
      subContent?: string
      ButtonConfrimContent: string
      ButtonCancellContent: string
      isLoadng?: boolean
      paramsActive: ParamsActive
      onActive: (params: ParamsActive) => void
      onClose: React.Dispatch<SetStateAction<boolean>>
}

const BoxConfirmDelete = <T,>(props: BoxConfirmDeleteProps<T>) => {
      const { content, subContent, isLoadng, ButtonCancellContent, ButtonConfrimContent, paramsActive, onActive, onClose } = props

      const wrapperRef = useRef<HTMLDivElement>(null)
      const [widthBreakLine, setWidthBreakLine] = useState<{ width: number; marginLeft: number }>({
            width: 0,
            marginLeft: 0,
      })

      useEffect(() => {
            if (wrapperRef.current) {
                  let wrapperRefPx = Number(
                        window.getComputedStyle(wrapperRef.current, null).getPropertyValue('padding-left').replace('px', ''),
                  )
                  console.log({ wrapperRefPx })
                  let width = Number(wrapperRef.current.getBoundingClientRect().width)
                  setWidthBreakLine({ width, marginLeft: wrapperRefPx })
                  console.log({ widthBreakLine })
            }
      }, [widthBreakLine.width, widthBreakLine.marginLeft])

      return (
            <Portal>
                  <div className='fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-[900]'>
                        <div
                              className='relative w-[80%] xl:w-[500px] h-[200px] bg-[#ffffff] rounded-lg flex flex-col gap-[24px] mx-[15px] xl:m-0 p-[14px_10px] xl:px-[24px] xl:py-[20px]'
                              ref={wrapperRef}
                        >
                              <div className='absolute top-[-20px]  right-[-20px] w-[40px] h-[40px]  bg-slate-900 text-white rounded-full flex items-center justify-center'>
                                    <X onClick={() => onClose(false)} />
                              </div>
                              <div className='flex flex-col gap-[8px]'>
                                    <span>{content}</span>
                                    <span>{subContent}</span>
                              </div>
                              <div
                                    style={{ width: widthBreakLine.width, marginLeft: -widthBreakLine.marginLeft }}
                                    className='bg-slate-200 h-[1px] mt-[-10px]'
                              ></div>
                              <div className='flex justify-end gap-[8px] h-[40px] xl:h-[50px]'>
                                    <div className='w-[38%] xl:w-[30%] '>
                                          <BoxButton
                                                content={ButtonCancellContent}
                                                onClick={() => {
                                                      onClose(false)
                                                }}
                                          />
                                    </div>

                                    <div className='w-[38%] xl:w-[30%]'>
                                          <BoxButton
                                                content={ButtonConfrimContent}
                                                onClick={() => {
                                                      onActive(paramsActive)
                                                }}
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </Portal>
      )
}

export default BoxConfirmDelete
