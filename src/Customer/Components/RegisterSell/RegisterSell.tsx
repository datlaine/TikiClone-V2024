import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Select } from 'antd'
import Book from './ProductType/Book'
import Food from './ProductType/Food'

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [productType, setProductType] = useState<'Book' | 'Food'>()
    if (!user.verify_email) {
        return <h1>Chức năng chỉ dành cho email đã được xác thực</h1>
    }

    return (
        <div className='w-full flex justify-center'>
            <form className='w-[540px] h-[650px] bg-red-700 flex flex-col gap-[25px]'>
                <p>Name</p>
                <p>thumb</p>
                <p>price</p>
                <p>image_sub</p>

                <Select
                    placeholder='Loại sản phẩm'
                    options={[
                        { value: 'Book', label: 'Book' },
                        { value: 'Food', label: 'Food' },
                    ]}
                    onChange={(type: 'Book' | 'Food') => setProductType(type)}
                />

                {productType === 'Book' && <Book />}
                {productType === 'Food' && <Food />}
            </form>
        </div>
    )
}

export default RegisterSell
