import { formatNum } from "./helpers"

export const getCurrentTimestamp = () => {
   const date = new Date()
   return date.getTime()
}

export const getDatesRange = (limit: number) => {
   const dateArray: Array<{ title: string, value: string }> = []
   const currentDate = new Date()
   for (let i = -limit; i <= limit; i++) {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + i)
      const month = newDate.toLocaleString('en-US', { month: 'short' })
      const day = newDate.getDate()
      const formattedDate = `${month} ${day}`
      dateArray.push({
         title: i === -1 && 'Yesterday' || i === 1 && 'Tomorrow' || i === 0 && 'Today' || formattedDate,
         value: formattedDate
      })
   }
   return dateArray
}

export const timestampToDateTime = (time: number) => {
   const s = formatNum(Math.floor((time / 1000) % 60))
   const m = formatNum(Math.floor((time / 1000 / 60) % 60))
   const h = formatNum(Math.floor((time / 1000 / 60 / 60) % 24))
   return `${h}:${m}:${s}`
}

export const hoursToTimestamp = (hours: number) => {
   const milliseconds = hours * 3600000;
   const d = new Date(milliseconds)
   return d.getTime()
}

export const toTimestampV1 = (date: string, h: number, m: number) => {
   const y = new Date().getFullYear()
   const [ monthShort, day ] = date.split(' ')
   const d = new Date(`${y}-${[[
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
   ].indexOf(monthShort) + 1, day].join('-')} ${h}:${m}`)
   return d.getTime()
}

export const toDateTimeV1 = (timestamp: number) => {
   const d = new Date(timestamp)
   return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
   }).format(d)
}

