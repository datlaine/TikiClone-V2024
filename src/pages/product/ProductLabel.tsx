import { Check } from 'lucide-react'
import React from 'react'

type TProps = {
      content: string
}

const ProductLabel = (props: TProps) => {
      const { content } = props

      return (
            <p className='flex bg-blue-100 rounded-xl w-max text-[10px] px-[4px] items-center gap-[4px]'>
                  <span className='bg-blue-700 w-[12px] h-[12px] rounded-full flex items-center justify-center'>
                        <Check color='white' size={12} />
                  </span>
                  <span className='uppercase text-blue-900 font-black'>{content}</span>
            </p>
      )
}

export default ProductLabel
