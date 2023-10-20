import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from '@utils/types'

const authState: AuthState = {
   email: '', 
   password: '',
   passwordConfirm: '',
   name: ''
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: authState,
   reducers: {
      updateEmail: (state, action) => {
         state.email = action.payload
      }, 
      updatePassword: (state, action) => {
         state.password = action.payload
      }, 
      updatePasswordConfirm: (state, action) => {
         state.passwordConfirm = action.payload
      }, 
      updateName: (state, action) => {
         state.name = action.payload
      }
   }
})

export const { 
   updateEmail,
   updatePassword,
   updatePasswordConfirm,
   updateName
 } = authSlice.actions
 
export default authSlice.reducer