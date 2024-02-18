import React, { useEffect, useState } from 'react'
import BoxCountProduct from './BoxCountProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService, { TModeChangeQuantityProductCart } from '../../apis/cart.service'

type TProps = {
      cart_id: string
      cart_quantity: number
}

const WrapperCountProduct = (props: TProps) => {
      const { cart_id, cart_quantity } = props
      const [productQuantity, setProductQuantity] = useState<number | undefined>(cart_quantity)
      const queryClient = useQueryClient()

      // console.log({ wrapper: productQuantity })

      const updateCartQuantityBtn = useMutation({
            mutationKey: ['v1/api/cart/cart-change-quantity'],
            mutationFn: (data: TModeChangeQuantityProductCart) => CartService.changeQuantityProductCart(data),
            onSuccess: (data) => {
                  setProductQuantity(data.data.metadata.quantity)
            },
      })

      const getValueChangeQuanity = (mode: TModeChangeQuantityProductCart) => {
            console.log({ mode })
            updateCartQuantityBtn.mutate({ ...mode, cart_id })
      }

      useEffect(() => {
            if (updateCartQuantityBtn.isSuccess) {
                  setProductQuantity(updateCartQuantityBtn.data.data.metadata.quantity)
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
                  })
            }
      }, [updateCartQuantityBtn.isSuccess, updateCartQuantityBtn?.data?.data.metadata.quantity])

      return (
            <BoxCountProduct
                  getValueChangeQuanity={getValueChangeQuanity}
                  productQuantity={productQuantity}
                  setProductQuantity={setProductQuantity}
            />
      )
}

export default WrapperCountProduct
