import { memo, Dispatch, SetStateAction } from 'react'
import { toTimestampV1 } from '@utils/datetimes'
import { updateTimes } from '@store/fasting'
import { AppState } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
import { enqueueAction } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import DatetimePicker from '../datetime-picker'

export default memo(withSync(({ 
   setVisible,
   isOnline
}: { 
   setVisible: Dispatch<SetStateAction<any>>,
   isOnline: boolean
}): JSX.Element => {
   const { session } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session.user.id || null
   const currentPlan = useSelector((state: AppState) => state.fasting.currentPlan)
	const { hrsFast } = currentPlan
   const dispatch = useDispatch()

   const onSave = async (date: string, hours: number, mins: number) => {
      const timestamp = toTimestampV1(date, hours, mins)
      const payload = {
         startTimeStamp: timestamp,
         endTimeStamp: timestamp + hrsFast * 60 * 60 * 1000
      }

      const cache = (beQueued = false) => {
         dispatch(updateTimes(payload))
         if (beQueued) {
            dispatch(enqueueAction({
               actionId: autoId('qaid'),
               invoker: 'updatePersonalData',
               name: 'UPDATE_FASTING_TIMES',
               params: [userId, payload]
            }))
         }
      }

      if (!userId) cache()
      else if (!isOnline) cache(true)
      else {
         const errorMessage: string = await UserService.updatePersonalData(userId, payload)
         if (errorMessage === NETWORK_REQUEST_FAILED) cache(true)
      } 
   }

   return <DatetimePicker {...{ setVisible, title: 'Start fasting', onSave }} />
}))