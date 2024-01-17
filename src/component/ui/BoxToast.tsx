import React, { useEffect, useRef, useState } from 'react'

//@type props
type TProps = {
      message: string
      children: React.ReactNode
}

//@component
const BoxToast = (props: TProps) => {
      //@state
      const { children, message } = props
      const timeoutShowToast = useRef<NodeJS.Timeout | null>()
      const [show, setShow] = useState(true)

      //@controll show hide toast
      useEffect(() => {
            timeoutShowToast.current = setTimeout(() => {
                  setShow(false)
            }, 3000)

            if (!show) {
                  clearTimeout(timeoutShowToast.current as NodeJS.Timeout)
            }

            return () => clearTimeout(timeoutShowToast.current as NodeJS.Timeout)
      }, [show])

      //@hide toast
      if (!show) return null

      //@element
      return (
            <div
                  className={`animate-[toastAnimation] transition-all  duration-1000 fixed  top-[60px] left-[50%] translate-x-[-50%] h-auto w-auto min-w-[250px]  min-h-[150px] bg-blue-300 shadow-xl rounded-lg flex flex-col gap-[15px] p-[15px] justify-between`}
            >
                  <span className=''>{message}</span>
                  <div className='flex-1'>{children}</div>
            </div>
      )
}

export default BoxToast
