import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import ProductApi from '../../apis/product.api'

const ShopProductList = () => {
    const product_all = useQuery({
        queryKey: ['product-all'],
        queryFn: () => ProductApi.getAllProduct(),
    })

    useEffect(() => {
        if (product_all.isSuccess) {
            console.log({ product: product_all.data.data.metadata.product_all })
        }
    }, [product_all.isSuccess, product_all.data?.data.metadata.product_all])

    return (
        <div>
            {product_all.data?.data.metadata.product_all.map((product) => (
                <div className='flex flex-col gap-[16px]'>
                    <span>{product.product_name}</span>
                    <span>{product.product_price}</span>
                    <span>{product.product_id}</span>
                    <img src={product.product_thumb_image.secure_url} className='w-[50px] h-[50px]' alt='product' />
                    <div className='flex gap-[16px]'>
                        <img src={product.product_desc_image[0].secure_url} className='w-[50px] h-[50px]' alt='product' />
                        <img src={product.product_desc_image[1].secure_url} className='w-[50px] h-[50px]' alt='product' />
                        <img src={product.product_desc_image[2].secure_url} className='w-[50px] h-[50px]' alt='product' />
                        <img src={product.product_desc_image[3].secure_url} className='w-[50px] h-[50px]' alt='product' />
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ShopProductList
