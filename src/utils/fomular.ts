export const getBMI = (mass: number, height: number) => {
   return mass / Math.pow(height, 2) 
}

export const kilogramsToPounds = (value: number) => {
   const res = value * 2.20462262
   Number(res.toFixed(2))
} 

export const poundsToKilograms = (value: number) => {
   const res = value * 0.45359237
   Number(res.toFixed(2))
}

export const centimeterToInch = (value: number) => {
   const res = value * 0.393700787
   return Number(res.toFixed(2))
}

export const inchToCentimeter = (value: number) => {
   const res = value * 2.54
   return Number(res.toFixed(2))
}