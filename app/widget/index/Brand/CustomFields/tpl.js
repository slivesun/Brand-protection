
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout';
import { Table, Input, Button, Icon, Breadcrumb, Select, Modal, Pagination, Form } from 'antd';
const Tpl = ThatMain((that) => {
    let FORMtit = {
        fontSize: "14px",
        fontFamily: "PingFang-SC-Medium",
        color: "rgba(51,51,51,1)",
        lineHeight: "40px",
        height: "40px",
        marginRight: "5px",
        marginTop: "10px",
        width: "100%",
        float: "left"
    }
    let FORMtitHidex = that.state.FORMtitHides ? " block " : "none"

    let FORMtitHide = {
        fontSize: "14px", fontFamily: "PingFang-SC-Medium", color: "rgba(51,51,51,1)", lineHeight: "40px", marginRight: "5px", marginTop: "10px", width: "100%", float: "left", /*overflowY: "scroll", height: "200px",*/
        display: FORMtitHidex
    }
    let FORMtitHideb = {
        fontSize: "14px", fontFamily: "PingFang-SC-Medium", color: "rgba(51,51,51,1)", lineHeight: "40px", marginRight: "5px", marginTop: "10px", width: "100%", float: "left", height: "200px",
        display: FORMtitHidex
    }
    const FormItem = Form.Item;
    const Option = Select.Option;
    const { getFieldDecorator, getFieldValue } = that.props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };
    //const Editvisible=that.state.Editvisible==true ? getFieldDecorator('keys', { initialValue: that.state.bBRRay }) : getFieldDecorator('keys', { initialValue: [] })
    if (that.state.Editvisible == true) {
        const abcARR = that.state.bBRRay.map((v, k) => {
            return k
        })

        getFieldDecorator('keys', { initialValue: abcARR });
    } else {

        getFieldDecorator('keys', { initialValue: [] });
    }

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {

        return (
            <FormItem
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                label={index === 0 ? '选项：' : ''}
                required={false}
                key={k}
                style={{ /* width: "320px", marginLeft: "80px", marginBottom: "5px" */ }}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur']
                })(
                    <Input placeholder="" style={{ /* width: '80%', marginRight: 8 */width:'320px',marginRight:8 }} />
                    )}

                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => that.remove(k)}
                    />
                ) : null}
            </FormItem>
        );
    });

    document.getElementsByClassName("ant-btn-primary").style = "submit"
    return (
        <ContentBox 
            title="活动详情" 
            breadcrumbList={['客户盘点', '客户信息', '自定义字段']}
            linkList={['', '1', '']}
            history={that.props.history}
        >
        <div className='CustomFields'>
            {/* <div className="InformationNav">
                <Breadcrumb>
                    <Breadcrumb.Item>客户盘点</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/index.html#/ClientCheck">客户信息</a></Breadcrumb.Item>
                    <Breadcrumb.Item>自定义字段</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className="CustomFieldsBOX">
                <div className="CustomFieldsHeader">
                    <Button className="NewJ" type="primary" onClick={() => that.NewJ()}>
                        <Icon type="plus" style={{fontWeight:'700',fontSize:'14px'}} />新增
                </Button>
                </div>
                <div className="CustomFieldsBody">

                    <Table
                        pagination={false}
                        rowKey="id"
                        columns={that.state.CustomFields_list}
                        dataSource={that.state.data}
                        loading={that.state.loading}
                        onChange={that.handleTableChange}
                    />

                </div>
                {/* <div className="CustomFieldsFooter">
                    <div className='footer'>
                        <div className='info'>
                            {`共 ${that.state.totalNum} 条记录 `}
                           </div>
                        <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

                    </div>
                </div> */}


            </div>

            {/* <Footer className='Copyright'></Footer> */}

            <Modal 
                
                maskClosable={false} 
                title={that.state.type}
                visible={that.state.visible}
                footer={null}
                confirmLoading={that.state.confirmLoading}
                onCancel={() => that.handleCancel()}
            >
                <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ display: "inline-block" }}>
                    <div className="FORMtit" style={FORMtit}> <div className="FORMus" style={{ width: "auto", float: "left" }}> <b style={{ color: "red" }}>*</b> 字段名称：</div>
                        <FormItem className="tops"
                            style={{
                                width: "320px",
                                height: "60px",
                                float: "left", borderRadius: "2px"
                            }}>
                            {getFieldDecorator('FieldName', {
                                initialValue: that.state.FieldName || ""
                            })(
                                <Input className='user-name'
                                
                                    placeholder="请使用简短的字段名称，6字以内。"
                                //  getfieldsvalue={that.state.FieldNameValue}
                                />
                                )}
                        </FormItem>
                    </div>
                    
                    <div className="FORMtit" style={FORMtit}> <div className="FORMus" style={{ width: "auto", float: "left" }}> <b style={{ color: "#fff" }}>*</b> 字段占位：</div>
                        <FormItem className="tops"
                            style={{
                                width: "320px",
                                height: "60px",
                                float: "left", borderRadius: "2px"
                            }}>
                            {getFieldDecorator('FieldOccupancy', {
                                initialValue: that.state.FieldOccupancy || ""
                            })(
                                <Input className='user-name'
                                       maxLength="50"
                                      placeholder="请输入字段占位"
                                // value={that.state.FieldOccupancyValue}
                                />
                                )}
                        </FormItem>
                    </div>
                    <div style={{ marginLeft: "80px", fontSize: "14px", color: "#999" }}> 请填写字段占位，例如：“请输入姓名”</div>
                    <div className="FORMtit" style={FORMtit}> <div className="FORMus" style={{ width: "auto", float: "left" }}> <b style={{ color: "red" }}>*</b> 字段类型：</div>
                        <FormItem className="tops"
                            style={{
                                width: "320px",
                                height: "60px",
                                float: "left", borderRadius: "2px"
                            }}>
                            {getFieldDecorator('FieldType', {
                                initialValue: that.state.FieldType
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 320 }}
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    onChange={that.handleChange}
                                    filterOption={(input, option) => this.option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="TEXT">文本框</Option>
                                    <Option value="Single">文本域</Option>
                                    <Option value="SINGLESELECT">单选下拉框</Option>
                                    <Option value="MULTISELECT">多选下拉框</Option>
                                </Select>
                                )}
                        </FormItem>
                    </div>
                 
                    {
                        // that.state.bBRRay.length > 3 || that.state.uuid>3 ? 
                        <div className="FORMtit" style={FORMtitHide}>
                            <div className="FORMus" style={{ width: "auto", float: "left", marginLeft: "30px", position: "absolute" }}></div>

                            {formItems}
                            <FormItem {...formItemLayoutWithOutLabel}>
                                <Button 
                                    type="dashed" 
                                    onClick={that.add} 
                                    style={{ /* width: "55%", marginLeft: "15%" */ 
                                        width:'320px',
                                        color:'#1890ff',
                                        borderColor:'#1890ff'
                                    }}>
                                    <Icon type="plus" />
                                </Button>   
                            </FormItem>
                        </div> 
                        // : 
                        // <div className="FORMtit" style={FORMtitHideb}>
                        //         <div className="FORMus" style={{ width: "auto", float: "left", marginLeft: "30px", position: "absolute" }}></div>

                        //         {formItems}
                        //         <FormItem {...formItemLayoutWithOutLabel}>
                        //             <Button 
                        //                 type="dashed" 
                        //                 onClick={that.add} 
                        //                 style={{ 
                        //                 /* width: "55%", marginLeft: "15%" */ 
                        //                     width:'320px',
                        //                     color:'#1890ff',
                        //                     borderColor:'#1890ff'
                        //                 }}>
                        //                 <Icon type="plus" />
                        //             </Button>
                        //         </FormItem>
                        //     </div>
                        // null
                    }
                    <div className="FORMtit" style={FORMtit}>
                        <FormItem style={{ float: "left", marginLeft: "54%", marginRight: "0px" }}>
                            <Button className="btn2-main" type="primary" htmlType="submit">确认</Button>
                        </FormItem>
                        <FormItem style={{ float: "left", width: "60px", height: "40px" }}>
                            <Button className="btn2-sub noneFloat" onClick={() => that.handleCancel()}>取消</Button>
                        </FormItem>

                    </div>
                </Form>
            </Modal>
        </div>
        </ContentBox>
    )
})
export default Tpl