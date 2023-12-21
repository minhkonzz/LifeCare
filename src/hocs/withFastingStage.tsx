import { FC, ComponentType, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@store/index'
import { getCurrentTimestamp } from '@utils/datetimes'
import { FireColorIcon, BloodSugarDecreaseIcon, BloodSugarIncreaseIcon, BloodSugarNormalIcon, PrimaryEditIcon } from '@assets/icons'
import fastingStagesData from '@assets/data/fasting-stages.json'

const stageIcons = [
	BloodSugarIncreaseIcon,
	BloodSugarDecreaseIcon,
	BloodSugarNormalIcon,
	FireColorIcon
]
const stages = fastingStagesData.map((e, i) => ({...e, icon: stageIcons[i]}))


export default <P extends object>(BaseComponent: ComponentType<P>) => {
   return () => {
      const startTimestamp: number = useSelector((state: AppState) => state.fasting.startTimeStamp)
      const [ stageData, setStageData ] = useState<{ 
         timeElapsed: number, 
         stageElapsedPercent: number, 
         stage: any, 
         nextStageIndex: number
      } | null>(null)

      useEffect(() => {
         let interval = setInterval(() => {
            const currentTimeStamp: number = getCurrentTimestamp()
            const timeElapsed: number = currentTimeStamp - startTimestamp
            const elapsedHours: number = Math.floor(timeElapsed / (1000 * 60 * 60))
            let currentStage: any

            if (stageData && stageData.stage) {
               const { to } = stageData.stage
               currentStage = elapsedHours >= to && stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || stageData.stage
            } else {
               currentStage = stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || stages.at(-1)
            }

            const { from, to } = currentStage
            const currentStageIndex = stages.findIndex((e: any) => e.id === currentStage.id)
            const stageElapsedPercent: number = (elapsedHours - from) / (to - from) * 100
            setStageData({ timeElapsed, stageElapsedPercent, stage: currentStage, nextStageIndex: currentStageIndex === stages.length - 1 && -1 || currentStageIndex + 1 })
         }, 999)

         return () => { clearInterval(interval) }
      }, [startTimestamp])

      return <BaseComponent {...({ stageData } as P)} />
   }
}