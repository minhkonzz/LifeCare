import { WaterRecordsPayload } from "@utils/types"
import { PersonalData } from "@utils/interfaces"

export abstract class DatabaseAdapter<T> {
   protected database: T 

   constructor(database: T) {
      this.database = database
   }

   abstract getPersonalData(userId: string): Promise<PersonalData>
   abstract getLatestBMI(userId: string): Promise<number>
   abstract getDailyWater(userId: string): Promise<number>
   abstract savePrevWaterRecords(userId: string, payload: WaterRecordsPayload): Promise<void>
}