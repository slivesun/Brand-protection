import ThatMain from '../../HOC/That';
import Copyright from "../../components/Copyright";
import { Steps, Input, Form, Button, Cascader, Tooltip, Progress, Textarea } from 'antd';
import chinaCode from '../../../static/chinaCode.json'
const Step = Steps.Step;
const FormItem = Form.Item;

const steps = [{
    title: '完善信息',
    description:
        <div className='stepbox-description'>
            <p>请填写公司信息</p>
            <p>和对接人信息</p>
        </div>

}, {
    title: '账号注册',
    description:
        <div className='stepbox-description'>
            <p>请使用手机号注册</p>
            <p>登录账号</p>
        </div>,
}, {
    title: '注册成功',
    description:
        <div className='stepbox-description'>
            <p>登录账号</p>
            <p>已成功注册</p>
        </div>,
}];
const Tpl = ThatMain((that) => {

    let { regstatus } = that.state;

    return (
        <div className='registered'>
            <header>
                <img style={{verticalAlign:'middle',height:'34px'}} src='../../../img/logo.png' />
            </header>
            {
                regstatus ?
                    <RegHome that={that} />
                    :
                    <Stepbox that={that} />

            }
            <Copyright clazzName='copyright' />
        </div>
    )

})
const Stepbox = ThatMain((that) => {
    let { current, yzm, AqPercent, AqPercentx, AqPercentSum } = that.state;
    const { getFieldDecorator } = that.props.form;
    let shows = that.state.shows ? " none " : "block";//验证码发送提示
    let style = {
        display: shows
    }
    let forgetx = that.state.forgetxs ? " block " : "none";//用户名是否正确发送提示
    let forgetxs = {
        display: forgetx
    }
    let forgetmmClock = { color: that.state.forgetmmClock }
    const axc = [
        {
            content: <div className="regisBox">

                <div className="FORMtit"><h4>公司信息</h4></div>
                <div className="FORMtit TJBOX"> <div className="FORMus fox"><b style={{color:"red"}}>*</b> 公司税号</div>
                    <FormItem className="tops">
                        {getFieldDecorator('paragraph')(
                            <Input className='user-name'
                                placeholder="请输入公司税号"

                            />
                        )}
                    </FormItem>
                    <Button className="TJXX" onClick={() => that.onBlurx()}>查找</Button>
                </div>
                <div className="FORMtit"> <div className="FORMus">公司名称</div>
                    <FormItem className="tops">
                        {getFieldDecorator('name', {
                            initialValue: that.state.paragraphName || ""
                        })(
                            <Input className='user-name'
                                type="text"
                                maxLength="50"
                                disabled={true}
                                placeholder="请输入公司名称"
                            />
                            )}
                    </FormItem>
                </div>
                <div className="FORMtit" id="GSDQ"> <div className="FORMus fox"><b style={{color:"red"}}>*</b> 公司地区</div>
                    <FormItem className="topsx">
                        {getFieldDecorator('region')(
                            <Cascader 
                                getPopupContainer={() => document.getElementById('GSDQ')}
                                fieldNames={{ label: 'label',value:"label" }} placeholder="省/市/区（县）" options={chinaCode} />
                        )}

                    </FormItem>

                </div>
                <div className="FORMtit"> <div className="FORMus">详情地址</div>
                    <FormItem className="tops">
                        {getFieldDecorator('Details')(
                            <textarea className="topsx" maxLength="100" placeholder="请输入详情地址" />

                        )}
                    </FormItem>
                </div>
                <div className="FORMtit"><h4>公司信息</h4></div>
                <div className="FORMtit"> <div className="FORMus fos"><b style={{color:"red"}}>*</b> 对接人姓名</div>
                    <FormItem className="tops">
                        {getFieldDecorator('TakeOve')(
                            <Input className='user-name'
                                maxLength="32"
                                setfieldsvalue="请输入对接人姓名"
                            />

                        )}
                    </FormItem>
                </div>
                <div className="FORMtit"> <div className="FORMus fob"><b style={{color:"red"}}>*</b> 联系方式</div>
                    <FormItem className="tops">
                        {getFieldDecorator('ContactInformation')(
                            <Input className='user-name'
                                    maxLength="14"
                                setfieldsvalue="请输入联系方式"
                            />
                        )}
                    </FormItem>
                </div>
                <div className="FORMtit">
                    <FormItem>
                        {getFieldDecorator('SucceBTN', {
                            initialValue: "提交信息"
                        })(
                            <Button className="TJBTN" type="primary" htmlType="submit">提交信息</Button>

                            )}
                        <Button className="FHBTN" onClick={() => that.BACKs()} type="primary" >返回</Button>

                    </FormItem>

                </div>

            </div>
        },
        {
            content: <div className="regisBox">
                <div><div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> 两次密码不一致，请重新输入。</div></div>
                <div className="FORMtit">
                    <div className="FORMus">手机号</div>
                    <FormItem className="tops">
                        {getFieldDecorator('pones')(
                            <Input className='user-name'
                                    maxLength="11"
                                placeholder="请输入手机号"
                            />
                        )}
                    </FormItem>
                </div>
                <div className="FORMtit">
                    <div className="FORMus">验证码</div>
                    <FormItem className="topsxs">
                        {getFieldDecorator('yzms')(
                            <Input className='user-yzm'
                                    maxLength="6"
                                placeholder="输入验证码"
                            />
                        )}
                    </FormItem>
                    
                    <Button  className="get-code" onClick={() => that.getAuthCode()} >
                        {yzm}
                    </Button>
                </div>
                <div className="ForgetTS" style={style}>
                    <span><img src="../../../img/icon_Login_success.png" /></span>

                    <span>验证码已发送到你的手机，5分钟内输入有效验证码等同于密码，打死也不能告诉别人!</span>
                </div>
                <div className="FORMtit topwd">
                    <div className="FORMus">登录密码</div>
                    <FormItem className="tops ">
                        {getFieldDecorator('pwd')(
                            <Input className='user-name'
                                placeholder="请输入登录密码"
                                type="password"
                                onBlur={() => that.onBlur()}
                            />
                        )}
                    </FormItem>
                </div>
                <div className="FORMtit Gopwd">
                    <div className="FORMus">确认登录密码</div>
                    <FormItem className="tops">
                        {getFieldDecorator('pwds')(
                            <Input className='user-name'
                                type="password"
                                placeholder="请确认登录密码"
                            />
                        )}
                    </FormItem>
                </div>
                <div className="forgetmm" >
                    <div style={forgetmmClock} >
                        强度：{AqPercentx}</div>
                    <Tooltip>
                        <Progress percent={AqPercentSum}  />
                    </Tooltip>
                    <div>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
                </div>

                <div className="FORMtit">
                    <FormItem>
                        {getFieldDecorator('SucceBTN', {
                            initialValue: "提交信息"
                        })(
                            <Button className="TJBTN" type="primary" onClick={() => that.SUBDl()} htmlType="submit">提交信息</Button>

                            )}
                        <Button className="FHBTN" type="primary" onClick={() => that.prev()}>返回</Button>

                    </FormItem>

                </div>
            </div>
        },
        {
            content: <div className="regisBox">
                <div className="NOponetits" >
                    <img src="../../../img/icon_Login_success.png" />
                    <h4>注册成功</h4>
                    <div className="NOponeti">
                        <h6>登录方式</h6>
                        <p>1、使用绑定手机号的微信扫码登录</p>
                        <p>2 、使用手机号和密码登录</p>
                    </div>
                </div>
                <Button className="TJBTN" onClick={() => that.Gdl()} type="primary" style={{ marginLeft: 130 }}>立即登录</Button>
            </div>
        }
    ]

    return (
        <div className='regbox'>
            <div className='stepbox'>
                <Steps current={that.state.currents}>
                    {steps.map(item => <Step key={item.title} description={item.description} title={item.title} />)}
                </Steps>
                <Form onSubmit={that.ForgetSubmit} className="forget-form">
                    <div className="steps-content">{axc[that.state.currents].content}
                    </div>


                    {/* {
                            that.state.current === steps.length - 1
                            && <Button type="primary" style={{ marginLeft: -36 }}>去登录</Button>
                        }
                        {
                            that.state.current <= 0
                            && (
                                <Button style={{ marginLeft: 8 }}>
                                    返回登录
                                </Button>
                            )
                        }
                        {
                            3 < that.state.current > 0
                            && (

                                <Button className="ant-btnxx" onClick={() => that.prev()}>
                                    上一步
                                </Button>

                            )
                        } */}
                </Form>
            </div>

        </div>
    )
})
//邀请注册首页信息
const RegHome = ThatMain((that) => {
    let { company } = that.state;
    return (
        <div className='content'>
            <h3 className='title'>入驻邀请:</h3>
            <div className='info'>
                <h4 className='company'>{company}</h4>
                <p className='prompt'>正在使用BRM鹰智渠道管理系统，邀请你入驻，成为其名下经销商</p>

                <div className='href-box'>
                    <strong>你是否拥有BRM账号：</strong>
                    <p>
                        <span>我还未拥有BRM账号</span>
                        <a onClick={() => that.regStatus(false)}>立即注册 ></a>
                    </p>
                    <p>
                        <span>我已拥有BRM账号</span>
                        <a href={'/user.html#/loginc/'+that.props.match.params.id}>立即登陆 ></a>
                    </p>
                </div>
            </div>
        </div>
    )
})

export default Tpl