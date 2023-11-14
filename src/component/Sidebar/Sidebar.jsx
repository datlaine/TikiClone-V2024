import React, {
  useEffect,
  useRef,
} from 'react'
import {
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { apiLink } from '../../apis/api'
import ContentLeft from '../Content/Content_left/ContentLeft'
// import style from './Sidebar.module.css'
import { connect } from 'react-redux'
import { store } from '../../store'
import {
  toDoHideSideBar,
  toDoShowSideBar,
} from '../../Redux/uiSlice'

const category = {
  noiBat: 'Nổi bật',
  danhMuc: 'Danh mục',
}

const url_noiBat = `${apiLink}/noiBat`
const url_danhMuc = `${apiLink}/danhMuc`

const sleep = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })
}

function Sidebar(props) {
  const matchTrangChu = useMatch('/')
  const {
    showSideBar,
    toDoHideSideBar,
    toDoShowSideBar,
  } = props
  const wrapperSideBar = useRef()
  const pathNameHome =
    window.location.pathname === '/'
  const widthWindow = window.innerWidth
  const modeMobile = widthWindow > 1025
  useEffect(() => {
    console.log(
      window.location.pathname === '/',
    )
    toDoHideSideBar()
  }, [window.location.pathname])

  return (
    <>
      {(<div
          onClick={(e) =>
            e.stopPropagation()
          }
          id=''
          className={`fixed top-[60px]  w-[150px] z-[21] 2xl:top-[160px] 2xl:left-[30px]  ${pathNameHome ? '2xl:block' : '2xl:hidden'}  ${
            widthWindow < 1025 &&
            (showSideBar === true
              ? 'block animate-showSideBarAni'
              : 'hidden animate-hideSideBarAni')
          }`}
          ref={wrapperSideBar}
        >
          <div
            id=''
            className='wrapper '
          >
            <ContentLeft
              category={category.noiBat}
              urlApi={url_noiBat}
            />

            <ContentLeft
              category={
                category.danhMuc
              }
              urlApi={url_danhMuc}
            />
            {/**banHang-container */}
            <div className='flex items-center justify-center bg-[#fff] p-2 mt-[-1px]'>
              <button className='banHang hover:bg-[#ccc]	'>
                <Link
                  to='/Contact'
                  className='contact'
                >
                  <img
                    src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                    alt=''
                    width={32}
                    height={32}
                  />
                  <span>
                    Bán hàng cùng Tiki
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const mapStateToProps = (
  state,
) => ({
  showSideBar:
    state.uiSlice.showSideBar,
})

export const mapDispatchToProps = (
  dispatch,
) => ({
  toDoHideSideBar: () =>
    store.dispatch(toDoHideSideBar()),
  toDoShowSideBar: () =>
    store.dispatch(toDoShowSideBar()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar)
