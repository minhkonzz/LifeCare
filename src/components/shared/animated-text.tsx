import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { AnimatedNumberProps } from '@utils/interfaces'
import { formatNum } from '@utils/helpers'

export default ({ value, style }: AnimatedNumberProps): JSX.Element => {
  const [ number, setNumber ] = useState<number>(value < 60 ? 0 : value - 50)

  useEffect(() => {
    if (value <= 0 && number === 0) return
    let interval = setInterval(() => {
      setNumber((prevNumber) => {
        if ((value > number && prevNumber >= value) || (value < number && prevNumber <= value)) {
          clearInterval(interval)
          return value
        }
        const offset = (Math.abs(prevNumber - value) <= 50 && 1) || Math.round((value > 0 && value || 100) / 90)
        return prevNumber + (value < number ? -offset : offset)
      });
    }, 0)

    return () => clearInterval(interval)
  }, [value])

  const numberText: string = number ? formatNum(Number(number.toFixed(2))) : '0'
  return <Text {...{ style }}>{numberText}</Text>
}