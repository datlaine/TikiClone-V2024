import React, { useEffect, useState } from 'react'
import { TProductDetail } from '../../types/product/product.type'
import ProductLabel from './ProductLabel'
import { Rate } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../../apis/cart.service'
import { CartForm, CartFormData } from '../../types/cart.type'
import { useDispatch } from 'react-redux'
import { addToast } from '../../Redux/toast'

type TProps = {
      product: TProductDetail
}

const ProductPay = (props: TProps) => {
      const { product } = props

      const [productQuantity, setProductQuantity] = useState<number | undefined>(1)
      const dispatch = useDispatch()
      const queryClient = useQueryClient()

      const cartMutation = useMutation({
            mutationKey: ['add-cart'],
            mutationFn: ({ cart }: { cart: CartFormData }) => CartService.addCart({ cart }),
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['cart-get-count-product'] })
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
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

      const handleClickBuy = () => {
            console.log({ product: { ...product, productQuantity, price: product.product_price * (productQuantity || 1) } })
            const formData = new FormData()
            formData.append('product_id', product._id)

            formData.append('cart_product_price_origin', product.product_price.toString())
            formData.append('quantity', (productQuantity || 1).toString())
            // console.log({ cart: JSON.stringify(formData) })
            cartMutation.mutate({ cart: formData })
            // for (var key of formData.entries()) {
            // console.log(key[0] + ', ' + key[1])
            // }
      }

      console.log({ productQuantity })

      useEffect(() => {
            if (cartMutation.isSuccess) {
                  dispatch(addToast({ type: 'SUCCESS', message: 'Cart', id: Math.random().toString() }))
            }
      }, [cartMutation.isSuccess])

      return (
            <section className='w-full h-full flex flex-col gap-[16px] p-[12px] text-[12px] xl:text-[14px]'>
                  <div className='flex flex-col xl:flex-row items-center gap-[8px] pb-[15px] border-b-[1px] border-slate-200'>
                        <img src={product.shop_id.shop_avartar_default} className='w-[40px] h-[40px] rounded-full' alt='' />
                        <div className='flex-1 flex flex-col content-center py-[2px] gap-[8px] '>
                              <div className='flex flex-col lg:flex-row gap-[8px] items-center transition-all duration-500'>
                                    <span className='font-bold'>{product.shop_id.shop_name}</span>
                                    <ProductLabel content='Official' />
                              </div>
                              <p className='flex flex-col lg:flex-row items-center gap-[6px] transition-all duration-500'>
                                    <div className='flex gap-[8px] items-center'>
                                          <span>4.5</span>
                                          <Rate defaultValue={1} count={1} className='w-max text-[13px]' disabled style={{ width: 2 }} />
                                    </div>
                                    <span className='flex-1'>(5.4tr+ đánh giá)</span>
                              </p>
                        </div>
                  </div>
                  <div className='flex flex-col gap-[8px]'>
                        <span className='font-bold'>Số lượng</span>
                        <div className='flex gap-[8px] max-w-max h-[30px]'>
                              <button
                                    className='flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[36px] h-full text-[20px] rounded-md'
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
                                    className='flex items-center justify-center border-[1px] border-slate-400 w-[40px]  h-full text-[16px] text-center rounded-md'
                              />
                              <button
                                    className='flex items-center justify-center p-[6px] border-[1px] border-slate-400 min-w-[36px] h-full text-[20px] rounded-md'
                                    onClick={handleIncreaseProductQuantity}
                              >
                                    +
                              </button>
                        </div>
                  </div>
                  <div className='font-bold flex flex-col gap-[8px] text-[15px]'>
                        <span className=''>Tạm tính</span>
                        <p className='w-full flex gap-[4px] items-center'>
                              <p className='w-[130px] xl:w-max  max-w-[180px] truncate'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                          .format(product.product_price * (productQuantity ? productQuantity : 0))
                                          .replace('₫', '')}
                              </p>
                              <span className='ml-[-2px]'>VNĐ</span>
                        </p>
                  </div>
                  <div className='w-full h-max flex flex-col gap-[8px]'>
                        <button className='w-full h-[45px] flex items-center justify-center bg-red-600 text-white rounded-md'>
                              Mua ngay
                        </button>
                        <button
                              className='w-full h-[45px] flex items-center justify-center bg-white text-blue-600 border-[1px] border-blue-600 rounded-md font-semibold text-[16px]'
                              onClick={handleClickBuy}
                        >
                              Thêm vào giỏ
                        </button>
                  </div>
            </section>
      )
}

export default ProductPay
