
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Select, Button, Modal, Icon, Breadcrumb, Form, TreeSelect, Input, Alert, Table, Pagination, Popconfirm, Tooltip } from 'antd';
const FormItem = Form.Item;

const Tpl = ThatMain((that) => {
    let { columns, state } = that;
    return (
        <ContentBox
            breadcrumbList={['用户管理', '字典表设置']}
            linkList={['', '']}
        >
        <div className='SetDictionary'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>字典表设置</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}


            <div className='content'>
                <Button type="dashed" className='add' onClick={()=>that.actionVisible(true)} >+ 新增字典</Button>
                <Table rowKey='id' pagination={false} columns={columns()} dataSource={state.data} />
            </div>
            <BindBoxFrom that={that} />
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>
    )
})
const BindBoxFrom = Form.create()((props) => {
    let { state ,actionVisible,subAdd} = props.that;
    const { getFieldDecorator, resetFields, validateFields } = props.form;
    let {id,type,parentId,...initValue} = state.targetData
    const addHandleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                values.parentId = 0
                if(type&&type=='add'){
                    values.parentId = id 
                }else{
                    values.parentId = parentId
                    values.id = id
                }
                subAdd(values,resetFields,type)
            }
        });
    }
    const cancel = (e) => {
        e.preventDefault();
        actionVisible(false,resetFields)
    }
    if(type&&type=='add'){
        initValue = {}
    }
    return (
        <Modal
            maskClosable={false}
            title={id ? type=='add'?`父级名称:${state.targetData.dictName}`:'编辑':'新增'}
            onCancel={cancel}
            visible={state.actionVisible}
            onOk={addHandleSubmit}
        >
            <Form onSubmit={addHandleSubmit}>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 18 }} 
                    label="dictName"
                >
                    {getFieldDecorator('dictName',{ rules: [{ required: true, message: '请输入名称!' }],initialValue: initValue.dictName })(<Input />)}
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 18 }} 
                    label="dictCode"
                >
                    {getFieldDecorator('dictCode',{  rules: [{ required: true, message: '请输入Code!' }],initialValue: initValue.dictCode })(<Input />)}
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 18 }} 
                    label="sortNumber"
                >
                    {getFieldDecorator('sortNumber',{ initialValue: initValue.sortNumber })(<Input />)}
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 18 }} 
                    label="pricename"
                >
                    {getFieldDecorator('pricename',{ initialValue: initValue.pricename })(<Input />)}
                </FormItem>
                
            </Form>
        </Modal>
    );
});

export default Tpl