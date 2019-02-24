import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import SevenDayCard from '../../../components/SevenDayCard'
import ActivityPublic from '../../../components/ActivityPublicCard'

import { Button } from 'antd'

const Tpl = ThatMain(that => {
  const { 
    sevenDayNums, 
    currentDateIndex, 
    currentDate, 
    shopBtnList, 
    currentShopBtnIndex, 
    activityList,
    pagination: {count, pageNum, pageSize},
    // isExpandPrice
  } = that.state
  return (
    <ContentBox 
      title="活动公示" 
      breadcrumbList={['活动信息', '活动公示']}
      linkList={['', '']}
    >
      <SevenDayCard 
        infos={{
          sevenDayNums,
          currentDate,
          currentDateIndex,
          shopBtnList,
          currentShopBtnIndex
        }} 
        dateClick={that.handleDateChange} 
        shopBtnClick={that.handleShopBtnChange}
      />
      {
        activityList.length === 0 ?
          null :
          activityList.map((value, index) => {
            return <div className="activity-item" key={value.id} >
              <ActivityPublic
                infos={{...value,_index:index}}
                isShowReview={false}
                // isExpandPrice={isExpandPrice}
                togglePrice={that.handleTogglePriceClick} />
            </div>
          })
      }
      {
        pageNum * pageSize > count ? 
        null : 
        <div className="load-more">
          <Button onClick={that.handleLoadMoreBtnClick}>加载更多···</Button>
        </div>
      }
    </ContentBox>
  )
})

export default Tpl