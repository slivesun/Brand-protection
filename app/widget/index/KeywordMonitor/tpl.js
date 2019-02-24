import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'
import { AddIcon } from '../../components/Component'

import { Button, Input, Row, Col, Table, Dropdown, Menu, Icon, Select, Modal, Form, InputNumber } from 'antd'

const Option = Select.Option
const TIME_LIST = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]
const FREQUENCY_MAP = {
  '1': '1次/天',
  '2': '2次/天',
  '3': '3次/天',
  '4': '4次/天',
}
const Tpl = ThatMain(that => {
  const {
    isShowModal,
    selectedTableData,
    dataList,
    modalData,
    editKeyword,
    pagination,
    allLength,
    isDisabledSelectTime,
  } = that.state
  const selectTimeData = editKeyword.key_times?(editKeyword.key_times===""?[]:editKeyword.key_times.split(',')):(modalData&&modalData.key_times!==''?modalData.key_times.split(','):[])
  // console.log('selectTimeData---',selectTimeData)
  const rowSelection = {
    selectedRowKeys: selectedTableData,
    onChange: that.selectedTableChange,
  }
  const clearIconStyle = {
    width: '14px',
    height: '14px',
    opacity: 0.25,
    cursor: 'pointer'
}
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => (
        <span>
          {index+1}&nbsp;&nbsp;&nbsp;
          {
            // 0没有低价1有低价
            record.islowprice == 1  ?
            <i style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              backgroundColor: '#f00',
              borderRadius: '50%',
            }}></i>:
            null
          }
        </span>
      ),
      key: 'xuhao', 
    },
    {
      title: '关键词',
      dataIndex: 'key_name',
      key: 'keyword',
      render: (text, record) => (
        <span 
          style={{color:'#1890ff',cursor:'pointer'}} 
          onClick={that.goTo.bind(that, `/keywordMonitorDetail/${record.id}/${record.createtime}`)}>{text}</span>
      )
    },
    {
      title: '限价',
      dataIndex: 'key_price',
      key: 'limit-price',
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '频次',
      dataIndex: 'frequency',
      key: 'frequency',
      render: text => FREQUENCY_MAP[text]
    },
    {
      title: '更新时间',
      dataIndex: 'updatetime',
      key: 'update-time',
      render: text => moment(text).format('YYYY-MM-DD')
    },
    {
      title: '操作',
      render: (text, record, index) => {
        const menu = (
          <Menu>
            <Menu.Item onClick={that.modalClick.bind(that, true, record)}>
              <span style={{color:'#1890ff'}}>
                <img style={{verticalAlign:'sub'}} width='16' height="16" src="../../../img/icon/icon_operating_edit.png" />&nbsp;编辑
              </span>
            </Menu.Item>
            <Menu.Item onClick={that.goTo.bind(that, `/ChangeHistory/ipr_keyword/${record.key_name}/${record.id}`)}>
              <span style={{color:'#1890ff'}}>
                <img style={{verticalAlign:'sub'}} width="16" height="16" src="../../../img/icon/icon_operating_history.png" />&nbsp;变更历史
              </span>
            </Menu.Item>
            <Menu.Item onClick={that.handleDeleteOne.bind(that, record)}>
              <span style={{color:'#1890ff'}}>
                <img style={{verticalAlign:'sub'}} width="16" height="16" src="../../../img/icon/icon_operating_del.png" />&nbsp;删除
              </span>
            </Menu.Item>
          </Menu>
        )
        return (
          <React.Fragment>
            <span style={{color:'#1890ff',cursor:'pointer'}} onClick={that.goTo.bind(that, `/keywordMonitorDetail/${record.id}/${record.createtime}`)}>
              <Icon type="bars" theme="outlined" />&nbsp;详情
            </span>&nbsp;&nbsp;&nbsp;
            <Dropdown overlay={menu}><span style={{color:'#1890ff',cursor:'pointer'}}><Icon type="ellipsis" theme="outlined" />&nbsp;更多</span></Dropdown>
          </React.Fragment>
        )
      },
      key: 'option',
    }
  ]
  const tableProps = {}
  if (localStorage.getItem('logintype') === 'KEFU') {
    tableProps.expandedRowRender = (record, index) => (
      <React.Fragment>
        {
          !!record.key1 && !record._isShowInput ?
          <Row>
            <Col span={4}>{record.key1}</Col>
            <Col span={4}>{record.logic1}</Col>
            <Col span={4}>{record.key2}</Col>
            <Col span={4}>{record.logic2}</Col>
            <Col span={4}>{record.key3}</Col>
            <Col span={4}>
              <p 
                onClick={that.handleShowKeywordInput.bind(that, true, index)}
                style={{paddingLeft:'17px',textAlign:'left',color:'#1890FF',cursor:'pointer'}}>编辑</p>
            </Col>
          </Row>:
          (
            record._isShowInput ?
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              <Input placeholder="请输入关键词1" defaultValue={record.key1||''} style={{width:'240px'}} onChange={that.inputChange.bind(that, record, 'key1')} />
              <Input.Group compact style={{width:'330px'}}>
                <Select 
                  defaultValue={record.logic1||''} 
                  style={{width:'90px'}} 
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={that.selectChange.bind(that, record, 'logic1')}>
                  <Select.Option value="">请选择</Select.Option>
                  <Select.Option value="或">或</Select.Option>
                  <Select.Option value="且">且</Select.Option>
                  <Select.Option value="不包含">不包含</Select.Option>
                </Select>
                <Input placeholder="请输入关键词2" defaultValue={record.key2||''} style={{width:'240px'}} onChange={that.inputChange.bind(that, record, 'key2')} />
              </Input.Group>
              <Input.Group compact style={{width:'330px'}}>
                <Select 
                  defaultValue={record.logic2||''} 
                  style={{width:'90px'}} 
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={that.selectChange.bind(that,record, 'logic2')}>
                  <Select.Option value="">请选择</Select.Option>
                  <Select.Option value="或">或</Select.Option>
                  <Select.Option value="且">且</Select.Option>
                  <Select.Option value="不包含">不包含</Select.Option>
                </Select>
                <Input placeholder="请输入关键词3" defaultValue={record.key3||''} style={{width:'240px'}} onChange={that.inputChange.bind(that,record, 'key3')} />
              </Input.Group>
              <div>
                <span style={{color:'#1890ff',cursor:'pointer'}} onClick={that.handleSaveKeywordSet.bind(that, record)}>保存</span>
                &nbsp;&nbsp;&nbsp;
                <span style={{color:'#1890ff',cursor:'pointer'}} onClick={that.handleShowKeywordInput.bind(that, false, index)}>取消</span>
              </div>
            </div>:
            <p 
              onClick={that.handleShowKeywordInput.bind(that, true, index)}
              style={{paddingRight:'150px',textAlign:'right',color:'#1890FF',cursor:'pointer'}}>设置</p>
          )
        }
      </React.Fragment>
    )
  }
  return (
    <ContentBox
      breadcrumbList={['关键词监控']}
      linkList={['']}
    >
      <div className="keyword-monitor-wrapper">
        <Row style={{padding:'0 30px'}}>
          <Col span={8} className='Kword'>
            关键词：<Input 
                      placeholder="请输入" 
                      suffix={
                        !!that.state.key_name?
                        <Icon
                          type="close-circle"
                          onClick={() => that.handleClearIconClick()}
                          style={clearIconStyle}
                        />:null
                      } 
                      style={{width:'264px'}} 
                      value={that.state.key_name} 
                      onChange={that.handleKeywordChange} />
          </Col>
          <Col span={8} className='Kword'>
            平台：
            <Select 
              placeholder="请选择" 
              defaultValue="" 
              getPopupContainer={trigger => trigger.parentNode}
              style={{width:'240px'}} 
              onChange={that.handlePlatformSelect}>
              <Option value="">全部</Option>
              <Option value="淘宝天猫">淘宝天猫</Option>
              <Option value="1688网">1688网</Option>
              <Option value="闲鱼">闲鱼</Option>
              <Option value="拼多多">拼多多</Option>
              <Option value="京东商城">京东商城</Option>
              <Option value="苏宁易购">苏宁易购</Option>
              <Option value="当当网">当当网</Option>
              <Option value="唯品会">唯品会</Option>
            </Select>
          </Col>
          <Col span={4} offset={4} style={{textAlign:'right'}}><Button className="btn6" onClick={that.getDataList}>查询</Button></Col>
        </Row>
        <Row style={{marginTop:'30px',padding:'0 30px'}}>
          <Col span={12}>
            <Button className='btn1-main' type="primary" onClick={that.goTo.bind(that, '/addKeywordMonitor')}>
              {/* <Icon type="plus" />新增 */}
              <AddIcon style={{paddingRight:'8px'}} />新增
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button className="btn1-sub" onClick={that.handleDeleteAll}>批量删除</Button>
          </Col>
          <Col span={12} style={{textAlign:'right'}}><Button className="btn1-sub" onClick={that.goTo.bind(that, `/ChangeHistory/ipr_keyword_delate/`)}>变更历史</Button></Col>
        </Row>
        <Row className="tag-info" style={{padding:'0 30px 0px'}}>
          <Col span={24}>
            <div className="tag-wrapper">
              <span>共 {pagination.totalElements||0} 项 已选择 {allLength===''?selectedTableData.length:allLength} 项。</span>
              <span style={{color:'#1890FF',cursor:'pointer'}} onClick={that.selectedAll.bind(that, true)}>勾选全部/</span>
              <span style={{color:'#1890FF',cursor:'pointer'}} onClick={that.selectedAll.bind(that, false)}>取消勾选</span>
            </div>
          </Col>
        </Row>
        <Table 
          {...tableProps}
          rowKey={record => record.id}
          rowSelection={rowSelection} 
          loading={that.state.loading}
          pagination={{
            showQuickJumper:true,
            total:pagination.totalElements,
            onChange: that.handlePageChange,
          }}
          columns={columns} 
          style={{padding:'0 30px',backgroundColor:'#fff'}}
          dataSource={dataList} />
        <Modal 
          title="编辑"
          visible={isShowModal}
          onCancel={that.modalClick.bind(that, false)}
          onOk={that.handleModalOk}
          destroyOnClose={true}
          // className='YellowWhite'
          okButtonProps={{className:'btn2-main'}}
          cancelButtonProps={{className:'btn2-sub'}}
        >
            <Form>
              <Form.Item label="限价" labelCol={{span:6}} wrapperCol={{span:13}}>
                <InputNumber 
                  // max={9999999999}
                  maxLength="8"
                  style={{width:'100%'}}
                  defaultValue={modalData?modalData.key_price:''} 
                  onChange={that.formChange.bind(that, 'input', 'key_price')} />
              </Form.Item>
              <Form.Item label="监控范围" labelCol={{span:6}} wrapperCol={{span:13}}>
                <Select defaultValue={modalData?modalData.key_range:''} onChange={that.formChange.bind(that, 'select', 'key_range')}>
                  <Select.Option value="全部店铺">全部店铺</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="监控频次" labelCol={{span:6}} wrapperCol={{span:13}}>
                <Select defaultValue={modalData?modalData.frequency:''} onChange={that.formChange.bind(that, 'select', 'frequency')}>
                  <Select.Option value="1">1次/天</Select.Option>
                  <Select.Option value="2">2次/天</Select.Option>
                  <Select.Option value="3" disabled>3次/天</Select.Option>
                  <Select.Option value="4" disabled>4次/天</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="时间" labelCol={{span:6}} wrapperCol={{span:13}}>
                <Select 
                  onFocus={that.handleFocusSelect.bind(that, modalData)}
                  mode="multiple" 
                  // defaultValue={modalData&&!!modalData.key_times?modalData.key_times.split(','):[]} 
                  defaultValue={selectTimeData} 
                  onChange={that.formChange.bind(that, 'select', 'key_times')}>
                  {
                    TIME_LIST.map(v => (
                      <Select.Option 
                        disabled={
                          selectTimeData.includes(v)?false:isDisabledSelectTime
                        } 
                        key={v} 
                        value={v}>
                        {v}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Form>
        </Modal>
      </div>
      {/* <Button onClick={that.goTo.bind(that, '/keywordMonitorDetail/abc')}>跳转监控详情</Button>
      <Button onClick={that.goTo.bind(that, '/addKeywordMonitor')}>新增监控</Button> */}
    </ContentBox>
  )
})

export default Tpl