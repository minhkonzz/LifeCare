export const getBMIStatus = (value: number): string => {
   return (
      value < 16 && 'Severe Thinness' ||
      value >= 16 && value < 17 && 'Moderate thinness' ||
      value >= 17 && value < 18.5 && 'Mild thinness' || 
      value >= 18.5 && value < 25 && 'Normal' ||
      value >= 25 && value < 30 && 'Overweight' ||
      value >= 30 && value < 35 && 'Obese class 1' || 'Obese class 2'
   )
}

export const autoId = (prefix: string): string => {
   const timestamp = Date.now().toString(36)
   const random = Math.random().toString(36).slice(2, 8)
   return prefix + timestamp + random
}

export const formatNum = (value: number): string => {
   return value.toString().padStart(2, '0')
}

export const convertObjectKeysToCamelCase = (obj: any) => {
   return Object.keys(obj).reduce((convertedObj, key) => {
      const convertedKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
      convertedObj[convertedKey] = obj[key]
      return convertedObj
   }, {})
}

export const convertObjectKeysToSnakeCase = (obj: any) => {
   return Object.keys(obj).reduce((convertedObj, key) => {
      const convertedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      convertedObj[convertedKey] = obj[key]
      return convertedObj
   }, {})
}