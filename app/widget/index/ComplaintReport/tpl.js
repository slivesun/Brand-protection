import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'
import ShopComplaintRank from '../../components/ShopComplaintRank'
import ComplaintInfoDetailTable from '../../components/ComplaintInfoTable'
import DateWrapper from '../../HOC/DateWrapper'


import { Button, DatePicker, Tabs, Row, Col, Icon } from 'antd'

const RangePicker = DatePicker.RangePicker
const TabPane = Tabs.TabPane
const NewRangPicker = DateWrapper(RangePicker)

const Tpl = ThatMain(that => {
  const {
    platform,
    inner_platform,
    start_time,
    end_time,
    shopComplaintRank,
    complaintListDetail,
    alreadyComplaintList,
    currentTab,
    pagination,
    tablePage,
    currentIpr,
  } = that.state

  // const iprList = alreadyComplaintList.map(v => v.complaintModelList).reduce((a, b) => a.concat(b), [])
  // const iprList = currentTab === '' ? 
  // const ipr_names = currentTab === '' ? '' : alreadyComplaintList.filter(v => v.report_id===currentTab)[0].complaintModelList.map(v => v.ipr_name).join(',')
  // const ipr_nums = currentTab === '' ? '' : alreadyComplaintList.filter(v => v.report_id===currentTab)[0].complaintListDetail.map(v => v.ipr_id).join(',')
  const startTime = start_time.format('YYYY-MM-DD')
  const endTime = end_time.format('YYYY-MM-DD')
  let download_url = ''
  if (platform === 'taobao') {
    download_url = `/hcm/complaint/downReport_taobao?iprName=${currentIpr}&start_time=${startTime}&end_time=${endTime}`
  }
  if (platform === '1688') {
    download_url = `/hcm/complaint/downLoadReport_1688?ipr_num=${currentIpr}&start_time=${startTime}&end_time=${endTime}`
  }

  const showIprList = list => (
    list.map((val, idx) => (
      <span key={idx}>{`${val.ipr_name}（${val.account_id}）${idx === list.length-1 ? '' : '、'}`}</span>
    ))
  )
  const setComplaintReportPath = platform === 'taobao' ? '/taobaoSetComplaintReport/taobao' : '/aliSetComplaintReport/1688'

  return (
    <ContentBox
      breadcrumbList={['投诉报表', `${platform==='taobao'?'淘宝':'1688'}投诉报表`]}
      linkList={['', '']}
    >
      <div className="top-wrapper">
        <Row className="top-row">
          <Col span={localStorage.getItem('logintype') === 'KEFU'? 22: 24}>
            <Tabs type="card" onChange={that.handleTabChange} defaultValue={currentTab}>
              <TabPane tab="全部知识产权" key="">
                {/* <p>知识产权：{showIprList(iprList)}</p> */}
              </TabPane>
              {
                alreadyComplaintList.map(v => (
                  <TabPane tab={v.report_name} key={v.report_id}>
                    <p>知识产权：{showIprList(v.complaintModelList)}</p>
                  </TabPane>
                ))
              }
            </Tabs>
          </Col>
          {
            localStorage.getItem('logintype') === 'KEFU' ?
            <Col 
              onClick={that.goTo.bind(that, setComplaintReportPath)} 
              span={2}><Icon type="setting" theme="outlined" />&nbsp;&nbsp;&nbsp;设置报表</Col>:
            null
          }
        </Row>
        <div className="condition">
          <span>
            数据时间：
              <NewRangPicker 
                showAllFooterButton
                onChange={that.dateChange}
                disabledDate={that.handleDisabledDate}
                getCalendarContainer={trigger => trigger.parentNode}
                value={[start_time, end_time]} />
            {/* <RangePicker 
              onChange={that.dateChange}
              defaultValue={[start_time, end_time]}
              disabledDate={that.handleDisabledDate}
              getCalendarContainer={trigger => trigger.parentNode} /> */}
          </span>
          <a href={download_url}>
            <Button type="primary">下载报表</Button>
          </a>
        </div>
      </div>
      <div className="middle-wrapper">
        <div  id='echarts' className="complaint-link-overview"></div>
        <div className="shop-complaint-rank-wrapper">
          <ShopComplaintRank pageChange={that.rankPageChange} pagination={pagination} data={shopComplaintRank} platform={platform} />
        </div>
      </div>
      <div className="bottom-wrapper">
        <ComplaintInfoDetailTable pageChange={that.tablePageChange} pagination={tablePage} data={complaintListDetail} platform={platform} />
      </div>
    </ContentBox>
  )
})

export default Tpl