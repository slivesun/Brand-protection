import './TaoBaoAppealDetails.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Timeline, Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    return (
        <div className='TaoBaoAppealDetails'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/index.html#/TaobaoInquiries" target="_blank">淘宝投诉查询</a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        投诉详情

                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='content'>
                <div className='contentTop'>
                    <div className="contentTopDiv"><h4>投诉基础信息</h4></div>
                    <div className="contentTopDiv">
                        <div>投诉任务编号: {that.state.detail_taobao.id}</div><div>投诉单号:{that.state.detail_taobao.batchId}</div><div>投诉时间:  { moment(that.state.detail_taobao.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                    <div className="contentTopDiv">
                        <div>知识产权名称: {that.state.detail_taobao.iprName}</div><div>平台:{that.state.detail_taobao.entityPlatform}</div><div>投诉链接类型:  {that.state.detail_taobao.entityType}</div>
                    </div>
                    <div className="contentTopDiv">
                        <div>被投诉商家: {that.state.detail_taobao.entityOwnerName}</div><div>投诉链接：<a href={that.state.detail_taobao.entityContent}>{that.state.detail_taobao.entityContent}</a></div><div></div>
                    </div>
                    <div className="contentTopDiv">
                        <div><span style={{ float: "left" }}>投诉理由：</span>{
                            that.state.detail_taobao.complaintReasonExtendEntities ? <span style={{ marginLeft: "10px", width: "50%", display: "inline-block",overflow:"hidden" }}>{that.state.detail_taobao.complaintReasonExtendEntities[0].value}</span> : null
                        }
                        </div>
                    </div>
                    <div className="contentTopDiv">
                        <div>举证证明：{that.state.detail_taobao.proofFile ?
                            <span style={{ marginLeft: "10px", width: "50%", display: "inline-block" }}>
                                {
                                    that.state.detail_taobao.proofFile.data.map((v, i) => {
                                        return <a key={i} href={v.fileUrl}>{v.fileName}</a>
                                    })
                                }
                            </span> : null}</div>
                    </div>
                </div>
                <div className='contentCon'>
                    <div className="contentTopDiv"><h4>处理记录</h4></div>
                    {
                        that.state.detail_taobao.log ? <Timeline style={{ marginTop: "20px",marginLeft:"20px" }}>
                            {
                                that.state.detail_taobao.log.map((v,i)=>{
                                    return <Timeline.Item key={i}>
                                        
                                        { moment(v.gmtCreate).format('YYYY-MM-DD HH:mm:ss')} {v.type} {
                                            v.type=="卖家提交申诉"?<a href={`/index.html?#/TaoBaocomplaints/${that.state.batchid}/${that.state.ID}/${that.state.accountId}/${that.state.ID}`}  target="_blank">查看申诉链接</a>:null
                                        }
                                        
                                    </Timeline.Item>
                                })
                            }

                        </Timeline> : null
                    }

                </div>

            </div>
            <Copyright clazzName='copyright' />
        </div >
    )
})

export default Tpl