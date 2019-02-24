import ThatMatin from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import Copyright from '../../../components/Copyright'
import { Breadcrumb, Button, Icon, Card, Row, Col, Divider, Tag } from 'antd'

const Item = Breadcrumb.Item

const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const ActivityDate = ThatMatin(that => {
  const { 
    selectedIndex, 
    moreButton, 
    sevenData, 
    currentShopBtn, 
    shopBtnList 
  } = that.state;
  return (
    <div className="activity-date">
      <section className="date-card">
        {
          sevenData.map((val, idx) => {
            const dateObj = new Date(val.my_date)
            const week = WEEKS[dateObj.getDay()]
            const day = dateObj.getDate() + ''
            const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, '0')}-${day.padStart(2, '0')}`
            return (
                <div 
                    className={`card ${selectedIndex === idx ? 'activite' : ''}`}
                    onClick={() => that.switchActivity(dateString, idx)}  
                    key={val.my_date}  
                >
                    <div>
                        <span>
                          {week}
                          &nbsp;&nbsp;
                          {
                            (selectedIndex === 6 && idx === 6) ? 
                            <p className="today">昨日</p> : 
                            null
                          }
                        </span>
                        <span>{day.padStart(2, '0')}</span>
                    </div>
                    <div>
                        <p>{`不合格活动（${val.all_count}）`}</p>
                        {
                            // (selectedIndex === 6 && idx === 6) ? 
                            // <p className="today">昨日</p> : 
                            // null
                        }
                    </div>
                </div>
            )
          })
        }
      </section>
      <section className="date-info">
        <div className="activity-shops">
          <Row type={"flex"} justify={"space-between"} className="row">
            <Col span={4} className="title">活动店铺（{shopBtnList.length||0}）</Col>
            {
              <Col span={2} className="more" onClick={that.moreButton}>
                {
                  moreButton ?
                    <span>收起更多&nbsp;<Icon type="up" /></span> :
                    <span>展开更多&nbsp;<Icon type="down" /></span>
                }
              </Col>
            }
          </Row>
          {
            moreButton ? 
              <Row className="row">
              <Button
                className="btn-item"
                type={currentShopBtn === 'all' ? 'primary' : ''}
                onClick={() => {
                  that.switchShopBtn('all')
                }}
              >
                全部（{shopBtnList.length||0}）
              </Button>
              {
                !!shopBtnList.length ? 
                shopBtnList.map((v, i) => {
                  return (
                    <Button
                      key={v.shop_id}
                      type={currentShopBtn === v.shop_id ? 'primary' : ''}
                      onClick={() => { that.switchShopBtn(v.shop_id) }}
                      className='show btn-item'
                    >
                      {`${v.shop_name}（${v.act_count}）`}
                    </Button>
                  )
                }) : 
                null
              }
            </Row> : null
          }

        </div>
      </section>
    </div>
  )
})

const Tpl = ThatMatin(that => {
  const { inspectInfoList, pagination: {count, pageSize, pageNum} } = that.state
  const cardTitle = config => (
    <div className="card-title">
      <div className="top">
        <Row className="row">
          <Col span={24} >所属客户：{config.dealername}</Col>
        </Row>
        <Row className="row">
          <Col span={12} >店铺名称：{config.shop_name}</Col>
          <Col span={12} >活动时间：{that.formatTime(config.start_time,true)} ~ {that.formatTime(config.end_time,true)}</Col>
        </Row>
        <Row className="row">
          <Col span={12} className="overflow-hidden">产品信息：{config.product_name}</Col>
          <Col span={12}>商品链接：<a href={config.product_url} target="_blank">{config.product_url}</a></Col>
        </Row>
      </div>
      <Divider dashed />
      <div className="bottom">
        <Row className="row">
          <Col span={8}>活动标价：¥{config.apply_price}</Col>
          <Col span={8}>活动类型：{config.campaign_type}</Col>
          <Col span={8}>赠品情况：{config.gift_situation}</Col>
        </Row>
        <Row className="row">
          <Col span={8}>实际成交价：¥{config.actual_price}</Col>
          <Col span={8}>玩法说明：{config.play_content}</Col>
        </Row>
      </div>
    </div>
  )

  const imgWrapper = list => (
    <div className="img-wrapper">
      {
        !!list.length ? 
        list.map((url, idx) => (
          <img 
            src={url} 
            key={url} 
            onClick={() => {that.handleImgClick({bl:true,close:true,urls:list,index:idx})}} 
            style={{ width: '72px', height: '72px', borderRadius: '3px' }}
          />
        )) : null
      }
    </div>
  )

  return (
    <ContentBox
      breadcrumbList={['活动信息', '活动稽查公示']}
      linkList={['', '']}
    >
    <div className="activity-inspection-publicity-wrapper">
      {/* <section className="top-header">
        <Breadcrumb>
          <Item>活动信息</Item>
          <Item>活动稽查公示</Item>
        </Breadcrumb>
      </section> */}
      <section className="content">
        <ActivityDate that={that} />
        {
          !!inspectInfoList.length ? 
          inspectInfoList.map((value, index) => {
            const {
              screenshot_b,
              screenshot_c,
              screenshot_o,
              system_review,
              system_review_explain,
              brand_review,
              brand_review_username,
              brand_review_view,
              campaign_id
            } = value
            const sshot_b = !!screenshot_b && JSON.parse(screenshot_b)
            const sshot_c = !!screenshot_c && JSON.parse(screenshot_c)
            const sshot_o = !!screenshot_o && JSON.parse(screenshot_o)
            return (
              <Card title={cardTitle(value)} className="inspect-detail" key={campaign_id}>
                <div className="body-top">
                  <Row className="row">
                    <Col span={8} className="img">标价截图：{imgWrapper(!!sshot_b?sshot_b:[])}</Col>
                    <Col span={8} className="img">成交价截图：{imgWrapper(!!sshot_c?sshot_c:[])}</Col>
                    <Col span={8} className="img">其他截图：{imgWrapper(!!sshot_o?sshot_o:[])}</Col>
                  </Row>
                  <Row className="row">
                    <Col span={8}>
                      系统稽查结果：
                      {
                        !!system_review ? 
                        (system_review === '合格' ? <Tag color="green">合格</Tag> : <Tag color="red">不合格</Tag>) :
                        null
                      }
                    </Col>
                    <Col span={8}>结果说明：<span>{system_review_explain}</span></Col>
                  </Row>
                </div>
                <Divider />
                <div className="body-bottom">
                  <Row>
                    <Col span={8}>
                      稽查结果：
                      {
                        !!brand_review ? 
                        (brand_review === '合格' ? <Tag color="green">合格</Tag> : <Tag color="red">不合格</Tag>) :
                        null
                      }
                    </Col>
                    <Col span={8}>稽查人：{brand_review_username}</Col>
                    <Col span={8}>稽查意见：{brand_review_view}</Col>
                  </Row>
                </div>
              </Card>
            )
          }) :
          null
        }
        {
          pageNum * pageSize > count ? 
          null : 
          <div className="loadMore">
            <Button onClick={that.handleLoadMoreClick} >加载更多···</Button>
          </div>
        }
      </section>
      {/* <div className="copyright">
        <Copyright />
      </div> */}
    </div>
    </ContentBox>
  )
})

export default Tpl;