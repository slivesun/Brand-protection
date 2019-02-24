import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, message } from 'antd';
import { connect } from 'react-redux'

const mapState = state => ({
    currentBrand: state.dealer.currentBrand
})
@connect(mapState)
class DataInformation extends React.Component {
    constructor(props) {
        // document.title = '资料信息';
        super(props)
        this.state = {
            visible: false,//新增弹框
            confirmLoading: false,
            PoneBtn: "",
            address: "",
            approve_date: "",
            brand_take_people: "",
            city: "",
            contact: "",
            creditscore: "",
            dealername: "",
            dutynumber: "",
            id: "",
            userid:"",
            match_status: "",
            mobile: "",
            province: "",
            source: "",
            take_people: "",
            username: "",
            strict: "",
            BTNtit: "",
            usertype: "",
            provinceApply: [],
            authorize_start: "",
            authorize_end: "",
            memo_dealername: "",
            authorize_num: "",
            ticket: "",
            realname:"",
            PopoWei:"",
            WEIXING:"未绑定"
        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    ModifyPhone = () => {
        if (this.state.mobile != "" && this.state.mobile != undefined) {
            window.location = "/index.html#/ModifyBindings/c/" + this.state.mobile+"/n"
        } else {
            window.location = "/index.html#/ModifyPhone/c/" + this.state.mobile
        }
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    JBWEIxing=()=>{
        ajax.post('/hcm/user/unbindWX',{
            userid:this.state.userid,
            usertype:"c"
        })
        .then((res) => {
            console.log(res)
            if(res.data.status==10000){
                this.setState({
                    WEIXING:"未绑定"
                },()=>{
                    this.DidMountText()
                })
            }else{
                message.error(res.data.message)
            }
            
        })
    }
    BDWEIxing=()=>{
        console.log(1)
        ajax.post('/hcm/wechat/getQRcode',{
            userid:this.state.userid,
            usertype:"c"
        })
        .then((res) => {
            //console.log(res)
            if(res.data.status==10000){
                this.setState({
                    ticket:"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+res.data.data
                },()=>{
                    this.DidMountText()
                })
            }else{
                message.error(res.data.message)
            }
            
        })
    }
    
    DidMountText = () => {

        ajax.post('/hcm/dealer/findById')
            .then((res) => {
                if (res.data.status == 10000) {
                    if (res.data.data != null && res.data.data != undefined) {
                        console.log(res)
                        const provinceApplyb = []
                        provinceApplyb.push(res.data.data.province)
                        provinceApplyb.push(res.data.data.city)
                        provinceApplyb.push(res.data.data.strict)
                        // console.log(provinceApplyb)
                        this.setState({
                            address: res.data.data.address,
                            approve_date: moment(res.data.data.approve_date).format('YYYY-MM-DD'),
                            brand_take_people: res.data.data.brand_take_people,
                            city: res.data.data.city,
                            contact: res.data.data.contact,
                            creditscore: res.data.data.creditscore,
                            dealername: res.data.data.dealername,
                            dutynumber: res.data.data.dutynumber,
                            memo_dealername: res.data.data.memo_dealername,
                            authorize_num: res.data.data.authorize_num,
                            id: res.data.data.id,
                            userid:res.data.data.userid,
                            match_status: res.data.data.match_status,
                            mobile: res.data.data.mobile,
                            province: res.data.data.province,
                            source: res.data.data.source,
                            take_people: res.data.data.take_people,
                            username: res.data.data.username,
                            realname:res.data.data.realname,
                            strict: res.data.data.strict,
                            usertype: res.data.data.usertype,
                            provinceApply: provinceApplyb,
                            PopoWei:res.data.data.unionid,
                            authorize_start: moment(res.data.data.authorize_start).format('YYYY-MM-DD'),
                            authorize_end: moment(res.data.data.authorize_end).format('YYYY-MM-DD')
                        })
                        if(this.state.PopoWei!="" && this.state.PopoWei!=undefined){
                            this.setState({
                                WEIXING:res.data.data.nickname
                            })
                        }
                        if (this.state.mobile != "" && this.state.mobile != undefined) {
                            this.setState({
                                BTNtit: "修改绑定>"
                            })

                        } else {
                            this.setState({
                                BTNtit: "绑定手机>"
                            })
                        }
                    } else {
                        this.setState({
                            BTNtit: "绑定手机>"
                        })
                    }
                } else {

                    this.setState({
                        BTNtit: "绑定手机>"
                    })

                }
            })

    }
    BJBtn = () => {

        this.setState({
            visible: true,
            confirmLoading: true
        })
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if(values.province[0]!="" && values.province[0]!=undefined){
                if (values.contact != "" && values.contact != undefined) {
                    if (values.take_people != "" && values.take_people != undefined) {
                        if(values.contact.length<=50){
                            const han = /[\u4E00-\u9FA5]/i;
                            if(!han.test(values.contact)){
                                if(values.take_people.length<=32){
                                    if(values.address.length<=100){
                                        ajax.post('/hcm/dealer/updateDealer', {
                                            id: this.state.id,
                                            province: values.province[0],
                                            city: values.province[1],
                                            strict: values.province[2],
                                            address: values.address,
                                            contact: values.contact,
                                            takePeople: values.take_people
                                        })
                                            .then((res) => {
                                                if (res.data.status == 10000) {
                                                    console.log(res)
                                                    this.setState({
                                                        visible: false,
                                                        confirmLoading: false
                                                    })
                                                    this.DidMountText()
                                                } else if (res.data.status == 12003) {
                                                    message.error(res.data.message)
                                                }
                                            })
                                    }else{
                                        message.error("详情地址限制100个字符以内！")
                                    }
                                }else{
                                    message.error("对接人限制32个字符以内！")
                                }
                            }else{
                                message.error("联系方式不可以输入汉字！")
                            }
                            
                        }else{
                            message.error("联系方式限制50个字以内！")
                        }
                        
                    } else {
                        message.error("请输入对接人！")
                    }
                } else {
                    message.error(" 请输入联系方式！")
                }
            }else {
                message.error(" 请输入所在地区！")
            }

        })
    }


    ModifyPassword = () => {

        window.location = "/index.html#/ModifyPassword/" + this.state.username
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(DataInformation)