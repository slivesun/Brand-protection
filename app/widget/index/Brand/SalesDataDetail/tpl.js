import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import { Button, DatePicker, Select, Table, Row, Col } from 'antd'

const Option = Select.Option

const Tpl = ThatMain(that => {
  const { dealer_id, shop_id, month, saleDataList, pagination, dealerShopList } = that.state
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index+1,
      key: 'xuhao',
    },
    {
      title: '主题',
      dataIndex: 'daydate',
      key: 'daydate',
      // render: (text, record) => <a href={record.url} target="_blank">{text}</a>
    },
    {
      title: '店铺名称',
      dataIndex: 'shop_name',
      key: 'shop_name',
    },
    {
      title: '销售额',
      dataIndex: 'daymoney',
      key: 'daymoney',
      render: text => `￥${text}`
    },
    {
      title: '记录日期',
      dataIndex: 'createtime',
      key: 'createtime',
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
    }
  ]
  return (
    <ContentBox 
      title="销售数据详情" 
      breadcrumbList={['客户盘点', '客户信息', '客户详情', '销售数据详情']}
      linkList={['', '2', '1', '']}
      history={that.props.history}
    >
      <div className="sales-data-detail-wrapper">
        <Row type="flex" justify="space-between" className="conditions">
          <Col span={3}>
            <a href={`/hcm/dayReport/downLoadDay?dealer_id=${dealer_id}&shop_id=${shop_id}&ser_month=${month}`}>
              <Button>下载数据</Button>
            </a>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12} id="shopname">
                <label>
                  店铺名称&nbsp;&nbsp;
                  <Select 
                    placeholder="请选择" 
                    style={{width: '242px'}} 
                    getPopupContainer={trigger => document.getElementById('shopname')}
                    onChange={that.handleSelectChange}>
                    <Option value="">全部</Option>
                    {
                      dealerShopList.map((val, i) => <Option value={val.id} key={val.id}>{val.shop_name}</Option>)
                    }
                  </Select>
                </label>
              </Col>
              <Col span={12} id="month">
                月份&nbsp;&nbsp;
                <DatePicker.MonthPicker getCalendarContainer={trigger => document.getElementById('month')} style={{width: '242px'}} onChange={that.handleDateChange}/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table 
          // rowKey={record => record.id} 
          columns={columns}
          dataSource={saleDataList}
          className="tables"
          pagination={{
            total: pagination.totalElements,
            showTotal: total => `共${total}条`,
            showQuickJumper: true,
            // defaultPageSize: 1,
            onChange: that.handlePageChange.bind(that)
            // showSizeChanger: true
          }}
        />
      </div>
    </ContentBox>
  )
})

export default Tpl