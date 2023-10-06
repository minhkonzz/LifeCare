import InsightCategory from '@components/insight-category'
import FeedBackReference from '@components/feedback-reference'
import TabHeader from '@components/tab-header'
import Screen from '@components/shared/screen' 

export default (): JSX.Element => {
    return (
        <>
            <Screen scroll paddingHorzContent>
                <InsightCategory />
                <FeedBackReference />               
            </Screen>
            <TabHeader title='Insights for you' />
        </>
    )
}
