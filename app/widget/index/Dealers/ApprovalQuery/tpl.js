import ThatMatin from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import Copyright from '../../../components/Copyright'
import { Breadcrumb, Row, Col, Button, Input, DatePicker, Form, Tabs, Pagination, Icon } from 'antd'
import moment from 'moment'
import BrandIcon from '../../../components/BrandIcon'

const Item = Breadcrumb.Item
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const TabPane = Tabs.TabPane

const clearIconStyle = {
  width: '14px',
  height: '14px',
  opacity: 0.25,
  cursor: 'pointer'
}

const SearchBox = ThatMatin(that => {
  const { getFieldDecorator, getFieldValue } = that.props.form
  const clearIcon = fieldName => (
    <Icon
      onClick={that.handleClearIconClick.bind(that, fieldName)}
      type="close-circle"
      style={clearIconStyle}
    />
  )
  return (
    <Form onSubmit={that.handleSearchSubmit}>
      <Row>
        <Col span={6} className="col">
          <FormItem
            label="活动主题"
            colon
            className="form-item"
          >
            {
              getFieldDecorator('campaign_name', {
                initialValue: ''
              })(
                <Input 
                  placeholder="请输入" 
                  suffix={
                    !!getFieldValue('campaign_name')?
                    clearIcon('campaign_name'):
                    null
                  } 
                />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} className="col">
          <FormItem
            label="店铺名称"
            colon
            className="form-item"
          >
            {
              getFieldDecorator('shop_name', {
                initialValue: ''
              })(
                <Input 
                  placeholder="请输入" 
                  suffix={
                    !!getFieldValue('shop_name')?
                    clearIcon('shop_name'):
                    null
                  }
                />
              )
            }
          </FormItem>
        </Col>
        <Col span={12} className="col">
          <FormItem
            label="提交时间"
            colon
            className="form-item"
          >
            {
              getFieldDecorator('time', {
                initialValue: [moment().subtract(90, 'd'), moment()]
              })(
                <RangePicker getCalendarContainer={trigger => trigger.parentNode} format="YYYY-MM-DD" showTime />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row justify="end" type="flex">
        <Button htmlType="submit" style={{color:'#1890ff',borderColor:'#1890ff'}}>查询</Button>
      </Row>
    </Form>
  )
})

const SearchResult = ThatMatin(that => {
  const {
    all_count,  // 全部
    w_count,    // 活动待审核
    wt_count,   // 待审核已过期
    ok_count,   // 活动已审核
    ing_count,  // 活动进行中
    ot_count    // 活动已完成
  } = that.state.statusNum
  const { cacheListObj, currentStatus } = that.state
  const currentList = cacheListObj[currentStatus] || []
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
  const list = [
    {
      tabName: `全部（${all_count || 0}）`,
      status: '1'
    },
    {
      tabName: `活动待审核（${w_count || 0}）`,
      status: '2'
    },
    {
      tabName: `待审核已过期（${wt_count || 0}）`,
      status: '3'
    },
    {
      tabName: `活动已审核（${ok_count || 0}）`,
      status: '4'
    },
    {
      tabName: `活动进行中（${ing_count || 0}）`,
      status: '5'
    },
    {
      tabName: `活动已完成（${ot_count || 0}）`,
      status: '6'
    }
  ]
  const item = config => (
    <div className="result-item" onClick={() => {that.goTo(`/ActivityDetails/${config.id}/${config.campaign_node}`)}} key={config.id}>
      <Row className="row">
        <Col span={24}><span>{config.campaign_name}</span></Col>
      </Row>
      <Row className="row">
        <Col span={12}>活动时间：{that.formatTime(config.start_time, true)}~{that.formatTime(config.end_time, true)}</Col>
        <Col span={12} className="status">{icon(config.campaign_node)}&nbsp;&nbsp;{config.campaign_node}</Col>
      </Row>
      <Row className="row">
        <Col span={4}>{config.shop_name}<BrandIcon pingName={config.ping_name} /></Col>
        {/* <Col span={1}></Col> */}
        <Col span={4}>{that.formatTime(config.createtime, true)}</Col>
        <Col span={2} offset={10}>合计：{config.pro_count}条</Col>
        <Col span={2}>通过：{config.act_count}条</Col>
        <Col span={2}>驳回：{config.reject_count}条</Col>
      </Row>
    </div>
  )
  return (
    <Tabs activeKey={`${currentStatus}`} onChange={that.handleTabChange} className="result-list">
      {
        list.map(v => (
          <TabPane tab={v.tabName} key={v.status}>
            {
              !!currentList.length ?
              currentList.map(val => item({...val})) :
              <div className="empty-style">暂无数据</div>
            }
          </TabPane>
        ))
      }
    </Tabs>
  )
})

const Tpl = ThatMatin(that => {
  const { cacheListObj, currentStatus } = that.state
  const { totalElements, pageSize, pageNo } = that.state.pagination
  return (
    <ContentBox
      breadcrumbList={['活动信息', '审批查询']}
      linkList={['', '']}
    >
    <div className="approval-query-wrapper">
      {/* <section className="top-header">
        <Breadcrumb>
          <Item>活动信息</Item>
          <Item>审批查询</Item>
        </Breadcrumb>
      </section> */}
      <section className="content">
        <div className="condition-search">
          <SearchBox that={that} />
        </div>
        <div className="search-result">
          <SearchResult that={that} />
          <Pagination 
            className="pagination"
            total={totalElements} 
            defaultPageSize={pageSize} 
            current={pageNo}
            showQuickJumper 
            onChange={that.handlePageChange}
            showTotal={(total, range) => {
              return `共 ${total} 条记录`
            }}
          />
        </div>
      </section>
      {/* <div className="copyright">
        <Copyright />
      </div> */}
    </div>
    </ContentBox>
  )
})

export default Tpl;