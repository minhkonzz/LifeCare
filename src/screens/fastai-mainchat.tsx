import { memo, useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Message } from '@utils/types'
import MessageIconSvg from '@assets/icons/message.svg'
import BackIconSvg from '@assets/icons/goback.svg'
import MicrophoneIconSvg from '@assets/icons/microphone.svg'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const RenderMessage = memo(({ item }: { item: any }): JSX.Element => {
   const isUserMessage = item.sender === 'user'
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 320,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <View
         style={{
            flexDirection: isUserMessage ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingVertical: vS(14)
         }}>
         <AnimatedLinearGradient
            style={{
               maxWidth: hS(268),
               elevation: 16,
               shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
               opacity: animateValue,
               transform: [{ translateY: animateValue.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }, { scale: animateValue }],
               backgroundColor: isUserMessage ? '#e6e6e6' : '#d1ecf1',
               borderBottomLeftRadius: hS(28),
               borderBottomRightRadius: hS(28),
               padding: hS(16),
               ...isUserMessage ? 
               { borderTopLeftRadius: hS(28) } : 
               { borderTopRightRadius: hS(28) }
            }}
            colors={isUserMessage && [`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex] || ['#e7e7e7', '#e7e7e7']}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: .5 }}>
            <Text style={{...styles.messageText, color: isUserMessage && '#fff' || darkHex }}>{item.text}</Text>
         </AnimatedLinearGradient>
      </View>
   );
})
 
export default (): JSX.Element => {
   const [ messages, setMessages ] = useState<Message[]>([])
   const [ userInput, setUserInput ] = useState<string>('')
   const flatListRef = useRef<any>()

   useEffect(() => {
      
   }, [])

   const pushMessage = (sender: string) => {
      if (userInput.trim() === '') return

      const newMessage = {
         id: messages.length + 1,
         text: userInput.trim(),
         sender
      }

      setMessages([...messages, newMessage])
      if (sender === 'user') setUserInput('')
      flatListRef.current.scrollToEnd({ animated: true })
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <BackIconSvg width={hS(9.2)} />
            <View style={styles.headerCenter}>
               <View style={styles.headerTitleWrapper}>
                  <Text style={styles.headerTitle}>FastAI</Text>
                  <View style={styles.onlineSignal}/>
               </View>
               <Text style={styles.typingText}>Bot typing</Text>
            </View>
            <View />
         </View>  
         <FlatList 
            style={styles.messages}
            ref={flatListRef} 
            data={messages}
            showsVerticalScrollIndicator={false} 
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => <RenderMessage {...{ item }} />} 
            contentContainerStyle={styles.messagesContent} 
            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} />
         <View style={styles.bottomChatBox}>
            <View style={styles.typpingBoxWrapper}>
               <TextInput value={userInput} style={styles.typingBox} placeholder='Ask me something' onChangeText={t => setUserInput(t)} />
               <MicrophoneIconSvg style={styles.voiceIc} width={hS(15)} />
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={() => pushMessage('user')}>
               <LinearGradient 
                  style={styles.sendButton}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .52, y: 1 }}>
                  <MessageIconSvg style={styles.messageIc} width={hS(28)} height={vS(28)} />
               </LinearGradient>
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingBottom: vS(27), 
      paddingHorizontal: hS(24)
   }, 

   header: {
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   headerCenter: {
      marginTop: vS(22)
   },

   headerTitleWrapper: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   headerTitle: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(13), 
      color: darkHex,
      marginTop: 2
   },

   onlineSignal: {
      width: hS(9), 
      height: vS(9),
      backgroundColor: primaryHex,
      borderRadius: 30, 
      marginLeft: 7
   },

   typingText: {
      fontSize: hS(10), 
      fontFamily: 'Poppins-Medium', 
      color: '#a4a4a4',
      marginTop: vS(4)
   }, 
   
   bottomChatBox: {  
      width: '100%',
      flexDirection: 'row',
      height: vS(66),
      justifyContent: 'space-between'
   }, 

   sendButton: {
      width: hS(66), 
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 500,
      elevation: 12, 
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
   }, 

   typpingBoxWrapper: {
      width: '78%', 
      height: '100%',
   },

   typingBox: {
      height: '100%',
      backgroundColor: `rgba(${darkRgb.join(', ')}, .08)`,
      borderRadius: vS(24),
      paddingLeft: hS(21),
      paddingRight: hS(50),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: darkHex
   },

   voiceIc: {
      position: 'absolute', 
      right: '7%', 
      top: '30%'
   }, 

   messages: {
      width: '100%',
      marginBottom: vS(30)
   },

   messageIc: {
      marginLeft: hS(4),
      marginBottom: vS(4)
   },

   messageText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(13),
      letterSpacing: .2,
      lineHeight: vS(24)
   },

   messagesContent: {
      flexGrow: 1, 
      paddingVertical: vS(32)
   }
})

