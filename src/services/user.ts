import { supabase } from "@configs/supabase"
import { WaterRecordsPayload } from "@utils/types"
import { InitialPersonalData } from "@utils/interfaces"
import { PersonalData } from "@utils/interfaces"
import { convertObjectKeysToSnakeCase } from "@utils/helpers"
import { autoId } from "@utils/helpers"

export default {
   signInPassword: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password })
   },

   signUpWithEmail: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password })
   },

   signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error('Something went wrong when sign out')
   },

   checkUserSurveyed: async (userId: string): Promise<boolean> => {
      const { data, error } = await supabase.from('users').select('is_surveyed').eq('id', userId)
      if (error) throw new Error('Something went wrong when get is_surveyed')
      const { is_surveyed } = data[0]
      return is_surveyed
   },

   getPersonalData: async (userId: string): Promise<PersonalData> => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId)
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when get personal data')
      }
      const result: PersonalData = data[0]
      return result
   },

   initPersonalData: async (userId: string, payload: InitialPersonalData): Promise<any> => {
      return await supabase.from('users').update(convertObjectKeysToSnakeCase(payload)).eq('id', userId)
   },

   updatePersonalData: async (
      userId: string | null, 
      payload: any,
      offlineCallback?: () => void
   ): Promise<void> => {
      if (!userId) {
         console.log('user is guest')
         return
      } 
      const { error } = await supabase.from('users').update(convertObjectKeysToSnakeCase(payload)).eq('id', userId)
      if (error) throw new Error('Some thing went wrong when update personal data')
   },

   savePrevWaterRecords: async (payload: WaterRecordsPayload): Promise<void> => {
      const { userId, value, goal, changes } = payload
      const { data: d1, error: err1 } = await supabase.from('water_records')
         .insert({ user_id: userId, value, goal: goal })
         .select('id')

      if (err1) throw new Error('Something went wrong when create new water record')
      const waterRecordId = d1[0].id
      const { error: err2 } = await supabase.from('water_record_times')
         .insert(changes.map(e => ({
            water_record_id: waterRecordId,
            value: e.liquid,
            created_at: e.time
         })))
      
      if (err2) throw new Error('Something went wrong when create new water record time')
   }, 

   saveFastingRecord: async (payload: any): Promise<void> => {
      const { userId, startTimeStamp, endTimeStamp, planName } = payload 
      if (!userId) {
         console.log('user is guest')
         return
      } 
      const { error } = await supabase.from('fasting_records')
         .insert([convertObjectKeysToSnakeCase({
            userId, planName, startTimeStamp, endTimeStamp, notes: ''
         })])

      if (error) {
         console.error(error)
         throw new Error('Something went wrong when create new fasting record')
      }
   }
}