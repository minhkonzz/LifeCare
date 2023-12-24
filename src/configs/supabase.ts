import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from '@env'
// import AuthStorage from '@utils/classes/AuthStorage'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
   auth: {
      persistSession: true
   }
})