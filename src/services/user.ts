import { supabase } from "@configs/supabase"
import { InitialPersonalData } from "@utils/types"

export default {
   signInPassword: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password })
   },

   signUpWithEmail: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password })
   },

   checkUserSurveyed: async (userId: string) => {
      try {
         const { data, error } = await supabase.from('users').select('is_surveyed').eq('id', userId)
         if (error) throw new Error('Something went wrong when get is_surveyed')
         const { is_surveyed } = data[0]
         return is_surveyed
      } catch (err) {
         console.error(err)
      }
   },

   initPersonalData: async (userId: number, payload: InitialPersonalData) => {
      return await supabase.from('users').update(payload).eq('id', userId)
   }
}