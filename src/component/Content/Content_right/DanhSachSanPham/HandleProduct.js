import { useCallback } from 'react'
import Buy from '../Buy/Buy'

const timeShipNOW = () => {
  let thoiGianGiao = ''
  const now = new Date()
  const gio = now.getHours()
  const gioGioiHan = 19
  if (gio <= gioGioiHan && gio >= 6) {
    thoiGianGiao = `Giao trước ${gio + 2}:00 hôm nay`
  } else {
    thoiGianGiao = `Giao sáng mai`
  }

  return thoiGianGiao
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toLowerCase() + this.slice(1)
  },
  enumerable: false,
})

const checkIsBought = function (data) {
  if (data) {
    // console.log(`data: ${data}`);
    let text = ''
    data.isBought > 0
      ? data.isBought < 1000
        ? (text = `Đã bán ${data.isBought}`)
        : (text = `Đã bán 1000+`)
      : (text = '')
    return text
  }
}

const handleBought = (name, price, timeShip, checkTikiNow, thu, ngay, giaoNhanh) => {
  // console.log(name,price)
  // console.log(name, price, timeShip);
  // console.log(parseFloat(price) * 10)
  // const timeTikiNow = timeShipNOW().capitalize();
  // const time = checkTikiNow
  //   ? `Đơn hàng có hỗ trợ Tiki Now và được ${timeTikiNow}`
  //   : giaoNhanh ? "Đơn hàng sẽ giao trong 1 - 2 ngay"
  //   : `Đơn hàng sẽ được giao vào thứ ${thu}, ngày ${ngay}`;
  // let xacNhan = window.confirm(`Bạn đã chọn sản phẩm \n[ ${name} ]`);
  // if (xacNhan) {
  //   var quantity = prompt("Vui lòng chọn số lượng", 1);
  //   if (quantity !== 0) {
  //     let isPrice = quantity * parseFloat(price);
  //     alert(`Mua thành công với giá ${isPrice} ngàn đồng\n${time}`);
  //   } else {
  //     alert("Bạn đã hủy đặt hàng")
  //   }
  // }
  return <Buy name={name} price={price} />
}

export { timeShipNOW, checkIsBought, handleBought }
