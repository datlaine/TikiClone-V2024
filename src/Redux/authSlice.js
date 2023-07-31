import { createSlice, current } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthencation: false,
    userCurrent: JSON.parse(localStorage.getItem('account')) || null, // chưa học back-end nên setup fake data hơi lubu...
    isOpenBoxLogin: false,
  },
  reducers: {
    doOpenBoxLogin: (state, action) => {
      state.isOpenBoxLogin = true
    },
    doCloseBoxLogin: (state) => {
      state.isOpenBoxLogin = false
      state.userCurrent = null
    },
    userLogin: (state, action) => {
      console.log('accout', action.payload)
      console.log('localStorage', localStorage.getItem('account'))
      state.userCurrent = action.payload
      console.log('user', current(state))
    },
  },
})

export const { doOpenBoxLogin, doCloseBoxLogin, userLogin } = authSlice.actions

export default authSlice.reducer
