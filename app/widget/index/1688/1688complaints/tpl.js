import './OneSIXcomplaints.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Timeline,Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    return (
        <div className='OneSIXcomplaints'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="/index.html#/OneSIXInquiries"  target="_blank">1688投诉查询</a>

                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                反通知详情
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>
 
            <div className='content'>
                <div className='contentTop'>
                    <div className="contentTopDiv"><h4>信息合法性说明</h4></div>
                    <div className="contentTopDiv">
                        <ul>
                            <li > <span>知识产权编号：</span> <span> {that.state.ipr_num}</span></li>
                            <li > <span></span> 知识产权姓名： {that.state.get1688NoticeDetail.具体说明}</li>
                           
                           
                            <li > <span style={{float:"left"}}>具体说明：</span> <span style={{marginLeft: "10px",width: "50%",display: "inline-block"}}>{that.state.get1688NoticeDetail.具体说明}</span> </li>
                            <li > <span></span> 产品合法性说明文件： 
                                {
                                    that.state.get1688NoticeDetail.产品合法性证明文件? <span>
                                            {
                                                that.state.get1688NoticeDetail.产品合法性证明文件.map((v,i)=>{
                                                    return <a key={i} href={v.href} alt={v.fileName}  style={{width:"96px",height:"96px"}}>{v.fileName}</a>
                                                })  
                                            }
                                    </span> : null
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                

            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl