import { createSlice } from '@reduxjs/toolkit'

const initialUi = {
  showSideBar: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUi,

  reducers: {
    toDoShowSideBar: (state, action) => {
      state.showSideBar = true
    },
    toDoHideSideBar: (state, action) => {
      state.showSideBar = false
    },
  },
})

export const { toDoHideSideBar, toDoShowSideBar } = uiSlice.actions

export default uiSlice.reducer
