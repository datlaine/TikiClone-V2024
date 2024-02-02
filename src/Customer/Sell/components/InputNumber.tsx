import React, { useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { ui } from './FormRegisterBook'
import { TFormBook, TFormProduct } from '../types/product.type'

type TProps = {
    FieldName: keyof TFormProduct | keyof TFormBook
    LabelMessage: string
    placehorder: string
    width?: string
    autofocus?: boolean
    require?: boolean
}

const InputNumber = (props: TProps) => {
    const { placehorder, LabelMessage, width, autofocus = false, FieldName } = props
    const formNested = useFormContext()
    const {
        formState: { errors },
    } = formNested
    const id = useId()

    const styleEffect = {
        widthContainer: width ? width : 'w-full',
        gap: ui.gapElementChild || 'gap-[8px]',
        fontSizeError: ui.fontSizeError || 'text-[12px]',
        colorError: ui.colorError || 'text-red-700',
    }

    return (
        <div className={`${styleEffect.widthContainer} ${styleEffect.gap} flex flex-col`}>
            <label htmlFor={id} className='relative flex flex-row items-center max-w-max'>
                <span>{LabelMessage}</span>
            </label>
            <input
                type='number'
                {...formNested.register(FieldName, {
                    setValueAs: (value) => Number(value),
                })}
                placeholder={placehorder}
                id={id}
                autoFocus={autofocus}
                className='border-[1px] border-slate-400 outline-none px-[12px] py-[4px] rounded-[3px]'
            />
            {errors && (
                <span className={`${styleEffect.colorError} ${styleEffect.fontSizeError}`}>
                    {errors[FieldName]?.message as React.ReactNode}
                </span>
            )}
        </div>
    )
}

export default InputNumber
