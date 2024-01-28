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

    return <div>ShopProductList</div>
}

export default ShopProductList
