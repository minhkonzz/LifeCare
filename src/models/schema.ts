import { appSchema, tableSchema } from '@nozbe/watermelondb'

const schema = appSchema({
   version: 1,
   tables: [
      tableSchema({
         name: 'users',
         columns: [
            { name: 'current_weight', type: 'number' },
            { name: 'start_weight', type: 'number' },
            { name: 'target_weight', type: 'number' },
            { name: 'current_height', type: 'number' },
            { name: 'chest_measure', type: 'number' },
            { name: 'thigh_measure', type: 'number' },
            { name: 'waist_measure', type: 'number' },
            { name: 'hips_measure', type: 'number' },
            { name: 'exercise_performance', type: 'string' },
            { name: 'water_cupsize_id', type: 'string' },
            { name: 'daily_water', type: 'number' },
            { name: 'daily_carbs', type: 'number' },
            { name: 'daily_protein', type: 'number' },
            { name: 'daily_fat', type: 'number' },
            { name: 'name', type: 'string' },
            { name: 'age', type: 'number' },
            { name: 'bio', type: 'string' },
            { name: 'email', type: 'string' }
         ]
      })
   ]
})

export default schema