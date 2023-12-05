import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '@utils/types'

const initialState: UserState = {
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
         state.metadata = state.metadata && {...state.metadata, ...action.payload } || { ...action.payload }
      },

      cache: (state, action) => {
         state.changes
      } 
   }
})

export const { updateMetadata, updateSession, cache } = userSlice.actions
export default userSlice.reducer