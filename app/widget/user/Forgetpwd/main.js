import Tpl from './tpl';
import ajax from '../../../js/common/ajax'
import { Form, message } from 'antd';
import crypto from '../../../js/common/crypto';
class Forgetpwd extends React.Component {
    constructor(props) {
        // document.title = '忘记密码';
        super(props)
        this.state = {
            current: 0,
            yzm: "获取验证码",
            yzmpwd: "",
            seconds: 59,//倒计时
            shows: true,//验证码提示
            forgetxs: false,//输入错误提示
            NOphone: false,//未绑定手机号
            NOphones: false,//上一步
            NODl: false,//
            AqPercent: false,//密码强度,
            AqPercentx: "弱",
            AqPercentSum: 0,
            forgetmmClock: "red",
            Pone: "",//手机号
            usertypeID: ""
        };
    }
    componentDidMount() {
        //console.log(this.props.match.params.type)

        if (this.props.match.params.type == "u") {
            this.setState({
                usertypeID: this.props.match.params.type
            })

        } else if (this.props.match.params.type == "c") {
            this.setState({
                usertypeID: this.props.match.params.type
            })
        } else {
            return
        }

    }
    state = {
        autn: '',
        lock: false
    }
    ForgetSubmit = () => {//提交用户名
        this.props.form.validateFields((err, values) => {
            //console.log(this.state.usertypeID)

            if (!err) {

                if (this.state.current == 0 && values.userName != undefined) {

                    ajax.post('/hcm/login/getUserByNameOrMobile', {
                        "name": this.Trim(values.userName),
                        "usertype": this.state.usertypeID
                    })
                        .then((res) => {
                            console.log(res)
                            if (res.data.status == 10000) {
                                console.log(res.data.data)
                                if (res.data.data != null && res.data.data.mobile != undefined && res.data.data.mobile != "") {
                                    const current = this.state.current + 1;
                                    this.setState({
                                        yzm: "获取验证码",
                                        shows: true,
                                        forgetxs: false,
                                        Pone: res.data.data.mobile,
                                        current
                                    })
                                } else {
                                    const current = this.state.current + 1;
                                    this.setState({
                                        yzm: "获取验证码",
                                        shows: true,
                                        forgetxs: false,
                                        Pone: "",
                                        NOphone: true,
                                        NOphones: true,
                                        current
                                    })
                                }



                            } else {

                                this.setState({
                                    forgetxs: true
                                })
                                console.log(1)
                            }
                        })
                } else if (this.state.current == 1) {
                    console.log(values.yzm, "验证码")

                    if (values.yzm != undefined) {
                        ajax.post('/hcm/login/validateSMS', {
                            "mobile": this.state.Pone,
                            "usertype": this.state.usertypeID,
                            "code": values.yzm
                        })
                            .then((res) => {
                                console.log(res)
                                if (res.data == true) {
                                    const current = this.state.current + 1;
                                    this.setState({
                                        AqPercent: true,
                                        forgetxs: false,
                                        current
                                    })
                                } else {
                                    this.setState({
                                        forgetxs:true
                                    })
                                }
                            })
                    } else {
                        this.setState({
                            forgetxs:true
                        })
                    }
                } else if (this.state.current == 2) {
                    if(values.pws!="" && values.pws!=undefined && values.spws!="" && values.spws!=undefined){
                        if (this.Trim(values.pws) == this.Trim(values.spws)) {
                            if (this.Trim(values.pws).length >= 6) {
                                console.log(values.pws.length)
                                if (this.Trim(values.pws).length <= 16) {
                                    ajax.post('/hcm/login/updatePasswordBySMS', {
                                        "username": this.state.Pone,//this.state.pws
                                        "password": crypto.Encrypt(values.pws),
                                        "usertype": this.state.usertypeID
                                    }).then((res) => {
                                        console.log(res)
                                        if (res.data.status == 10000) {
                                            const current = this.state.current + 1;
                                            this.setState({ current });
                                            this.setState({
                                                NODl: true,
                                                NOphones: true
                                            })
                                        }
                                    })
                                } else {
                                    message.error('密码最多16位')
                                }
                            } else {
    
                                message.error('密码不能少于6位')
                            }
    
                        } else if (this.Trim(values.pws) == "" || this.Trim(values.spws) == "") {
                            this.setState({
                                forgetxs: true
                            })
                        } else {
                            this.setState({
                                forgetxs: true
                            })
                        }
                    }else{
                        message.error("密码不能为空！")
                    }
                    
                } else {
                    this.setState({
                        forgetxs: true
                    })
                }
            } else {
                this.setState({
                    forgetxs: true
                })
            }

        })
    }
    BACK = () => {

        const current = this.state.current - 1;
        this.setState({
            current,
            NOphone: false,
            NOphones: false
        });

    }
    Trim = (str) => {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    onBlur = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            let number = new RegExp("^[0-9]*$");
            let regEn = new RegExp("^[~!@#$%^&*()_+<>?:{},.\/;'[\]]*$")
            if (values.pws != undefined && values.pws.length >= 6) {
                if (number.test(values.pws) || new RegExp("^\w*$").test(values.pws) || regEn.test(values.pws)) {
                    this.setState({
                        AqPercentSum: 30,
                        forgetmmClock: "red",
                        AqPercentx: "弱"
                    });
                } else if (number.test(values.pws) && regEn.test(values.pws)) {
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
    onChangeAutn = (autn) => {
        //console.log(autn)
        this.setState({
            autn
        });
    }
    getAuthCode = () => {
        const { value, lock, yzm, yzmpwd } = this.state
        console.log(value)
        if (!lock == true && yzmpwd == "" && this.state.Pone != "") {
            // this.setState({
            //     forgetxs:false
            // })
            if (yzm == "获取验证码") {
                console.log(this.state.current)
                console.log(this.state.Pone)
                if (this.state.seconds == 59) {
                    if (this.state.Pone != "未绑定手机号") {
                        let siv = setInterval(() => {
                            this.setState({
                                yzm: `${this.state.seconds--}s后重新发送`,
                                shows: false,
                                forgetxs: false
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
                        ajax.post('/hcm/login/sendSMS', {
                            "mobile": this.state.Pone,
                            "codeType": "HCM_PWD",
                            "usertype": this.state.usertypeID
                        })
                            .then((res) => {
                                console.log(res)

                            })
                        
                    }
                } else {
                    if (this.state.Pone != "未绑定手机号") {
                        let siv = setInterval(() => {
                            this.setState({
                                yzm: `${this.state.seconds--}s后重新发送`,
                                shows: false,
                                forgetxs: false
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
                        ajax.post('/hcm/login/sendSMS', {
                            "mobile": this.state.Pone,
                            "codeType": "HCM_PWD",
                            "usertype": this.state.usertypeID
                        })
                            .then((res) => {
                                console.log(res)

                            })
                       
                    }
                }


            }
        }
    }


    prev = () => {

        if (this.state.current == 0) {
            const current = this.state.current;
            this.setState({ current });
        } else {
            this.setState({
                yzm: "获取验证码",
                shows: true,
                forgetxs: false,
                AqPercent: false
            });
            const current = this.state.current - 1;
            this.setState({ current });

        }

    }
    DL = () => {
        window.location = "/user.html#/login" + this.state.usertypeID
        
    }
    GOdl = () => {
        window.location = "/user.html#/login" + this.state.usertypeID
       
    }
    render() {
        return <Tpl that={this} />
    }
}

export default Form.create()(Forgetpwd)