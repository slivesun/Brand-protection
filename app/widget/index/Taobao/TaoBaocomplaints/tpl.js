import './TaoBaocomplaints.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Timeline, Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
import {ImgModal} from '../../../components/ImgModal/ImgModal';
const Tpl = ThatMain((that) => {
    return (
        <div className='TaoBaocomplaints'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/index.html#/TaobaoInquiries"  target="_blank">淘宝投诉查询</a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>

                        <a href={`/index.html?#/TaoBaoAppealDetails/${that.state.batch_id}/${that.state.ID}/${that.state.accountId}`}  target="_blank">投诉详情</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        申诉详情
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* <img style={{width:"96px",height:"96px",marginRight:"10px"}} onLoad={that.handleImageLoaded.bind(this)} onError={that.handleImageErrored.bind(this)} key={ii} src={vv.fileUrl} alt={vv.fileName}/> */}
              
                {
                    that.state.HistoryFile_taobao ? <div className='content' >
                        {
                            that.state.HistoryFile_taobao.map((v,i) => {
                                return <div className='contentTop' style={{marginBottom:"20px"}} key={i}><div className="contentTopDiv"><h4>申诉详情</h4></div>
                                    <div className="contentTopDiv">
                                        <ul>
                                            <li style={{ textIndent: "2em" }}> <span>提交时间：</span> <span>{moment(v.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span></li>
                                            <li style={{ textIndent: "2em" }}> <span>申诉说明：</span>{v.description}</li>
                                            <li> <span>申诉材料类型：</span>{v.ownerNick}</li>
                                            <li style={{ textIndent: "2em" }}> <span>申诉材料：</span>{v.description}</li>
                                            <li style={{ textIndent: "2em" }}> <span></span> {
                                                v.historyFile ? <span>
                                                        {
                                                            v.historyFile.map((vv,ii)=>{
                                                                return  <img 
                                                                            style={{width:"96px",height:"96px",marginRight:"10px",cursor:'pointer'}} 
                                                                            onLoad={that.handleImageLoaded.bind(this)} 
                                                                            onError={that.handleImageErrored.bind(this)} 
                                                                            key={ii} 
                                                                            onClick={()=>ImgModal({bl:true,urls:[vv.fileUrl],index:0,close:true})} 
                                                                            src={that.state.null=="加载成功" ? vv.fileUrl : "../../../../img/5-121204193R0-50.gif"} 
                                                                            alt={that.state.null=="加载成功" ? vv.fileName : "正在加载图片中，请稍后刷新！"}
                                                                        />
                                                            })
                                                        }   
                                                    </span> :null
                                            }</li>
                                        </ul>
                                    </div></div>
                            })
                        }
                    </div> : <div className='contentTop'>
                            <div className="contentTopDiv"><h4>申诉详情</h4></div>
                            <div className="contentTopDiv">
                                <ul>
                                    <li style={{ textIndent: "2em" }}> <span>提交时间：</span> <span></span></li>
                                    <li style={{ textIndent: "2em" }}> <span></span> 申诉说明：</li>
                                    <li> <span></span> 申诉材料类型：</li>
                                    <li style={{ textIndent: "2em" }}> <span></span> 申诉材料：</li>
                                    <li style={{ textIndent: "2em" }}> <span></span> 提交时间：</li>
                                </ul>
                            </div>
                        </div>
                }
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl