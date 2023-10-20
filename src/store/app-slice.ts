import { createSlice } from '@reduxjs/toolkit'

const appState = {
   isOnline: false
}

export const appSlice = createSlice({
   name: 'app',
   initialState: appState,
   reducers: {
      updateNetworkState: (state) => {
         state.isOnline = !state.isOnline
      }
   }
})

export const { updateNetworkState } = appSlice.actions
export default appSlice.reducer