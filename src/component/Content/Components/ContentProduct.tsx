import { useInViewport } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useRef } from 'react'
import ProductApi from '../../../apis/product.api'
import ProductMedium from './ProductMedium'
import { Link } from 'react-router-dom'
import ProductShopInfo from '../../../pages/product/Components/ProductShopInfo'
//relative brother conclict

const LIMIT = 8
const ContentProduct = () => {
      const refPos = useRef<HTMLDivElement | null>(null)
      const stickyRef = useRef<HTMLDivElement>(null)

      const { ref, inViewport } = useInViewport()

      const getAllProduct = useInfiniteQuery({
            queryKey: ['/v1/api/product/get-all-product'],
            queryFn: ({ pageParam = 1 }) => ProductApi.getAllProduct({ page: pageParam, limit: LIMIT }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => (lastPage.data.metadata.products.length > 0 ? allPages.length + 1 : undefined),
      })

      const onGetPositionTop = useCallback(
            debounce(() => {
                  const bottomSticky = stickyRef.current?.getBoundingClientRect().bottom || 0

                  const top = refPos.current?.getBoundingClientRect().top
                  if ((top || 0) - 20 < bottomSticky && stickyRef.current) {
                        // stickyRef.current.style.display = 'none'
                        stickyRef.current.style.opacity = '0'
                        stickyRef.current.style.transition = 'opacity 2s'
                  } else {
                        if (stickyRef.current) {
                              stickyRef.current.style.opacity = '1'
                              stickyRef.current.style.transition = 'opacity 1s'
                        }
                  }
                  console.log({ top })
                  return top
            }, 50),
            [],
      )

      useEffect(() => {
            window.addEventListener(
                  'scroll',

                  onGetPositionTop,
            )
            if (!inViewport) {
                  window.removeEventListener(
                        'scroll',

                        onGetPositionTop,
                  )
            }

            // }
      }, [inViewport, onGetPositionTop])

      const _page = getAllProduct.data?.pages.flatMap((page) => page.data.metadata.products)
      const _shop = getAllProduct.data?.pages.flatMap((page) => page.data.metadata.shopAdmin)

      return (
            <div className=' z-[5] w-full min-h-[370px] h-max  flex flex-col gap-[28px]  bg-[rgb(245_245_250)]'>
                  <div
                        className='animate-mountComponent h-[165px] w-full sticky top-[70px] xl:top-[0px] bg-[rgb(245_245_250)] pt-[16px] z-[2] '
                        ref={stickyRef}
                  >
                        <div className=' w-full h-[150px] bg-[#ffffff]  rounded-lg pb-[5px] border[1px] border-red-500'></div>
                  </div>
                  <div className='    w-full h-max min-h-[370px] '>
                        <div className=' w-full h-full grid grid-col-2 xl:grid-cols-6  grid-row-[370px] grid-flow-row auto-cols-[calc((100%-20px)/2)] xl:auto-cols-[calc((100%-120px)/6)] auto-rows-[370px] gap-[10px] xl:gap-[20px]'>
                              {getAllProduct.isSuccess && (
                                    <>
                                          {_shop && (
                                                <Link
                                                      to={`/shop/${_shop[0]._id}`}
                                                      className='h-full col-span-2 bg-[#ffffff] flex flex-col p-[16px] rounded-lg'
                                                >
                                                      <img
                                                            src={_shop[0]?.shop_avatar.secure_url || _shop[0]?.shop_avatar_default}
                                                            className='w-full h-[60%]'
                                                            alt='shop admin'
                                                      />
                                                      <div className='w-full flex-1 flex justify-center'>
                                                            <ProductShopInfo shop={_shop[0]} />
                                                      </div>
                                                </Link>
                                          )}

                                          {_page?.map((product, index) => (
                                                <ProductMedium
                                                      product={product}
                                                      key={product._id}
                                                      TikiBest={index % 2 === 0 ? true : false}
                                                      ship={index % 2 !== 0 ? true : false}
                                                />
                                          ))}
                                    </>
                              )}

                              {getAllProduct.isPending && (
                                    <>
                                          <div className='animate-pulse col-span-2 bg-slate-400'></div>
                                          {Array(10)
                                                .fill(0)
                                                ?.map((_, index) => (
                                                      <div
                                                            className='animate-pulse w-full h-full rounded-lg bg-slate-400'
                                                            key={index}
                                                      ></div>
                                                ))}
                                    </>
                              )}

                              {getAllProduct.isFetchingNextPage && (
                                    <>
                                          {Array(LIMIT)
                                                .fill(0)
                                                ?.map((_, index) => (
                                                      <div
                                                            className='animate-pulse w-full h-full rounded-lg bg-slate-400'
                                                            key={index}
                                                      ></div>
                                                ))}
                                    </>
                              )}
                        </div>
                  </div>
                  <div className='w-full h-[65px] flex items-center justify-center' ref={refPos}>
                        <button
                              className='  min-w-[180px] px-[16px] w-max h-[40px] bg-[#ffffff] border-[1px] border-blue-500 text-blue-500 flex items-center justify-center rounded-lg hover:bg-blue-50 hover:text-blue-500'
                              ref={ref}
                              onClick={() => getAllProduct.fetchNextPage()}
                              disabled={!getAllProduct.hasNextPage}
                        >
                              {/* {getAllProduct.isPending && 'Đang tải dữ liệu'} */}
                              {getAllProduct.hasNextPage
                                    ? 'Xem thêm'
                                    : getAllProduct.isPending
                                    ? 'Đang tải dữ liệu sản phẩm'
                                    : 'Hết sản phẩm hiển thị'}
                        </button>
                  </div>
            </div>
      )
}

export default ContentProduct
