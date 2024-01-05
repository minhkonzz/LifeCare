import { useSelector } from 'react-redux' 
import { AppState } from '@store/index'

export default function useSession() {
   const { session } = useSelector((state: AppState) => state.user)
   const userId: string | null = session && session.user.id || null
   return { session, userId }
}