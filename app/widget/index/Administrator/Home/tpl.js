
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Icon, Tooltip } from 'antd';
const Tpl = ThatMain((that) => {
    let {
        customereProportion,
        dealerProportion,
        workOrderSum,
        customereSum,
        dataSum,
        dealerSum,
        itemListSum,
        brandSum,
        linkDataSum,
        shopSum,
        productSum,
    } = that.state.dataList;


    return (
        <div className='admin-home'>

            <div className='content'>
                <Card title="用户信息概况" bordered={false} style={{ width: '100%', marginTop: '18px' }}>
                    <div className='header-items'>
                        <div className='item'>
                            <img src='../../../img/home/service.png' />
                            <div>
                                <p>{customereSum}</p>
                                <p>服务品牌方总数量</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/Brand.png' />
                            <div>
                                <p>{brandSum}</p>
                                <p>品牌总数量</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/Trader.png' />
                            <div>
                                <p>{dealerSum}</p>
                                <p>经销商总数量</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/Shop.png' />
                            <div>
                                <p>{shopSum}</p>
                                <p>经覆盖店铺总数量</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card title="业务数据概况" bordered={false} style={{ width: '100%', marginTop: '20px' }}>
                    <div className='header-items'>
                        <div className='item'>
                            <img src='../../../img/home/Commodity_library.png' />
                            <div>
                                <p>{itemListSum}</p>
                                <p>商品库商品总数量</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/product.png' />
                            <div>
                                <p>{productSum}</p>
                                <p>客户产品总数量</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/monitor.png' />
                            <div>
                                <p>{dataSum}</p>
                                <p>监控中产品种类数</p>
                            </div>
                        </div>
                        <div className='item'>
                            <img src='../../../img/home/Single_link_query.png' />
                            <div>
                                <p>{linkDataSum}</p>
                                <p>监控单链接个数</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className='footer-items'>
                    <div className='item'>
                        <Card bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title="品牌方所属行业占比" bordered={false} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div className='echarts-box'>
                                <div id='echarts'>

                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='item col'>
                        <Card  extra={<a href="#">发布公告 ></a>} bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title="系统公告发布" bordered={false} style={{ width: '100%', display: 'flex', flexDirection: 'column',marginBottom:'10px' }}>
                            <div className='text-box'>
                                <span style={{fontSize:'14px',fontWeight:'blod',padding:'10px 0px'}}>工单</span>
                                <a href='/index.html#/Feedback'>
                                    <span style={{color:'#333'}}>待处理工单数:</span>
                                    <span style={{padding:'0px 5px',color:'red'}}>{workOrderSum}</span>
                                    <span style={{color:'#1990ff'}}>></span>
                                </a>
                            </div>
                        </Card>
                        <Card bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title="经销商地区分布" bordered={false} style={{ width: '100%', display: 'flex', flexDirection: 'column',flexGrow:'1' }}>
                            <div className='echarts-box'>
                                <div id='echarts2'>

                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl