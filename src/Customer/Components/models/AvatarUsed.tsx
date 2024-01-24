import { Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { TAvatar, TResponseApi, TUserAvatarUsed } from '../../../types/axiosResponse'
import { UseQueryResult, useMutation, useQueryClient } from '@tanstack/react-query'
import Account from '../../../apis/account.api'
import { AxiosResponse } from 'axios'
import { ContextToast } from '../../../component/Context/ToastContext'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../../Redux/authenticationSlice'

type TProps = {
    avatar: TAvatar
}

const AvatarUsed = (props: TProps) => {
    const { avatar } = props
    const dispatch = useDispatch()
    const { setContentToast } = useContext(ContextToast)
    const queryClient = useQueryClient()
    const [showLoading, setShowLoading] = useState(false)
    const deleteAvatarUsed = useMutation({
        mutationKey: ['delete-avatar-used'],
        mutationFn: (public_id: string) => Account.deleteAvatarUsed(public_id),
        onSuccess: () => {
            setContentToast((prev) => [...prev, { type: 'SUCCESS', message: 'Đã xóa thành công', id: Math.random().toString() }])
            queryClient.invalidateQueries({ queryKey: ['avatar-used'] })
        },
    })
    const convertDateToString = (date: Date) => {
        console.log({ date })
        date = new Date(date)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const handleDeleteAvatarUsed = (public_id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // e.currentTarget.parentNode?.children[2].children[1].classList.replace('hidden', 'inline-block')
        deleteAvatarUsed.mutate(public_id)
        setShowLoading(true)
    }

    useEffect(() => {
        if (deleteAvatarUsed.isSuccess) {
            dispatch(fetchUser({ user: deleteAvatarUsed.data.data.metadata.user }))
            setShowLoading(false)
        }
    }, [deleteAvatarUsed.isSuccess, dispatch, deleteAvatarUsed.data?.data.metadata.user])
    return (
        <div className='w-[45%] relative'>
            <img src={avatar?.secure_url} loading='lazy' className='w-full min-h-full rounded-tr-md' alt='avatar_used[]' />
            <p className='absolute top-0 right-0 bg-slate-700 text-white min-w-[60px] px-[6px] py-[2px]'>
                {avatar.date_update ? convertDateToString(avatar.date_update) : 'none'}
            </p>
            <div
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleDeleteAvatarUsed(avatar.public_id, e)}
                className=' gap-[8px] absolute bg-white rounded-md bottom-0 right-0 w-[70px] h-[30px] p-[4px] border-[1px] border-slate-700 text-slate-700 hover:bg-red-700 hover:border-red-700 hover:text-white flex justify-center items-center z-[2]'
            >
                <Trash2 className='' />
                {showLoading && (
                    <span
                        className='inline-block  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        role='status'
                    ></span>
                )}
            </div>
        </div>
    )
}

export default AvatarUsed
