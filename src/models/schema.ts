import { appSchema, tableSchema } from '@nozbe/watermelondb'

const schema = appSchema({
   version: 1,
   tables: [
      tableSchema({
         name: 'users',
         columns: [
            { name: 'title', type: 'string' },
            { name: 'subtitle', type: 'string', isOptional: true },
            { name: 'body', type: 'string' },
            { name: 'is_pinned', type: 'boolean' },
         ]
      })
   ]
})

export default schema