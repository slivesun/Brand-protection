import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'

import { Button, Form, Select, Row, Col, Input, Icon, InputNumber } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const KeywordTemp = props => {
  const list = props.list
  return (
    list.map((v, i) => (
      <Row key={v._id} style={{position:'relative',marginBottom:'20px'}}>
        <Col span={11}><Input value={v.name} onChange={e => {props.inputChange('name', i, e)}} placeholder="关键词" /></Col>
        <Col span={2} style={{textAlign:'center'}}><span >--</span></Col>
        <Col span={11}>
          <InputNumber value={v.value} 
            // max={9999999999} 
            maxLength="8"
            onChange={e => {props.inputChange('value', i, e)}} 
            style={{width:'100%'}} 
            placeholder="限价" />
        </Col>
        {/* <Icon 
          onClick={() => {props.delete(i)}}
          type="minus-circle" 
          theme="outlined" 
          style={{position:'absolute',right:'-25px',top:'12px',cursor:'pointer'}} /> */}
          <img  onClick={() => {props.delete(i)}} style={{position:'absolute',right:'-25px',top:'12px',cursor:'pointer'}} src="../../../img/icon_Cut off_normal.png" alt=""/>
      </Row>
    ))
  )
}

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

const Tpl = ThatMain(that => {
  const {
    keywordList,
    monitorTime,
    isDisabledMonitorTime,
  } = that.state
  
  const {
    getFieldDecorator,
  } = that.props.form

  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 8 },
    },
  }

  return (
    <ContentBox
      breadcrumbList={['关键词监控', '新增']}
      linkList={['1', '']}
      history={that.props.history}
    >
      <Form id="add-keyword-monitor-wrapper" onSubmit={that.handleSubmit}>
        <FormItem
          label="平台"
          {...formItemLayout}
        >
          {
            getFieldDecorator('platform', {
              rules: [
                { required: true, message: '请选择平台' }
              ]
            })(
              <Select placeholder="请选择" getPopupContainer={trigger => trigger.parentNode}>
                <Option value="淘宝天猫">淘宝天猫</Option>
                <Option value="1688网">1688网</Option>
                <Option value="闲鱼">闲鱼</Option>
                <Option value="拼多多">拼多多</Option>
                <Option value="京东商城">京东商城</Option>
                <Option value="苏宁易购">苏宁易购</Option>
                <Option value="当当网">当当网</Option>
                <Option value="唯品会">唯品会</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          label="监控范围"
          {...formItemLayout}
        >
          {
            getFieldDecorator('monitorRange', {
              initialValue: '全部店铺',
              rules: [
                { required: true, message: '请选择监控范围' }
              ]
            })(
              <Select placeholder="请选择" getPopupContainer={trigger => trigger.parentNode}>
                <Option value="全部店铺">全部店铺</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          label="监控频次"
          {...formItemLayout}
        >
          {
            getFieldDecorator('monitorRate', {
              rules: [
                { required: true, message: '请选择监控频次' }
              ]
            })(
              <Select placeholder="请选择" getPopupContainer={trigger => trigger.parentNode}>
                <Option value="1">1次/天</Option>
                <Option value="2">2次/天</Option>
                <Option value="3" disabled>3次/天</Option>
                <Option value="4" disabled>4次/天</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          label="监控时间"
          {...formItemLayout}
        >
          {
            getFieldDecorator('monitorTime', {
              rules: [
                { required: true, message: '请选择监控时间' }
              ]
            })(
              <Select 
                mode="multiple"
                placeholder="请选择" 
                onChange={that.handleSelectTimeChange}
                onFocus={that.handleSelectFocus}
                getPopupContainer={trigger => trigger.parentNode}
              >
                {
                  TIME_LIST.map(v => <Option disabled={monitorTime.includes(v)?false:isDisabledMonitorTime} key={v} value={v}>{v}</Option>)
                }
              </Select>
            )
          }
        </FormItem>
        <Row>
          <Col offset={4} span={12}>
            <p style={{marginBottom:'20px',color:"#FAAD14",width:"310px",background: "rgba(250,173,20,0.05)"}}> <img src="../../../img/laba.png" style={{marginLeft:"5px",marginRight:"5px"}} alt=""/><b>小提示：监控关键词仅支持本品牌商品关键词</b></p>
          </Col>
        </Row>
        <FormItem
          label={<span><i style={{color:'#f00',marginRight:'5px'}}>*</i>关键词</span>}
          {...formItemLayout}
        >
          {
            getFieldDecorator('keywords')(
              <React.Fragment>
                <KeywordTemp list={keywordList} inputChange={that.handleInputChange} delete={that.handleDeleteKeyword} />
                <div className="add-keyword" onClick={that.handleAddKeyword}><Icon type="plus" theme="outlined" /></div>
              </React.Fragment>
            )
          }
        </FormItem>
        <FormItem
          wrapperCol={{span: 10, offset: 4}}
        >
          <Button className='btn2-main' type="primary" htmlType="submit">确认</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={that.handleReset}>取消</Button>
        </FormItem>
      </Form>
    </ContentBox>
  )
})

export default Tpl