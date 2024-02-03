import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import ProductApi from '../../apis/product.api'

const ShopProductList = () => {
    const product_all = useQuery({
        queryKey: ['product-all'],
        queryFn: () => ProductApi.getAllProduct(),
        gcTime: 1000 * 10 * 60,
        staleTime: 1000 * 5 * 60,
    })

    useEffect(() => {
        if (product_all.isSuccess) {
            console.log({ product: product_all.data.data.metadata.product_all })
        }
    }, [product_all.isSuccess, product_all.data?.data.metadata.product_all])

    return (
        <div className='flex flex-col gap-[40px] w-full'>
            {product_all.data?.data.metadata.product_all.map((product) => (
                <React.Fragment key={product.product_id}>
                    <div className='flex flex-col xl:flex-row gap-[16px]  border-[2px] border-blue-700 p-[8px]'>
                        <div className='w-full xl:w-[36%] h-full  flex items-center justify-center'>
                            <img src={product.product_thumb_image.secure_url} className='w-[160px]  h-[160px]' alt='product' />
                        </div>

                        <div className='w-[100%] flex flex-col gap-[16px] '>
                            <span>{product.product_name}</span>
                            <span>{product.product_price}</span>
                            <div className='flex flex-wrap xl:flex-nowrap gap-[8px] justify-center xl:justify-normal'>
                                {product.product_desc_image.map((img) => (
                                    <img src={img.secure_url} className='' alt='sub' key={img.public_id} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[5px] bg-red-700'></div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ShopProductList
