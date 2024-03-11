import { useQuery } from '@tanstack/react-query'
import { SetStateAction, memo } from 'react'
import ProductApi from '../../../apis/product.api'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

type Props = {
      onReset: () => void
      text: string
}

const HeaderResultSearch = (props: Props) => {
      const { text, onReset } = props
      console.log({ text })

      const searchQuery = useQuery({
            queryKey: ['/v1/api/product/get-product-shop-name', text],
            queryFn: () => ProductApi.getProductShopName({ text }),
            enabled: Boolean(text),
      })

      const products = searchQuery.data?.data.metadata.products
      const shops = searchQuery.data?.data.metadata.shops

      const onNavigate = () => {
            // setText('')
            onReset()
      }

      return (
            <>
                  <div className=' absolute left-0 top-full right-0  m-h-25 overflow-hidden  rounded-[2px]  bg-white border-[1px] border-solid border-[#ccc] min-h-55 z-[9999] min-h-[400px]'>
                        <div className='sanPhamTheoTen dienThoai:my-2 flex flex-col gap-y-2 overflow-hidden'>
                              {!text && <span className='p-2 opacity-50'>Hãy nhập tìm kiếm</span>}
                              {searchQuery.isSuccess && (
                                    <div className='px-[20px] min-h-[40px] h-max bg-[#ffffff] flex flex-col gap-[8px] justify-center'>
                                          {products &&
                                                products.length > 0 &&
                                                products.map((product) => (
                                                      <Link
                                                            key={product._id}
                                                            to={`/product/${product._id}`}
                                                            className='flex gap-[8px]'
                                                            onClick={onNavigate}
                                                      >
                                                            <Search className='text-slate-400' />
                                                            <span>{product.product_name}</span>
                                                      </Link>
                                                ))}

                                          {shops &&
                                                shops.length > 0 &&
                                                shops.map((shop) => (
                                                      <Link key={shop._id} to={`/shop/${shop._id}`}>
                                                            {shop.shop_name}
                                                      </Link>
                                                ))}

                                          {products?.length === 0 && shops?.length === 0 && <span>Không tìm thấy kết quả</span>}
                                    </div>
                              )}
                        </div>
                  </div>
            </>
      )
}

export default memo(HeaderResultSearch)
