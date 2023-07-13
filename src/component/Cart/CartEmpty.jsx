import React from 'react'
import { Link } from 'react-router-dom'

export default function CartEmpty() {
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 187px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <img src={require('./cart_image.png')} className='w-15 h-15' alt='' />
      <p className='text-xl italic text-stone-800'>Giỏ hàng đang trống</p>
      <Link
        to='/'
        className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}
