import React from 'react'

type TProps = {
      money: number
      color?: string
}

const BoxMoneyV2 = (props: TProps) => {
      const { money, color = 'text-red-500' } = props

      return (
            <div className={`${color} font-medium w-full h-full flex items-center justify-center`}>
                  <p className='relative w-max'>
                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money).replace('₫', '')}</span>
                        <span className={`${color} absolute top-[-5px] right-[-10px]`}>₫</span>
                  </p>
            </div>
      )
}

export default BoxMoneyV2
