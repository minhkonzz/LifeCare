import { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import UserService from '@services/user'
import LinearGradient from 'react-native-linear-gradient'

const genders: string[] = ['Male', 'Female', 'Other']

export default withPopupBehavior(
   withSync(({ 
      setVisible, 
      onConfirm,
      isOnline
   }: {
      setVisible: Dispatch<SetStateAction<any>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }): JSX.Element => {
      const dispatch = useDispatch()
      const { session, metadata } = useSelector((state: AppState) => state.user)
      const userId: string | null = session && session?.user.id || null
      const { gender } = metadata
      const [ currentGender, setCurrentGender ] = useState<string>(gender)

      const onSave = async () => {
         const payload = { gender: currentGender }

         const cache = (beQueued = false) => {
            dispatch(updateMetadata(payload))
            if (beQueued) {
               dispatch(enqueueAction({
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_GENDER',
                  params: [userId, payload]
               }))
            }
         }

         if (!userId) cache()
         else if (!isOnline) cache(true)
         else {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache(true)
         }
         setVisible(false)
      }

      return (
         <>
            {
               genders.map((e, i) => 
                  <Pressable 
                     key={i} 
                     style={{...styles.option, marginTop: i === 0 ? 0 : vS(33) }}
                     onPress={() => setCurrentGender(e)}>
                     <Text style={styles.optionText}>{e}</Text>
                     <View style={styles.circleBound}>
                     { 
                        currentGender === e && 
                        <LinearGradient 
                           style={styles.primaryIndicator}
                           colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                           start={{ x: .5, y: 0 }}
                           end={{ x: .5, y: 1 }}
                        />
                     }
                     </View>
                  </Pressable>
               )
            }
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
               activeOpacity={.7}
               style={styles.button}>
               <LinearGradient
                  style={styles.buttonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   }),
   'centered',
   'Gender',
   hS(280)
)

const styles = StyleSheet.create({
   option: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   optionText: {
      fontFamily: 'Poppins-Ragular', 
      fontSize: hS(15), 
      color: darkHex,
      letterSpacing: .2
   }, 

   circleBound: {
      width: hS(22), 
      height: vS(22), 
      borderRadius: hS(11), 
      borderWidth: 1, 
      borderColor: `rgba(${darkRgb.join(', ')}, .5)`, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   primaryIndicator: {
      width: hS(14), 
      height: vS(14), 
      borderRadius: hS(7)
   },

   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})