import useDatabaseAdapter from "@hooks/useDatabaseAdapter"
import { WatermelonDBAdapter } from "../adapters/db/watermelon"
import { SupabaseAdapter } from '../adapters/db/supabase'

const MetricService = {
   getLatestBMI: async (userId: string, isConnected = false) => {
      const adapter: SupabaseAdapter | WatermelonDBAdapter = useDatabaseAdapter(isConnected)
      const latestBmi: number = await adapter.getLatestBMI(userId)
      return latestBmi
   }
}

export default MetricService