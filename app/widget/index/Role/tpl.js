
import ThatMain from '../../HOC/That';
import ContentBox from '../../components/Layout'
import { Select, Pagination, Tree, Button, Table, Modal, Form, Input, InputNumber, Switch, Breadcrumb, Row, Col } from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const { TextArea } = Input;
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { pageNo, pageSize, totalNum, list } = that.state;
    return (
        <ContentBox
            breadcrumbList={['角色管理']}
            linkList={['']}
        >
        <div className='role'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='but-box'>
                <Button onClick={() => that.onVisible(true)}>新增角色</Button>
            </div>
            <div className='content'>
                <Table rowKey='id' pagination={false} dataSource={list} columns={that.columns()} />
                <div className='footer'>
                    <div className='info'>
                        {`共 ${totalNum} 条记录 `}
                        &nbsp;&nbsp;
                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                    </div>
                    <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                </div>
            </div>
            <RoleAction that={that} />
            <Authorization that={that} />
        </div>
        </ContentBox>
    )
})
const Authorization = ThatMain((that) => {
    let {menuList,checkedKeys,AuthorizationVisible} = that.state;
    let renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
                <TreeNode title={<span>{item.menuAlias}</span>} key={item.id} >
                    {renderTreeNodes(item.children)}
                </TreeNode>
            );
          }
          return <TreeNode title={<span>{item.menuAlias}</span>} key={item.id} />
        });
    }
    return (
        <Modal
            title="授权"
            maskClosable={false}
            visible={AuthorizationVisible}
            onCancel={() => that.AuthorizationVisible(false,null,null,[])}
            onOk={that.SubmitAuthorization}
        >
            <Tree checkedKeys={checkedKeys} onCheck={(checkedKeys, e)=>that.onCheckBox(checkedKeys, e)} checkStrictly={true} checkable >
                {renderTreeNodes(menuList)}
            </Tree>
        </Modal>
    )
})


const RoleAction = ThatMain((that) => {
    let { roleName, sortNumber, roleDescription, visible } = that.state;
    return (
        <Modal
            title="角色操作"
            maskClosable={false}
            visible={visible}
            onOk={that.handleOk}
            onCancel={() => that.onVisible(false)}
        >
            <Row style={{ marginBottom: 10 }} align='middle' type="flex">
                <Col pull={1} className='text-right required' span={6}>角色名称:</Col>
                <Col span={18}>
                    <Input onChange={(value) => that.onChange(value, 'roleName')} value={roleName} placeholder='请输入角色名称' />
                </Col>

            </Row>
            <Row style={{ marginBottom: 10 }} align='middle' type="flex">
                <Col pull={1} className='text-right required' span={6}>排序:</Col>
                <Col span={18}>
                    <InputNumber onChange={(value) => that.onChange(value, 'sortNumber')} value={sortNumber} placeholder='请输入角色排序' style={{ width: '100%' }} />
                </Col>

            </Row>
            <Row style={{ marginBottom: 10 }} align='top' type="flex">
                <Col pull={1} className='text-right' span={6}>角色描述:</Col>
                <Col span={18}>
                    <TextArea onChange={(value) => that.onChange(value, 'roleDescription')} value={roleDescription} placeholder='请输入角色描述' rows={4} />
                </Col>
            </Row>
        </Modal>
    )
})
export default Tpl
