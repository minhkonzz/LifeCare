import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { updateMetadata } from '@store/user'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import WheelPicker from '../wheel-picker'
import UserService from '@services/user'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const ages: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)

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
      const { age } = metadata
      const [ currentAge, setCurrentAge ] = useState<number>(age)
      const currentAgeIndex: number = ages.findIndex(e => e === currentAge)

      const onSave = async () => {                  
         const payload = { age: currentAge }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      }

      const onChangeAge = (index: number) => {
         setCurrentAge(ages[index])
      }

      return (
         <>
            <WheelPicker 
            items={ages} 
            itemHeight={vS(72)} 
            onIndexChange={onChangeAge} 
            initialScrollIndex={currentAgeIndex} />
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
   'Age',
   hS(332)
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