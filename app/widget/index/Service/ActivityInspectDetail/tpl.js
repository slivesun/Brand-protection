import ThatMain from '../../../HOC/That'
import Copyright from '../../../components/Copyright'
import ContentBox from '../../../components/Layout'

import { Breadcrumb, Tabs, DatePicker, Card, Row, Col, Tag, Divider, Button, Upload, Icon, Input } from 'antd'
import moment from 'moment'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

const Tpl = ThatMain(that => {
  const { counts, details = [], inspectResultBtn, currentDate } = that.state

  const updateCom = ({flag, index=0, _index}) => {
    const arr = JSON.parse(that.state.details[_index][flag])
    return <Upload
      action="/hcm/hcmWorkOrder/headImgUpload"
      onChange={that.handleUploadChange.bind(that, flag, index, _index)}
      showUploadList={false}
      accept="image/*"
      beforeUpload={that.handleBeforeUpload}
    >
      {
        !!arr.length && !!arr[index] ?
          <img src={arr[index]} style={{width:'72px',height:'72px',marginLeft:'11px'}} /> :
          <div className="upload-icon"></div>
      }
    </Upload>
  }

  const Item = config => {
    const {
      shop_name,
      start_time,
      end_time,
      product_name,
      product_url,
      apply_price,
      campaign_type,
      gift_situation,
      actual_price,
      play_content,
      system_review,
      id,
      inspect_id,
      system_review_explain,
      screenshot_b,
      screenshot_c,
      screenshot_o,
      _isShowInspectForm,
      _index,
      brand_review_username,
      brand_review_view,
      brand_review,
    } = config
    const sshot_b = JSON.parse(screenshot_b)
    const sshot_c = JSON.parse(screenshot_c)
    const sshot_o = JSON.parse(screenshot_o)
    const imgStyle = {
      width:'72px',
      height:'72px',
      marginLeft:'11px',
      cursor: 'pointer'
    }
    return (
      <section className="inspect-item-wrapper" key={id}>
        <Row className="head">
          <Col span={12} className="text-overflow-hidden">店铺名称：{shop_name}</Col>
          <Col span={12}>活动时间：{`${moment(start_time).format(FORMAT_TIME)} ~ ${moment(end_time).format(FORMAT_TIME)}`}</Col>
        </Row>
        <Card 
          className="card"
          title={
            <Row className="card-title">
              <Col span={12} className="text-overflow-hidden">产品信息：{product_name}</Col>
              <Col span={12} className="text-overflow-hidden">商品链接：<a href={product_url} target="_blank">{product_url}</a></Col>
            </Row>
          }
        >
          <Row className="baseinfo">
            <Col span={8}>活动标价：{apply_price}</Col>
            <Col span={8} className="text-overflow-hidden">活动类型：{campaign_type}</Col>
            <Col span={8} className="text-overflow-hidden">赠品情况：{gift_situation}</Col>
            <Col span={8}>实际成交价：{actual_price}</Col>
            <Col span={8} className="text-overflow-hidden">玩法说明：{play_content}</Col>
          </Row>
          <Row style={{marginTop:'20px'}}>
            <Col span={8}>稽查结果：{!!brand_review ? <Tag color={brand_review === '合格' ? 'green' : 'red'}>{brand_review}</Tag> : ''}</Col>
            <Col span={8}>稽查人：{brand_review_username}</Col>
            <Col span={8}>稽查意见：{brand_review_view}</Col>
          </Row>
          {
            _isShowInspectForm ? 
            <React.Fragment>
              <Divider dashed />
              <Row className="upload-wrapper">
                  <Col span={8}>
                    标价截图：{updateCom({flag:'screenshot_b',_index})}
                  </Col>
                <Col span={8}>
                  成交价截图：{updateCom({flag:'screenshot_c', _index})}
                </Col>
                <Col span={8}>
                  其他截图：
                  {updateCom({flag:'screenshot_o',index:0,_index})}
                  {updateCom({flag:'screenshot_o',index:1,_index})}
                  {updateCom({flag:'screenshot_o',index:2,_index})}
                </Col>
              </Row>
            </React.Fragment> : 
            null
          }
          {
            !!system_review ? 
            <React.Fragment>
              <Divider dashed />
              <Row className="screenshot">
                <Col span={8} style={{display:'flex'}}>
                  标价截图：
                  {
                    sshot_b.map((v, i) => {
                      return <img 
                              onClick={that.handleImgShotClick.bind(that, {
                                bl:true,
                                close: true,
                                urls: sshot_b,
                                index: i
                              })} 
                              src={v} 
                              key={v} 
                              style={imgStyle} 
                            />
                    })
                  }
                </Col>
                <Col span={8} style={{display:'flex'}}>
                  成交价截图：
                  {
                    sshot_c.map((v, i) => {
                      return <img 
                              onClick={that.handleImgShotClick.bind(that, {
                                bl:true,
                                close: true,
                                urls: sshot_c,
                                index: i
                              })} 
                              src={v} 
                              key={v} 
                              style={imgStyle} 
                            />
                    })
                  }
                </Col>
                <Col span={8} style={{display:'flex'}}>
                  其他截图：
                  {
                    sshot_o.map((v, i) => {
                      return (!!v ?<img 
                              onClick={that.handleImgShotClick.bind(that, {
                                bl:true,
                                close: true,
                                urls: sshot_o,
                                index: i
                              })} 
                              src={v} 
                              key={v} 
                              style={imgStyle} 
                            />: null)
                    })
                  }
                </Col>
              </Row>
              <Divider dashed />
              <Row>
                <Col span={8}>稽查结果：<Tag color={system_review === '合格' ? 'green' : 'red'}>{system_review}</Tag></Col>
                <Col span={8}>结果说明：{system_review_explain}</Col>
              </Row>
            </React.Fragment> : 
            null
          }
        </Card>
        {
          _isShowInspectForm ? 
          <Row className="inspect-form">
            <Col span={8}>
              稽查结果：
              <button 
                className={inspectResultBtn[_index]===0?'qualify customeBtn':'customeBtn'} 
                onClick={that.inspectOptionResultClick.bind(this, '合格', _index)}
              >
                合格
              </button>
              &nbsp;&nbsp;
              <button 
                className={inspectResultBtn[_index]===1?'disQualify customeBtn':'customeBtn'} 
                onClick={that.inspectOptionResultClick.bind(this, '不合格', _index)}
              >
                不合格
              </button>
            </Col>
            <Col span={8}>
              结果说明：
              <Input 
                placeholder="请输入" 
                style={{width:'242px'}} 
                onChange={that.handleInputReview.bind(that, _index)}
              />
            </Col>
            <Col span={8} style={{textAlign:'right'}}>
              <Button 
                type="primary" 
                style={{backgroundColor:'#cfa972',borderColor:'#cfa972'}}
                onClick={that.handleConfirmBtnClick.bind(that, {
                  cam_pro_id: id,
                  id: inspect_id
                }, _index)}
              >
                确认
              </Button>
              &nbsp;&nbsp;
              <Button onClick={that.handleInspectBtnClick.bind(that, false, _index)}>取消</Button>
            </Col>
          </Row> : 
          null
        }
        {
          (!brand_review && 
            !system_review && 
          !_isShowInspectForm && 
          moment().format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD') && 
          Date.now() > start_time && 
          Date.now() < end_time) ? 
          <div className="inspect-btn">
            <Button
              type="primary"
              style={{ backgroundColor: '#f00', borderColor: '#f00' }}
              onClick={that.handleInspectBtnClick.bind(that, true, _index)}
            >
              稽查
            </Button>
          </div> : null
        }
      </section>
    )
  }

  return (
    <ContentBox
        breadcrumbList={['活动稽查']}
        linkList={['']}
    >
    <div className="service-activity-inspect-detail">
      {/* <header>
        <Breadcrumb>
          <Breadcrumb.Item>活动稽查</Breadcrumb.Item>
        </Breadcrumb>
      </header> */}
      <main>
        <section className="condition-wrapper">
          <div className="date">
            活动日期：
            <DatePicker 
              style={{width:'242px'}} 
              onChange={that.handleTimeChange} 
              format="YYYY-MM-DD"
              defaultValue={moment()} />
            </div>
          <Tabs defaultActiveKey="1" className="custom-tab" onChange={that.handleTabChange}>
            <Tabs.TabPane tab={`全部（${counts.act_count+counts.reject_count || 0}）`} key="1"></Tabs.TabPane>
            <Tabs.TabPane tab={`待稽查（${counts.act_count || 0}）`} key="2"></Tabs.TabPane>
            <Tabs.TabPane tab={`已稽查（${counts.reject_count || 0}）`} key="3"></Tabs.TabPane>
          </Tabs>
        </section>
        {
          !!details.length ? details.map((value, index) => {
            return Item({...value,_index:index})
          }) :
          <div className="empty-text">暂无数据</div>
        }
      </main>
      <footer>
        {/* <Copyright /> */}
      </footer>
    </div>
    </ContentBox>
  )
})

export default Tpl