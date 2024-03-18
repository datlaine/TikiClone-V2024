import React from 'react'
import ProductSlider from './ProductSlider'
import ProductTopSellQuery from './ProductTopSellQuery'
import ProductBestSellerRank from './ProductBestSellerRank'
import ShopProductAll from './ShopProductAll'

type TProps = {
      shop_id: string
}

const ShopStore = (props: TProps) => {
      const { shop_id } = props

      const Layout = ProductTopSellQuery<{ TransitionTime: number }>({
            shop_id,
            limit: 10,
            sort: 'product_is_bought',
            inc: -1,
            Component: ProductSlider,
      })

      const LayoutTopRank = ProductTopSellQuery({
            shop_id,
            limit: 3,
            sort: 'product_is_bought',
            inc: -1,
            Component: ProductBestSellerRank,
      })

      console.log('re-render')

      return (
            <div className='flex flex-col gap-[16px]'>
                  <div className='mx-[10px] xl:mx-0 h-[300px] xl:h-[500px] flex items-center justify-center xl:block'>
                        <Layout TransitionTime={3} />
                  </div>
                  <div className='min-w-full min-h-full h-max flex flex-col gap-[50px] overflow-x-auto'>
                        <LayoutTopRank />
                  </div>
                  <ShopProductAll shop_id={shop_id} searchName='' mode='Normal' />

                  <div className='w-full h-[500px] bg-yellow-400'></div>
            </div>
      )
}

export default ShopStore
