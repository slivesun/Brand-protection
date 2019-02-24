import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import ActivityInspectCard from '../../../components/ActivityInspectCard'
import { Input, Row, Col, Select, DatePicker, Button, Tabs, Icon } from 'antd'
import moment from 'moment'

const Option = Select.Option

const Tpl = ThatMain(that => {
  const { activityNums, detailList, isShowInspectInput, inspectResultBtn, start_time, shop_name, currentTab } = that.state

  const clearIconStyle = {
    width: '14px',
    height: '14px',
    opacity: 0.25,
    cursor: 'pointer'
  }

  const searchBox = (
    <div className="search-wrapper">
      <Row className="conditions">
        <Col span={7}>
          <label>
            店铺名称：
              <Input 
                value={shop_name}
                placeholder="请输入" 
                style={{ width: '242px' }} 
                onChange={that.handleInputChange} 
                suffix={
                  !!shop_name?
                  <Icon 
                    onClick={that.handleClearIconClick} 
                    type="close-circle" 
                    style={clearIconStyle} />:
                  null
                }
              />
          </label>
        </Col>
        <Col span={7}>
          <label>
            系统结果：
              <Select 
                defaultValue="" 
                style={{ width: '242px' }} 
                getPopupContainer={trigger => trigger.parentNode}
                onChange={that.handleChange.bind(this, 'sys_result')}>
              <Option value="">全部</Option>
              <Option value="合格">合格</Option>
              <Option value="不合格">不合格</Option>
            </Select>
          </label>
        </Col>
        <Col span={7}>
          <div>
            活动日期：
              <DatePicker
                defaultValue={moment()}
                getCalendarContainer={trigger => trigger.parentNode}
                format="YYYY-MM-DD"
                style={{ width: '242px' }}
                onChange={that.handleChange.bind(this, 'start_time')} 
              />
          </div>
        </Col>
        <Col span={3}><Button style={{ color: '#1890ff', borderColor: '#1890ff' }} onClick={that.handleSearchClick}>查询</Button></Col>
      </Row>
      <Row>
        <Tabs activeKey={currentTab} onChange={that.handleTabChange}>
          <Tabs.TabPane tab={`全部（${(activityNums.act_count + activityNums.reject_count) || 0}）`} key="1"></Tabs.TabPane>
          <Tabs.TabPane tab={`待稽查（${activityNums.act_count || 0}）`} key="2"></Tabs.TabPane>
          <Tabs.TabPane tab={`已稽查（${activityNums.reject_count || 0}）`} key="3"></Tabs.TabPane>
        </Tabs>
      </Row>
    </div>
    )
  return (
    <ContentBox 
      title="活动稽查" 
      breadcrumbList={['活动信息', '活动稽查']} 
      className="activity-inspect-wrapper"
      linkList={['', '']}
    >
      {searchBox}
      {
        detailList.length === 0 ? 
        <div style={{textAlign:'center',fontSize:'16px',margin:'50px'}}><span>暂无数据</span></div> : 
        detailList.map((value, index) => {
          return (
            <div className="detail" key={value.id}>
              <ActivityInspectCard 
                infos={{...value,_index:index}} 
                isShowInspectInput={isShowInspectInput} 
                toggleClick={that.handleComToggleClick}
                inspectOption={that.handleComInspectInfo}
                confirmBtn={that.handleComSubmitResult}
                inspectResultBtn={inspectResultBtn}
                imgClick={that.handleComImageClick}
                startTime={start_time}
              />
            </div>
          )
        })
      }
    </ContentBox>
  )
})

export default Tpl