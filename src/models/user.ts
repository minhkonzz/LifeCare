import { Model } from '@nozbe/watermelondb'
import { field, readonly, date } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
   static table = 'users'
   @field('current_height') currentHeight
   @field('current_weight') currentWeight
   @field('start_weight') startWeight
   @field('target_weight') targetWeight  
}