import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import OrderService from '../../apis/Order.service'
import CartEmpty from '../../component/Cart/CartEmpty'

const OrderHistory = () => {
      const getMyOrder = useQuery({
            queryKey: ['/v1/api/order/get-my-order'],
            queryFn: () => OrderService.getMyOrder(),
      })

      useEffect(() => {
            if (getMyOrder.isSuccess) {
                  //     getMyOrder.data.data.metadata.order &&
                  // getMyOrder.data.data.metadata.order?.order_products &&
                  // console.log({ order_Products: getMyOrder.isSuccess && getMyOrder.data.data.metadata.order.order_products[0] })
                  // console.log({ order: getMyOrder.isSuccess && getMyOrder.data.data.metadata.order })

                  getMyOrder.data.data.metadata.order?.order_products.forEach((order) => {
                        //
                        // return order.map((p) => console.log({ p }))
                        // console.log({ order: order })
                        // order.
                        // order[0]
                        console.log({ order: order[0] })
                        order.forEach((o) => {
                              o.products.map((product) => console.log({ name: product.product_id.product_name }))
                        })
                  })
            }
      }, [getMyOrder.isSuccess])

      return (
            <div className='flex flex-col w-full h-[500px] bg-[#ffffff]  items-center justify-center'>
                  {getMyOrder.isSuccess &&
                        getMyOrder.data.data.metadata.order &&
                        getMyOrder.data.data.metadata.order?.order_products &&
                        getMyOrder.data.data.metadata.order?.order_products?.map((order) => (
                              <div className=''>
                                    {order.map((product) => (
                                          <div className='flex flex-col'>
                                                <span>{product.order_time_payment.toString()}</span>
                                                {product.products.map((p) => (
                                                      <div className='flex gap-[50px]'>{p.product_id.product_name}</div>
                                                ))}
                                          </div>
                                    ))}
                              </div>
                        ))}
                  {getMyOrder.isSuccess && !getMyOrder.data.data.metadata.order && <CartEmpty />}
            </div>
      )
}

//order -> order products [] -> products, một mảng chứa các sản phẩm thanh toán trong phiên đó -> product
// 3 array

/*
order_product chứa 1 mảng order
trong mảng order có time và 1 mảng products
vậy nên loop qua order_products để thu về mảng order, sau đó loop qua mảng order để lấy time và mảng products, loop products để lấy thông tin

*/

/*
[ [{}] ,[{}] ]
*/

export default OrderHistory
