import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native"
import { supabase } from "@configs/supabase"
import { convertObjectKeysToSnakeCase } from '@utils/helpers'
import { getLocalDatetimeV2, getCurrentDate } from '@utils/datetimes'
import { autoId } from '@utils/helpers'

const userId: string = '47f8b2fd-a410-4094-bcd5-5588991faafc'

export default function TestPostgreFn() {
   
   const [ success, setSuccess ] = useState<boolean>(false)

   useEffect(() => {
      const savePrevWater = async () => {
         const date: string = getCurrentDate()
         const currentDatetime: string = getLocalDatetimeV2()
         const { data, error } = await supabase.rpc('save_prev_water_records', {
            user_id: userId,
            payload: JSON.stringify({
               value: 1250,
               goal: 2500, 
               date, 
               createdAt: currentDatetime,
               updatedAt: currentDatetime, 
               times: JSON.stringify([
                  {
                     id: autoId('wrt'),
                     value: 260,
                     createdAt: currentDatetime,
                     updatedAt: currentDatetime
                  },
                  {
                     id: autoId('wrt'),
                     value: 560,
                     createdAt: currentDatetime,
                     updatedAt: currentDatetime
                  },
                  {
                     id: autoId('wrt'),
                     value: 360,
                     createdAt: currentDatetime,
                     updatedAt: currentDatetime
                  }
               ])
            })
         })
         console.log('data:', data, 'error:', error)
         setSuccess(true)
      }

      savePrevWater()
   }, [])

   return (
      <View style={styles.container}>
         <Text>{`Test Water save ${success && 'success' || 'failed'}`}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center'
   }
})