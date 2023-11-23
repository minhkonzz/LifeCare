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
         state.metadata = { ...action.payload }
      }
   }
})

export const { updateMetadata, updateSession } = userSlice.actions
export default userSlice.reducer