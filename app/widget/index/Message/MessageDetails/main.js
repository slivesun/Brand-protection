import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form,message } from 'antd';

class MessageDetails extends React.Component {
    constructor(props) {
        // document.title = '消息详情';
        super(props)

        this.state = {
            type: "",
            messagetypes: "",
            types: "",
            SJGSXXBG: {
                topic: "",
                time: "",
                TS: "",
                BUTTONtit: "",
                content: {
                    change_people: "",
                    change_time: "",
                    obj: ""
                }
            },
            KHXXDSH: { // 品牌方-客户信息待审核提醒
                topic: "",
                time: "",
                TS: "",
                BUTTONtit: "",
                content: {
                    dealername: "",
                    apply_date: "",
                    address: "",
                    dutynumber: "",
                    contact: "",
                    take_people: ""
                }
            },
            KHXXBG: {// 品牌方-变更
                topic: "",
                time: "",
                TS: "",
                BUTTONtit: "",
                content: {
                    dealername: "",
                    change_time: "",
                    change_user: ""
                }
            },
            HDDSH: {// 品牌方-活动
                topic: "",
                time: "",
                TS: "",
                BUTTONtit: "",
                content: {
                    campaign_name: "",
                    createtime: "",
                    dealer_name: "",
                    now_date: "",
                    ping_name: "",
                    shop_name: "",
                    campaign_id: ""
                }
            },
            TZGG: { //通知公告
                topic: "",
                time: "",
                TS: "",
                BUTTONtit: "",
                content: {
                    notice_title: "",
                    createtime: "",
                    departnames: "",
                    user_name: "",
                    notice_id: "",
                    message_id: this.props.match.params.id
                }

            }
        }
    }

    componentWillReceiveProps(Props) {
        if (this.props.match.params.id != Props.match.params.id) {
            this.setState({
                message_id: Props.match.params.id
            }, () => {
                this.DidMountText()
            })
        }

    }

    componentDidMount() {
        this.DidMountText()
        //
    }

