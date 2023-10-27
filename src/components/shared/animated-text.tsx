import { useState, useEffect } from 'react'
import { Text } from 'react-native'

interface AnimatedNumberProps {
   value: number, 
   style?: any
}

export default ({ value, style }: AnimatedNumberProps) => {
   const [number, setNumber] = useState<number>(value > 1000 ? value - 50 : 0)

   useEffect(() => {
      let interval = setInterval(() => {
        setNumber(prev => prev + 1)
      }, .5)
  
      if (number === value) clearInterval(interval)
  
      return () => clearInterval(interval)
    }, [number])

   return <Text {...{ style }}>{number}</Text>
}