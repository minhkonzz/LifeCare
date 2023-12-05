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

   signInWithGoogle: async (idToken: string) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
         provider: 'google',
         token: idToken
      })
      if (error) throw new Error('Something went wrong when sign in with Google')
      console.log(data)
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
      userId: string, 
      payload: any
   ): Promise<string> => {
      const { error } = await supabase.from('users').update(convertObjectKeysToSnakeCase(payload)).eq('id', userId)
      if (error) {
         const splits: string[] = error.message.split(': ')
         return splits[splits.length === 1 && 0 || 1].toUpperCase()
      }
      return ''
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

   syncDailyWater: async (payload: { userId: string, date: string, drinked: number, goal: number, specs: any[] }): Promise<void> => {
      const { userId, drinked, date, goal, specs } = payload
      const { data: d1, error: err1 } = await supabase.from('water_records').select('id').eq('date', date)
      if (err1) throw new Error('Something went wrong when get id of water record')

      if (d1.length === 0) {
         const { data: d2, error: err2 } = await supabase.from('water_records').insert({
            user_id: userId,
            value: drinked,
            goal,
            date
         }).select('id')
         
         if (err2) throw new Error('Something went wrong when insert new water record')
         const waterRecordId = d2[0].id
         const { error: err3 } = await supabase.from('water_record_times').insert(specs.map(e => ({
            id: e.id,
            water_record_id: waterRecordId,
            value: e.liquid
         })))
         if (err3) throw new Error('Something went wrong when create water record times')
         return
      }

      const waterRecordId = d1[0].id
      if (drinked === 0) {
         const { error: err6 } = await supabase.from('water_records')
            .update({ value: drinked })
            .eq('id', waterRecordId)
         
         if (err6) throw new Error('Something wrong when remove water record')
      }
      else {
         const { error: err7 } = await supabase.from('water_record') .update({ value: drinked }).eq('id', waterRecordId)
         if (err7) throw new Error('Something wrong when update water record')
      }

      specs.forEach(async(e) => {
         const { id, type, liquid, time } = e
         if (type) {
            const { error: err4 } = await supabase.from('water_record_times').insert({
               id,
               water_record_id: waterRecordId,
               value: liquid,
               created_at: time,
               updated_at: time
            })
            if (err4) throw new Error('Something wrong when insert new water record time')
            return
         }
         const { error: err5 } = await supabase.from('water_record_times').delete().eq('id', id)
         if (err5) throw new Error('Something wrong when remove water record time')
      })
   },

   saveFastingRecord: async (payload: any, offlineCallback?: () => void): Promise<void> => {
      const { userId, startTimeStamp, endTimeStamp, planName } = payload 
      if (!userId) {
         if (offlineCallback) offlineCallback()
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