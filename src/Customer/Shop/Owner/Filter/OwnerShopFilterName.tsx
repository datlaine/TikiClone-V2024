import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import ShopApi from '../../../../apis/shop.api'
import { Link } from 'react-router-dom'

const OwnerShopFilterName = () => {
    const getProductMyShop = useQuery({
        queryKey: ['get-product-my-shop'],
        queryFn: () => ShopApi.getProductMyShop(),
    })

    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div className='flex gap-[16px]'>
            {getProductMyShop.data?.data.metadata.myProductOfShop.map((product) => {
                return (
                    <div>
                        <img src={product?.product_thumb_image.secure_url} className='w-[150px] h-[150px]' alt='product' />
                        <Link to={`/product/${product?._id}`}>Link sản phẩm</Link>
                        <Link to={`/product/update-book/${product?._id}`}>Chỉnh sửa sản phẩm</Link>
                    </div>
                )
            })}
            <input type='text' defaultValue={123} ref={inputRef} />
            <button
                onClick={() => {
                    console.log(inputRef!.current?.value)
                }}
            >
                Ok
            </button>
        </div>
    )
}

export default OwnerShopFilterName
