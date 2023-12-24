import { formatNum } from "./helpers"

export const getCurrentTimestamp = (): number => {
   const date = new Date()
   return date.getTime()
}

export const getCurrentDate = (): string => {
   const today = new Date()
   const year = today.getFullYear()
   const month = String(today.getMonth() + 1).padStart(2, '0')
   const date = String(today.getDate()).padStart(2, '0')
   return `${year}-${month}-${date}`
}

export const getCurrentUTCDate = (): string => {
   const d: Date = new Date()
   const y: number = d.getUTCFullYear()
   const m: string = (d.getUTCMonth() + 1).toString().padStart(2, '0')
   const _d: string = (d.getUTCDate()).toString().padStart(2, '0')
   return `${y}-${m}-${_d}`
}

export const getCurrentUTCDateV2 = (): string => {
   const d: Date = new Date()
   const y: number = d.getUTCFullYear()
   const m: string = (d.getUTCMonth() + 1).toString().padStart(2, '0')
   const _d: string = (d.getUTCDate()).toString().padStart(2, '0')
   return `${m}/${_d}/${y}`
}

export const getCurrentUTCDatetimeV1 = () => {
   const d = new Date()
   const year = d.getUTCFullYear()
   const month = String(d.getUTCMonth() + 1).padStart(2, '0')
   const day = String(d.getUTCDate()).padStart(2, '0')
   const hours = String(d.getUTCHours()).padStart(2, '0')
   const minutes = String(d.getUTCMinutes()).padStart(2, '0')
   const seconds = String(d.getUTCSeconds()).padStart(2, '0')
   const milliseconds = String(d.getUTCMilliseconds()).padStart(3, '0')
   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`
}

export const isSameDay = (d1: Date, d2: Date): boolean => {
   const yearD1: number = d1.getFullYear()
   const monthD1: number = d1.getMonth()
   const dateD1: number = d1.getDate()
   const yearD2: number = d2.getFullYear()
   const monthD2: number = d2.getMonth()
   const dateD2: number = d2.getDate()
   return yearD1 === yearD2 && monthD1 === monthD2 && dateD1 === dateD2
}

export const getDayTitle = (dateOrDay: Date, shortern: boolean): string => {
   const day = dateOrDay instanceof Date && dateOrDay.getDay() || dateOrDay
   switch (day) {
      case 1: 
         return shortern && 'Mon' || 'Monday'
      case 2: 
         return shortern && 'Tue' || 'Tuesday'
      case 3: 
         return shortern && 'Wed' || 'Wednesday'
      case 4: 
         return shortern && 'Thu' || 'Thursday'
      case 5: 
         return shortern && 'Fri' || 'Friday'
      case 6:
         return shortern && 'Sat' || 'Saturday'
      default:
         return shortern && 'Sun' || 'Sunday'
   }
}

export const getMonthTitle = (dateOrMonth: Date | number, shortern: boolean): string => {
   const month = dateOrMonth instanceof Date && dateOrMonth.getMonth() || dateOrMonth
   switch (month) {
      default: 
         return shortern && 'Jan' || 'January'
      case 1:
         return shortern && 'Feb' || 'February'
      case 2: 
         return shortern && 'Mar' || 'March'
      case 3:
         return shortern && 'Apr' || 'April'
      case 4:
         return 'May'
      case 5:
         return shortern && 'Jun' || 'June'
      case 6: 
         return shortern && 'Jul' || 'July'
      case 7:
         return shortern && 'Aug' || 'August'
      case 8:
         return shortern && 'Sep' || 'September'
      case 9:
         return shortern && 'Oct' || 'October'
      case 10:
         return shortern && 'Nov' || 'November'
      case 11:
         return shortern && 'Dec' || 'December'
   }
}

export const getLocalTimeV1 = (utcDate: Date): Date => {
   const year: number = utcDate.getFullYear()
   const month: number = utcDate.getMonth() + 1
   const day: number = utcDate.getDate()
   const hours: number = utcDate.getHours()
   const mins: number = utcDate.getMinutes()
   const secs: number = utcDate.getSeconds()
   return new Date(`${year}-${month}-${day} ${hours}:${mins}:${secs}`)
}

export const getLocalDatetimeV2 = () => {
   return new Intl.DateTimeFormat('en', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
   }).format(new Date())
}

// moi update cho nay, can sua toan bo cac cho lien quan
export const getDatesRange = (limit: number, inWeeks = false) => {
   const dateArray: Array<{ title: string, value: string, date: number, month: number, year: number }> = []
   const currentDate = new Date()
   for (let i = -limit; i <= 10; i += (inWeeks ? 7 : 1)) {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + i)
      const month = newDate.getMonth()
      const date = newDate.getDate()
      const year = newDate.getFullYear()
      const formattedMonth = newDate.toLocaleString('en-US', { month: 'short' })
      const formattedDate = `${formattedMonth} ${date}`
      dateArray.push({
         title: i === -1 && 'Yesterday' || i === 1 && 'Tomorrow' || i === 0 && 'Today' || formattedDate,
         value: `${year}-${formatNum(month + 1)}-${formatNum(date)}`,
         date,
         month, 
         year
      })
   }
   return dateArray
}

export const calculateAmountBetweenTimes = ({ 
   startTime, 
   endTime
}: {
   startTime: string, 
   endTime: string
}) => {
   /* startTime: "22:30" */
   const startDate: Date = new Date("2000-01-01 " + startTime)
   const endDate: Date = new Date("2000-01-01 " + endTime)

   if (endDate < startDate) endDate.setDate(endDate.getDate() + 1)

   return endDate - startDate
}

export const timestampToDateTime = (time: number) => {
   // const s = formatNum(Math.floor((time / 1000) % 60))
   // const m = formatNum(Math.floor((time / 1000 / 60) % 60))
   // const h = formatNum(Math.floor((time / 1000 / 60 / 60) % 24))

   const h = formatNum(Math.floor(time / (1000 * 60 * 60)))
   const m = formatNum(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))
   const s = formatNum(Math.floor((time % (1000 * 60)) / 1000))
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

export const toDateTimeV1 = (timestamp: number): string => {
   const d = new Date(timestamp)
   return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
   }).format(d)
}

