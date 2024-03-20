import React from 'react'
import { OrderItem } from '../../../types/order.type'
import { convertDateToStringFull } from '../../../utils/date.utils'
import { converNumberToMoney } from '../../../utils/money.utils'

type TProps = {
      order: OrderItem
}

const ShopProductOrder = (props: TProps) => {
      const { order } = props

      return (
            <div className='bg-[#ffffff] rounded-lg'>
                  {order.products.map((product) => (
                        <div key={product._id} className='flex gap-[40px] p-[24px]'>
                              <img src={product.product_id.product_thumb_image.secure_url} className='w-[200px] ' alt='product' />

                              <div className='flex flex-col gap-[12px]'>
                                    <span>Tên sản phẩm: {product.product_id.product_name}</span>
                                    <span>
                                          Giá sản phẩm: {converNumberToMoney({ money: product.product_id.product_price, replace: 'VNĐ' })}
                                    </span>
                                    <span>Số lượng: {product.quantity}</span>
                                    <span>Tổng tiền đơn hàng: {converNumberToMoney({ money: order.order_total, replace: 'VNĐ' })}</span>
                                    <span>Thời gian thanh toán: {convertDateToStringFull(order.order_time_payment)}</span>
                              </div>
                        </div>
                  ))}
            </div>
      )
}

export default ShopProductOrder
