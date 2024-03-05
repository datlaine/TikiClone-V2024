import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import ShopApi from '../../../apis/shop.api'
import OwnerSkeleton from './OwnerSkeleton'
import OwnerLayout from './ShopOwnerLayout'
import { ShopResponse } from '../../../types/shop.type'
import ShopOwnerLayout from './ShopOwnerLayout'

const ShopOwner = () => {
      const getMyShopApi = useQuery({
            queryKey: ['get-my-shop'],
            queryFn: () => ShopApi.getMyShop(),
      })
      const shop = getMyShopApi.data?.data.metadata.shop as ShopResponse

      return (
            <div className='w-full h-auto'>
                  {getMyShopApi.isSuccess && <ShopOwnerLayout shop={shop} />}
                  {getMyShopApi.isPending && <OwnerSkeleton />}
                  {/* <OwnerSkeleton /> */}
            </div>
      )
}

export default ShopOwner
