import { database } from '@configs/local-database'
import { SupabaseAdapter } from '../adapters/db/supabase'
import { WatermelonDBAdapter } from '../adapters/db/watermelon'
import { supabase } from '@configs/supabase'

export default function useDatabaseAdapter(isConnected: boolean) {
   const adapter = isConnected && new SupabaseAdapter(supabase) || new WatermelonDBAdapter(database)
   if (!adapter) throw new Error('Something went wrong went get database adapter')
   return adapter
}