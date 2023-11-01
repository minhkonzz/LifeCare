import { WaterRecordsPayload } from '@utils/types'
import { DatabaseAdapter } from './base'

export class WatermelonDBAdapter extends DatabaseAdapter<any> {
   private watermelonDB: any 

   constructor(database: any) {
      super(database)
      this.watermelonDB = database
   }

   async getLatestBMI(userId: string): Promise<number> {
      return 28.25
   }

   async getDailyWater(userId: string): Promise<number> {
      return 2450
   }

   async savePrevWaterRecords(userId: string, payload: WaterRecordsPayload): Promise<void> {
      
   }
}