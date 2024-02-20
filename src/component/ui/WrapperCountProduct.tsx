import React, { memo, useEffect, useState } from 'react'
import BoxCountProduct from './BoxCountProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService, { TModeChangeQuantityProductCart } from '../../apis/cart.service'

type TProps = {
      cart_id: string
      cart_quantity: number
      readOnly: boolean
}

const WrapperCountProduct = (props: TProps) => {
      const { cart_id, cart_quantity, readOnly } = props
      const [productQuantity, setProductQuantity] = useState<number | undefined>(cart_quantity)
      const queryClient = useQueryClient()

      console.log({ cart_id })
      console.log({ quantity: cart_quantity })

      useEffect(() => {
            setProductQuantity(cart_quantity)
      }, [cart_quantity])

      const updateCartQuantityBtn = useMutation({
            mutationKey: ['v1/api/cart/cart-change-quantity'],
            mutationFn: (data: TModeChangeQuantityProductCart) => CartService.changeQuantityProductCart(data),
            onSuccess: (data) => {
                  setProductQuantity(data.data.metadata.quantity)
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
                  })

                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-pay'],
                  })
            },
      })

      const getValueChangeQuanity = (mode: TModeChangeQuantityProductCart) => {
            console.log({ mode })
            if (mode.mode === 'INPUT') {
                  setProductQuantity(mode.quantity)
            }
            updateCartQuantityBtn.mutate({ ...mode, cart_id })
      }

      useEffect(() => {
            if (updateCartQuantityBtn.isSuccess) {
                  setProductQuantity(updateCartQuantityBtn.data.data.metadata.quantity)
                  // queryClient.invalidateQueries({
                  //       queryKey: ['v1/api/cart/cart-get-my-cart'],
                  // })
            }
      }, [updateCartQuantityBtn.isSuccess, updateCartQuantityBtn?.data?.data.metadata.quantity])

      return (
            <BoxCountProduct
                  readOnly={readOnly}
                  getValueChangeQuanity={getValueChangeQuanity}
                  productQuantity={productQuantity || cart_quantity}
                  setProductQuantity={setProductQuantity}
                  disable={updateCartQuantityBtn.isPending || readOnly}
            />
      )
}

export default memo(WrapperCountProduct)
