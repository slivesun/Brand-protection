import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'
import Copyright from "../../components/Copyright";
import { ImgModal } from '../../components/ImgModal/ImgModal'
import "./monitorLowPriceScreenshot.less"
import { Button, Breadcrumb,DatePicker, Timeline, Row, Col } from 'antd'

const Tpl = ThatMain(that => {
  const {
    detail,
    start_time,
    end_time,
    screenshotList,
    pagination,
  } = that.state
const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
  return (
    <div className="monitorLowPriceScreenshot">
      <div className="Breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>

            <a href="/index.html#/keywordMonitor">关键词监控</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            低价详情
                            </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='content'>
        <div className='contentTop'>
          <div className="div" style={{padding:"10px"}}>低价商品信息</div>
          <div className="div" style={{marginLeft:"10px",height:"18px",display:"flex",justifyContent:'space-around'}}>
            <span  style={{overflow:"hidden"}}>店铺（旺旺）名称：{detail.shopname}（{detail.shopnick}）</span>
            <span>平台：{detail.platform}</span>
          </div>
          <div className="div" style={{marginLeft:"10px"}}>商品名称：<a href={detail.itemlink} target="_blank">{detail.itemtitle}</a></div>
        </div>
        <div className='contentTop'>
          <div className="div"><span>鹰智快照记录</span>
            <span className="span">
              <RangePicker
                onChange={that.dateChange}
                defaultValue={[start_time, end_time]}
                format={dateFormat}
                getCalendarContainer={trigger => trigger.parentNode}
              />
            </span>
          </div>
          <Timeline style={{ marginTop: "10px" }}>
            {
              !!screenshotList.length ?
              screenshotList.map((v, i) => (
                <Timeline.Item key={i}>
                  <div>
                    <h5>
                      <span style={{fontWeight:'bold'}}>{v.date_his}</span>&nbsp;&nbsp;&nbsp;
                      共监控到{v.count_his}次低价情况
                    </h5>
                    <Row>
                      {
                        v.modelBList.map((val, idx) => (
                          <Col key={idx} span={6}>
                            <p style={{margin:'10px 0'}}>{val.monitor_time}</p>
                            <img 
                              onClick={() => ImgModal({bl:true,urls:[val.lowprice_screenshot],close:true})}
                              src={val.lowprice_screenshot} 
                              width="200" 
                              height="117" 
                              style={{borderRadius:'5px'}} />
                          </Col>
                        ))
                      }
                    </Row>
                  </div>
                </Timeline.Item>
              )): 
              <p style={{textAlign:'center'}}>暂无数据</p>
            }
          </Timeline>
          {
            parseInt(pagination.pageNum, 10) * parseInt(pagination.pageSize, 10) < parseInt(pagination.count) ?
            <div style={{marginTop:'20px',textAlign:'center'}}>
              <Button onClick={that.MoreClick}>加载更多</Button>
            </div> :
            null
          }
        </div>
      </div>

      <Copyright clazzName='copyright' />
    </div>
  )
})

export default Tpl