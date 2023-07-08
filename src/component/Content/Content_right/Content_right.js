import './content_right.css'
import ReactDOM from 'react-dom'

import React, { memo, useState } from 'react'
import Content_right_header from './Content_right_header/Content_right_header'
import Content_right_midle from './Content_right_midle/Content_right_midle'
import DanhMucNoiBat from './DanhMucNoiBat/DanhMucNoiBat'
import GoiYHomNay from './GoiYHomNay/GoiYHomNay'
import HangThuongHieuGiaTot from './HangThuongHieuGiaTot/HangThuongHieuGiaTot'
import DanhSachSanPham from './DanhSachSanPham/DanhSachSanPham'
import MiniDanhSach from './DanhSachSanPham/MiniDanhSach'
import ButtonAddPage from './DanhSachSanPham/ButtonAddPage'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Buy from './Buy/Buy'

export default memo(function Content_right({ getDataContent }) {
  const urlMiniSpe = `https://dulieusanpham.vercel.app/danhSachMiniSpe/1`
  const urlMiniSpe2 = `https://dulieusanpham.vercel.app/danhSachMiniSpe/2`
  // console.log("content-danhSachSanPham re-render");

  const [add, setAdd] = useState(false)

  const handleAdd = () => {
    setAdd(true)
  }

  const getData = (data, check) => {
    if (check) {
      getDataContent(data, check)
    }
  }

  return (
    <div id='Content_right'>
      <Content_right_header />
      <Content_right_midle />
      <HangThuongHieuGiaTot />
      <DanhMucNoiBat />
      <GoiYHomNay />

      <DanhSachSanPham
        prop={
          <MiniDanhSach colums={[1, 7]} rows={[1, 2]} urlApi={urlMiniSpe2} isNotFirst={false} />
        }
        getDataContentRight={getData}
      />

    </div>
  )
})
