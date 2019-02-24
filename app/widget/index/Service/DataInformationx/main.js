import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form,message } from 'antd';

class DataInformationx extends React.Component {
    constructor(props) {
        // document.title = '资料信息';
        super(props)
        this.state={
            visible: false,//新增弹框
            confirmLoading:false,
            realname: "", //名字
            username: "", //用户名
            mobile: "",  //手机号
            count:"",//
            data:"",
            usertype:"",
            BTNtit:"",
            WEIXING:"未绑定",
            PopoWei:"",
            ticket:"",
            id:""
        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    password=()=>{
        //document.cookie = "usernamePone=" + this.state.username;
        window.location = "/index.html#/ModifyPassword/"+this.state.username
    }
    MePhone=()=>{
        if(this.state.mobile!="" && this.state.mobile!=undefined){
            
            window.location = "/index.html#/ModifyBindings/u/"+this.state.mobile+"/nx"

        }else{
            window.location="/index.html#/ModifyPhone/u/"+this.state.mobile
        }
    }
  
    JBWEIxing=()=>{
        ajax.post('/hcm/user/unbindWX',{
            userid:this.state.id,
            usertype:"u"
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
            userid:this.state.id,
            usertype:"u"
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
        
        ajax.post('/hcm/userin/selectBmainIn')
            .then((res) => {
                console.log(res)
                if(res.data.status==10000){
                    if(res.data.data!=null && res.data.data!=undefined){
                        this.setState({
                            realname: res.data.data.data.kefu.realname, //名字
                            username: res.data.data.data.kefu.username, //用户名
                            usertype:res.data.data.data.kefu.usertype,
                            mobile: res.data.data.data.kefu.mobile,  //手机号
                            count:res.data.data.data.count,//
                            data:res.data.data.data.bc,
                            id:res.data.data.data.kefu.id,
                            PopoWei:res.data.data.data.kefu.unionid
                        })
                        console.log(res)
                        if(this.state.PopoWei!="" && this.state.PopoWei!=undefined){
                            this.setState({
                                WEIXING:res.data.data.data.kefu.nickname
                            })
                        }
                        if(this.state.mobile!="" && this.state.mobile!=undefined){
                            this.setState({
                                BTNtit:"修改绑定>"
                            })
                
                        }else{
                            this.setState({
                                BTNtit:"绑定手机>"
                            })
                        }
                    }else{
                        this.setState({
                            BTNtit:"绑定手机>"
                        })
                    }
                }else{
                    this.setState({
                        BTNtit:"绑定手机>"
                    })
                }
                
            })
    }
    BJBtn=()=>{
        this.setState({
            visible: true,
            confirmLoading: true
        })
    }
    ForgetSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
        })
    }
    handleCancel=()=>{
        this.setState({
            visible: false,
            confirmLoading: false
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(DataInformationx)