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

const d = new Date('2023-11-28T08:57:44.240408+00:00')
console.log(d.toLocaleString())
