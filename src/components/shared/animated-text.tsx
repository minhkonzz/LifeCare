import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { AnimatedNumberProps } from '@utils/interfaces'

export default ({ value, style }: AnimatedNumberProps): JSX.Element => {
   const [number, setNumber] = useState<number>(value > 1000 ? value - 50 : 0)

   useEffect(() => {
      let interval = setInterval(() => {
        setNumber(prev => prev + 1)
      }, .5)
  
      if (number === value) clearInterval(interval)
    }, [number, value])

   return <Text {...{ style }}>{number}</Text>
}