
import ThatMain from '../../HOC/That';
import { Icon, Avatar, Button, Select, Popover, Badge } from 'antd';

const isDealer = localStorage.getItem('logintype') === 'DEALER';
const isKefu = localStorage.getItem('logintype') === 'KEFU';
const Option = Select.Option;
const APPLYSTTUS = {
    APPLYING: '申请中',
    APPROVED: null,
    DISAGREE: '申请驳回',
}
// 停约状态
const STOP_STATUS = {
    normal: 1,
    stop: 2
}
const Tpl = ThatMain((that) => {
    let { feedbackVisible, messageVisible, FeedbackList } = that.state;
    let { collapsed, toggleCollapsed, brandList, currentBrand, brandListToKefu, location: { pathname } } = that.props;
    const defaultValue = brandList.length && brandList.filter(v => v.checked === 'true')[0];
    const defaultValueToKefu = brandListToKefu.length && brandListToKefu.filter(v => v.checked === 'true')[0];
    let disabled = false;
    if (localStorage.getItem('logintype') === 'DEALER') {
        disabled = !currentBrand.apply_status ? false : (currentBrand.apply_status == 'APPROVED' && currentBrand.status === STOP_STATUS.normal) ? false : true;
    }

    const statusText = (item) => {
        let text = '';
        let code = null;
        if (item.status == 1) {
            text = APPLYSTTUS[item.apply_status];
            code = item.apply_status;
        } else if (item.status == 2) {
            text = '合约到期';
            code = 'EXPIRE';
        }
        return {
            text,
            code
        }
    }
    const three={
        height: "300px",
         overflowY: "scroll", 
         display: "grid" 
    }
    const one={
         display: "grid" 
    }
    const SwitchBrand = (
        <div className="switch-brand-wrapper">
            {
                brandList.length === 0 ?
                    null :
                    <Select
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        defaultValue={defaultValue.bmcid}
                        style={{ minWidth: '300px' }}
                        onChange={that.handleSwitchBrand}
                        disabled={brandList.length === 1 && !!brandList[0]._customBrand ? true : false}
                    >
                        {
                            brandList.map(v => (
                                <Option
                                    key={v.bmcid}
                                    value={v.bmcid}
                                >
                                    {v.companyname}
                                    {
                                        v.Bmcstatus == 0 ?
                                            <span className='STATUSBUT  DISABLE'>
                                                停用
                                            </span>
                                            :
                                            statusText(v).code === 'APPROVED' ?
                                                null
                                                :
                                                <span className={'STATUSBUT ' + statusText(v).code}>
                                                    {statusText(v).text}
                                                </span>
                                    }
                                </Option>
                            ))
                        }
                    </Select>
            }
        </div>
    );
    const SwitchBrandToKefu = (
        <div className="switch-brand-wrapper">
            {
                brandListToKefu.length === 0 ?
                    null :
                    <Select
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        defaultValue={defaultValueToKefu.bmcid}
                        style={{ minWidth: '300px' }}
                        onChange={that.handleSwitchBrandToKefu}
                        disabled={brandListToKefu.length === 1 ? true : false}
                    >
                        {
                            brandListToKefu.map(v => (
                                <Option
                                    key={v.bmcid}
                                    value={v.bmcid}
                                >
                                    {v.company_memoname && v.company_memoname.length ? v.company_memoname : v.companyname}
                                </Option>
                            ))
                        }
                    </Select>
            }
        </div>
    );
    const FeedbackListDom = (
        <div className='box'>
            <ul className='items'>
                {
                    FeedbackList.length ?
                        FeedbackList.map((item, index) => {
                            return (
                                <li className='item' key={index} onClick={e => that.checkVisible('feedbackVisible', false)}>
                                    <h6>
                                        <a href={`/index.html#/InfoFeedback/${item.id}`}>{item.workTitle}</a>
                                    </h6>
                                    <p>{item.realname}回复了你</p>
                                    <span>{moment(item.updatetime).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </li>
                            )
                        })
                        :
                        <li style={{ textAlign: 'center', padding: '10px', color: '#999' }}>暂无回复</li>
                }
            </ul>
            <div className='all-message-box'>
                <a onClick={e => that.checkVisible('feedbackVisible', false)} href='/index.html#/Feedback'>全部工单</a>
            </div>
        </div>

    )
    const MessageListDom = (
        <ul>
            {
                that.state.Message_list.length > 0 ? <ul style={that.state.Message_list.length > 3 ? three : one}>
                    {
                        that.state.Message_list.map((item, index) => {
                            return <li key={index} style={{ flex: "2" }} className="MessageListLI">
                                    <span className="MessageListSpana" style={{ textAlign: "center" }}>
                                        <b><img src="../../../img/ld.jpg" alt="" /></b>

                                    </span>
                                    <span className="MessageListSpanb">
                                        <h5
                                            id={item.id}
                                            onClick={that.MessageListLIGO}
                                            messagetype={item.messagetype}
                                            sys_type={item.sys_type}
                                        >{item.topic}</h5>
                                        <p className="MessageListPA">
                                            {
                                                item.messagetype == "JGGSXXBG" ?
                                                    <span>
                                                        所属客户：{JSON.parse(item.content).change_people},
                        所属分类：{
                                                            JSON.parse(item.content).obj.map((item, i) => {
                                                                return <span key={i}>{item.classify}</span>
                                                            })
                                                        }
                                                    </span> : item.messagetype == "HDSQYSH" ?
                                                        <span>
                                                            活动主题：{JSON.parse(item.content).campaign_name},店铺名称：{JSON.parse(item.content).shop_name}
                                                        </span> : item.messagetype == "HDJCBHG" ?
                                                            <span>
                                                                活动主题：{JSON.parse(item.content).campaign_name},店铺名称：{JSON.parse(item.content).shop_name}
                                                            </span> : item.messagetype == "TZGG" ?
                                                                <span>
                                                                    公告主题：{JSON.parse(item.content).notice_title}
                                                                </span> : item.messagetype == "SJGSXXBG" ?
                                                                    <span>
                                                                        所属客户：{JSON.parse(item.content).change_people},
                        所属分类：{
                                                                            JSON.parse(item.content).obj.map((item, i) => {
                                                                                return <span key={i}>{item.classify}</span>
                                                                            })
                                                                        }
                                                                    </span> : item.messagetype == "HDDSH" ?
                                                                        <span>
                                                                            活动主题：{JSON.parse(item.content).campaign_name},店铺名称：{JSON.parse(item.content).shop_name}
                                                                        </span> : item.messagetype == "KHXXBG" ?
                                                                            <span>
                                                                                客户名称：{JSON.parse(item.content).dealername},变更人：{JSON.parse(item.content).change_user}
                                                                            </span> : item.messagetype == "KHXXDSH" ?
                                                                                <span>
                                                                                    客户名称：{JSON.parse(item.content).dealername},公司税号：{JSON.parse(item.content).dutynumber}
                                                                                </span> : item.messagetype == "SPKPCDSZ" ?
                                                                                    <span>
                                                                                        新客户：{JSON.parse(item.content).companynames}
                                                                                    </span> : item.messagetype == "SJJKDSZ" ?
                                                                                        <span>
                                                                                            所属客户：{JSON.parse(item.content).change_people},
                        所属分类：{
                                                                                                JSON.parse(item.content).obj.map((item, i) => {
                                                                                                    return <span key={i}>{item.classify}</span>
                                                                                                })
                                                                                            }
                                                                                        </span> : null
                                            }</p>
                                        <p>{moment(item.createtime).format('YYYY-MM-DD- HH:mm:ss')}</p>
                                    </span>
                            </li>

                        })
                    }
                    <div style={{flex:"1"}}><Button onClick={that.SUNBTN} className="SUMBtn" style={{ border: "none", textAlign: "center", width: "100%", borderTop: "1px solid #ccc" }}>全部消息</Button></div>
                </ul> : "暂无消息"
            }
        </ul>
    )
    return (
        <div className='header'>
            <div className='left-info'>
                <Button className='toggleCollapsed' onClick={toggleCollapsed} type="primary" style={{ marginBottom: 16 }}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                {
                    // 我的活动日程页面不需要切换品牌商
                    isDealer && pathname !== '/ActivityInformation' ? SwitchBrand : null
                }
                {
                    // 我的活动日程页面不需要切换品牌商
                    isKefu ? SwitchBrandToKefu : null
                }


            </div>
            <div className='right-user'>
                {
                    isKefu ?
                        null :
                        <div className='header-feedback'>
                            <Popover overlayClassName='header-feedback-Popover' onVisibleChange={visible => that.checkVisible('feedbackVisible', visible)} visible={feedbackVisible} placement="bottom" title={<header style={{ width: '400px', padding: '8px 0px', fontSize: '15px' }}>工单 {FeedbackList.length ? `(${FeedbackList.length})` : null}</header>} content={FeedbackListDom} trigger="click">
                                <a disabled={disabled}>
                                    <Badge count={FeedbackList.length}>
                                        <img src='../../../img/Work_order.png' />
                                    </Badge>
                                </a>
                            </Popover>
                        </div>
                }
                {
                    localStorage.logintype == 'ADMIN' ?
                        null
                        :
                        <div className='header-message'>
                            <Popover onVisibleChange={visible => that.checkVisible('messageVisible', visible)} visible={messageVisible} placement="bottom" title={<header style={{ width: '400px', padding: '8px 0px', fontSize: '15px' }}>
                                {
                                    that.state.totalElements ?

                                        <b> 消息（{that.state.totalElements}）</b>
                                        :
                                        <b>消息（0）</b>
                                }
                            </header>} content={MessageListDom} trigger="click">

                                <Badge count={that.state.totalElements}>
                                    <img src='../../../img/Message.png' />
                                </Badge>

                            </Popover>
                        </div>
                }

                <div className='username'>
                    <span>{localStorage.realname.substring(0, 1)}</span>
                    {localStorage.realname}
                </div>
                <a className='logout' onClick={() => that.userOur()} > </a>
            </div>
        </div>
    )
})
export default Tpl