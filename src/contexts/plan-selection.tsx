import { ReactNode, useState, createContext } from 'react'
import { PlanSelectionContextType, PlanSelectionType } from '@utils/types'

export const PlanSelectionContext = createContext<PlanSelectionContextType | null>(null) 

export default ({ children }: { children: ReactNode }) => {
   const [ planSelected, setPlanSelected ] = useState<PlanSelectionType>({
      planCategoryId: '', 
      planId: ''
   })

   return (
      <PlanSelectionContext.Provider value={{ planSelected, setPlanSelected }}>
         { children }
      </PlanSelectionContext.Provider>
   )
}