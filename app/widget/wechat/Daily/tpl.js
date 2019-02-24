import ThatMain from '../../HOC/That';
import PopPicker from '../../../../node_modules/rmc-date-picker/lib/Popup'
import DatePicker from '../../../../node_modules/rmc-date-picker/lib/DatePicker'
import { Icon } from 'antd'
const PLATFORM_MAP = {
    'taobao': '淘宝',
    'tmall': '天猫',
    'tmallhk': '天猫国际',
    'international': '国际站(Alibaba.com)',
    'china': '中文站',
    'aliexpress': '国际站(Aliexpress.com)',
    'jd': '京东',
}

const Tpl = ThatMain((that) => {
    const {
        start_time,
        end_time,
        platform,
        isShowPlatformList,
        dataList,
    } = that.state

    return (
        <div className="daily-wrapper">
            <header>
                <section>
                    <span onClick={that.showPlatformList} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{PLATFORM_MAP[platform]}</span>
                        <Icon type={`${isShowPlatformList?'up':'down'}`} theme="outlined" />
                    </span>
                    {
                        isShowPlatformList?
                        <ul className="list-view-wrapper">
                            {
                                Object.keys(PLATFORM_MAP).map(v => (
                                    <li 
                                        onClick={that.handleClickPlatform}
                                        data-platform={v}
                                        data-type={v==='jd'?'jd':(v==='taobao'||v==='tmall'||v==='tmallhk'?'tb':'1688')}
                                        className={`${platform === v ? 'active': ''}`} 
                                        key={v}>{PLATFORM_MAP[v]}</li>
                                ))
                            }
                        </ul>:
                        null
                    }
                </section>
                <section>
                    <PopPicker 
                        okText="完成"
                        dismissText="取消"
                        datePicker={<DatePicker defaultDate={start_time} />}
                        transitionName="rmc-picker-popup-slide-fade"
                        maskTransitionName="rmc-picker-popup-fade"
                        onChange={that.handleConfirm.bind(that, 'start_time')}
                    >
                        <span style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <span>{moment(start_time).format('YYYY-MM-DD')}</span>
                            <Icon type="calendar" theme="outlined" />
                        </span>
                    </PopPicker>
                </section>
                <section>
                    <PopPicker 
                        okText="完成"
                        dismissText="取消"
                        datePicker={<DatePicker defaultDate={end_time} />}
                        transitionName="rmc-picker-popup-slide-fade"
                        maskTransitionName="rmc-picker-popup-fade"
                        onChange={that.handleConfirm.bind(that, 'end_time')}
                    >
                        <span style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <span>{moment(end_time).format('YYYY-MM-DD')}</span>
                            <Icon type="calendar" theme="outlined" />
                        </span>
                    </PopPicker>
                </section>
            </header>
            <main>
                {
                    !!dataList.length?
                    dataList.map((v, i) => (
                        <div key={i} className="info-item">
                            <div className="info" onClick={that.toggleClick.bind(that, i)}>
                                <p>
                                    <span>{v.shop_name?v.shop_name:''}</span>
                                    <span>{v.wangwang?`（${v.wangwang}）`:''}</span>
                                </p>
                                <p>
                                    <span>{v.entity_content}</span>
                                </p>
                                <p style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <span>{v.status_str}</span>
                                    <span><Icon type={`${v.isShowDetail?'up':'down'}`} theme="outlined" /></span>
                                </p>
                            </div>
                            {
                                v.isShowDetail?
                                <div className="detail">
                                    <p>商品名称：{v.item_title}</p>
                                    <p>价格：{v.sale_price?`￥ ${v.sale_price}`:''}</p>
                                    <p>销量：{v.total_sold_quantity}</p>
                                    <p>发货地：{v.item_local}</p>
                                    <br />
                                    <p>投诉单号：{v.batch_id}</p>
                                    <p>知识产权：{v.ipr_name}</p>
                                    <p>投诉时间：{v.gmt_create}</p>
                                    <p>投诉账号：{v.account_id}</p>
                                </div>:
                                null
                            }
                        </div>
                    )):
                    <div style={{textAlign:'center',paddingTop:'20px'}}>
                            暂无数据            
                    </div>
                }

            </main>
        </div>
    )

})
export default Tpl