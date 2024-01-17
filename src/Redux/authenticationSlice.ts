import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { store } from '../store'

export type TRegisterResponse = {
      email: string
      verify_email: boolean
      gender: string
      sercel_url: string
      _id: string
      bob: Date
      fullName: string
      nickName: string
      avatar_url_default: string
      avatar_used: string
}

// const userDefault: TRegisterResponse = {
//       email: '',
//       verify_email: false,
//       gender: 'Male',
//       sercel_url: '',
//       _id: '',
//       bob: Date.now()
// }

const authSlice = createSlice({
      name: 'authentication',
      initialState: {
            isAuthencation: false,
            userCurrent: null, // chưa học back-end nên setup fake data hơi lubu...
            isOpenBoxLogin: false,
            user: JSON.parse(localStorage.getItem('user') as string) || null,
      },
      reducers: {
            getInfoUser: (state, payload: PayloadAction<TRegisterResponse>) => {
                  console.log('payload action', payload.payload)
                  localStorage.setItem('user', JSON.stringify(payload.payload))

                  state.user = payload.payload
            },
      },
})

export const { getInfoUser } = authSlice.actions

export default authSlice.reducer
