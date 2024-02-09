import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductApi from '../../apis/product.api'
import { BookOpenText, Check, ChevronsRight, Hotel, NotepadText, Pen, Store } from 'lucide-react'
import BoxImage from './BoxModalImage'
import BoxModalImage from './BoxModalImage'
import ProductDetail from './ProductDetail'
import ProductIntro from './ProductIntro'

export type TImage = {
    secure_url: string
}

const Product = () => {
    const param = useParams()
    const { id } = param

    const getProductWithId = useQuery({
        queryKey: ['get-product-with-id', id],
        queryFn: () => ProductApi.getProductWithId({ id: id as string }),
    })

    const product = getProductWithId.isSuccess ? getProductWithId!.data!.data!.metadata.product : undefined
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        <div className='flex flex-col w-full'>
            <div className='px-[30px] w-full flex flex-col gap-[4px] '>
                {getProductWithId.data?.data && (
                    <div className='flex gap-[4px] '>
                        <Link to='/'>Trang chủ</Link>
                        <ChevronsRight size={16} color='black' />
                        {/* <Link to={'/product/:type'}>{getProductWithId.data.data.metadata.product.}</Link> */}
                    </div>
                )}

                {getProductWithId.isSuccess && product && (
                    <div className='flex gap-[24px]'>
                        <div className='basis-[70%] flex flex-col gap-[24px]'>
                            <div className='top w-full min-h-[1000px] h-max flex flex-col xl:flex-row gap-[24px]'>
                                <div className='basis-[40%] sticky top-[16px] bg-white p-[12px] rounded-lg min-h-[800px] sm:min-h-[700px] h-max flex flex-col gap-[16px]'>
                                    <ProductDetail product={product} isSuccess={getProductWithId.isSuccess} />
                                </div>
                                <div className='basis-[60%]  h-[5000px] mt-[20px] xl:mt-0 rounded-lg '>
                                    <ProductIntro product={product} />
                                </div>
                            </div>
                            <div className='comment w-full h-[1000px] bg-yellow-500'></div>
                        </div>
                        <div className='basis-[30%] sticky top-[16px] h-[300px] bg-red-700'></div>
                    </div>
                )}
            </div>
            <div className='bg-black h-[4000px] w-full'></div>
        </div>
    )
}

export default Product
