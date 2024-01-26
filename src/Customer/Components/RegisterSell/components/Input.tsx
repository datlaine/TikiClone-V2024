import React, { useId } from 'react'
import { useFormContext } from 'react-hook-form'

type TProps = {
    nameInput: string
    message: string
    placehorder: string
    width?: string
    autofocus?: boolean
    require?: boolean
}

const Input = (props: TProps) => {
    const { placehorder, message, width, require, autofocus = false, nameInput } = props
    const id = useId()
    const miniForm = useFormContext()
    return (
        <div className={`${width ? width : 'w-full'} flex flex-col gap-[16px]`}>
            <label htmlFor={id} className='relative flex flex-row items-center max-w-max'>
                <span>{message}</span>
                {require && <span className='block absolute top-[50%] translate-y-[-40%] text-red-500 text-[24px]  right-[-12px]'>*</span>}
            </label>
            <input
                {...miniForm.register(nameInput)}
                type='text'
                defaultValue={miniForm.getValues(nameInput)}
                placeholder={placehorder}
                id={id}
                autoFocus={autofocus}
                className='border-[1px] border-slate-700 outline-none px-[12px] py-[6px] rounded-md'
            />
        </div>
    )
}

export default Input
