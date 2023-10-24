import { DatabaseAdapter } from './base'
import { getBMI } from '@utils/fomular'

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

   async getLatestBMI(userId: string): Promise<number> {
      const { data, error } = await this.supabase.from('users').select().eq('id', userId).single()
      if (error) {
         console.error(error)
         throw new Error('Something went wrong when get user')
      }
      const { current_weight, current_height } = data
      return getBMI(current_weight, current_height)
   }
}