import React from 'react'
import style from './shipper.module.css'
import logoNow from './logoNow.png'
import logoFast from './logoFast.png'
import { useRef } from 'react'
import { list } from 'postcss'

export default function Shipper({ Now, getMethodShip }) {
  const date = new Date()
  let ngayHienTai = date.getDate()
  let thangHienTai = date.getMonth() + 1
  let namHienTai = date.getFullYear()
  // const thoiGianGiaoHang =
  //   Now && fastShip
  //     ? `${timeShip}`
  //     : fast(isDate, isDay, thangHienTai, tietKiem, thuHienTai, ngayHienTai, Now, thangHienTai)

  // const tienVanChuyen = Now
  //   ? `Vận chuyển: ${moneyWithNow.toFixed(3)} đ`
  //   : tietKiem
  //   ? `Vận chuyển: ${moneySave.toFixed(3)} đ`
  //   : `Vận chuyển: ${moneyWithoutNow.toFixed(3)} đ`

  // useEffect(() => {
  //   let shipperContainer = document.querySelectorAll(`.${style.shipperContainer}`)
  //   shipperContainer[0].classList.add(`${style.active}`)
  // }, [])

  // const handleSelectShip = () => {
  //   let shipperContainer = document.querySelectorAll(`.${style.shipperContainer}`)
  //   for (var i = 0; i < shipperContainer.length; i++) {
  //     if (shipperContainer[i].contains(`${style.active}`)) {
  //       shipperContainer[i].classList.remove(`${style.active}`)
  //     }
  //   }
  // }
  const vanChuyenNow = 30000
  const vanChuongNormal = 15000
  const thoiGianGiaoHangNow = `Giao trong ngày ${ngayHienTai}-${thangHienTai}-${namHienTai}`
  const thoiGianGiaoHangNormal = `Giao vào ngày ${ngayHienTai + 3}-${thangHienTai}-${namHienTai}`

  const select = useRef(null)
  const handleSelectShip = (name) => {
    let listShip = document.querySelectorAll(`.${style.shipperContainer}`)
    for (let i = 0; i < listShip.length; i++) {
      if (listShip[i].classList.contains(name)) {
        if (listShip[i].classList.contains('bg-sky-100')) {
          listShip[i].classList.remove('bg-sky-100')
        } else {
          listShip[i].classList.add('bg-sky-100')
          getMethodShip(name)
        }
      } else {
        listShip[i].classList.remove('bg-sky-100')
      }
    }
  }

  return (
    <>
      <div
        className={`${style.shipperContainer} now`}
        onClick={() => handleSelectShip('now')}
        ref={select}
      >
        <div className={style.img}>
          <img src={logoNow} alt='' />

          <span className={style.timeShip}>{thoiGianGiaoHangNow}</span>
        </div>
        <div className={style.moneyShip}>Phí vận chuyển {vanChuyenNow}</div>
      </div>

      <div
        className={`${style.shipperContainer} normal`}
        onClick={() => handleSelectShip('normal')}
        ref={select}
      >
        <div className={style.img}>
          <img src={logoFast} alt='' />

          <span className={style.timeShip}>{thoiGianGiaoHangNormal}</span>
        </div>
        <div className={style.moneyShip}>Phí vận chuyển {vanChuongNormal}</div>
      </div>
    </>
  )
}
