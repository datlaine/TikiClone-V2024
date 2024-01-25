import React, { useEffect, useRef, useState } from 'react'
import { TToast } from '../Context/ToastContext'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast } from '../../Redux/toast'
import { RootState, store } from '../../store'
import { ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react'
import { DateTime } from 'luxon'
import { localDateTime } from '../../constant/local'
import jwt, { jwtDecode } from 'jwt-decode'
type TProps = {
    toast: TToast
}

const ToastDemo = (props: TProps) => {
    const { toast } = props
    const dispatch = useDispatch()
    const timerToast = useSelector((state: RootState) => state.toast.timerToast)
    const timeOut = useRef<NodeJS.Timeout>()
    const timeInterval = useRef<NodeJS.Timeout>()
    const now = new Date()
    const token = JSON.parse(localStorage.getItem('token') as string)
    console.log(jwtDecode(token))
    const [show, setShow] = useState(true)
    const [time, setTime] = useState(timerToast)
    const [showDetail, setShowDetail] = useState(false)

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

        timeInterval.current = setInterval(() => {
            setTime((prev) => (prev -= 1))
            console.log('time interval')
        }, 1000)

        return () => {
            clearTimeout(timeOut.current)
            clearInterval(timeInterval.current)
        }
    }, [])

    const handleOnMouseEnter = () => {
        clearInterval(timeInterval.current)
        clearTimeout(timeOut.current)
        setShowDetail(true)
    }

    const handleOnMouseLeave = () => {
        timeOut.current = setTimeout(() => {
            console.log({ id: toast.id })
            dispatch(removeToast({ id: toast.id }))
            setShow(false)
        }, time * 1000)

        timeInterval.current = setInterval(() => {
            setTime((prev) => (prev -= 1))
            console.log('time interval')
        }, 1000)
        setShowDetail(false)
    }
    return (
        <>
            {show && (
                <p
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    className={`${
                        toast.type === 'SUCCESS' ? ' text-green-900 ' : toast.type === 'ERROR' ? ' text-red-900 ' : '  text-orange-900'
                    } 
bg-[#ffffff] border-y-[1px] border-green-400 py-[16px] px-[12px] shadow-xl relative min-w-[280px] w-full  min-[25px]  h-[90px] hover:h-[650px] hover:max-h-[auto] rounded-lg transition-all duration-700  flex items-center justify-center`}
                >
                    <span className='absolute top-[25px] right-[25px]'>
                        {DateTime.now().setZone(localDateTime).toLocaleString(DateTime.TIME_24_SIMPLE)}
                    </span>
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
                        }  absolute bottom-[0px] left-0  rounded-lg h-[3px] transition-all duration-1000`}
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
                            {showDetail && (
                                <span>
                                    <pre>{'['}</pre>
                                    <pre>{' {'}</pre>
                                    <pre>{'     Sản phẩm: Sách'}</pre>
                                    <pre>{'     Giá: 10000vnđ'}</pre>
                                    <pre>{'     Nhà xuất bản: Nhi Đồng'}</pre>
                                    <pre>{' }'}</pre>
                                    <pre>{']'}</pre>

                                    <pre>{'['}</pre>
                                    <pre>{' {'}</pre>
                                    <pre>{'     Sản phẩm: Sách'}</pre>
                                    <pre>{'     Giá: 10000vnđ'}</pre>
                                    <pre>{'     Nhà xuất bản: Nhi Đồng'}</pre>
                                    <pre>{' }'}</pre>
                                    <pre>{']'}</pre>

                                    <pre>{'['}</pre>
                                    <pre>{' {'}</pre>
                                    <pre>{'     Sản phẩm: Sách'}</pre>
                                    <pre>{'     Giá: 10000vnđ'}</pre>
                                    <pre>{'     Nhà xuất bản: Nhi Đồng'}</pre>
                                    <pre>{' }'}</pre>
                                    <pre>{']'}</pre>
                                </span>
                            )}
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
