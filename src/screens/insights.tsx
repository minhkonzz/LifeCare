import InsightCategory from '@components/insight-category'
import FeedBackReference from '@components/feedback-reference'
import TabHeader from '@components/tab-header'
import Screen from '@components/shared/screen'

export default (): JSX.Element => {
   return (
      <Screen paddingHorzContent>
         <InsightCategory />
         <FeedBackReference />
         <TabHeader title='Insights for you' />
      </Screen>
   )
}
