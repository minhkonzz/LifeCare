import { FC } from 'react'
import { 
    View, 
    Text, 
    TextInput,
    Image, 
    ScrollView, 
    TouchableOpacity,
    Pressable, 
    StyleSheet
} from 'react-native'

import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BASE_WIDTH } from '@utils/constants/screen'
import { PolygonIcon, WhiteBackIcon, WhiteFireIcon, WhiteEditIcon } from '@assets/icons'
import foodNutritionData from '@assets/data/food-nutrition.json'
import Screen from '@components/shared/screen'
import Button from '@components/shared/button/Button'
import LinearGradient from 'react-native-linear-gradient'

interface NutritionPartProgressProps {
    title: string, 
    progress: number,
    grams: number, 
    barColor: string
}

const NutritionPartProgress: FC<NutritionPartProgressProps> = ({ 
    title, 
    progress, 
    grams, 
    barColor
 }) => {
    return (
        <View style={styles.nutritionPartProgress}>
            <View style={styles.progressCircle}>
                <AnimatedCircularProgress
                    lineCap='round'
					width={hS(10)}
					size={hS(100)}
					rotation={360}
					fill={progress}
					tintColor={barColor}
					backgroundColor={`rgba(${darkRgb.join(', ')}, .1)`} 
                />
                <Text style={styles.progressValue}>{`${progress}%`}</Text>
            </View>
            <Text style={styles.progressTitle}>{title}</Text>
            <Text style={styles.progressGrams}>{`${grams}g`}</Text>
        </View>
    )
}

