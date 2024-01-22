import React, { SetStateAction, createContext, useEffect, useRef, useState } from 'react'
import Portal from '../Portal'

type TProps = {
      children: React.ReactNode
}

type TContextToast = {
      showToast: boolean
      setShowToast: React.Dispatch<SetStateAction<boolean>>
      setContentToast: React.Dispatch<
            React.SetStateAction<{
                  type: 'SUCCESS' | 'ERROR' | 'WARNNING'
                  message: string
            }>
      >
      // type: 'SUCCESS' | 'ERROR' | 'WARNNING'
      // message: string
}

export const ContextToast = createContext<TContextToast>({
      showToast: false,
      setShowToast: () => {},
      setContentToast: () => {},
      // type: 'SUCCESS',
      // message: '',
})

const ContextToastProvider = ({ children }: TProps) => {
      const [showToast, setShowToast] = useState(false)
      const [contentToast, setContentToast] = useState<{
            type: 'SUCCESS' | 'ERROR' | 'WARNNING'
            message: string
      }>({
            type: 'SUCCESS',
            message: '',
      })
      const toastTimer = useRef<NodeJS.Timeout>()
      useEffect(() => {
            if (showToast) {
                  toastTimer.current = setTimeout(() => {
                        setShowToast(false)
                  }, 3000)
            }

            return () => clearTimeout(toastTimer.current)
      }, [showToast])

      return (
            <ContextToast.Provider value={{ setShowToast, showToast, setContentToast }}>
                  <div>
                        <Portal>
                              {showToast && (
                                    <div className='transition-all duration-500 relative top-0 left-0 bg-transparent '>
                                          <p
                                                className={`${
                                                      contentToast.type === 'SUCCESS'
                                                            ? 'bg-green-700'
                                                            : contentToast.type === 'ERROR'
                                                            ? 'bg-red-700'
                                                            : 'bg-orange-700'
                                                } w-[150px] h-[70px]  text-white flex items-center justify-center fixed top-[120px] left-[50%] translate-x-[-50%]`}
                                          >
                                                {contentToast.message}
                                          </p>
                                    </div>
                              )}
                        </Portal>
                        {children}
                  </div>
            </ContextToast.Provider>
      )
}

export default ContextToastProvider
