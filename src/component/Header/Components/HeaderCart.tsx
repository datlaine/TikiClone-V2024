import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { doCloseBoxLogin, doOpenBoxLogin } from '../../../Redux/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, store } from '../../../store'
import { useQuery } from '@tanstack/react-query'
import CartService from '../../../apis/cart.service'

const HeaderCart = () => {
      let navigate = useNavigate()
      const user = useSelector((state: RootState) => state.authentication.user)

      const cartQuery = useQuery({
            queryKey: ['cart-get-count-product'],
            queryFn: () => CartService.getCountProductCart(),
      })

      return (
            <Link className='2xl:w-[45px] flex items-center justify-centen p-2 hover:bg-sky-200 rounded' to={'/cart'}>
                  <span className='flex relative'>
                        <img
                              src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
                              className='w-[30px] h-[30px] '
                              alt=''
                        />

                        {cartQuery.isSuccess && (
                              <span className='absolute top-[-15px] right-[-5px] text-[red] font-bold text-[19px]'>
                                    {cartQuery.data.data.metadata.count}
                              </span>
                        )}
                  </span>
            </Link>
      )
}

export default HeaderCart
