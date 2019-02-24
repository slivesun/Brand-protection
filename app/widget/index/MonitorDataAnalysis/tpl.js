import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'

import { Button, Row, Col, DatePicker, Card, List } from 'antd'

const FREQUENCY_MAP = {
  '1': '1次/天',
  '2': '2次/天',
  '3': '3次/天',
  '4': '4次/天',
}

const Tpl = ThatMain(that => {
  const {
    detail,
    start_time,
    end_time,
    sale_pagination,
    low_pagination,
    lowPriceList,
    salesRankList,
  } = that.state
  return (
    <ContentBox
      breadcrumbList={['关键词监控', '监控详情', '数据分析']}
      linkList={['2', '1', '']}
      history={that.props.history}
    >
      <div className="monitor-info-wrapper">
        <h5>监控信息</h5>
        <Row>
          <Col span={8}>关键词：{detail.key_name||''}</Col>
          <Col span={8}>限价：{detail.key_price||''}</Col>
          <Col span={8}>平台：{detail.platform||''}</Col>
          <Col span={8}>监控范围：{detail.key_range||''}</Col>
          <Col span={8}>监控频次：{FREQUENCY_MAP[detail.frequency]||""}</Col>
          <Col span={8}>监控时间：{detail.key_times&&detail.key_times.split(',').join('、')||''}</Col>
        </Row>
      </div>
      <div className="conditions-wrapper">
        <h5>低价链接数据分析</h5>
        <div>
          日期：
          <DatePicker.RangePicker
            defaultValue={[start_time, end_time]}
            onChange={that.handleDateChange}
            getCalendarContainer={trigger => trigger.parentNode}
          />
        </div>
      </div>
      <div>
      <div className="main-left-wrapper">
        <Card title="低价次数排行榜">
          <List 
            pagination={{
              simple:true,
              onChange: that.pageChange.bind(that, '/hcm/keyword_monitor/low_sort', detail.platform, 'lowPriceList', low_pagination, 'low_pagination')
            }}
            dataSource={lowPriceList}
            renderItem={(item, index) => (
              <List.Item>
                <Row className="list-item">
                  <Col span={2}><span className={index<3?'active':''}>{index+1}</span></Col>
                  <Col span={3}><img src={item.logopicurl} style={{borderRadius:'3px'}} width="48" height="48" /></Col>
                  <Col span={16}><a href={item.itemlink} target="_blank">{item.itemtitle}</a></Col>
                  <Col span={1} offset={2}><span>{item.low_count}</span></Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </div>
      <div className="main-right-wrapper">
        <Card title="销量排行榜">
        <List 
            pagination={{
              simple:true,
              onChange: that.pageChange.bind(that, '/hcm/keyword_monitor/sale_sort', detail.platform, 'salesRankList', sale_pagination, 'sale_pagination')
            }}
            dataSource={salesRankList}
            renderItem={(item, index) => (
              <List.Item>
                <Row className="list-item">
                  <Col span={2}><span className={index<3?'active':''}>{index+1}</span></Col>
                  <Col span={3}><img src={item.logopicurl} style={{borderRadius:'3px'}} width="48" height="48" /></Col>
                  <Col span={16}><a href={item.itemlink} target="_blank">{item.itemtitle}</a></Col>
                  <Col span={1} offset={2}><span>{item.salevolume}</span></Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </div>
      </div>
    </ContentBox>
  )
})

export default Tpl