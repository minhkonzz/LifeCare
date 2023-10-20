import { Model } from '@nozbe/watermelondb'
import { field, readonly, date } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
   static table = 'users'
   @field('current_height') currentHeight: any
   @field('current_weight') currentWeight: any
   @field('start_weight') startWeight: any
   @field('target_weight') targetWeight: any
}