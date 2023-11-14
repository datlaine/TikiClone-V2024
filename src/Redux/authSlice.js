import { createSlice, current } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthencation: false,
    userCurrent: null, // chưa học back-end nên setup fake data hơi lubu...
    isOpenBoxLogin: false,
  },
  reducers: {
    doOpenBoxLogin: (state, action) => {
      state.isOpenBoxLogin = true
    },
    doCloseBoxLogin: (state) => {
      state.isOpenBoxLogin = false
    },
    userLogin: (state, action) => {
      console.log('dispatch')
      console.log('accout', action.payload)
      console.log('localStorage', localStorage.getItem('account'))
      state.userCurrent = action.payload
      console.log('user', current(state))
      state.isAuthencation = true
      
    },

    userLogout: (state, action) => {
  console.log('dang log out')
      state.isAuthencation = false
      state.userCurrent = null
    },
  },
})

export const { doOpenBoxLogin, doCloseBoxLogin, userLogin, userLogout } = authSlice.actions

export default authSlice.reducer
