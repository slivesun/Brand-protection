import ThatMatin from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import Copyright from '../../../components/Copyright'
import { Breadcrumb, Row, Col, Card, Icon, Divider, Button, Pagination, Form, Input, InputNumber } from 'antd'
import moment from 'moment'

const Item = Breadcrumb.Item
const FormItem = Form.Item

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const Tpl = ThatMatin(that => {
  const { expandPriceIndex, detail = {}, status, selectIndex, cplist } = that.state;
  // const { getFieldDecorator } = that.props.form
  const {
    shop_name,
    campaign_name,
    ping_name,
    start_time,
    end_time,
    createtime,
    campaign_desc,
    dealer_name,
    // cplist
  } = detail
  const startTime = moment(start_time)
  const endTime = moment(end_time)
  const applyTime = moment(createtime)
  const ShopStatus = (
    <div className="shop-status-wrapper">
      <h1 className="title">{campaign_name}</h1>
      <Row>
        <Col span={8} className="col">
          <p>店铺：{shop_name}</p>
          <p>所属客户：{dealer_name}</p>
          <p>活动时间：{startTime.format(FORMAT_TIME)}  ~  {endTime.format(FORMAT_TIME)}</p>
        </Col>
        <Col span={8} className="col">
          <p>平台：{ping_name}</p>
          <p>申请时间：{applyTime.format(FORMAT_TIME)}</p>
          <p>活动说明：{campaign_desc}</p>
        </Col>
        <Col span={8} className="col img-wrapper">
          <p className="image"></p>
          <span className="text">{status}</span>
        </Col>
      </Row>
    </div>
  )
  const cardTitle = config => (
    <div className="card-title">
      <Row>
        <Col span={10} className="product-info overflow-hidden">产品信息：{config.product_name}</Col>
        <Col span={10} className="overflow-hidden">商品链接：<a href={config.product_url} target="_blank">{config.product_url}</a></Col>
        <Col span={4} style={{textAlign:'right'}} onClick={that.handleExpandPrice.bind(that, config.index)}>
          {
            <span className="toggle">
              {config._isExpandPrice?'收起':'展开'}参考价格<Icon type={config._isExpandPrice?'up':'down'} />
            </span>
          }
        </Col>
      </Row>
    </div>
  )
  const editForm = (props) => {
    const formList = [
      {
        label: '商品链接',
        required: true,
        type: 'text',
        key: 'product_url'
      },
      {
        label: '申请标价',
        required: true,
        type: 'number',
        key: 'apply_price'
      },
      {
        label: '实际成交价',
        required: true,
        type: 'number',
        key: 'actual_price'
      },
      {
        label: '活动类型',
        required: true,
        type: 'text',
        key: 'campaign_type'
      },
      {
        label: '赠品情况',
        required: true,
        type: 'text',
        key: 'gift_situation'
      },
      {
        label: '玩法说明',
        required: false,
        type: 'text',
        key: 'play_content'
      }
    ]
    const {
      getFieldDecorator
    } = props.form
    const { dataObj } = props
    that._forms.splice(props.index, 0, props.form)
    // console.log('llll', that)
    return (
      <Form onSubmit={that.handleEditSubmit.bind(that, props.id, props.index, props.campaignId)}>
        <Row>
          {
            formList.map(value => {
              return (
                <Col span={8} key={value.key}>
                  <FormItem label={value.label}>
                    {
                      getFieldDecorator(value.key, {
                        initialValue: dataObj[value.key] || '',
                        rules: [
                          {required: value.required,message: `请输入${value.label}!`}
                        ]
                      })(
                        value.type === 'text' ? 
                        <Input placeholder="请输入" style={{width:'300px'}} /> : 
                        <InputNumber placeholder="请输入" min={0} style={{width:'300px'}} />
                      )
                    }
                  </FormItem>
                </Col>
              )
            })
          }
        </Row>
        <Row>
          <Col span={24} style={{textAlign:'right'}}>
            <Button type="primary" htmlType="submit">确认</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={that.handleReeditClick.bind(that, props.index, false)}>取消</Button>
          </Col>
        </Row>
      </Form>
    )
  }
  const WrapperForm = Form.create()(editForm)
  const ProductItem = config => {
    const {
      index,
      campaign_id,
      apply_price,
      campaign_type,
      actual_price,
      gift_situation,
      play_content,
      price_map,
      product_name,
      product_url,
      product_id,
      campaign_node,
      campaignExamine = {},
      id,
      _isShowReeditForm,
      _isExpandPrice,
      startTime
    } = config
    return (
    <Card className="product-item-wrapper" title={cardTitle({index, product_name, product_url,_isExpandPrice})} key={id}>
      {
        _isExpandPrice ? 
        <React.Fragment>
          <div className="top">
            <Row className="row">
              {
                Object.entries(price_map).map(val => <Col span={8} key={val[0]} className="col">{val[0]}：¥{val[1]}</Col>)
              }
            </Row>
          </div>
          <Divider dashed />
        </React.Fragment> : 
        null
      }

      <div className="bottom">
        {
          campaign_node === '待审核' ? 
          <Row className="row waitReview">
            <Col span={8}>申请标价：¥{apply_price}</Col>
            <Col span={8}>活动类型：{campaign_type}</Col>
            <Col span={8}>赠品情况：{gift_situation}</Col>
            <Col span={8}>实际成交价：¥{actual_price}</Col>
            <Col span={8}>玩法说明：{play_content}</Col>
          </Row> : 
          (
            _isShowReeditForm ? 
            <WrapperForm 
              id={id} 
              index={index} 
              campaignId={campaign_id} 
              dataObj={{
                product_url,
                apply_price,
                actual_price,
                campaign_type,
                play_content,
                gift_situation
              }} /> : 
            <Row className="row reviewed">
              <Col span={7}>
                <p>申请标价：¥{apply_price}</p>
                <p>实际成交价：¥{actual_price}</p>
                <p style={{overflow:"hidden"}}>玩法说明：{play_content}</p>
              </Col>
              <Col span={8} style={{borderRight: '1px solid #ccc',marginLeft:"10px"}}>
                <p  style={{overflow:"hidden"}}>活动类型：{campaign_type}</p>
                <p style={{display:'flex',justifyContent:'space-between',paddingRight:'20px',overflow:"hidden"}}>
                  <span>赠品情况：{gift_situation}</span>
                  {
                    campaign_node === '审核驳回' && Date.now() < startTime ? 
                    <Button 
                      type="primary" 
                      style={{backgroundColor:'#f00',borderColor:'#f00'}}
                      onClick={that.handleReeditClick.bind(that, index, true)}
                    >
                      重新编辑
                    </Button> : 
                    null
                  }
                </p>
              </Col>
              <Col span={7} offset={1}>
                <p>审核人：{!!campaignExamine ? campaignExamine.examine_username : ''}</p>
                <p>
                  审核结果：
                  {
                    campaign_node === '审核通过' ? 
                    <Button type="primary" icon="check-circle">通过</Button> : 
                    <Button type="primary" style={{backgroundColor:'#faad14',borderColor:'#faad14'}} icon="info-circle">驳回</Button>
                  }
                </p>
                <p>审核意见：{!!campaignExamine ? campaignExamine.examine_view : ''}</p>
              </Col>
            </Row>
          )
        }
      </div>
    </Card>
  )}


  return (
    <ContentBox
      breadcrumbList={['活动信息', '审批查询', '活动详情']}
      linkList={['', '1', '']}
    >
    <div className="activity-details-wrapper">
      {/* <section className="top-header">
        <Breadcrumb>
          <Item>活动信息</Item>
          <Item href="index.html#/ApprovalQuery">审批查询</Item>
          <Item>活动详情</Item>
        </Breadcrumb>
      </section> */}
      <section className="content">
        <div className="main">
          {ShopStatus}
          {
            cplist.map((value, index) => {
              return ProductItem({...value, index, startTime: start_time})
            })
          }
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