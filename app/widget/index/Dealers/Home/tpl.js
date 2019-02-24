
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Icon, Card, Row, Col, Button } from 'antd'
import moment from 'moment'
import WechatBind from '../../../components/WechatBind'

const WEEKS = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
const STOP_STATUS = {
    normal: 1,  // 正常状态
    stop: 2     // 停约状态
}
const APPLY_STATUS = {
    APPLYING: 1,    // 品牌申请中
    APPROVED: 0,    // 品牌申请通过
    DISAGREE: 2,     // 品牌入驻已拒绝
    CUSTOM: 3,      // 未拥有授权品牌方
}
const BRAND_END_DATE = {
    normal: 1,      // 正常
    stop: 0           // 品牌到期
}

const Tpl = ThatMain((that) => {
    const { apply_status='APPROVED', status=1, Bmcstatus } = that.props.currentBrand
    const { selectDateIndex, isExpandShop, sevenActivity, shopBtnList, noticeList, productList, binding, userId } = that.state
    const commonPanel = config => {
        const {
            title,
            flag,
            list
        } = config
        let cardTitle = `${title}（${list.length||0}）`
        if (flag === 'change') {
            cardTitle = (
                <div 
                    onClick={that.goTo.bind(that, '/PricePublicity/ChangeHistory/Product')}
                    style={{cursor:'pointer'}}
                >
                    {title}（{list.length||0}）
                </div>
            )
        }
        return (
            <Card title={cardTitle} className="bulletin">
                {
                    list.map((value, index) => {
                        let title = '', name = '', time = 0, id = '', url = ''
                        if (flag === 'notice') {
                            title = value.notice_title
                            name = value.notice_typename
                            time = value.createtime
                            id = value.id
                            url = `/InfoAnnouncement/${id}`
                        }
                        if (flag === 'change') {
                            title = value.content_after
                            name = value.product_classify_name
                            time = value.changetime
                            id = value.objectid
                            url = `/PricePublicity/ChangeHistory/HcmProductClassify/${name}/${id}`
                        }
                        return (
                            <div 
                                className="common-panel-item" 
                                key={index} 
                                onClick={that.goTo.bind(that, url)}>
                                    <h3>{title}</h3>
                                    <p>
                                        <span>{name}</span>
                                        <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                    </p>
                            </div>
                        )
                    })
                }
            </Card>
        )
    }
    const timeCard = config => {
        return (
            <div className="date-card-wrapper">
                {
                    config.map((value, index) => (
                        <div 
                            className={selectDateIndex === index ? "date-item active" : "date-item"} 
                            key={index}
                            onClick={that.handleDateClick.bind(that, index, moment(value.my_date).format('YYYY-MM-DD'))}
                        >
                            <p>
                                <span>
                                    {WEEKS[moment(value.my_date).day()]}
                                    {
                                        selectDateIndex === 0 && index === 0 ? 
                                        <span className="today">今日</span> : 
                                        null
                                    }
                                </span>
                                <span className="day">{moment(value.my_date).format('DD')}</span>
                            </p>
                            <p>{index === 0 ? '进行中' : '已审核'}活动（{value.all_count}）</p>
                        </div>
                    ))
                }
            </div>
        )
    }
    const approved = (
        <div className="content">
            {
                !!userId ?
                <WechatBind userId={userId} binding={binding} /> :
                null
            }
            <section className="apply-activity" onClick={that.goTo.bind(that, '/ActivityDeclaration')}>
                <span><Icon type="plus" />&nbsp;申报活动</span>
            </section>
            <section className="publicity">
                <h3>品牌活动公示</h3>
                {timeCard(sevenActivity)}
                <div className="shop-btn-wrapper">
                    <h3>
                        <span>活动店铺（{shopBtnList.length || 0}）</span>
                        <span onClick={that.handleToggleClick}>
                            {isExpandShop ? '收起' : '展开'}
                            更多&nbsp;
                            {isExpandShop ? <Icon type="up" /> : <Icon type="down" />}
                        </span>
                    </h3>
                    {
                        isExpandShop ? 
                        <div className="btns-wrapper">
                            {
                                shopBtnList.map((value, index) => (
                                    <Button
                                        className="btn"
                                        key={index}
                                    >
                                        {value.shop_name}（{value.act_count}）
                                    </Button>
                                ))
                            }
                        </div> : 
                        null
                    }
                </div>
            </section>
            <section className="bulletin-wrapper">
                {commonPanel({title:'价格公示变更',flag:'change',list:productList})}
                {commonPanel({title:'新通知公告',flag:'notice',list:noticeList})}
            </section>
        </div>
    )
    const unapproved = status => {
        return (
            <div className="content">
                <section className="unapproved-wrapper">
                    <div className="main">
                        {
                            status === 1 ?
                            <React.Fragment>
                                <p className="icon"><Icon type="exclamation-circle" /></p>
                                <p className="status">入驻申请，正在审核中...</p>
                                <p>你通过其他方式联系品牌方审核人，尽快同意入驻申请。</p>
                                <p>审核通过后，我们会以短信形式通知到你的注册手机。</p>
                            </React.Fragment> :
                            status === 2 ?
                            <React.Fragment>
                                <p className="fail-icon"><Icon type="close-circle" /></p>
                                <p className="fail-status">品牌方拒绝了你的入驻申请</p>
                                <div className="reason">
                                    <h5>审核未通过原因可能是：</h5>
                                    <ol>
                                        <li>1、完善的信息不完整或不正确，品牌方未能使做出正确识别。</li>
                                        <li>2、不是品牌方登记在册的授权经销商。品牌方拒绝了你的入驻申请</li>
                                    </ol>
                                </div>
                                <div className="resolution">
                                    <h5>解决方法</h5>
                                    <ol>
                                        <li>1、可以通过其有效途径联系品牌方审核人。</li>
                                        <li>2、可以通过修改个人中心资料，再次提交申请。</li>
                                    </ol>
                                    <div className="btns" style={{display:'flex',justifyContent:'space-around',marginTop:'20px'}}>
                                        <Button onClick={() => {that.props.history.push('/DataInformation')}}>修改资料信息</Button>
                                        <Button type="primary" onClick={that.reSubmitApply}>重新提交申请</Button>
                                    </div>
                                </div>
                            </React.Fragment> : 
                            status === 3 ?
                            <React.Fragment>
                                <p className="icon"><Icon type="exclamation-circle" /></p>
                                <p className="status">你未拥有授权品牌方</p>
                                <p className="no-brand-title">说明：</p>
                                <p className="no-brand">你还未拥有授权品牌方，或之前合作的品牌方与你解除了合作关系</p>
                                <p className="no-brand-title">解决方案：</p>
                                <p className="no-brand">你可以通过联系品牌方相关人员重新入驻</p>
                            </React.Fragment> :
                            <React.Fragment>
                                <p className="icon"><Icon type="exclamation-circle" /></p>
                                <p className="status">品牌方账号暂时停用</p>
                                <p className="brand-stop">说明：品牌方账号因过有效使用期被停用，可以通过续期再次启用。</p>
                            </React.Fragment>
                        }
                    </div>
                </section>
            </div>
        )
    }
    const stopStatus = (
        <div className="content">
            <section className="stop-status-wrapper">
                <div className="stop-main">
                    <p><Icon type="exclamation-circle" className="icon" /><span>品牌方授权合作合同到期</span></p>
                    <p>说明：你与品牌方授权合作合同已到期，请联系品牌方人员续期。</p>
                </div>
            </section>
        </div>
    )
    return (
        <div className='home'>
            {
                Bmcstatus === BRAND_END_DATE.stop ?
                unapproved('brand') :
                (APPLY_STATUS[apply_status] === 0 ? 
                (status === STOP_STATUS.normal ? approved : stopStatus) : 
                unapproved(APPLY_STATUS[apply_status]))
            }
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl