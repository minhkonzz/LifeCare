import { DatabaseAdapter } from './base'

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
}