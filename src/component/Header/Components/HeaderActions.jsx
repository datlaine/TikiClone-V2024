import React from 'react'
import Module_hover from '../module_hover/Module_hover'
import { Link } from 'react-router-dom'
import HeaderBoxHover from './HeaderBoxHover'

const HeaderActions = () => {
  return (
    <div
      id=''
      className='dienThoai:hidden xl:flex xl:flex-1 lg:hidden lg:items-center lg:h-full 2xl:justify-evenly lg:justify-evenly xl:justify-evenly'
    >
      <Link
        className='nav_item flex items-center justify-center gap-x-2 px-[16px] py-2 h-full  rounded-lg lg:flex	md:hidden xl:inline-block xl:min-w-[150px] xl:flex'
        to='/'
      >
        <img
          src='https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png'
          alt=''
          className='w-5 h-5'
        />
        <button>Trang Chủ</button>
      </Link>
      <div className='nav_item'>
        <img
          src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
          alt=''
          className='w-5 h-5'
        />
        <button>Astra</button>
      </div>
      <div className='nav_item group relative'>
        <img
          src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
          alt=''
          className='w-5 h-5'
        />
        <button className=''>Tài Khoản</button>
        <HeaderBoxHover />
      </div>
    </div>
  )
}

export default HeaderActions
