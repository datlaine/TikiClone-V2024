import { Image, NotebookPen } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TFormProduct } from '../RegisterSell'

type TProps = {
    methods?: UseFormReturn<TFormProduct, any, undefined>
    timelineName: string
    error?: boolean
    FieldName?: keyof TFormProduct
    type: 'Text' | 'File'
    FileObject?: {
        verify: boolean
        FileName: string
    }
}

const Timeline = (props: TProps) => {
    const { methods, timelineName, FieldName, FileObject, error, type } = props
    const animation = type === 'Text' ? methods?.watch(FieldName!) : FileObject?.verify

    console.log('re-render')
    return (
        <div
            className={`${
                animation ? 'text-blue-700 min-h-[140px] ' : 'text-slate-700 min-h-[90px]'
            }  h-auto flex flex-col items-center transition-all duration-500 `}
        >
            <div className={`${animation ? ' border-blue-700' : 'border-slate-700 '}   rounded-md px-[8px] py-[4px] flex gap-[8px]`}>
                <span>{timelineName}</span>
            </div>
            <div className={`${animation ? 'border-blue-700' : 'border-slate-700'} w-[12px] h-[12px]  border-[2px] rounded-full`}></div>
            <div
                className={`${
                    animation ? 'bg-blue-600 flex-1 w-[2px] ' : 'bg-slate-700 basis-[25px] w-[2px]'
                }   transition-all duration-1000 relative `}
            >
                {animation ? (
                    <div className='absolute top-[50%] translate-y-[-50%] left-[-30px]'>{animation ? <NotebookPen /> : <Image />}</div>
                ) : (
                    ''
                )}

                {animation ? (
                    <div className='absolute top-[50%] translate-y-[-50%] ml-[8px] '>
                        <p style={{ width: 140, wordWrap: 'break-word' }} className='text-[14px] truncate'>
                            {type === 'Text' && FieldName === 'product_price'
                                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                      Number(methods?.watch('product_price')),
                                  )
                                : (methods?.getValues(FieldName!) as React.ReactNode)}
                        </p>

                        {type === 'File' && (
                            <p className='text-wrap' style={{ width: 100, wordWrap: 'break-word' }}>
                                {FileObject?.FileName}
                            </p>
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={`${animation ? 'border-blue-700' : 'border-slate-700'} w-[12px] h-[12px]  border-[2px] rounded-full`}></div>
        </div>
    )
}

export default Timeline
