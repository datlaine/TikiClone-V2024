import React from 'react'

type Props = {
    content: string | number | JSX.Element | React.ReactNode
    ClassName?: string
}

const BoxCenter = (props: Props) => {
    return <div className={`flex items-center justify-center    ${props.ClassName ? props.ClassName : ''} `}>{props.content}</div>
}

export default BoxCenter
