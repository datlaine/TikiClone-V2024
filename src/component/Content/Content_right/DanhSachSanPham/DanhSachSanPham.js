import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { getListProducts } from '../../../../apis/getListProducts'
import AboutTiki from '../../../AboutTiki/AboutTiki'
import style from './danhSachSanPham.module.css'

export default function DanhSachSanPham({ handlePositionButton }) {
  const [page, setPage] = useState(1)
  const match = useMatch('/')
  const [listSanPham, setlistSanPham] = useState([])
  const product = useRef(null)
  const refBtn = useRef(null)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['listProducts', page],
    queryFn: () => getListProducts(page),
    onSuccess: (data) => {
      setlistSanPham((prev) => prev.concat(data.data))
      product.current = listSanPham
    },
    keepPreviousData: true,
  })

  useEffect(() => {
    const check = () => {
      if (refBtn.current) {
        const btn = refBtn.current.getBoundingClientRect()
        if (btn.top !== 0 && btn.bottom !== 0) {
          console.log(`tọa độ btn TOP_BOTTOM ${btn.top} ${btn.bottom}`)
          handlePositionButton(btn.top, btn.bottom)
        }
        // if (match) {
        // }
      } else return
    }

    window.addEventListener('scroll', check)

    return () => {
      window.removeEventListener('click', check)
    }
  }, [])

  const soLuongSanPham = Math.ceil(data?.headers['x-total-count'] / 30)
  // console.log('>>>>checkTotalPage', data?.headers['x-total-count'])
  // console.log('>>>checkSoTrangPage', soLuongSanPham)
  // console.log('>>>checkPageCurrent', page)
  // console.log(data?.data)
  // useLayoutEffect(() => {
  //   console.log('hooks')
  //   if (page === 1) {
  //     // console.log('>>>checkPage!', page, isLoading, isSuccess)
  //     if (isSuccess) {
  //       console.log(data?.data)
  //       let newArray = [...data?.data]
  //       setlistSanPham(newArray)
  //     }
  //   }
  // }, [isLoading, isSuccess, page])

  const handleClick = () => {
    // console.log('click')
    if (page < soLuongSanPham) {
      setPage((prev) => prev + 1)
    }
    refBtn.current.focus()
    // if (page - 1 <= soLuongSanPham) {
    // if (page !== 1) {
    //   setlistSanPham((prev) => prev.concat(data?.data))
    // }
    // }
  }

  
  useEffect(() => {
    // Thực hiện cuộn lên đầu trang khi component được render
    // window.scrollTo(0, 0);

    // Hoặc có thể sử dụng cú pháp này:
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth', // Nếu muốn có hiệu ứng cuộn mượt
    })
  }, [])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  // console.log('stateArr', listSanPham)
  // console.log(page)
  // console.log(' ')
  // console.log(' ')
  // console.log(' ')
  return (
    <>
      <div className={style.danhSachSanPham}>
        <img src={require('../DanhSachSanPham/img/danhSach_1/itemSpe1.png')} alt='' className={style.hinhAnh} />

        {isSuccess &&
          listSanPham.map((list) => {
            return (
              <div className={style.sanPhamWrapper} key={list.id}>
                <Link
                  className={`${style.layoutImg}`}
                  key={list.id}
                  to={`/buy/${list.id}`}
                >
                  <div className={`${style.img}`}>
                    <img src={require(`../DanhSachSanPham${list.hinhAnh}`)} alt='' className={style.imageProduct} />
                  </div>
                  {/**từ phần tử thứ 2 */}
                  {/**check xem sản phẩm có nhãn hàng không - nếu có thì thêm hình nhãn */}
                  {list.isLabel[0].checkLabel && (
                    <img
                      src={require(`${list.isLabel[1].label}`)}
                      className={style[`${list.isLabel[2].nameLabel}`]}
                      alt=''
                    />
                  )}

                  {list.astraLabel[0].checkAstra && (
                    <img
                      src={require(`${list.astraLabel[1].hinhAnhAstra}`)}
                      className={style[`${list.astraLabel[2].nameLabel}`]}
                      alt=''
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
                    <p className={style.descName} title={list.name}>
                      {list.name}
                    </p>
                    {/**Xử lí phần vote và số lượng đã bán
                    1. Check sản phẩm xem có được vote hay không
                    2. Nếu có thì in ra số vote và thêm icon Star
                    3. In ra số lượng đã bán
              */}
                    <div className={style.descVoteIsBought}>
                      {/** 1 */}
                      {list.isVote[0].checkVote ? (
                        <div className={style.vote}>
                          {/** 2 */}
                          <span className={style.voteNumbers}>{list.isVote[1].vote}</span>
                          <div className={style.iconStar}>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{
                                color: '#fdd863',
                              }}
                            />
                          </div>
                          <span
                            style={{ width: 1, height: 9, margin: '0 8px', backgroundColor: 'rgb(199, 199, 199)' }}
                          ></span>
                        </div>
                      ) : (
                        ''
                      )}
                      {/** 3 */}
                      <span className={style.bought}>{list.isBought > 0 ? `Đã bán ${list.isBought}` : null}</span>
                    </div>
                    {/** Giá, coin, và hoàn tiền
                      1. Kiểm tra sản phẩm có giảm giá không
                      2. In ra giá và % giảm giá
                      3. Coin, hoàn trả
              */}
                    <div className={style.isPriceGiveRefundMoney}>
                      {/** 1 */}
                      <p
                        className={list.isPromote[0].checkPromote ? `${style.isPrice} ${style.promote}` : style.isPrice}
                      >
                        {list.isPrice}{' '}
                        <span className={style.promoteSub}>
                          {list.isPromote[0].checkPromote ? `${list.isPromote[1].promote}%` : ''}
                        </span>
                      </p>
                      {/** 2 */}
                      <p className={`${style.isGiveValueOfGive} ${style.give} ${style.effect} ${data.valueOfGive}`}>
                        Tặng tới {data.give} ASA đ % hoàn tiền
                      </p>
                    </div>
                  </div>
                  {/** Thời gian giao hàng
                    1. Kiểm tra coi có hỗ trợ giao hàng NOW không -> true ->  in ra Icon Now
                    2. In ra thời gian giao hàng
            */}
                  <div className={style.timeShipWrapper}>
                    <p className={style.timeShip}>
                      {list.isShip[0].checkShipNOW && (
                        <img
                          src={require('./img/desciption/now.png')}
                          style={{
                            width: 32,
                            height: 16,
                          }}
                          alt=''
                        />
                      )}

                      {list.isShip[0].checkShipNOW ? (
                        <span>{list.shipDay}</span>
                      ) : !list.isShip[3].giaoNhanh ? (
                        `Giao vào thứ ${list.isShip[1].shipDate}, ngày ${list.isShip[2].shipDay}`
                      ) : (
                        <span>{list.shipDay}</span>
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>

      {!isLoading && page === soLuongSanPham ? (
        <span className={style.btn} ref={refBtn}>
          Đã hết sản phẩm cần load
        </span>
      ) : (
        <button className={style.btn} onClick={handleClick} ref={refBtn}>
          Thêm sản phẩm
        </button>
      )}
      <AboutTiki />
    </>
  )
}
