import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLogoToggle = (props) => {
  const { stateSideBar, showSideBar, hideSideBar } = props

  const changeStateSideBar = () => {
    if (stateSideBar) {
      // toDoHideSideBar()
      hideSideBar()
    } else {
      showSideBar()
      // toDoShowSideBar()
    }
    console.log(props)
  }

  return (
    <div className=''>
      <Link className='logo 2xl:mr-8 hidden 2xl:block' to='/'>
        <img
          src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
          className='xl:w-[57px] xl:h-10 xl:block dienThoai:hidden lg:block lg:w-[37px] lg:h-5'
          alt=''
        />
      </Link>
      <div
        className='dienThoai:block 2xl:hidden'
        onClick={changeStateSideBar}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8 lg:w-9 lg:h-9'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </div>
    </div>
  )
}

export default HeaderLogoToggle
