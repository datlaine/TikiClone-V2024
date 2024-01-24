import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { store } from '../store'
import { TUser } from '../types/axiosResponse'

// const userDefault: TRegisterResponse = {
//       email: '',
//       verify_email: false,
//       gender: 'Male',
//       sercel_url: '',
//       _id: '',
//       bob: Date.now()
// }

// const initialState: TUser = {
//       user: JSON.parse(localStorage.getItem('user') as string) || {} || null,
// }

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        // isAuthencation: false,
        // userCurrent: null, // chưa học back-end nên setup fake data hơi lubu...
        // isOpenBoxLogin: false,
        loading: false,
        token: JSON.parse(localStorage.getItem('token') as string) || null,
        user: (JSON.parse(localStorage.getItem('user') as string) || null) as TUser,
    },
    reducers: {
        fetchUser: (state, payload: PayloadAction<{ user: TUser; access_token?: string }>) => {
            console.log('payload action', payload.payload)
            localStorage.setItem('user', JSON.stringify(payload.payload.user))
            if (payload.payload.access_token) {
                localStorage.setItem('token', JSON.stringify(payload.payload.access_token))
                state.token = payload.payload.access_token
            }
            state.user = payload.payload.user
        },

        doLogout: (state) => {
            localStorage.remove('user')
            localStorage.remove('token')
            state.token = null
            state.user = {} as TUser
        },
        isLoading: (state, payload: PayloadAction<boolean>) => {
            state.loading = payload.payload
        },
    },
})

export const { fetchUser, doLogout, isLoading } = authSlice.actions

export default authSlice.reducer
