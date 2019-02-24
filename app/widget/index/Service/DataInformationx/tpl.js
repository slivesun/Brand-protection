import './DataInformationx.less'
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
            <img style={{ width: "200px" }} src={that.state.ticket} alt="" />
        </div>
    )
    return (
        <ContentBox
            breadcrumbList={['个人中心', '资料信息']}
            linkList={['', '']}
        >
        <div className='DataInformationx'>
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
                <div className="ChangeHeadx">
                    <span>{that.state.realname}</span>
                    <span>服务客户：{that.state.count}</span>
                </div>
                <div className="ChangeBodyn">

                    <p><img src="../../../../img/DataInformation/Personal center_username.png" alt="" />  <span>用户名：{that.state.username}</span> <a onClick={that.password}>修改密码></a></p><br />
                    <p><img src="../../../../img/DataInformation/Personal center_ipone.png" alt="" /> <span>绑定手机：{that.state.mobile ? that.state.mobile : ""}</span> <a onClick={that.MePhone}>{that.state.BTNtit}</a></p><br />
                    <p><img src="../../../../img/DataInformation/Personal center_wechat.png" alt="" /> <span>绑定微信：{that.state.WEIXING}</span>
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
                <div className="ChangeBodyn">
                    {
                        that.state.data ? <ul>
                            {
                                that.state.data.map((i, k) => {
                                    return <li key={k}><span>{i.companyname.substr(0, 1)}</span><span>{i.companyname}</span></li>


                                })
                            }

                        </ul> : null
                    }
                </div>
            </div>

            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl