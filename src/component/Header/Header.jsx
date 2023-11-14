import React from 'react'

import { useEffect } from 'react'
import Header_list_up from './header_list_up/Header_list_up'
import Header_down from './header_list_down/Header_list_down'
import { store } from '../../store'
import { doOpenBoxLogin } from '../../Redux/authSlice'
import { connect } from 'react-redux'
import SeacrhInput from './Components/HeaderSearch.jsx'
import HeaderActions from './Components/HeaderActions.jsx'
import HeaderCart from './Components/HeaderCart'
import HeaderLogoToggle from './Components/HeaderLogoToggle.tsx'
import { toDoHideSideBar, toDoShowSideBar } from '../../Redux/uiSlice'
import HeaderTagsLocation from './Components/HeaderTagsLocation'

function HeaderSlogan() {
  return (
    <div
      id='HeaderSlogan'
      className='hidden 2xl:flex bg-[#ffe880] min-h-[40px] w-full  justify-center items-center pb-0'
    >
      <div className='header-last-container'>
        <img
          src='https://salt.tikicdn.com/ts/upload/5e/ec/fb/150f3c633781ed1da9921e45db90c62d.png'
          alt=''
        />
        <span>
          mọi đơn từ <strong>{149}K</strong>. Áp dụng cho cả{' '}
          <strong>TikiNOW {2}h</strong>
        </span>
      </div>
    </div>
  )
}

function Header(props) {
  const {
    user,
    quantityProduct,
    doOpenBoxLogin,
    toDoShowSideBar,
    toDoHideSideBar,
    stateSideBar,
  } = props
  console.log('props')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div
      id=''
      className='h-[60px] pt-[10px] w-full fixed z-[500] bg-[#fff] px-1   lg:w-full  lg:h-16   xl:w-full xl:px-0 xl:flex xl:flex-col 2xl:h-[150px]  '
    >
      <div className='2xl:basic-[60%] 2xl:flex 2xl:justify-center  flex-col dienThoai:p-0 dienThoai:w-full dienThoai:h-full lg:max-w-full  xl:px-[40px] lg:px-7'>
        <div className='flex min-w-full px-1 gap-1 items-center '>
          <HeaderLogoToggle
            showSideBar={toDoShowSideBar}
            hideSideBar={toDoHideSideBar}
            stateSideBar={stateSideBar}
          />
          <div className='flex-1 2xl:flex 2xl:flex-col 2xl:gap-4'>
            <div className='ml-4 flex justify-center gap-6 2xl:ml-0 2xl:gap-0'>
              <SeacrhInput />
              <HeaderActions />
              <HeaderCart
                isAuth={user}
                isQuanTiTyProduct={quantityProduct}
                doOpenBoxLogin={doOpenBoxLogin}
              />
            </div>
            <div id='' className='hidden 2xl:flex items-center justify-between'>
              <HeaderTagsLocation />
            </div>
          </div>
        </div>
      </div>
      <HeaderSlogan />
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.userCurrent,
  quantityProduct: state.cartList.soLuong,
  stateSideBar: state.uiSlice.showSideBar,
})

const mapDispatchToProps = (dispatch) => ({
  doOpenBoxLogin: () => store.dispatch(doOpenBoxLogin()),
  toDoShowSideBar: () => store.dispatch(toDoShowSideBar()),
  toDoHideSideBar: () => store.dispatch(toDoHideSideBar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
