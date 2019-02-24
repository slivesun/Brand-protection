import './TaobaoInquiries.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Card, Icon, Tooltip, Button, Modal, Input, Select, Breadcrumb, DatePicker, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    const Option = Select.Option;
    const { RangePicker } = DatePicker;
    const { getFieldDecorator, getFieldValue } = that.props.form;

    const FormItem = Form.Item;
    const clearIconStyle = {
        width: '15px',
        height: '15px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const dateFormat = 'YYYY-MM-DD';
    const rowSelection = {
        selectedRowKeys: that.state.selectedRowKeys,
        onChange: that.onSelectChange,
    }
    // const currentData = that.state.currentData.filter(x => {

    //     return x.cookie1688 === null;
    // });
    const OPtionchildren = that.state.currentData ? that.state.currentData.map((d, i) => <Option key={d.username}>{d.username}</Option>) : ""

    return (
        <ContentBox
            breadcrumbList={['投诉查询', '淘宝投诉查询']}
            linkList={['', '']}
        >
        <div className='TaobaoInquiries'>
            {/* <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        淘宝投诉查询

                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className="content-top">
                    <div style={{ position: "relative",marginTop:"5px",fontSize:"14px" }}>
                        <b style={{ color: "red" }}>*</b>投诉账号
                        <Select getPopupContainer={trigger => trigger.parentNode} placeholder={that.state.accountId} style={{ width: 240, marginLeft: "10px" }} onChange={that.handleChangex}>
                            {OPtionchildren}
                        </Select>
                    </div>
                    <div style={{ textAlign: "right",position: "absolute",right: "10px",top: "25px" }}>
                        <a href={`/hcm/complaint/downLoad_taobao?accountId=${that.state.accountId}&platform=${that.state.platform}&platformCode=${that.state.platformCode}&entityType=${that.state.entityType}&status=${that.state.status}&start_time=${that.state.start_time}&end_time=${that.state.end_time}&iprName=${that.state.iprName}&entityOwnerName=${that.state.entityOwnerName}&batchId=${that.state.batchId}`}>
                            <Button className="btn6">
                                下载数据

                             </Button>
                        </a>

                    </div>
                </div>
                <div className="content-con">
                    <div className="content-cons">
                        <div style={{ position: "relative" }}>
                            平台
                            <Select defaultValue="淘宝" getPopupContainer={trigger => trigger.parentNode} style={{ width: 150, marginLeft: "10px",marginRight:"14%" }} onChange={that.handleChange}>
                                <Option value="taobao">淘宝</Option>
                                <Option value="tmall">天猫</Option>
                                <Option value="tmallhk">天猫国际</Option>
                            </Select>
                        </div>
                        <div style={{ position: "relative" }}>
                            投诉链接类型
                            <Select defaultValue="商品" getPopupContainer={trigger => trigger.parentNode} style={{ width: 200, marginLeft: "10px" }} onChange={that.handleChanges}>
                                <Option value="item">商品</Option>
                                <Option value="shop">店铺招牌、店铺公告</Option>
                            </Select>
                        </div>
                        <div>
                            投诉时间
                        <RangePicker
                                defaultValue={[moment(Date.now() - 2160 * 60 * 60 * 1000),
                                moment(Date.now())]}
                                onChange={that.onChange}
                                format={dateFormat}
                            />
                        </div>
                    </div>
                    <Form className="content-cons" onSubmit={that.ForgetSubmit} >
                        <FormItem className="consDIV">
                            知识产权名称

                                    {getFieldDecorator('productName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "150px", marginLeft: "10px", marginRight: "30%" }} suffix={!!getFieldValue("productName") ?<Icon
                                    type="close-circle"
                                    onClick={() => that.handleClearIconClick("productName")}
                                    style={clearIconStyle}
                                />:null} placeholder="请输入" ></Input>

                                )}
                        </FormItem>
                        <FormItem className="consDIV">
                            被投诉方名称
                                    {getFieldDecorator('brandName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "200px", marginLeft: "10px" }} suffix={!!getFieldValue("brandName") ?<Icon
                                    type="close-circle"
                                    onClick={() => that.handleClearIconClick("brandName")}
                                    style={clearIconStyle}
                                />:null} placeholder="请输入" ></Input>
                                )}
                        </FormItem>
                        <FormItem className="consDIV">
                            投诉单号

                                    {getFieldDecorator('productbrandName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "175px", marginLeft: "10px" }}
                                    suffix={!!getFieldValue("productbrandName") ? <Icon
                                        type="close-circle"
                                        onClick={() => that.handleClearIconClick("productbrandName")}
                                        style={clearIconStyle}
                                    /> : null} placeholder="请输入" ></Input>
                                )}

                            <Button htmlType="submit">查询</Button>
                        </FormItem>
                    </Form>

                    <div className="content-conx">
                        <Button type={that.state.typeDA == "" ? "primary" : ""} value="" onClick={that.handleButton} >全部（{that.state.num ? that.state.num : "0"}）</Button>
                        <Button type={that.state.typeDA == "submitted" ? "primary" : ""} value="submitted" onClick={that.handleButton} >已提交（{that.state.linknum_taobao.submitted ? that.state.linknum_taobao.submitted : "0"}）</Button>
                        <Button type={that.state.typeDA == "auditNoPass" ? "primary" : ""} value="auditNoPass" onClick={that.handleButton} >审核不通过（{that.state.linknum_taobao.auditNoPass ? that.state.linknum_taobao.auditNoPass : "0"}）</Button>
                        <Button type={that.state.typeDA == "auditPass" ? "primary" : ""} value="auditPass" onClick={that.handleButton}  >投诉审核通过-卖家待申诉（{that.state.linknum_taobao.auditPass ? that.state.linknum_taobao.auditPass : "0"}）</Button>
                        <Button type={that.state.typeDA == "appeal" ? "primary" : ""} value="appeal" onClick={that.handleButton}  >卖家已申诉-待投诉方响应（{that.state.linknum_taobao.appeal ? that.state.linknum_taobao.appeal : "0"}）</Button>
                        <Button type={that.state.typeDA == "involved" ? "primary" : ""} value="involved" onClick={that.handleButton}  >小二介入（{that.state.linknum_taobao.involved ? that.state.linknum_taobao.involved : "0"}）</Button>
                        <Button type={that.state.typeDA == "withdrawal" ? "primary" : ""} value="withdrawal" onClick={that.handleButton}  >投诉方已撤诉（{that.state.linknum_taobao.withdrawal ? that.state.linknum_taobao.withdrawal : "0"}）</Button>
                        <Button type={that.state.typeDA == "appealPass" ? "primary" : ""} value="appealPass" onClick={that.handleButton}  >卖家申诉成立（{that.state.linknum_taobao.appealPass ? that.state.linknum_taobao.appealPass : "0"}）</Button>
                        <Button type={that.state.typeDA == "appealNoPass" ? "primary" : ""} value="appealNoPass" onClick={that.handleButton}  >卖家申诉不成立（{that.state.linknum_taobao.appealNoPass ? that.state.linknum_taobao.appealNoPass : "0"}）</Button>
                        <Button type={that.state.typeDA == "invalid" ? "primary" : ""} value="invalid" onClick={that.handleButton}  >链接已删除（{that.state.linknum_taobao.invalid ? that.state.linknum_taobao.invalid : "0"}）</Button>

                    </div>
                </div>
                <div className="content-fot">
                    <Button onClick={that.PLCS}>批量撤诉</Button> <Button style={{ marginLeft: "10px" }} onClick={that.XIAOtwo}>批量申请小二介入</Button>
                    <Table
                        pagination={false}
                        rowKey="id"
                        rowSelection={rowSelection}
                        scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                        columns={that.state.ProductInformation_list}
                        dataSource={that.state.link_taobao}
                        onChange={that.handleTableChange}
                    />

                    <div className="ProductInformationFooter">
                        <div className='footer'>
                            <div className='info'>
                                {`共 ${that.state.totalNum} 条记录 `}
                                &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                            </div>
                            <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

                        </div>
                    </div>
                    <Modal
                    className='YellowWhite'
                        maskClosable={false}
                        visible={that.state.visible}
                        onOk={that.handleOk}
                        onCancel={that.handleCancels}
                    >


                        {
                            that.state.TITBoy
                        }

                    </Modal>
                </div>
            </div>
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>

    )
})

export default Tpl