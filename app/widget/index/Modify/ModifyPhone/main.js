import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, message } from 'antd';

class ModifyPhone extends React.Component {
    constructor(props) {
        // document.title = '修改手机';
        super(props)
        this.state = {
            yzm: "获取验证码",
            forgetxs: false,//输入错误提示
            shows: true,
            seconds: 59//倒计时,

        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    DidMountText = () => {
        // console.log(this.props.match.params.pone)
        //console.log(this.props.match.params.type)
    }
    BJBtn = () => {
        this.setState({
            visible: true,
            confirmLoading: true
        })
    }
    MEbtn = (e) => {
        this.props.form.validateFields((err, values) => {
            if (values.pones != undefined && values.pones != "") {
                if (values.yzms != undefined && values.yzms != "") {

                } else {
                    message.error("请输入验证码！")
                }
            } else {
                message.error("请输入手机号！")
            }
        })
    }
    Trim = (str) => {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.pones != undefined && values.pones != "") {
                const han = /[\u4E00-\u9FA5]/i;
                if (!han.test(values.pones)) {
                    if (values.yzms != undefined && values.yzms != "") {
                        if (this.Trim(values.pones).length >= 6 && this.Trim(values.pones).length <= 16) {
                            ajax.post('/hcm/login/validateSMS', {
                                mobile: values.pones,
                                code: values.yzms
                            }).then((res) => {
                                console.log(res)
                                if (res.data == true && res.status == 200) {
                                    ajax.post('/hcm/user/updatemobile', {
                                        mobile: values.pones
                                    }).then((res) => {
                                        console.log(res)
    
                                        window.history.go(-1)
                                    })
                                }
    
                            })
                        }else{
                            message.error("格式长度不对！")
                        }
                    } else {
                        // message.error("请输入验证码！")
                    }
                }else{
                    message.error("请输入正确格式！")
                }
               
            } else {
                // message.error("请输入手机号！")
            }
        })
    }
    getAuthCode = () => {
        this.setState({
            forgetxs: false
        })

        this.props.form.validateFields((err, values) => {
            console.log(values)
            // this.setState({
            //     forgetxs:false
            // })
            if (values.pones != undefined && values.pones != "") {
                const han = /[\u4E00-\u9FA5]/i;
                if (!han.test(values.pones)) {
                    if (this.state.yzm == "获取验证码") {

                        if (this.state.seconds == 59) {

                            ajax.post('/hcm/login/sendSMS', {
                                mobile: values.pones,
                                codeType: "HCM_BIND",
                                usertype: this.props.match.params.type
                            }).then((res) => {
                                if (res.data.status == 10000) {
                                    let siv = setInterval(() => {
                                        this.setState({
                                            yzm: `${this.state.seconds--}s后重新发送`,
                                            shows: false,
                                            forgetxs: false,
                                            shows: false
                                        }, () => {
                                            if (this.state.seconds == 1) {
                                                clearInterval(siv);
                                                this.setState({
                                                    yzm: "获取验证码",
                                                    shows: true,
                                                    seconds: 59
                                                });
                                            }
                                        });
                                    }, 1000)
                                } else if (res.data.status == 400) {
                                    this.setState({
                                        forgetxs: true
                                    })
                                }
                                console.log(res)
                            })



                        } else {

                            ajax.post('/hcm/login/sendSMS', {
                                mobile: values.pones,
                                codeType: "HCM_BIND",
                                usertype: this.props.match.params.type
                            }).then((res) => {
                                if (res.data.status == 10000) {
                                    let siv = setInterval(() => {
                                        this.setState({
                                            yzm: `${this.state.seconds--}s后重新发送`,
                                            shows: false,
                                            forgetxs: false,
                                            shows: false
                                        }, () => {
                                            if (this.state.seconds == 1) {
                                                clearInterval(siv);
                                                this.setState({
                                                    yzm: "获取验证码",
                                                    shows: true,
                                                    seconds: 59
                                                });
                                            }
                                        });
                                    }, 1000)
                                } else if (res.data.status == 400) {
                                    this.setState({
                                        forgetxs: true
                                    })
                                }
                                console.log(res)
                            })
                        }


                    }
                } else {
                    message.error("请输入正确格式！")
                }


            } else {
                message.error("请输入手机号！")
            }
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(ModifyPhone)