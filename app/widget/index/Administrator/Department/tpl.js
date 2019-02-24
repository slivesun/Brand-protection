import ThatMain from '../../../HOC/That'
// import Footer from "../../../components/Copyright"
import ContentBox from '../../../components/Layout'

import ajax from "../../../../js/common/ajax"
import { Form, Breadcrumb, Button,Modal, Input, Icon, message, Select, Row, Col, Tree } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const Tpl = ThatMain((that) => {
    let { addshow, treeData, expandedKeys,visible,confirmLoading,ModalText,ModalTexts } = that.state;
    return (
        <ContentBox
        breadcrumbList={['用户管理', '内部部门管理']}
        linkList={['',  '']}
        history={that.props.history}
        >
        <div className='DepartmentManagement'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        内部部门管理
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='add-box'>
                    <Button disabled={addshow} onClick={() => that.addStatus(true)} className='add-but ' type='dashed'>+新增部门</Button>
                </div>
                {
                    addshow ?
                        <AddBoxFrom that={that} />
                        : null
                }
                <div className='tree-list'>
                    {
                        treeData!=null ?
                            <Tree  expandedKeys={expandedKeys} onExpand={(expandedKeys, evtnt) => that.onExpand(expandedKeys, evtnt)} showLine>
                                {that.creatTreeDom(treeData)}
                            </Tree>
                            : null
                    }

                </div>
            </div>
            <Modal
                maskClosable={false}
                visible={visible}
                onOk={that.handleOk}
                confirmLoading={confirmLoading}
                onCancel={that.handleCancels}
                className='YellowWhite'
            >
                <span style={{ display: "inline-block " }}> <img src="../../../../img/userTB.jpg" alt="" /> </span>
                <span style={{ display: "inline-block ", marginLeft: "10px", marginTop: "20px" }}> <h5>{ModalText}</h5>
                    <h5>{ModalTexts}</h5>
                </span>
            </Modal>
            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl



const AddBoxFrom = Form.create()((props) => {

    const { getFieldDecorator } = props.form;
    const { addStatus, getList } = props.that;
    const addHandleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                if (values.departNamex != "" && values.departNamex != undefined) {
                    if(values.departNamex.length<=50){
                        if (values.defaultValue != undefined) {
                            ajax.post('/hcm/departmentin/savaDepartment', {
                                parentId: 0,
                                departName: values.departNamex,
                                departLeader: values.defaultValue.join(",")
                            })
                                .then((res) => {
                                    // console.log(res)
                                    if (res.data.status == 10000) {
                                        getList()
                                        addStatus(false)
                                    } else if (res.data.status == 400) {
                                        message.error(res.data.message)
                                    }
                                })
                        } else {
                            ajax.post('/hcm/departmentin/savaDepartment', {
                                parentId: 0,
                                departName: values.departNamex,
                                departLeader: ""
                            })
                                .then((res) => {
                                    console.log(res)
                                    if (res.data.status == 10000) {
                                        getList()
                                        addStatus(false)
                                    } else if (res.data.status == 400) {
                                        message.error(res.data.message)
                                    } else if (res.data.status == 10400) {
                                        message.error(res.data.message)
                                    }
                                })
                        }
                    }else{
                        message.error("新增部门名字限制50个字符以内！")
                    }
                   
                } else {
                    message.error("请输入新增部门名称！")
                }
            }
        });
    }
    return (
        <Form onSubmit={addHandleSubmit}>
            <Row style={{ marginTop: 20,justifyContent: 'space-between',alignItems: 'center', height: 40,marginTop: 14}} type="flex" justify='space-between'>
                <Col style={{height:'100%'}} span={9}>
                    <FormItem >
                        {getFieldDecorator('departNamex', {

                        })(<Input placeholder="请输入部门名称" />)}
                    </FormItem>
                </Col>
                <Col style={{height:'100%'}} span={9}>
                    <FormItem >
                        {getFieldDecorator('departLeader', {

                        })(<Select
                            mode="multiple"
                            placeholder="请选择负责人"
                        >
                            <Option value="disabled" disabled>暂无数据</Option>
                        </Select>)}
                    </FormItem>
                </Col>
                <Col style={{height:'100%'}} className='text-right' span={4}>
                    <FormItem>
                        <Button type="primary" htmlType="submit"> 确定 </Button>
                        <Button onClick={() => addStatus(false)} style={{ marginLeft: '20px' }} type="primary" >取消 </Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
});
