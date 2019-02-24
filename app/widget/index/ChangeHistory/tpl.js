import './ChangeHistory.less'
import ThatMain from '../../HOC/That';
import Footer from "../../components/Copyright"

import { Input, Button, Timeline, DatePicker, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;
const json = {
    ClientCheck: {
        name: '客户信息',
        type: 'ClientCheck',
        path: '/index.html#/ChangeHistory'
    },
    PricePublicity: {
        name: '泸州老窖',
        type: 'PricePublicity',
        path: '/index.html#/ProductInformation'
    }
}
const arr = []
for (let key in json) {
    if (window.location.hash.substring(2).indexOf(key) > -1) {
        console.log(json[key])
        arr.push(json[key])

    }
}
//console.log(arr)

const Tpl = ThatMain((that) => {
   // console.log(that.props.match.params)
    return (
        <div className='ChangeHistory'>
            <div className='Breadcrumb'>

                <Breadcrumb >
                    {
                        that.state.typeos == "DEALER" || that.state.typeos == "DEALER_DELETE" ? <Breadcrumb.Item>
                            客户盘点
                            </Breadcrumb.Item> : that.state.typeos == "Product" ? <Breadcrumb.Item>
                                售价公式
                            </Breadcrumb.Item> : that.state.typeos=="HcmProductClassify"? null
                                               : null 
                    }


                    {
                        that.state.TWOtit ? <Breadcrumb.Item>
                            <a style={{ margin: '0' }} onClick={that.HistoryGo}>
                                {that.state.TWOtit}
                            </a>

                        </Breadcrumb.Item> : that.state.typeos == "HcmProductClassify" || that.state.typeos == "HcmCustomModel" ? <Breadcrumb.Item>
                            <a style={{ margin: '0' }} href="/index.html#/PriceNotice">
                                售价公示
                            </a>

                        </Breadcrumb.Item> : that.state.typeos == "DEALER" || that.state.typeos == "DEALER_DELETE" ? <Breadcrumb.Item>
                            <a style={{ margin: '0' }} href="/index.html#/ClientCheck">
                                客户信息
                                         </a>

                        </Breadcrumb.Item> : that.state.typeos == "MonitorLink_Delete" ? <Breadcrumb.Item>
                            <a style={{ margin: '0' }} href="/index.html#/UrlMonitor">
                                单链接监控
                                         </a>

                        </Breadcrumb.Item> : null
                    }
                    <Breadcrumb.Item>变更历史</Breadcrumb.Item>
                </Breadcrumb>


            </div>


            <div className="ChangeHistoryBOX">

                <div className="ChangeHeader">
                    <span>变更时间</span>
                    <RangePicker
                        defaultValue={[moment(Date.now() - 2160 * 60 * 60 * 1000),
                        moment(Date.now())]}
                        onChange={that.onChange} />
                </div>
                <div className="ChangeBody">

                    <Timeline>

                        {
                            that.state.ChangeHistory_list.length > 0 ?
                                that.state.ChangeHistory_list.map((val, index) => {
                                    return <Timeline.Item key={index}>
                                        <h3>{moment(val.changetime).format('YYYY-MM-DD HH:mm:ss')}</h3>
                                        <h5>变更人：{val.realname}</h5>
                                        <span className="ChangeTit">
                                            {val.contentAfter} <br />
                                            {val.contentBefore}
                                        </span>
                                    </Timeline.Item>
                                })
                                : <Timeline.Item     >
                                    暂无数据
                                    </Timeline.Item>

                        }

                    </Timeline>
                </div>
                {
                    that.state.ChangeHistory_list.length > 0 ? <div className="ChangeFooter">

                        {
                            that.state.onLoading == that.state.ChangeHistory_list.length  
                                ? <Button onClick={that.onLoading} className='loading-button'>加载更多...</Button>
                                : null
                        }
                    </div> : null
                }


            </div>

            <Footer className='Copyright'></Footer>

        </div>
    )
})
export default Tpl