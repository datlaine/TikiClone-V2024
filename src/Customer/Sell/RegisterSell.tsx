import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Select } from 'antd'
import FormRegisterBook from './components/FormRegisterBook'
import FormRegisterFood from './components/FormRegisterFood'

const RegisterSell = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const [productType, setProductType] = useState<'Book' | 'Food'>()

    if (!user.verify_email) {
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
                    onChange={(type: 'Book' | 'Food') => setProductType(type)}
                />
                {productType === 'Book' && <FormRegisterBook />}
                {productType === 'Food' && <FormRegisterFood />}
            </div>
        </div>
    )
}

export default RegisterSell
