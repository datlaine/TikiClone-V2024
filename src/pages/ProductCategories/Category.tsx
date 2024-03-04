import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SectionProductItem from '../../component/Content/Components/SectionProductItem'
import FeaturedCategory from './Components/FeaturedCategory'
import { useMutation, useQuery } from '@tanstack/react-query'
import NotFound from '../../component/Errors/NotFound'
import Product from '../product/Product'
import ProductApi from '../../apis/product.api'
import ShopCategory from './ShopCategory'
import { ShopResponse } from '../../types/shop.type'
import { ProductType, TProductDetail } from '../../types/product/product.type'
import ProductSection from './ProductSection'

const productBook = ['Sách tiếng Việt', 'Sách tiếng Anh', 'Truyện tranh', 'Tiểu thuyết', 'Ngôn tình', 'Sach giáo khoa']
const productFood = ['Đồ đóng hộp', 'Bia', 'Nước ngọt', 'Bánh kẹo', 'Snacks']

type TProps = {
      product_type: ProductType
}

const Category = (props: TProps) => {
      const { product_type } = props
      const [searchParams, setSearchParams] = useSearchParams()
      const [activeData, setActiveData] = useState<boolean>(true)
      const [categoryNotFound, setCategoryNotFound] = useState<string>('')
      // console.log(searchParams.get('page')?.toString())
      const getProductCategory = useQuery({
            queryKey: ['getAllProductWithType'],
            queryFn: () => ProductApi.getAllProductWithType({ product_type }),
      })

      const products = getProductCategory.data?.data.metadata.products

      console.log({ data: getProductCategory?.data?.data.metadata })
      useEffect(() => {
            if (getProductCategory.isSuccess) {
            }
      }, [getProductCategory.isSuccess])

      const shops = getProductCategory.data?.data.metadata.shops

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
                        <div className='hidden xl:flex w-[18%] max-w-[18%] h-[1000px] bg-[#ffffff] rounded-md flex-col gap-[16px]'>
                              <h3 className='text-center h-[60px] flex justify-center items-center'>Danh mục</h3>
                              <ul className='flex flex-col w-full h-max text-[12px]'>
                                    {productBook.map((p, index) => {
                                          return (
                                                <li
                                                      key={index}
                                                      className='w-full px-[16px] py-[10px] border-b-[2px] border-slate-100 '
                                                      onClick={() => onClickCategory(p)}
                                                >
                                                      {p}
                                                </li>
                                          )
                                    })}
                              </ul>
                        </div>
                        <div className='max-w-full xl:w-[81%] min-h-[1000px] h-max '>
                              {activeData ? (
                                    <header className='w-full min-h-full h-max flex flex-col gap-[28px] overflow-hidden'>
                                          <div className='p-[25px] w-full h-[60px] flex items-center bg-[#ffffff]'>
                                                <h1 className='text-[26px] font-extrabold text-slate-900'>Nhà sách Tiki</h1>
                                          </div>
                                          <div className='w-full'>
                                                <FeaturedCategory type={product_type} />
                                          </div>
                                          <div className=' w-full overflow-hidden min-h-[200px] h-max bg-[#ffffff]'>
                                                <ShopCategory shops={shops as ShopResponse[]} />
                                          </div>
                                          <div className='w-full h-max mt-[20px]'>
                                                <ProductSection products={products as TProductDetail[]} />
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
