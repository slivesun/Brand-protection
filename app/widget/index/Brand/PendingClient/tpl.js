
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout';
import { Breadcrumb, Button, Select, Alert, Icon } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList, dealerVerify } = that.state;
    return (
        <ContentBox
            breadcrumbList={['客户盘点', '客户信息','待审批客户']}
            linkList={['', '1','']}
            history={that.props.history}
        >
            <div className='pendingclient'>
                {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>客户盘点</Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <a style={{ margin: '0' }} href='/index.html#/ClientCheck'>
                            客户信息
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>待审批客户</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
                <ul className='content'>
                    {
                        dataList.length ?
                            dataList.map((item, index) => {
                                let { match_info, dealername, match_id = '', dutynumber, take_people, apply_date, province = '', city = '', strict = '', address = '', contact } = item;
                                return (
                                    <li key={index} className='item'>
                                        <h6>客户名称:<span>{dealername}</span></h6>
                                        <div className='info'>

                                            <div className='left'>
                                                <p>公司税号：{dutynumber}</p>
                                                <p>对接人姓名：{take_people}</p>
                                                <p>申请时间：{moment(apply_date).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                                            </div>
                                            <div className='right'>
                                                <p>公司地址：{`${province} ${city} ${strict} ${address}`}</p>
                                                <p>联系方式：{contact}</p>
                                            </div>
                                        </div>

                                        <div className='footer'>
                                            <div style={{ position: 'relative' }} id={`check-client${index}`} className='footer-info'>
                                                {
                                                    item.webStatus == true ?
                                                        <React.Fragment>
                                                            匹配客户：
                                                <Select
                                                                showSearch
                                                                placeholder='请选择'
                                                                getPopupContainer={() => document.getElementById(`check-client${index}`)}
                                                                value={match_id}
                                                                style={{ width: 200 }}
                                                                onChange={(value) => that.aChangeClient(value, index)}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {
                                                                    dealerVerify.length ?
                                                                        <Option key={'99999'} value={''}>无</Option>
                                                                        :
                                                                        null
                                                                }
                                                                {
                                                                    dealerVerify.length ?
                                                                        dealerVerify.map((item2, index2) => {
                                                                            return (
                                                                                <Option key={index2} value={item2.id}>{item2.dealername}</Option>
                                                                            )
                                                                        })
                                                                        :
                                                                        <Option disabled key={null} value={null}>暂无可选客户</Option>
                                                                }
                                                            </Select>
                                                            <a onClick={() => that.editClient(item, index, false)}>返回</a>
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            自动为你匹配到的客户名单：
                                                <span>{match_info.dealername}</span>
                                                            <a onClick={() => that.editClient(item, index, true)}>手动选择</a>
                                                        </React.Fragment>
                                                }
                                            </div>
                                            <div className='but-box'>
                                                <Button className='btn4-pass' onClick={() => that.onSubkit(item, 'APPROVED')}><Icon type="check-circle" theme="outlined" />通过</Button>
                                                <Button className='btn4-reject' onClick={() => that.onSubkit(item, 'DISAGREE')}><Icon type="rollback" theme="outlined" />驳回</Button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            <li style={{ width: '100%' }}><Alert style={{ textAlign: 'center' }} message="暂无数据" type="error" /></li>
                    }


                </ul>
                {/* <Copyright clazzName='copyright' /> */}
            </div>
        </ContentBox>
    )
})

export default Tpl