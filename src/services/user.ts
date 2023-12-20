import { supabase } from "@configs/supabase"
import { WaterRecordsPayload } from "@utils/types"
import { InitialPersonalData } from "@utils/interfaces"
import { convertObjectKeysToSnakeCase, convertObjectKeysToCamelCase } from "@utils/helpers"

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

   checkUserSurveyed: async (userId: string): Promise<{ isSurveyed?: boolean, error: string }> => {
      const { data, error } = await supabase.from('users').select('is_surveyed').eq('id', userId)
      if (error) return { error: error.message }
      const { is_surveyed } = data[0]
      return { isSurveyed: is_surveyed, error: '' }
   },

   getPersonalData: async (userId: string): Promise<any> => {
      const { data: userResponse, error: fetchUserError } = await supabase.from('users').select('*').eq('id', userId)
      if (fetchUserError) return { errorMessage: fetchUserError.message }

      const { data: waterRecordsResponse, error: fetchWaterRecordsError } = await supabase
         .from('water_records')
         .select(`
            id, 
            created_at, 
            updated_at, 
            value, 
            goal, 
            date, 
            water_record_times(id, created_at, updated_at, value)
         `)
         .eq('user_id', userId)

      if (fetchWaterRecordsError) return { errorMessage: fetchWaterRecordsError.message }

      const { data: bodyRecordsResponse, error: fetchBodyRecordsError } = await supabase
         .from('body_records')
         .select(`
            id, 
            created_at, 
            updated_at, 
            value, 
            type
         `)
         .eq('user_id', userId)

      if (fetchBodyRecordsError) return { errorMessage: fetchBodyRecordsError.message }
         
      const { data: fastingRecordsResponse, error: fetchFastingRecordsError } = await supabase
         .from('fasting_records')
         .select(`
            id, 
            created_at, 
            updated_at, 
            plan_name, 
            start_time_stamp, 
            end_time_stamp, 
            notes
         `)
         .eq('user_id', userId)

      if (fetchFastingRecordsError) return { errorMessage: fetchFastingRecordsError.message }

      const userData = convertObjectKeysToCamelCase(userResponse[0])
      const waterRecords = waterRecordsResponse.map(e => {
         const { water_record_times, ...claims } = e
         return convertObjectKeysToCamelCase({
            ...claims,
            times: water_record_times
         })
      })

      const bodyRecords = bodyRecordsResponse.map(e => convertObjectKeysToCamelCase(e))
      const fastingRecords = fastingRecordsResponse.map(e => convertObjectKeysToCamelCase(e))

      return {
         res: {
            ...userData,
            waterRecords,
            bodyRecords,
            fastingRecords
         },
         error: null
      }
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

   savePrevWaterRecords: async (userId: string, payload: WaterRecordsPayload): Promise<{ waterRecordId?: string, error: string }> => {
      const { value, goal, times, date, createdAt, updatedAt } = payload
      const { data: d1, error: saveWaterRecordError } = await supabase.from('water_records').insert(convertObjectKeysToSnakeCase({ userId, value, goal, date, createdAt, updatedAt })).select('id')
      if (saveWaterRecordError) return { error: saveWaterRecordError.message }
      const waterRecordId = d1[0].id
      const { error: saveWaterRecordTimesError } = await supabase.from('water_record_times').insert(times.map(e => ({
         ...e, 
         user_id: userId,
         water_record_id: waterRecordId
      })))
      if (saveWaterRecordTimesError) return { error: saveWaterRecordTimesError.message }
      return {
         waterRecordId,
         error: ''
      }
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

   saveFastingRecord: async (userId: string, payload: any): Promise<string> => {
      const { startTimeStamp, endTimeStamp, planName } = payload 
      const { error } = await supabase.from('fasting_records').insert(convertObjectKeysToSnakeCase({ userId, planName, startTimeStamp, endTimeStamp, notes: '' }))
      return error ? error.message : ''
   },

   updateWeightTimeline: async (userId: string, payload: any): Promise<string> => {
      const { id, value } = payload
      const { error } = await supabase.from('body_records').update({ value }).eq('user_id', userId).eq('id', id)
      return error ? error.message : '' 
   }
}