import { database } from '@configs/local-database'
import { SupabaseAdapter } from '../adapters/db/supabase'
import { WatermelonDBAdapter } from '../adapters/db/watermelon'
import { supabase } from '@configs/supabase'
import { useUserContext } from '../contexts/user'
import { useNetInfo } from '@react-native-community/netinfo'

export default function useDatabaseAdapter() {
   const { user } = useUserContext()
   const { isConnected } = useNetInfo()
   const adapter = isConnected && user && new SupabaseAdapter(supabase) || new WatermelonDBAdapter(database)
   if (!adapter) throw new Error('CREATE DATABASE ADAPTER GOT ERROR!!')
   return adapter
}