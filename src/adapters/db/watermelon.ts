import { DatabaseAdapter } from './base'

export class WatermelonDBAdapter extends DatabaseAdapter<any> {
   private watermelonDB: any 

   constructor(database: any) {
      super(database)
      this.watermelonDB = database
   }
}