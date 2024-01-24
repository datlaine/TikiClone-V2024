import React from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }: { children: React.ReactNode }) => {
    return createPortal(children, document.querySelector('body') as HTMLBodyElement)
}

export default Portal
