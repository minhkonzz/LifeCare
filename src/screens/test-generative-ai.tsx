import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GOOGLE_AI_KEY } from '@env'

const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY)

export default (): JSX.Element => {

   const [ answer, setAnswer ] = useState<string>('')

   useEffect(() => {
      async function test() {
         const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
         const prompt = "I'm new with Fasting diet, I want to know what fasting plan is for me if my height is 180 centimeter, my current weight is 89 kg, my goal weight is 65 kg, my gender is male, I'm 22 years old, I sleep about 9 hours every night, I'm very active at exercise. I want the response includes: plan_name, daily_water, daily_calories and another tips. Response need in JSON format."
         const ans = await model.generateContent(prompt)
         const res = await ans.response.text()
         let startIndex = res.indexOf("{")
         let endIndex = res.lastIndexOf("}")
         let jsonString = res.substring(startIndex, endIndex + 1)
         console.log(JSON.parse(jsonString))
         setAnswer(jsonString)
      }

      test()
   }, [])

   return (
      <View style={styles.container}>
         <Text>{answer}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
   }
})