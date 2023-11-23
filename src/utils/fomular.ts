export const getBMI = (mass: number, height: number) => {
   const res = mass / (height ** 2)
   return Number(res.toFixed(2))
}

export const kilogramsToPounds = (value: number): number => {
   const res = value * 2.20462262
   return Number(res.toFixed(2))
} 

export const poundsToKilograms = (value: number): number => {
   const res = value * 0.45359237
   return Number(res.toFixed(2))
}

export const centimeterToInch = (value: number): number => {
   const res = value * 0.393700787
   return Number(res.toFixed(2))
}

export const inchToCentimeter = (value: number): number => {
   const res = value * 2.54
   return Number(res.toFixed(2))
}

export const milliliterToOunce = (value: number): number => {
   const res = value * 0.0338140227
   return Number(res.toFixed(2))
}

export const ounceToMilliliter = (value: number) => {
   const res = value * 29.5735296
   return Number(res.toFixed(2))
}