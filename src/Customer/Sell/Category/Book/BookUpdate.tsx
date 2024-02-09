import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductApi from '../../../../apis/product.api'
import FormUpdateBook from '../../UpdateProductForm/FormUpdateBook'
import { TProductDetail } from '../../../../types/product.type'

export type TProps = {
    product_id: string
}

const BookUpdate = () => {
    const param = useParams()
    const { product_id } = param
    const getProductWithId = useQuery({
        queryKey: ['get-product-with-id', product_id],
        queryFn: () => ProductApi.getProductWithId({ id: product_id as string }),
    })

    const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined
    console.log({ product })

    useEffect(() => {}, [getProductWithId.data?.data.metadata.product])

    return (
        <div className='w-[1000px] mx-auto bg-white px-[20px] flex justify-center'>
            {getProductWithId.isSuccess && (
                <FormUpdateBook
                    product={product as TProductDetail}
                    defaultValues={getProductWithId.data.data.metadata.product}
                    public_id={getProductWithId.data.data.metadata.product.product_thumb_image.public_id}
                    public_id_array={getProductWithId.data.data.metadata.product.product_desc_image}
                />
            )}
        </div>
    )
}

export default BookUpdate
