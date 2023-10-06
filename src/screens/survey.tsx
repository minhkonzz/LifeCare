import { 
    FC, 
    useState, 
    useRef, 
    SetStateAction, 
    Dispatch, 
    memo
} from 'react' 

import {
    View, 
    Text, 
    Pressable, 
    FlatList,
    TouchableOpacity,
    StyleSheet, 
    Animated, 
    Easing, 
    Dimensions, 
    Platform, 
    StatusBar
} from 'react-native'

import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'   
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import WheelPicker from '@components/shared/wheel-picker'
import Button from '@components/shared/button/Button'
import LinearGradient from 'react-native-linear-gradient'
import CheckmarkIcon from '@assets/icons/checkmark.svg'

const SCREEN_WIDTH: number = Dimensions.get('window').width
const darkPrimary: string = Colors.darkPrimary.hex
const PADDING_SIDE: number = hS(24)
const MAX_CONTENT_WIDTH: number = SCREEN_WIDTH - (PADDING_SIDE * 2) 


const surveyTitles: Array<string> = [
    'Choose your goal', 
    'How familiar are you with fasting?',
    'How often do you exercise?',
    'How old are you?', 
    'Your current height', 
    'Your current weight', 
    'Your goal weight'
]

interface OptionProps {
    item: { id: number, title: string }
    index: number, 
    data: string[], 
    setData: Dispatch<SetStateAction<string[]>>
}

const Option: FC<OptionProps> = ({ item, index, data, setData }) => {
    const [ isChecked, setIsChecked ] = useState<boolean>(false)

    const onPress: void = () => {
 	setData(isChecked && data.filter(e => e !== item) || [...data, item])
	setIsChecked(!isChecked)
    }

    return (
        <Pressable 
	    {...{ onPress }}
            key={`opt${index}`} 
            style={{ 
	        ...styles.optionContainer, 
		...(isChecked && styles.checked), 
		marginTop: (index > 0 ? vS(18) : 0)
	    }}>
            <Text style={styles.optionTitle}>{item.title}</Text>
            { isChecked && <CheckmarkIcon width={styles.checkmark.width} height={styles.checkmark.height} /> }
        </Pressable>
    )
}

const ExercisePerformanceSurvey: FC = memo(() => {
    return (
	<View>
	   
	</View>
    )
})

const HeightSurvey: FC = memo(() => {
    return (
	<View>
	    
	</View>
    )
})

const WeightSurvey: FC = memo(() => {
    return (
	<View>

	</View>
    )
})

const GoalWeightSurvey: FC = memo(() => {
    return (
	<View>
	
	</View>
    )
})

const AgeSurvey: FC = memo(({
    age, 
    setAge
}: {
    age: number, 
    setAge: Dispatch<SetStateAction<string[]>>
}) => {
    const ageNumbers: Array<number> = Array.from({ length: 120 }, (_, i) => i + 1)
    return (
	<View>
	    
	</View>
    )
})

const FastingFamiliarSurvey: FC = memo(({ 
    fastingFamiliar, 
    setFastingFamiliar
}: {
    fastingFamiliar: string[],
    setFastingFamiliar: Dispatch<SetStateAction<string[]>>
}) => {

    const fastingFamiliarData = [
	{
            id: 2, 
            title: 'Beginner'
        },
        {
            id: 3, 
            title: 'Intermediate'
        }, 
        {
            id: 4, 
            title: 'Pro Faster'
        }
    ]
    return (
	<View style={{
	    width: '100%', 
	    marginTop: vS(14), 
	    marginLeft: PADDING_SIDE
	}}>
	    <Text style={styles.optionsTitle}>Choose one option</Text>
	    <FlatList 
                style={{ marginTop: vS(10) }}
                showsVerticalScrollIndicator={false}
                data={fastingFamiliarData}
		keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => 
		    <Option {...{ item, index }} data={fastingFamiliar} setData={setFastingFamiliar} />
		}
            />
	</View>
    )
})

const GoalSurvey: FC = memo(({ 
    goal, 
    setGoal 
}: { 
    goal: string[], 
    setGoal: Dispatch<SetStateAction<string[]>> 
}) => {

    const goalSurveyData = [
	{
            id: 2, 
            title: 'Lose weight'
        },
        {
            id: 3, 
            title: 'Live longer'
        }, 
        {
            id: 4, 
            title: 'Be energetic'
        },
        {
            id: 5, 
            title: 'Gut rest'
        }
    ]
    return (
	<View style={{
	    width: '100%', 
	    marginTop: vS(14)
	}}>
	    <Text style={styles.optionsTitle}>Choose multiple options</Text>
	    <FlatList 
                style={{ marginTop: vS(10) }}
                showsVerticalScrollIndicator={false}
                data={goalSurveyData}
		keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => 
		    <Option {...{ item, index }} data={goal} setData={setGoal} />
		}
            />
	</View>
    )
})

