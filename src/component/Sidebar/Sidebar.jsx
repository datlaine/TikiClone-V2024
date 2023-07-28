import React, { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { apiLink } from '../../apis/api'
import ContentLeft from '../Content/Content_left/ContentLeft'
import style from './Sidebar.module.css'

const category = {
  noiBat: 'Nổi bật',
  danhMuc: 'Danh mục',
}

const url_noiBat = `${apiLink}/noiBat`
const url_danhMuc = `${apiLink}/danhMuc`

export default function Sidebar() {
  const matchTrangChu = useMatch('/')

  useEffect(() => {
    // console.log('checkWindow', window.innerWidth)
  })

  return (
    <>
      {matchTrangChu && (
        <div onClick={(e) => e.stopPropagation()} id='big' className=''>
          <div id='showHideContentLeft' className='wrapper'>
            <ContentLeft category={category.noiBat} urlApi={url_noiBat} />

            <ContentLeft category={category.danhMuc} urlApi={url_danhMuc} />
            {/**banHang-container */}
            <div className='flex items-center justify-center bg-[#fff] p-2 mt-[-1px]'>
              <button className='banHang'>
                <Link to='/Contact' className='contact'>
                  <img
                    src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                    alt=''
                    width={32}
                    height={32}
                  />
                  <span>Bán hàng cùng Tiki</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}

      {window.innerWidth < 768 && (
        <div onClick={(e) => e.stopPropagation()} id='big' className=''>
          <div id='showHideContentLeft' className='wrapper'>
            <ContentLeft category={category.noiBat} urlApi={url_noiBat} />

            <ContentLeft category={category.danhMuc} urlApi={url_danhMuc} />
            {/**banHang-container */}
            <button className='banHang'>
              <Link to='/Contact' className='contact'>
                <img
                  src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                  alt=''
                  width={32}
                  height={32}
                />
                <span>Bán hàng cùng Tiki</span>
              </Link>
            </button>
            <div className={style.iconClose}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
