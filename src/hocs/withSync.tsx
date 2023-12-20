import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'

export default (BaseComponent: FC) => {
   return (props: any) => {
      const isOnline = useSelector((state: AppState) => state.network.isOnline)
      const changes = useSelector((state: AppState) => state.user.changes)

      useEffect(() => {
         if (isOnline && changes) {}
      }, [isOnline])

      return <BaseComponent {...props} />
   }
}