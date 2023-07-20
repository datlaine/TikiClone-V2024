import './content_right.css'
import ReactDOM from 'react-dom'

import React, { memo, useEffect, useState } from 'react'
import Content_right_header from './Content_right_header/Content_right_header'
import Content_right_midle from './Content_right_midle/Content_right_midle'
import DanhMucNoiBat from './DanhMucNoiBat/DanhMucNoiBat'
import GoiYHomNay from './GoiYHomNay/GoiYHomNay'
import HangThuongHieuGiaTot from './HangThuongHieuGiaTot/HangThuongHieuGiaTot'
import DanhSachSanPham from './DanhSachSanPham/DanhSachSanPham'

export default memo(function Content_right({ getDataContent }) {
  const [btnTop, setBtnTop] = useState(0)
  const [btnBottom, setBtnBottom] = useState(0)
  const [wrapperTop, setWrapperTop] = useState(0)
  const [wrapperBottom, setWrapperBottom] = useState(0)
  const [hide, setHide] = useState(true)

  const handlePositionButton= (posTop, posBottom) => {
    // console.log(`tọa độ top / ${posTop}`)
    setBtnTop(posTop)
    setBtnBottom(posBottom)
  }

  const handlePositionDivSticky = (posBottom, posTop) => {
    // console.log(`tọa độ top dfđsd/ ${posBottom}`)
    setBtnBottom(posBottom)
    setWrapperTop(posTop)
  }

  useEffect(() => {
    if (btnTop - 165 < wrapperBottom) {
      console.log('Đã vượt qua')
      console.log('ẩn')

      setHide(false)
    } else {
      console.log('hiện')
      setHide(true)
    }
    console.log('  ')
    console.log('  ')
    console.log('  ')
    console.log('  ')
  }, [btnTop, btnBottom, wrapperBottom, wrapperTop])

  return (
    <div id='Content_right' className=''>
      <Content_right_header />
      <Content_right_midle />
      <HangThuongHieuGiaTot />
      <DanhMucNoiBat />
      <GoiYHomNay handlePositionDivSticky={handlePositionDivSticky} hide={hide} />
      <DanhSachSanPham handlePositionButton={handlePositionButton} />
    </div>
  )
})
