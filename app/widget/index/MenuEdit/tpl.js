
import ThatMain from '../../HOC/That';
import ContentBox from '../../components/Layout'
import { Select, Button, Table, Modal, Form, Input, InputNumber, Switch } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { list, menu_type, visible, type, tergetData } = that.state;
    const { getFieldDecorator } = that.props.form;

    const columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '15%',
    }, {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
        width: '10%',
    }, {
        title: '菜单状态',
        dataIndex: 'menuState',
        key: 'menuState',
        width: '10%',
        render: (text) => text == '1' ? '开' : '关'
    }, {
        title: '菜单图标',
        dataIndex: 'menuIcon',
        key: 'menuIcon',
        width: '10%',
    }, {
        title: '菜单链接',
        dataIndex: 'menuUrl',
        key: 'menuUrl',
        width: '10%',
    },{
        
        title: '前端模块路径',
        dataIndex: 'modulename',
        key: 'modulename',
        width: '10%',
    }, {
        title: '菜单父级ID',
        dataIndex: 'parentid',
        key: 'parentid',
        width: '10%',
    }, {
        title: '排序',
        dataIndex: 'sortNumber',
        key: 'sortNumber',
        width: '10%',
    }, {
        title: '操作',
        dataIndex: '',
        key: '',
        width: '10%',
        align: 'center',
        render: (text, record, index) => {
            return (
                <div className='operation'>
                    <a onClick={() => that.modalVisible(true, record, '编辑')}>编辑</a>
                    <a onClick={() => that.rmMenu(record)}>删除</a>
                </div>
            )
        }
    }];
    return (
        <ContentBox
            breadcrumbList={['菜单列表']}
            linkList={['']}
        >
        <div className='menuedit'>
            <header>
                <div>
                    <Select onChange={(value, option) => that.menuType(value, option)} value={menu_type} style={{ width: 200 }}>
                        <Option value="ALL">全部(ALL)</Option>
                        <Option value="HCM">品牌方（HCM）</Option>
                        <Option value="ADMIN">管理员（ADMIN）</Option>
                        <Option value="KEFU">客服（KEFU）</Option>
                        <Option value="DEALER">经销商（DEALER）</Option>
                    </Select>
                    <Button onClick={() => that.getList()} className='search-btn'>查询</Button>
                </div>
                <div>
                    <Button onClick={() => that.modalVisible(true, {}, '新增')}>新增</Button>
                </div>
            </header>
            <div className='content'>
                <Table rowKey={record => record.id} className='item-table' pagination={false} columns={columns} dataSource={list} />
            </div>
            <Modal
                title={type}
                maskClosable={false} 
                footer={null}
                onCancel={() => that.modalVisible(false, {})}
                visible={visible}
            >
                {
                    visible ?

                        <Form onSubmit={(e) => that.handleSubmit(e)}>
                            <FormItem
                                label="菜单名称"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('menuName', {
                                    initialValue: tergetData.menuName,
                                    rules: [{ required: true, message: '请输入' }]
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="别名"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('menuAlias', {
                                    initialValue: tergetData.menuAlias,
                                    rules: [{ required: true, message: '请输入' }]
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="菜单链接"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('routePath', {
                                    initialValue: tergetData.routePath,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="路由链接"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('menuUrl', {
                                    initialValue: tergetData.menuUrl,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="前端模块路径"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('modulename', {
                                    initialValue: tergetData.modulename,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="菜单图标"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('menuIcon', {
                                    initialValue: tergetData.menuIcon,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="菜单父级ID"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('parentid', {
                                    initialValue: tergetData.parentid,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <InputNumber style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="排序"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('sortNumber', {
                                    initialValue: tergetData.sortNumber,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <InputNumber style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="备注"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('remark', {
                                    initialValue: tergetData.remark
                                })(
                                    <TextArea rows={4} />
                                )}
                            </FormItem>

                            
                            <FormItem
                                label="菜单状态"
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('menuState', {
                                    valuePropName: 'checked',
                                    initialValue: tergetData.menuState  ===   '1' ? true : false,
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Switch checkedChildren="开" unCheckedChildren="关"  />
                                )}
                            </FormItem>
                            <FormItem
                                wrapperCol={{ offset: 20 }}
                            >
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button>
                            </FormItem>
                        </Form>
                        :
                        null
                }
            </Modal>
        </div>
        </ContentBox>
    )
})
export default Tpl
