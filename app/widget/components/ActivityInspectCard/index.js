import { Card, Tag, Row, Col, Divider } from 'antd'
import moment from 'moment'
import { ImgModal } from '../ImgModal/ImgModal'
import { Button, Input } from 'antd'

import './index.less'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'
const imgStyle = {
  width: '72px',
  height: '72px',
  borderRadius: '3px',
  marginLeft: '11px',
  cursor: 'pointer'
}
const tagStyle = {
  'boxSizing': 'border-box',
  'height': '32px',
  'lineHeight': '32px',
  'padding': '0 17px',
  'fontSize': '14px',
}

const ActivityInspectCard = props => {
  const {
    shop_name,
    start_time,
    end_time,
    product_name,
    product_url,
    apply_price,
    actual_price,
    campaign_type,
    play_content,
    gift_situation,
    screenshot_b,
    screenshot_c,
    screenshot_o,
    campaignExamine,
    brand_review_username,
    brand_review_view,
    brand_review,
    inspect_id,
    id,
    system_review,
    system_review_explain,
    _isShowInspectInput,
    _index,
    now_time
  } = props.infos
  const sshot_b = JSON.parse(screenshot_b)
  const sshot_c = JSON.parse(screenshot_c)
  const sshot_o = JSON.parse(screenshot_o)
  const cardTitle = (
    <Row>
      <Col span={12} className="text-overflow-hidden">产品信息：{product_name}</Col>
      <Col span={12}>产品链接：<a href={product_url} target="_blank">{product_url}</a></Col>
    </Row>
  )
  return (
    <div className="activity-inspect-card">
      <Row className="head">
        <Col span={12} className="text-overflow-hidden">店铺名称：{shop_name}</Col>
        <Col span={12}>活动时间：{`${moment(start_time).format(FORMAT_TIME)}~${moment(end_time).format(FORMAT_TIME)}`}</Col>
      </Row>
      <Card title={cardTitle}>
        <Row className="activity-baseinfo">
          <Col span={8}>活动标价：{`¥${apply_price}`}</Col>
          <Col span={8} className="text-overflow-hidden">活动类型：{campaign_type}</Col>
          <Col span={8} className="text-overflow-hidden">赠品情况：{gift_situation}</Col>
          <Col span={8}>实际成交价：{`¥${actual_price}`}</Col>
          <Col span={8} className="text-overflow-hidden">玩法说明：{play_content}</Col>
        </Row>
        <Divider dashed />
        <Row className="screenshot" type="flex">
          <Col span={8}>
            <span>标价截图：</span>
            {
              !!sshot_b ? sshot_b.map((value, index) => (
                <img 
                  src={value} 
                  key={value} 
                  style={imgStyle} 
                  onClick={() => {props.imgClick({bl:true,urls:sshot_b,index,close:true})}}
                />
              )) : null
            }
          </Col>
          <Col span={8}>
            <span>成交价截图：</span>
            {
              !!sshot_c ? sshot_c.map((value, index) => (
                  <img 
                    src={value} 
                    key={value} 
                    style={imgStyle} 
                    onClick={() => {props.imgClick({bl:true,urls:sshot_c,index,close:true})}}
                  />
                )) : null
            }
          </Col>
          <Col span={8}>
            <span>其他截图：</span>
            {
              !!sshot_o ? sshot_o.map((value, index) => (
                  !!value ? 
                  <img 
                    src={value} 
                    key={value} 
                    style={imgStyle} 
                    onClick={() => {props.imgClick({bl:true,urls:sshot_o,index,close:true})}}
                  /> : null
                )) : null
            }
          </Col>
          <Col span={8}>
            系统稽查结果：
            {
              !!system_review ? 
              (system_review === '合格' ? <Tag style={tagStyle} color="green">合格</Tag> : <Tag style={tagStyle} color="red">不合格</Tag>) :
              null
            }
          </Col>
          <Col span={8} className="text-overflow-hidden">结果说明：{system_review_explain}</Col>
        </Row>
        {
          !!brand_review ? 
          <React.Fragment>
            <Divider dashed />
            <Row>
              <Col span={8}>稽查结果：{
                brand_review === '合格' ? 
                <Tag 
                  style={tagStyle}
                  color="green">合格</Tag> : 
                <Tag 
                  style={tagStyle}
                  color="red">不合格</Tag>
                }
              </Col>
              <Col span={8}>稽查人：{brand_review_username}</Col>
              <Col span={8}>稽查意见：{brand_review_view}</Col>
            </Row>
          </React.Fragment> : 
          null
        }
      </Card>
        {
          (
            // (
            //   // 活动期间中 三天之内 的未稽查 活动可以稽查
            //   !brand_review &&
            //   !_isShowInspectInput &&
            //   moment(props.startTime).valueOf() > moment(now_time).subtract(2, 'd').valueOf() &&
            //   moment(props.startTime).valueOf() < moment(now_time).valueOf() &&
            //   moment(now_time).valueOf() > moment(start_time).valueOf() &&
            //   moment(now_time).valueOf() < moment(end_time).valueOf()
            // )
            //   ||
            (
              // 当天或者三天之内 在活动期间内 的活动可以稽查
              !brand_review &&
              !_isShowInspectInput &&
              (
                // 三天之内的条件
                (
                  moment(props.startTime).valueOf() > moment(now_time).subtract(2, 'd').valueOf() &&
                  moment(props.startTime).valueOf() < moment(now_time).valueOf()
                ) ||
                // 当天的条件
                moment(props.startTime).format('YYYY-MM-DD') === moment(now_time).format('YYYY-MM-DD')
              ) &&
              // 活动进行中的条件
              moment(now_time).valueOf() > moment(start_time).valueOf() &&
              moment(now_time).valueOf() < moment(end_time).valueOf()
            )
          ) ?
          <div style={{textAlign: 'right', marginTop: '20px'}}>
            <Button 
              type="primary" 
              style={{backgroundColor:'#f00',borderColor:'#f00'}}
              onClick={props.toggleClick.bind(this, true, _index)}
            >我要介入</Button>
          </div> : 
          null
        }
        {
          _isShowInspectInput ? 
          <Row style={{marginTop: '20px'}}>
            <Col span={8}>
              稽查结果：
              <button 
                className={props.inspectResultBtn[_index]===0?'qualify customeBtn':'customeBtn'} 
                onClick={props.inspectOption.bind(this, '合格', _index)}>
                合格
              </button>
              &nbsp;&nbsp;
              <button 
                className={props.inspectResultBtn[_index]===1?'disQualify customeBtn':'customeBtn'} 
                onClick={props.inspectOption.bind(this, '不合格', _index)}>
                不合格
              </button>
            </Col>
            <Col span={8}>
              稽查意见：
              <Input 
                placeholder="请输入" 
                style={{width: '242px'}} 
                onChange={props.inspectOption.bind(this, 'input', _index)}
              />
            </Col>
            <Col span={8}>
              <Button 
                type="primary" 
                style={{backgroundColor:'#CFA972', borderColor:'#CFA972'}}
                onClick={props.confirmBtn.bind(this, {
                  type: 'bmc',
                  id: inspect_id,
                  cam_pro_id: id
                }, _index)}
              >
                确定
              </Button>
              &nbsp;&nbsp;
              <Button onClick={props.toggleClick.bind(this, false, _index)}>取消</Button>
            </Col>
          </Row> : 
          null
        }
    </div>
  )
}

export default ActivityInspectCard