import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Header from "../../../Header/header_main/Header";
import style from "./buy.module.css";
import {
  checkLabel,
  checkVote,
  getIsBought,
  getPriceAndPromote,
  checkShipperNow,
} from "./HandleData";
import Rating from "@mui/material/Rating";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MiniDanhSach from "../DanhSachSanPham/MiniDanhSach";
import Location from "../../../Main/localtion/Location";
import Shipper from "./Shipper/Shipper";
export default function Buy({ name, price }) {
  let result = useLocation();
  let state = result.state;
  document.title = `Mua ${state.name}`;
  console.log('>>>check' ,state)
  const { text, give, valueOfGive } = checkLabel(state.data && state.data);
  const checkNumberVote = checkVote(state.data && state.data);
  const isBought = getIsBought(state.data && state.data);
  console.log(isBought)
  const promote = getPriceAndPromote(state.data);
  const checkShipNow = checkShipperNow(state.data);
  const checkPromote = promote !== undefined ? true : false;
  console.log('>>> check promote', promote)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function textToSpeech(text) {
  //   let go = new SpeechSynthesisUtterance(text);
  //   console.log("alo");
  //   go.lang = "vi";
  //   go.volume = 0.5;
  //   go.pitch = 20;
  //   speechSynthesis.speak(go);
  // }

  // textToSpeech(`Sản phẩm ${state.name} có giá ${state.price} đồng`);

  console.log(text);
  console.log(`../DanhSachSanPham${state.data.hinhAnh.slice(1)}`);
  console.log(state.call);
  return (
    <div className={style.buy}>
      <Header></Header>
      <div className={style.wrapperBuy}>
        <div className={style.pathTitle}>
          <NavLink to="/" className={style.back}>
            Trang chủ
          </NavLink>

          <ArrowForwardIosIcon
            className={style.icon}
            fontSize="12px"
          ></ArrowForwardIosIcon>
          <span className={style.current} title={state.name}>{state.name}</span>
        </div>
        <div className={style.products}>
          <div className={style.productsImg}>
            <img
              src={require(`../DanhSachSanPham${state.data.hinhAnh.slice(1)}`)}
              alt=""
            />
          </div>
          <div className={style.border_top}></div>
          <div className={style.productsInfo}>
            <div className={style.officalNameVoteBought}>
              <p className={style.offical}>
                {" "}
                {text ? (
                  <span>
                    Thương hiệu
                    <span className={style.label}> {text}</span>
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className={style.name}>
                  <span className={style.nameStyle} title={state.name}>{state.data.name}</span>
              </div>
              <p className={style.vote}>
                {checkNumberVote > 0 ? (
                  <Rating
                    className={style.rank}
                    size="small"
                    name="half-rating-read"
                    defaultValue={checkNumberVote}
                    precision={0.5}
                    readOnly
                  />
                ) : (
                  ""
                )}
                <span
                  className={
                    checkNumberVote
                      ? style.bought
                      : `${style.bought} ${style.boughtFix}`
                  }
                >
                  {isBought}
                </span>
              </p>
            </div>
            <div className={style.products_down}>
              <div className={style.products_down_wrapper}>
                {/**Giá */}
                <div className={style.pricePromoteGiveAstra}>
                  <div className={style.wrapperPriceAstra}>
                    <div
                      className={
                        checkPromote
                          ? style.wrapperPrice
                          : `${style.wrapperPrice} ${style.wrapperPriceFake}`
                      }
                    >
                      <span className={style.price}>{state.data.isPrice}</span>
                      <span className={style.vnd}>đ</span>
                      <span className={style.priceReal}>
                        {promote === undefined ? state.data.isPrice : '' }
                      </span>
                      <span>
                        {checkPromote === false ? `${state.data.isPromote[1].promote}%` : ""}
                      </span>
                    </div>
                    <div
                      className={
                        !checkPromote
                          ? style.astra
                          : `${style.astra} ${style.astraPromote}`
                      }
                    >
                      <img
                        src={require(`../DanhSachSanPham/img/desciption/iconAstra.png`)}
                        alt=""
                        width={13}
                        height={16}
                        className={style.astraHinhAnh}
                      />
                      <span>Thưởng</span>
                      <span>{give} ASA </span>
                      <span>(≈ {valueOfGive})</span>
                      <img
                        className={style.iconNew}
                        src={require(`../DanhSachSanPham/img/desciption/new.gif`)}
                        alt=""
                        width={42}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
                <div className={style.border_down}></div>
                <div className={style.location_wrapper}>
                  <span style={{ marginRight: "3px" }}>Giao đến</span>
                  <Location />{" "}
                  <span style={{ fontSize: "13px", marginLeft: "3px" }}>-</span>
                  {"  "}
                  <div className={style.location_a}>
                    <Link
                      to={"/changeAddress"}
                      style={{
                        color: "rgb(11, 116, 229)",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Đổi địa chỉ
                    </Link>
                  </div>
                </div>
                <div className={style.wrapperShipper}>
                  {checkShipNow ? (
                    <>
                      <Shipper
                        Now={checkShipNow}
                        timeShip={state.timeShip}
                        isDate={state.date}
                        isDay={state.day}
                        fastShip={false}
                      />

                      <Shipper
                        Now={true}
                        timeShip={state.timeShip}
                        isDate={state.date}
                        isDay={state.day}
                        fastShip={true}
                      />
                    </>
                  ) : (
                    <>
                      <Shipper
                        Now={false}
                        timeShip={state.timeShip}
                        isDate={state.date}
                        isDay={state.day}
                        fastShip={true}
                        tietKiem={true}
                      />
                      <Shipper
                        Now={false}
                        timeShip={state.timeShip}
                        isDate={state.date}
                        isDay={state.day}
                        fastShip={true}
                        tietKiem={false}
                      />
                    </>
                  )}
                </div>
                <div className={style.border_down}></div>
                <div className={style.moneyFreeShip}>
                    <img src={require('../DanhSachSanPham/img/desciption/iconLoa.png')} width={18} height={18} alt="" />
                    <p>Bạn sẽ được Freeship 15.000 <span>đ</span></p>
                    <p>cho đơn hàng từ 149000 <span>đ</span></p>
                    </div>
                    <div className={style.border_down}></div>
              </div>

              {/**Right */}
              <div
                style={{ backgroundColor: "red" }}
                className={style.distributor}
              >
                Test
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniDanhSach
        colums={[1, 7]}
        rows={[1, 2]}
        call={state.call && state.call}
      />
    </div>
  );
}
