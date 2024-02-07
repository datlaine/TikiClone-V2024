import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TUser } from '../../types/axiosResponse'
import Owner from './Owner'
import RegisterShop from './RegisterShop'

const Shop = () => {
    const user = useSelector((state: RootState) => state.authentication.user) as TUser

    return <div className='w-full'>{user.isOpenShop ? <Owner /> : <RegisterShop />}</div>
}

export default Shop
