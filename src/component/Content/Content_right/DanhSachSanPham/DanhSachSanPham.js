import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react'
import { useMatch } from 'react-router-dom'
import { getListProducts } from '../../../../apis/getListProducts'
import AboutTiki from '../../../AboutTiki/AboutTiki'
import style from './danhSachSanPham.module.css'
import { debounce } from 'lodash'

const DanhSachSanPham = ({ handlePositionButton }) => {

  //các state của cpn
  const [page, setPage] = useState(1)
  const [listSanPham, setlistSanPham] = useState([])
  const product = useRef(null)
  const refBtn = useRef(null)
  const soLuongSanPham = useRef(null)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['listProducts', page],
    queryFn: () => getListProducts(page),
    onSuccess: (data) => {
      setlistSanPham((prev) => prev.concat(data.data))
      product.current = listSanPham
      soLuongSanPham.current = Math.ceil(data?.headers['x-total-count'] / 30)
    },
    keepPreviousData: true,
  })

  useEffect(() => {
    const check =() => {
      if (refBtn.current) {
        const btn = refBtn.current.getBoundingClientRect()
        if (btn.top !== 0 && btn.bottom !== 0) {
          handlePositionButton(btn.top, btn.bottom)
        }
      } else return
    }
    
    window.addEventListener('scroll', check)

    return () => {
      window.removeEventListener('click', check)
    }
  }, [])



  // nút thêm sản phẩm
  const handleClick = () => {
    if (page < soLuongSanPham.current) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <>
      <div className={style.danhSachSanPham}>
        <img src={require('../DanhSachSanPham/img/danhSach_1/itemSpe1.png')} alt='' className={style.hinhAnh} />

        {isSuccess &&
          listSanPham.map((list) => {
            return (
              <div className={style.sanPhamWrapper} key={list.id}>
                <a className={`${style.layoutImg}`} key={list.id} href={`/buy/${list.id}`}>
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
                </a>
              </div>
            )
          })}
      </div>

      {isSuccess && page === soLuongSanPham.current ? (
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

export default memo(DanhSachSanPham)
