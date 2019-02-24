import './MessageDetails.less'
import ThatMain from '../../../HOC/That';
import Footer from "../../../components/Copyright"

import { Table, Button, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;


const Tpl = ThatMain((that) => {



    return (
        <div className='MessageDetails'>
            <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                            个人中心
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a style={{ margin: '0' }} href="/index.html#/MessageCenter">
                            消息中心
                                </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>消息详情</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            {
                that.state.type == 1 ? <div className="ChangeHistoryBOX">
                    <div className="ChangeHead">
                        <span>{that.state.SJGSXXBG.topic}</span>
                        <span>{that.state.SJGSXXBG.time}</span>
                    </div>
                    {
                        that.state.messagetypes == "SJGSXXBG" ?
                            <div className="ChangeHeads">
                                <span>变更人：{that.state.SJGSXXBG.content.change_people}</span>
                                <span style={{marginLeft: "10px"}}>变更时间：{that.state.SJGSXXBG.content.change_time}</span>
                                {
                                    that.state.types == "HCM" ?
                                        <span><Button onClick={that.SJGSXXBG_XQ} className="Detailds">查看详情</Button></span>
                                        : "1"
                                }
                            </div> : that.state.messagetypes == "JGGSXXBG" ?
                                <div className="ChangeHeads">
                                    <span>变更人：{that.state.SJGSXXBG.content.change_people}</span>
                                    <span style={{marginLeft: "10px"}}>变更时间：{that.state.SJGSXXBG.content.change_time}</span>
                                    {
                                        that.state.types == "DEALER" ?
                                            <span><Button onClick={that.JGGSXXBG_XQ} className="Detailds">查看详情</Button></span>
                                            : "1"
                                    }
                                </div> : that.state.messagetypes == "SJJKDSZ" ?
                                    <div className="ChangeHeads">
                                        <span>变更人：{that.state.SJGSXXBG.content.change_people}</span>
                                        <span style={{marginLeft: "10px"}}>变更时间：{that.state.SJGSXXBG.content.change_time}</span>
                                        {
                                            that.state.types == "KEFU" ?
                                                <span><Button onClick={that.SJJKDSZ_XQ} className="Detailds">查看详情</Button></span>
                                                : "1"
                                        }
                                    </div> : ""
                    }
                    {
                        that.state.messagetypes == "SJGSXXBG" ? <div className="ChangeBody" style={{ padding: "0" }}>
                            {that.state.SJGSXXBG.content.obj ? <ul>
                                {
                                    that.state.SJGSXXBG.content.obj.map((v, i) => {
                                        return <li key={i}>
                                            <h5>所属分类：{v.classify}</h5>
                                            <h5>变更产品:</h5>
                                            {
                                                v.content.map((val, ind) => {
                                                    return <p key={ind}>{val.info}</p>
                                                })
                                            }

                                        </li>
                                    })
                                }

                            </ul> : ""}
                        </div> : that.state.messagetypes == "JGGSXXBG" ? <div className="ChangeBody" style={{ padding: "0" }}>
                            {that.state.SJGSXXBG.content.obj ? <ul>
                                {
                                    that.state.SJGSXXBG.content.obj.map((v, i) => {
                                        return <li key={i}>
                                            <h5>所属分类：{v.classify}</h5>
                                            <h5>变更产品:</h5>
                                            {
                                                v.content.map((val, ind) => {
                                                    return <p key={ind}>{val.info}</p>
                                                })
                                            }

                                        </li>
                                    })
                                }

                            </ul> : ""}
                        </div> : that.state.messagetypes == "SJJKDSZ" ? <div className="ChangeBody" style={{ padding: "0" }}>
                            {that.state.SJGSXXBG.content.obj ? <ul>
                                {
                                    that.state.SJGSXXBG.content.obj.map((v, i) => {
                                        return <li key={i}>
                                            <h5>所属分类：{v.classify}</h5>
                                            <h5>变更产品:</h5>
                                            {
                                                v.content.map((val, ind) => {
                                                    return <p key={ind}>{val.info}</p>
                                                })
                                            }

                                        </li>
                                    })
                                }

                            </ul> : ""}
                        </div> : ""
                    }

                </div> : that.state.type == 2 ? <div className="ChangeHistoryBOX">
                    <div className="ChangeHead">
                        <span>{that.state.KHXXDSH.topic}</span>
                        <span>{that.state.KHXXDSH.time}</span>
                    </div>
                    {
                        that.state.messagetypes == "KHXXDSH" ? <div className="ChangeHeads">
                            <span>{that.state.KHXXDSH.TS}</span>
                            <span style={{marginLeft: "10px"}}></span>
                            {
                                that.state.types == "HCM" ? <span>
                                    {
                                        that.state.KHXXDSH.BUTTONtit == "立即审批" ? <Button className="Detailds" onClick={that.KHXXDSH_SH}>立即审批</Button>
                                            : <Button onClick={that.KHXXDSH_XQ} className="Detailds">查看详情</Button>
                                    }
                                </span> : ""
                            }
                        </div> : ""
                    }


                    <div className="ChangeBody" style={{ padding: "0" }}>
                        <ul>
                            <li>
                                <p>{that.state.KHXXDSH.content.dealername}</p>
                                <p>{that.state.KHXXDSH.content.dutynumber}</p>
                                <p>{that.state.KHXXDSH.content.address}</p>
                                <p>{that.state.KHXXDSH.content.take_people}</p>
                                <p>{that.state.KHXXDSH.content.contact}</p>
                                <p>{that.state.KHXXDSH.content.apply_date}</p>
                            </li>
                        </ul>
                    </div>

                </div> : that.state.type == 3 ? <div className="ChangeHistoryBOX">
                    <div className="ChangeHead">
                        <span>{that.state.KHXXBG.topic}</span>
                        <span>{that.state.KHXXBG.time}</span>
                    </div>
                    {
                        that.state.messagetypes == "KHXXBG" ?
                            <div className="ChangeHeads">
                                <span>{that.state.KHXXBG.content.change_user}</span>
                                <span>{that.state.KHXXBG.content.change_time}</span>
                                {
                                    that.state.types == "HCM" ?
                                        <span>
                                            {
                                                that.state.KHXXBG.BUTTONtit == "查看详情" ?
                                                    <Button onClick={that.KHXXBG_XQ} className="Detailds">查看详情</Button> : ""
                                            }
                                        </span> : ""
                                }
                            </div> : ""
                    }
                    <div className="ChangeBody" style={{ padding: "0" }}>
                        <ul>
                            <li>
                                <h5>变更客户</h5>
                                <p>{that.state.KHXXBG.content.dealername}</p>

                            </li>
                        </ul>
                    </div>

                </div> : that.state.type == 4 ? <div className="ChangeHistoryBOX">
                    <div className="ChangeHead">
                        <span>{that.state.HDDSH.topic}</span>
                        <span>{that.state.HDDSH.time}</span>
                    </div>
                    {
                        that.state.messagetypes == "HDDSH" ?
                            <div className="ChangeHeads">
                                <span>{that.state.HDDSH.TS}</span>
                                <span style={{marginLeft: "10px"}}></span>

                                {
                                    that.state.types == "HCM" ?
                                        <span>
                                            <Button onClick={that.HDDSH_SH} className="Detailds">{that.state.HDDSH.BUTTONtit}</Button>
                                        </span> : ""
                                }
                            </div> : that.state.messagetypes == "HDSQYSH" ?
                                <div className="ChangeHeads">
                                    <span>{that.state.HDDSH.TS}</span>
                                    <span style={{marginLeft: "10px"}}></span>

                                    {
                                        that.state.types == "DEALER" ?
                                            <span>
                                                <Button campaign_id={that.state.HDDSH.content.campaign_id} onClick={that.HDSQYSH_XQ} className="Detailds">{that.state.HDDSH.BUTTONtit}</Button>
                                            </span> : ""
                                    }
                                </div> : that.state.messagetypes == "HDJCBHG" ? <div className="ChangeHeads">
                                    <span>{that.state.HDDSH.TS}</span>
                                    <span style={{marginLeft: "10px"}}></span>

                                    {
                                        that.state.types == "DEALER" ?
                                            <span>
                                                <Button campaign_id={that.state.HDDSH.content.campaign_id} onClick={that.HDJCBHG_XQ} className="Detailds">{that.state.HDDSH.BUTTONtit}</Button>
                                            </span> : ""
                                    }
                                </div> : that.state.messagetypes == "SPKPCDSZ" ? <div className="ChangeHeads">
                                    <span>{that.state.HDDSH.TS}</span>
                                    <span style={{marginLeft: "10px"}}></span>

                                    {
                                        that.state.types == "KEFU" ?
                                            <span>
                                                <Button onClick={that.SPKPCDSZ_SH} className="Detailds">{that.state.HDDSH.BUTTONtit}</Button>
                                            </span> : ""
                                    }
                                </div> : ""

                    }
                    <div className="ChangeBody" style={{ padding: "0" }}>
                        <ul>
                            <li>
                                <h5>{that.state.HHtwo}</h5>
                                <p>{that.state.HDDSH.content.campaign_name}</p>
                                <p>{that.state.HDDSH.content.shop_name}</p>
                                <p>{that.state.HDDSH.content.ping_name}</p>
                                <p>{that.state.HDDSH.content.dealer_name}</p>
                                <p>{that.state.HDDSH.content.now_date}</p>
                                <p>{that.state.HDDSH.content.createtime}</p>
                            </li>
                        </ul>
                    </div>

                </div> : <div className="ChangeHistoryBOX">
                                    <div className="ChangeHead">
                                        <span>{that.state.TZGG.topic}</span>
                                        <span>{that.state.TZGG.time}</span>
                                    </div>
                                    {
                                        that.state.messagetypes == "TZGG" ?
                                            <div className="ChangeHeads">

                                                <span>{that.state.TZGG.TS}</span>
                                                <span style={{marginLeft: "10px"}}></span>
                                                {
                                                    that.state.types == "HCM" ?
                                                        <span>
                                                            {
                                                                that.state.TZGG.BUTTONtit == "查看详情" ?
                                                                    <Button notice_id={that.state.TZGG.content.notice_id} onClick={that.TZGG_SH} className="Detailds">{that.state.TZGG.BUTTONtit}</Button>
                                                                    : ""
                                                            }
                                                        </span> : that.state.types == "DEALER" ? <span>
                                                            {
                                                                that.state.TZGG.BUTTONtit == "查看详情" ?
                                                                    <Button notice_id={that.state.TZGG.content.notice_id} onClick={that.TZGG_XQ} className="Detailds">{that.state.TZGG.BUTTONtit}</Button>
                                                                    : ""
                                                            }
                                                        </span> : ""

                                                }
                                            </div> : ""
                                    }
                                    <div className="ChangeBody" style={{ padding: "0" }}>
                                        <ul>
                                            <li><p>{that.state.TZGG.content.notice_title}</p>
                                                <p>{that.state.TZGG.content.user_name}</p>
                                                <p>{that.state.TZGG.content.departnames}</p>
                                                <p>{that.state.TZGG.content.createtime}</p>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
            }

            <Footer className='Copyright'></Footer>

        </div>
    )
})
export default Tpl