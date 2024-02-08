import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import ShopApi, { TShop } from '../../../apis/shop.api'
import OwnerSkeleton from './OwnerSkeleton'
import OwnerLayout from './OwnerLayout'

const Owner = () => {
    const getMyShopApi = useQuery({
        queryKey: ['get-my-shop'],
        queryFn: () => ShopApi.getMyShop(),
    })
    const shop = getMyShopApi.data?.data.metadata.shop as TShop

    useEffect(() => {
        if (getMyShopApi.isSuccess) {
            const { shop } = getMyShopApi.data.data.metadata
            console.log({ shop })
        }
    }, [getMyShopApi.isSuccess])

    return (
        <div className='w-full h-auto'>
            {getMyShopApi.isSuccess && <OwnerLayout shop={shop} />}
            {getMyShopApi.isPending && <OwnerSkeleton />}
            {/* <OwnerSkeleton /> */}
        </div>
    )
}

export default Owner
