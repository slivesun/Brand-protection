import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'

import { Tabs, List, Row, Col, Checkbox, Cascader, Icon } from 'antd'

const TabPane = Tabs.TabPane
const TYPE_MAP = {
  all: '0',
  marked: '1',
  nobrand: '2',
  unmarked: '3',
}

const Tpl = ThatMain(that => {
  const { type, pagination, dataList, classifyList, dataCounts } = that.state
  const ListCom = data => {
    return (
      <List 
      header={
        <Row>
          <Col span={3}>序号</Col>
          <Col span={6}>商品ID</Col>
          <Col span={12}>商品标题</Col>
          <Col span={3}>操作</Col>
        </Row>
      }
      bordered
      pagination={{
        showQuickJumper: true,
        current: pagination.pageNo,
        pageSize: pagination.pageSize,
        total: pagination.totalElements,
        showTotal: total => `共 ${total} 条记录`,
        onChange: that.handlePageChange,
      }}
      dataSource={data}
      renderItem={(item, index) => {
        return (
          <Row className="list-item">
            <Col span={3}>{pagination.pageSize*(pagination.pageNo-1)+index+1}</Col>
            <Col span={6}>{item.item_id}</Col>
            <Col span={12}>
              <div className="overflow-ellipsis"><a href={item.item_link} target="_blank">{item.item_title}</a></div>
            </Col>
            <Col span={3}>
              <span 
                onClick={that.toggleFn.bind(that, index, true)} 
                className={`mark-btn ${item.type==TYPE_MAP.marked||item.type==TYPE_MAP.nobrand?'active':''}`}
              >
                <i></i>标记
              </span>
            </Col>
            <Col span={15} offset={9}>
              {
                item.type == TYPE_MAP.marked && !item._isShowEdit ?
                <div style={{marginTop:5}}>{`${item.product_class_name} / ${item.product_name}`}</div> :
                null
              }
              {
                item.type == TYPE_MAP.nobrand && !item._isShowEdit ?
                <div style={{marginTop:5}}><Checkbox checked>非本品牌商品</Checkbox></div> :
                null
              }
              {
                item._isShowEdit?
                <div>
                  <Checkbox 
                    checked={item._isCheckboxStatus}
                    onChange={that.handleCheckboxChange.bind(that, index)}
                  >
                    非本品牌商品
                  </Checkbox>
                  <Cascader 
                    value={
                      [
                        item._selected[0] && item._selected[0].id ? item._selected[0].id : item._selected[0],
                        item._selected[1] && item._selected[1].id ? item._selected[1].id : item._selected[1],
                      ]
                    }
                    className="cascader-wrapper"
                    disabled={item._isCheckboxStatus?item._isCheckboxStatus:false}
                    getPopupContainer={trigger => trigger.parentNode} 
                    options={classifyList} 
                    loadData={that.handleLoadData}
                    onChange={that.handleCascaderChange.bind(that, index)}
                    showSearch
                  />
                  <span className="options-btn">
                    <Icon type="close" onClick={that.toggleFn.bind(that, index, false)} />
                    <Icon type="check" onClick={that.submitMark.bind(that, index)}/>
                  </span>
                </div>:
                null
              }
            </Col>
          </Row>
        )
      }}
    />
    )
  }
  return (
    <ContentBox
      breadcrumbList={['系统设置', '商品链接标记', '店铺链接标记']}
      linkList={['', '1', '']}
      history={that.props.history}
    >
      <div className="link-marking-detail-wrapper">
        <Tabs defaultActiveKey={type} className="main-tab" onChange={that.handleTabChange}>
          <TabPane tab={`全部(${!!dataCounts && dataCounts.link_num || 0})`} key={TYPE_MAP.all} className="tab-item">{ListCom(dataList)}</TabPane>
          <TabPane tab={`待标记(${!!dataCounts && dataCounts.unmark_num || 0})`} key={TYPE_MAP.unmarked} className="tab-item">{ListCom(dataList)}</TabPane>
          <TabPane tab={`已标记(${!!dataCounts && dataCounts.mark_num || 0})`} key={TYPE_MAP.marked} className="tab-item">{ListCom(dataList)}</TabPane>
          <TabPane tab={`非本品牌商品(${!!dataCounts && dataCounts.mark_no_num || 0})`} key={TYPE_MAP.nobrand} className="tab-item">{ListCom(dataList)}</TabPane>
        </Tabs>
      </div>
    </ContentBox>
  )
})

export default Tpl