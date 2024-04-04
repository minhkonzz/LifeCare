import { memo, Dispatch, SetStateAction, useState } from 'react'
import { toTimestampV1 } from '@utils/datetimes'
import { useDispatch } from 'react-redux'
import { enqueueAction, updateRec } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import DatetimePicker from '../datetime-picker'
import useSession from '@hooks/useSession'

export default memo(withSync(({ 
   setVisible,
   isOnline,
   fastingRecId,
   datetime,
   endTimeStamp,
   setSavedStartTimeStamp
}: { 
   setVisible: Dispatch<SetStateAction<any>>,
   isOnline: boolean, 
   fastingRecId: string,
   endTimeStamp: number,
   setSavedStartTimeStamp: Dispatch<SetStateAction<number>>,
   datetime?: { date: string, hour: number, min: number }
}): JSX.Element => {
   const { userId } = useSession()
   const dispatch = useDispatch()
   const [ error, setError ] = useState<string>('')

   const onSave = async (date: string, hours: number, mins: number) => {
      const startTimeStamp: number = toTimestampV1(date, hours, mins)
      setError(startTimeStamp > endTimeStamp && 'Start time cannot after end time' || startTimeStamp === endTimeStamp && 'Start time cannot same with end time' || '')

      if (!fastingRecId) {
         setSavedStartTimeStamp(startTimeStamp)
         return
      }

      const payload = { startTimeStamp }

      const cache = () => {
         dispatch(updateRec({ key: 'fastingRecords', id: fastingRecId, payload }))
         if (userId && !isOnline) {
            dispatch(enqueueAction({
               userId,
               actionId: autoId('qaid'),
               invoker: 'updateFastingRec', 
               name: 'UPDATE_START_FASTING_TIME',
               params: [fastingRecId, payload]
            }))
         }
      }

      if (userId) {
         const errorMessage: string = await UserService.updateFastingRec(fastingRecId, payload)
         if (errorMessage === NETWORK_REQUEST_FAILED) cache()
         return
      }
      cache()
   }

   return <DatetimePicker {...{ setVisible, title: 'Start fasting time', onSave, error, datetime }} />
}))