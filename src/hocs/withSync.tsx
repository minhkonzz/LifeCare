import { ComponentType, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQueuedActions } from '@store/user'
import { AppStore } from '../store'
import { autoId } from '@utils/helpers'
import UserService from '@services/user'
import useSession from '@hooks/useSession'

let processedActionIds: string[] = []

// function removeDuplicateActions(queuedActions: any[]): any[] {
//    const uniqueIndexes: any = {}
//    const transformed: string[] = queuedActions.map((e: any) => `${e.name}:${e.params[0]}`)
//    transformed.forEach((e, i) => { uniqueIndexes[e] = i })
//    return queuedActions.filter((e: any, i: number) => Object.values(uniqueIndexes).includes(i))
// }

// function optimizeQueuedActions(userId: string, data: any[]): any[] {
//    const transformed = removeDuplicateActions(data)
//    if (transformed.length === 0) return []

//    const keys: string[] = ['UPDATE_WEIGHTS', 'UPDATE_WEIGHT', 'UPDATE_BMI']
//    const { weight, personalData } = transformed.reduce((acc: any, cur: any) => {
//       const { name, params } = cur
//       if (!keys.includes(name)) return acc
//       const { currentWeight, ...rest } = params[1]
//       return { weight: currentWeight, personalData: { ...acc.personalData, ...rest } }
//    }, { weight: -1, personalData: {} })

//    return [...removeDuplicateActions(data.filter((e: any) => !keys.includes(e.name))), ...[
//       {
//          id: autoId('qaid'),
//          invoker: 'updatePersonalData',
//          name: 'UPDATE_PERSONAL_DATA',
//          params: [userId, personalData]
//       },
//       {
//          id: autoId('qaid'),
//          invoker: 'updateWeight',
//          name: 'UPDATE_WEIGHT',
//          params: [userId, { currentWeight: weight }]
//       }
//    ]]
// }

export default <P extends object>(BaseComponent: ComponentType<P>) => {
   return (props: any) => {
      const dispatch = useDispatch()
      const isOnline: boolean = useSelector((state: AppStore) => state.network.isOnline)
      const queuedActions = useSelector((state: AppStore) => state.user.queuedActions)
      const { userId } = useSession()

      const performSync = async () => {
         if (!userId) return 
         const queuedActionsByUser: any[] = queuedActions[userId]
         for (const action of queuedActionsByUser) {
            const { actionId, invoker, params } = action
            const caller = UserService[invoker]
            const errorMessage: string = await caller(...params)
            if (errorMessage) continue
            processedActionIds.push(actionId)
         }
      }

      useEffect(() => {
         if (isOnline && Array.isArray(queuedActions) && queuedActions.length > 0) {
            performSync()
               .then(() => {
                  dispatch(updateQueuedActions(queuedActions.filter((e: any) => !processedActionIds.includes(e.actionId))))
                  processedActionIds = []
               })
               .catch((err) => console.error(err))
         }
      }, [isOnline])

      return <BaseComponent {...{ ...props, isOnline }} />
   }
}