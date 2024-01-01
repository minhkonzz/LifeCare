const Colors = {
    primary: {
        hex: '#30E3CA',
        rgb: [48, 227, 202]
    },
    darkPrimary: {
        hex: '#40514E',
        rgb: [64, 81, 78]
    },
    lightPrimary: {
        hex: '#E4F9F5',
        rgb: [228, 249, 245]
    },
    lightBlue: {
        hex: '#91C8E4',
        rgb: [145, 200, 228]
    },
    strongBlue: {
        hex: '#4682A9',
        rgb: [70, 130, 169]
    }
}

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary
const { hex: lightBlueHex, rgb: lightBlueRgb } = Colors.lightBlue
const { hex: strongBlueHex, rgb: strongBlueRgb } = Colors.strongBlue

export { 
    primaryHex, 
    primaryRgb, 
    darkHex, 
    darkRgb, 
    lightHex, 
    lightRgb, 
    lightBlueHex, 
    lightBlueRgb, 
    strongBlueHex, 
    strongBlueRgb 
}
