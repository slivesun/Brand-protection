import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, message } from 'antd';

class ModifyBindings extends React.Component {
    constructor(props) {
        // document.title = '修改手机';
        super(props)
        this.state = {
            yzm: "获取验证码",
            forgetxs: false,//输入错误提示
            shows: true,
            seconds: 59,//倒计时,
            secondx:59,
            current: 0,
            Pone: "",
            yzmx: "获取验证码",
            dataType:true
        }


    }
    componentDidMount() {
        this.DidMountText()
        console.log(this.props.match.params.km)
    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    prev=()=>{
        const current = this.state.current - 1;
        this.setState({
            current,
            forgetxs: false
        })
    }
    GOTOF=()=>{

        window.location="/index.html#/DataInformatio"+this.props.match.params.km
    }
    DidMountText = () => {
       // console.log(document.cookie.split(";")[1].split("=")[1])
        //console.log(this.props)
        this.setState({
            Pone: this.props.match.params.pone
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
    MEbtns = (e) => {
        this.props.form.validateFields((err, values) => {
            if (values.yzmx != undefined && values.yzmx != "") {
                if (this.state.dataType ==false) {
                    this.setState({
                        forgetxs: true
                    })
                }
            } else {
                message.error("请输入验证码！")
            }
        })
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (this.state.current == 0) {
                if (values.yzmx != undefined && values.yzmx != "") {

                    ajax.post('/hcm/login/validateSMS', {
                        mobile: this.props.match.params.pone,
                        code: values.yzmx
                    }).then((res) => {
                        console.log(res)
                        if (res.data == true) {
                            const current = this.state.current + 1;
                            this.setState({
                                current,
                                forgetxs: false,
                                shows:true
                            })
                            
                            
                        }else if(res.data == false){

                            this.setState({
                                dataType:false
                            })
                        }

                    })

                }

            } else if (this.state.current == 1) {
                if (values.pones != undefined && values.pones != "") {
                    if (values.yzms != undefined && values.yzms != "") {
                        ajax.post('/hcm/login/validateSMS', {
                            mobile: values.pones,
                            code: values.yzms
                        }).then((res) => {
                            console.log(res)
                            if(res.data==true && res.status==200){  
                                ajax.post('/hcm/user/updatemobile', {
                                    mobile: values.pones
                                }).then((res) => {
                                    console.log(res)
                                    const current = this.state.current + 1;
                                    this.setState({
                                        current,
                                        forgetxs: false
                                    })
                                })
                               
                            }
                             
                        })
                    } else {
                        // message.error("请输入验证码！")
                    }
                } else {
                    // message.error("请输入手机号！")
                }
            }else if(this.state.current ==2){

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


                if (this.state.yzm == "获取验证码") {

                    if (this.state.secondx == 59) {
                        
                        ajax.post('/hcm/login/sendSMS', {
                            mobile: values.pones,
                            codeType: "HCM_BIND",
                            usertype: this.props.match.params.type
                        }).then((res) => {
                            if (res.data.status == 10000) {
                                let siv = setInterval(() => {
                                    this.setState({
                                        yzm: `${this.state.secondx--}s后重新发送`,
                                        shows: false,
                                        forgetxs: false,
                                        shows: false
                                    }, () => {
                                        if (this.state.secondx == 1) {
                                            clearInterval(siv);
                                            this.setState({
                                                yzm: "获取验证码",
                                                shows: true,
                                                secondx: 59
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
                                        yzm: `${this.state.secondx--}s后重新发送`,
                                        shows: false,
                                        forgetxs: false,
                                    }, () => {
                                        if (this.state.secondx == 1) {
                                            clearInterval(siv);
                                            this.setState({
                                                yzm: "获取验证码",
                                                shows: true,
                                                secondx: 59
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
                message.error("请输入手机号")
            }
        })
    }
    getAuthCodex = () => {
        this.setState({
            forgetxs: false
        })
        if (this.state.yzmx == "获取验证码") {

            if (this.state.seconds == 59) {
               
                ajax.post('/hcm/login/sendSMS', {
                    mobile: this.state.Pone,
                    codeType: "HCM_UPM",
                    usertype: this.props.match.params.type
                }).then((res) => {
                    if (res.data.status == 10000) {
                        let siv = setInterval(() => {
                            this.setState({
                                yzmx: `${this.state.seconds--}s后重新发送`,
                                shows: false,
                                forgetxs: false,
                            }, () => {
                                if (this.state.seconds == 1) {
                                    clearInterval(siv);
                                    this.setState({
                                        yzmx: "获取验证码",
                                        shows: true,
                                        seconds: 59
                                    });
                                }
                            });
                        }, 1000)
                    } 
                })



            } else {
                
                ajax.post('/hcm/login/sendSMS', {
                    mobile: this.state.Pone,
                    codeType: "HCM_UPM",
                    usertype: this.props.match.params.type
                }).then((res) => {
                    if (res.data.status == 10000) {
                        let siv = setInterval(() => {
                            this.setState({
                                yzmx: `${this.state.seconds--}s后重新发送`,
                                shows: false,
                                forgetxs: false
                            }, () => {
                                if (this.state.seconds == 1) {
                                    clearInterval(siv);
                                    this.setState({
                                        yzmx: "获取验证码",
                                        shows: true,
                                        seconds: 59
                                    });
                                }
                            });
                        }, 1000)
                    }
                })

            }


        }
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(ModifyBindings)