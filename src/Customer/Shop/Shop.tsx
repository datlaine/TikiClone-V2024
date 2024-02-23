import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Owner from './Owner/Owner'
import RegisterShop from './RegisterShop'
import { UserResponse } from '../../types/user.type'

const Shop = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      return <div className='w-full'>{user.isOpenShop ? <Owner /> : <RegisterShop />}</div>
}

export default Shop
