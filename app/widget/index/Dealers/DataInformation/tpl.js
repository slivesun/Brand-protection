import './DataInformation.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Footer from "../../../components/Copyright"
import chinaCode from '../../../../static/chinaCode.json'

import { Table, Button,Popover, Input, Cascader, Modal, Icon, Form, Select, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;


const Tpl = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    const content = (
        <div>
          <img style={{width:"200px"}} src={that.state.ticket} alt=""/>
        </div>
      )
    return (
        <ContentBox
            breadcrumbList={['个人中心', '资料信息']}
            linkList={['', '']}
        >
        <div className='DataInformation'>
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
                <div className="ChangeBody">
                    <h5>{that.state.dealername}</h5>
                    <p>公司税号：{that.state.dutynumber}</p>
                    <p>公司地址：{that.state.province}{that.state.city}{that.state.strict}{that.state.address}</p>
                    <p>对接人：{that.state.take_people}</p>
                    <p>联系方式：{that.state.contact}</p>
                    {
                        that.props.currentBrand.apply_status === 'DISAGREE' ?
                        <Button style={{marginTop:'20px'}} type="primary" onClick={() => {that.props.history.push('/')}}>返回首页</Button> :
                        null
                    }
                </div>
                <span className="BJbtn" onClick={that.BJBtn}><Icon type="form" />编辑</span>
            </div>
            <div className="ChangeHistoryBOXs">
                <div className="ChangeBody">

                    <p><img src="../../../../img/DataInformation/Personal center_username.png" style={{width:"18px",height:"18px"}} alt="" /><span>用户名：{that.state.username}</span>  <a onClick={that.ModifyPassword}>修改密码></a></p><br />
                    <p><img src="../../../../img/DataInformation/Personal center_ipone.png" style={{width:"18px",height:"18px"}}  alt="" /><span>绑定手机：{that.state.mobile}</span> <a onClick={that.ModifyPhone}>{that.state.BTNtit}</a></p><br />
                    <p><img src="../../../../img/DataInformation/Personal center_wechat.png" style={{width:"18px",height:"18px"}}  alt="" />
                        <span>绑定微信：{that.state.WEIXING}</span>
                        {/* <Popover content={content} title="绑定微信" trigger="click">
                            <a onClick={that.BDWEIxing}>绑定微信></a>
                        </Popover> */}
                        {
                            that.state.PopoWei ?  <a onClick={that.JBWEIxing}>立即解绑></a>
                            :  <Popover content={content} title="绑定微信" trigger="click">
                                <a onClick={that.BDWEIxing}>绑定微信></a>
                            </Popover>
                                   
                               
                        }
                    </p><br />
                </div>
            </div>
            <div className="ChangeHistoryBOXs">
                <div className="ChangeBody">
                    <div className="Hdiv"><h4><span>备注名称：{that.state.memo_dealername}</span></h4><h4><span>授权时间：{that.state.approve_date}</span></h4></div>
                    <div className="Hdiv"><h4><span>直属上级：{that.state.realname}</span></h4><h4>
                            {
                                that.state.authorize_start ?<span>授权期限：{that.state.authorize_start} ~ {that.state.authorize_end}</span>
                                 : <span>授权期限：</span>
                            }
                        </h4></div>
                    <div className="Hdiv"><h4><span>授权编码：{that.state.authorize_num}</span></h4></div>


                </div>
            </div>
            <Modal title="编辑"
                maskClosable={false} 
                visible={that.state.visible}
                footer={null}

                confirmLoading={that.state.confirmLoading}
                onCancel={() => that.handleCancel()}
            >
                <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block", width: "100%" }}>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "41px"
                    }}> <div className="FORMus" style={{ width: "auto", float: "left", lineHeight: "40px" }}>公司名称：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('dealername', {
                                initialValue: that.state.dealername
                            })(
                                <Input className='user-name'
                                    disabled={true}
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "32px"
                    }}> <div className="FORMus " style={{ width: "auto", float: "left", lineHeight: "40px" }}> <b style={{color:"red"}}>*</b> 所在地区：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('province', {
                                initialValue: that.state.provinceApply
                            })(
                                <Cascader fieldNames={{ label: 'label', value: "label" }} placeholder="省/市/区（县）" options={chinaCode} />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "41px"
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
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "49px"
                    }}> <div className="FORMus olo" style={{ width: "auto", float: "left", lineHeight: "40px" }}><b style={{color:"red"}}>*</b>对接人：</div>
                        <FormItem className="tops" style={{
                            width: "320px",
                            height: "40px",
                            float: "left", borderRadius: "2px"
                        }}>
                            {getFieldDecorator('take_people', {
                                initialValue: that.state.take_people
                            })(
                                <Input className='user-name'
                                    placeholder="请输入"
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit" style={{
                        float: "left", marginLeft: "31px"
                    }}> <div className="FORMus olo" style={{ width: "auto", float: "left", lineHeight: "40px" }}> <b style={{color:"red"}}>*</b> 联系方式：</div>
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
                    }}>

                        <Button  className="btn2-main" style={{
                            marginLeft: "200px",
                            marginRight: "50px"
                        }} htmlType="submit">确认</Button>
                        <Button onClick={() => that.handleCancel()}>取消</Button>

                    </div>
                </Form>
            </Modal>
            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl