import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, message } from 'antd';
import crypto from '../../../../js/common/crypto';

class ModifyPassword extends React.Component {
    constructor(props) {
        // document.title = '修改密码';
        super(props)
        this.state = {
            forgetxs: false,//输入错误提示
            shows: true,
            AqPercentSum: 30,
            forgetmmClock: "red",
            AqPercentx: "弱",
            userName:""
        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    DidMountText = () => {
        console.log(this.props.match.params.type)
        //const {dispatch}=this.props
        ajax.post('/hcm/userin/getByUserId')
        .then((res) => {
            console.log(res)
            this.setState({
                userName: res.username
            })
            //dispatch(getNavList(this.state.userName))
        })
    }
    BJBtn = () => {
        this.setState({
            visible: true,
            confirmLoading: true
        })
    }
    Trim = (str) => {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.pwd != "" && values.pwd != undefined) {
                if (values.pwd != values.pwds) {
                    this.setState({
                        forgetxs: true,
                        titlesx: "两次输入的密码不同，请重新输入。"
                    })
                } else {
                    if(this.Trim(values.pwd).length>=6 && this.Trim(values.pwd).length<=16){
                        this.setState({
                            forgetxs: false
                        })
                        ajax.post('/hcm/user/updatePassword', {
                            "username": this.props.match.params.type,
                            "password": crypto.Encrypt(values.pwd),
                            "oldPassword": crypto.Encrypt(values.oldpwd)
                        }).then((res) => {
                            console.log(res)
                            if (res.data.status == 10000) {
                                //message.success("修改成功")
                                window.history.go(-1)
                                
                               
                            }else{
                                message.error(res.data.message)
                                
                            }
                        })
                    }else{
                        message.error("密码必须在6-16位之间！")
                    }
                    

                }
            } else {
                this.setState({
                    forgetxs: true,
                    titlesx: "密码不能为空。"
                })
            }
        })
    }
    onBlur = () => {
        this.props.form.validateFields((err, values) => {
            // console.log(values)
            let number = new RegExp("^[0-9]*$");
            let regEn = new RegExp("^[~!@#$%^&*()_+<>?:{},.\/;'[\]]*$")
            if (values.pwd != undefined && values.pwd.length >= 6 && values.pwd != "") {
                console.log(1)
                if (number.test(values.pwd) || new RegExp("^\w*$").test(values.pwd) || regEn.test(values.pwd)) {
                    console.log(values.pwd)
                    this.setState({
                        AqPercentSum: 30,
                        forgetmmClock: "red",
                        AqPercentx: "弱"
                    });
                } else if (number.test(values.pwd) && regEn.test(values.pwd)) {
                    this.setState({
                        AqPercentSum: 60,
                        forgetmmClock: "yellow",
                        AqPercentx: "中"
                    });
                } else {
                    this.setState({
                        AqPercentSum: 100,
                        forgetmmClock: "green",
                        AqPercentx: "强"
                    });
                }
            } else {


            }

        })

    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(ModifyPassword)