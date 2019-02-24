import './JDAppealDetails.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Timeline, Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const baba = ["产权类型", "投诉链接", "产权名称", "产权编号", "商标注册证", "投诉时间", "当前状态", "投诉说明", "联系方式", "处理结果","申诉材料","其他"]
const Tpl = ThatMain((that) => {


    return (
        <div className='OneSIXAppealDetails'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/index.html#/JDInquiries" target="_blank">京东投诉查询</a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        单号详情

                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='content'>
                <div className='contentTop'>
                    <div className="contentTopDiv"><h4>{that.state.getJDDetail.odd_number} {that.state.getJDDetail.odd_number_text}</h4></div>
                </div>
                <div className='contentCon'>
                    <div className="contentTopDiv"><h4>被投诉方信息</h4></div>
                    <div className="contentTopDiv" style={{ marginTop: "10px" }}>
                        <Table
                            pagination={false}
                            rowKey="id"
                            scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                            columns={that.state.ProductInformation_list}
                            dataSource={that.state.data}
                            loading={that.state.loading}
                        />

                    </div>
                </div>
                <div className='contentCon'>
                    <div className="contentTopDiv"><h4>服务单信息</h4></div>
                    <div className="contentTopDiv" style={{ marginTop: "10px" }}>
                        {/* {baba} */}
                        {
                            that.state.getJDDetail.servise_infos ? <ul>
                                {
                                    Object.entries(that.state.getJDDetail.servise_infos).map((v, i) => {
                                        return <li style={{ marginTop: "10px" }} key={i}>
                                            {
                                                baba.includes(v[0]) ? <span><span style={{float:"left"}}>{v[0]}</span>：{Array.isArray(v[1]) === true ? <span style={{width: "500px",display: "inline-block"}}>{
                                                    v[1].map((vv, ii) => {
                                                        return <span key={ii} >
                                                        <a href={vv.href ? vv.href : vv}>{vv.fileName ? vv.fileName : vv} </a>
                                                        <br/>
                                                        </span>
                                                    })
                                                }
                                                </span> : v[1]} </span> : null
                                            }


                                        </li>
                                    })
                                }
                            </ul> : null
                        }
                    </div>
                </div>

            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl