import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select } from 'antd'
import FormRegisterBook from './RegisterProductForm/FormRegisterBook'
import FormRegisterFood from './RegisterProductForm/FormRegisterFood'
import { TUser } from '../../types/axiosResponse'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../apis/product.api'

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user) as TUser
    const [productType, setProductType] = useState<'Book' | 'Food'>()

    const createBaseProductId = useMutation({
        mutationKey: ['create-base-product-id'],
        mutationFn: () => ProductApi.createBaseProductId(),
    })

    if (!user.isOpenShop) {
        return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
    }
    return (
        <div className='min-w-full min-h-[100px] h-auto flex '>
            <div className=' w-full h-full'>
                <Select
                    placeholder='Loại sản phẩm'
                    options={[
                        { value: 'Book', label: 'Book' },
                        { value: 'Food', label: 'Food' },
                    ]}
                    onChange={(type: 'Book' | 'Food') => {
                        setProductType(type)
                        createBaseProductId.mutate()
                    }}
                />
                {createBaseProductId.isSuccess && (
                    <>
                        {productType === 'Book' && <FormRegisterBook product_id={createBaseProductId.data.data.metadata.product_id} />}
                        {productType === 'Food' && <FormRegisterFood />}
                    </>
                )}
            </div>
        </div>
    )
}

export default RegisterSell
