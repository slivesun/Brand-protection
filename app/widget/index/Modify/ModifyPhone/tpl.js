import './ModifyPhone.less'
import ThatMain from '../../../HOC/That';
import Footer from "../../../components/Copyright"
import chinaCode from '../../../../static/chinaCode.json'

import { Table, Button, Input, Cascader, Modal, Icon, Form, Select, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;

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
    return (
        <div className='ModifyPhone'>
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
                        绑定手机</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            <div className="ModifyPhoneBOXs">

                <div className="ChangeBodyn">
                    <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block", width: "100%" }}>
                        <div><div className="userTS" style={forgetxs}> <img src="../../../img/icon_Login_failure.png" /> <b>手机号被占用，请更换。</b></div></div>
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
                                            style={{height:"32px"}}
                                    maxLength="6"
                                        placeholder="输入验证码"
                                    />
                                )}
                            </FormItem>

                            <Button className="get-code" style={{marginTop:"3px"}} onClick={() => that.getAuthCode()} >
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
                                    <Button className="TJBTN" type="primary"  htmlType="submit" onClick={() => that.MEbtn()}>提交</Button>

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