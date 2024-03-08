import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FeaturedCategory from './Components/FeaturedCategory'
import NotFound from '../../component/Errors/NotFound'
import { ProductType } from '../../types/product/product.type'
import ProductSection from './ProductSection'
import FilterWrapper from './Components/FilterWrapper'
import ShopCategory from './ShopCategory'
import { Cat } from 'lucide-react'
import CategoryTitle from './Components/CategoryTitle'

const productBook = ['Sách tiếng Việt', 'Sách tiếng Anh', 'Truyện tranh', 'Tiểu thuyết', 'Ngôn tình', 'Sach giáo khoa']
const productFood = ['Đồ đóng hộp', 'Bia', 'Nước ngọt', 'Bánh kẹo', 'Snacks']

type TProps = {
      product_type: ProductType
}

const onSetTitleProductType = ({ product_type }: { product_type: ProductType }): string[] => {
      switch (product_type) {
            case 'Book':
                  return productBook
            case 'Food':
                  return productFood
            default:
                  return []
      }
}

const Category = (props: TProps) => {
      const { product_type } = props
      const [activeData, setActiveData] = useState<boolean>(true)
      const [categoryNotFound, setCategoryNotFound] = useState<string>('')

      const onClickCategory = (nameCategory: string) => {
            setCategoryNotFound(nameCategory)
            setActiveData(false)
      }
      const onBack = () => {
            setActiveData(true)
      }

      return (
            <div className='w-[1450px] mx-auto flex flex-col gap-[24px] px-[20px] xl:px-0 mt-[70px] mb-[70px] xl:mt-0 text-[14px]'>
                  <Link to={'/'} className=''>
                        Trang chủ
                  </Link>
                  <div className='w-full h-max flex  gap-[24px]'>
                        <CategoryTitle title={onSetTitleProductType({ product_type })} onGetNameCategory={onClickCategory} />
                        <div className='max-w-full w-full xl:w-[81%] min-h-[1000px] h-max '>
                              {activeData ? (
                                    <header className='w-full min-h-full h-max flex flex-col gap-[28px] overflow-hidden'>
                                          <div className='p-[25px] w-full h-[60px] flex items-center bg-[#ffffff]'>
                                                <h1 className='text-[26px] font-extrabold text-slate-900'>Nhà sách Tiki</h1>
                                          </div>
                                          <div className='w-full'>
                                                <FeaturedCategory type={product_type} />
                                          </div>
                                          <div className=' w-full overflow-hidden min-h-[200px] h-max bg-[#ffffff]'>
                                                <ShopCategory product_type={product_type} />
                                          </div>
                                          <div className='w-full  h-[80px] flex items-center bg-[#ffffff] px-[8px]'>
                                                <FilterWrapper product_type={product_type} />
                                          </div>
                                          <div className='w-full h-max mt-[20px]'>
                                                <ProductSection product_type={product_type} />
                                          </div>
                                    </header>
                              ) : (
                                    <div className='min-w-full w-full  h-[500px]'>
                                          <NotFound
                                                ContentHeader={`Danh mục ${categoryNotFound} chưa được xây dựng`}
                                                countTime={false}
                                                onBack={onBack}
                                          />
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      )
}

export default Category
