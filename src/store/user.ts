import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   session: null, 
   metadata: null,
   changes: null
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateSession: (state, action) => {
         state.session = action.payload
      }, 

      updateMetadata: (state, action) => {
         state.metadata = action.payload
      }
   }
})

export const { updateSession, updateMetadata } = userSlice.actions
export default userSlice.reducer