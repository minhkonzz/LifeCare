import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { AnimatedNumberProps } from '@utils/interfaces'

export default ({ value, style }: AnimatedNumberProps): JSX.Element => {
  const [number, setNumber] = useState<number>(value < 60 ? 0 : value - 50)

  useEffect(() => {
    if (value <= 0) return
    let interval = setInterval(() => {
      setNumber((prevNumber) => {
        if ((value > number && prevNumber >= value) || (value < number && prevNumber <= value)) {
          clearInterval(interval)
          return prevNumber
        }
        return prevNumber + (value < number ? -1 : 1)
      });
    }, 0)

    return () => clearInterval(interval)
  }, [value])

  return <Text {...{ style }}>{number}</Text>
}