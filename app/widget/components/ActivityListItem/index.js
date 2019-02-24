import { Row, Col, Icon } from 'antd'
import moment from 'moment'
import BrandIcon from '../../components/BrandIcon'

import './index.less'
const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const icon = node => {
  switch (node) {
    case '活动待审核':
      return <Icon type="clock-circle" style={{color: '#FAAD14'}} />
      break;
    case '待审核已过期':
      return <Icon type="minus-circle" style={{color: '#FAAD14'}} />
      break;
    case '活动已审核':
      return <Icon type="check-circle" style={{color: '#1890ff'}} />
      break;
    case '活动进行中':
      return <Icon type="clock-circle" style={{color: '#1890ff'}} />
      break;
    default:
      return <Icon type="check-circle" style={{color: '#52C41A'}} />
      break;
  }
}

const ActivityListItem = props => {
  const {
    campaign_name,
    start_time,
    end_time,
    shop_name,
    createtime,
    ping_name,
    brand_name,
    pro_count,
    act_count,
    reject_count,
    campaign_node,
    id,
    dealer_name
  } = props.infos
  return (
    <div className="activity-list-item" onClick={props.clicked.bind(this, `/ActivityDetails/${id}/${campaign_node}`)}>
      <Row>
        <Col span={24} className="title">{campaign_name}</Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={10} className="activity-time">活动时间：{`${moment(start_time).format(FORMAT_TIME)}~${moment(end_time).format(FORMAT_TIME)}`}</Col>
        <Col span={4} className="activity-status">{icon(campaign_node)}&nbsp;&nbsp;{campaign_node}</Col>
      </Row>
      <Row>
        <Col span={18} className="activity-master">
          <span>{shop_name}</span>
          <span style={{marginLeft:0}}><BrandIcon pingName={ping_name} /></span>
          <span>{dealer_name}</span>
          <span>{moment(createtime).format(FORMAT_TIME)}</span>
        </Col>
        <Col span={6} className="counts">
          <span>合计：{pro_count}条</span>
          &nbsp;&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;&nbsp;
          <span>通过：{act_count}条</span>
          &nbsp;&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;&nbsp;
          <span>驳回: {reject_count}条</span>
        </Col>
      </Row>
    </div>
  )
}

export default ActivityListItem