import React, { useEffect, useRef, useState } from 'react'
import { ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react'
type TProps = {
      message: string
      type: 'SUCCESS' | 'ERROR' | 'WARNNING'
      timer: number
      id: string
}

const BoxToast = (props: TProps) => {
      const toastTimer = useRef<NodeJS.Timeout>()
      const timer = useRef<NodeJS.Timeout>()
      const [show, setShow] = useState(true)
      const [time, setTime] = useState(props.timer / 1000 || 1000)

      const handleControllCloseToast = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            e.stopPropagation()
            setShow(false)
      }

      useEffect(() => {
            toastTimer.current = setTimeout(() => {
                  setShow(false)
            }, props.timer)

            timer.current = setInterval(() => {
                  setTime((prev) => (prev -= 1))
            }, 1000)

            return () => {
                  clearTimeout(toastTimer.current)
                  clearInterval(timer.current)
            }
      }, [])

      return (
            <>
                  {show && (
                        <p
                              className={`${
                                    props.type === 'SUCCESS'
                                          ? ' text-green-900 '
                                          : props.type === 'ERROR'
                                          ? ' text-red-900 '
                                          : '  text-orange-900'
                              } 
bg-[#ffffff]  py-[24px] border-y-0 border-r-0 border-l-[4px] shadow-2xl relative w-[450px] min-h-[120px] h-auto rounded-lg transition-all duration-500  border-[2px] flex items-center justify-center`}
                        >
                              <span
                                    style={{ width: `${248.5 / Math.ceil(time)}px` }}
                                    className={`${
                                          props.type === 'SUCCESS'
                                                ? ' bg-green-500  text-green-900 '
                                                : props.type === 'ERROR'
                                                ? ' bg-red-500 text-red-900 '
                                                : ' bg-orange-500 text-orange-900'
                                    }  absolute top-[0px] left-0  rounded-lg h-[3px] transition-all duration-300`}
                              ></span>

                              <span
                                    style={{ width: `${248.5 / Math.ceil(time)}px` }}
                                    className={`${
                                          props.type === 'SUCCESS'
                                                ? ' bg-green-500  text-green-900 '
                                                : props.type === 'ERROR'
                                                ? ' bg-red-500 text-red-900 '
                                                : ' bg-orange-500 text-orange-900'
                                    }  absolute bottom-[0px] left-0  rounded-lg h-[3px] transition-all duration-300`}
                              ></span>

                              <div className='w-full flex gap-[8px] px-[16px] items-center'>
                                    <span>
                                          {props.type === 'SUCCESS' ? (
                                                <ShieldCheck size={32} />
                                          ) : props.type === 'ERROR' ? (
                                                <ShieldX size={32} />
                                          ) : (
                                                <ShieldAlert size={32} />
                                          )}
                                    </span>
                                    <div className='flex flex-col gap-[8px]'>
                                          <span className='uppercase'>{props.type}</span>
                                          <span className='mb-[12px]'>{props.message}</span>
                                    </div>
                              </div>
                              <span
                                    className={`${
                                          props.type === 'SUCCESS'
                                                ? 'border-green-500'
                                                : props.type === 'ERROR'
                                                ? 'border-red-500'
                                                : 'border-orange-500'
                                    } absolute flex justify-center items-center bottom-[5px] animate-pulse right-[5px] w-[30px] h-[30px] p-[4px] text-[12px] rounded-full border-[2px] `}
                              >
                                    {time}
                              </span>
                              <span
                                    onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleControllCloseToast(e)}
                                    className={`absolute flex justify-center items-center top-[5px] animate-pulse right-[5px] w-[30px] h-[30px] p-[4px] text-[12px]  `}
                              >
                                    <X
                                          color={`${
                                                props.type === 'SUCCESS'
                                                      ? 'rgb(34 197 94)'
                                                      : props.type === 'ERROR'
                                                      ? ' rgb(239 68 68)'
                                                      : 'rgb(249 115 22)'
                                          }`}
                                    />
                              </span>

                              <span
                                    className={`absolute flex justify-center  bottom-[5px] animate-pulse left-[50px] p-[4px] text-[12px]  `}
                              >
                                    @datlai304
                              </span>
                        </p>
                  )}
            </>
      )
}

export default BoxToast
