import { Image, NotebookPen } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TFormProduct } from '../RegisterSell'
import { DateTime } from 'luxon'

type TProps = {
    methods?: UseFormReturn<TFormProduct, any, undefined>
    TimeLineName: string
    error?: boolean
    FieldName?: keyof TFormProduct
    type: 'Text' | 'File' | 'Files'
    File?: {
        FileNumber: number
        FileName: string
    }

    Files?: {
        FileNumber: number
        FileName: string[]
    }
    FormStateSubmit?: boolean
}

const Timeline = (props: TProps) => {
    const { methods, TimeLineName, FieldName, File, type, FormStateSubmit } = props
    const error = methods?.formState.errors
    const width = FieldName && error![FieldName] ? 'w-[200px]' : 'w-[150px]'
    const widthFile = (File?.FileNumber as number) < 1 ? 'w-[250px]' : 'w-[200px]'

    return (
        <div className=' h-[65px] flex'>
            <div className='flex gap-[12px] items-start'>
                <div className='relative w-[16px] h-[16px] border-[4px] border-blue-700 rounded-full'>
                    <div className='absolute top-[100%] left-[50%] translate-x-[-50%] h-[45px] bg-blue-700 w-[2px] flex items-center'>
                        <p className='translate-x-[-120%] text-[12px]'>
                            {DateTime.now().setZone('Asia/Ho_Chi_Minh').toLocaleString(DateTime.TIME_24_SIMPLE)}
                        </p>
                    </div>
                </div>
                {type === 'Text' && (
                    <div className={`${width} flex flex-col gap-[6px] mt-[-5px] transition-all duration-1000 min-w-[150px]`}>
                        <p>{TimeLineName}</p>
                        {FieldName && error![FieldName]?.message && (
                            <span className='text-[12px] text-red-700'>{error![FieldName]?.message}</span>
                        )}
                        {FieldName && !error![FieldName]?.message && (
                            <span className='text-blue-700'>{methods?.watch(FieldName!) as React.ReactNode}</span>
                        )}
                    </div>
                )}

                {type === 'File' && (
                    <div className={`${widthFile} flex flex-col gap-[6px] mt-[-5px] transition-all duration-[3s] min-w-[150px]`}>
                        <p>
                            {TimeLineName}
                            {File?.FileNumber}
                        </p>
                        {FormStateSubmit && File!.FileNumber === 0 && (
                            <span className='text-[12px] text-red-700'>{'Hình đại diện sản phẩm là bắt buộc'}</span>
                        )}
                        {File!.FileNumber === 1 && <span>{File?.FileName}</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Timeline
