import React, { useEffect, useRef, useState } from 'react'
import { TToast } from '../Context/ToastContext'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast } from '../../Redux/toast'
import { RootState, store } from '../../store'
import { ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react'
import { Root } from 'postcss'

type TProps = {
    toast: TToast
}

const ToastDemo = (props: TProps) => {
    const { toast } = props
    const dispatch = useDispatch()
    const timerToast = useSelector((state: RootState) => state.toast.timerToast)
    const timeOut = useRef<NodeJS.Timeout>()
    const [show, setShow] = useState(true)
    const [time, setTime] = useState(timerToast)
    const timeInterval = useRef<NodeJS.Timeout>()

    const handleControllCloseToast = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
        e.stopPropagation()
        dispatch(removeToast({ id }))
    }

    useEffect(() => {
        timeOut.current = setTimeout(() => {
            console.log({ id: toast.id })
            dispatch(removeToast({ id: toast.id }))
            setShow(false)
        }, timerToast * 1000)

        // if (time === 0) {
        // }

        timeInterval.current = setInterval(() => {
            setTime((prev) => (prev -= 1))
        }, 1000)

        return () => {
            clearTimeout(timeOut.current)
            clearInterval(timeInterval.current)
        }
    }, [])

    return (
        <>
            {show && (
                <p
                    className={`${
                        toast.type === 'SUCCESS' ? ' text-green-900 ' : toast.type === 'ERROR' ? ' text-red-900 ' : '  text-orange-900'
                    } 
bg-[#ffffff]  py-[12px] border-y-[2px] border-r-0 border-l-[4px] shadow-2xl relative w-[300px] min-h-[20px] h-auto rounded-lg transition-all duration-500  border-[2px] flex items-center justify-center`}
                >
                    <span
                        style={{ width: `${295 / Math.ceil(time)}px` }}
                        className={`${
                            toast.type === 'SUCCESS'
                                ? ' bg-green-500  text-green-900 '
                                : toast.type === 'ERROR'
                                ? ' bg-red-500 text-red-900 '
                                : ' bg-orange-500 text-orange-900'
                        }  absolute top-[0px] left-0  rounded-lg h-[3px] transition-all duration-300`}
                    ></span>

                    <span
                        style={{ width: `${295 / Math.ceil(time)}px` }}
                        className={`${
                            toast.type === 'SUCCESS'
                                ? ' bg-green-500  text-green-900 '
                                : toast.type === 'ERROR'
                                ? ' bg-red-500 text-red-900 '
                                : ' bg-orange-500 text-orange-900'
                        }  absolute bottom-[0px] left-0  rounded-lg h-[3px] transition-all duration-300`}
                    ></span>

                    <div className='w-full flex gap-[8px] px-[16px] items-center'>
                        <span>
                            {toast.type === 'SUCCESS' ? (
                                <ShieldCheck size={32} />
                            ) : toast.type === 'ERROR' ? (
                                <ShieldX size={32} />
                            ) : (
                                <ShieldAlert size={32} />
                            )}
                        </span>
                        <div className='flex flex-col gap-[8px]'>
                            <span className='uppercase'>{toast.type}</span>
                            <span className='mb-[12px]'>{toast.message}</span>
                        </div>
                    </div>
                    <span
                        className={`${
                            toast.type === 'SUCCESS' ? 'border-green-500' : toast.type === 'ERROR' ? 'border-red-500' : 'border-orange-500'
                        } absolute flex justify-center items-center bottom-[5px] animate-pulse right-[5px] w-[30px] h-[30px] p-[4px] text-[12px] rounded-full border-[2px] `}
                    >
                        {time}
                    </span>
                    <span
                        onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleControllCloseToast(e, toast.id)}
                        className={`absolute flex justify-center items-center top-[5px] animate-pulse right-[5px] w-[30px] h-[30px] p-[4px] text-[12px]  `}
                    >
                        <X
                            color={`${
                                toast.type === 'SUCCESS' ? 'rgb(34 197 94)' : toast.type === 'ERROR' ? ' rgb(239 68 68)' : 'rgb(249 115 22)'
                            }`}
                        />
                    </span>
                </p>
            )}
        </>
    )
}

export default ToastDemo
