import { supabase } from "@configs/supabase"

const AuthService = {
   signInPassword: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when sign in')
      }
      return data
   },

   signUpWithEmail: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when sign up new user')
      }
      return data
   },
}

export default AuthService