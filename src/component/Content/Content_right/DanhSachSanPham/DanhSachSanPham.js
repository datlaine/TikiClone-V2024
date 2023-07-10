import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getListProducts } from '../../../../apis/getListProducts'
import style from './danhSachSanPham.module.css'

export default function DanhSachSanPham() {
  const [page, setPage] = useState(1)
  const [listSanPham, setlistSanPham] = useState([])
  const [reRender, setRender] = useState(false)
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['listProducts', page],
    queryFn: () => getListProducts(page),
    keepPreviousData: true,
  })

  const soLuongSanPham = Math.ceil(data?.headers['x-total-count'] / 6)
  console.log('>>>>checkTotalPage', data?.headers['x-total-count'])
  console.log('>>>checkSoTrangPage', soLuongSanPham)
  console.log('>>>checkPageCurrent', page)
  // console.log(data?.data)
  useLayoutEffect(() => {
    if (page === 1) {
      console.log('>>>checkPage!', page, isLoading, isSuccess)
      if (isSuccess) {
        console.log(data?.data)
        let newArray = [...data?.data]
        setlistSanPham(newArray)
      }
    } else {
      setRender(true)
    }
  }, [isLoading, isSuccess, page])
  
  const handleClick = () => {
    console.log('click')
    if (page - 1 <= soLuongSanPham) {
      setPage((prev) => prev + 1)
      if (page !== 1) {
        setlistSanPham((prev) => prev.concat(data?.data))
      }
    }
  }

  console.log('stateArr', listSanPham)
  console.log(page)
  console.log(' ')
  console.log(' ')
  console.log(' ')
  return (
    <>
      <div className='grid grid-cols-6 grid-rows-1 gap-x-4 gap-y-8 md:grid-cols2 lg: grid-cols-4'>
        <img
          src={require('../DanhSachSanPham/img/danhSach_1/itemSpe1.png')}
          alt=''
          className='col-span-2'
        />
        {isLoading && (
          <div class='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
            <div class='border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-60 w-60'></div>
          </div>
        )}
        {isSuccess &&
          listSanPham.map((list) => {
            return (
              <div className='flex flex-col dark:bg-gray-900' key={list.id} id='content'>
                <NavLink className={style.layoutImg} key={list.id} to={`/buy/${list.id}`}>
                  <div className={style.img}>
                    <img src={require(`../DanhSachSanPham${list.hinhAnh}`)} alt='' />
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
                            <FontAwesomeIcon icon={faStar} style={{ color: '#fdd863' }} />
                          </div>
                          <span className={style.space}></span>
                        </div>
                      ) : (
                        ''
                      )}
                      {/** 3 */}
                      <span className={style.bought}>{list.isBought}</span>
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
                          list.isPromote[0].checkPromote
                            ? `${style.isPrice} ${style.promote}`
                            : style.isPrice
                        }
                      >
                        {list.isPrice}{' '}
                        <span className={style.promoteSub}>
                          {list.isPromote[0].checkPromote ? `${list.isPromote[1].promote}%` : ''}
                        </span>
                      </p>
                      {/** 2 */}
                      <p className={style.isGiveValueOfGive}>
                        Tặng tới {list.give} ASA (
                        <span className={style.give}>
                          {list.valueOfGive}
                          <span className={style.effect}>đ</span>
                        </span>
                        )<div>≈{list.refundMoney}% hoàn tiền</div>
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
                          style={{ width: 32, height: 16 }}
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
                </NavLink>
              </div>
            )
          })}
      </div>

      {page - 1 === soLuongSanPham ? (
        <span className={style.btn}>Đã hết sản phẩm cần load</span>
      ) : (
        <button className={style.btn} onClick={handleClick}>
          Thêm sản phẩm
        </button>
      )}
    </>
  )
}
