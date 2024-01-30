import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { DateTime } from 'luxon'
import { TRegisterFormBook } from './FormRegisterBook'

type TProps = {
    methods?: UseFormReturn<TRegisterFormBook, any, undefined>
    TimeLineName: string
    error?: boolean
    FieldName?: keyof TRegisterFormBook
    type: 'Text' | 'File' | 'Files' | 'Money'
    File?: {
        CountFile: number
        FileName: string
    }

    Files?: {
        CountFile: number
        FileName: string[]
    }
    isSubmit?: boolean
}

const Timeline = (props: TProps) => {
    const { methods, TimeLineName, FieldName, File, Files, type, isSubmit } = props
    const error = methods?.formState.errors
    const width = FieldName && error![FieldName] ? 'w-[200px]' : 'w-[150px]'
    const widthFile = ((File?.CountFile as number) || (Files?.CountFile as number)) < 1 ? 'w-[250px]' : 'w-[200px]'

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
                    <div
                        className={`${width} flex flex-col gap-[6px] mt-[-5px] transition-all duration-1000 min-w-[150px]`}
                        title={`Tên sản phẩm: ${methods?.watch(FieldName!) as string}`}
                    >
                        <p>{TimeLineName}</p>
                        {FieldName && error![FieldName]?.message && (
                            <span className='text-[12px] text-red-700 w-[240px] truncate'>{error![FieldName]?.message}</span>
                        )}
                        {FieldName && !error![FieldName]?.message && (
                            <span className='text-blue-700 w-[240px] truncate'>{methods?.watch(FieldName!) as React.ReactNode}</span>
                        )}
                    </div>
                )}

                {type === 'Money' && (
                    <div
                        className={`${width} flex flex-col gap-[6px] mt-[-5px] min-w-[150px]`}
                        title={`Giá sản phẩm: ${methods?.watch(FieldName!) as string}`}
                    >
                        <p>{TimeLineName}</p>
                        {FieldName && error![FieldName]?.message && (
                            <span className='text-[12px] text-red-700 w-[240px] truncate'>{error![FieldName]?.message}</span>
                        )}
                        {FieldName && !error![FieldName]?.message && (
                            <span className='text-[12px] text-blue-700 w-[240px] truncate'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                    Number(methods?.watch(FieldName!)),
                                )}
                            </span>
                        )}
                    </div>
                )}

                {type === 'File' && (
                    <div
                        className={`${widthFile} flex flex-col gap-[6px] mt-[-5px] transition-all duration-[3s] min-w-[150px]`}
                        title={`Hình ảnh: ${methods?.watch(FieldName!) as string}`}
                    >
                        <p>{TimeLineName}</p>
                        {isSubmit && File!.CountFile === 0 && (
                            <span className='text-[12px] text-red-700 w-[240px] truncate'>{'Hình đại diện sản phẩm là bắt buộc'}</span>
                        )}
                        {File!.CountFile === 1 && <span className='text-[12px] text-blue-700 w-[240px] truncate'>{File?.FileName}</span>}
                    </div>
                )}
                {/* 
                {type === 'Files' && (
                    <div className={`${widthFile} flex flex-col gap-[6px] mt-[-5px] transition-all duration-[3s] min-w-[150px]`}>
                        <p>
                            {TimeLineName}
                            {File?.CountFile}
                        </p>
                        {isSubmit && File!.CountFile === 0 && (
                            <span className='text-[12px] text-red-700'>{'Hình đại diện sản phẩm là bắt buộc'}</span>
                        )}
                        {File!.CountFile === 1 && <span>{File?.FileName}</span>}
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Timeline
