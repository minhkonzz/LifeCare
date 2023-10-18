import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from '@models/schema'
import User from '@models/user'

const adapter = new SQLiteAdapter({ schema })

export const database = new Database({
   adapter,
   modelClasses: [User]
})