import './DataInformationb.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Footer from "../../../components/Copyright"
import chinaCode from '../../../../static/chinaCode.json'

import { Table, Button, Popover, Input, Cascader, Modal, Icon, Form, Select, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;


const Tpl = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    const content = (
        <div>
            <img style={{ width: "200px" }} src={that.state.ticket} alt="" />
        </div>
    )
    return (
        <ContentBox
            breadcrumbList={['个人中心', '资料信息']}
            linkList={['', '']}
        >
        <div className='DataInformationb'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a style={{ margin: '0' }} onClick={that.HistoryGo}>
                            个人中心
                                </a>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>资料信息</Breadcrumb.Item>
                </Breadcrumb>

            </div> */}
            <div className="ChangeHistoryBOXs">
                <div className="ChangeBodyb">
                    <h5>{that.state.companyname}</h5>
                    <p>所属行业：{that.state.dict_name}</p>
                    <p>联系方式：{that.state.contact}</p>
                    <p>公司地址：{that.state.province}{that.state.city}{that.state.strict}{that.state.address}</p>
                </div>
                <span className="BJbtn" onClick={that.BJBtn}><Icon type="form" />编辑</span>
            </div>
            <div className="ChangeHistoryBOXs">
                <div className="ChangeBodym">

                    <p><span className='zhicon'><img src="../../../../img/DataInformation/Personal center_username.png" alt="" /></span><span>用户名：{that.state.username}</span></p> <br />
                    <p><span className='zhicon'><img src="../../../../img/DataInformation/Personal center_ipone.png" alt="" /></span><span>绑定手机：{that.state.mobile}</span> 
                        
                    </p><br />
                    <p><span className='zhicon'><img src="../../../../img/DataInformation/Personal center_wechat.png" alt="" /></span><span>绑定微信：{that.state.WEIXING}</span> 

                    
                    </p><br />
                    <p><span className='zhicon'><img src="../../../../img/DataInformation/Personal center_time.png" alt="" /></span><span>账号有效期至：{that.state.validtime}</span> </p><br />

                </div>
                <div className="ChangeBodymx">

                    <p><a onClick={that.phones}>修改密码></a></p><br />
                    <p><span style={{ marginLeft: "10px", color: "#ccc" }}>用于找回密码验证身份</span>
                        {
                            that.state.mobile ? <a onClick={that.Bding}>修改绑定></a>
                                : <a onClick={that.password}>绑定手机</a>
                        }
                    </p><br />
                    <p><span style={{ marginLeft: "10px", color: "#ccc" }}>绑定微信后可便捷接收消息提醒和微信扫码登录</span>

                        {
                            that.state.PopoWei ?  <a onClick={that.JBWEIxing}>立即解绑></a>
                            :  <Popover content={content} title="绑定微信" trigger="click">
                                <a onClick={that.BDWEIxing}>绑定微信></a>
                            </Popover>
                                   
                               
                        }
                    </p><br />
                    <p> <span style={{ marginLeft: "10px", color: "#ccc" }}>有效期过期后，账号将不能正常使用</span> </p><br />

                </div>
            </div>
            <Modal title="编辑"
                visible={that.state.visible}
                footer={null}
                maskClosable={false} 
                confirmLoading={that.state.confirmLoading}
                onCancel={() => that.handleCancel()}
            >
                <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block", width: "100%" }}>

                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "19px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}><b style={{ color: "red" }}>*</b>公司名称：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('companyname', {
                                initialValue: that.state.companyname
                            })(
                                <Input className='user-name'
                                    placeholder="请输入"
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "26px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}>所属行业：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('dict_name', {
                                initialValue: that.state.dict_name
                            })(
                                <Input className='user-name'
                                    disabled={true}
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "26px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}>联系方式：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('contact', {
                                initialValue: that.state.contact
                            })(
                                <Input className='user-name'
                                    placeholder="请输入"
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "26px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}>所在地区：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('province', {
                                initialValue: that.state.provinceApplys
                            })(
                                <Cascader initialValue="1" fieldNames={{ label: 'label', value: "label" }} placeholder="省/市/区（县）" options={chinaCode} />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "26px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}>详情地址：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "60px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('address', {
                                initialValue: that.state.address
                            })(
                                <textarea style={{ resize: "none", width: "320px", height: "60px", float: "left", borderRadius: "2px", border: "1px solid #d9d9d9" }} className="topsxb" placeholder="请输入详情地址" />
                                )}
                        </FormItem>
                    </div>


                    <div className="FORMtit" 
                        style={{
                        //     float: "left", marginLeft: "26px"
                            textAlign: 'right'
                        }}
                    >
                        <Button 
                            // type="primary" 
                            className="btn2-main"
                            // style={{
                            //     marginLeft: "200px",
                            //     marginRight: "50px"
                            // }} 
                            htmlType="submit">确认</Button>
                        <Button style={{margin:'0 56px 0 10px'}} className="btn2-sub" onClick={() => that.handleCancel()}>取消</Button>

                    </div>
                </Form>
            </Modal>
            {/* <Footer className='Copyright'></Footer> */}
        </div>
        </ContentBox>

    )
})
export default Tpl