export default (): FC => {
    const translateX = useRef<Animated.Value>(new Animated.Value(0)).current
    const [ surveyIndex, setSurveyIndex ] = useState<number>(0)
    const [ goal, setGoal ] = useState<string[]>([])
    const [ fastingFamiliar, setFastingFamiliar ] = useState<string>('')
    const [ exercisePerformance, setExercisePerformance ] = useState<string>('')
    const [ currentHeight, setCurrentHeight ] = useState<string>('')
    const [ currentWeight, setCurrentWeight ] = useState<string>('')
    const [ age, setAge ] = useState<number>(0)
    const [ goalWeight, setGoalWeight ] = useState<string>('')

    const bottomBarHeight: number = useDeviceBottomBarHeight()

    const changeSurvey: void = (newSurveyIndex: number) => {
        if (newSurveyIndex === surveyTitles.length) {
	    console.log('handle submit survey')
	    return
	}
	Animated.timing(translateX, {
	    toValue: (PADDING_SIDE - SCREEN_WIDTH) * newSurveyIndex, 
	    duration: 360, 
	    easing: Easing.bezier(1, 0, 0, 1), 
	    useNativeDriver: true
	}).start(({ finished }) => {
	    setSurveyIndex(newSurveyIndex)
	})	
    }

    return (
	<View style={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>
	    <View style={{ width: '100%', alignItems: 'center' }}>
		<View style={styles.indicator}>
		{
		    Array.from({ length: surveyTitles.length }).map((e, i) => {
		        const currentStyles = [
			    styles.indicatorPart, 
			    { marginLeft: i > 0 ? 4 : 0, backgroundColor: '#f3f3f3' }
			]
			return i <= surveyIndex && (
			    <LinearGradient
			        key={i}
			        style={currentStyles}
			        colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
			        start={{ x: .5, y: 0 }}
			        end={{ x: .5, y: 1 }}
			    /> || 
			    <View key={i} style={currentStyles} />
			)
		    })
		}
		</View>
		<Text style={styles.mainTitle}>{surveyTitles[surveyIndex]}</Text>
		<Animated.View
	    	    style={{
			width: MAX_CONTENT_WIDTH,
			flexDirection: 'row', 
			transform: [{ translateX }]
	    	    }}>
	    	    <GoalSurvey {...{ goal, setGoal }} />
		    <FastingFamiliarSurvey {...{ fastingFamiliar, setFastingFamiliar }} />
		    <ExercisePerformanceSurvey {...{ exercisePerformance, setExercisePerformance }} />
		    <AgeSurvey {...{ age, setAge }} />
		    <HeightSurvey {...{ currentHeight, setCurrentHeight }} />
		    <WeightSurvey {...{ currentWeight, setCurrentWeight }} />
		    <GoalWeightSurvey {...{ goalWeight, setGoalWeight }} />
		</Animated.View>
	    </View>
	    <View style={{ width: '100%', alignItems: 'center' }}>
	        {
		    surveyIndex > 0 && 
		    <TouchableOpacity style={styles.backButton} onPress={() => changeSurvey(surveyIndex - 1)}>
		        <Text style={styles.backButtonText}>Back to previous</Text>
		    </TouchableOpacity> 
		}
		<Button 
		    title={surveyIndex === surveyTitles.length - 1 && 'Submit' || 'Next'}
		    size='large' 
		    bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
		    onPress={() => changeSurvey(surveyIndex + 1)}
		/>
	    </View>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
	justifyContent: 'space-between', 
	alignItems: 'center', 
	paddingHorizontal: PADDING_SIDE,
	backgroundColor: '#fff', 
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0	
    },

    indicator: {
 	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center', 
	marginTop: vS(25), 
	alignSelf: 'flex-start'
    }, 

    indicatorPart: {
	width: hS(42), 
	height: vS(10), 
	borderRadius: 50
    }, 

    backButton: {
        width: '100%', 
	height: vS(76),
	backgroundColor: '#f3f3f3', 
	justifyContent: 'center', 
	alignItems: 'center', 
	borderRadius: hS(32), 
	marginBottom: vS(21)
    }, 

    mainTitle: {
	alignSelf: 'flex-start', 
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(24), 
	marginTop: vS(22), 
	color: darkPrimary
    },	

    backButtonText: {
        fontFamily: 'Poppins-Medium',
	color: darkPrimary, 
	fontSize: hS(14)
    }, 

    optionContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        height: vS(70), 
        backgroundColor: '#f3f3f3',
        borderRadius: hS(12), 
        paddingHorizontal: hS(26)
    }, 

    optionsTitle: {
 	fontSize: hS(14), 
      	fontFamily: 'Poppins-Medium', 
      	color: '#9f9f9f'
    },

    optionTitle: {
      	fontFamily: 'Poppins-Medium', 
      	fontSize: hS(14),
      	color: Colors.darkPrimary.hex
    },

    checkmark: {
      	width: hS(32), 
      	height: vS(32)
    },

    checked: {
	borderWidth: 1, 
      	borderColor: Colors.primary.hex,
      	backgroundColor: Colors.lightPrimary.hex
    }

})

