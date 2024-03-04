import React from 'react'
import Portal from '../Portal'

type TProps = { children: React.ReactNode }

const Box = (props: TProps) => {
      const { children } = props

      return <Portal>{children}</Portal>
}

export default Box
