
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { AddIcon } from '../../../components/Component';
import { Breadcrumb, Tabs, Form, Input, Button, Select, Alert, Table, Pagination, Icon, Modal } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Tpl = ThatMain((that) => {
    let { pageNo, pageSize, totalNum, checkAll, platform, title, selectedRowKeys, dataList } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => that.onTableCheckChange(selectedRowKeys),
    };

    return (
        <div className='ComplaintsAccount'>
            <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>投诉账号管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='content'>
                <Tabs style={{    display: 'flex',flexDirection: 'column'}} activeKey={platform} onChange={that.changeTabs}>
                    <TabPane tab="阿里投诉账号" key="ALIBABA">
                        <div className='list-box'>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Button className=' btn1-main' onClick={() => that.onAddBoxFrom(true)} style={{ marginRight: '10px',color:'#fff' }} ><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                                        <Button onClick={() => that.allStopStart()} style={{ marginRight: '10px' }} >批量删除</Button>
                                    </div>
                                    <Search
                                        placeholder="请输入"
                                        value={title}
                                        onSearch={that.onSearch}
                                        onChange={that.searchChange}
                                        style={{ width: 250 }}
                                    />
                                </div>
                                <div style={{ padding: '10px 0px' }}>
                                    <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                                </div>

                                <Table rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
                            </div>
                            <div className='footer'>
                                <div className='info'>
                                    {`共 ${totalNum} 条记录 `}
                                    &nbsp;&nbsp;
                                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                                </div>
                                <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                            </div>

                        </div>
                    </TabPane>
                    <TabPane tab="京东投诉账号" key="JINGDONG">
                        <div className='list-box'>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Button className=' btn1-main' onClick={() => that.onAddBoxFrom(true)} style={{ marginRight: '10px' }} >新增</Button>
                                        <Button onClick={() => that.allStopStart()} style={{ marginRight: '10px' }} >批量删除</Button>
                                    </div>
                                    <Search
                                        placeholder="请输入"
                                        value={title}
                                        onSearch={that.onSearch}
                                        onChange={that.searchChange}
                                        style={{ width: 250 }}
                                    />
                                </div>
                                <div style={{ padding: '10px 0px' }}>
                                    <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                                </div>

                                <Table rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
                            </div>
                            <div className='footer'>
                                <div className='info'>
                                    {`共 ${totalNum} 条记录 `}
                                    &nbsp;&nbsp;
                                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                                </div>
                                <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                            </div>

                        </div>
                    </TabPane>
                </Tabs>

            </div>
            <AddBoxFrom that={that} />
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl


const AddBoxFrom = Form.create()((props) => {

    const { getFieldDecorator,resetFields,validateFields } = props.form;
    const { state, onAddBoxFrom,onSubmit } = props.that;
    const addHandleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                onSubmit(values,resetFields);
                
            }
        });
    }
    const cancel = (e) => {
        e.preventDefault();
        resetFields();
        onAddBoxFrom(false)
    }

    
    return (
        <Modal
            maskClosable={false}
            title={state.targetData.id ? '编辑':'新增'}
            onCancel={cancel}
            visible={state.actionVisible}
            onOk={addHandleSubmit}
            className='YellowWhite'
        >
            <Form onSubmit={addHandleSubmit}>
                <FormItem
                    label={<span>名称</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('title', {
                        initialValue: state.targetData.title,
                        rules: [{ required: true, message: '请输入名称' }],
                    })(
                        <Input placeholder='请输入名称，并保持在25个字以内' maxLength={25} />
                    )}
                </FormItem>
                <FormItem
                    label={<span>账号</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('username', {
                        initialValue: state.targetData.username,
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input placeholder='请输入' maxLength={45} />
                    )}
                </FormItem>
                <FormItem
                    label={<span>密码</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('password', {
                        initialValue: state.targetData.password,
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input  placeholder='请输入' maxLength={45}/>
                    )}
                </FormItem>
                <FormItem
                    label={<span>{state.platform =='ALIBABA' ?'淘宝Cookie':'京东Cookie'}</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('cookie', {
                        initialValue: state.targetData.cookie,
                        rules: [{ required: true, message: '请输入淘宝Cookie' }],
                    })(
                        <Input placeholder='请输入' />
                    )}
                </FormItem>
                {
                    state.platform =='ALIBABA' ?
                    <FormItem
                        label={<span>1688Cookie</span>}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('cookie1688', {
                            initialValue: state.targetData.cookie1688
                        })(
                            <Input placeholder='请输入' />
                        )}
                    </FormItem>
                    :null
                }
            </Form>
        </Modal>
    );
});