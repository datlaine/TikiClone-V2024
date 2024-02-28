import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialUi = {
      showSideBar: false,
      positionBottomSticky: 0,
      showBoxSticky: true,
      flag: false,
      topButton: 0,
      isLoading: false,
}

const uiSlice = createSlice({
      name: 'ui',
      initialState: initialUi,

      reducers: {
            toDoShowSideBar: (state) => {
                  console.log('call active')
                  state.showSideBar = true
            },
            toDoHideSideBar: (state) => {
                  console.log('call active')

                  state.showSideBar = false
            },

            onShowSideBar: (state, payload: PayloadAction<{ showSideBar: boolean }>) => {
                  state.showSideBar = payload.payload.showSideBar
            },

            setPositionBottomBoxSticky: (state, action: PayloadAction<number>) => {
                  state.positionBottomSticky = action.payload
            },

            toDoShowBoxSticky: (state) => {
                  state.showBoxSticky = true
            },
            toDoHideBoxSticky: (state) => {
                  state.showBoxSticky = false
            },

            setTopButton: (state, action: PayloadAction<number>) => {
                  state.topButton = action.payload
            },

            doIsLoading: (state, payload: PayloadAction<boolean>) => {
                  state.isLoading = payload.payload
            },
      },
})

export const {
      toDoHideSideBar,
      toDoShowSideBar,
      setPositionBottomBoxSticky,
      toDoHideBoxSticky,
      toDoShowBoxSticky,
      setTopButton,
      doIsLoading,
      onShowSideBar,
} = uiSlice.actions

export default uiSlice.reducer
