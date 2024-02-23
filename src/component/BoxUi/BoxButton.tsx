import { useRef } from 'react'

type Props = {
      content: string
      width?: string
      height?: string
      rounded?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const BoxButton = (props: Props) => {
      const { content, height, rounded, width, ...propButton } = props

      const styleEffect = {
            widthEfect: width ? width : 'w-full',
            heightEfect: height ? height : 'h-full',
            roundedEffect: rounded ? rounded : 'rounded-lg',
      }

      return (
            <button
                  {...propButton}
                  className={`${styleEffect.widthEfect} ${styleEffect.heightEfect} ${styleEffect.roundedEffect} flex items-center justify-center bg-slate-700 text-white p-[8px_6px] xl:px-[12px] xl:py-[8px] `}
            >
                  {content}
            </button>
      )
}

export default BoxButton
