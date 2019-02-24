import { Row, Col } from 'antd'

import './index.less'

const DetailTitleCard = props => {
  const {
    dealername,
    dutynumber,
    province = '',
    city = '',
    strict = '',
    address = '',
    creditscore = 0,
    take_people,
    contact
  } = props.infos
  return (
    <section className="brand-client-detail-title">
      <Row className="top">
        <Col span={24}>{dealername}</Col>
      </Row>
      <Row className="middle">
        <Col span={8}>公司税号：{dutynumber}</Col>
        <Col span={12}>公司地址：{`${province}${city}${strict}${address}`}</Col>
        <Col span={3} offset={1} className="credit">信用积分：{creditscore}</Col>
      </Row>
      <Row className="bottom">
        <Col span={8}>对接人姓名：{take_people}</Col>
        <Col span={8}>联系电话：{contact}</Col>
      </Row>
    </section>
  )
}

export default DetailTitleCard