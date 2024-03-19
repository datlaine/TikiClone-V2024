import React from 'react'

type TProps = {
      icon: React.ReactNode
      width?: number
      height?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const BoxButtonCircle = (props: TProps) => {
      const { icon, height, width, ...attribute } = props

      return (
            <button
                  {...attribute}
                  style={{ width: width, height: height }}
                  className={`${attribute.className} flex items-center justify-center bg-[#ffffff]  rounded-full shadow-3xl disabled:cursor-not-allowed`}
            >
                  {icon}
            </button>
      )
}

export default BoxButtonCircle
