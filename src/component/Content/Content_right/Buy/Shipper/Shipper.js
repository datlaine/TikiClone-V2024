import React, { useEffect } from 'react'
import style from './shipper.module.css'
import logoNow from './logoNow.png'
import logoFast from './logoFast.png'

import { fast } from './HandleTime'

export default function Shipper({ Now, isDate, isDay, timeShip, fastShip, tietKiem }) {
  console.log({ Now, isDate, isDay, timeShip })

  const moneyWithNow = 25.0
  const moneyWithoutNow = 17.0
  const moneySave = 11.0
  const date = new Date()
  let ngayHienTai = date.getDate()
  let thuHienTai = date.getDay()
  let thangHienTai = date.getMonth() + 1

  const thoiGianGiaoHang =
    Now && fastShip
      ? `${timeShip}`
      : fast(isDate, isDay, thangHienTai, tietKiem, thuHienTai, ngayHienTai, Now, thangHienTai)

  const tienVanChuyen = Now
    ? `Vận chuyển: ${moneyWithNow.toFixed(3)} đ`
    : tietKiem
    ? `Vận chuyển: ${moneySave.toFixed(3)} đ`
    : `Vận chuyển: ${moneyWithoutNow.toFixed(3)} đ`

  useEffect(() => {
    let shipperContainer = document.querySelectorAll(`.${style.shipperContainer}`)
    shipperContainer[0].classList.add(`${style.active}`)
  }, [])

  const handleSelectShip = () => {
    let shipperContainer = document.querySelectorAll(`.${style.shipperContainer}`)
    for (var i = 0; i < shipperContainer.length; i++) {
      if (shipperContainer[i].contains(`${style.active}`)) {
        shipperContainer[i].classList.remove(`${style.active}`)
      }
    }
  }

  return (
    <div
      className={style.shipperContainer}
      style={{ padding: tietKiem ? '10px 6px' : '10px 8px', flex: tietKiem ? '1' : '' }}
      onClick={handleSelectShip}
    >
      <div className={style.img} style={{ fontSize: tietKiem ? '0.7rem' : '14px' }}>
        <img
          src={Now && fastShip ? logoNow : logoFast}
          style={{ display: tietKiem ? 'none' : 'block' }}
          alt=''
        />
        {tietKiem && <span style={{ color: 'red' }}>Giao hàng tiết kiệm: </span>}

        <span className={style.timeShip}>{thoiGianGiaoHang}</span>
      </div>
      <div className={style.moneyShip}>{tienVanChuyen}</div>
    </div>
  )
}
