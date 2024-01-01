import { memo, useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Message } from '@utils/types'
import { MessageIcon, BackIcon, MicrophoneIcon } from '@assets/icons'
import { SERVER_URL } from '@env'
import { AnimatedLinearGradient } from '@components/shared/animated'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

const RenderMessage = memo(({ item, sent }: { item: any, sent: boolean }): JSX.Element => {
   const isUserMessage = item.sender === 'user'
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   useEffect(() => {
      if (!sent) {
         Animated.timing(animateValue, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true
         }).start()
      }
   }, [])

   if (!isUserMessage && !item.text) return (
      <>
         <Text style={styles.typingText}>Bot typing</Text>
         <LottieView 
            style={styles.chatTypingLottie}
            source={require('../assets/lottie/chat-typing.json')} 
            autoPlay />
      </>
   )

   return (
      <View
         style={{
            flexDirection: isUserMessage ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingVertical: vS(14)
         }}>
         <AnimatedLinearGradient
            style={{
               ...styles.message,
               opacity: animateValue,
               transform: [{ translateY: animateValue.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }, { scale: animateValue }],
               backgroundColor: isUserMessage ? '#e6e6e6' : '#d1ecf1',
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
   )
})
 
export default (): JSX.Element => {
   const [ messages, setMessages ] = useState<Message[]>([])
   const [ question, setQuestion ] = useState<string>('')
   const flatListRef = useRef<any>()

   const pushMessage = ({ message, sender }: { message: string, sender: string }) => {
      if (sender === 'user' && !message.trim()) return

      const newMessage = {
         id: `${messages.length + 1 * Math.round(Math.random() * 100)}`,
         text: message,
         sender
      }

      if (sender === 'user') {
         const botMessageAwait = {
            id: `${messages.length + 1 * Math.round(Math.random() * 100)}`,
            text: '',
            sender: 'bot'
         }
         setMessages(prev => [...prev, newMessage, botMessageAwait])
      }
      else setMessages(prev => [...prev.slice(0, -1), newMessage])
      flatListRef.current.scrollToEnd({ animated: true })
   }

   const sendMessage = async (message: string) => {
      pushMessage({ message, sender: 'user' })
      setQuestion('')
      const botResponse = await fetch(`${SERVER_URL}/chat/q`, {
         method: 'POST',
         body: JSON.stringify({ question: message }),
         headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
      const { text } = await botResponse.json()
      console.log('text:', text)
      pushMessage({ message: text, sender: 'bot' })
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <BackIcon style={styles.backIc} width={hS(9.2)} />
            <View style={styles.headerTitleWrapper}>
               <Text style={styles.headerTitle}>FastAI</Text>
               <View style={styles.onlineSignal}/>
            </View>
         </View>  
         <FlatList 
            style={styles.messages}
            ref={flatListRef} 
            data={messages}
            showsVerticalScrollIndicator={false} 
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <RenderMessage {...{ item, sent: (index < messages.length - 2) }} />}
            contentContainerStyle={styles.messagesContent} 
            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} />
         <View style={styles.bottomChatBox}>
            <View style={styles.typpingBoxWrapper}>
               <TextInput value={question} style={styles.typingBox} placeholder='Ask me something' onChangeText={t => setQuestion(t)} />
               <MicrophoneIcon style={styles.voiceIc} width={hS(15)} />
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={() => sendMessage(question)}>
               <LinearGradient 
                  style={styles.sendButton}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .52, y: 1 }}>
                  <MessageIcon style={styles.messageIc} width={hS(28)} height={vS(28)} />
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

   message: {
      maxWidth: hS(268),
      elevation: 10,
      shadowColor: `rgba(${darkRgb.join(', ')}, .4)`,
      padding: hS(16),
      borderBottomLeftRadius: hS(28),
      borderBottomRightRadius: hS(28)
   },

   backIc: {
      marginTop: vS(20)
   },

   chatTypingLottie: {
      width: hS(150),
      height: vS(50) 
   },

   header: {
      width: '100%'
   },

   headerTitleWrapper: {
      flexDirection: 'row', 
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: vS(-30)
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
      color: '#a4a4a4'
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

