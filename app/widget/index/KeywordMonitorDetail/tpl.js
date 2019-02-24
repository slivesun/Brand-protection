import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'
import Copyright from "../../components/Copyright";
import "./keywordMonitorDetail.less"
import { Button, Breadcrumb, Select, DatePicker, Table, TimePicker, Pagination } from 'antd'

const Tpl = ThatMain(that => {
  const format = 'HH:mm';


  const monthFormat = 'YYYY-MM-DD';
  const OPtionchildren = that.state.value != "" ? that.state.value.map((d, i) => <Option key={d}>{d}</Option>) : ""

  return (
    <div className="keywordMonitorDetail">

      <div className="Breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>

            <a href="/index.html#/keywordMonitor">关键词监控</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            监控详情
                            </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='content'>
        <div className='contentTop'>
          <div className="div"><span style={{fontSize:"16px"}}>监控信息</span><span><Button style={{ float: "right" }} type="primary" onClick={that.dataFx}>数据分析</Button></span></div>
          <div className="div"><span><p style={{display: "inline-block",marginTop: "5px",marginRight:"24px"}}>关键词：</p>{that.state.key_name}</span><span><p  style={{display: "inline-block",marginTop: "5px",marginRight:"24px"}}>限价：</p><p style={{display: "inline-block"}}>{that.state.key_price}</p></span>
            <span><b style={{ float: "left",marginRight:"24px",marginTop:"5px" }}>平台：</b>
              {
                that.state.platform == "淘宝天猫" ? <b><img src="../../../img/icon/Taobao.png" style={{ width: "20px", height: "20px" }} alt="" /><img src="../../../img/icon/tall.png" style={{ width: "20px", height: "20px", marginLeft: "5px" }} alt="" /></b> :
                  that.state.platform == "1688网" ? <img src="../../../img/icon/1688.png" style={{ width: "20px", height: "20px" }} alt="" /> :
                    that.state.platform == "唯品会" ? <img src="../../../img/icon/vipn.png" style={{ width: "20px", height: "20px" }} alt="" /> :
                    that.state.platform == "拼多多" ? <img src="../../../img/icon/pinduoduo.png" style={{ width: "20px", height: "20px" }} alt="" /> :
                    <span style={{marginTop: "5px",display: "inline-block"}}>{that.state.platform}</span>
              }  
            </span></div>
          <div className="div"><span>监控范围：<p  style={{display: "inline-block",marginTop: "5px",marginLeft:"24px"}}> {that.state.key_range}</p></span><span>频次：<p  style={{display: "inline-block",marginTop: "5px",marginLeft:"24px"}}>{that.state.frequency}</p></span><span>监控时间：<p  style={{display: "inline-block",marginTop: "5px",marginLeft:"24px"}}>{that.state.key_times}</p></span></div>
        </div>
        <div className='contentTop'>
          <div className="div">
            <span>日期： <DatePicker defaultValue={moment()} format={monthFormat} onChange={that.onmomentTime} /></span>
            <span style={{ position: "relative" }}>
              监控时间：<Select placeholder={that.state.values} firstActiveValue={that.state.values} getPopupContainer={trigger => trigger.parentNode} style={{ width: 100 }} onChange={that.onChangeTime}>
                {OPtionchildren}
              </Select>

              {/* <TimePicker defaultValue={moment()} format={format} value={that.state.value} onChange={that.onChangeTime} />
               */}

            </span>
            <span style={{textAlign:"right"}}>
              <a style={{marginRight:"10px"}} href={`/hcm/keyword_monitor/downLoad?platform=${that.state.platform}&keyword_id=${that.state.keyword_id}&createtime=${that.state.createtime}&key_times=${that.state.keytime}`}>
                <Button>下载数据</Button>
              </a>

            </span>
          </div>
          {
            that.state.platform == "淘宝天猫" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.taobao_list.length - 1) * 200 }}
              columns={that.state.taobao_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : that.state.platform == "京东商城" || that.state.platform == "苏宁易购" || that.state.platform == "当当网" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.JD_list.length - 1) * 200 }}
              columns={that.state.JD_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : that.state.platform == "拼多多" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.PDD_list.length - 1) * 200 }}
              columns={that.state.PDD_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : that.state.platform == "1688网" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.BB_list.length - 1) * 200 }}
              columns={that.state.BB_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : that.state.platform == "闲鱼" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.XY_list.length - 1) * 200 }}
              columns={that.state.XY_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : that.state.platform == "唯品会" ? <Table
              pagination={false}
              rowKey="id"
              scroll={{ x: (that.state.wph_list.length - 1) * 200 }}
              columns={that.state.wph_list}
              dataSource={that.state.data}
              loading={that.state.loading}
            /> : <Table
                  pagination={false}
                  rowKey="id"
                  scroll={{ x: (that.state.taobao_list.length - 1) * 200 }}
                  columns={that.state.taobao_list}
                  dataSource={that.state.data}
                />
          }

          <div className="ProductInformationFooter">
            <div className='footer'>
              <div className='info'>
                {`共 ${that.state.totalNum} 条记录 `}
                &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

              </div>
              <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

            </div>
          </div>
        </div>
      </div>


      <Copyright clazzName='copyright' />
    </div>
  )
})

export default Tpl