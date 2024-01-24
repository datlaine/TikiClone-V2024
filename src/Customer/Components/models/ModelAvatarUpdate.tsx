import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Account from '../../../apis/account.api'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { checkAxiosError } from '../../../utils/handleAxiosError'
import BoxToast from '../../../component/ui/BoxToast'
import { sleep } from '../../../utils/sleep'
import TErrorAxios from '../../../types/axios.response.error'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { fetchUser, isLoading } from '../../../Redux/authenticationSlice'
import { addToast } from '../../../Redux/toast'

//@props
type TProps = {
    setModelAvatarUpdate?: React.Dispatch<SetStateAction<boolean>>
    setModelAvatar?: React.Dispatch<SetStateAction<boolean>>
    modeDispatch: React.Dispatch<TAvatarActions>
}

type TForm = {
    file: any
}

//@component::api
const ModelAvatarUpdate = (props: TProps) => {
    const queryClient = new QueryClient()
    const dispatch = useDispatch()
    //@props
    const { modeDispatch } = props
    const methods = useForm<TForm>({
        defaultValues: { file: null },
    })
    const [toast, setShowToast] = useState(false)
    const user = useSelector((state: RootState) => state.authentication.user)
    const updateAvatarResponse = useMutation({
        mutationKey: ['update-avatar'],
        mutationFn: (data: any) => Account.updateAvatar(data),
        onSuccess: (res: any) => {
            // modeDispatch({ type: 'MODE_AVATAR_UPDATE_SUCCESS', payload: { boxModeAvatar: false, modeAvatarUpdate: false } })
        },
        onError: async (error) => {
            //@[shape] :: error.response.data.error
            if (checkAxiosError<TErrorAxios>(error)) {
                if (
                    error.response?.status === 403 &&
                    error.response?.statusText === 'Forbidden' &&
                    error.response?.data?.detail === 'Login again'
                ) {
                    setShowToast(true)
                    // localStorage.removeItem('user')
                    // localStorage.removeItem('token')
                    await sleep(2000)
                    // window.location.reload()
                }
            }
        },
    })

    const [fileAvatar, setFileAvatar] = useState<File>()
    const [filePreview, setFilePreview] = useState<string | undefined>()

    useEffect(() => {
        if (!fileAvatar) {
            setFilePreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(fileAvatar)
        setFilePreview(objectUrl)
        console.log(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [fileAvatar])

    useEffect(() => {
        if (updateAvatarResponse.isSuccess) {
            dispatch(isLoading(true))
            dispatch(fetchUser({ user: updateAvatarResponse.data.data.metadata.user }))
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_UPDATE', payload: { modeAvatarUpdate: false, boxModeAvatar: false } })
            dispatch(isLoading(false))
            dispatch(addToast({ type: 'SUCCESS', message: 'Cập nhập avtar thành công', id: Math.random().toString() }))
        }
        if (updateAvatarResponse.isSuccess && updateAvatarResponse.data) {
            console.log({ updateAvatarResponse: updateAvatarResponse.data.data.metadata.user })
        }
    }, [updateAvatarResponse.isSuccess, modeDispatch, updateAvatarResponse.data, dispatch])

    //@closeModel
    const modelControllClose = () => {
        setFileAvatar(undefined)

        if (filePreview) URL.revokeObjectURL(filePreview)
        setFilePreview('')
        modeDispatch({ type: 'CLOSE_MODE_AVATAR_UPDATE', payload: { modeAvatarUpdate: false, boxModeAvatar: false } })
    }

    const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filePreview || fileAvatar) {
            setFilePreview(undefined)
            setFileAvatar(undefined)
        }

        console.log(e.target.files)
        if (e.target.files) {
            setFileAvatar(e.target.files[0])
        }
    }

    const onSubmit: SubmitHandler<TForm> = (file) => {
        console.log(file, fileAvatar)
        // console.log('link', URL.createObjectURL(file.file[0].name))
        const formData: any = new FormData()
        formData.append('file', fileAvatar)
        formData.append('user', user)

        console.log('dirty', methods)
        updateAvatarResponse.mutate(formData)
    }

    //@element
    return (
        <div
            className='fixed top-0 left-0 mx-[25px] lg:mx-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                modeDispatch({ type: 'CLOSE_MODE_AVATAR_UPDATE', payload: { modeAvatarUpdate: false, boxModeAvatar: false } })
            }}
        >
            {/* {toast && <BoxToast message={'Phien dang nhap het han, vui long xac thuc lai sau 3s'} children={<p>OK</p>} />} */}

            <div
                className={`w-[650px] ${filePreview ? 'h-[650px]' : 'h-[740px]'} bg-white rounded-2xl p-[40px] relative`}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                <div className='text-[25px] absolute top-[25px] right-[25px]' onClick={modelControllClose}>
                    <X />
                </div>
                <div className='h-[10%] flex items-center mb-[15px]'>Cập nhập ảnh đại diện</div>
                <div className='h-[1px] bg-stone-100'></div>
                <form
                    className='h-[85%]'
                    onSubmit={(e) => {
                        e.stopPropagation()

                        return methods.handleSubmit(onSubmit)(e)
                    }}
                >
                    <div
                        className={`flex ${
                            filePreview ? 'h-[calc(90%-32px)]' : 'justify-center h-[calc(100%-85px)]'
                        } mt-[25px] bg-stone-100 mb-[25px] p-[20px] items-center `}
                    >
                        {filePreview && (
                            <img src={filePreview} width={200} height={300} alt='avatar_update' className='order-1 w-[300px] h-[300px]' />
                        )}
                        <label
                            htmlFor='avatar_update'
                            className={`${
                                filePreview ? 'text-center order-2 w-[50%]' : 'w-full'
                            }  h-full border-[2px] border-dashed border-slate-700 flex justify-center items-center text-blue-500`}
                        >
                            {filePreview ? 'Chọn ảnh khác' : 'Nhấn để chọn hoặc kéo thả hình ảnh vào khung này'}
                        </label>
                        <Controller
                            name='file'
                            control={methods.control}
                            render={({ field }) => (
                                <input
                                    type='file'
                                    id='avatar_update'
                                    onChange={(event) => {
                                        handleUploadAvatar(event)
                                        field.onChange(event)
                                    }}
                                    hidden
                                />
                            )}
                        />
                    </div>

                    {filePreview && (
                        <div className='w-full min-w-[100px] flex gap-[2%]'>
                            <button className='w-[49%] px-[12px] py-[6px] bg-stone-200 text-blue-500' onClick={modelControllClose}>
                                Hủy bỏ
                            </button>
                            <button
                                type='submit'
                                className='w-[49%] px-[12px] py-[6px] bg-blue-500 text-white flex justify-center gap-[8px] items-center'
                            >
                                <span>Lưu thay đổi</span>
                                {updateAvatarResponse.isPending && (
                                    <span
                                        className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                                        role='status'
                                    ></span>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ModelAvatarUpdate