    DidMountText = () => {

        if (this.props.match.params.type == "HCM") {
            if (this.props.match.params.messagetype == "SJGSXXBG") {
                this.setState({
                    type: 1
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                SJGSXXBG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了入驻申请，待你审核",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        change_people: JSON.parse(res.data.data.content).change_people,
                                        change_time: moment(JSON.parse(res.data.data.content).change_time).format('YYYY-MM-DD HH:mm:ss'),
                                        obj: JSON.parse(res.data.data.content).obj
                                    }
                                }
                            })
                            //console.log(this.state.SJGSXXBG.content)
                        }

                    })

            } else if (this.props.match.params.messagetype == "KHXXDSH") {// 品牌方 -客户信息待审核提醒
                this.setState({
                    type: 2
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            // console.log(res)
                            // console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                KHXXDSH: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了入驻申请，待你审核",
                                    BUTTONtit: "立即审批",
                                    content: {
                                        dealername: "客户名称：" + JSON.parse(res.data.data.content).dealername,
                                        apply_date: "申请时间：" + moment(JSON.parse(res.data.data.content).apply_date).format('YYYY-MM-DD HH:mm:ss'),
                                        address: "公司地址：" + JSON.parse(res.data.data.content).address,
                                        dutynumber: "公司税号：" + JSON.parse(res.data.data.content).dutynumber,
                                        contact: "联系方式：" + JSON.parse(res.data.data.content).contact,
                                        take_people: "对接人姓名：" + JSON.parse(res.data.data.content).take_people
                                    }
                                }
                            })
                            //console.log(this.state.KHXXDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "KHXXBG") {
                this.setState({
                    type: 3
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            // console.log(res)
                            //console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                KHXXBG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了入驻申请，待你审核",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        dealername: "客户名称：" + JSON.parse(res.data.data.content).dealername,
                                        change_time: "变更时间：" + JSON.parse(res.data.data.content).change_time,
                                        change_user: "变更人：" + JSON.parse(res.data.data.content).change_user

                                    }
                                }
                            })
                            // console.log(this.state.KHXXDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "HDDSH") {
                this.setState({
                    type: 4
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(res)
                            // console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                HDDSH: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了活动申请，待你审核。",
                                    BUTTONtit: "立即审核",
                                    content: {
                                        campaign_name: "活动主题：" + JSON.parse(res.data.data.content).campaign_name,
                                        createtime: "申请时间：" + JSON.parse(res.data.data.content).createtime,
                                        dealer_name: "所属客户：" + JSON.parse(res.data.data.content).dealer_name,
                                        now_date: "活动时间：" + JSON.parse(res.data.data.content).now_date,
                                        ping_name: "平台：" + JSON.parse(res.data.data.content).ping_name,
                                        shop_name: "店铺名称:" + JSON.parse(res.data.data.content).shop_name
                                    }
                                }
                            })
                            // console.log(this.state.KHXXDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "TZGG") {
                this.setState({
                    type: 5
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(res)
                            console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                TZGG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        notice_title: "活动主题：" + JSON.parse(res.data.data.content).notice_title,
                                        createtime: "发布时间：" + JSON.parse(res.data.data.content).createtime,
                                        departnames: "接收部门：" + JSON.parse(res.data.data.content).departnames,
                                        user_name: "发布人：" + JSON.parse(res.data.data.content).user_name,
                                        notice_id: JSON.parse(res.data.data.content).notice_id
                                    }
                                }
                            })
                            console.log(this.state.KHXXDSH.topic)
                        }

                    })
            }
        } else if (this.props.match.params.type == "DEALER") {
            if (this.props.match.params.messagetype == "HDSQYSH") {
                // console.log(2)
                this.setState({
                    type: 4
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            //console.log(res)
                            // console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                HDDSH: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "你提交的活动申请：",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        campaign_name: "活动主题：" + JSON.parse(res.data.data.content).campaign_name,
                                        createtime: "申请时间：" + JSON.parse(res.data.data.content).createtime,
                                        now_date: "活动时间：" + JSON.parse(res.data.data.content).now_date,
                                        ping_name: "平台：" + JSON.parse(res.data.data.content).ping_name,
                                        shop_name: "店铺名称:" + JSON.parse(res.data.data.content).shop_name,
                                        campaign_id: JSON.parse(res.data.data.content).campaign_id
                                    }
                                }
                            })
                            //console.log(this.state.HDDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "JGGSXXBG") {
                //console.log(1)
                this.setState({
                    type: 1
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                SJGSXXBG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了入驻申请，待你审核",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        change_people: JSON.parse(res.data.data.content).change_people,
                                        change_time: moment(JSON.parse(res.data.data.content).change_time).format('YYYY-MM-DD HH:mm:ss'),
                                        obj: JSON.parse(res.data.data.content).obj
                                    }
                                }
                            })
                            //console.log(this.state.SJGSXXBG.content)
                        }

                    })
            } else if (this.props.match.params.messagetype == "HDJCBHG") {
                this.setState({
                    type: 4
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(res)
                            // console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                HDDSH: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "经品牌相关方人员稽查，以下商品未按活动报备的方式进行",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        campaign_name: "活动主题：" + JSON.parse(res.data.data.content).campaign_name,
                                        createtime: "申请时间：" + JSON.parse(res.data.data.content).createtime,
                                        dealer_name: "链接地址：" + JSON.parse(res.data.data.content).pro_url,
                                        now_date: "活动时间：" + JSON.parse(res.data.data.content).now_date,
                                        ping_name: "平台：" + JSON.parse(res.data.data.content).ping_name,
                                        shop_name: "店铺名称:" + JSON.parse(res.data.data.content).shop_name
                                    }
                                }
                            })
                            //console.log(this.state.HDDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "TZGG") {
                this.setState({
                    type: 5
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(res)
                            console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                TZGG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "品牌方相关人员发布了新通知公告",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        notice_title: "公告主题：" + JSON.parse(res.data.data.content).notice_title,
                                        createtime: "发布时间：" + JSON.parse(res.data.data.content).createtime,
                                        notice_id: JSON.parse(res.data.data.content).notice_id

                                    }
                                }
                            })
                        }

                    })
            }
        } else if (this.props.match.params.type == "KEFU") {
            if (this.props.match.params.messagetype == "SPKPCDSZ") {
                this.setState({
                    type: 4
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(res)
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                HHtwo: "你服务的新客户：",
                                HDDSH: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "超级管理员给你分配了新的服务客户",
                                    BUTTONtit: "立即设置",
                                    content: {
                                        campaign_name: JSON.parse(res.data.data.content).companynames
                                    }
                                }
                            })
                            // console.log(this.state.KHXXDSH.topic)
                        }

                    })
            } else if (this.props.match.params.messagetype == "SJJKDSZ") {
                this.setState({
                    type: 1
                })
                ajax.post('/hcm/hcmMessageCenter/Detail', {
                    message_id: this.props.match.params.id
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            console.log(JSON.parse(res.data.data.content))
                            this.setState({
                                messagetypes: this.props.match.params.messagetype,
                                types: this.props.match.params.type,
                                SJGSXXBG: {
                                    topic: res.data.data.topic,
                                    time: moment(res.data.data.createtime).format('YYYY-MM-DD HH:mm:ss'),
                                    TS: "提交了入驻申请，待你审核",
                                    BUTTONtit: "查看详情",
                                    content: {
                                        change_people: JSON.parse(res.data.data.content).change_people,
                                        change_time: moment(JSON.parse(res.data.data.content).change_time).format('YYYY-MM-DD HH:mm:ss'),
                                        obj: JSON.parse(res.data.data.content).obj
                                    }
                                }
                            })
                            //console.log(this.state.SJGSXXBG.content)
                        }

                    })
            }
        }



    }
    SJGSXXBG_XQ = () => {//品牌方 售价公式 查看详情
        window.location = "/index.html#/PriceNotice"
    }
    //品牌方
    KHXXDSH_SH = () => {//品牌方 客户信息待审核提醒 立即审核
        window.location = "/index.html#/PendingClient"
    }
    KHXXBG_XQ = () => { // 品牌方 客户信息变更历史 查看详情
        window.location = "/index.html#/ClientCheck"
    }
    HDDSH_SH = () => {//品牌方  活动待审核 立即审核
        window.location = "/index.html#/ActivityReview"
    }
    TZGG_SH = (e) => {//品牌方  通知公告 立即审核
        window.location = "/index.html#/InfoAnnouncement/" + e.target.getAttribute("notice_id")
    }

    //经销商
    JGGSXXBG_XQ = (e) => {
        window.location = "/index.html#/PricePublicity"
    }
    HDSQYSH_XQ = (e) => {//活动已审核
        window.location = "/index.html#/ActivityDetails/" + e.target.getAttribute("campaign_id") + "/已审核"
    }

    HDJCBHG_XQ = (e) => {//活动稽查不合格
        window.location = "/index.html#/ActivityDetails/" + e.target.getAttribute("campaign_id") + "/已审核"
    }
    TZGG_XQ = (e) => {//通知公告
        window.location = "/index.html#/InfoAnnouncement/" + e.target.getAttribute("notice_id")
    }


    SJJKDSZ_XQ = () => { //客服  售价监控待设置提醒
        window.location = "/index.html#/ProductClass"
    }

    SPKPCDSZ_SH = () => { //客服  售价监控待设置提醒
        if (window.localStorage.roleid != "3") {
            window.location.href = "/index.html#/ClientInfo"
        } else {
            message.error("普通客服")
        }
    }
    HistoryGo = () => {
        window.history.go(-1)
    }

    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(MessageDetails)