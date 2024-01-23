import React, { SetStateAction, createContext, useEffect, useId, useRef, useState } from 'react'
import Portal from '../Portal'
import BoxToast from '../ui/BoxToast'

type TProps = {
      children: React.ReactNode
}

type TToast = {
      type: 'SUCCESS' | 'ERROR' | 'WARNNING'
      message: string
      id: string
}

type TContextToast = {
      showToast: boolean
      setShowToast: React.Dispatch<SetStateAction<boolean>>
      setContentToast: React.Dispatch<React.SetStateAction<TToast[]>>
      contentToast: TToast[]
      // type: 'SUCCESS' | 'ERROR' | 'WARNNING'
      // message: string
}

export const ContextToast = createContext<TContextToast>({
      showToast: false,
      setShowToast: () => {},
      setContentToast: () => {},
      contentToast: [],
      // type: 'SUCCESS',
      // message: '',
})

const ContextToastProvider = ({ children }: TProps) => {
      const [showToast, setShowToast] = useState(false)
      const timer = useRef<NodeJS.Timeout>()
      const [contentToast, setContentToast] = useState<TToast[]>([])
      useEffect(() => {
            if (contentToast.length > 0) {
                  // timer.current = setInterval(() => {
                  //       setContentToast((prev) => prev.slice(1))
                  // }, 5000)
            }
            console.log({ length: contentToast.length })

            return () => clearInterval(timer.current)
      }, [contentToast.length])

      return (
            <ContextToast.Provider value={{ setShowToast, showToast, setContentToast, contentToast }}>
                  <div>
                        <Portal>
                              {contentToast.length > 0 && (
                                    <div className='transition-all min-h-[70px] h-auto duration-500 relative top-0 left-0 bg-transparent '>
                                          <div className='w-[120px] flex flex-col gap-[20px] fixed top-[120px] left-[50%] translate-x-[-50%]'>
                                                {contentToast &&
                                                      contentToast.map((toast, index) => {
                                                            return (
                                                                  <BoxToast
                                                                        key={toast.id}
                                                                        id={toast.id}
                                                                        message={toast.message}
                                                                        timer={3500}
                                                                        type={toast.type}
                                                                  />
                                                            )
                                                      })}
                                          </div>
                                    </div>
                              )}
                        </Portal>
                        {children}
                  </div>
            </ContextToast.Provider>
      )
}

export default ContextToastProvider
