import { ReactNode, useState, createContext } from 'react'
import { PopupContextType } from '@utils/types'

export const PopupContext = createContext<PopupContextType | null>(null) 

export default ({ children }: { children: ReactNode }) => {
   const [ popup, setPopup ] = useState<ReactNode>(null)

   return (
      <PopupContext.Provider value={{ popup, setPopup }}>
         { children }
      </PopupContext.Provider>
   )
}