import React, { useEffect, useId, useRef, useState } from 'react'
interface IProps {
    labelMessage: string
    width?: string
    multiple?: boolean
}

const ButtonUploadMultiple = (props: IProps) => {
    const { labelMessage, width, multiple, ...attr } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const id = useId()

    const [fileProduct, setFileProduct] = useState<File[]>([])

    const [filePreview, setFilePreview] = useState<string[]>([])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // e.preventDefault()
        e.stopPropagation()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filePreview || fileProduct) {
            setFilePreview([])
            setFileProduct([])
        }
        /* khi xét state trong loop, không được dùng setState(prev => [prev, ...index])
            phải tạo 1 biến lưu lại kết quả của loop rồi xét 1 lượt luôn nè
        */
        if (e.target.files) {
            setFileProduct(Array.from(e.target.files))
            const arrayURL = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFilePreview((prev) => prev.concat(arrayURL))
        }
    }

    useEffect(() => {
        if (!fileProduct) setFilePreview([])
        return () => {
            filePreview.forEach((file) => URL.revokeObjectURL(file))
        }
    }, [fileProduct, filePreview])

    return (
        <div className={`${width ? width : 'w-full'} min-h-[60px] h-auto flex flex-col gap-[5]`}>
            <label htmlFor={id}>{labelMessage}</label>
            <input type='file' id={id} hidden ref={inputRef} multiple={multiple} onChange={(e) => handleInputChange(e)} />
            <button className={` h-full text-white bg-slate-900 rounded-md`} onClick={(e) => handleButtonClick(e)}>
                Upload
            </button>

            {filePreview && (
                <div className='flex gap-[5]'>
                    {filePreview.map((preview) => {
                        return <img src={preview} key={preview} width={150} height={150} alt='preview' />
                    })}
                </div>
            )}
        </div>
    )
}

export default ButtonUploadMultiple
