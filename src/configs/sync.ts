import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './local-database'

export async function supabaseSync() {
   await synchronize({
      database, 
      pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
         console.log('')
      }, 
      pushChanges: async ({ changes, lastPulledAt }),
      migrationsEnabledAtVersion: 1,
   })
}

// another backend sync functions...
