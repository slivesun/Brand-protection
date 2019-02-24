import Tpl from './tpl';
import ajax from '../../../js/common/ajax'
import { Form, message } from 'antd';
import getCookie from '../../../js/common/lib'
import crypto from '../../../js/common/crypto';
class Login extends React.Component {
    constructor(props) {
        // document.title = '登录';
        super(props)
        this.state = {
            show: true,
            Focus: false,
            onpwd: false,
            onyzm: false,
            loginxs: false,
            urlsrc: "/hcm/code",
            Errortit: "用户名或密码错误",
            usertypeDIs: false,
            usertypeS: "",
            userCookie: null,
            titX:true,
            checked: true//记住账号
        };
    }
    componentDidMount() {
        window.localStorage.clear()
        if (window.location.hash.indexOf('loginu') > -1) {
            this.setState({
                usertypeDIs: false,
                usertypeS: "u"
            });

        } else if (window.location.hash.indexOf('loginc') > -1) {
            this.setState({
                usertypeDIs: true,
                usertypeS: "c"
            })

        } else {
            return
        }
        this.checkCookie()
    }


    getOs = () => {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
 
        var isOpera = userAgent.indexOf("Opera") > -1;
     
        if (isOpera) {
     
            return "Opera"
     
        }; //判断是否Opera浏览器
     
        if (userAgent.indexOf("Firefox") > -1) {
     
            return "FF";
     
        } //判断是否Firefox浏览器
     
        if (userAgent.indexOf("Chrome") > -1){
     
        return "Chrome";
    
        }
    }
    login = () => {
        if(this.getOs()=="Chrome"){
            window.location = "/user.html?#/Forgetpwd/" + this.state.usertypeS
        }else if(this.getOs()=="FF"){
            window.location = "/user.html#/Forgetpwd/" + this.state.usertypeS
        }else{
            window.location = "/user.html?#/Forgetpwd/" + this.state.usertypeS
        }
       // window.location = "/user.html?#/Forgetpwd/" + this.state.usertypeS

    }
    Trim = (str) => {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    getCookie = (name) => {
        var arr;
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    checkCookie = () => {

        if (document.cookie.length > 0) {

            if (this.getCookie("username") != null && this.getCookie("username") != "" && this.getCookie("username") != undefined) {
                this.setState({
                    userCookie: this.getCookie("username")
                })
            }

        }

    }

    setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let usertype = null;
        if (window.location.hash.indexOf('loginu') > -1) {
            usertype = 'u'
        } else if (window.location.hash.indexOf('loginc') > -1) {
            usertype = 'c'
        } else {
            return
        }
        this.props.form.validateFields((err, values) => {

            if (values.userName == undefined && values.password == undefined) {
                //console.log(values)
                this.setState({
                    loginxs: true,
                    Errortit: "请填写用户名/密码/验证码"
                });
            } else if (values.yzm == undefined) {
                this.setState({
                    loginxs: true,
                    Errortit: "验证码错误"
                });
            } else {


                this.setState({ loginxs: false });
                ajax.post('/hcm/login_login', {
                    "username": this.Trim(values.userName),
                    "password": crypto.Encrypt(values.password),
                    "code": values.yzm,
                    "usertype": usertype,
                    "invitecode": usertype == 'c' ? this.props.match.params.invitecode ? this.props.match.params.invitecode : null : null
                })
                    .then((res) => {
                        this.setState({ loginxs: false });
                        if (res.data.status == 10000) {
                            let logintype = res.data.data.logintype;
                            let catid = res.data.data.catid;
                            let realname = res.data.data.realname;
                            let roleid = res.data.data.roleid;
                            
                           // if (this.state.checked == true) {

                                var date = new Date();
                                document.cookie = "username=" + values.userName;
                                this.setCookie("username", values.userName, 3);
                                window.localStorage.setItem('logintype', logintype)
                                window.localStorage.setItem('catid', catid)
                                window.localStorage.setItem('realname', realname)
                                window.localStorage.setItem('roleid', roleid)
                                if (res.data.data.catid == null && res.data.data.logintype == 'HCM') {
                                    window.location = "/index.html#/CategorySelect";
                                } else {
                                    window.location = "/index.html#/";
                                }

                                // $.ajax({
                                //     url: '/hcm/getMenuListByUser',
                                //     method: 'GET',
                                //     dataType:'JSON',
                                //     async: false,
                                //     success:  (response)=>{
                                //         window.localStorage.setItem('menuList',JSON.stringify(response))
                                //         if (res.data.data.catid == null && res.data.data.logintype == 'HCM') {
                                //             window.location = "/index.html#/CategorySelect";
                                //         } else {
                                //             window.location = "/index.html#/";
                                //         }
                                //     },
                                //     error:  (err)=>{
                                //         if(err.status === 503){
                                //             if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
                                //                 window.location = "/user.html#/loginu";
                                //             }else{
                                //                 window.location = "/user.html#/loginc";
                                //             }
                                //             window.localStorage.clear()
                                //         } 
                                //     },
                                // })
                            // } else {
                            //     window.localStorage.setItem('logintype', logintype)
                            //     window.localStorage.setItem('catid', catid)
                            //     this.setCookie("username", values.userName, 0);
                            //     window.localStorage.setItem('realname', realname)
                            //     if (res.data.data.catid == null && res.data.data.logintype == 'HCM') {

                            //         window.location = "/index.html#/CategorySelect";
                            //     } else {
                            //         window.location = "/index.html#/";
                            //     }
                            // }



                        } else {
                            this.setState({
                                loginxs: true,
                                Errortit: res.data.message
                            });
                            message.error(res.data.message)
                        }

                    }, () => {
                        this.setState({ loginxs: true });
                    })
            }

        })
    }
    HyZ = () => {
        let data = new Date()
        this.setState({
            urlsrc: "/hcm/code?t=" + data
        });

    }
    handleClick = () => {//微信二维码登录
    //   window.location=" https://open.weixin.qq.com/connect/qrconnect?appid=wx60347aee47eb12bc&redirect_uri=http%3A%2F%2Fbrm.qmipr.com%2Fuser.html%23%2FLogIns&response_type=code&scope=snsapi_login&state=c#wechat_redirect"
        this.setState({ show: !this.state.show, loginxs: false,titX:!this.state.titX});
    }
    onFocus = () => {
        this.setState({ Focus: true });

    }
    onChange = (e) => {
        console.log(e)
        this.setState({
            checked: e.target.checked
        })


    }
    onBlur = () => {
        this.setState({ Focus: false });
    }
    onpwd = () => {
        this.setState({ onpwd: true });
    }
    onpws = () => {
        this.setState({ onpwd: false });
    }
    onyzm = () => {
        this.setState({ onyzm: true });
    }
    onyzms = () => {
        this.setState({ onyzm: false });
    }
    render() {
        return <Tpl that={this} />
    }
}

export default Form.create()(Login)