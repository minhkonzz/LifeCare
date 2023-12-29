import { ComponentType, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@store/index'
import { getCurrentTimestamp, timestampToDateTime } from '@utils/datetimes'
import { FireColorIcon, BloodSugarDecreaseIcon, BloodSugarIncreaseIcon, BloodSugarNormalIcon } from '@assets/icons'
import fastingStagesData from '@assets/data/fasting-stages.json'

const stageIcons = [
	BloodSugarIncreaseIcon,
	BloodSugarDecreaseIcon,
	BloodSugarNormalIcon,
	FireColorIcon
]

const stages = fastingStagesData.map((e, i) => ({...e, icon: stageIcons[i]}))

export default <P extends object>(BaseComponent: ComponentType<P>, runInterval = false) => {
   return (props: any) => {
      const { startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
      const isFasting: boolean = !!(startTimeStamp && endTimeStamp)

      if (!runInterval) return <BaseComponent {...{...({ startTimeStamp, endTimeStamp, isFasting } as P), ...props}} /> 

      const [ stageData, setStageData ] = useState<{
         startTimeStamp: number,
         endTimeStamp: number,
         elapsedTime: number,
         elapsedTimeText: string, 
         elapsedTimePercent: number, 
         timeExceededValue: number,
         stageElapsedPercent: number, 
         stage: any, 
         nextStage: any
      } | null>(null)

      useEffect(() => {
         let interval: NodeJS.Timeout | undefined = undefined
         if (isFasting) {
            interval = setInterval(() => {
               const currentTimeStamp: number = getCurrentTimestamp()
               const isOnFastingTime: boolean = startTimeStamp < currentTimeStamp
               const elapsedTime: number = Math.abs(currentTimeStamp - startTimeStamp)
               const elapsedTimePercent: number = isOnFastingTime ? Math.floor(elapsedTime / (endTimeStamp - startTimeStamp) * 100) : -1
               const elapsedTimeText: string = timestampToDateTime(elapsedTime)
               const elapsedHours: number = isOnFastingTime ? Math.floor(elapsedTime / (1000 * 60 * 60)) : 0
               const timeExceededValue: number = isOnFastingTime ? elapsedTime - endTimeStamp + startTimeStamp : 0
               let currentStage: any = null
               let currentStageIndex: number = -1
               let nextStage: any = null
               let stageElapsedPercent: number = 0

               if (isOnFastingTime) {
                  if (stageData && stageData.stage) {
                     const { to } = stageData.stage
                     currentStage = elapsedHours >= to && stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || stageData.stage
                  } else {
                     currentStage = stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || stages.at(-1)
                  }

                  const { from, to } = currentStage
                  currentStageIndex = stages.findIndex((e: any) => e.id === currentStage.id)
                  nextStage = currentStageIndex === stages.length - 1 ? null : stages[currentStageIndex + 1]
                  stageElapsedPercent = (elapsedHours - from) / (to - from) * 100
               }               

               setStageData({ 
                  startTimeStamp,
                  endTimeStamp,
                  elapsedTime,
                  elapsedTimeText, 
                  elapsedTimePercent, 
                  timeExceededValue: timeExceededValue > 0 ? timeExceededValue : 0,
                  stageElapsedPercent, 
                  stage: currentStage, 
                  nextStage 
               })
            }, 1000)
         } else setStageData(null)
         return () => { if (interval) clearInterval(interval) }
      }, [startTimeStamp])

      return <BaseComponent {...{...({ stageData } as P), ...props}} />
   }
}