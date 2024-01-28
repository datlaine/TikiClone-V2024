import { View, X } from 'lucide-react'
import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'
import BoxModal from '../../../component/ui/BoxModal'
import { UploadImages } from '../RegisterSell'
import { useDispatch } from 'react-redux'
import { addToast } from '../../../Redux/toast'
interface IProps {
    labelMessage: string
    width?: string
    multiple?: boolean
    setUrlProductMultipleImage: React.Dispatch<SetStateAction<UploadImages>>
}

const ButtonUploadMultiple = (props: IProps) => {
    const { labelMessage, width, multiple } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const id = useId()
    const dispatch = useDispatch()

    const [fileProduct, setFileProduct] = useState<File[]>([])

    const [filePreview, setFilePreview] = useState<string[]>([])

    const [modalFilePreview, setModalFilePreview] = useState(false)

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        // e.stopPropagation()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filePreview.length > 4 || fileProduct.length > 4 || e.target.files!.length > 4) {
            setFilePreview([])
            setFileProduct([])
            dispatch(addToast({ type: 'WARNNING', message: 'Chỉ upload tối đa 4 files', id: Math.random().toString() }))
            return
        }
        /* khi xét state trong loop, không được dùng setState(prev => [prev, ...index])
            phải tạo 1 biến lưu lại kết quả của loop rồi xét 1 lượt luôn nè
        */
        if (e.target.files && fileProduct.length < 4) {
            alert('Ok')
            setFileProduct((prev) => {
                const countFile = e.target.files?.length as number
                const newArrayFile = [...prev]
                for (let index = 0; index < countFile; index++) {
                    newArrayFile.push(e!.target!.files![index])
                }
                console.log({ newArrayFile })
                console.log({ file: e.target.files })
                return newArrayFile
            })
            const arrayURL = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFilePreview((prev) => prev.concat(arrayURL))
            return
        }
        if (e.target.files && fileProduct.length === 4) {
            setFileProduct(Array.from(e.target.files))
            const arrayURL = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFilePreview((prev) => prev.concat(arrayURL))
        }
    }

    const handleDeleteProductImages = () => {
        //api
        if (inputRef) {
            inputRef!.current!.value = ''
            inputRef.current?.click()
        }
        // console.log({ filePreview })
        filePreview.forEach((removeURL) => URL.revokeObjectURL(removeURL))
        setFilePreview([])
        setFileProduct([])
    }

    useEffect(() => {
        // console.log({ file: fileProduct })
        const formData = new FormData()

        for (let index = 0; index < fileProduct.length; index++) {
            formData.append('file', fileProduct[index])
        }

        // console.log({ formData })

        if (!fileProduct) setFilePreview([])
        return () => {
            filePreview.forEach((file) => URL.revokeObjectURL(file))
        }
    }, [fileProduct, filePreview])

    return (
        <div className={`${width ? width : 'w-full'}  relative min-h-[80px] h-auto flex flex-col gap-[8px]`}>
            <label htmlFor={id}>{labelMessage}</label>
            <input type='file' id={id} hidden ref={inputRef} multiple={multiple} onChange={(e) => handleInputChange(e)} />

            {filePreview && filePreview.length > 0 && <span>Tổng số lượng hình ảnh {filePreview.length} / 4</span>}

            {filePreview.length > 0 && (
                <React.Fragment>
                    <div className={`${filePreview.length > 0 ? 'w-[240px]' : 'w-[80px] min-h-[60px]'}  flex-1 gap-[5]`}>
                        <div className='min-w-full min-h-full flex items-center flex-wrap gap-[10px]'>
                            {filePreview.map((preview) => {
                                return (
                                    <div className='relative w-[45%] flex justify-center items-center' key={preview}>
                                        <span
                                            className='absolute inline-block h-[45px] w-[45px] text-slate-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                            role='status'
                                        ></span>
                                        <img src={preview} key={preview} alt='preview' className='w-full' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-[25px] h-[35px] w-[95px] flex gap-[16px] '>
                        <button
                            disabled={filePreview.length < 0}
                            onClick={(e) => {
                                e.preventDefault()
                                handleDeleteProductImages()
                            }}
                            className='px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                        >
                            Chon lai
                        </button>
                        <div className=' bg-white h-[35px] w-[35px] flex items-center justify-center rounded-full'>
                            <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                        </div>
                    </div>
                </React.Fragment>
            )}
            {filePreview.length < 4 && (
                <button className={`xl:w-[32%] text-white bg-slate-900 rounded-md min-h-[40px]`} onClick={(e) => handleButtonClick(e)}>
                    Upload
                </button>
            )}

            {modalFilePreview && (
                <BoxModal>
                    {/* <div className='w-[150px] h-[150px] bg-green-600'></div> */}

                    <div className='relative top-[50%] translate-y-[-50%] min-w-[600px] w-auto h-[250px] flex flex-wrap mx-[50px] items-center gap-[16px] justify-center'>
                        {filePreview.map((preview) => (
                            <img
                                style={{ width: `calc(97%/${filePreview.length})` }}
                                src={preview}
                                alt='preview'
                                className=' h-full bg-yellow-700'
                            />
                        ))}
                        <div
                            className='absolute top-[-10px] right-[-20px] bg-slate-900 flex items-center justify-center rounded-md'
                            onClick={() => setModalFilePreview(false)}
                        >
                            <X color='white' size={40} />
                        </div>
                    </div>
                </BoxModal>
            )}
        </div>
    )
}

export default ButtonUploadMultiple
