import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import ProductApi from '../../apis/product.api'

const Buy = () => {
    const param = useParams()
    const { id } = param

    const getProductWithId = useQuery({
        queryKey: ['get-product-with-id', id],
        queryFn: () => ProductApi.getProductWithId({ id: id as string }),
    })

    return (
        <div>
            {getProductWithId.isSuccess && (
                <div className=''>
                    <img
                        src={getProductWithId.data.data.metadata.product.product_thumb_image.secure_url}
                        alt='product'
                        className='w-[350px] h-[350px]'
                    />
                </div>
            )}
        </div>
    )
}

export default Buy
