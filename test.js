// const handle = (start_time_stamp, end_time_stamp) => {
// 	const startDate = new Date(start_time_stamp)
// 	const endDate = new Date(end_time_stamp)
// 	const fastingData = []

// 	const currentDate = new Date(startDate)
// 	while (currentDate <= endDate) {
// 		const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
// 		const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

// 		const startTimeStamp = Math.max(startOfDay.getTime(), startDate.getTime())
// 		const endTimeStamp = Math.min(endOfDay.getTime(), endDate.getTime())

// 		const totalMilliseconds = endTimeStamp - startTimeStamp
// 		const totalHours = totalMilliseconds / (1000 * 60 * 60)

// 		if (totalHours >= 1) {
// 			const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })
// 			const startTime = formatter.format(new Date(startTimeStamp))
// 			const endTime = formatter.format(new Date(endTimeStamp))
// 			const date = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
// 			fastingData.push({ date, startTime, endTime, totalHours })
// 		}

// 		currentDate.setDate(currentDate.getDate() + 1)
// 	}
// 	return fastingData
// }

// console.log(handle(1700014550000, 1700190950000))

// const formatNum = (value) => {
//    return value.toString().padStart(2, '0')
// }

// const handleFastingRecords = (startTimestamp, endTimestamp) => {
//    const startDate = new Date(startTimestamp) // utc
//    const endDate = new Date(endTimestamp)     // utc
//    const fastingData = {}

//    const currentDate = new Date(startDate)
//    while (currentDate <= endDate) {
//       const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
//       const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

//       const startTimeStamp = Math.max(startOfDay.getTime(), startDate.getTime())
//       const endTimeStamp = Math.min(endOfDay.getTime(), endDate.getTime())

//       // calculate total of day
//       const totalMilliseconds = endTimeStamp - startTimeStamp
//       const totalHours = totalMilliseconds / (1000 * 60 * 60)

//       if (totalHours >= 1) {
//          const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })
//          const startTime = formatter.format(getLocalTimeV1(new Date(startTimeStamp)))
//          const endTime = formatter.format(getLocalTimeV1(new Date(endTimeStamp)))
//          const [ m, d, y ] = currentDate.toLocaleDateString().split('/')
//          fastingData[date] = { startTime, endTime, totalHours: Math.round(totalHours) }
//       }

//       currentDate.setUTCDate(currentDate.getUTCDate() + 1)
//    }

//    return fastingData
// }

// const getLocalTimeV1 = (utcDate) => {
//    const year = utcDate.getFullYear()
//    const month = utcDate.getMonth() + 1
//    const day = utcDate.getDate()
//    const hours = utcDate.getHours()
//    const mins = utcDate.getMinutes()
//    const secs = utcDate.getSeconds()
//    return new Date(`${year}-${formatNum(month)}-${formatNum(day)} ${formatNum(hours)}:${formatNum(mins)}:${formatNum(secs)}`)
// }

// // console.log(handleFastingRecords(1701570543000, 1701729003000))
// console.log(new Date().toLocaleDateString())

const d = new Date("2023-12-22T10:19:41.359444+00")
console.log(d)