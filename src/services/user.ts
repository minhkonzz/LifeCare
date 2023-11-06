import { supabase } from "@configs/supabase"
import { WaterRecordsPayload } from "@utils/types"
import { InitialPersonalData } from "@utils/interfaces"
import { PersonalData } from "@utils/interfaces"
import { autoId } from "@utils/helpers"

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

   getPersonalData: async (userId: string) => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId)
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when get personal data')
      }
      const result: PersonalData = data[0]
      return result
   },

   initPersonalData: async (userId: number, payload: InitialPersonalData) => {
      return await supabase.from('users').update(payload).eq('id', userId)
   },

   savePrevWaterRecords: async (payload: WaterRecordsPayload): Promise<void> => {
      const { userId, drinked, goal, changes } = payload
      const { data: d1, error: err1 } = await supabase.from('water_records')
         .insert({ 
            id: autoId('wr'),
            user_id: userId,  
            value: drinked,
            goal: goal
         })
         .select('id')

      if (err1) throw new Error('Something went wrong when create new water record')
      const waterRecordId = d1[0].id
      const { error: err2 } = await supabase.from('water_record_times')
         .insert(changes.map(e => ({
            id: autoId('wrc'),
            water_record_id: waterRecordId,
            value: e.liquid,
            time_created: e.time
         })))
      
      if (err2) throw new Error('Something went wrong when create new water record time')
   }
}