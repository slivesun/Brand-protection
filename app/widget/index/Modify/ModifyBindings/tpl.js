import './ModifyBindings.less'
import ThatMain from '../../../HOC/That';
import Footer from "../../../components/Copyright"
import chinaCode from '../../../../static/chinaCode.json'

import { Table, Button, Input, Steps, Cascader, Modal, Icon, Form, Select, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;


const Step = Steps.Step;
const Tpl = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    let shows = that.state.shows ? " none " : "block";//验证码发送提示
    let style = {
        display: shows
    }
    let forgetx = that.state.forgetxs ? " block " : "none";//用户名是否正确发送提示
    let forgetxs = {
        display: forgetx
    }
    const steps = [ {
        title: '验证身份',
        content: <div className="forget-form">
             <div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> 你输入的验证码有误，请重新获取。</div><br /><br />
            <div className="FORMtit">
            <div className="FORMus">手机号</div>
            <FormItem className="tops">
                <p>{that.state.Pone}</p>
            </FormItem></div>
            <div className="FORMtit">
            <div className="FORMus">验证码</div>
            <FormItem className="topsxs">
                {getFieldDecorator('yzmx')(
                    <Input className='user-yzm'
                        placeholder="输入验证码"
                    />
                )}
            </FormItem>

            <Button  className="get-code" style={{marginTop:"4px"}} onClick={() => that.getAuthCodex()} >
                {that.state.yzmx}
            </Button></div>
            <div className="ForgetTS" style={style}>
            <span><img src="../../../img/icon_Login_success.png" /></span>

            <span>验证码已发送到你的手机，5分钟内输入有效验证码等同于密码，打死也不能告诉别人!</span>
        </div>
            <div className="FORMtit">
                <FormItem>
                    {getFieldDecorator('SucceBTN', {
                        initialValue: "提交"
                    })(
                        <Button className="TJBTN" type="primary" htmlType="submit" onClick={() => that.MEbtns()}>提交</Button>

                        )}
                    <Button className="FHBTN" type="primary" onClick={() => that.HistoryGo()}>取消</Button>

                </FormItem>

            </div>
        </div>,
        text: "需要使用当前绑定手机验证身份"

    }, {
        title: '绑定新手机',
        content: <div className="forget-form"><div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> 手机号被占用，请更换。</div>
        <div className="FORMtit">
            <div className="FORMus">新手机号</div>
            <FormItem className="tops">
                {getFieldDecorator('pones')(
                    <Input className='user-name'
                        placeholder="请输入手机号"
                    />
                )}
            </FormItem>
        </div>
        <div className="FORMtit">
            <div className="FORMus">验证码</div>
            <FormItem className="topsxs" style={{marginLeft:"15px"}}>
                {getFieldDecorator('yzms')(
                    <Input className='user-yzm'
                         style={{height:"32px"}}
                        maxLength="6"
                        placeholder="输入验证码"
                    />
                )}
            </FormItem>

            <Button  className="get-code" style={{marginTop:"3px"}} onClick={() => that.getAuthCode()} >
                {that.state.yzm}
            </Button>
        </div>
        <div className="ForgetTS" style={style}>
            <span><img src="../../../img/icon_Login_success.png" /></span>

            <span>验证码已发送到你的手机，5分钟内输入有效验证码等同于密码，打死也不能告诉别人!</span>
        </div>

        <div className="FORMtit">
            <FormItem>
                {getFieldDecorator('SucceBTN', {
                    initialValue: "提交信息"
                })(
                    <Button className="TJBTN" type="primary" htmlType="submit" onClick={() => that.MEbtn()}>提交</Button>

                    )}
                <Button className="FHBTN" type="primary" onClick={() => that.prev()}>上一步</Button>

            </FormItem>

        </div> </div>,
        text: "请填写你需要绑定的新手机号"
    }, {
        title: '绑定成功',
        content: <div className="NOponetits" >
        <img src="../../../img/icon_Login_success.png" />
        <h4>绑定成功</h4>
        <p>使用新手机号和密码登录</p>
        <Button className="TJBTNs" type="primary" onClick={() => that.GOTOF()}>完成</Button>

    </div>,
        text: "成功绑定新手机号码"
    }];
    return (
        <div className='ModifyBindings'>
            <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a style={{ margin: '0' }} onClick={that.HistoryGo}>
                            个人中心
                                </a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item><a style={{ margin: '0' }} onClick={that.HistoryGo}>
                        资料信息
                                </a></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        修改手机</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            <div className="ModifyPhoneBOXs">
                    <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block", width: "100%" }}>
                        <Steps current={that.state.current}>
                            {steps.map(item => <Step key={item.title} title={item.title} description={item.text} />)}

                        </Steps>
                        <div className="steps-content">{steps[that.state.current].content}
                        </div>

                    </Form>
            </div>

            <Footer className='Copyright'></Footer>

        </div>
    )
})
export default Tpl