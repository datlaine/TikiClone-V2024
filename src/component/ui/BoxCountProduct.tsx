import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CartFormData } from '../../types/cart.type'
import CartService from '../../apis/cart.service'

const BoxCountProduct = () => {
      const [productQuantity, setProductQuantity] = useState<number | undefined>(1)
      const dispatch = useDispatch()
      const queryClient = useQueryClient()

      const cartMutation = useMutation({
            mutationKey: ['add-cart'],
            mutationFn: ({ cart }: { cart: CartFormData }) => CartService.addCart({ cart }),
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['cart-get-count-product'] })
                  queryClient.invalidateQueries({
                        queryKey: ['cart-get-count-product'],
                  })
            },
      })

      const handleIncreaseProductQuantity = () => {
            // if(productQuantity === 1) return
            setProductQuantity((prev) => (prev! += 1))
      }

      const handleDecreaseProductQuantity = () => {
            if (productQuantity === 1) return
            setProductQuantity((prev) => (prev! -= 1))
      }

      //min-w, w, rounded, gap, h
      return (
            <div className='flex  max-w-max h-[28px]'>
                  <button
                        className='flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[28px] h-full text-[20px] '
                        onClick={handleDecreaseProductQuantity}
                        disabled={productQuantity === 1 ? true : false}
                  >
                        -
                  </button>
                  <input
                        onChange={(e) => {
                              if (!e.target.value) setProductQuantity(undefined)
                              if (Number(e.target.value) > 999) return
                              if (Number(e.target.value) === 0) {
                                    // setProductQuantity(1)
                                    return
                              }
                              setProductQuantity(Number(e.target.value))
                        }}
                        onBlur={(e) => {
                              if (!e.target.value) {
                                    setProductQuantity(1)
                              }
                        }}
                        value={productQuantity}
                        defaultValue={productQuantity}
                        type='number'
                        className='flex items-center justify-center border-[1px] border-slate-400 w-[32px]  h-full text-[16px] text-center '
                  />
                  <button
                        className='flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[28px] h-full text-[20px] '
                        onClick={handleIncreaseProductQuantity}
                  >
                        +
                  </button>
            </div>
      )
}

export default BoxCountProduct
