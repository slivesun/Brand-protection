import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import ActivityListItem from '../../../components/ActivityListItem'
import { Form, Row, Col, Input, DatePicker, Select, Button, Tabs, Pagination, Icon } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const TabPane = Tabs.TabPane

const formItemStyle = {
  width: '242px'
}

const Tpl = ThatMain(that => {
  const { getFieldDecorator, getFieldValue } = that.props.form
  const { platformList, cacheActivityList, currentTabIndex, statusNums, pagination } = that.state
  const activityList = cacheActivityList[currentTabIndex] || []

  const clearIconStyle = {
    width: '14px',
    height: '14px',
    opacity: 0.25,
    cursor: 'pointer'
  }
  const clearIcon = fieldName => (
    <Icon
      onClick={that.handleClearIconClick.bind(that, fieldName)}
      type="close-circle"
      style={clearIconStyle}
    />
  )

  const searchBox = (
    <Form onSubmit={that.handleFormSubmit}>
      <Row>
        <Col span={7}>
          <FormItem label="活动主题" labelCol={{span: 4}} className='inputAR'>
            {
              getFieldDecorator('campaign_name', {
                initialValue: ''
              })(
                <Input 
                  placeholder="请输入" 
                  style={formItemStyle} 
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
        <Col span={7}>
          <FormItem label="所属客户" labelCol={{span: 4}} className='inputAR'>
            {
              getFieldDecorator('dealer_name', {
                initialValue: ''
              })(
                <Input 
                  placeholder="请输入" 
                  style={formItemStyle} 
                  suffix={
                    !!getFieldValue('dealer_name')?
                    clearIcon('dealer_name'):
                    null
                  }
                />
              )
            }
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem  label="提交时间" labelCol={{span: 4}}  wrapperCol={{span: 19}}>
            {
              getFieldDecorator('time', {
                initialValue: [moment().subtract(90, 'd'), moment()]
              })(
                <RangePicker 
                  getCalendarContainer={trigger => trigger.parentNode} 
                  format="YYYY-MM-DD HH:mm:ss" 
                  showTime 
                  style={{width:'100%'}} />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={7}>
          <FormItem label="店铺名称" labelCol={{span: 4}} className='inputAR'>
            {
              getFieldDecorator('shop_name', {
                initialValue: ''
              })(
                <Input 
                  placeholder="请输入" 
                  style={formItemStyle} 
                  suffix={
                    !!getFieldValue('shop_name')?
                    clearIcon('shop_name'):
                    null
                  } />
              )
            }
          </FormItem>
        </Col>
        <Col span={7}>
          <FormItem label="平台" labelCol={{span: 4}} className='inputAR'>
            {
              getFieldDecorator('ping_id', {
                initialValue: 'all'
              })(
                <Select style={formItemStyle} getPopupContainer={trigger => trigger.parentNode}>
                  <Option value="all">全部</Option>
                  {
                    platformList.map(value => <Option value={value.id} key={value.id}>{value.dictName}</Option>)
                  }
                </Select>
              )
            }
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem  wrapperCol={{span: 23}} style={{textAlign:'right'}} >
            <Button htmlType="submit" style={{color: '#1890ff', borderColor: '#1890ff'}}>查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )

  const TABS = [
    {
      text: '全部',
      key: "1",
      nums: 'all_count'
    },
    {
      text: '活动待审核',
      key: '2',
      nums: 'w_count'
    },
    {
      text: '待审核已过期',
      key: '3',
      nums: 'wt_count'
    },
    {
      text: '活动已审核',
      key: '4',
      nums: 'ok_count'
    },
    {
      text: '活动进行中',
      key: '5',
      nums: 'ing_count'
    },
    {
      text: '活动已完成',
      key: '6',
      nums: 'ot_count'
    }
  ]

  return (
    <ContentBox 
      title="活动审核" 
      breadcrumbList={['活动信息', '活动审核']}
      linkList={['', '']}
      className="activity-review-wrapper"
    >
      <div className="search-box">
        {searchBox}
      </div>
      <div className="search-result">
        <Tabs activeKey={`${currentTabIndex}`} className="tabs" onChange={that.handleTabChange}>
          {
            TABS.map(v => (
              <TabPane tab={`${v.text}（${statusNums[v.nums] || 0}）`} key={v.key}>
                {
                  !!activityList.length?
                  activityList.map((value) => <ActivityListItem clicked={that.goToDetail} infos={value} key={value.id} />):
                  <div className="empty-style">暂无数据</div>
                }
              </TabPane>
            ))
          }
        </Tabs>
      </div>
      <div className="pagination">
        <Pagination 
          total={pagination.totalElements} 
          pageSize={pagination.pageSize}
          current={pagination.pageNo}
          // showSizeChanger 
          showQuickJumper 
          showTotal={total => `共${total}条`} 
          onChange={that.handlePageChange}  
        />
      </div>
    </ContentBox>
  )
})

export default Tpl