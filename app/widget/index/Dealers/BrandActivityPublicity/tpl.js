import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import CopyRight from '../../../components/Copyright'
import { Breadcrumb, Button, Icon, Card, Row, Col, Divider } from 'antd'

const Item = Breadcrumb.Item;

const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const ACTIVITY_DATE_TYPE = {
    currentDay: 1,
    nextDay: 2
}

const Tpl = ThatMain(that => {
    const { 
        selectedIndex, 
        moreButton, 
        togglePriceIndex, 
        activityList, 
        // currentDate, 
        // sevenActivity,
        // sevenProductInfo,
        currentShopBtn,
        // productInfoList,

        shopBtnList,
        activityInfoList,
        pagination
    } = that.state
    const { count = 0, pageNum = 1, pageSize = 10 } = pagination
    // const activeShops = sevenActivity[currentDate]
    // const activeProducts = sevenProductInfo[currentDate]
    // const all_count = activeShops && activeShops.reduce((a, b) => a + b.act_count, 0)
    const activityTotal = !!shopBtnList.length ? shopBtnList.reduce((a, b) => a + b.act_count, 0) : 0
    const cardItem = config => (
        <div className="card-title">
            <p className="overflow-hidden-only">
                <span>产品信息：</span>
                <span>{config.productName}</span>
            </p>
            <p className="overflow-hidden-only pro-link">
                <span>商品链接：</span>
                <span><a href={config.productUrl} target="_blank">{config.productUrl}</a></span>
            </p>
            <p onClick={() => that.togglePrice(config.index)}>
                {togglePriceIndex === config.index ? '隐藏' : '展开'}参考价格<Icon type={togglePriceIndex === config.index ? 'up' : 'down'} />
            </p>
        </div>
    );
    return (
        <ContentBox
            breadcrumbList={['活动信息', '品牌活动公示']}
            linkList={['', '']}
        >
        <div className="brand-activity-publicity">
            {/* <section className="top-header">
                <Breadcrumb>
                    <Item>活动信息</Item>
                    <Item>品牌活动公示</Item>
                </Breadcrumb>
            </section> */}
            <section className="content">
                <div className="activity-date">
                    <section className="date-card">
                        {
                            activityList.map((val, idx) => {
                                const dateObj = new Date(val.my_date)
                                const week = WEEKS[dateObj.getDay()]
                                const day = dateObj.getDate() + ''
                                const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, '0')}-${day.padStart(2, '0')}`
                                return (
                                    <div 
                                        className={`card ${selectedIndex === idx ? 'activite' : ''}`}
                                        onClick={() => that.switchActivity(dateString, idx, idx === 0 ? ACTIVITY_DATE_TYPE.currentDay : ACTIVITY_DATE_TYPE.nextDay)}  
                                        key={val.my_date}  
                                    >
                                        <div>
                                            <span>
                                                {week}
                                                &nbsp;&nbsp;
                                                {
                                                    (selectedIndex === 0 && idx === 0) ? 
                                                    <p className="today">今日</p> : 
                                                    null
                                                }
                                            </span>
                                            <span>{day.padStart(2, '0')}</span>
                                        </div>
                                        <div>
                                            <p>{`${idx === 0 ? '进行中' : '已审核'}活动（${val.all_count}）`}</p>
                                            {
                                                // (selectedIndex === 0 && idx === 0) ? 
                                                // <p className="today">今日</p> : 
                                                // null
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                    <section className="date-info">
                        <div className="activity-shops">
                            <Row type={"flex"} justify={"space-between"} className="row">
                                <Col span={4} className="title">活动店铺（{shopBtnList.length || 0}）</Col>
                                <Col span={2} className="more" onClick={that.moreButton}>
                                    <span>{moreButton?'收起':'展开'}更多&nbsp;<Icon type={moreButton?'up':'down'} /></span>
                                </Col>
                            </Row>
                            {
                                moreButton ? 
                                <Row className="row">
                                    <Button 
                                        className="btn-item" 
                                        type={currentShopBtn === 'all' ? 'primary' : ''}
                                        onClick={() => {
                                            that.switchShopBtn('all', activityInfoList)
                                        }}
                                    >
                                        全部（{activityTotal}）
                                    </Button>
                                    {
                                        !!shopBtnList.length ? 
                                        shopBtnList.map((v, i) => {
                                            return (
                                                <Button
                                                    key={v.shop_id}
                                                    type={currentShopBtn === v.shop_id ? 'primary' : ''}
                                                    onClick={() => {that.switchShopBtn(v.shop_id, activityInfoList)}}
                                                    className='btn-item'
                                                >
                                                    {`${v.shop_name}（${v.act_count}）`}
                                                </Button>
                                            )
                                        }) : 
                                        null
                                    }
                                </Row> : 
                                null
                            }

                        </div>
                    </section>
                </div>
                {
                    !!activityInfoList.length ?
                    activityInfoList.map((val, idx) => {
                        return (
                            <div className="activity-card" key={val.id}>
                                <Row className="header-title">
                                    <Col span={12}>
                                        <p className="overflow-hidden-only">
                                            <span>店铺名称：</span>
                                            <span>{val.shop_name}</span>
                                        </p>
                                    </Col>
                                    <Col span={12}>
                                        <p>
                                            <span>活动时间：</span>
                                            <span>{that.formatTime(val.start_time, true)}~{that.formatTime(val.end_time, true)}</span>
                                        </p>
                                    </Col>
                                </Row>
                                <Card
                                    title={cardItem({
                                        // shopName: val.shop_name,
                                        productName: val.product_name,
                                        productUrl: val.product_url,
                                        index: idx,
                                        // startTime: val.start_time,
                                        // endTime: val.end_time
                                    })}
                                    // bordered={false}
                                >
                                    {
                                        togglePriceIndex === idx ? 
                                        <Row className="card-content">
                                            {
                                                !!Object.entries(val.price_map).length ?
                                                Object.entries(val.price_map).map(
                                                    (value, index) => <Col span={8} key={index}>{value[0]}：{value[1]}</Col>
                                                ):
                                                null
                                            }
                                            {/* <Divider dashed /> */}
                                        </Row> : 
                                        null
                                    }
                                    <Row>
                                        <Col span={8}>活动标价：¥{val.apply_price}</Col>
                                        <Col span={8}>活动类型：{val.campaign_type}</Col>
                                        <Col span={8}>赠品情况：{val.gift_situation}</Col>
                                        <Col span={8}>实际成交价：¥{val.actual_price}</Col>
                                        <Col span={8}>玩法说明：{val.play_content}</Col>
                                    </Row>
                                </Card>
                            </div>
                        )
                    }) :
                    null
                }
                {
                    pageNum * pageSize < count ? 
                    <div className="loadMore">
                        <Button onClick={that.handleLoadMore}>加载更多···</Button>
                    </div> : 
                    null
                }
            </section>
            {/* <div className="copyright">
                <CopyRight />
            </div> */}
        </div>
        </ContentBox>
    )
})

export default Tpl