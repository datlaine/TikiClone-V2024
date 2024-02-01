import React, { memo, useId } from 'react'
import { FieldValues, RegisterOptions, UseFormReturn, useFormContext } from 'react-hook-form'
import { TFormBook } from '../ProductType/Book'
import { TRegisterFormBook, ui } from './FormRegisterBook'

type TProps = {
    methods?: UseFormReturn<TRegisterFormBook, any, undefined> | UseFormReturn<TFormBook, any, undefined>
    FieldName: keyof TRegisterFormBook | keyof TFormBook
    LabelMessage: string
    placehorder: string
    width?: string
    autofocus?: boolean
    require?: boolean
    validate?: RegisterOptions<FieldValues, keyof TRegisterFormBook> | undefined
}

const InputText = (props: TProps) => {
    const { placehorder, LabelMessage, width, require, autofocus = false, FieldName } = props
    const id = useId()

    const formNested = useFormContext()
    const {
        formState: { errors },
    } = formNested

    const styleEffect = {
        widthContainer: width ? width : 'w-full',
        gap: ui.gapElementChild || 'gap-[8px]',
        fontSizeError: ui.fontSizeError || 'text-[12px]',
        colorError: ui.colorError || 'text-red-700',
    }

    return (
        <div className={`${styleEffect.widthContainer} ${styleEffect.gap} flex flex-col `}>
            <label htmlFor={id} className='relative flex flex-row items-center max-w-max'>
                <span>{LabelMessage}</span>
                {/* {require && <span className='block absolute top-[50%] translate-y-[-40%] text-red-500 text-[24px]  right-[-12px]'>*</span>} */}
            </label>
            <input
                {...formNested.register(FieldName)}
                type='text'
                placeholder={placehorder}
                id={id}
                autoFocus={autofocus}
                className='border-[1px] border-slate-400 outline-none px-[12px] py-[4px] rounded-[3px]'
            />
            {errors[FieldName] && (
                <span className={`${styleEffect.fontSizeError} ${styleEffect.colorError}`}>
                    {errors[FieldName]?.message as React.ReactNode}
                </span>
            )}
        </div>
    )
}

export default memo(InputText)
