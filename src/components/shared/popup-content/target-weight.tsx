import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateMetadata } from '@store/user'
import withPopupBehavior from '@hocs/withPopupBehavior'
import MeasureInput from '../measure-input'
import LinearGradient from 'react-native-linear-gradient'
import PrimaryToggleValue from '../primary-toggle-value'
import UserService from '@services/user'

const options: string[] = ['kg', 'lb']
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default withPopupBehavior(
   ({ 
      setVisible, 
      onConfirm
   }: { 
      setVisible: Dispatch<SetStateAction<any>>, 
      onConfirm: (afterDisappear: () => Promise<void>) => void
   }) => {
      const dispatch = useDispatch()
      const { session, metadata } = useSelector((state: AppState) => state.user)
      const userId: string | null = session && session?.user.id || null
      const { goalWeight } = metadata
      const [ weight, setWeight ] = useState<number>(goalWeight)

      const onSave = async () => {
         const payload = { goalWeight: weight }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      }

      return (
         <>
            <PrimaryToggleValue {...{ options }} />
            <MeasureInput 
               contentCentered
               symb='kg' 
               value={weight} 
               onChangeText={t => setWeight(+t)} />
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
   },
   'centered',
   'Target weight',
   hS(300)
)

const styles = StyleSheet.create({
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