import { AddIcon } from '../../../components/Component';
import ThatMain from '../../../HOC/That';
// import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout'

import { Select, Button, Modal,Icon, Breadcrumb, Form,TreeSelect, Input, Alert, Table, Pagination, Popconfirm, Tooltip } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import FullSpin from '../../../components/FullSpin';
const Tpl = ThatMain((that) => {
    let { fullSpinVisible } = that.state;
    return (
        <ContentBox
            breadcrumbList={['用户管理', '客服账号']}
            linkList={['',  '']}
            history={that.props.history}
        >
        <div className='serviceinfo'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>客服账号</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <Service that={that} />
            {/* <Copyright clazzName='copyright' /> */}
            <FullSpin spinning={fullSpinVisible} />
        </div>
        </ContentBox>
    )
})

const Service = ThatMain((that) => {
    let { dataList, realname, username, status, totalNum, pageSize, pageNo, columns, checkAll } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName]&&that.state[fieldName].length?
        <Icon
            type="close-circle"
            onClick={()=>that.handleClearIconClick(fieldName)}
            style={clearIconStyle}
        />
        :null
    )
    return (
       
        <div className='content service'>
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>姓名:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'realname')} value={realname} suffix={clearIcon('realname')} className='ipt' style={{ width: 200 }} />
                    </div>
                    <div className='item'>
                        <span className='lab'>用户名:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'username')} value={username} suffix={clearIcon('username')} className='ipt' style={{ width: 200 }} />
                    </div>
                    <div style={{position: 'relative' }} id="status"  className='item'>
                        <span className='lab'>状态:</span>
                        <Select onChange={(e) => that.seSearchIpt(e, 'status')} value={status} className='ipt' style={{ width: 200 }} getPopupContainer={() => document.getElementById('status')}>
                            <Option value={null}>全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </div>
                </div>
                <div className='butbox'>
                    <Button onClick={e => that.onSearch()}>查询</Button>
                </div>
            </div>
            <div className='add-all'>
                <Button onClick={() => that.stateModal(true, '新增', false)} className='add  btn1-main' type="primary"><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                <Button onClick={() => that.allClick()}>{columns[0].key == 'checkStatue' ? '取消批量操作' : '批量操作'}</Button>
                {
                    columns[0].key == 'checkStatue' ?
                        <React.Fragment>
                            <Popconfirm title={<div>
                                {
                                    checkAll ?
                                        <p>你确认要启用<span className='red'>所有用户</span>吗？</p>
                                        :
                                        <p>你确认要启用该用户吗？</p>
                                }

                                <p>启用后账号将<span className='red'>恢复正常使用</span></p>
                            </div>} onConfirm={() => that.allStart()} okText="是" cancelText="否">
                                <Button>批量启用</Button>
                            </Popconfirm>
                            <Popconfirm title={<div>
                                {
                                    checkAll ?
                                        <p>你确认要停用<span className='red'>所有用户</span>吗？</p>
                                        :
                                        <p>你确认要启用该用户吗？</p>
                                }
                                <p>停用后账号将<span className='red'>无法使用</span></p>
                            </div>} onConfirm={() => that.allStop()} okText="是" cancelText="否">
                                <Button type="danger">批量停用</Button>
                            </Popconfirm>
                        </React.Fragment>
                        : null
                }

            </div>
            {
                columns[0].key == 'checkStatue' ?
                    <div style={{ padding: '10px' }}>
                        <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : dataList.filter((item, index) => item.checkStatue).length}</a> 项 <a onClick={() => that.checkAll(true)} style={{ marginLeft: '20px' }}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                    </div>
                    : null
            }
            <Table pagination={false} rowKey='id' columns={columns} dataSource={dataList} />

            <div className='footer'>
                <div className='info'>
                    {`共 ${totalNum} 条记录 `}
                    &nbsp;&nbsp;
                {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                </div>
                <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

            </div>
            <AddModal that={that} />
        </div>
    )
})

const AddModal = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    let { visible, type, targetModal,rolePage,treeData} = that.state;

    type == '新增' ? targetModal = {} : targetModal = targetModal
    return (
        <Modal
            title={type}
            maskClosable={false} 
            footer={null}
            onCancel={() => that.stateModal(false, '', false)}
            visible={visible}
        >
            {visible ?

                <Form onSubmit={(e) => that.handleSubmit(e)}>
                    <FormItem
                        label="姓名"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('realname', {
                            initialValue: targetModal.realname,
                            rules: [{ required: true, message: '请输入' }]
                        })(
                            <Input maxLength="32"/>
                        )}
                    </FormItem>
                    <FormItem
                        label={<span className='required'>用户名</span>}

                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Tooltip overlayStyle={{ maxWidth: '400px' }} placement="right" title={<ul><li>6 - 16 个字符，可使用数字、字母、下划线;</li><li>需以字母开头，字母区分大小写。</li><li>首尾空格无效;</li><li>创建后不可修改;</li></ul>}>

                            {getFieldDecorator('username', {
                                initialValue: targetModal.username
                            })(
                                <Input  autocomplete = "off" disabled={type == '新增' ? false : true} />
                            )}
                        </Tooltip>
                    </FormItem>
                    <FormItem
                        label={<span className='required'>密码</span>}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Tooltip placement="right" title={'6 - 16  个字符'}>
                            {getFieldDecorator('password', {
                                initialValue: targetModal.password
                            })(
                                <Input  autocomplete = "off" type='password' />
                            )}
                        </Tooltip>
                    </FormItem>
                    <FormItem
                        label="所属部门"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('departmentid', {
                            initialValue: targetModal.departmentid,
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <TreeSelect
                                
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={treeData}
                                showSearch
                                treeNodeFilterProp='title'
                                
                                placeholder="请选择"
                                treeDefaultExpandAll
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="角色菜单"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('roleIds', {
                            initialValue: targetModal.roleIds,
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <Select getPopupContainer={() => document.getElementById('status')}>
                                {
                                    rolePage.map((item,index)=>{
                                        return(
                                            <Option key={index} value={item.id}>{item.role_name}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="备注说明"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('memo', {
                            initialValue: targetModal.memo,
                            rules: [{ required: false, message: '请输入' }],
                        })(
                            <TextArea />
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{ offset: 20 }}
                    >
                        <Button className='btn2-main' htmlType="submit">
                            保存
                    </Button>
                    </FormItem>
                </Form>
                : null
            }
        </Modal>)
})

export default Tpl