import { ComponentType, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQueuedActions } from '@store/user'
import { AppState } from '../store'

let processedActionIds: string[] = []

export default <P extends object>(BaseComponent: ComponentType<P>) => {
   return (props: any) => {
      const dispatch = useDispatch()
      const isOnline: boolean = useSelector((state: AppState) => state.network.isOnline)
      const queuedActions = useSelector((state: AppState) => state.user.queuedActions)

      const performSync = async () => {
         for (const action of queuedActions) {
            const { actionId, invoker, params } = action
            const errorMessage: string = await invoker(...params)
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

      return <BaseComponent {...{...props, isOnline}} />
   }
}