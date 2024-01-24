import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartSlice } from '../../../../Redux/reducer'
import Location from '../../../Main/localtion/Location'
import ButtonQualityProducts from './Button/ButtonQuantityProducts'
import style from './hienThiSanPham.module.css'
import Shipper from './Shipper/Shipper'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

let productInitial = {
    name: '',
    ship: '',
    isPrice: 0,
    isPricePromote: 0,
    quantity: 0,
    bought: 0,
}

export default function HienThiSanPham({ sanPham }) {
    const [product, setProduct] = useState(productInitial)
    const [quantity, setQuantity] = useState(1)
    const [ship, setShip] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('useEffect')
        // console.log(math)

        setProduct((prev) => ({
            ...prev,
            id: sanPham.current?.id,
            name: sanPham.current?.name,
            image: sanPham.current.hinhAnh,
            bought: sanPham.current.isBought,
            promote: sanPham.current?.isPromote[1]?.promote ? sanPham.current?.isPromote[1]?.promote : 0,
            isPrice: Number(sanPham.current.isPrice),
            quantity: quantity,
            check: false,
            methodShip: '',
            isPricePromote:
                Number(sanPham.current.isPrice - (sanPham.current.isPrice / 100) * Number(sanPham.current?.isPromote[1]?.promote) * -1) ||
                0,
        }))
    }, [])

    //giá - (gia / 100) * promote
    let tile = product.promote ? product.promote * -1 : 1
    let giamGia = product.promote ? product?.isPrice - (product?.isPrice / 100) * tile : ''
    let image = product.image
    const handleQuantity = (quantity) => {
        // console.log(`số lượng sản phẩm mua:  ${quantity}`)
        // console.log('quantity', Number.isInteger(product.quantity))
        setQuantity(quantity)
        setProduct((prev) => ({
            ...prev,
            quantity: quantity,
        }))
    }

    const handleMethodShip = (nameShip) => {
        console.log(`Chọn phương thức giao hàng là: ${nameShip}`)
        setShip(nameShip)
        setProduct((prev) => ({
            ...prev,
            methodShip: nameShip,
        }))
    }

    const handleAddProduct = () => {
        // console.log('quantity', typeof product.quantity)
        // console.log('isPrice', typeof product.isPrice)

        // console.log(Number(product.isPrice) * Number(product.quantity))
        // alert(`Tên sản phẩm ${product.name} - ${product.isPrice} - ${product.quantity} -${giamGia}`)
        let productFinal = {
            id: product.id,
            name: product.name,
            image: image,
            isPrice: product.isPrice,
            quantity: product.quantity,
            isPriceWithPromote: giamGia,
            promote: product.promote !== 0 ? product.promote * -1 : 0,
            methodShip: product.methodShip,
            check: product.check,
        }
        console.log('Sẵn sàng dispatch')
        // dispatch(addProduct(productFinal))
        toast.success('Thêm vào giỏ hàng thành công', {
            autoClose: 1000,
        })
        console.log(productFinal)
        dispatch(cartSlice.actions.addProduct(productFinal))
    }

    return (
        <div className={style.buy} id='succes'>
            <div className={style.wrapperBuy}>
                <div className={style.pathTitle}>
                    <Link to='/' className={style.back}>
                        Trang chủ
                    </Link>

                    <ArrowForwardIosIcon className={style.icon} fontSize='12px'></ArrowForwardIosIcon>
                    <span className={style.current} title={sanPham.current?.name}>
                        {sanPham.current?.name}
                    </span>
                </div>
                <div className={style.products}>
                    <div className={style.productsImg}>
                        <img src={require(`../DanhSachSanPham/${sanPham.current.hinhAnh.slice(1)}`)} alt='' />
                    </div>
                    <div className={style.border_top}></div>
                    <div className={style.productsInfo}>
                        <div className={style.officalNameVoteBought}>
                            <div className={style.name}>
                                <span className={style.nameStyle} title={sanPham.current?.name}>
                                    {sanPham.current?.name}
                                    {sanPham.current.isVote[0].vote}
                                </span>
                            </div>
                            <div className={style.vote}>
                                {sanPham.current.isVote[0].checkVote === true ? (
                                    <Rating
                                        className={style.rank}
                                        size='small'
                                        name='half-rating-read'
                                        defaultValue={Number(sanPham.current.isVote[1].vote)}
                                        precision={0.5}
                                        readOnly
                                    />
                                ) : (
                                    ''
                                )}
                                <p>{sanPham.current.isVote[0].checkVote}</p>
                                <span
                                    style={{
                                        width: 1,
                                        height: 12,
                                        margin: '0 8px',
                                        backgroundColor: 'rgb(199, 199, 199)',
                                    }}
                                ></span>
                                <span className={style.bought}>
                                    {sanPham.current.isBought > 0 ? `Đã bán ${sanPham.current.isBought}` : ''}
                                </span>
                            </div>
                        </div>
                        <div className={style.products_down}>
                            <div className={style.products_down_wrapper}>
                                {/**Giá */}
                                <div className={style.pricePromoteGiveAstra}>
                                    <div className={style.wrapperPriceAstra}>
                                        <div className={style.wrapperPrice}>
                                            <span className={style.price}>{sanPham.current?.isPrice}</span>
                                            <span className={style.vnd}>đ</span>
                                            <span className={style.priceReal}>
                                                {sanPham.current?.isPromote[0]?.checkPromote
                                                    ? sanPham.current?.isPromote[1]?.promote + '%'
                                                    : ''}
                                            </span>
                                            <span>
                                                {sanPham.current.isPromote[0].checkPromote === false
                                                    ? ''
                                                    : sanPham.current.isPrice -
                                                      (sanPham.current.isPrice / 100) *
                                                          Math.round(Number(Number(sanPham.current.isPromote[1].promote) * -1)) +
                                                      ' đ'}
                                            </span>
                                        </div>
                                        <div className={style.astra}>
                                            <img
                                                src={require(`../DanhSachSanPham/img/desciption/iconAstra.png`)}
                                                alt=''
                                                width={13}
                                                height={16}
                                                className={style.astraHinhAnh}
                                            />
                                            <span>Thưởng</span>
                                            <span>{sanPham.current?.give} ASA </span>
                                            <span>(≈ {sanPham.current?.valueOfGive})</span>
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
                                    <span
                                        style={{
                                            marginRight: '3px',
                                        }}
                                    >
                                        Giao đến
                                    </span>
                                    <Location />{' '}
                                    <span
                                        style={{
                                            fontSize: '13px',
                                            marginLeft: '3px',
                                        }}
                                    >
                                        -
                                    </span>
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
                                    <img src={require('../DanhSachSanPham/img/desciption/iconLoa.png')} width={18} height={18} alt='' />
                                    <p>
                                        Bạn sẽ được Freeship 15.000 <span>đ</span>
                                    </p>
                                    <p>
                                        cho đơn hàng từ 149000 <span>đ</span>
                                    </p>
                                </div>
                                <div className={style.border_down}></div>
                                <ButtonQualityProducts getQuantity={handleQuantity} />
                                <div className='mt-6 mb-6'>
                                    <button className='w-full mb-[60px] h-full'>
                                        <a
                                            href='#succes'
                                            onClick={handleAddProduct}
                                            className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                                        >
                                            Mua
                                        </a>
                                    </button>
                                </div>
                            </div>

                            {/**Right */}
                            <div className={style.distributor}>
                                <div className={style.distributorInfo}>
                                    <img
                                        src={require('./logoTiki.webp')}
                                        className='w-12 h-12'
                                        style={{
                                            borderRadius: '50%',
                                        }}
                                        alt=''
                                    />
                                    <div className={style.distributorText}>
                                        <h1 className='text-slate-950	font-medium'>Tiki Trading</h1>
                                        <img
                                            src={require('../DanhSachSanPham/img/desciption/offical.png')}
                                            className='w-13a h-4 rounded'
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <div className={style.distributorInfoNumber}>
                                    <div className={style.distributorStartFollow}>
                                        <div className={style.distributorStartText}>
                                            <div>
                                                <span className='text-slate-950	font-medium'>4.7 / </span>
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    style={{
                                                        color: '#fdd863',
                                                    }}
                                                />
                                            </div>
                                            <span className='text-slate-950	font-medium'>478.4+</span>
                                        </div>
                                        <div className='flex px-8 justify-between text-xs text-slate-400'>
                                            <span>{`5.4tr+`}</span>
                                            <span>Theo dõi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-2 h-8 justify-between'>
                                    <button className='flex-1 border-2 border-soild border-sky-600 rounded-md'>
                                        <div className='flex justify-center items-center flex-row'>
                                            <img src={require('./iconHome.png')} className='w-5 h-5' alt='' />
                                            <span className='text-sky-500 font-medium'>Xem shop</span>
                                        </div>
                                    </button>
                                    <button className='flex-1  border-2 border-soild border-sky-600 rounded-md'>
                                        <div className='flex justify-center items-center flex-row'>
                                            <img src={require('./iconIncrease.png')} className='w-5 h-5' alt='' />
                                            <span className='text-sky-500 font-medium'>Theo dõi</span>
                                        </div>
                                    </button>
                                </div>
                                <hr />
                                <div className='flex flex-1 gap-3 justify-between'>
                                    <div className='flex flex-col gap-1 items-center justify-center'>
                                        <img src={require('./check.png')} className='w-8 h-8' alt='' />
                                        <p className='flex-1 text-sm  justify-center  break-words'>
                                            Hoàn toàn <span className='text-slate-950'>111%</span> nếu là hàng giả
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-1 items-center justify-center'>
                                        <img src={require('./like.png')} className='w-8 h-8' alt='' />
                                        <p className='flex-1 text-sm  justify-center  break-words'>Mở hộp kiểm tra nhận hàng</p>
                                    </div>
                                    <div className='flex flex-col gap-1 items-center justify-center'>
                                        <img src={require('./return.png')} className='w-8 h-8' alt='' />
                                        <p className='flex-1 text-sm justify-center   break-words'>
                                            Đổi trả trong <span className='text-slate-950'>30 ngày</span> nếu sp lỗi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
