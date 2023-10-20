import { FC, ReactNode, useEffect, useState, createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../configs/supabase'

interface UserContextValue {
   user: User | null
   session: Session | null
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
   const [session, setSession] = useState<Session | null>(null);
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
         async (event: string, session: { user: User | null }) => {
            setSession(session);
            setUser(session?.user ?? null);
         }
      );
      return () => {
         authListener?.unsubscribe();
      };
   }, [])

   return <UserContext.Provider value={{ session, user }}>{children}</UserContext.Provider>
};

export const useUserContext = (): UserContextValue => {
   const context = useContext(UserContext)
   if (context === undefined) throw new Error('useUser must be used within a UserContextProvider.')
   return context
};