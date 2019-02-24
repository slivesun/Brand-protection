import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'

import { Row, Col, Card, Divider, Button } from 'antd'
import moment from 'moment'

const MOCK = {
  activity_name: '关于双十一泸州老窖的活动申请',
  shop_name: '泸州老窖官方旗舰店',
  dealer_name: '泸州老窖贸易有限公司',
  apply_time: 1534230382429,
  start_time: 1534230382429,
  end_time: 1534230382429,
  activity_desc: '说明',
  cplist: [
    {
      product_name: '泸州老窖/泸州老窖52度醇香型/GJ1573CX/6瓶箱装',
      product_url: 'https://www.google.com',
      apply_price: 123,
      activity_type: '天猫商城聚划算',
      gify_satiuation: '精品礼盒一个',
      actural_price: 32,
      play_content: '满500减200',
      reject_day: 2,
      activity_pro_id: 'kafjk123k'
    },
    {
      product_name: '泸州老窖/泸州老窖52度醇香型/GJ1573CX/6瓶箱装',
      product_url: 'https://www.google.com',
      apply_price: 123,
      activity_type: '天猫商城聚划算',
      gify_satiuation: '精品礼盒一个',
      actural_price: 32,
      play_content: '满500减200',
      reject_day: 2,
      activity_pro_id: 'kafjk123k'
    },
    {
      product_name: '泸州老窖/泸州老窖52度醇香型/GJ1573CX/6瓶箱装',
      product_url: 'https://www.google.com',
      apply_price: 123,
      activity_type: '天猫商城聚划算',
      gify_satiuation: '精品礼盒一个',
      actural_price: 32,
      play_content: '满500减200',
      reject_day: 2,
      activity_pro_id: 'kafjk123k'
    }
  ]
}
const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const Tpl = ThatMain(that => {
  const {
    campaign_name,
    shop_name,
    dealer_name,
    createtime,
    start_time,
    end_time,
    campaign_desc,
    cplist
  } = that.state.detail
  const proList = !!cplist ? cplist : []
  const cardTitle = ({product_name, product_url} = {}) => (
    <Row>
      <Col span={12}>产品信息：{product_name}</Col>
      <Col span={12}>产品链接：<a href={product_url} target="_blank">{product_url}</a></Col>
    </Row>
  )
  return (
    <ContentBox 
      title="活动详情" 
      breadcrumbList={['客户盘点', '客户信息', '客户详情', '活动详情']}
      linkList={['', '2', '1', '']}
      history={that.props.history}
    >
      <div className="client-activity-detail">
        <section className="baseinfo">
          <Row>
            <Col span={24}>{campaign_name}</Col>
          </Row>
          <Row>
            <Col span={10}>店铺：{shop_name}</Col>
            <Col span={10}>所属客户：{dealer_name}</Col>
            <Col span={10}>申请时间：{moment(createtime).format(FORMAT_TIME)}</Col>
            <Col span={10}>活动时间：{`${moment(start_time).format(FORMAT_TIME)} ~ ${moment(end_time).format(FORMAT_TIME)}`}</Col>
            <Col span={10}>活动说明：{campaign_desc}</Col>
          </Row>
        </section>
        {
            !!proList.length && proList.map((value, index) => {
            const {
              product_name,
              product_url,
              apply_price,
              campaign_type,
              gift_situation,
              actual_price,
              play_content,
              reject_day,
              ins_count,
              id
            } = value
            return (
              <Card key={index} className="pro-item" title={cardTitle({product_name,product_url})}>
                <Row>
                  <Col span={8}>活动标价：{`￥${apply_price}`}</Col>
                  <Col span={8}>活动类型：{campaign_type}</Col>
                  <Col span={8}>赠品情况：{gift_situation}</Col>
                  <Col span={8}>实际成交价：{`￥${actual_price}`}</Col>
                  <Col span={8}>玩法说明：{play_content}</Col>
                </Row>
                <Divider dashed />
                <Row>
                  <Col span={24}>
                    <span>存在&nbsp;<i className="weight">{ins_count || 0}</i>&nbsp;天稽查不合格情况</span>
                    <Button onClick={that.handleBtnClick.bind(that, id)}>稽查结果详情</Button>
                  </Col>
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