import { useSelector } from 'react-redux' 
import { AppStore } from '@store/index'

export default function useSession() {
   const { session } = useSelector((state: AppStore) => state.user)
   const userId: string | null = session && session.user.id || null
   return { session, userId }
}