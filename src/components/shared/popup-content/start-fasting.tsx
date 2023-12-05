import { memo, Dispatch, SetStateAction } from 'react'
import { toTimestampV1 } from '@utils/datetimes'
import { updateTimes } from '../../../store/fasting'
import { AppState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import UserService from '@services/user'
import DatetimePicker from '../datetime-picker'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }): JSX.Element => {
   const { session } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session.user.id || null
   const currentPlan = useSelector((state: AppState) => state.fasting.currentPlan)
	const { hrsFast } = currentPlan
   const dispatch = useDispatch()

   const onSave = async (date: string, hours: number, mins: number) => {
      const timestamp = toTimestampV1(date, hours, mins)
      const payload = {
         _start: timestamp,
         _end: timestamp + hrsFast * 60 * 60 * 1000
      }
      if (userId) {
         const errorMessage: string = await UserService.updatePersonalData(userId, payload)
         return
      }      
      dispatch(updateTimes(payload))
   }

   return (
      <DatetimePicker {...{
         setVisible,
         title: 'Start fasting',
         onSave
      }} />
   )
})