export default (): JSX.Element => {
    return (
        <Screen>
            <View style={styles.foodBackground}>
                <Image style={styles.foodImage} source={require('../assets/images/food-nutrition.png')} />
                <LinearGradient 
                    style={[styles.foodImage, styles.foodImageBlur]}
                    colors={[`rgba(0, 0, 0, .1)`, darkHex]}
                    start={{ x: .5, y: 0 }}
                    end={{ x: .5, y: 1 }} />
            </View>
            <View style={styles.header}>
                <Pressable>
                    <WhiteBackIcon width={hS(9.2)} height={vS(16)} />
                </Pressable>
            </View>
            <ScrollView
                contentContainerStyle={styles.main}
                showsVerticalScrollIndicator={false}>
                <View style={styles.overview}>
                    <Text style={styles.foodName}>Salad with wheat and white egg</Text>
                    <View style={[styles.horz, styles.calsTitle]}>
                        <WhiteFireIcon width={hS(16)} height={vS(20)} />
                        <Text style={styles.calsTitleText}>200 cals</Text>
                    </View>
                    <View style={styles.calsRecommend}>
                        <Text style={styles.calsRecommendText}>325 cals recommend</Text>
                    </View>
                    <TouchableOpacity style={styles.editButtonWrapper} activeOpacity={.8}>
                        <LinearGradient 
                            style={styles.editButton}
                            colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                            start={{ x: .5, y: 0 }}
                            end={{ x: .5, y: 1 }}>
                            <WhiteEditIcon width={hS(20)} height={vS(20)} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={[styles.serve, styles.horz]}>
                    <TextInput style={styles.serveAmountInput} />
                    <Pressable style={styles.horz}>
                        <Text style={styles.serveName}>{`Standard serving (282g)`}</Text>
                        <PolygonIcon width={hS(12)} height={vS(11)} />
                    </Pressable>
                </View>
                <View style={styles.nutritionFacts}>
                    <Text style={styles.nutritionFactsTitle}>Nutrition Facts</Text>
                    <View style={[styles.nutritionProgresses, styles.horz]}>
                        <NutritionPartProgress 
                            title='Protein'
                            grams={16.2}
                            progress={78} 
                            barColor='#91C8E4' />
                        <NutritionPartProgress 
                            title='Carbs'
                            grams={16.2}
                            progress={13} 
                            barColor='#FFB8B8' />
                        <NutritionPartProgress 
                            title='Fat'
                            grams={9}
                            progress={9} 
                            barColor='#FFD36E' />
                    </View>
                    {
                        foodNutritionData.map((e, i) => 
                            <View key={`${e.id}-${i}`} style={{ marginTop: (i > 0 ? vS(10) : 0) }}>
                                <View style={[styles.horz, styles.nutritionPartRowHeader]}>
                                    <View style={styles.horz}>
                                        {/* <View style={[styles.nutritionPartRowIndicator, { backgroundColor: e.indicatorColor }]} /> */}
                                        <LinearGradient 
                                            style={styles.nutritionPartRowIndicator}
                                            colors={[
                                                `rgba(${e.indicatorColor.join(', ')}, ${i === foodNutritionData.length - 1 ? .2 : .6})`, 
                                                `rgba(${e.indicatorColor.join(', ')}, ${i === foodNutritionData.length - 1 ? .4 : 1})`
                                            ]}
                                            start={{ x: .5, y: 0 }}
                                            end={{ x: .5, y: 1 }} />
                                        <Text style={styles.nutritionPartRowTitle}>{e.title}</Text>
                                    </View>
                                    <Text style={styles.nutritionPartRowValue}>{`${e.value}g`}</Text>
                                </View>
                                {
                                    e.subs.map((s, _i) => 
                                        <View key={`${s.id}-${_i}`} style={[styles.horz, styles.nutritionPartSub]}>
                                            <Text style={styles.nutritionPartSubText}>{s.title}</Text>
                                            <Text style={styles.nutritionPartSubText}>{`${s.value}g`}</Text>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Button title='Add' size='large' bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} />                
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    bottom: {
        elevation: 7,
        shadowColor: darkHex,
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0,
        paddingVertical: vS(27), 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
    }, 

    horz: {
        flexDirection: 'row', 
        alignItems: 'center'
    },

    foodBackground: {
        position: 'absolute',
        height: vS(385),
        top: 0,
        left: 0, 
        right: 0
    },

    foodImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: hS(48),
        borderBottomRightRadius: hS(48)
    },

    foodImageBlur: {
        position: 'absolute'
    },

    header: {
        width: '100%',
        paddingLeft: hS(24),
        paddingVertical: vS(24)
    }, 

    overview: {
        width: '100%', 
        marginTop: vS(72)
    }, 

    foodName: {
        fontFamily: 'Poppins-SemiBold', 
        fontSize: hS(28), 
        color: '#fff', 
        letterSpacing: .2, 
        lineHeight: vS(36)
    }, 

    calsTitle: {
        marginTop: vS(6)
    },

    calsTitleText: {
        fontFamily: 'Poppins-SemiBold', 
        fontSize: hS(24), 
        letterSpacing: .2, 
        marginLeft: hS(12),
        color: '#fff',
        marginTop: vS(4)
    }, 

    calsRecommend: {
        width: hS(172), 
        height: vS(28),
        borderRadius: 90, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, .12)', 
        marginTop: vS(10)
    }, 

    calsRecommendText: {
        fontFamily: 'Poppins-Regular', 
        fontSize: hS(11), 
        color: '#fff',
        letterSpacing: .2
    }, 

    editButtonWrapper: {
        position: 'absolute', 
        bottom: 0, 
        right: 0
    },

    editButton: {
        width: hS(52), 
        height: vS(52), 
        borderRadius: hS(22), 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 

    serve: {
        paddingVertical: vS(18),
        paddingRight: hS(20),
        paddingLeft: hS(10),
        width: hS(366), 
        height: vS(83),
        backgroundColor: '#fff',
        borderRadius: hS(24), 
        elevation: 7, 
        shadowColor: darkHex, 
        marginTop: vS(28),
        justifyContent: 'space-between'
    }, 

    serveAmountInput: {
        borderRightWidth: 1, 
        borderColor: `rgba(${darkRgb.join(', ')}, .32)`, 
        paddingRight: hS(8),
        height: '100%',
        width: hS(72),
        textAlign: 'center', 
    }, 

    serveName: {
        fontFamily: 'Poppins-Medium', 
        fontSize: hS(13), 
        color: darkHex, 
        letterSpacing: .2,
        marginRight: hS(22)
    }, 

    main: {
        width: BASE_WIDTH, 
        alignItems: 'center',
        paddingHorizontal: hS(22)
    },

    nutritionFacts: {
        width: '100%',
        elevation: 7, 
        shadowColor: darkHex, 
        backgroundColor: '#fff', 
        borderRadius: hS(24),
        marginBottom: vS(48), 
        marginTop: vS(27), 
        paddingHorizontal: hS(21), 
        paddingTop: vS(17),
        paddingBottom: vS(22)
    },

    nutritionFactsTitle: {
        fontFamily: 'Poppins-SemiBold', 
        fontSize: hS(14),
        color: darkHex, 
        letterSpacing: .2
    }, 

    nutritionProgresses: {
        marginTop: vS(22), 
        justifyContent: 'space-between', 
        marginBottom: vS(36)
    }, 

    nutritionPartProgress: {
        margin: 2,
        alignItems: 'center'
    },

    progressCircle: {
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 500, 
        elevation: 7, 
        shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
        backgroundColor: '#fff'
    },

    progressValue: {
        position: 'absolute',
        fontFamily: 'Poppins-SemiBold', 
        fontSize: hS(18), 
        color: darkHex, 
        letterSpacing: .4
    },

    progressTitle: {
        fontFamily: 'Poppins-Regular', 
        fontSize: hS(12), 
        color: `rgba(${darkRgb.join(', ')}, .8)`,
        letterSpacing: .2, 
        marginTop: vS(14)
    },

    progressGrams: {
        fontFamily: 'Poppins-Medium',
        fontSize: hS(14), 
        marginTop: vS(8),
        color: darkHex,
        letterSpacing: .2
    }, 

    nutritionPartRowHeader: {
        justifyContent: 'space-between'
    }, 

    nutritionPartRowIndicator: {
        width: hS(18), 
        height: vS(18),
        borderRadius: hS(6)
    },

    nutritionPartRowTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: hS(14), 
        color: darkHex, 
        letterSpacing: .2, 
        marginLeft: hS(11), 
        marginTop: vS(4)
    }, 

    nutritionPartRowValue: {
        fontFamily: 'Poppins-Regular',
        fontSize: hS(14), 
        color: darkHex, 
        letterSpacing: .2
    }, 

    nutritionPartSub: {
        width: '100%', 
        justifyContent: 'space-between', 
        marginTop: vS(12), 
        paddingLeft: hS(30)
    },

    nutritionPartSubText: {
        fontFamily: 'Poppins-Regular', 
        fontSize: hS(12), 
        color: `rgba(${darkRgb.join(', ')}, .8)`,
        letterSpacing: .2
    }
})
