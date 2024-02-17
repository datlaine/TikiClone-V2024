import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ToastDemo from './ToastDemo'

const BoxContainerToast = () => {
      const toast = useSelector((state: RootState) => state.toast.toast)

      // if (toast.length < 0) return null
      return (
            <>
                  {toast.length !== 0 && (
                        <div className='hideScrollBar fixed flex flex-col gap-[60px]  text-white top-[100px] xl:top-[60px] border-none  overflow-y-scroll min-h-[500px] max-h-max bg-transparent py-[12px] right-[8px] w-[350px] max-w-[360px] z-[12]'>
                              {toast.map((t) => (
                                    <React.Fragment key={t.id}>
                                          {/* <span>{t.id}</span> */}
                                          <ToastDemo toast={t} />
                                    </React.Fragment>
                              ))}
                        </div>
                  )}
            </>
      )
}

export default BoxContainerToast
