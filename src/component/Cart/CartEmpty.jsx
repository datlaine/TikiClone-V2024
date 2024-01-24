import React from 'react'
import { Link } from 'react-router-dom'
import style from './Style/cartEmpty.module.css'

export default function CartEmpty() {
    return (
        <div className={style.wrapperCartEmpty}>
            <img src={require('./cart_image.png')} className={style.hinhAnhEmptyCart} alt='' />
            <div className={style.wrapperMessage}>
                <p className='text-xl italic text-stone-800'>Giỏ hàng đang trống</p>
                <Link
                    to='/'
                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    )
}
