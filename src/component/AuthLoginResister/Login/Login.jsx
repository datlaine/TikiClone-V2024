import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authLogin } from '../../../ConnectToServer/auth'

import style from './login.module.css'
import { useForm } from 'react-hook-form'
import { rulesVerify } from '../rules'
import { connect, useDispatch, useSelector } from 'react-redux'
import { doCloseBoxLogin, userLogin } from '../../../Redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { store } from '../../../store'

function Login(props) {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const rules = rulesVerify()
      const { handleModeLoginOrResister, userLogin, user, doCloseBoxLogin } = props
      console.log(props)

      const [formLogin, setFormLogin] = useState({
            email: '',
            password: '',
      })

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm()

      // const mutateLogin = useMutation({
      //   mutationFn: (body) => authLogin(body),
      //   onSuccess: (res) => console.log(res),
      // })

      // const handleChangeInput = (e, name) => {
      //   setFormLogin((prev) => ({ ...prev, [name]: e.target.value }))
      // }

      const handleSubmitDefault = (e) => {
            e.preventDefault()
            console.log(formLogin)
            // mutateLogin.mutate(formLogin)
      }

      const onSubMit = handleSubmit((data) => {
            userLogin(data.email)
            doCloseBoxLogin()
            console.log(user)
      })

      // console.log(errors)

      const onResister = () => {
            handleModeLoginOrResister({ mode: 'resister' })
      }

      return (
            <div className={style.containerLogin}>
                  <p>Xin chào,</p>
                  <p>Đăng nhập hoặc tạo tài khoản</p>
                  <form onSubmit={onSubMit}>
                        <div className={style.formEmail}>
                              <label htmlFor='email'>Email</label>
                              <input type='text' id='email' {...register('email', rules.email)} />
                              <p className='text-red-950'>{errors.email?.message}</p>
                        </div>
                        <div className={style.formPassword}>
                              <label htmlFor='password'>Password</label>
                              <input type='password' id='password' {...register('password', rules.password)} />
                              <p className='text-red-950'>{errors.password?.message}</p>
                        </div>
                        <hr />
                        <button type='submit' className={style.btnForm}>
                              Đăng nhập
                        </button>
                  </form>
                  <p>
                        Bạn chưa có tài khoản, <span onClick={onResister}>Đăng kí ngay</span>
                  </p>
            </div>
      )
}

const mapStateToProps = (state) => ({
      user: state.auth.userCurrent,
})

const mapDispatchToProps = (dispatch) => {
      return {
            doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
            userLogin: (user) => store.dispatch(userLogin(user)),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
