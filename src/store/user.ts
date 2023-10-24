import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   session: null
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateSession: (state, action) => {
         state.session = action.payload
      }
   }
})

export const { updateSession } = userSlice.actions
export default userSlice.reducer