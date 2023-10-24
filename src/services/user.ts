import { supabase } from "@configs/supabase"

export default {
   signInPassword: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password })
   },

   signUpWithEmail: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password })
   },

   checkUserSurveyed: async (userId: string) => {
      return await supabase.from('users').select('is_surveyed').eq('id', userId)
   }
}