import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authLogin } from '../../../ConnectToServer/auth'
import {useForm, useFormContext} from 'react-hook-form'
import style from './resister.module.css'

export default function Resister({ handleModeLoginOrResister }) {
  const [formResister, setFormResister] = useState({
    email: '',
    password: '',
  })

  const {register,handleSubmit, formState: {errors}} = useForm()


  // const mutateResister = useMutation({
  //   mutationFn: (body) => authResister(body),
  //   onSuccess: (res) => console.log(res),
  // })

  const handleChangeInput = (e, name) => {
    setFormResister((prev) => ({ ...prev, [name]: e.target.value }))
  }

  const handleSubmitDefault = (e) => {
    e.preventDefault()
    console.log(formResister)
    // mutateLogin.mutate(formLogin)
  }

  const onLogin = () => {
    handleModeLoginOrResister({ mode: 'login' })
  }

  return (
    <div className={style.containerResister}>
      <p>Đăng kí tài khoản</p>
      <p>Đăng nhập hoặc tạo tài khoản</p>
      <form onSubmit={handleSubmitDefault}>
        <div className={style.formEmail}>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' onChange={(e) => handleChangeInput(e, 'email')} />
        </div>
        <div className={style.formPassword}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={(e) => handleChangeInput(e, 'password')} />
        </div>
        <div className={style.formPassword}>
          <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
          <input type='password' id='confirmPassword' />
        </div>
        <hr />
        <button type='submit'>Đăng Kí</button>
      </form>
      <p>
        Bạn chưa có tài khoản, <span onClick={onLogin}>Đăng nhập ngay</span>
      </p>
    </div>
  )
}
