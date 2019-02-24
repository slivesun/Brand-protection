import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'

import { Row, Col, Form, Select, Input, DatePicker, Button, Table, Icon, Tooltip } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

const clearIconStyle = {
  width: '14px',
  height: '14px',
  opacity: 0.25,
  cursor: 'pointer'
}
const LEVEL_MAP = {
  '星': 'heart',
  '钻': 'Blue_diamond',
  '蓝冠': 'Blue_crown',
  '皇冠': 'Yellow_crown',
}

const Tpl = ThatMain(that => {
  const {
    platformList,
    platform,
    start_time,
    end_time,
    wangwang,
    itemid,
    dataList,
    pagination,
    selectedTableRows,
    isCheckedAll,
  } = that.state
  const SearchComponent = props => {
    const { getFieldDecorator, getFieldsValue, getFieldValue, resetFields } = props.form
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 15},
    };
    return (
      <Form onSubmit={that.handleSearchSubmit.bind(that, getFieldsValue)}>
        <Row>
          <Col span={8}>
            <FormItem label="平台" {...formItemLayout}>
              {
                getFieldDecorator('platform', {
                  initialValue: platform,
                })(
                  <Select getPopupContainer={trigger => trigger.parentNode}>
                    <Option value="">全部</Option>
                    {
                      platformList.map(v => <Option key={v.id} value={v.dictName}>{v.dictName}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem label="商品ID"
            labelCol={{span: 4}}
            wrapperCol={{span: 15}}
          >
              {
                getFieldDecorator('itemid', {
                  initialValue: itemid,
                })(
                  <Input 
                    placeholder="请输入" 
                    suffix={
                      !!getFieldValue('itemid')?
                      <Icon 
                        style={clearIconStyle} 
                        // onClick={that.handleClearInput.bind(that, 'itemid')} 
                        onClick={() => {
                          if (!!itemid) {
                            that.handleClearInput('itemid')
                          }
                          resetFields(['itemid'])
                        }}
                        type="close-circle" />:null
                  } />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="提交时间" style={{float:'right'}} labelCol={{span:4}} wrapperCol={{span:15}}>
              {
                getFieldDecorator('times', {
                  initialValue: [start_time, end_time],
                })(
                  <RangePicker 
                    // onChange={that.dateChange}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                    getCalendarContainer={trigger => trigger.parentNode}
                  />
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="旺旺" {...formItemLayout}>
              {
                getFieldDecorator('wangwang', {
                  initialValue: wangwang,
                })(
                  <Input placeholder="请输入" suffix={
                    !!getFieldValue('wangwang')?
                  <Icon 
                    style={clearIconStyle}
                    // onClick={that.handleClearInput.bind(that, 'wangwang')} 
                    onClick={() => {
                      if (!!wangwang) {
                        that.handleClearInput('wangwang')
                      }
                      resetFields(['wangwang'])
                    }}
                    type="close-circle" />:null
                } />
                )
              }
            </FormItem>
          </Col>
          <Col span={16} style={{textAlign:'right'}}>
            <Button className="btn6" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
  const SearchForm = Form.create()(SearchComponent)
  const columns = [
    {
      title: '序号',
      key: 'xuhao',
      render: (text, record, index) => index + 1
    },
    {
      title: '商品信息',
      key: 'item',
      width: '50%',
      render: (text, record) => {
        const {
          store_name,
          wangwang,
          authorize,
          platform,
          shoplevel,
          itemurl,
          price,
          sales_volume,
          send_address,
          submit_time,
          itemtitle,
        } = record
        const arrLength = shoplevel===''?0:parseInt(shoplevel.split(',')[0], 10)
        const levelKey = shoplevel===''?'':shoplevel.split(',')[1]
        const arr = []
        for (let i = 0; i < arrLength; i++) {
          arr.push(1)
        }
        return (
          <div>
            <p style={{display:'flex',alignItems:'center'}}>
              <span>{store_name}</span>
              <span>（{wangwang}）</span>
              {
                authorize !== ''?
                <img src="../../../../img/Authorized.png" width="52" height="15" />:
                null
              }
            </p>
            <p style={{display:'flex',alignItems:'center',marginTop:'3px'}}>
              <span>{
                platform==='淘宝网'?
                <img width="21" height="20" src="../../../../img/icon/tao.png" />:
                <img width="20" height="20" src="../../../../img/icon/Tmall.png" />
              }</span>
              &nbsp;&nbsp;&nbsp;
              <span>{
                arr.length?
                arr.map((v, i) => <img style={{marginRight:'3px'}} key={i} width="16" height="16" src={`../../../../img/icon/${LEVEL_MAP[levelKey]}.png`} />):
                null
              }</span>
            </p>
            <p className="text-ellipse">
              <Tooltip title={itemtitle}>
                <a href={itemurl} target="_blank">{itemurl}</a>
              </Tooltip>
            </p>
            <p>
              <span>价格：{price}</span>
              &nbsp;
              <span>销量：{sales_volume}</span>
              &nbsp;
              <span>发货地：{send_address}</span>
            </p>
            <p>提交时间：{moment(submit_time).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
        )
      }
    },
    {
      title: '标记',
      key: 'mark',
      render: (text, record) => {
        const {
          limit_price,
          complaint_mode,
          complaint_remarks,
        } = record
        return (
          <div>
            <p>限价：{limit_price}</p>
            <p>投诉方式：{complaint_mode}</p>
            <p>投诉备注：{complaint_remarks}</p>
          </div>
        )
      }
    },
    {
      title: '备注',
      key: 'backup',
      render: (text, record) => {
        const {
          remarks1,
          remarks2,
          remarks3,
          remarks4,
          remarks5,
        } = record
        return (
          <div>
            <p>备注1：{remarks1}</p>
            <p>备注2：{remarks2}</p>
            <p>备注3：{remarks3}</p>
            <p>备注4：{remarks4}</p>
            <p>备注5：{remarks5}</p>
          </div>
        )
      }
    },
    {
      title: '鹰智快照',
      dataIndex: 'snapshot_url',
      key: 'snapshot_url',
      width: 100,
      render: text => (
        text === '' || !text?
        <span>查看快照</span>:
        <a href={text} target="_blank">查看快照</a>
      )
    }
  ]
  const rowSelection = {
    onChange: that.handleRowSelection,
    selectedRowKeys: selectedTableRows,
  }
  return (
    <ContentBox
      breadcrumbList={['维权服务', '插件汇总']}
      linkList={['', '']}
      className="out-wrapper"
    >
      <div className="plugin-summary-wrapper">
        <section className="seaerch-wrapper">
          <SearchForm />
        </section>
        <section className="content-warpper">
          <div className="options-btn">
            <Button onClick={that.handleDelete}>批量删除</Button>&nbsp;&nbsp;
            <a href={`/hcm/plugin/down_pluginList?platform=${platform}&start_time=${start_time.format('YYYY-MM-DD HH:mm:ss')}&end_time=${end_time.format('YYYY-MM-DD HH:mm:ss')}&wangwang=${wangwang}&itemid=${itemid}`}>
              <Button>下载数据</Button>
            </a>
          </div>
          <div className="table-info">
            <Icon type="info-circle" theme="outlined" style={{color:'#1890ff'}} />&nbsp;
            <span>共 <i className="num">{pagination.totalElements}</i> 项，已选择 <i className="num">{isCheckedAll?pagination.totalElements:selectedTableRows.length}</i> 项。</span>
            <span className="btn-click" onClick={that.selectAll}>勾选全部/</span>
            <span className="btn-click" onClick={that.cancelAll}>取消勾选</span>
          </div>
          <Table 
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataList}
            style={{position:'relative'}}
            pagination={{
              total: pagination.totalElements,
              showQuickJumper: true,
              onChange: that.pageChange,
              pageSize: pagination.pageSize,
              current: pagination.pageNo,
              showTotal: (total, range) => {
                return (
                  <span style={{position:'absolute',left:0}}>
                    {`共 ${total} 条记录 第 ${pagination.pageNo} / ${pagination.totalPages} 页 `}
                  </span>
                )
              },
            }}
          />
        </section>
      </div>
    </ContentBox>
  )
})

export default Tpl