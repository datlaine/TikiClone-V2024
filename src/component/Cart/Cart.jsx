import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductPair, decreaseProduct, deleteProduct, doIsSelectAll, increaseProduct } from '../../Redux/reducer'
import CartPaid from '../CartPaid/CartPaid'
import CartEmpty from './CartEmpty'
import style from './Style/Cart.module.css'
export default function Cart() {
  const [isSelectAll, setIsSelectAll] = useState(false)
  const dispatch = useDispatch()
  const list = useSelector((state) => state.cartList.cartList)
  const soLuong = useSelector((state) => state.cartList.soLuong)
  const select = list.filter((product) => product.check === true)

  const handleIncrease = (idSanPham) => {
    dispatch(increaseProduct(idSanPham))
  }

  const handleDecrease = (idSanPham) => {
    dispatch(decreaseProduct(idSanPham))
  }

  const handleDeleteProductCart = (idSanPham) => {
    console.log(typeof idSanPham)
    dispatch(deleteProduct(idSanPham))
  }

  const handleChangeCheckBox = (sanPham) => (e) => {
    console.log(sanPham) // 1 object sản phảm
    console.log(e.target.checked)
    let trangThai = e.target.checked
    let infoProductPair = {
      productObj: {
        ...sanPham,
        check: trangThai,
      },
    }

    dispatch(addProductPair(infoProductPair))
  }

  const handleChangeSelectAll = (e) => {
    console.log(e.target.checked)
    setIsSelectAll(e.target.checked)
    dispatch(doIsSelectAll(e.target.checked))
  }

  console.log(list)

  return (
    <div>
      {list.length === 0 && <CartEmpty />}
      {list.length !== 0 && (
        <div className={style.container}>
          <h2 className={style.titleCart}>Giỏ hàng</h2>
          <div className={style.cartMain}>
            <div className={style.cartWrapper}>
              <div className={style.productQuantityAll}>
                <input
                  type='checkbox'
                  className={style.checkBoxAll}
                  checked={isSelectAll}
                  onChange={handleChangeSelectAll}
                />{' '}
                <p>Tất cả ({soLuong} sản phẩm)</p>
              </div>
              {list.map((listItem) => {
                return (
                  <div key={listItem.id} className={`${style.productCart}`}>
                    <div className={style.checkBoxWrapper}>
                      <input
                        type='checkbox'
                        className={style.checkBox}
                        checked={listItem.check}
                        onChange={handleChangeCheckBox(listItem)}
                      />
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className={style.iconHome}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                        />
                      </svg>
                      <span>Tiki Trading {' >'} </span>
                    </div>
                    <div className={style.productCartInfo}>
                      <div className={style.imageProductCart}>
                        <Link to={`/Buy/${listItem.id}`}>
                          <img
                            src={require(`../../component/Content/Content_right/DanhSachSanPham${listItem.image}`)}
                          />
                        </Link>
                      </div>
                      <div className={`${style.productCartName} ${style.productShip}`}>
                        <p className='' title={listItem.name}>
                          {listItem?.name}
                        </p>
                        {listItem.methodShip === 'now' ? (
                          <div className={style.logoShipCart}>
                            <img src={require('./img/logoNow.png')} alt='' />
                            <span className={style.titleShip}>Giao siêu tốc</span>
                          </div>
                        ) : (
                          <div className={style.logoShipCart}>
                            <img src={require('./img/logoFast.png')} alt='' />
                            <span className={style.titleShip}>Giao Tiết Kiệm</span>
                          </div>
                        )}
                      </div>
                      <div className={style.priceProductCart}>
                        {listItem.promote !== 0 ? (
                          <>
                            <p className={style.isPricePromote}>
                              {listItem.quantity === 1
                                ? listItem.isPriceWithPromote
                                : listItem.isPriceWithPromote * listItem.quantity}{' '}
                              VNĐ
                            </p>
                            <p className={style.isPrice}>{listItem.isPrice} VNĐ</p>
                            <p className={style.promote}>- {listItem.promote} %</p>
                          </>
                        ) : (
                          <p className={style.isPricePromote}>
                            {listItem.quantity === 1 ? listItem.isPrice : listItem.isPrice * listItem.quantity} VNĐ
                          </p>
                        )}

                        <p>{listItem.quantity}</p>
                        <div className={style.btnWrapper}>
                          <button
                            className={`${style.btn} ${listItem.quantity > 1 ? '' : 'cursor-not-allowed	'}`}
                            onClick={() => handleDecrease(listItem.id)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
                            </svg>
                          </button>
                          <span className={style.quantity}>{listItem?.quantity}</span>
                          <button className={`${style.btn}`} onClick={() => handleIncrease(listItem.id)}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                            </svg>
                          </button>
                        </div>
                        <div className={style.wrapperIcon} onClick={() => handleDeleteProductCart(listItem.id)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={`${style.iconDelete} hover:text-red-500 font-medium`}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <CartPaid />
          </div>
        </div>
      )}
    </div>
  )
}
