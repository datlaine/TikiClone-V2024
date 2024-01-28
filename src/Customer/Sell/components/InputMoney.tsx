import React, { useId } from 'react'
import { UseFormReturn, useFormContext } from 'react-hook-form'
import { TFormProduct } from '../RegisterSell'

type TProps = {
    methods: UseFormReturn<TFormProduct, any, undefined>
    FieldName: keyof TFormProduct
    LabelMessage: string
    placehorder: string
    width?: string
    autofocus?: boolean
    require?: boolean
}

const InputMoney = (props: TProps) => {
    const { placehorder, LabelMessage, width, require, autofocus = false, FieldName, methods } = props
    const formNested = useFormContext()
    const {
        formState: { errors },
    } = formNested
    const id = useId()
    return (
        <div className={`${width ? width : 'w-full'} flex flex-col gap-[8px]`}>
            <label htmlFor={id} className='relative flex flex-row items-center max-w-max'>
                <span>{LabelMessage}</span>
                {require && <span className='block absolute top-[50%] translate-y-[-40%] text-red-500 text-[24px]  right-[-12px]'>*</span>}
            </label>
            <input
                type='number'
                {...methods.register(FieldName, {
                    setValueAs: (value) => Number(value),
                })}
                placeholder={placehorder}
                id={id}
                autoFocus={autofocus}
                className='border-[1px] border-slate-400 outline-none px-[12px] py-[4px] rounded-[3px]'
            />
            {errors && <span className='text-red-700'>{errors[FieldName]?.message as React.ReactNode}</span>}
        </div>
    )
}

export default InputMoney
