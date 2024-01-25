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
                <div className='fixed flex flex-col gap-[50px]  text-white top-[60px] border-none h-screen overflow-y-scroll max-h-[auto] bg-transparent right-[0px] w-[350px] max-w-[360px] z-[12]'>
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
