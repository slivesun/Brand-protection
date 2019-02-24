// 投诉信息详情

import { Table, Card } from 'antd'
import './index.less'

const COMPLAINT_STATUS_TAOBAO = {
  'submitted': 'submitted', //'已提交',
  'auditNoPass': 'auditNoPass', //'审核不通过',
  'auditPass': 'auditPass', // '投诉审核通过-卖家待申诉',
  'appeal': 'appeal', //'卖家已申诉-待投诉方响应',
  'involved': 'involved',//'小二介入',
  'withdrawal': 'withdrawal',//'投诉方已撤诉',
  'appealPass': 'appealPass',//,'卖家申诉成立',
  'appealNoPass': 'appealNoPass',//'卖家申诉不成立',
  'invalid': 'invalid',//'链接已删除',
}
const COMPLAINT_STATUS_1688 = {
  'audit_rejected': '投诉未受理',
  'compromised': '投诉方已接受通知',
  'success': '投诉侵权内容处理',
  'failed': '投诉内容保留',
  'cancelled': '投诉方撤诉',
}

const ComplaintInfo = props => {
  const list = props.data
  const platform = props.platform
  const pagination = props.pagination
  const pageChange = props.pageChange

  const columns_1688 = [
    {
      title: '序号',
      render: (text, record, index) => (index + 1),
      key: 'xuhao'
    },
    {
      title: '商品信息',
      render: (text, record) => (
        <React.Fragment>
          <p style={{color:'#333'}}>{record.company_name}</p>
          <p>{record.item_title||''}</p>
          <p><a href={record.tort_link} target="_blank">{record.tort_link}</a></p>
          <p style={{color:'#999'}}>
            <span>{record.sale_price?`价格:￥${record.sale_price}`:''}</span>&nbsp;&nbsp;
            <span>{record.total_sold_quantity?`30天销量:${record.total_sold_quantity}`:''}</span>&nbsp;&nbsp;
            <span>{record.item_local?`发货地:${record.item_local}`:''}</span>
          </p>
        </React.Fragment>
      ),
      key: 'goods-info',
      width: 500,
    },
    {
      title: '投诉信息',
      key: 'complaint-info',
      render: (text, record) => (
        <React.Fragment>
          <p>投诉账号：{record.account_id}</p>
          <p>知识产权名称：{record.ipr_name?record.ipr_name:''}</p>
          <p>投诉单号：{record.complaint_num}</p>
          <p>投诉时间：{moment(record.complaint_time).format('YYYY-MM-DD')}</p>
        </React.Fragment>
      ),
    },
    {
      title: '所属站点',
      key: 'website',
      dataIndex: 'site',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'state',
    }
  ]
  
  const columns_taobao = [
    {
      key: 'xuhao',
      title: '序号',
      render: (text, record, index) => (index + 1)
    },
    {
      key: 'goods-info',
      title: '商品信息',
      render: (text, record) => (
        <React.Fragment>
          <p style={{color:'#333'}}>{record.shop_name||''}{record.wangwang?`（${record.wangwang}）`:''}</p>
          <p>{record.item_title||''}</p>
          <p><a href={record.entity_content} target="_blank">{record.entity_content}</a></p>
          <p style={{color:'#999'}}>
            <span>{record.sale_price?`价格:￥${record.sale_price}`:''}</span>&nbsp;&nbsp;
            <span>{record.total_sold_quantity?`销量:${record.total_sold_quantity}`:''}</span>&nbsp;&nbsp;
            <span>{record.item_local?`发货地:${record.item_local}`:''}</span>
          </p>
        </React.Fragment>
      ),
      width: 500,
    },
    {
      title: '投诉信息',
      key: 'tousu',
      render: (text, record) => (
        <React.Fragment>
          <p>投诉账号：{record.account_id}</p>
          <p>知识产权：{record.ipr_name}</p>
          <p>投诉单号：{record.batch_id}</p>
          <p>投诉时间：{moment(record.gmt_create).format('YYYY-MM-DD HH:mm')}</p>
        </React.Fragment>
      )
    },
    {
      title: '状态/申诉信息',
      key: 'status',
      width: 300,
      render: (text, record) => (
        <React.Fragment>
          <p>状态：{record.status_str}</p>
          {
            record.status !== COMPLAINT_STATUS_TAOBAO.withdrawal ?
            <React.Fragment>
              <p>申诉时间：{record.appeal_date}</p>
              <p>申诉理由：{record.appeal_comment}</p>
            </React.Fragment> :
            null
          }
        </React.Fragment>
      )
    },
  ]

  return (
    <Card bordered={false} title={<h5 className="card-title">投诉信息详情</h5>}>
      <Table 
        pagination={{
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`,
          total: pagination.totalElements,
          onChange: pageChange,
          current: pagination.pageNo,
        }}
        rowKey={record => {
          if (platform === 'taobao') {
            return record.id
          }
          if (platform === '1688') {
            return record.case_id
          }
        }} 
        columns={platform==='taobao'?columns_taobao:columns_1688} 
        dataSource={list} />
    </Card>
  )
}

export default ComplaintInfo