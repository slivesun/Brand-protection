
import ThatMain from '../../../HOC/That';
// import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout'
import { AddIcon } from '../../../components/Component';
import { Select, Button, Modal, DatePicker, Breadcrumb, Icon, Form, Input, Alert, Table, Pagination, Popconfirm, Tooltip } from 'antd';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const { TextArea } = Input;
import FullSpin from '../../../components/FullSpin';
const Tpl = ThatMain((that) => {
    let { fullSpinVisible } = that.state;
    return (
        <ContentBox
            breadcrumbList={['用户管理', '品牌方账号']}
            linkList={['', '']}
            history={that.props.history}
        >
            <div className='brandinfo'>
                {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>品牌方账号</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
                <Brand that={that} />
                {/* <Copyright clazzName='copyright' /> */}
                <FullSpin spinning={fullSpinVisible} />
            </div>
        </ContentBox>
    )
})

const Brand = ThatMain((that) => {
    let { dataList, customerList, versionList, version, companyMemoname, companyname, username, status, kefu, totalNum, pageSize, pageNo, columns, checkAll } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName] && that.state[fieldName].length ?
            <Icon
                type="close-circle"
                onClick={() => that.handleClearIconClick(fieldName)}
                style={clearIconStyle}
            />
            : null
    )
    return (
        <div className='content brand'>
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>公司名称:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'companyname')} value={companyname} suffix={clearIcon('companyname')} className='ipt' style={{ width: 200 }} />
                    </div>
                    <div className='item'>
                        <span className='lab'>用户名:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'username')} value={username} suffix={clearIcon('username')} className='ipt' style={{ width: 200 }} />
                    </div>
                    <div className='item'>
                        <span className='lab'>备注名:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'companyMemoname')} value={companyMemoname} suffix={clearIcon('companyMemoname')} className='ipt' style={{ width: 200 }} />
                    </div>


                </div>
                <div className='butbox'>
                    <div style={{ position: 'relative' }} id="status" className='item'>
                        <span className='lab'>状态:</span>
                        <Select onChange={(e) => that.seSearchIpt(e, 'status')} value={status} className='ipt' style={{ width: 200 }} getPopupContainer={() => document.getElementById('status')}>
                            <Option value={null}>全部</Option>
                            <Option value="1">启用</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </div>
                    <div className='item' style={{ position: 'relative' }} id="kefu">
                        <span className='lab'>服务客服:</span>
                        <Select showSearch onChange={(e) => that.seSearchIpt(e, 'kefu')} value={kefu} className='ipt' filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: 200 }} getPopupContainer={() => document.getElementById('kefu')}>
                            <Option value={null}>全部</Option>
                            {
                                customerList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.realname}</Option>
                                    )
                                })
                            }
                        </Select>

                    </div>
                    <div className='item' style={{ position: 'relative' }} id="version">
                        <span className='lab'>使用版本:</span>
                        <Select onChange={(e) => that.seSearchIpt(e, 'version')} value={version} className='ipt' filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: 200 }} getPopupContainer={() => document.getElementById('version')}>
                            <Option value={null}>全部</Option>
                            {
                                versionList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.dictName}</Option>
                                    )
                                })
                            }
                        </Select>

                    </div>

                </div>
                <div className='butbox' style={{ justifyContent: 'flex-end' }}>
                    <div className='item' style={{ justifyContent: 'flex-end', paddingRight: '76px' }}>
                        <Button onClick={e => that.onSearch()}>查询</Button>
                    </div>
                </div>
            </div>
            <div className='add-all'>
                <Button onClick={() => that.stateModal(true,'新增',false)} className='add btn1-main' type="primary"><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                <Button onClick={() => that.allClick()}>{columns[0].key == 'checkStatue' ?'取消批量操作':'批量操作'}</Button>
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
                            <Button onClick={() => that.stateEditService(true)} type="primary">批量变更客服</Button>
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
            <Table pagination={false} loading={that.state.login} rowKey='userid' columns={columns} dataSource={dataList} />

            <div className='footer'>
                <div className='info'>
                    {`共 ${totalNum} 条记录 `}
                    &nbsp;&nbsp;
                {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                </div>
                <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
            </div>
            <AddModal that={that} />
            <BindBoxFrom that={that} />

            <EditService that={that} />

        </div>
    )
})

