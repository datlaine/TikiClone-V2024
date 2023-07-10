import React, { Fragment, useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import Header from '../../../Header/header_main/Header'
import style from './buy.module.css'
import { checkLabel, checkVote, getPriceAndPromote, checkShipperNow } from './HandleData'
import Rating from '@mui/material/Rating'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Location from '../../../Main/localtion/Location'
// import Shipper from './Shipper/Shipper'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../../../../apis/getProduct'
import Shipper from './Shipper/Shipper'
import ButtonQualityProducts from './Button/ButtonQuantityProducts'

let productInitial = {
  name: '',
  ship: '',
  isPrice: 0,
  isPricePromote: 0,
  quantity: 0,
  bought: 0,
}

export default function Buy() {
  const { id } = useParams()
  const [product, setProduct] = useState(productInitial)
  const [quantity, setQuantity] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })
  let textGB, giveGB, valueOfGiveGB, checkNumberVoteGB, promoteGB

  useEffect(() => {
    if (!isLoading) {
      document.title = `Mua ${data.data[0].name}`
      const { text, give, valueOfGive } = checkLabel(data && data)
      let checkNumberVote = checkVote(data && data)
      let promote = getPriceAndPromote(data && data)
      textGB = text
      giveGB = give
      valueOfGiveGB = valueOfGive
      checkNumberVoteGB = checkNumberVote
      promoteGB = promote
      console.log('useEffect')
      setProduct((prev) => ({
        ...prev,
        name: data?.data[0].name,
        bought: data?.data[0].isBought,
        promote: data?.data[0]?.isPromote[1]?.promote ? data?.data[0]?.isPromote[1]?.promote : 0,
        isPrice: Number(data?.data[0].isPrice * quantity),
        quantity: quantity,
        isPricePromote:
          Number(
            Number(
              data?.data[0].isPrice - (data?.data[0].isPrice / 100) * Number(data?.data[0]?.isPromote[1]?.promote) * -1,
            ),
          ) || 0,
      }))
    }
  }, [isLoading, quantity])

  const checkPromote = promoteGB !== undefined ? true : false


  const handleQuantity = (quantity) => {
    // console.log(`số lượng sản phẩm mua:  ${quantity}`)
    // console.log('quantity', Number.isInteger(product.quantity))
    setQuantity(quantity)
    setProduct((prev) => ({ ...prev, quantity: quantity }))
  }

  const handleMethodShip = (nameShip) => {
    console.log(`Chọn phương thức giao hàng là: ${nameShip}`)
    setProduct((prev) => ({ ...prev, ship: nameShip }))
  }

  const handleAddProduct = () => {
    // console.log('quantity', typeof product.quantity)
    // console.log('isPrice', typeof product.isPrice)

    // console.log(Number(product.isPrice) * Number(product.quantity))
    console.log(product)
    
  }

  return (
    <Fragment>
      {isLoading && (
        <div className='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
          <div className='border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-60 w-60' />
        </div>
      )}
      {!isLoading && (
        <div className={style.buy}>
          <Header></Header>
          <div className={style.wrapperBuy}>
            <div className={style.pathTitle}>
              <NavLink to='/' className={style.back}>
                Trang chủ
              </NavLink>

              <ArrowForwardIosIcon className={style.icon} fontSize='12px'></ArrowForwardIosIcon>
              <span className={style.current} title={data.data[0]?.name}>
                {data.data[0]?.name}
              </span>
            </div>
            <div className={style.products}>
              <div className={style.productsImg}>
                <img src={require(`../DanhSachSanPham/${data.data[0].hinhAnh.slice(1)}`)} alt='' />
              </div>
              <div className={style.border_top}></div>
              <div className={style.productsInfo}>
                <div className={style.officalNameVoteBought}>
                  <div className={style.offical}>
                    {' '}
                    {textGB ? (
                      <span>
                        Thương hiệu
                        <span className={style.label}> {textGB}</span>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className={style.name}>
                    <span className={style.nameStyle} title={data.data[0]?.name}>
                      {data.data[0]?.name}
                      {data.data[0].isVote[0].vote}
                    </span>
                  </div>
                  <div className={style.vote}>
                    {data.data[0].isVote[0].checkVote === true ? (
                      <Rating
                        className={style.rank}
                        size='small'
                        name='half-rating-read'
                        defaultValue={Number(data.data[0].isVote[1].vote)}
                        precision={0.5}
                        readOnly
                      />
                    ) : (
                      ''
                    )}
                    <p>{data.data[0].isVote[0].checkVote}</p>
                    <span
                      className={
                        checkNumberVoteGB ? style.bought : `${style.bought} ${style.boughtFix}`
                      }
                    >
                      {data.data[0].isBought > 0 ? `Đã bán ${data.data[0].isBought}` : ''}
                    </span>
                  </div>
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
                          <span className={style.price}>{data.data[0]?.isPrice}</span>
                          <span className={style.vnd}>đ</span>
                          <span className={style.priceReal}>
                            {promoteGB === undefined
                              ? data.data[0]?.isPromote[1]?.promote
                                ? data.data[0]?.isPromote[1]?.promote + '%'
                                : ''
                              : ''}
                          </span>
                          <span>
                            {data.data[0].isPromote[0].checkPromote === false
                              ? ''
                              : data.data[0].isPrice -
                                (data.data[0].isPrice / 100) *
                                  Number(data.data[0].isPromote[1].promote) *
                                  -1 +
                                ' đ'}
                          </span>
                        </div>
                        <div
                          className={
                            !checkPromote ? style.astra : `${style.astra} ${style.astraPromote}`
                          }
                        >
                          <img
                            src={require(`../DanhSachSanPham/img/desciption/iconAstra.png`)}
                            alt=''
                            width={13}
                            height={16}
                            className={style.astraHinhAnh}
                          />
                          <span>Thưởng</span>
                          <span>{giveGB} ASA </span>
                          <span>(≈ {valueOfGiveGB})</span>
                          <img
                            className={style.iconNew}
                            src={require(`../DanhSachSanPham/img/desciption/new.gif`)}
                            alt=''
                            width={42}
                            height={20}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={style.border_down}></div>
                    <div className={style.location_wrapper}>
                      <span style={{ marginRight: '3px' }}>Giao đến</span>
                      <Location /> <span style={{ fontSize: '13px', marginLeft: '3px' }}>-</span>
                      {'  '}
                      <div className={style.location_a}>
                        <Link
                          to={'/changeAddress'}
                          style={{
                            color: 'rgb(11, 116, 229)',
                            textDecoration: 'none',
                            fontWeight: '600',
                          }}
                        >
                          Đổi địa chỉ
                        </Link>
                      </div>
                    </div>
                    <div className={style.wrapperShipper}>
                      <Shipper getMethodShip={handleMethodShip} />
                    </div>
                    <div className={style.border_down}></div>
                    <div className={style.moneyFreeShip}>
                      <img
                        src={require('../DanhSachSanPham/img/desciption/iconLoa.png')}
                        width={18}
                        height={18}
                        alt=''
                      />
                      <p>
                        Bạn sẽ được Freeship 15.000 <span>đ</span>
                      </p>
                      <p>
                        cho đơn hàng từ 149000 <span>đ</span>
                      </p>
                    </div>
                    <div className={style.border_down}></div>
                    <ButtonQualityProducts getQuantity={handleQuantity} />
                    <div className='mt-6'>
                      <a
                        href='#'
                        onClick={handleAddProduct}
                        className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                      >
                        Mua
                      </a>
                    </div>
                  </div>

                  {/**Right */}
                  <div style={{ backgroundColor: 'red' }} className={style.distributor}>
                    Test
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
