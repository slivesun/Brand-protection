import Tpl from './tpl';
import { Form, message } from 'antd';
import ajax from '../../../js/common/ajax'
import crypto from '../../../js/common/crypto';
import Reg from '../../../js/common/lib'
class App extends React.Component {
    constructor(props) {
        // document.title = '注册信息阅读';
        super(props)
        this.state = {
            company: '',
            regstatus: true,
            currents: 0,
            yzm: "获取验证码",
            yzmpwd: "",
            forgetxs: false,//输入错误提示
            shows: true,
            AqPercent: false,//密码强度,
            AqPercentx: "弱",
            AqPercentSum: 0,
            forgetmmClock: "red",
            paragraphName: "",
            seconds: 59,//倒计时,
            invitecode: "",//邀请码
            bmcid: "",//品牌商id，
            dealerid: ""//经销商id
        }
    }
    componentDidMount() {
        //console.log(this.props.match.params.id)
        ajax.post('/hcm/login/getBmainCustomerByInvitecode', {
            invitecode: this.props.match.params.id
        })
            .then((res) => {
                //console.log(res)
                if (res.data.status == 10000) {
                    if (res.data.data != null) {
                        this.setState({
                            company: res.data.data.companyname,
                            invitecode: this.props.match.params.id
                        })
                    } else {
                        message.error('邀请码无效')
                    }

                } else {
                    message.error('请求失败')
                }
            })
    }
    BACKs = () => {
        // console.log(this.props.match.params.id)
        this.setState({
            regstatus: true,
            paragraphName:""
        })
        const { form: { resetFields, getFieldsValue } } = this.props
        //console.log(this.props)
        resetFields()
        // window.location="/user.html#/Registered/"+this.props.match.params.id
    }
    onBlurx = () => {
        this.props.form.validateFields((err, values) => {
            //console.log(values)

            if (values.paragraph.length >= 15) {
                ajax.post('/hcm/login/registerTaxNum', {
                    "taxNum": values.paragraph
                })
                    .then((res) => {
                        if (res.data.status == 10150) {

                            message.error(res.data.message)
                        } else {
                            if (res.data.data != "查询无结果") {
                                this.setState({
                                    paragraphName: res.data.data
                                })
                            } else {
                                this.setState({
                                    paragraphName: ""
                                })
                                message.error(res.data.data)
                            }

                        }


                    })
            } else {
                message.error('请输入正确税号')
            }

        })
    }
    regStatus = (bl) => {
        this.setState({
            regstatus: bl
        })
    }
    SUBDl = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.pwd == undefined && values.pwds == undefined && values.yzms == undefined && values.pones == undefined) {
                if (values.pwd != values.pwds) {
                    message.error('两次密码不一致')
                }
                message.error('请输入密码/验证码')
            }
        })
    }
    trim = (s) => {
        s = `${s}`;
        return s.replace(/(^\s*)|(\s*$)/g, "");
    }
    Reg = (str = '') => {
        var patt = /^[^\u4e00-\u9fa5]{5,31}$/;
        return patt.test(this.trim(str ? str : ''))
    }

    ForgetSubmit = (e) => {//提交用户名
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log(values)
            if (!err) {
                console.log(values)
                if (values.SucceBTN == "提交信息") {
                    if (this.state.currents == 0) {
                        if (values.name == "" || values.name == undefined) {
                            message.error("请输入公司名称")

                        } else {
                            if (values.paragraph == undefined || values.paragraph == "") {
                                message.error("请获取正确的公司税号")

                            } else {
                                if (values.region == undefined || values.region == "") {
                                     message.error("请选择地区")
                                    // if (values.TakeOve == undefined || values.TakeOve == "") {
                                    //     message.error("请输入对接人")

                                    // } else {
                                    //     if (values.ContactInformation == undefined || values.ContactInformation == "") {

                                    //         message.error("请输入联系方式")
                                    //     } else {
                                    //         if (this.Reg(values.ContactInformation) == true) {
                                    //                 ajax.post('/hcm/login/dealerRegister', {
                                    //                     invitecode: this.state.invitecode,//邀请码
                                    //                     dealername: values.name,//公司名称
                                    //                     dutynumber: values.paragraph,//公司税号
                                    //                     province: [],//省份
                                    //                     city: [],//城市
                                    //                     strict: [],//区
                                    //                     address: values.Details,//详细地址
                                    //                     contact: values.ContactInformation,//联系方式
                                    //                     takePeople: values.TakeOve,//对接人
                                    //                 })
                                    //                     .then((res) => {
                                    //                         // console.log(res, "olo")
                                    //                         if (res.data.status == 10000) {
                                    //                             const currents = this.state.currents + 1;
                                    //                             this.setState({
                                    //                                 currents,
                                    //                                 bmcid: res.data.data.bmcid,//品牌商id，
                                    //                                 dealerid: res.data.data.dealerid//经销商id
                                    //                             })
                                    //                         } else {
                                    //                             message.error(res.data.message)
                                    //                         }

                                    //                     })
                                                
                                    //         } else {
                                    //             message.error("请输入正确联系方式")
                                    //         }

                                    //     }
                                    // }
                                } else {
                                    // if (values.Details == undefined || values.Details == "") {
                                    //   message.error("请输入详情地址")

                                    // } else {
                                    if (values.TakeOve == undefined || values.TakeOve == "") {
                                        message.error("请输入对接人")

                                    } else {
                                        if (values.ContactInformation == undefined || values.ContactInformation == "") {

                                            message.error("请输入联系方式")
                                        } else {
                                            if (this.Reg(values.ContactInformation) == true) {
                                                console.log(this.Reg(values.ContactInformation))
                                                if (values.region[2] != undefined && values.region[2] != "") {
                                                    ajax.post('/hcm/login/dealerRegister', {
                                                        invitecode: this.state.invitecode,//邀请码
                                                        dealername: values.name,//公司名称
                                                        dutynumber: values.paragraph,//公司税号
                                                        province: values.region[0],//省份
                                                        city: values.region[1],//城市
                                                        strict: values.region[2],//区
                                                        address: values.Details,//详细地址
                                                        contact: values.ContactInformation,//联系方式
                                                        takePeople: values.TakeOve,//对接人
                                                    })
                                                        .then((res) => {
                                                            // console.log(res, "olo")
                                                            if (res.data.status == 10000) {
                                                                const currents = this.state.currents + 1;
                                                                this.setState({
                                                                    currents,
                                                                    bmcid: res.data.data.bmcid,//品牌商id，
                                                                    dealerid: res.data.data.dealerid//经销商id
                                                                })
                                                            } else {
                                                                message.error(res.data.message)
                                                            }

                                                        })
                                                } else {
                                                    ajax.post('/hcm/login/dealerRegister', {
                                                        invitecode: this.state.invitecode,//邀请码
                                                        dealername: values.name,//公司名称
                                                        dutynumber: values.paragraph,//公司税号
                                                        province: values.region[0],//省份
                                                        city: values.region[1],//城市
                                                        strict: "",//区
                                                        address: values.Details,//详细地址
                                                        contact: values.ContactInformation,//联系方式
                                                        takePeople: values.TakeOve,//对接人
                                                    })
                                                        .then((res) => {
                                                            // console.log(res, "olo")
                                                            if (res.data.status == 10000) {
                                                                const currents = this.state.currents + 1;
                                                                this.setState({
                                                                    currents,
                                                                    bmcid: res.data.data.bmcid,//品牌商id，
                                                                    dealerid: res.data.data.dealerid//经销商id
                                                                })
                                                            } else {
                                                                message.error(res.data.message)
                                                            }

                                                        })
                                                }
                                            } else {
                                                message.error("请输入正确联系方式")
                                            }

                                        }
                                    }
                                    //  }
                                }
                            }
                        }

                    } else if (this.state.currents == 1) {
                        if (values.pones != undefined) {
                            if (values.pwd != undefined && values.pwd != "" && values.yzms != undefined && values.yzms != "") {
                                this.setState({
                                    forgetxs: false
                                })
                                // console.log(this.state.bmcid,this.state.dealerid)
                                if (values.pwd == values.pwds) {
                                    if (this.Trim(values.pwd).length >= 6) {
                                        if (this.Trim(values.pwd).length <= 16) {

                                            ajax.post('/hcm/login/validateSMS', {
                                                mobile: values.pones, //手机号
                                                code: values.yzms//验证码
                                            }).then((res) => {
                                                console.log(res, "olo")
                                                if (res.data == true && res.status == 200) {
                                                    ajax.post('/hcm/login/registerUserout', {
                                                        mobile: values.pones, //手机号
                                                        //smscode: values.yzms,//验证码
                                                        password: crypto.Encrypt(values.pwd),// 密码
                                                        dealerid: this.state.dealerid,//经销商id
                                                        bmcid: this.state.bmcid
                                                    }).then((res) => {
                                                        console.log(res, "olo")
                                                        if (res.data.status == 10000) {
                                                            const currents = this.state.currents + 1;
                                                            this.setState({
                                                                currents,
                                                                forgetxs: false
                                                            })
                                                        } else {
                                                            message.error(res.data.message)
                                                        }

                                                    })
                                                } else {
                                                    message.error(res.data.message)
                                                }

                                            })


                                        } else {
                                            message.error("密码最多只能16位！")
                                        }
                                    } else {
                                        message.error("密码最少需要6位！")
                                    }
                                } else {
                                    message.error("两次密码不一致！")
                                }
                            } else {
                                message.error("请输入密码/验证码")
                            }
                        }
                    }
                }

            }
        })
    }
    Trim = (str) => {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    getAuthCode = () => {
        this.setState({
            forgetxs: false
        })
        console.log(this.state.forgetxs)
        const { value, lock, yzm, yzmpwd } = this.state

        this.props.form.validateFields((err, values) => {
            if (!lock == true && yzmpwd == "") {
                // this.setState({
                //     forgetxs:false
                // })
                if (values.pones != undefined) {


                    if (yzm == "获取验证码") {

                        if (this.state.seconds == 59) {

                            ajax.post('/hcm/login/sendSMS', {
                                "mobile": values.pones,
                                "codeType": "HCM_BIND",
                                "usertype": "c"
                            })
                                .then((res) => {
                                    //console.log(res)
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
                                        message.error(res.data.message)
                                    }

                                })

                        } else {
                            ajax.post('/hcm/login/sendSMS', {
                                "mobile": values.pones,
                                "codeType": "HCM_BIND",
                                "usertype": "c"
                            })
                                .then((res) => {
                                    console.log(res)
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
                                        message.error(res.data.message)
                                    }

                                })
                        }


                    }
                } else {
                    message.error("请输入手机号")
                }
            }
        })
    }
    onBlur = () => {
        this.props.form.validateFields((err, values) => {
            // console.log(values)
            let number = new RegExp("^[0-9]*$");
            let regEn = new RegExp("^[~!@#$%^&*()_+<>?:{},.\/;'[\]]*$")
            if (values.pwd != undefined && values.pwd.length >= 6) {
                console.log(1)
                if (number.test(values.pwd) || new RegExp("^\w*$").test(values.pwd) || regEn.test(values.pwd)) {
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
    next = () => {
        const current = this.state.currents + 1;
        this.setState({ currents: current });
    }

    prev = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        //console.log(this.props)
        resetFields()
       
        const current = this.state.currents - 1;
        this.setState({ currents: current,paragraphName:"" });
        console.log(current)
    }

    Gdl = () => {
        window.location = "/user.html#/loginc"
    }

    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App)