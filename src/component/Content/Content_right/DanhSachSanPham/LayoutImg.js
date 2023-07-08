import React from "react";
import style from "./layoutImg.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { timeShipNOW, checkIsBought, handleBought } from "./HandleProduct";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
export default function LayoutImg({ data ,infoDanhSach}) {
  // console.log(`LayoutImg re-render`);
  // console.log(id)
  // console.log(data)
  // console.log(infoDanhSach)
  // const timeShipNOW = useCallback(() => {
  //   const gio = now.getHours();
  //   let thoiGianGiao = "";
  //   const gioGioiHan = 19;
  //   if (gio <= gioGioiHan && gio >= 6) {
  //     thoiGianGiao = `Giao trước ${gio + 2}:00 hôm nay`;
  //   } else {
  //     thoiGianGiao = `Giao sáng mai`;
  //   }
  //   return thoiGianGiao;
  // },[])();

  

  let thoiGianGiaoHang = timeShipNOW(data && data);
  let soLuongDaBan = checkIsBought(data);
  // console.log(thoiGianGiaoHang);
  // const checkIsBought = (function () {
  //   let text = "";
  //   data.isBought > 0
  //     ? data.isBought < 1000
  //       ? (text = `Đã bán ${data.isBought}`)
  //       : (text = `Đã bán 1000+`)
  //     : (text = "");
  //   return text
  // })();

  checkIsBought(data);

  // handleBought
  // console.log(
  //   data.isLabel[0].checkLabel === true
  //     ? data.isLabel[1].Label
  //     : data.isLabel[0].checkLabel
  // );
  let checkPromote = data.isPromote[0].checkPromote;

  // console.log(`checkPromote:  ${id} ` + data.isLabel[1].label);
  // console.log(data);
  // console.log("id: ", data);
  return (
    <NavLink className={style.layoutImg} key={data.id} to='/buy' state={{
      data:data
      // price:  data.isPrice,
      // checkNow:  data.isShip[0].checkShipNOW,
      // name: data.name,
      // timeShip: thoiGianGiaoHang,
      // date: data.isShip[1].shipDate,
      // day: data.isShip[2].shipDay,
      // image: data.hinhAnh,
      // checkGiaoNhanh: data.isShip[3].giaoNhanh,
      // bought: data.isBought,
      // valueOfGive: data.valueOfGive,
      // give: data.give,
      // checkOffical: data.isLabel[0].checkLabel,
      // checkAstra: data.astraLabel[0].checkAstra,
      // astra: data.astraLabel[2].nameLabel,
      // imageAstra: data.astraLabel[1].hinhAnhAstra,
      // vote: data.isVote[0].checkVote,
      // numberVote: data.isVote[1].vote,
      // promote: data.isPromote[0].checkPromote ? data.isPromote[1].promote : '',
    }}>
      
      <div className={style.img}>
        <img src={require(`${data.hinhAnh}`)} alt="" />
      </div>
      {/**từ phần tử thứ 2 */}
      {/**check xem sản phẩm có nhãn hàng không - nếu có thì thêm hình nhãn */}
      {data.isLabel[0].checkLabel && (
        <img
          src={require(`${data.isLabel[1].label}`)}
          className={style[`${data.isLabel[2].nameLabel}`]}
          alt=""
        />
      )}

      {data.astraLabel[0].checkAstra && (
        <img
          src={require(`${data.astraLabel[1].hinhAnhAstra}`)}
          className={style[`${data.astraLabel[2].nameLabel}`]}
          alt=""
        />
      )}
      {/**Phần Description sản phẩm
        1. Tên sản phẩm
        2. Số sao đanh giá và số lượng đã bán
        3. Giá, coin và hoàn trả
        4. Thời gian giao hàng
    */}
      {/** 1. Tên sản phẩm */}
      <div className={style.desc}>
        <p className={style.descName} title={data.name}>
          {data.name}
        </p>
        {/**Xử lí phần vote và số lượng đã bán
            1. Check sản phẩm xem có được vote hay không
            2. Nếu có thì in ra số vote và thêm icon Star
            3. In ra số lượng đã bán
      */}
        <div className={style.descVoteIsBought}>
          {/** 1 */}
          {data.isVote[0].checkVote ? (
            <div className={style.vote}>
              {/** 2 */}
              <span className={style.voteNumbers}>{data.isVote[1].vote}</span>
              <div className={style.iconStar}>
                <FontAwesomeIcon icon={faStar} style={{ color: "#fdd863" }} />
              </div>
              <span className={style.space}></span>
            </div>
          ) : (
            ""
          )}
          {/** 3 */}
          <span className={style.bought}>{soLuongDaBan}</span>
        </div>
        {/** Giá, coin, và hoàn tiền
              1. Kiểm tra sản phẩm có giảm giá không
              2. In ra giá và % giảm giá
              3. Coin, hoàn trả
      */}
        <div className={style.isPriceGiveRefundMoney}>
          {/** 1 */}
          <p
            className={
              checkPromote ? `${style.isPrice} ${style.promote}` : style.isPrice
            }
          >
            {data.isPrice}{" "}
            <span className={style.promoteSub}>
              {checkPromote ? `${data.isPromote[1].promote}%` : ""}
            </span>
          </p>
          {/** 2 */}
          <p className={style.isGiveValueOfGive}>
            Tặng tới {data.give} ASA (
            <span className={style.give}>
              {data.valueOfGive}
              <span className={style.effect}>đ</span>
            </span>
            )<div>≈{data.refundMoney}% hoàn tiền</div>
          </p>
        </div>
      </div>
      {/** Thời gian giao hàng
            1. Kiểm tra coi có hỗ trợ giao hàng NOW không -> true ->  in ra Icon Now
            2. In ra thời gian giao hàng
    */}
      <div className={style.timeShipWrapper}>
        <p className={style.timeShip}>
          {data.isShip[0].checkShipNOW && (
            <img
              src={require("./img/desciption/now.png")}
              style={{ width: 32, height: 16 }}
              alt=""
            />
          )}

          {data.isShip[0].checkShipNOW ? (
            <span>{thoiGianGiaoHang}</span>
          ) : !data.isShip[3].giaoNhanh ? (
            `Giao vào thứ ${data.isShip[1].shipDate}, ngày ${data.isShip[2].shipDay}`
          ) : (
            
             <span>{thoiGianGiaoHang}</span>
          )}

        </p>
      </div>
    </NavLink>
  );
}
