import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ToastDemo from './ToastDemo'

const BoxContainerToast = () => {
    const toast = useSelector((state: RootState) => state.toast.toast)

    console.log({ toast, random: Math.random() })
    // if (toast.length < 0) return null
    return (
        <>
            {toast.length !== 0 && (
                <div className='fixed flex flex-col gap-[50px]  text-white top-[100px] h-auto overflow-y-hidden max-h-screen right-0 w-[300px] z-[999]'>
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
