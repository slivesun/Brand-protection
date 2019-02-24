import Tpl from './tpl';
import ajax from '../../../js/common/ajax';
import lib from '../../../js/common/lib';
import { Form, message, Modal } from 'antd';
const confirm = Modal.confirm;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columnsList: [],
            version:null,

            list: [],
            visible: false,
            id: null,
            roleName: null,
            sortNumber: null,
            roleDescription: null,

            rolename: null,
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,

            menuList: [],
            checkedKeys: [],
            AuthorizationVisible: false,
            targetId: null
        }
    }
    componentDidMount() {

        this.getList()
        this.getMenuList()
        this.getColumnsList()
    }
    AuthorizationVisible = (bl, id,version, arr) => {
        this.setState({
            version,
            AuthorizationVisible: bl,
            targetId: id,
            checkedKeys: arr
        })
    }
    SubmitAuthorization = () => {
        let { targetId,version, checkedKeys } = this.state;
        ajax.post('/hcm/saveMenuqx', {
            roleId: targetId,
            version,
            menuIds: checkedKeys.join(',')
        }).then(res => {
            this.AuthorizationVisible(false, null,null, [])
            this.getList()
            message.success(res.data.message)
        })
    }
    onVisible = (bl) => {
        if (bl) {
            this.setState({
                visible: bl
            })
        } else {
            this.setState({
                visible: bl,
                id: null,
                roleName: null,
                sortNumber: null,
                roleDescription: null,
            })
        }

    }


    onCheckBox = (checkedKeys, e) => {
        let props = e.node.props;
        let mySet = new Set(this.state.checkedKeys);
        console.log(props)
        if (props.children) {
            if (props.checked) {
                mySet.delete(props.eventKey)
                props.children.forEach((item, index) => {
                    mySet.delete(item.key)
                })
            } else {
                mySet.add(props.eventKey)
                props.children.forEach((item, index) => {
                    mySet.add(item.key)
                })
            }
        } else {
            if (props.checked) {
                mySet.delete(props.eventKey)
            } else {
                mySet.add(props.eventKey)
            }
        }
        this.setState({
            checkedKeys: [...mySet]
        })
        // let checkedKeys = this.state.checkedKeys;
        // checkedKeys.add(checkedKeys);
        // console.log(checkedKeys)
    }
    getMenuList = () => {
        ajax.get('/hcm/menu/getList', {
            params: {
                type: 'ALL'
            }
        }).then(res => {
            this.setState({
                menuList: res.data.data
            })
        })
    }

    handleOk = () => {
        let { roleName, sortNumber, roleDescription, id } = this.state;
        if (!lib.required(roleName)) {
            message.warning('请输入角色名称')
            return
        }
        if (!lib.required(sortNumber)) {
            message.warning('请输入排序号码')
            return
        }
        if (!lib.legnthCheck(roleName, 'INPUT')) {
            message.warning('角色名称字符不允许超过50')
            return
        }
        if (!lib.legnthCheck(sortNumber, 'INPUT')) {
            message.warning('排序号码字符不允许超过50')
            return
        }
        if (!lib.legnthCheck(roleDescription, 'URL')) {
            message.warning('备注字符不允许超过500')
            return
        }
        ajax.post('/hcm/role/save', {
            roleName, sortNumber, roleDescription, id
        }).then(res => {
            this.getList()

        })
    }
    onChange = (value, type) => {
        this.setState({
            [type]: typeof value === 'object' ? value.target.value : value
        })
    }
    getList = () => {
        let { pageNo, pageSize, rolename } = this.state;
        ajax.get('/hcm/role/getRolePage', {
            params: {
                pageNo, pageSize, rolename
            }
        }).then(res => {
            this.setState({
                list: res.data.data.content,
                pageNo: res.data.data.pageNumber,
                pageSize: res.data.data.pageSize,
                totalNum: res.data.data.totalElements,
            })
            this.onVisible(false)
        })
    }
    columns = () => {
        let arr = [{
            title: '排序',
            dataIndex: 'sort_number',
            key: 'sort_number',
        }, {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '角色名称',
            dataIndex: 'role_name',
            key: 'role_name',
        }, {
            title: '备注',
            dataIndex: 'role_description',
            key: 'role_description',
        }];
        this.state.columnsList.forEach((item,index)=>{
            arr.push({
                title: item.dictName,
                dataIndex: item.id,
                key: item.id,
                render:(text,item2,index2)=> <a onClick={() => this.AuthorizationVisible(true, item2.id,item.id, item2[`${item.id}`] ? item2[`${item.id}`].split(',') : [])}>授权</a>
            })
        })
        arr.push({
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            render: (text, item, index) =>
                <React.Fragment>
                    {/* <a onClick={() => this.AuthorizationVisible(true, item.id, item.menuIds ? item.menuIds.split(',') : [])}>授权</a> */}
                    <a onClick={() => this.itemEdit(item)} style={{ marginLeft: 20 }}>编辑</a>
                    {
                        +item.id < 50 ?
                            null :
                            <a onClick={() => this.rmEdit(item)} style={{ marginLeft: 20 }}>删除</a>
                    }

                </React.Fragment>

        })
        return arr
    }
    getColumnsList = () => {
        ajax.get('/hcm/sys/GetList', {
            params: {
                dictcode: 'version'
            }
        }).then(res => {
            this.setState({
                columnsList: res.data.data
            })
        })
    }



    rmEdit = (item) => {
        let that = this;
        confirm({
            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确定要删除该角色吗?</p><p>删除后<span className='red'>无法恢复！</span></p></div>,
            okText: '删除',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk() {
                ajax.post('/hcm/role/delete', {
                    roleId: item.id
                }).then(res => {
                    that.getList()
                    if (res.data.status === '10000') {
                        message.success(res.data.message)
                    } else {
                        message.error(res.data.message)
                    }

                })
            },

        });
    }
    itemEdit = (item) => {
        this.setState({
            id: item.id,
            roleName: item.role_name,
            sortNumber: item.sort_number,
            roleDescription: item.role_description,
        }, this.onVisible(true))
    }
    changePagination = (page, pageSize) => {
        this.setState({
            pageNo: page,
            pageSize: pageSize,
        }, () => {
            this.getList()
        })
    }
    onPaginationSize = (current, size) => {
        this.setState({
            pageNo: 1,
            pageSize: size,
        }, () => {
            this.getList()
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);