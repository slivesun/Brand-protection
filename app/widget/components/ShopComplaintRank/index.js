// 店铺投诉排行

import {Card, List, Row, Col, Popover, Icon} from 'antd'

import './index.less'

const ShopComplaintRank = props => {
  
  const list = props.data
  const platform = props.platform
  const pageChange = props.pageChange
  const pagination = props.pagination
  const { pageNo, pageSize } = pagination

  const cardTitle = (
    <h5 className="card-title">店铺被投次数排行</h5>
  )
  
  const listhead = () => (
    <Row className="row" type="flex" justify="space-between">
      <Col span={2}><span>排名</span></Col>
      <Col span={6}>
        {/* <Popover trigger="hover" content="旺旺名称"> */}
          <span className="ellipsis">旺旺名称</span>
        {/* </Popover> */}
      </Col>
      <Col span={6}><span>被投诉次数</span></Col>
      <Col span={6}><span>撤诉次数</span></Col>
    </Row>
  )

  const listItem = ({wangwang, complaintCount, withdrawCount}, index, flag='body') => (
    <Row className={`row ${flag === 'body' ? 'body-row' : ''}`} type="flex" justify="space-between">
      <Col span={2}><span className={`${flag === 'body' && (pageSize*(pageNo-1)+index+1) < 4 ? 'circle' : '' }`}>
        {pageSize*(pageNo-1)+index+1}</span>
      </Col>
      <Col span={6}>
        <Popover trigger="hover" content={wangwang}>
          <span className="ellipsis">{wangwang}</span>
        </Popover>
      </Col>
      <Col span={6}><span>{complaintCount}</span></Col>
      <Col span={6}><span>{withdrawCount}</span></Col>
    </Row>
  )

  return (
    <Card className="card-wrapper" title={cardTitle} bordered={false}>
      <List 
        size="small"
        split={false}
        dataSource={list}
        pagination={{
          simple: true,
          onChange: pageChange,
          current: pagination.pageNo,
          total: pagination.totalElements,
        }}
        header={listhead()}
        renderItem={(item, index) => {
          const data = {}
          if (platform === 'taobao') {
            data.wangwang = item.entity_owner_name
            data.complaintCount = item.all_count
            data.withdrawCount = item.c_count
          }
          if (platform === '1688') {
            data.wangwang = item.company_name
            data.complaintCount = item.tscs
            data.withdrawCount = item.cscs
          }
          return listItem(data, index)
        }}
      />
    </Card>
  )
}

export default ShopComplaintRank