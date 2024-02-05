import React, { useEffect, useReducer, useRef } from 'react'
import { customerAccountReducer, initialValue } from '../../../reducer/customer.reducer'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { Eye, Image, Pencil, Trash2 } from 'lucide-react'
import Portal from '../../../component/Portal'
import ModelAvatarSee from '../models/ModelAvatarSee'
import ModelAvatarUpdate from '../models/ModelAvatarUpdate'
import ModelAvatarDelete from '../models/ModelAvatarDelete'

const BoxAvatarMode = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [state, modeDispatch] = useReducer(customerAccountReducer, initialValue)
    const refModelAvatar = useRef<HTMLDivElement>(null)
    useEffect(() => {
        // count.current = count.current += 1
        const handleEvent = (e: MouseEvent) => {
            // khong click vao thi chay dong script nay
            if (!refModelAvatar.current?.contains(e.target as Node)) {
                // console.log('click point', e.target, modelAvatar)
                if (refModelAvatar.current) {
                    // console.log(1)
                    modeDispatch({ type: 'CLOSE_BOX_AVATAR', payload: { boxModeAvatar: false } })

                    // setModelAvatar((prev) => !prev)
                }
            }
        }
        document.addEventListener('click', handleEvent)

        return () => document.removeEventListener('click', handleEvent)
    }, [])

    const handleControllmodelAvatarSee = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        modeDispatch({ type: 'OPEN_MODE_AVATAR_SEE', payload: { modeAvatarSee: true } })
    }

    const handleControllmodelAvatarUpdate = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        modeDispatch({ type: 'OPEN_MODE_AVATAR_UPDATE', payload: { modeAvatarUpdate: true } })
    }

    const handleControllmodelAvatarDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        modeDispatch({ type: 'OPEN_MODE_AVATAR_DELETE', payload: { modeAvatarDelete: true } })
    }
    return (
        <div
            className=' flex  items-center justify-center h-[180px] w-full xl:h-[120px] xl:w-[120px] rounded-full mb-[15px]'
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation()
                modeDispatch({ type: 'OPEN_BOX_AVATAR', payload: { boxModeAvatar: true } })
            }}
        >
            <div className='relative'>
                <img
                    src={user.avatar?.secure_url || user.avartar_url_default || ''}
                    alt='user_avatar'
                    className='w-[180px] h-[180px] xl:w-[120px]  xl:h-[120px] rounded-full border-[4px] border-cyan-200'
                />

                <div className='absolute bottom-[10px] right-[4px] w-[20px] h-[20px] bg-slate-500 rounded-full flex items-center justify-center'>
                    <Pencil className=' text-white' size={12} />
                </div>
            </div>

            {/* @box avatar action*/}
            {state.boxModeAvatar && (
                <>
                    <div
                        className='absolute z-[10] top-[100%]  shadow-2xl shadow-blue-700 bg-white rounded-md w-[250px] h-[150px] max-h-auto '
                        ref={refModelAvatar}
                    >
                        <div className='relative z-[500]'>
                            <span className='clip-path-modelAvatar absolute w-[20px] h-[13.5px] border-[1px] border-stone-300 border-b-0  bg-white top-[-13px] left-[50%] translate-x-[-50%]'></span>
                            {/* @ list avatar action*/}
                            <ul className='h-full'>
                                {/* @ modeAvater::see */}
                                <li
                                    className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100 gap-[8px]'
                                    onClick={handleControllmodelAvatarSee}
                                >
                                    {/* <img src='' alt='' /> */}
                                    <Image />
                                    <span>Xem ảnh đại diện</span>
                                </li>

                                {/* @ modeAvatar::update */}
                                <li
                                    className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100 gap-[8px]'
                                    onClick={handleControllmodelAvatarUpdate}
                                >
                                    <Eye />
                                    <span>Cập nhập ảnh đại diện</span>
                                </li>
                                {/* @ modeAvater::delete*/}
                                <li
                                    className='flex items-center w-full h-[50px] px-[20px] hover:bg-sky-100 gap-[8px]'
                                    onClick={handleControllmodelAvatarDelete}
                                >
                                    <Trash2 />
                                    <span>Xóa ảnh đại diện</span>
                                </li>
                            </ul>
                        </div>
                        {/* @model */}
                        {/* @model::boxAvatar->see */}
                        {state.modeAvatarSee && (
                            <Portal>
                                <ModelAvatarSee modeDispatch={modeDispatch} />
                            </Portal>
                        )}
                        {/* @model::boxAvatar->update */}
                        {state.modeAvatarUpdate && (
                            <Portal>
                                <ModelAvatarUpdate modeDispatch={modeDispatch} />
                            </Portal>
                        )}
                        {/* @model::boxAvatar->delete */}
                        {state.modeAvatarDelete && (
                            <Portal>
                                <ModelAvatarDelete modeDispatch={modeDispatch} />
                            </Portal>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default BoxAvatarMode
