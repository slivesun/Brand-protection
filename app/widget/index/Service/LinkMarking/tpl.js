import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'

import { Row, Col, Input, Icon, Table } from 'antd'

const Tpl = ThatMain(that => {
  const { shopList, pagination, shop_name } = that.state
  const columns = [
    {
      key: 'xuhao',
      render: (text, record, index) => <p style={{paddingLeft:'35px'}}>{pagination.pageSize*(pagination.pageNo)+index+1}</p>,
      title: '序号',
      width: 100,
    },
    {
      key: 'shop_name',
      title: '商家名称',
      dataIndex: 'shop_nick',
      width: '44%',
      render: (text, record) => (
        <span onClick={that.goTo.bind(that, `/linkMarkingDetail/${text}`)} style={{color:'#108CEE',cursor:'pointer'}}>{text}</span>
      )
    },
    {
      key: 'mark_situation',
      title: '标记情况',
      dataIndex: '',
      width: '44%',
      render: (text, record) => (
        <div className="mark-wrapper">
          <span className="item">链接数：{record.link_num}</span>
          <span className="vertical-line"></span>
          <span className="item">未标记：{record.unmark_num}</span>
          <span className="vertical-line"></span>
          <span className='item'>已标记：{record.mark_num}</span>
        </div>
      )
    }
  ]
  return (
    <ContentBox
      breadcrumbList={['系统设置', '商品链接打标']}
      linkList={['', '']}
    >
      <div className="link-marking-wrapper">
        <Row className="title-wrapper" type="flex" justify="space-between" align="middle">
          <Col className='title' span={12}>品牌店铺数：{pagination.totalElements||0}</Col>
          <Col className='input' span={12}>
            <Input 
              onChange={that.handleInputChange}
              placeholder="请输入店铺名称" 
              suffix={<Icon style={{cursor:'pointer'}} onClick={that.handleSearchClick} type="search" />} />
          </Col>
        </Row>
        <Table 
          rowKey="shopid" 
          dataSource={shopList} 
          columns={columns} 
          className="table-container"
          pagination={{
            showQuickJumper: true,
            total: pagination.totalElements,
            current: pagination.pageNo,
            pageSize: pagination.pageSize,
            onChange: that.handlePageChange,
            showTotal: total => <span>共 {total} 条记录</span>,
          }}
        />
      </div>
    </ContentBox>
  )
})

export default Tpl