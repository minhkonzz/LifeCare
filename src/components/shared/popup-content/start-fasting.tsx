import { memo, Dispatch, SetStateAction } from 'react'
import { toTimestampV1 } from '@utils/datetimes'
import { updateTimes } from '../../../store/fasting'
import { AppState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import DatetimePicker from '../datetime-picker'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }): JSX.Element => {

   const currentPlan = useSelector((state: AppState) => state.fasting.currentPlan)
	const { hrsFast } = currentPlan
   const dispatch = useDispatch()

   const onSave = (date: string, hours: number, mins: number) => {
      const timestamp = toTimestampV1(date, hours, mins)
      dispatch(updateTimes({
         _start: timestamp,
         _end: timestamp + hrsFast * 60 * 60 * 1000
      }))
   }

   return (
      <DatetimePicker {...{
         setVisible,
         title: 'Start fasting',
         onSave
      }} />
   )
})