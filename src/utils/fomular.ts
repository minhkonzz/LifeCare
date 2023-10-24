export const getBMI = (mass: number, height: number) => {
   return mass / Math.pow(height, 2) 
}