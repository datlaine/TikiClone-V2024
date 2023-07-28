import './content_right.css'
import ContentRightHeader from './Content_right_header/ContentRightHeader'
import React, { memo, useEffect, useState } from 'react'
import Content_right_midle from './Content_right_midle/Content_right_midle'
import DanhMucNoiBat from './DanhMucNoiBat/DanhMucNoiBat'
import GoiYHomNay from './GoiYHomNay/GoiYHomNay'
import HangThuongHieuGiaTot from './HangThuongHieuGiaTot/HangThuongHieuGiaTot'
import DanhSachSanPham from './DanhSachSanPham/DanhSachSanPham'
import { useCallback } from 'react'

export default memo(function Content_right({ getDataContent }) {
  const [btnTop, setBtnTop] = useState(0)
  const [hide, setHide] = useState(true)

  const handlePositionButton = useCallback((posTop, posBottom) => {
    setBtnTop(posTop)
  }, [])

  useEffect(() => {
    if (btnTop - 165 < 0) {
      setHide(false)
    } else {
      setHide(true)
    }
  }, [btnTop])

  return (
    <div id='Content_right' className=''>
  <ContentRightHeader />
    <Content_right_midle />
      <HangThuongHieuGiaTot />
      <DanhMucNoiBat />
      <GoiYHomNay hide={hide} />
      <DanhSachSanPham handlePositionButton={handlePositionButton} />
    </div>
  )
})
