import { DatabaseAdapter } from './base'
import { getBMI } from '@utils/fomular'
import { WaterRecordsPayload } from '@utils/types'
import { autoId } from '@utils/helpers'
import { PersonalData } from '@utils/interfaces'

export class SupabaseAdapter extends DatabaseAdapter<any> {
   private supabase: any
   
   constructor(database: any) {
      super(database)
      this.supabase = database
   }

   async signInWithPassword(email: string, password: string) {
      return await this.supabase.auth.signInWithPassword({ email, password })
   }

   async signUp(email: string, password: string) {
      return await this.supabase.auth.signUp({ email, password })
   }

   async getPersonalData(userId: string): Promise<PersonalData> {
      const { data, error } = await this.supabase.from('users').select('*').eq('id', userId)
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when get personal data')
      }
      const result: PersonalData = data[0]
      return result
   }

   async getLatestBMI(userId: string): Promise<number> {
      const { data, error } = await this.supabase.from('users').select('current_weight, current_height').eq('id', userId)
      if (error) {
         console.error(error)
         throw new Error('Something went wrong when get user')
      }
      const { current_weight, current_height } = data[0]
      return getBMI(current_weight, current_height)
   }

   async getDailyWater(userId: string): Promise<number> {
      const { data, error } = await this.supabase.from('users').select('daily_water').eq('id', userId)
      if (error) {
         console.error(error)
         throw new Error('Something went wrong when get daily water')
      }
      return data[0].daily_water
   }

   async savePrevWaterRecords(userId: string, payload: WaterRecordsPayload): Promise<void> {
      const { d1, err1 } = await this.supabase.from('water_records')
         .insert({ 
            id: autoId('wr'),
            user_id: userId,  
            value: payload.drinked,
            goal: payload.goal
         })
         .select('id')

      if (err1) throw new Error('Something went wrong when create new water record')
      const waterRecordId = d1[0].id
      const { err2 } = await this.supabase.from('water_record_times')
         .insert(payload.changes.map(e => ({
            id: autoId('wrc'),
            water_record_id: waterRecordId,
            value: e.liquid,
            time_created: e.time
         })))
      
      if (err2) throw new Error('Something went wrong when create new water record time')
   }
}