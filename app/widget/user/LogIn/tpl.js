import ThatMain from '../../HOC/That';
import { Carousel, Layout, Form, Icon,Input, Button, Checkbox  } from 'antd';
import Footer from "../../components/Copyright"

const FormItem = Form.Item;

const { Header, Sider, Content } = Layout;

const Tpl = ThatMain((that) => {
    //console.log(that.props.form)
    // return null
    let { match } = that.props;
    //console.log(match)

    const { getFieldDecorator } = that.props.form;

    let shows = that.state.show ? "block" : "none";//密码登录显示

    let hide = that.state.show ? "none" : "block";//微信扫码登录隐藏
    let showimg = that.state.show ? "../../../img/icon_Login_QR code.png" : "../../../img/icon_Login_Password_login.png"
    let texts = that.state.show ? "微信登录" : "密码登录"
    let tits = that.state.show ? "密码登录" : "微信登录"
    let style = {
        display: shows,
        img: showimg,
        texts: texts,
        tits: tits
    }
    let stylehides = {
        display: hide
    }
    //输入框icon
    let use = that.state.Focus ? "url(../../../img/loginuser_1.png)  no-repeat" : "url(../../../img/loginuser_1s.png)  no-repeat";//密码登录显示
    let pwd = that.state.onpwd ? "url(../../../img/loginuser_2.png)  no-repeat" : "url(../../../img/loginuser_2s.png)  no-repeat";//密码登录显示
    let yzm = that.state.onyzm ? "url(../../../img/loginuser_3.png)  no-repeat" : "url(../../../img/loginuser_3s.png)  no-repeat";//密码登录显示
    let loginx = that.state.loginxs ? " block " : "none";//用户名是否正确提示
    let usertypeDIsx=that.state.usertypeDIs ? " block " : "none";//用户名是否正确提示
    
    let loginxs = {
        display: loginx,
        width:"330px",
        height:"40px"
    }
    // let usertypeDIs={
    //     display:usertypeDIsx
    // }
    return (
        <div className="LoginBox">
            <Header className="headerlog" >
                <span><a><img style={{verticalAlign:'middle',height:'34px'}} src='../../../img/logo_page.png'/></a></span>
                {/* <ul style={usertypeDIs}>
                    <li>产品介绍</li>
                    <li>求美官网</li>
                </ul> */}
            </Header>
            <Layout className="boxlong">
                <div className="Login_Right">
                    <div className="H1tit">
                        {
                            that.state.titX==true?<h2>{tits}</h2>:null
                        }
                        
                    </div>
                    <div className="icon_Login_QR">
                        <span>{texts}</span> <b></b>
                        <img onClick={that.handleClick} src={style.img} />
                    </div>

                    {/* 密码登录 */}

                    <Form onSubmit={that.handleSubmit} style={style}  className="login-form">
                        
                    <div className="usersTS" style={loginxs}> 
                        
                        <img src="../../../img/icon_Login_prompt_failure.png" style={{marginTop:"8px",float:"left",marginRight:"10px"}}  /> <b style={{lineHeight:"30px"}}>{that.state.Errortit}</b> </div>
                        <FormItem>
                            {getFieldDecorator('userName',{
                                initialValue: that.state.userCookie
                            })(
                                <Input className='user-name' maxLength="32" prefix={<Icon type="user" style={{
                                    color: 'rgba(0,0,0,0)',
                                    background: use,
                                    height: "23px",
                                    display: 'inline-block',
                                    width: "23px",
                                    margin: "0px 5px"
                                }} />} placeholder="用户名/手机号"
                                    onFocus={that.onFocus}
                                    onBlur={that.onBlur}
                                />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password')(
                                <Input className='pass-word' maxLength="32" prefix={<Icon type="lock" style={{
                                    color: 'rgba(0,0,0,0)',
                                    background: pwd,
                                    height: "23px",
                                    display: 'inline-block',
                                    width: "23px",
                                    margin: "0px 5px"
                                }} />} type="password"
                                    placeholder="密码"
                                    onFocus={that.onpwd}
                                    onBlur={that.onpws}
                                />
                                )}
                        </FormItem>
                        <FormItem className="yzmbox">
                            {getFieldDecorator('yzm')(
                                <Input className="yzm" prefix={<Icon type="lock" style={{
                                    color: 'rgba(0,0,0,0)',
                                    background: yzm,
                                    height: "23px",
                                    display: 'inline-block',
                                    width: "23px",
                                    margin: "0px 5px"
                                }} />} type="text" placeholder="验证码"
                                    onFocus={that.onyzm}
                                    onBlur={that.onyzms} />
                                )}
                            <div className="ant-rowsx">
                                <span className="hyzimg">
                                    <img src={that.state.urlsrc}/>
                                </span>
                                <span className="hyz" onClick={that.HyZ} >
                                    换一张
                                </span>
                            </div>
                        </FormItem>
                        
                        <FormItem>

                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox  onChange={that.onChange}>记住账号</Checkbox>
                                )} */}
                            <a onClick={that.login} className="wjma">忘记密码</a>
                            <br />
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </FormItem>
                        <div>
                            <span>
                                <img src="../../../img/icon_Login_ WeChat_hover.png" style={{marginTop:"4px",float:"left",marginRight:"10px"}} />
                            </span><span className="wxSM_dl" onClick={that.handleClick}>微信扫码登录</span>
                        </div>
                    </Form>
                    {/* 微信二维码登录 */}

                    <div className="wx_ewmbox" style={stylehides}>
                        <iframe className="ifrm" src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx5a234db344041ccf&redirect_uri=https%3A%2F%2Fbrm.olonger.com%2Fuser.html%23%2FLogIns&response_type=code&scope=snsapi_login&state=${window.location.hash.indexOf('loginu') > -1 ? 'u':'c'}#wechat_redirect`}></iframe>
                         {/* <p>请使用微信扫描二维码登录</p>
                        <h4 onClick={that.handleClick}>使用账号登录</h4> */}
                    </div>
                </div>
            </Layout>

            <Footer className='Copyright'></Footer>

        </div>
    )

})
export default Tpl