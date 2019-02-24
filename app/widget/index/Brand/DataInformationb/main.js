import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form,message } from 'antd';

class DataInformationb extends React.Component {
    constructor(props) {
        // document.title = '资料信息';
        super(props)
        this.state = {
            visible: false,//新增弹框
            confirmLoading: false,
            address: "",
            city: "",
            companyname: "",
            contact: "",
            dict_name: "",
            id: "",
            mobile: "",
            password: "",
            province: "",
            realname: "",
            status: "",
            strict: "",
            username: "",
            usertype: "",
            validtime: "",
            bmcid: "",
            BTNtit:"",
            provinceApplys: [],
            ticket:"",
            PopoWei:"",
            WEIXING:"未绑定"
            
        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    JBWEIxing=()=>{
        ajax.post('/hcm/user/unbindWX',{
            userid:this.state.id,
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
        ajax.post('/hcm/wechat/getQRcode',{
            userid:this.state.id,
            usertype:"c"
        })
        .then((res) => {
            //console.log(res)
            if(res.data.status==10000){
                this.setState({
                    ticket:"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+res.data.data
                },()=>{
                    
                    this.DidMountText()
                    // let siv = setInterval(() => {
                    //     this.DidMountText()
                    // }, 51000)
                })
            }else{
                message.error(res.data.message)
            }
            
        })
    }
    DidMountText = () => {
        ajax.post('/hcm/userin/selectBmainOut')
            .then((res) => {
                if (res.data.status == 10000) {
                    console.log(res.data.data.data)
                    const provinceApplyx = []
                    provinceApplyx.push(res.data.data.data.province)
                    provinceApplyx.push(res.data.data.data.city)
                    provinceApplyx.push(res.data.data.data.strict)
                    console.log(provinceApplyx)
                    this.setState({
                        address: res.data.data.data.address,
                        city: res.data.data.data.city,
                        companyname: res.data.data.data.companyname,
                        contact: res.data.data.data.contact,
                        dict_name: res.data.data.data.dict_name,
                        id: res.data.data.data.id,
                        mobile: res.data.data.data.mobile,
                        password: res.data.data.data.password,
                        province: res.data.data.data.province,
                        realname: res.data.data.data.realname,
                        status: res.data.data.data.status,
                        strict: res.data.data.data.strict,
                        username: res.data.data.data.username,
                        usertype: res.data.data.data.usertype,
                        validtime: moment(res.data.data.data.validtime).format('YYYY-MM-DD'),
                        bmcid: res.data.data.data.bmcid,
                        provinceApplys: provinceApplyx,
                        PopoWei:res.data.data.data.unionid
                    })
                    if(this.state.PopoWei!="" && this.state.PopoWei!=undefined){
                        this.setState({
                            WEIXING:res.data.data.data.nickname
                        })
                    }
                    
                }
            })
    }
    phones = () => {
        //document.cookie = "usernamePone=" + this.state.username;
        window.location = "/index.html#/ModifyPassword/" + this.state.username
    }

    password = () => {
        //document.cookie = "usernamePone=" + this.state.username;
        window.location = "/index.html#/ModifyPhone/c/" + this.state.mobile
    }
    Bding = () => {
        window.location = "/index.html#/ModifyBindings/c/" + this.state.mobile+"/nb"

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
            if(values.companyname!=undefined && values.companyname!=""){
                if(values.companyname.length<=50){
                    if(values.contact.length<=50){
                        const han = /[\u4E00-\u9FA5]/i;
                        if(!han.test(values.contact)){
                            if(values.address.length<=100){
                                ajax.post('/hcm/cus/updateCustomer', {
                                    bmcid: this.state.bmcid,
                                    province: values.province[0],
                                    city: values.province[1],
                                    strict: values.province[2],
                                    address: values.address,
                                    contact: values.contact,
                                    dict_name: values.dict_name,
                                    companyname: values.companyname
                                })
                                    .then((res) => {
                                        if (res.data.status == 10000) {
                                            //console.log(res)
                                            this.setState({
                                                visible: false,
                                                confirmLoading: false
                                            })
                                            this.DidMountText()
                                        }
                                    })
                            }else{
                                message.error("详情地址限制100个字以内！")
                            }
                        }else{
                            message.error("不可以输入汉字！")
                        }
                        
                    }else{
                        message.error("联系方式限制50个字以内！")
                    }
                }else{
                    message.error("公司名称限制50个字以内！")
                }
               
            }else{
                message.error("请输入公司名称！")
            }
            
        })
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
export default Form.create()(DataInformationb)