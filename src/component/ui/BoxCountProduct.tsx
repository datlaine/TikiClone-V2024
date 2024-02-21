import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CartFormData } from '../../types/cart.type'
import CartService, { TModeChangeQuantityProductCart } from '../../apis/cart.service'
import { AxiosResponse } from 'axios'

type TProps = {
      productQuantity: number | undefined
      setProductQuantity: React.Dispatch<SetStateAction<number | undefined>>
      getValueChangeQuanity: (mode: TModeChangeQuantityProductCart) => void
      disable: boolean
      readOnly: boolean
}

const BoxCountProduct = (props: TProps) => {
      const { productQuantity, setProductQuantity, getValueChangeQuanity, disable, readOnly } = props

      const handleIncreaseProductQuantity = () => {
            setProductQuantity((prev) => ((prev as number) += 1))
            getValueChangeQuanity({ mode: 'INCREASE', quantity: 1 })
      }

      const handleDecreaseProductQuantity = () => {
            setProductQuantity((prev) => ((prev as number) -= 1))

            getValueChangeQuanity({ mode: 'DECREASE', quantity: -1 })
      }

      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disable) return
            if (!e.target.value) {
                  setProductQuantity(undefined)
                  // getValueChangeQuanity({ mode: 'INPUT', quantity: 0 })
                  return
            }
            if (Number(e.target.value) > 999) return
            if (Number(e.target.value) === 0) {
                  //       getValueChangeQuanity({ mode: 'INPUT', quantity: 1 })
                  return
            }
            // if(Number(e.target.value) !== 0)
            getValueChangeQuanity({ mode: 'INPUT', quantity: Number(e.target.value) })
      }

      const handleBlurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
            if (!e.target.value || Number(e.target.value) === 0) {
                  getValueChangeQuanity({ mode: 'INPUT', quantity: 1 })
            }
      }

      const styleEffect = {
            readOnly: readOnly ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer',
      }

      const lengthCharQuantity = Number(productQuantity?.toLocaleString().length)

      //min-w, w, rounded, gap, h
      return (
            <div className={`flex  max-w-max h-[28px]`}>
                  <button
                        className={` ${styleEffect.readOnly}  flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[28px] h-full text-[20px] `}
                        onClick={handleDecreaseProductQuantity}
                        disabled={productQuantity === 1 || disable ? true : false}
                  >
                        -
                  </button>
                  <input
                        style={{ width: lengthCharQuantity * 3 + 32 }}
                        disabled={readOnly}
                        onChange={handleChangeInput}
                        onBlur={handleBlurInput}
                        value={productQuantity}
                        defaultValue={productQuantity}
                        type='number'
                        className={`${styleEffect.readOnly} flex items-center justify-center border-[1px] border-slate-400 min-w-[32px] max-w-max    h-full text-[16px] text-center `}
                  />
                  <button
                        disabled={disable}
                        className={`${styleEffect.readOnly} flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[28px] h-full text-[20px] `}
                        onClick={handleIncreaseProductQuantity}
                  >
                        +
                  </button>
            </div>
      )
}

export default BoxCountProduct
