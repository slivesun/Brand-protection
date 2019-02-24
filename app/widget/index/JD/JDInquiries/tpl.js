import './JDInquiries.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Card, Icon, Tooltip, Button, Input, Modal, Select, DatePicker, Breadcrumb, Form, Pagination, Table } from 'antd';
const Tpl = ThatMain((that) => {
    const Option = Select.Option;
    const { RangePicker } = DatePicker;
    const { getFieldDecorator } = that.props.form;

    const FormItem = Form.Item;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const dateFormat = 'YYYY/MM/DD';
    const rowSelection = {
        selectedRowKeys: that.state.selectedRowKeys,
        onChange: that.onSelectChange,
    }
    const OPtionchildren = that.state.currentData ? that.state.currentData.map((d, i) => <Option key={d.username}>{d.username}</Option>) : ""

    return (
        <ContentBox
            breadcrumbList={['投诉查询', '京东投诉查询']}
            linkList={['', '']}
        >
                    <div className='JDInquiries'>
            {/* <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        京东投诉查询

                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}

            <div className='content'>
                <div className="content-top" >
                    <div style={{position: "relative",marginTop:"5px",fontSize:"14px" }}>
                        <b style={{ color: "red" }}>*</b>投诉账号
                        <Select getPopupContainer={trigger => trigger.parentNode}  placeholder={that.state.accountId} style={{ width: 240, marginLeft: "10px" }} onChange={that.handleChange}>
                            {OPtionchildren}
                        </Select>
                    </div>
                    <div style={{ textAlign: "right",position: "absolute",right: "10px",top: "25px" }}>
                        <a href={`/hcm/complaint/downLoad_jd?account_id=${that.state.accountId}&state=${that.state.state}`}>
                            <Button className="btn6">下载数据</Button>
                        </a>
        
                    </div>
                </div>

                <div className="content-fot"   style={{position:"relative"}}>
                    <Select defaultValue="全部" getPopupContainer={trigger => trigger.parentNode}  style={{ width: 240, marginLeft: "72px", float: "left" }} onChange={that.handleChangex}>
                        <Option value="">全部</Option>
                        <Option value="未处理">未处理</Option>
                        <Option value="处理中">处理中</Option>
                        <Option value="完成">完成</Option>
                    </Select>
                    <div style={{ marginTop: "40px" }}>
                        <Table
                            pagination={false}
                            rowKey="id"
                            scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                            columns={that.state.ProductInformation_list}
                            dataSource={that.state.data}
                            onChange={that.handleTableChange}
                        />
                    </div>

                    <div className="ProductInformationFooter">
                        <div className='footer'>
                            <div className='info'>
                                {`共 ${that.state.totalNum} 条记录 `}
                                &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                            </div>
                            <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} showQuickJumper />

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