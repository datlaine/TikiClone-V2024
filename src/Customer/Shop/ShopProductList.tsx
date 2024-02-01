import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import ProductApi from '../../apis/product.api'

const ShopProductList = () => {
    const product_all = useQuery({
        queryKey: ['product-all'],
        queryFn: () => ProductApi.getAllProduct(),
        staleTime: 10000,
    })

    useEffect(() => {
        if (product_all.isSuccess) {
            console.log({ product: product_all.data.data.metadata.product_all })
        }
    }, [product_all.isSuccess, product_all.data?.data.metadata.product_all])

    return (
        <div>
            {product_all.data?.data.metadata.product_all.map((product) => (
                <div className='flex gap-[16px] h-[100px]'>
                    <div className='h-full w-[50px]'>
                        <img src={product.product_thumb_image.secure_url} className='w-[50px] h-full' alt='product' />
                    </div>

                    <div className='flex-1 flex flex-col gap-[16px]'>
                        <span>{product.product_name}</span>
                        <span>{product.product_price}</span>
                    </div>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ShopProductList
