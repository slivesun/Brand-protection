
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Tooltip } from 'antd';
import WechatBind from '../../../components/WechatBind'

const Tpl = ThatMain((that) => {
    let { need_dispose_sum,
        campaign_examine_apply,
        campaign_inspect_num,
        dealer_uninvited_num,
        dealer_applying_num,
        dealer_apporved_num,
        dealer_shop_num,
        monitor_itemlist_num,
        monitor_link_num_w_count,
        monitor_link_num_all_count,
        monitor_itemlist_date,
        monitorLink_date_time,
        // bjw-2018/9/20-add
        binding,
        userid,
    } = that.state.dataList;
    return (
        <div className='brand-home'>
            {
                !!userid ?
                <WechatBind userId={userid} binding={binding} /> :
                null
            }
            <div className='content'>
                <div className='header-box'>
                    <Card title="客户信息概览" bordered={false} style={{ width: '49.5%' }}>
                        <div className='items'>
                            <div className='item'>
                                <img src='../../../img/home/Trader.png' />
                                <div>
                                    <p>{dealer_apporved_num}</p>
                                    <p>客户数量</p>
                                </div>
                            </div>
                            <div className='item'>
                                <img src='../../../img/home/Shop.png' />
                                <div>
                                    <p>{dealer_shop_num}</p>
                                    <p>客户店铺数量</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card title="数据中心概览" bordered={false} style={{ width: '49.5%' }}>
                        <div className='items'>
                            <a className='item' href='/index.html#/PriceMonitor'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src='../../../img/home/monitor.png' />
                                    <div>
                                        <p>{monitor_itemlist_num}</p>
                                        <p>
                                            售价监控低价商品数  &nbsp;&nbsp;
                                            <Tooltip placement="bottom" title={`数据时间:${monitor_itemlist_date}`}>
                                                <Icon type="info-circle" />
                                            </Tooltip>

                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a className='item' href='/index.html#/UrlMonitor'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src='../../../img/home/Low_price.png' />
                                    <div>
                                        <p>{monitor_link_num_w_count} / <span style={{ fontSize: '22px' }}>{monitor_link_num_all_count}</span></p>
                                        <p>单链接监控低价数量   &nbsp;&nbsp;
                                            <Tooltip placement="bottom" title={`更新时间:${monitorLink_date_time}`}>
                                                <Icon type="info-circle" />
                                            </Tooltip>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </Card>
                </div>
                <div className='list-conter'>
                    <Card bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title={`待办事宜(${need_dispose_sum})`} bordered={false} style={{ width: '35.5%', display: 'flex', flexDirection: 'column' }}>
                        <ul className='list-box'>
                            <li>
                                <p>你有 <a>{campaign_examine_apply}</a> 条<a href='/index.html#/ActivityReview'>【活动申请信息】</a>待审批</p>
                                <span>活动信息/活动审批</span>
                            </li>
                            <li>
                                <p>你有 <a>{campaign_inspect_num}</a>  条<a href='/index.html#/ActivityInspect'>【活动稽查】</a>待介入</p>
                                <span>活动信息/活动稽查</span>
                            </li>
                            <li>
                                <p>你有 <a>{dealer_applying_num}</a> 条<a href='/index.html#/PendingClient'>【客户信息】</a>待审批</p>
                                <span>客户盘点</span>
                            </li>
                            <li>
                                <p>你有 <a>{dealer_uninvited_num}</a> 条<a href='index.html#/ClientCheck'>【客户入驻信息】</a>待邀请激活</p>
                                <span>客户盘点</span>
                            </li>
                        </ul>
                    </Card>
                    <Card bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title="客户店铺平台占比" bordered={false} style={{ width: '63.5%', display: 'flex', flexDirection: 'column' }}>
                        <div className='echarts-box'>
                            <div id='echarts'>

                            </div>
                        </div>
                    </Card>
                    
                </div>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl