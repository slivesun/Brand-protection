import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, Input, Button, Tree, Select, message } from 'antd'
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

const FormItem = Form.Item;
class DepartmentManagement extends React.Component {
    constructor(props) {
        // document.title = '部门管理';
        super(props)

        this.state = {
            treeData: null,
            state: {
                expandedKeys: ['0-0-0', '0-0-1'],
                autoExpandParent: true,
                checkedKeys: ['0-0-0'],
                selectedKeys: [],
            },
            children: [],
            childrenString: "",
            childrenBTPl: "",
            Edit: false,
            EditNone: false,
            NewFor: false,
            Addnew: false,
            subSysDepartment: "",
            HtWO:""
        }
    }
    componentDidMount() {
        this.onLoading()
    }

    onLoading = () => {

        ajax.post('/hcm/department/fuByIds', {//部门列表
            id: 0,
            bmcid:this.props.match.params.id
        }).then((res) => {
            if (res.data.status == 10000) {
                this.setState({
                    treeData: res.data.data,
                    HtWO:this.props.match.params.tits
                })
            }
        })


    }

    onExpand = (expandedKeys, type) => {
        console.log(expandedKeys, type)
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

 

   
    handle = () => {
        this.setState({
            NewFor: false
        })
    }
    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys
        });
    }

   
    renderTreeNodes = (data) => {


        // console.log(this.state.Addnew)
        return data.map((item, index) => {
            if (item.subSysDepartment) {
                const { getFieldDecorator } = this.props.form;
  
                return (
                    <TreeNode title={<Form className="TreeBox" key={item.id} style={{ display: "flex", width: "100%" }}>

                        <div className="TreeBoxDiv">
                            <span className="TreeBoxSpan">{item.departName}</span>
                           </div>
                        <div className="TreeBoxDiv"><span className="TreeBoxSpan" >
                            负责人：
                            {item.departLeader}</span>

                        </div>
                    </Form>
                    } key={item.id} dataRef={item}>

                        {this.renderTreeNodes(item.subSysDepartment)}
                    </TreeNode>
                )

            }
            const { getFieldDecorator } = this.props.form;

      
            return <TreeNode key={item.id} title={<Form className="TreeBox" key={item.id} style={{ display: "flex", width: "100%" }}>

                <div className="TreeBoxDiv"><span className="TreeBoxSpan">{item.departName}</span>
                      </div>
                <div className="TreeBoxDiv"><span className="TreeBoxSpan">
                    负责人：{item.departLeader}</span>
                </div>
            </Form>
            }  {...item}>
            </TreeNode>
        })
    }



    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(DepartmentManagement)