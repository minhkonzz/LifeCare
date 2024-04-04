import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@store/index'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata, enqueueAction } from '@store/user'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { commonStyles } from '@utils/stylesheet'
import withSync from '@hocs/withSync'
import withPopupBehavior from '@hocs/withPopupBehavior'
import UserService from '@services/user'
import LinearGradient from 'react-native-linear-gradient'
import useSession from '@hooks/useSession'

const { popupButton, popupButtonBg, popupButtonText } = commonStyles
const genders: string[] = ['Male', 'Female', 'Other']

export default withPopupBehavior(
   withSync(({  
      onConfirm,
      isOnline
   }: {
      onConfirm: (afterDisappear: () => Promise<void>) => void,
      isOnline: boolean
   }): JSX.Element => {
      const dispatch = useDispatch()
      const { metadata } = useSelector((state: AppStore) => state.user)
      const { userId } = useSession()
      const { gender } = metadata
      const [ currentGender, setCurrentGender ] = useState<string>(gender)

      const onSave = async () => {
         const payload = { gender: currentGender }

         const cache = () => {
            dispatch(updateMetadata(payload))
            if (userId && !isOnline) {
               dispatch(enqueueAction({
                  userId,
                  actionId: autoId('qaid'),
                  invoker: 'updatePersonalData',
                  name: 'UPDATE_GENDER',
                  params: [userId, payload]
               }))
            }
         }

         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            if (errorMessage === NETWORK_REQUEST_FAILED) cache()
            return
         }
         cache()
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
               style={popupButton}>
               <LinearGradient
                  style={popupButtonBg}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={popupButtonText}>Save</Text>
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
   }
})