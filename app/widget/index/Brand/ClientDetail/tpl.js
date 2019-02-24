import ThatMain from '../../../HOC/That'
import { Drawer, Tooltip, Tabs, Icon, Button, Table, Pagination, DatePicker, Timeline, Divider } from 'antd'
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
import lib  from '../../../../js/common/lib';
import paltform from '../../../components/platform';

//抽屉头部DOM
const Title = baseInfo => {
    let { dealername, contact, dutynumber, take_people, address, creditscore } = baseInfo
    return (
        <div className='title'>
            <h3>{dealername}</h3>
            <div className='info'>
                <div className='item'>
                    <div>
                        <Tooltip title={take_people}>
                            <img src='../../../../img/icon/user.png' />{take_people}
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title={contact}>
                            <img src='../../../../img/icon/phone.png' />{contact}
                        </Tooltip>
                    </div>
                </div>
                <div className='item'>

                    <div>
                        <Tooltip title={dutynumber}>
                            <img src='../../../../img/icon/duty.png' />{dutynumber}
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip title={address}>
                            <img src='../../../../img/icon/city.png' />{address}
                        </Tooltip>
                    </div>
                </div>
                <div className='item'>
                    <div>信用分：<span className='strong'>{creditscore}</span></div>
                </div>
            </div>
        </div>
    )
}
//经销商档案 
const DealersInfo = (baseInfo,diyList) => {
    let { memo_dealername, zssj, authorize_num, authorize_start, authorize_end, add_field} = baseInfo
    return (
        <div className='baseInfo'>
            <ul className='items'>
                <li>
                    <span>备注名称：</span>{memo_dealername}
                </li>
                <li>
                    <span>直属上级：</span>{zssj}
                </li>
                <li>
                    <span>授权编码：</span>{authorize_num}
                </li>
                <li>
                    <span>授权期限：</span>{moment(authorize_start).format('YYYY-MM-DD')}  ~  {moment(authorize_end).format('YYYY-MM-DD')}
                </li>
                {
                    add_field&&diyList.length ?
                        <React.Fragment>
                            <Divider style={{ fontSize: 14 }} orientation="left" dashed={true}>自定义字段</Divider>
                            {
                                diyList.map((item,index)=>{
                                    return(
                                        <li key={index}>
                                            <span>{item.fieldname}：</span>{JSON.parse(add_field)[item.fieldvalue]}
                                        </li>
                                    )
                                })
                            }
                        </React.Fragment>
                    : null
                }

            </ul>

        </div>
    )
}
//授权店铺
const AuthorizedShops = (authorizedShops,that) => {
    return (
        <div className='authorized-shops'>
            <ul className='items'>
                {
                    
                    authorizedShops.list.map((item, index) => {
                        return (
                            <li key={index} className='item'>
                                <h4 className='shop-name'>
                                    {item.shop_name}<span>{item.wangwang}</span>
                                </h4>
                                <div className='img-box'>
                                    {paltform(item.platform_code)}
                                    <span className='type'>{item.shop_type}</span>
                                </div>
                                <div className='shop-url'>
                                    <span>店铺首页地址：</span>
                                    <a target='_blank' href={item.shop_url}>{item.shop_url}</a>
                                </div>
                            </li>
                        )
                    })
                    
                }
            </ul>
            <div className='get-data-box'>
                    {
                        authorizedShops.show == '1' ?
                        <Button onClick={that.getAuthorizedShops}>加载更多...</Button>
                        :null
                    }
                
            </div>
        </div>
    )
}
//销售数据
const SalesData = (salesData, that) => {
    let { totalNum, pageNo, pageSize, list } = salesData;
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, item, index) => index + 1
        },
        {
            title: '月份',
            dataIndex: 'daydate',
            key: 'daydate',
        }, {
            title: '销售额',
            dataIndex: 'daymoney',
            key: 'daymoney',
            render:(text) => `¥ ${lib.formatThousandMoney(text)}`
        }, {
            title: '环比',
            dataIndex: 'HB',
            key: 'HB',
            render:(text) => {
                return(
                    <div>
                        {
                            text ? 
                            +text>0 ?
                            <Icon style={{color:'#52C41A'}} type="caret-up" />
                            :
                            <Icon style={{color:'#F5222D'}} type="caret-down" />
                            :null
                        }
                        {Math.abs(text)||'--'}
                    </div>
                )
            }
        }
    ]
    return (
        <div className='sales-data'>
            <div className='table-box'>
                <Table rowKey='createtime' pagination={false} columns={columns} dataSource={list} />
            </div>
            <div className='footer'>
                <div className='info'>
                    {`共 ${totalNum} 条记录 `}
                </div>
                <Pagination size="small" pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.onSalesDataPagination} onShowSizeChange={that.onSalesDataPaginationSize} showSizeChanger showQuickJumper />
            </div>
        </div>
    )
}
//活动情况
const Activity = (activity, that) => {
    let { date, list } = activity;
    const dot = <span className='dot'></span>
    return (
        <div className='activity'>
            <div className='activity-title'>
                <span>申请时间：</span>
                <RangePicker disabledDate={(current) => current && current > moment()} value={date} onChange={(e) => that.activityRangePicker(e)} />
            </div>
            <div className='time-line-box'>
                <Timeline>
                    {
                        list.map((item, index) => {
                            return (
                                <Timeline.Item key={index} dot={dot}>
                                    <dl>
                                        <dt>{moment().format('YYYY年MM月DD日 HH:mm:ss')}</dt>
                                        <dd className='shop-name'>
                                            店铺名称：思伯伦迪电子官方旗舰店
                                        </dd>
                                        <dd>
                                            活动主题：双十一活动展示小会
                                        </dd>
                                        <dd>
                                            活动时间：2018-01-30 12:30 ~ 2018-02-01 12:30
                                        </dd>
                                        <dd>
                                            活动产品数：12
                                        </dd>
                                    </dl>
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
                <div className='get-data-box'>
                    <Button>加载更多...</Button>
                </div>
            </div>
        </div>
    )
}
const Tpl = ThatMain(that => {
    let { id, visible, baseInfo, diyList, activeKey, authorizedShops, salesData, activity } = that.state;
    return (
        <Drawer
            className='client-detail'
            title={
                Title(baseInfo)
            }
            placement="right"
            width={715}
            maskClosable={false}
            onClose={that.onClose}
            visible={visible}
        >

            <Tabs activeKey={activeKey} onChange={(activeKey) => that.onTabsChange(activeKey)}>
                <TabPane tab={'经销商档案'} key="1">
                    {DealersInfo(baseInfo,diyList)}
                </TabPane>
                <TabPane tab={'授权店铺'} key="2">
                    {AuthorizedShops(authorizedShops,that)}
                </TabPane>
                <TabPane tab={'销售数据'} key="3">
                    {SalesData(salesData, that)}
                </TabPane>
                <TabPane tab={'活动情况'} key="4">
                    {Activity(activity, that)}
                </TabPane>
                <TabPane disabled tab={'订单异常情况'} key="5">Content of Tab Pane 3</TabPane>
            </Tabs>
        </Drawer>

    )
})

export default Tpl