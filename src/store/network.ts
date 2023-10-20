import { createSlice } from "@reduxjs/toolkit"
import { NetworkState } from "@utils/interfaces"

const initialState: NetworkState = {
   isOnline: false
}

const networkSlice = createSlice({
   name: 'network',
   initialState, 
   reducers: {
      updateNetworkOnline: (state, action) => {
         const isOnline = action.payload
         if (isOnline === state.isOnline) return 
         state.isOnline = isOnline
      }
   }
})

export const { updateNetworkOnline } = networkSlice.actions
export default networkSlice.reducer