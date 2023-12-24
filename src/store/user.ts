import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '@utils/types'

const initialState: UserState = {
   session: null,
   metadata: null,
   queuedActions: []
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

      addRec: (state, action) => {
         const { key, rec } = action.payload
         const collection = state.metadata[key]
         collection.push(rec)
      },

      enqueueAction: (state, action) => {
         state.queuedActions = [...state.queuedActions, action.payload]
      },

      dequeueAction: (state) => {
         const [, ...restActions] = state.queuedActions
         state.queuedActions = restActions
      },

      updateQueuedActions: (state, action) => {
         state.queuedActions = action.payload
      }
   }
})

export const { updateMetadata, updateSession, addRec, enqueueAction, dequeueAction, updateQueuedActions } = userSlice.actions
export default userSlice.reducer