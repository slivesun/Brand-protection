import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'

import { Row, Col, Divider, Card, Tag } from 'antd'
import moment from 'moment'

const imgWrapperStyle = {
  width: '72px',
  height: '72px',
  borderRadius: '3px',
  marginLeft: '11px',
  cursor: 'pointer'
}

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const Tpl = ThatMain(that => {
  const {
    start_time,
    end_time,
    product_name,
    product_url,
    apply_price,
    campaign_type,
    gift_situation,
    actual_price,
    play_content,
    campaignInspectList = []
  } = that.state.inspectDetail
  return (
    <ContentBox 
      title="稽查结果详情" 
      breadcrumbList={['客户盘点', '客户信息', '客户详情', '活动详情', '稽查结果详情']}
      linkList={['','3', '2', '1', '']}
      history={that.props.history}
    >
      <div className="client-inspect-detail">
        <section className="baseinfo">
          <p>活动时间：{`${moment(start_time).format(FORMAT_TIME)} ~ ${moment(end_time).format(FORMAT_TIME)}`}</p>
          <p className="overflow-hidden">产品信息：{product_name}</p>
          <p className="overflow-hidden">商品链接：<a href={product_url} target="_blank">{product_url}</a></p>
          <Divider />
          <Row>
            <Col span={8}>活动标价：{`￥${apply_price}`}</Col>
            <Col span={8}>活动类型：{campaign_type}</Col>
            <Col span={8}>赠品情况：{gift_situation}</Col>
            <Col span={8}>实际成交价：{`￥${actual_price}`}</Col>
            <Col span={8}>玩法说明：{play_content}</Col>
          </Row>
        </section>
        {
          !!campaignInspectList.length && campaignInspectList.map((value, index) => {
            const {
              createtime,
              screenshot_b,
              screenshot_c,
              screenshot_o,
              system_review_explain,
              system_review,
              brand_review,
              brand_review_username,
              brand_review_view
            } = value
            const sshot_b = !!screenshot_b ? JSON.parse(screenshot_b) : []
            const sshot_c = !!screenshot_c ? JSON.parse(screenshot_c) : []
            const sshot_o = !!screenshot_o ? JSON.parse(screenshot_o) : []
            return (
              <Card key={index} className="inspect-item" title={`${moment(createtime).format('YYYY-MM-DD')}  稽查结果`}>
                <Row type="flex">
                  <Col span={8}>
                    标价截图：
                    {
                      !!sshot_b.length ? 
                      sshot_b.map((v, i) => (
                        <img 
                          onClick={that.handleImgClick.bind(that, {bl:true,urls:sshot_b,close:true,index:i})} 
                          key={i} src={v} 
                          style={imgWrapperStyle} />
                      )) :
                      null
                    }
                  </Col>
                  <Col span={8}>
                    成交价截图：
                    {
                      !!sshot_c.length ? 
                      sshot_c.map((v, i) => (
                        <img 
                          onClick={that.handleImgClick.bind(that, {bl:true,urls:sshot_c,close:true,index:i})} 
                          key={i} src={v} 
                          style={imgWrapperStyle} />
                      )) : 
                      null
                    }
                  </Col>
                  <Col span={8}>
                    其他截图：
                    {
                      !!sshot_o.length ? 
                      sshot_o.map((v, i) => (
                        <img 
                          onClick={that.handleImgClick.bind(that, {bl:true,urls:sshot_o,close:true,index:i})} 
                          key={i} src={v} 
                          style={imgWrapperStyle} />
                      )) : 
                      null
                    }
                  </Col>
                  <Col span={8}>
                    系统稽查结果：
                    {
                      !!system_review ? 
                      (system_review === '合格' ? <Tag color="green">合格</Tag> : <Tag color="red">不合格</Tag>) : 
                      null
                    }
                  </Col>
                  <Col span={8}>
                    结果说明：{system_review_explain}
                  </Col>
                </Row>
                <Divider dashed />
                <Row>
                  <Col span={8}>
                    稽查结果：
                    {
                      !!brand_review ?
                        (brand_review === '合格' ? <Tag color="green">合格</Tag> : <Tag color="red">不合格</Tag > ) :
                        null
                    }
                  </Col>
                  <Col span={8}>稽查人：{brand_review_username}</Col>
                  <Col span={8}>稽查意见：{brand_review_view}</Col>
                </Row>
              </Card>
            )
          })
        }
      </div>
    </ContentBox>
  )
})

export default Tpl