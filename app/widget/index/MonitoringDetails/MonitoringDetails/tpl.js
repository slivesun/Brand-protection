import './MonitoringDetails.less'
import ThatMain from '../../../HOC/That';
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
        <div className='MonitoringDetails'>
            <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        投诉查询
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        京东投诉查询

                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='content'>
                <div className="content-top" style={{ padding: "40px 20px" }}>
                    <div>
                        <b style={{ color: "red" }}>*</b>投诉账号
                        <Select placeholder={that.state.accountId} style={{ width: 240, marginLeft: "10px" }} onChange={that.handleChangex}>
                            {OPtionchildren}
                        </Select>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary">下载数据</Button>
                    </div>
                </div>

                <div className="content-fot">
                    <Select defaultValue="全部" style={{ width: 150, marginLeft: "10px", float: "left" }} onChange={that.handleChangex}>
                        <Option value="举证申诉">举证申诉</Option>
                        <Option value="撤诉">撤诉</Option>
                        <Option value="完成">完成</Option>
                    </Select>
                    <Table
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                        columns={that.state.ProductInformation_list}
                        dataSource={that.state.data}
                        loading={that.state.loading}
                        onChange={that.handleTableChange}
                    />

                    <div className="ProductInformationFooter">
                        <div className='footer'>
                            <div className='info'>
                            </div>
                            <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination}   showQuickJumper />

                        </div>
                    </div>
                    <Modal
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
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl