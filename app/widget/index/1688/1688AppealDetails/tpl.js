import './OneSIXAppealDetails.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Timeline, Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    return (
        <div className='OneSIXAppealDetails'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/index.html#/OneSIXInquiries"  target="_blank">1688投诉查询</a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        案件详情

                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='content'>
                <div className='contentTop'>
                    <div className="contentTopDiv"><h4>基础信息</h4></div>
                    <div className="contentTopDiv">
                        <div>投诉受理日期: {that.state.basicInfo.投诉受理日期}</div><div>投诉单号:  {that.state.basicInfo.投诉单号}</div><div>知识产权编号:  {that.state.basicInfo.知识产权编号}</div>
                    </div>
                    <div className="contentTopDiv">
                        <div>知识产权类型: {that.state.basicInfo.知识产权类型}</div><div>信息来源: {that.state.basicInfo.信息来源}</div><div>投诉链接: <a style={{width:"200px",overflow:"hidden",display:"inline-block"}} href={that.state.basicInfo.链接地址}>{that.state.basicInfo.链接地址}</a></div>
                    </div>
                    <div className="contentTopDiv">
                        <div>投诉理由: {that.state.basicInfo.投诉理由}</div><div>投诉说明：{that.state.basicInfo.投诉说明}</div><div></div>
                    </div>
                    <div className="contentTopDiv">
                        <div>附近：
                            {
                                that.state.basicInfo.附近 ? <span>
                                    {
                                        that.state.basicInfo.附近.map((v, i) => {
                                            return <img key={i} src={v} alt={v} style={{ width: "96px", height: "96px" }} />
                                        })
                                    }
                                </span> : null
                            }</div>
                    </div>
                    <div className="contentTopDiv">
                        <div>最新进展：{that.state.basicInfo.最新进展 ? that.state.basicInfo.最新进展.ajzt : null} : {that.state.basicInfo.最新进展 ? that.state.basicInfo.最新进展.xylx : null}</div>
                    </div>
                </div>
                <div className='contentTop'>
                    <div className="contentTopDiv"><h4>被投诉方信息</h4></div>
                    <div className="contentTopDiv">
                        <div>公司/商铺: {that.state.defendantInfo.companyname}</div><div>商铺号： {that.state.defendantInfo.商铺号}</div><div></div>
                    </div>
                </div>
                <div className='contentCon'>
                    <div className="contentTopDiv"><h4>历史记录</h4></div>
                    {
                        that.state.history_lis ?
                            <Timeline style={{ marginTop: "10px" }}>
                                {
                                    that.state.history_lis.map((v, i) => {
                                        return <Timeline.Item key={i}>
                                            <h4>{v.时间} 操作人：{v.操作人} 操作类型：{v.操作类型}</h4>
                                            <p>备注:{v.备注}</p>
                                        </Timeline.Item>
                                    })
                                }



                            </Timeline> : null
                    }

                </div>

            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl