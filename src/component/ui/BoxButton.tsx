import { useRef } from 'react'

type Props = {
    content: string
    width?: string
    height?: string
    rounded?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const BoxButton = (props: Props) => {
    const { content, height, rounded, width } = props

    const styleEffect = {
        widthEfect: width ? width : 'w-full',
        heightEfect: height ? height : 'h-full',
        roundedEffect: rounded ? rounded : 'rounded-lg',
    }

    return (
        <button
            className={`${styleEffect.widthEfect} ${styleEffect.heightEfect} ${styleEffect.roundedEffect} flex items-center justify-center bg-slate-700 text-white px-[16px] py-[12px] `}
        >
            {content}
        </button>
    )
}

export default BoxButton
