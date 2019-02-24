import { Row, Col } from 'antd'
import moment from 'moment'

import './index.less'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const formatUrl = searchStr => {
  const arr = searchStr.slice(1).split('&')
  let obj = {}
  arr.forEach(v => {
    const array = v.split('=')
    obj[array[0]] = decodeURIComponent(array[1])
  })
  return obj
}

const ActivityBaseInfoCard = props => {
  const {
    campaign_name,
    shop_name,
    // brand_name,
    start_time,
    ent_time,
    ping_name,
    createtime,
    campaign_desc,
    dealer_name
  } = props.infos
  return (
    <div className="activity-baseinfo-card">
      <Row>
        <Col span={24} className="title">{campaign_name}</Col>
      </Row>
      <Row>
        <Col span={8}>
          <p className="item">店铺：{shop_name}</p>
          <p className="item">所属客户：{dealer_name}</p>
          <p className="item">活动时间：{`${moment(start_time).format(FORMAT_TIME)}~${moment(ent_time).format(FORMAT_TIME)}`}</p>
        </Col>
        <Col span={8}>
          <p className="item">平台：{ping_name}</p>
          <p className="item">申请时间：{moment(createtime).format(FORMAT_TIME)}</p>
          <p className="item">活动说明：{campaign_desc}</p>
        </Col>
        <Col span={8}>
          <div className="status-wrapper">
            <p className="img-wrapper"></p>
            <p className="status">{props.location.params.status}</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ActivityBaseInfoCard