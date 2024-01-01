import { memo, Dispatch, SetStateAction } from 'react'
import { toTimestampV1 } from '@utils/datetimes'
import { AppState } from '@store/index'
import { useSelector, useDispatch } from 'react-redux'
import { enqueueAction, updateRec } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import DatetimePicker from '../datetime-picker'

export default memo(withSync(({ 
   setVisible,
   isOnline,
   fastingRecId,
   datetime
}: { 
   setVisible: Dispatch<SetStateAction<any>>,
   isOnline: boolean,
   fastingRecId: string
   datetime?: { date: string, hour: number, min: number }
}): JSX.Element => {
   const { session } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session.user.id || null
   const dispatch = useDispatch()

   const onSave = async (date: string, hours: number, mins: number) => {
      const endTimeStamp: number = toTimestampV1(date, hours, mins)
      const payload = { endTimeStamp }

      const cache = (beQueued = false) => {
         dispatch(updateRec({ key: 'fastingRecords', id: fastingRecId, payload }))
         if (beQueued) {
            dispatch(enqueueAction({
               actionId: autoId('qaid'),
               invoker: 'updateFastingRec', 
               name: 'UPDATE_END_FASTING_TIME',
               params: [fastingRecId, payload]
            }))
         }
      }

      if (!userId) cache()
      else if (!isOnline) cache(true)
      else {
         const errorMessage: string = await UserService.updateFastingRec(fastingRecId, payload)
         if (errorMessage === NETWORK_REQUEST_FAILED) cache(true)
      } 
   }

   return <DatetimePicker {...{ setVisible, title: 'End fasting time', onSave, datetime }} />
}))