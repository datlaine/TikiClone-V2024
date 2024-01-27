import { NotebookPen } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TFormProduct } from '../RegisterSell'

type TProps = {
    methods: UseFormReturn<TFormProduct, any, undefined>
    timelineName: string
    form_name_item: keyof TFormProduct
}

const Timeline = (props: TProps) => {
    const { methods, timelineName, form_name_item } = props
    return (
        <div
            className={`${
                methods.watch(form_name_item) ? 'text-blue-700 h-[40%] ' : 'text-slate-700 h-[80px]'
            }  flex flex-col items-center transition-all duration-500`}
        >
            <div
                className={`${
                    methods.watch(form_name_item) ? ' border-blue-700' : 'border-slate-700 '
                }   rounded-md px-[8px] py-[4px] flex gap-[8px]`}
            >
                <span>{timelineName}</span>
            </div>
            <div
                className={`${
                    methods.watch(form_name_item) ? 'border-blue-700' : 'border-slate-700'
                } w-[12px] h-[12px]  border-[2px] rounded-full`}
            ></div>
            <div
                className={`${
                    methods.watch(form_name_item) ? 'bg-blue-600 flex-1 w-[2px] ' : 'bg-slate-700 basis-[25px] w-[2px]'
                }   transition-all duration-1000 relative `}
            >
                {methods.watch(form_name_item) ? (
                    <div className='absolute top-[50%] translate-x-[-50%] left-[-20px]'>
                        <NotebookPen />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div
                className={`${
                    methods.watch(form_name_item) ? 'border-blue-700' : 'border-slate-700'
                } w-[12px] h-[12px]  border-[2px] rounded-full`}
            ></div>
        </div>
    )
}

export default Timeline
