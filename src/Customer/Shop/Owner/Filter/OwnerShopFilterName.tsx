import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import ShopApi from '../../../../apis/shop.api'
import { Link } from 'react-router-dom'
import DeleteProduct from '../../components/DeleteProduct'

const OwnerShopFilterName = () => {
      const getProductMyShop = useQuery({
            queryKey: ['get-product-my-shop'],
            queryFn: () => ShopApi.getProductMyShop(),
      })

      const [modalDeleteProduct, setModalDeleteProduct] = useState<boolean>(false)

      const handleControllModalDeleteProduct = () => {
            setModalDeleteProduct(true)
      }

      return (
            <div className='flex gap-[16px] flex-wrap'>
                  {getProductMyShop.data?.data.metadata.myProductOfShop.map((product) => {
                        return (
                              <div className='flex min-w-[25%] flex-col gap-[16px]'>
                                    <img
                                          src={product?.product_thumb_image?.secure_url || ''}
                                          className='w-[150px] h-[150px]'
                                          alt='product'
                                    />
                                    <Link to={`/product/${product?._id}`}>Link sản phẩm</Link>
                                    <Link to={`/product/update-book/${product?._id}`}>Chỉnh sửa sản phẩm</Link>
                                    <span className='text-red-800 underline' onClick={handleControllModalDeleteProduct}>
                                          Xóa sản phẩm
                                    </span>

                                    {modalDeleteProduct && (
                                          <DeleteProduct
                                                product_id={product?._id as string}
                                                setModalDeleteProduct={setModalDeleteProduct}
                                          />
                                    )}
                              </div>
                        )
                  })}
            </div>
      )
}

export default OwnerShopFilterName
