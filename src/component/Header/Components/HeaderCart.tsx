import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { doCloseBoxLogin, doOpenBoxLogin } from '../../../Redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState, store } from '../../../store'

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const HeaderCart = (props: Props) => {
      let navigate = useNavigate()

      const { isUser, isQuantityProduct, doOpenBoxLogin } = props
      const goToCart = () => {
            if (!isUser) {
                  console.log('cart')
                  doOpenBoxLogin()
            } else {
                  navigate('/Cart')

                  console.log(isUser)
                  console.log('success')
            }
      }

      return (
            <div className='2xl:w-[45px] flex items-center justify-centen p-2 hover:bg-sky-200 rounded' onClick={goToCart}>
                  <span className='flex relative'>
                        <img
                              src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
                              className='w-[30px] h-[30px] '
                              alt=''
                        />

                        <span className='absolute top-[-15px] right-[-5px] text-[red] font-bold text-[19px]'>{isQuantityProduct}</span>
                  </span>
            </div>
      )
}

const mapStateToProps = (state: RootState) => ({
      isUser: state.auth.userCurrent,
      isQuantityProduct: state.cartList.soLuong,
})

const mapDispatchToProps = (dispatch: any) => ({
      doOpenBoxLogin: () => store.dispatch(doOpenBoxLogin()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart)
