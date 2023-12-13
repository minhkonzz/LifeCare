import { useState, Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@store/index'
import { updateMetadata } from '@store/user'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { milliliterToOunce, ounceToMilliliter } from '@utils/fomular'
import UserService from '@services/user'
import MeasureInput from '../measure-input'
import withPopupBehavior from '@hocs/withPopupBehavior'
import LinearGradient from 'react-native-linear-gradient'
import SettingToggleValue from '../setting-toggle-value'

const symbOptions: [string, string] = ['ML', 'OZ']

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
      const userId: string | null = session && session.user.id || null
      const { dailyWater } = metadata
      const [ goal, setGoal ] = useState<number>(dailyWater)
      const [ toggled, setToggled ] = useState<boolean>(false)
      const [ selectedSymbOption, setSelectedSymbOption ] = useState<string>(symbOptions[Number(toggled)])

      const onSave = async () => {
         const payload = { dailyWater: goal }
         if (userId) {
            const errorMessage: string = await UserService.updatePersonalData(userId, payload)
            return
         }
         dispatch(updateMetadata(payload))
         setVisible(false)
      }

      const onChangeSymb = () => {
         const convertFn = toggled && ounceToMilliliter || milliliterToOunce
         setGoal(convertFn(goal))
         setToggled(!toggled)
         setSelectedSymbOption(symbOptions[Number(!toggled)])
      }

      return (
         <>
            <SettingToggleValue value={symbOptions} onPress={onChangeSymb} w={hS(180)} />
            <MeasureInput 
               contentCentered
               symb={selectedSymbOption}
               value={goal} 
               onChangeText={t => setGoal(+t)} 
               additionalStyles={styles.input} />
            <TouchableOpacity
               onPress={() => onConfirm(onSave)}
               activeOpacity={.7}
               style={styles.button}>
               <LinearGradient
                  style={styles.buttonBg}
                  colors={['rgba(116, 155, 194, .6)', '#749BC2']}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={styles.buttonText}>Save</Text>
               </LinearGradient>
            </TouchableOpacity>
         </>
      )
   },
   'centered', 
   'Goal', 
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
   }, 

   input: {
      marginVertical: vS(20), 
      marginLeft: hS(28)
   }
})