const AddModal = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    let { visible, type, targetModal, customerList, rolePage, versionList } = that.state;
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
                        label={<span className='required'>公司名称</span>}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('companyname', {
                            initialValue: targetModal.companyname
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label={<span>备注名</span>}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                        style={{ position: 'relative' }}
                    >
                        {getFieldDecorator('companyMemoname', {
                            initialValue: targetModal.companyMemoname
                        })(
                            <Input />
                        )}
                        {/* <Tooltip title="用户名不支持修改，请仔细考虑！">
                        <Icon type="info-circle" theme="outlined" style={{position:'absolute',top:'3px',right:'-25px'}} />
                    </Tooltip> */}
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

                                <Input disabled={type == '新增' ? false : true} />

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

                                <Input type='password' />

                            )}
                        </Tooltip>
                    </FormItem>
                    <FormItem
                        label={<span className='required'>服务客服</span>}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('kefuid', {
                            initialValue: targetModal.kefuid ? targetModal.kefuid.split(',') : []
                        })(
                            <Select showSearch mode="multiple" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >

                                {
                                    customerList.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id + ''}>{item.realname}</Option>
                                        )
                                    })
                                }
                            </Select>
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
                                    rolePage.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.role_name}</Option>
                                        )
                                    })
                                }

                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="使用版本"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('version', {
                            initialValue: targetModal.versionid,
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <Select getPopupContainer={() => document.getElementById('status')}>
                                {
                                    versionList.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.dictName}</Option>
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
                        label="账号有效期"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('validtime', {
                            initialValue: targetModal.validtime ? moment(targetModal.validtime) : moment().add(1, 'year'),
                            rules: [{ required: true, message: '请输入' }],
                        })(
                            <DatePicker disabledDate={(currentDate) => currentDate && currentDate < moment().subtract(1, 'days')} style={{ width: '100%' }} />
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
const EditService = ThatMain((that) => {
    let { editService, customerList, oService } = that.state;
    return (
        <Modal
            maskClosable={false}
            title={'变更客服'}
            onCancel={() => that.stateEditService(false)}
            visible={editService}
            onOk={() => that.allEditService()}
        >
            <div className='editService'>
                <span className='lab'>服务客服:</span>
                <Select mode="multiple" onChange={e => that.selectService(e)} value={oService} showSearch className='ipt' filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{ width: '100%' }}>

                    {
                        customerList.map((item, index) => {
                            return (
                                <Option key={index} value={item.id}>{item.realname}</Option>
                            )
                        })
                    }
                </Select>

            </div>

        </Modal>
    )
})


const BindBoxFrom = Form.create()((props) => {

    const { getFieldDecorator, resetFields, validateFields } = props.form;
    const { state, actionVisible, onBindSubmit, fetchUser, onSelectBlur, onSelect, onDeselect } = props.that;
    const addHandleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {

                onBindSubmit(values, resetFields)

            }
        });
    }
    const cancel = (e) => {
        e.preventDefault();
        resetFields();
        actionVisible(false);
    }

    let ALcomplaiontId = state.targetData.alid ? state.targetData.alid.split(',') : []
    let JDcomplaiontId = state.targetData.jdid ? state.targetData.jdid.split(',') : []
    return (
        <Modal
            maskClosable={false}
            title={'绑定投诉账号'}
            onCancel={cancel}
            visible={state.actionVisible}
            onOk={addHandleSubmit}
            className='YellowWhite'
        >
            <Form onSubmit={addHandleSubmit}>
                <FormItem
                    label={<span>阿里投诉账号</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                >
                    {getFieldDecorator('ALcomplaiontId', {
                        initialValue: ALcomplaiontId

                    })(
                        <Select
                            mode="multiple"
                            filterOption={false}
                            onBlur={(e) => onSelectBlur(e, 'aliList')}
                            onSearch={(e) => fetchUser(e, 'aliList')}
                            onSelect={(e, option) => onSelect(e, option, 'aliList', 'oldaliList')}
                            onDeselect={(e, option) => onDeselect(e, option, 'aliList', 'oldaliList')}
                            style={{ width: '100%' }}
                        >
                            <OptGroup label="已选中">
                                {
                                    state.oldaliList.map((item, index) => {
                                        return (
                                            <Option key={item.id}>{`${item.title}:${item.username}`}</Option>
                                        )
                                    })
                                }
                            </OptGroup>
                            <OptGroup label="搜索结果">
                                {

                                    state.aliList.map((item, index) => {
                                        return (
                                            <Option key={item.id}>{`${item.title}:${item.username}`}</Option>
                                        )
                                    })
                                }
                            </OptGroup>
                            {/* <Option key={23}>gggg</Option> */}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label={<span>京东投诉账号</span>}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                >
                    {getFieldDecorator('JDcomplaiontId', {
                        initialValue: JDcomplaiontId

                    })(
                        <Select
                            mode="multiple"
                            filterOption={false}
                            onBlur={(e) => onSelectBlur(e, 'jdList')}
                            onSearch={(e) => fetchUser(e, 'jdList')}
                            onSelect={(e, option) => onSelect(e, option, 'jdList', 'oldjdList')}
                            onDeselect={(e, option) => onDeselect(e, option, 'jdList', 'oldjdList')}
                            style={{ width: '100%' }}
                        >

                            <OptGroup label="已选中">
                                {
                                    state.oldjdList.map((item, index) => {
                                        return (
                                            <Option key={item.id}>{`${item.title}:${item.username}`}</Option>
                                        )
                                    })
                                }
                            </OptGroup>
                            <OptGroup label="搜索结果">
                                {

                                    state.jdList.map((item, index) => {
                                        return (
                                            <Option key={item.id}>{`${item.title}:${item.username}`}</Option>
                                        )
                                    })
                                }
                            </OptGroup>

                        </Select>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});


export default Tpl

