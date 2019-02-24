import ThatMain from '../../HOC/That';
import {
    Carousel, Layout, Steps,
    Button, message, List,
    Form, Icon, Input, Checkbox,
    Tooltip, Progress
} from 'antd';
import Footer from "../../components/Copyright"

const FormItem = Form.Item;

const { Header } = Layout;

const Step = Steps.Step;



const Tpl = ThatMain((that) => {
    //console.log(that.props.form)
    // return null
    let { match } = that.props;


    const { getFieldDecorator } = that.props.form;

    const { yzm } = that.state
    let shows = that.state.shows ? " none " : "block";//验证码发送提示
    let style = {
        display: shows
    }

    let forgetx = that.state.forgetxs ? " block " : "none";//用户名是否正确发送提示
    let forgetxs = {
        display: forgetx
    }
    let NOphones = that.state.NOphone ? " block " : "none";//未绑定手机号
    let NOphonesx = that.state.NOphones ? "none " : "block";//未绑定手机号
    let NODL = that.state.NODl ? " block " : "none";//登录（上一步Btn）
    let NOphone = {
        display: NOphones
    }
    let GoFh = {
        display: NOphones,
        marginLeft:"-35px"
    }
    let NOphonex = {
        display: NOphonesx
    }
    let NODLs = {
        display: NODL
    }
    let AqPercents = that.state.AqPercent ? " block " : "none"; 
    let AqPercent = { 
        display:AqPercents
     }//登录（上一步Btn）
    let forgetmmClock = { color: that.state.forgetmmClock }
    const steps = [{
        title: '填写账号',
        content: <div className="forget-form">
            <div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> 用户名不存在</div><br /><br />
            <div className="FORMtit">用户名</div>
            <FormItem className="tops">
                {getFieldDecorator('userName')(
                    <Input className='user-name'
                            maxLength="32"
                        placeholder="用户名/手机号"
                    />
                )}
            </FormItem>
        </div>,
        text: "请填写你要找回密码的账号"
    }, {
        title: '身份认证',
        content: <div className="forget-form" style={NOphonex}>
            <div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> 验证码有误，请重新获取。</div><br /><br />
            <div className="FORMtit">手机号</div>
            <FormItem className="tops">
                <p>{that.state.Pone}</p>
            </FormItem>
            <div className="FORMtit">验证码</div>
            <div className="ant-row ant-form-item tops">
                <FormItem className="topsxs">
                    {getFieldDecorator('yzm')(
                        <Input className='user-yzm'
                                maxLength="6"
                            placeholder="输入验证码"
                        />
                    )}
                </FormItem>
                <Button className="get-code" onClick={() => that.getAuthCode()} >
                    {yzm}
                </Button>
            </div>
            {/* <div className="ForgetTS" style={style}>
                <span><img src="../../../img/icon_Login_success.png" /></span>

                <span>验证码已发送到你的手机，5分钟内输入有效验证码等同于密码，打死也不能告诉别人!</span>
            </div> */}
        </div>,
        text: "我需要验证一下你是不是自己人",
        NOphone: <div className="NOponetit" style={NOphone}>
            <img src="../../../img/icon_Login_failure.png" />
            <p>当前账号下未绑定手机号，暂不能找回密码！</p>
        </div>
    }, {
        title: '设置新密码',
        content: <div className="forget-form" style={NOphonex}>
            <div className="userTS" style={forgetxs}>
                <img src="../../../img/icon_Login_failure.png" /> 两次输入的密码不同，请重新输入。</div><br /><br />
            <div className="FORMtit">新密码</div>
            <FormItem className="tops">
                {getFieldDecorator('pws')(
                    <Input className='user-name'
                        type="password"
                        placeholder="请输入新密码"
                        onBlur={() => that.onBlur()}
                    />
                )}
            </FormItem>
            <div className="FORMtits">确认新密码</div>
            <FormItem className="tops">
                {getFieldDecorator('spws')(
                    <Input className='user-name'
                        type="password"
                        placeholder="请确认新密码"
                    />
                )}
            </FormItem>
        </div>,
        text: "现在你可以填写你的新密码了"
    }, {
        title: '设置成功',
        content: <div className="NOponetits" >
            <img src="../../../img/icon_Login_success.png" />
            <h4>设置成功</h4>
            <p>登录时请使用新密码</p>
        </div>,
        text: "新密码已经帮你改好"
    }];

    return (
        <div className="ForgetpwdBox">
            <Header className="headerForgetpwd" >
                <span><a><img style={{verticalAlign:'middle',height:'34px'}} src='../../../img/logo.png'/></a></span>
            </Header>
            <Layout className="boxForgetpwd">
                <div className="boxForgetpwdtit">BRM系统账号找回密码</div>
                <div className="FORSteps">
                    <Form onSubmit={that.ForgetSubmit} className="forget-form">

                        <Steps current={that.state.current} style={{marginTop:"20px"}}>
                            {steps.map(item => <Step key={item.title} title={item.title} description={item.text} />)}

                        </Steps>
                        <div className="steps-content">{steps[that.state.current].content}
                            {steps[that.state.current].NOphone}
                        </div>

                        <div className="steps-action">
                            {
                                that.state.current < steps.length - 1
                                && <Button type="primary" style={NOphonex} htmlType="submit">提交</Button>
                            }
                            {
                                that.state.current === steps.length - 1
                                && <Button type="primary" style={{ marginLeft: -36 }} onClick={() => that.GOdl()}>去登录</Button>
                            }
                            {
                                that.state.current <= 0
                                && (
                                    <Button className="ant-Go" style={{ marginLeft: 8,background: "#fff",border: "1px solid #ccc",padding: "0px 5px" }} onClick={() => that.DL()}>
                                        返回登录
                                 </Button>  
                                )
                            }
                            {
                                that.state.current > 0
                                && (

                                <Button className="ant-btnxx" style={NOphonex} onClick={() => that.prev()}>
                                        上一步
                                </Button> 

                                )
                            }


                            <Button style={GoFh} className="BACK" onClick={() => that.BACK()}>
                                返回
                            </Button>
                            <div className="forgetmm" style={AqPercent}>
                                <div style={forgetmmClock}>强度：{that.state.AqPercentx}</div>
                                <Tooltip>
                                    <Progress percent={that.state.AqPercentSum} />
                                </Tooltip>
                                <div>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
                            </div>
                        </div>
                    </Form>
                </div>

            </Layout>

            <Footer className='Copyright'></Footer>

        </div>
    )

})
export default Tpl