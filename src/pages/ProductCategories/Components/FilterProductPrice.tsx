import { ArrowRight } from 'lucide-react'
import React, { SetStateAction, useState } from 'react'
import { MAX_PRICE } from '../../../component/BoxUi/BoxFilterProduct'
import { on } from 'events'

type PriceFilter = 'MAX_40' | 'MAX_120' | 'MAX_180' | 'MIN_180'

type TProps = {
      setPrice: React.Dispatch<SetStateAction<{ minPrice: number; maxPrice: number; onVote: number }>>
}

const FilterProductPrice = (props: TProps) => {
      const { setPrice } = props

      const [active, setActive] = useState<number>(0)

      const onValueChange = (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            e.preventDefault()
            if (index === 1) {
                  setActive(1)
                  setPrice((prev) => ({ ...prev, minPrice: 1, maxPrice: 40000 }))
                  return
            }

            if (index === 2) {
                  setActive(2)
                  setPrice((prev) => ({ ...prev, minPrice: 40000, maxPrice: 120000 }))
                  return
            }

            if (index === 1) {
                  setActive(3)
                  setPrice((prev) => ({ ...prev, minPrice: 120000, maxPrice: 180000 }))
                  return
            }

            if (index === 1) {
                  setActive(4)
                  setPrice((prev) => ({ ...prev, minPrice: 180000, maxPrice: MAX_PRICE }))
                  return
            }
      }

      const styleEffect = {
            onActive: (state: boolean) => {
                  if (state) return 'border-[1px] border-blue-700 hover:bg-blue-300'
                  return 'border-[1px] border-gray-200 bg-[#ffffff] hover:bg-[#cccccc]'
            },
      }

      return (
            <div className='w-full h-max flex flex-col gap-[16px] text-[14px]'>
                  <h5 className='w-full text-[18px] text-slate-800'>Giá</h5>
                  <div className='w-full flex flex-wrap gap-[20px]'>
                        <button
                              className={`${styleEffect.onActive(active === 1)} min-w-[120px] h-[40px] rounded-[999px] `}
                              onClick={(e) => {
                                    onValueChange(1)
                              }}
                        >
                              Dưới 40.0000
                        </button>

                        <button
                              className={`${styleEffect.onActive(
                                    active === 2,
                              )} min-w-[120px] h-[40px] rounded-[999px]  flex gap-[4px] w-max items-center justify-center px-[8px] `}
                              onClick={(e) => onValueChange(2)}
                        >
                              <span>40.0000</span>
                              <ArrowRight size={14} />
                              <span>120.000</span>
                        </button>

                        <button
                              className={`${styleEffect.onActive(
                                    active === 3,
                              )} min-w-[120px] h-[40px] rounded-[999px]  flex gap-[4px] w-max items-center px-[8px]`}
                              onClick={(e) => onValueChange(3)}
                        >
                              <span>120.0000</span>
                              <ArrowRight size={14} />

                              <span>180.000</span>
                        </button>

                        <button
                              className={`${styleEffect.onActive(
                                    active === 4,
                              )} min-w-[120px] h-[40px] rounded-[999px]  flex gap-[4px] w-max items-center px-[8px]`}
                              onClick={(e) => onValueChange(4)}
                        >
                              <span>Trên 180.0000</span>
                        </button>
                  </div>
            </div>
      )
}

export default FilterProductPrice
