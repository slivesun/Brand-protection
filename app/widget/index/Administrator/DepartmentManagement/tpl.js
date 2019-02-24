
import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import Footer from "../../../components/Copyright"

import { Form, Input, Alert, Tree,Breadcrumb, Select } from 'antd';

const Tpl = ThatMain((that) => {

    const FormItem = Form.Item;
    const Option = Select.Option;
    const { getFieldDecorator } = that.props.form;
    const TreeNode = Tree.TreeNode;

    return (
        <ContentBox
            breadcrumbList={['用户管理', '品牌方账号', '部门管理']}
            linkList={['', '1', '']}
        >
        <div className='DepartmentManagementb'>
            {/* <div className="InformationNavs">
                <Breadcrumb className='Breadcrumb'>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>   <a href="/index.html#/BrandList">品牌方账号</a> </Breadcrumb.Item>
                    <Breadcrumb.Item>部门管理</Breadcrumb.Item>
                </Breadcrumb>
                <h4>部门管理</h4>
            </div> */}
            <div className="DepartmentManagementBOX">
                <h2>{that.state.HtWO}</h2>
                <div className="DepartmentManagementtit">

                    {
                        that.state.treeData ?
                    <Tree
                        showLine
                        onExpand={that.onExpand}
                        expandedKeys={that.state.expandedKeys}
                        autoExpandParent={that.state.autoExpandParent}
                        checkedKeys={that.state.checkedKeys}
                        onSelect={that.onSelect}
                        selectedKeys={that.state.selectedKeys}
                    >
                        {that.renderTreeNodes(that.state.treeData)}
                    </Tree>
                    :
                    <Alert style={{textAlign:'center'}} message="暂无数据" type="error" />
                    }
                </div>

            </div>
            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl