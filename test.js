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

// const queuedActions = {}

// const autoId = (prefix) => {
//    const timestamp = Date.now().toString(36)
//    const random = Math.random().toString(36).slice(2, 8)
//    return prefix + timestamp + random
// }

// const getCurrentUTCDateV2 = () => {
//    const d = new Date()
//    const y = d.getUTCFullYear()
//    const m = (d.getUTCMonth() + 1).toString().padStart(2, '0')
//    const _d = (d.getUTCDate()).toString().padStart(2, '0')
//    return `${m}/${_d}/${y}`
// }

// function enqueueAction(newAction) {
//    const { userId, name, ...rest } = newAction
//    const userQueuedActions = queuedActions[userId] || {}

//    if (![
//       'UPDATE_WEIGHT',
//       'UPDATE_WEIGHTS',
//       'UPDATE_BMI',
//       'UPDATE_HIPS',
//       'UPDATE_CHEST',
//       'UPDATE_WAIST',
//       'UPDATE_THIGH',
//       'UPDATE_START_FASTING_TIME',
//       'UPDATE_END_FASTING_TIME'
//    ].includes(name)) {
//       queuedActions[userId] = { ...userQueuedActions, [name]: rest }
//       return
//    }

//    if (['UPDATE_WEIGHT', 'UPDATE_WEIGHTS', 'UPDATE_BMI'].includes(name)) {
//       const { currentWeight, newBodyRecId, currentDate } = newAction.params[1]
//       queuedActions[userId] = {
//          ...userQueuedActions,
//          UPDATE_WEIGHT: {
//             actionId: autoId('qaid'),
//             invoker: 'updateWeight',
//             params: JSON.stringify([userId, { currentWeight, newBodyRecId, currentDate }])
//          },
//          ...((() => {
//             switch (name) {
//                case 'UPDATE_WEIGHTS': {
//                   const { goalWeight } = newAction.params[1]
//                   return {
//                      UPDATE_GOAL_WEIGHT: {
//                         actionId: autoId('qaid'),
//                         invoker: 'updatePersonalData',
//                         params: JSON.stringify([userId, { goalWeight }])
//                      }
//                   }
//                }
//                case 'UPDATE_BMI': {
//                   const { currentHeight } = newAction.params[1]
//                   return {
//                      UPDATE_HEIGHT: {
//                         actionId: autoId('qaid'),
//                         invoker: 'updatePersonalData',
//                         params: JSON.stringify([userId, { currentHeight }])
//                      }
//                   }
//                }
//             }
//          })())
//       }
//    }

//    if (['UPDATE_HIPS', 'UPDATE_CHEST', 'UPDATE_WAIST', 'UPDATE_THIGH'].includes(name)) {
//       const { currentDate, type, value, newBodyRecId } = newAction.params[1]
//       queuedActions[userId] = {
//          ...userQueuedActions,
//          ...((() => {
//             switch (name) {
//                case 'UPDATE_HIPS': return {
//                   UPDATE_HIPS: {
//                      actionId: autoId('qaid'),
//                      invoker: 'updatePersonalData',
//                      params: JSON.stringify([userId, { hipsMeasure: value }])
//                   }
//                }
//                case 'UPDATE_WAIST': return {
//                   UPDATE_WAIST: {
//                      actionId: autoId('qaid'),
//                      invoker: 'updatePersonalData',
//                      params: JSON.stringify([userId, { waistMeasure: value }])
//                   }
//                }
//                case 'UPDATE_THIGH': return {
//                   UPDATE_THIGH: {
//                      actionId: autoId('qaid'),
//                      invoker: 'updatePersonalData',
//                      params: JSON.stringify([userId, { thighMeasure: value }])
//                   }
//                }
//                case 'UPDATE_CHEST': return {
//                   UPDATE_CHEST: {
//                      actionId: autoId('qaid'),
//                      invoker: 'updatePersonalData',
//                      params: JSON.stringify([userId, { chestMeasure: value }])
//                   }
//                }
//             }
//          })()),
//          [`UPDATE_BODY_REC_${currentDate}_${type}`]: {
//             actionId: autoId('qaid'),
//             invoker: 'updateBodyRec',
//             params: JSON.stringify([userId, { value, type, currentDate, newBodyRecId }])
//          }
//       }
//       return
//    }

//    if (['UPDATE_START_FASTING_TIME', 'UPDATE_END_FASTING_TIME'].includes(name)) {
//       const [id, payload] = newAction.params
//       const rec = userQueuedActions[`UPDATE_FASTING_REC_${id}`] || null
//       queuedActions[userId] = {
//          ...userQueuedActions,
//          [`UPDATE_FASTING_REC_${id}`]: {
//             ...(rec && payload || {
//                actionId: autoId('qaid'),
//                invoker: 'updateFastingRec',
//                params: JSON.stringify([id, payload])
//             })
//          }
//       }
//       return
//    }
// }

// enqueueAction({
//    userId: 'user1',
//    actionId: 'lorem1',
//    invoker: 'updateWeight',
//    name: 'UPDATE_WEIGHT',
//    params: ['user1', { currentWeight: 67, newBodyRecId: autoId('br'), currentDate: getCurrentUTCDateV2() }]
// })

// enqueueAction({
//    userId: 'user1',
//    actionId: 'lorem1',
//    invoker: 'updateBMI',
//    name: 'UPDATE_BMI',
//    params: ['user1', { currentHeight: 182, currentWeight: 65, newBodyRecId: autoId('br'), currentDate: getCurrentUTCDateV2() }]
// })

// enqueueAction({
//    userId: 'user2',
//    actionId: 'lorem1',
//    invoker: 'updatePersonalData',
//    name: 'UPDATE_HEIGHT',
//    params: ['user2', { currentHeight: 181 }]
// })

// enqueueAction({
//    userId: 'user1',
//    actionId: 'lorem1',
//    invoker: 'updateWeight',
//    name: 'UPDATE_WEIGHT',
//    params: ['user1', { currentWeight: 62, newBodyRecId: autoId('br'), currentDate: getCurrentUTCDateV2() }]
// })

// console.log(queuedActions)

// const getLocalTimeV1 = (utcDate) => {
//    const year = utcDate.getFullYear()
//    const month = utcDate.getMonth() + 1
//    const day = utcDate.getDate()
//    const hours = utcDate.getHours()
//    const mins = utcDate.getMinutes()
//    const secs = utcDate.getSeconds()
//    return new Date(`${year}-${month}-${day} ${hours}:${mins}:${secs}`)
// }

// const formatNum = (value) => {
//    return value.toString().padStart(2, '0')
// }

// const handleFastingRecords = (startTimestamp, endTimestamp, detail = false) => {
//    const startDate = new Date(startTimestamp)
//    const endDate = new Date(endTimestamp)
//    const fastingData = {}

//    const currentDate = new Date(startDate)
//    while (currentDate.getDate() <= endDate.getDate()) {
//       const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
//       const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

//       const startTimeStamp = Math.max(startOfDay.getTime(), startDate.getTime())
//       const endTimeStamp = Math.min(endOfDay.getTime(), endDate.getTime())

//       const totalMilliseconds = endTimeStamp - startTimeStamp
//       const totalHours = totalMilliseconds / (1000 * 60 * 60)

//       if (totalHours >= 1) {
//          const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })
//          const startTime = formatter.format(getLocalTimeV1(new Date(startTimeStamp)))
//          const endTime = formatter.format(getLocalTimeV1(new Date(endTimeStamp)))
//          const y = currentDate.getFullYear()
//          const m = formatNum(currentDate.getMonth() + 1)
//          const d = formatNum(currentDate.getDate())
//          const date = `${y}-${m}-${d}`
//          const newRec = { startTime, endTime, totalHours: Math.round(totalHours) }
//          const e = fastingData[date] || []
//          fastingData[date] = detail && [...e, newRec] || newRec
//       }

//       currentDate.setDate(currentDate.getDate() + 1)
//    }
//    return fastingData
// }

// let initialize = [{ startTimeStamp: 1704976215000, endTimeStamp: 1705012215000 }, { startTimeStamp: 1705023015000, endTimeStamp: 1705062615000 }, { startTimeStamp: 1705069428000, endTimeStamp: 1705101828000 }]

// const standardFastingRecords = initialize.reduce((acc, cur) => {
//    const { startTimeStamp, endTimeStamp } = cur
//    const handled = handleFastingRecords(startTimeStamp, endTimeStamp, true)
//    const dates = Object.keys(handled)
//    for (let i = 0; i < dates.length; i++) {
//       const v = handled[dates[i]]
//       const e = acc[dates[i]]
//       acc[dates[i]] = e && [...e, ...v] || v
//    }
//    return acc
// }, {})

// console.log(standardFastingRecords)