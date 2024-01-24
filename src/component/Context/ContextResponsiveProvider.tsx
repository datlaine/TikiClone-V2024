import React, { createContext, useEffect, useState } from 'react'

type TContextResponsiveProvider = {
    withWindow: number
}

export const ContextResponsive = createContext<TContextResponsiveProvider>({ withWindow: 0 })

const ContextResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
    const [withWindow, setWithWindow] = useState(0)

    useEffect(() => {
        const onResize = () => setWithWindow(window.innerWidth)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [setWithWindow])
    return <ContextResponsive.Provider value={{ withWindow }}>{children}</ContextResponsive.Provider>
}

export default ContextResponsiveProvider
