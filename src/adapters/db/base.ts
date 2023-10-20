export abstract class DatabaseAdapter<T> {
   protected database: T 

   constructor(database: T) {
      this.database = database
   }
}