import './OneSIXInquiries.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Card, Icon, Tooltip, Button, Input, Select, Modal, DatePicker, Breadcrumb, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    const Option = Select.Option;
    const { RangePicker } = DatePicker;
    const { getFieldDecorator, getFieldValue } = that.props.form;

    const FormItem = Form.Item;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
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
            breadcrumbList={['投诉查询', '1688投诉查询']}
            linkList={['', '']}
        >
        <div className='OneSIXInquiries'>
            {/* <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        1688投诉查询

                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className="content-top">
                    <div style={{position: "relative",marginTop:"5px",fontSize:"14px"}}>
                        <b style={{ color: "red" }}>*</b>投诉账号
                        <Select getPopupContainer={trigger => trigger.parentNode} placeholder={that.state.account_id} style={{ width: 240, marginLeft: "10px" }} onChange={that.handleChange}>
                            {OPtionchildren}
                        </Select>
                    </div>
                    <div style={{ textAlign: "right",position: "absolute",right: "10px",top: "25px" }}>
                        <a href={`/hcm/complaint/downLoad_1688?account_id=${that.state.account_id}&ipr_num=${that.state.ipr_num}&complaint_num=${that.state.complaint_num}&company_name=${that.state.company_name}&start_time=${that.state.start_time}&end_time=${that.state.end_time}&site=${that.state.site}&state=${that.state.state}`}>
                            <Button className="btn6" onClick={that.XZDate}>下载数据</Button>
                        </a>

                    </div>
                </div>
                <Form className="content-con" onSubmit={that.ForgetSubmit} style={{padding:"20px 20px 50px"}}>
                    <div className="content-cons">
                        <FormItem className="consDIV">
                            知识产权编号

                                    {getFieldDecorator('productName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "150px", marginLeft: "10px", marginRight: "80px" }} suffix={!!getFieldValue("productName") ? <Icon
                                    type="close-circle"
                                    onClick={() => that.handleClearIconClick("productName")}
                                    style={clearIconStyle}
                                /> : null} placeholder="请输入" ></Input>

                                )}
                        </FormItem>

                        <FormItem className="consDIV">
                            投诉单号

                                    {getFieldDecorator('brandName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "150px", marginLeft: "10px" }} suffix={!!getFieldValue("brandName") ? <Icon
                                    type="close-circle"
                                    onClick={() => that.handleClearIconClick("brandName")}
                                    style={clearIconStyle}
                                /> : null} placeholder="请输入" ></Input>
                                )}
                        </FormItem>
                        <div className="consDIV">
                            
                            <div style={{float:"right",marginRight: "20px",marginTop:"5px"}}>
                            起始时间
                                <RangePicker
                               
                                onChange={that.onChange}
                                format={dateFormat}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="content-cons">
                        <FormItem className="consDIV">
                            公司/店铺名称

                                    {getFieldDecorator('DesName', {
                                initialValue: ""
                            })(
                                <Input style={{ width: "150px", marginLeft: "10px", marginRight: "80px" }} suffix={!!getFieldValue("DesName") ? <Icon
                                    type="close-circle"
                                    onClick={() => that.handleClearIconClick("DesName")}
                                    style={clearIconStyle}
                                /> : null} placeholder="请输入" ></Input>

                                )}
                        </FormItem>

                        <div style={{ position: "relative" }}>
                            投诉所属站点
                            <Select defaultValue="全部" getPopupContainer={trigger => trigger.parentNode} style={{ width: 150, marginLeft: "10px", marginRight: "30px" }} onChange={that.handleChanges}>
                                <Option value="">全部</Option>
                                <Option value="international">国际站(Alibaba.com)</Option>
                                <Option value="china">中文站</Option>
                                <Option value="aliexpress">国际站(Aliexpress.com)</Option>
                            </Select>
                        </div>
                        <FormItem className="consDIVx">
                            <div style={{ display: "inline-block" }}>状态</div>

                            <Select defaultValue="全部" getPopupContainer={trigger => trigger.parentNode} style={{ width: 240, marginLeft: "10px",marginRight:"20px", float: "right" }} onChange={that.handleChangex}>
                                <Option value="">全部</Option>
                                <Option value="case_processing">案件处理中</Option>
                                <Option value="audit_rejected">投诉未受理</Option>
                                <Option value="compromised">投诉方已接受通知</Option>
                                <Option value="success">投诉侵权内容处理</Option>
                                <Option value="failed">投诉内容保留</Option>
                                <Option value="cancelled">投诉方撤诉</Option>
                            </Select>

                            <FormItem style={{ marginLeft: "10px",marginRight:"25px",marginTop:"10px" }}>
                                <Button htmlType="submit"  className="btn6">查询</Button>
                            </FormItem>
                        </FormItem>

                    </div>

                </Form>
                <div className="content-fot">
                    <Button onClick={that.PLCS} style={{ marginBottom: "10px" }}>批量撤诉</Button>
                    <Table
                        pagination={false}
                        rowKey="id"
                        rowSelection={rowSelection}
                        scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                        columns={that.state.ProductInformation_list}
                        dataSource={that.state.get1688List}
                        onChange={that.handleTableChange}
                    />

                    <div className="ProductInformationFooter">
                        <div className='footer'>
                            <div className='info'>
                                {`共 ${that.state.totalNum} 条记录 `}
                                &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                            </div>
                            <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showQuickJumper />

                        </div>
                    </div>
                    <Modal
                        maskClosable={false}
                        visible={that.state.visible}
                        onOk={that.handleOk}
                        onCancel={that.handleCancels}
                        className='YellowWhite'
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