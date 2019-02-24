import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import ActivityBaseInfo from '../../../components/ActivityBaseInfoCard'
import ActivityProductInfo from '../../../components/ActivityPublicCard'

// const STATUS = {
//   '审核通过': 0,
//   '审核驳回': 1,
//   '待审核': 2
// }

const Tpl = ThatMain(that => {
  const { detail, examine_view, isExpandPrice, cplist } = that.state
  const { status } = that.props.match.params
  return (
    <ContentBox 
      title="活动详情" 
      breadcrumbList={['活动信息', '活动审核', '活动详情']}
      linkList={['', '1', '']}
      history={that.props.history}
    >
      <div className="content-inner">
        <div className="baseinfo">
          <ActivityBaseInfo infos={detail} location={that.props.match} />
        </div>
        {
          // cplist ? 
          cplist.map((value, index) => {
            // const reviewStatus = STATUS[value.campaign_node]
            return (
              <ActivityProductInfo 
                isShowHead={false} 
                reviewText={examine_view}
                className="product-item-wrapper"
                // reviewStatus={reviewStatus} 
                infos={{...value, _index: index}} 
                key={value.id} 
                submit={that.submitReviewInfo}
                inputChange={that.handleInputChange}
                togglePrice={that.handleTogglePriceClick}
                // isExpandPrice={isExpandPrice}
                activityStatus={status}
              />
            )
          })
        }
      </div>
    </ContentBox>
  )
})

export default Tpl