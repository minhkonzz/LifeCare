export const getDates = (limit: number) => {
   const currentDate: Date = new Date()
   const dates: Date[] = []

   for (let i = limit; i >= 1; i--) {
      const date: Date = new Date()
      date.setDate(currentDate.getDate() - i)
      dates.push(date)
   }

   for (let i = 0; i <= limit; i++) {
      const date: Date = new Date()
      date.setDate(currentDate.getDate() + i)
      dates.push(date)
   }
   return dates.map((date) => date.toISOString())
}