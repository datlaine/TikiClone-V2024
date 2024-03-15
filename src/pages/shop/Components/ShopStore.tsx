import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ShopApi from '../../../apis/shop.api'

type TProps = {
      shop_id: string
}

const ShopStore = (props: TProps) => {
      const { shop_id } = props

      const getProductBestSell = useQuery({
            queryKey: ['get-product-seller'],
            queryFn: () => ShopApi.getProductFilter({ shop_id: shop_id as string, page: 1, limit: 2, sort: 'product_is_bought', inc: 1 }),
            enabled: !!shop_id,
      })

      console.log({ getProductBestSell })

      return <div className='w-full min-h-full h-max flex items-center justify-center'>ShopStore</div>
}

export default ShopStore
