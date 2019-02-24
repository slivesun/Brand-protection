import { Card, Divider, Row, Col, Icon, Button, Input } from 'antd'
import moment from 'moment'

import './index.less'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const ActivityPublicCard = props => {
  const {
    shop_name,
    start_time,
    end_time,
    product_name,
    product_url,
    price_map,
    apply_price,
    campaign_type,
    gift_situation,
    play_content,
    actual_price,
    campaign_id,
    campaign_node,
    campaignExamine,
    id,
    _index,
    _isExpandPrice
  } = props.infos
  // const status = props.reviewStatus
  const blueBtnStyle = {
    color: '#666',
    borderColor: '#d9d9d9'
  }
  const yellowBtnStyle = {
    color: '#666',
    borderColor: '#d9d9d9'
  }
  const commonData = {
    campaign_id,
    cam_pro_id: id
  } // 需要提交的公共信息
  const cardTitle = (
    <Row>
      <Col span={8} className="overflow-hidden">产品信息：{product_name}</Col>
      <Col span={12} className="overflow-hidden">商品链接：<a href={product_url} target="_blank">{product_url}</a></Col>
      <Col span={3} className="toggle-price" onClick={props.togglePrice.bind(this, _index)}>
        {_isExpandPrice?'收起':'展开'}参考价格&nbsp;<Icon type={_isExpandPrice?'up':'down'} />
      </Col>
    </Row>
  )
  return (
    <div className={`wrapper ${props.className}`}>
      {
        props.isShowHead ? 
        <Row className="head">
          <Col span={8} className="text-overflow-hidden">店铺名称：{shop_name}</Col>
          <Col span={16}>活动时间：{`${moment(start_time).format(FORMAT_TIME)}~${moment(end_time).format(FORMAT_TIME)}`}</Col>
        </Row> : 
        null
      }
      <Card title={cardTitle}>
        {
          _isExpandPrice ?
            <React.Fragment>
              <Row className="price-map">
                {
                  Object.entries(price_map).map((value, index) => <Col key={index} span={8}>{`${value[0]}：¥${value[1]}`}</Col>)
                }
              </Row>
              <Divider dashed />
            </React.Fragment> :
            null
        }

        {
          props.isShowReview ? 
          <React.Fragment>
            <Row className="public-info">
              <Col span={8}>
                <p>申请标价：{`¥${apply_price}`}</p>
                <p>实际成交价：{`¥${actual_price}`}</p>
                <p className="text-overflow-hidden">玩法说明：{play_content}</p>
              </Col>
              <Col span={8}>
                <p className="text-overflow-hidden">活动类型：{campaign_type}</p>
                <p className="text-overflow-hidden">赠品情况：{gift_situation}</p>
                <p></p>
              </Col>
              <Col span={8}>
                {
                  campaign_node !== '待审核' ? 
                  <p>审核人：{!!campaignExamine ? campaignExamine.examine_username : ''}</p> : 
                  null
                }
                {
                  campaign_node === '待审核' && props.activityStatus === '活动待审核' ? 
                  <React.Fragment>
                    <p>审核意见：
                      <Input placeholder="请输入" style={{width:'242px'}} onChange={props.inputChange.bind(this, _index)} />
                    </p>
                    <p>
                      审核结果：
                      <Button 
                        icon="check-circle-o" 
                        // style={blueBtnStyle} 
                        className="btn4-pass"
                        onClick={props.submit.bind(this, {
                            examine_view: props.reviewText[_index],
                            examine_result: '审核通过',
                            ...commonData
                        }, _index)}
                      >
                        通过
                      </Button>
                      &nbsp;&nbsp;
                      <Button 
                        icon="info-circle-o" 
                        // style={yellowBtnStyle} 
                        className="btn4-reject"
                        onClick={props.submit.bind(this, {
                          examine_view: props.reviewText[_index],
                          examine_result: '审核驳回',
                          ...commonData
                        }, _index)}
                      >
                        驳回
                      </Button>
                    </p>
                  </React.Fragment> : 
                  <React.Fragment>
                    <p className="text-overflow-hidden">审核意见：{!!campaignExamine ? campaignExamine.examine_view : ''}</p>
                    <p>审核结果：
                      {
                        !!campaignExamine ? 
                        (
                          campaignExamine.examine_result === '审核通过' ? 
                          <Button icon="check-circle-o" type="primary" style={{backgroundColor:'#52C41A',borderColor:'#52C41A'}}>通过</Button> : 
                          <Button icon="info-circle-o" type="primary" style={{backgroundColor:'#faad14',borderColor:'#faad14'}}>驳回</Button>
                        ) : 
                        null
                      }
                    </p>
                  </React.Fragment>
                }
              </Col>
            </Row>
          </React.Fragment> : 
          <Row className="review-wrapper">
            <Col span={8}>活动标价：{`¥${apply_price}`}</Col>
            <Col span={8} className="text-overflow-hidden">活动类型：{campaign_type}</Col>
            <Col span={8} className="text-overflow-hidden">赠品情况：{gift_situation}</Col>
            <Col span={8}>实际成交价：{`¥${actual_price}`}</Col>
            <Col span={8} className="text-overflow-hidden">玩法说明：{play_content}</Col>
          </Row>
        }
      </Card>
    </div>
  )
}

ActivityPublicCard.defaultProps = {
  isShowHead: true,   // 是否显示标题
  isShowReview: true, // 是否显示审核信息
  submit: () => {},
  inputChange: () => {},
  reviewText: '',
  activityStatus: ''
}

export default ActivityPublicCard