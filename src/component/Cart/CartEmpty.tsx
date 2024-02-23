import React from 'react'
import CartEmptyImage from './img/cart_empty.png'
import SectionProduct from '../Content/Components/SectionProduct'
import TitleProductSection from '../Content/Components/TitleProductSection'
import CountDown from '../Content/Components/CountDown'
import SectionProductItem from '../Content/Components/SectionProductItem'

const CartEmpty = () => {
      return (
            <div className='w-[90%] flex flex-col gap-[16px]'>
                  <div className='w-full h-[250px]  bg-[#ffffff] rounded-md flex flex-col items-center gap-[16px] text-[20px]'>
                        <img className='w-[150px] h-[150px]' src={CartEmptyImage} alt='product_carts' />
                        <div className='flex flex-col items-center gap-[8px]'>
                              <span className='font-bold'>Giỏ hàng trống</span>
                              <span>Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên dưới nhé!</span>
                        </div>
                  </div>

                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<SectionProductItem />}
                  />
            </div>
      )
}

export default CartEmpty
