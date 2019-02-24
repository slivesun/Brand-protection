import './ModifyPhone.less'
import ThatMain from '../../../HOC/That';
import Footer from "../../../components/Copyright"
import chinaCode from '../../../../static/chinaCode.json'

import { Button, Input,Tooltip, Progress, Form, Breadcrumb } from 'antd';


const FormItem = Form.Item;


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
    let forgetmmClock = { color: that.state.forgetmmClock }
    return (
        <div className='ModifyPassword'>
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
                        修改密码</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            <div className="ModifyPhoneBOXs">

                <div className="ChangeBodyn">
                    <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block", width: "100%" }}>
                        <div><div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> {that.state.titlesx}</div></div>
                        <div className="FORMtit topwds">
                            <div className="FORMus">当前密码</div>
                            <FormItem className="tops ">
                                {getFieldDecorator('oldpwd')(
                                    <Input className='user-name'
                                        placeholder="请输入登录密码"
                                        maxLength="50"
                                        type="password"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="FORMtit topwd">
                            <div className="FORMus">新密码</div>
                            <FormItem className="tops ">
                                {getFieldDecorator('pwd')(
                                    <Input className='user-name'
                                        placeholder="请输入登录密码"
                                        maxLength="50"
                                        type="password"
                                        onBlur={() => that.onBlur()}
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="FORMtit Gopwd">
                            <div className="FORMus">确认新密码</div>
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
                                强度：{that.state.AqPercentx}</div>
                            <Tooltip>
                                <Progress percent={that.state.AqPercentSum} />
                            </Tooltip>
                            <div>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
                        </div>
                        <div className="forgetmmb"></div>   
                        <div className="FORMtit">
                            <FormItem>
                                {getFieldDecorator('SucceBTN', {
                                    initialValue: "提交信息"
                                })(
                                    <Button className="btn2-main" style={{marginLeft: 39}} type="primary" htmlType="submit">提交</Button>

                                    )}
                                <Button className="FHBTN" type="primary" onClick={() => that.HistoryGo()}>取消</Button>

                            </FormItem>

                        </div>

                    </Form>
                </div>
            </div>

            <Footer className='Copyright'></Footer>

        </div>
    )
})
export default Tpl