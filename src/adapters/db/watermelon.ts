import { PersonalData } from '@utils/interfaces'
import { WaterRecordsPayload } from '@utils/types'
import { DatabaseAdapter } from './base'

export class WatermelonDBAdapter extends DatabaseAdapter<any> {
   private watermelonDB: any 

   constructor(database: any) {
      super(database)
      this.watermelonDB = database
   }

   async getPersonalData(userId: string): Promise<PersonalData> {
      return {
         gender: 'Male',
         age: 23, 
         currentHeight: 185,
         currentWeight: 78,
         startWeight: 78, 
         goalWeight: 62,
         exercisePerformance: 'Never', 
         fastingFamiliar: 'Beginner',
         goal: ['Lose weight', 'Live longer'],
         isSurveyed: true,
         chestMeasure: 82,
         thighMeasure: 72,
         waistMeasure: 78,
         hipsMeasure: 54, 
         dailyWater: 2350, 
         dailyCarbs: 120, 
         dailyFat: 20,
         dailyProtein: 80,
         name: 'Thanh Nguyen', 
         email: 'thanhnguyen12@gmail.com'
      }
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