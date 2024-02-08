import React, { useState } from 'react'
import { TShop } from '../../../apis/shop.api'
import OwnerShopFilterName from './Filter/OwnerShopFilterName'

type TProps = {
    shop: TShop
}

type FilterMode = 'NAME' | 'TYPE' | 'BEST_SELLER'

const OwnerLayout = (props: TProps) => {
    const { shop } = props
    const [filterMode, setfilterMode] = useState<FilterMode>()

    return (
        <div className='relative w-full min-h-[200px] h-max flex flex-col'>
            <div className='w-full h-[100px] bg-white flex items-center justify-center'>
                <p className='tracking-[4px] text-[18px]'>{shop.shop_name}</p>
            </div>
            <div className='relative w-full h-[120px] bg-[#FFA500] flex items-center'>
                <div className='absolute top-[-50%]  left-[60px] bg-green-800 h-[140px] w-[140px] rounded-full'>
                    <img src={shop.shop_avartar_default} className='h-full w-full rounded-full' alt='shop_image' />
                </div>

                <ul className='ml-[240px] flex min-h-[40px] items-center gap-[16px]'>
                    <li
                        className='px-[16px] py-[12px]  bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                        onClick={() => setfilterMode('NAME')}
                    >
                        Sản phẩm của Shop
                    </li>
                    <li
                        className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                        onClick={() => setfilterMode('TYPE')}
                    >
                        Sắp xếp theo loại
                    </li>
                    <li
                        className='px-[16px] py-[12px] bg-white  rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-500'
                        onClick={() => setfilterMode('BEST_SELLER')}
                    >
                        Các sản phẩm bán chạy
                    </li>
                </ul>
            </div>

            <div className=' w-full h-max mt-[16px]'>{filterMode === 'NAME' && <OwnerShopFilterName />}</div>
        </div>
    )
}

export default OwnerLayout
