export const autoId = (prefix: string) => {
   const timestamp = Date.now().toString(36)
   const random = Math.random().toString(36).slice(2, 8)
   return prefix + timestamp + random
}

export const formatNum = (value: number) => {
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