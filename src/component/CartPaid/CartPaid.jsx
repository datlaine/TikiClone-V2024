import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './cartPaid.module.css'

import { USER } from '../User/infoUser.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { actionPaid, cartSlice } from '../../Redux/reducer'
import { toast, ToastContainer } from 'react-toastify'

export default function CartPaid() {
      const dispatch = useDispatch()
      const cartList = useSelector((state) => state.cartList.cartList)
      const select = cartList.filter((product) => product.check === true)

      console.log('>>>checkSelect', select)

      const [total, setTotal] = useState(0)

      useEffect(() => {
            if (select) {
                  const tempTotal = select.reduce((tongTien, product) => {
                        let price, priceProduct
                        if (product.isPrice && product.promote !== 0) {
                              priceProduct = product.isPriceWithPromote
                        }
                        if (product.promote === 0) {
                              console.log(`alo`, product)
                              console.log(product.isPriceWithPromote)
                              priceProduct = product.isPrice
                        }

                        price = priceProduct * product.quantity
                        return tongTien + price
                  }, 0)
                  setTotal(tempTotal)
            }
      }, [select])

      const handlePaid = () => {
            // dispatch(cartSlice.actions.actionPaid(select))
            setTimeout(() => dispatch(actionPaid(select)), 1500)
            if (select.length !== 0) {
                  toast.success('Mua hàng thành công', {
                        autoClose: 1000,
                  })
            }
      }

      const name = USER.userName
      const phone = USER.userPhone
      const address = USER.userAddress

      return (
            <div className={style.cartPaidContainer}>
                  <div className={style.cartPaidInfoUser}>
                        <div className={style.verify}>
                              <span className={style.letGo}>Giao tới</span>
                              <span className='text-sky-500 font-medium'>Thay đổi</span>
                        </div>

                        <div className={style.info}>
                              <div className={style.infoNamePhone}>
                                    <span className={style.infoName}>{name}</span>
                                    <span> - </span>
                                    <span className={style.infoPhone}>{phone}</span>
                              </div>
                              <div style={style.infoAddress}>{address}</div>
                        </div>
                  </div>
                  <div className={style.cartPaidPromote}>
                        <div className={style.newsPromote}>
                              <span className='text-stone-950'>Tin khuyến mãi</span>
                              <span className='text-neutral-400'>Có thể chọn 2</span>
                        </div>
                        <div className={style.promoteOther}>
                              <span className='text-sky-500'>Chọn hoặc nhập mã khuyến mãi khác</span>
                        </div>
                  </div>
                  <div className={style.cartPaidTotal}>
                        <div className={style.tempMoney}>
                              <span>Tạm tính</span>
                              <span>{total} VNĐ</span>
                        </div>
                        <div className={style.totalMoney}>
                              <span>Tổng tiền</span>
                              <div className={style.lastMoney}>
                                    <span>{total} VNĐ</span>
                                    <span>(Đã bao gồm VAT nếu có)</span>
                              </div>
                        </div>
                  </div>
                  <button className={style.cartPaidBtn} onClick={handlePaid}>
                        Thanh toán ( {select.length} )
                  </button>
                  <ToastContainer />
            </div>
      )
}
