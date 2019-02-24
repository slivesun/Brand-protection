import Tpl from './tpl';
import ajax from '../../../../js/common/ajax';
import { Form, message, Row, Col, Tree, Icon, Input, Select, Button } from 'antd';
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

const AddItemFrom = Form.create()((props) => {
    const { getFieldDecorator } = props.form;
    const removeDepartNext = () => {
        let addBoxx = props.state.addBox;
        // let expandedKeys = new Set(props.state.expandedKeys);
        // expandedKeys.delete(`${props.item.id}`)
        addBoxx.delete(props.item.id)
        props.state.addBox = addBoxx
        // props.state.expandedKeys = [...expandedKeys]
        props.getList()
    }
    const addHandleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                if (values.departName != undefined && values.departName != "") {
                    if (values.departName.length <= 50) {
                        ajax.post('/hcm/departmentin/savaDepartment', {
                            parentId: props.item.id,
                            departName: values.departName,
                            departLeader: []
                        })
                            .then((res) => {
                                if (res.data.status == 10000) {
                                    props.getList()
                                    removeDepartNext()
                                } else if (res.data.status == 10400) {
                                    message.error(res.data.message)
                                    props.getList()
                                    removeDepartNext()
                                }
                            })
                    } else {
                        message.error("部门名称限制50个字符以内！")
                    }
                } else {
                    message.error("请输入新增的部门名称！")
                }
            }
        });
    }

    return (
        <Form>
            <Row  style={{ justifyContent: 'space-between',alignItems: 'center', height: 40,marginTop: 8}} type="flex" justify='space-between'>
                <Col span={9}>
                    <FormItem >
                        {getFieldDecorator('departName', {

                        })(<Input placeholder="请输入部门名称" style={{ position: "absolute", width: "240px", bottom: "-20px" }} />)}
                    </FormItem>
                </Col>
                <Col span={9}>
                    <FormItem style={{ width: "100%" }}>
                        {getFieldDecorator('departLeader', {

                        })(<Select
                            style={{ position: "absolute", width: "240px", bottom: "-20px" }}
                            mode="multiple"
                            placeholder="请选择负责人"
                        >
                            <Option value="disabled" disabled>暂无数据</Option>
                        </Select>)}
                    </FormItem>
                </Col>
                <Col className='text-right' span={4}>
                    <FormItem>
                        <Row type="flex" justify='space-between'>

                            <Col>
                                <a onClick={addHandleSubmit}> 确定</a>

                            </Col>
                            <Col>
                                <a onClick={removeDepartNext}>取消</a>

                            </Col>
                        </Row>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    )
});

const AxlomisdBox = Form.create()((props, p) => {
    const { getFieldDecorator } = props.form;
    // console.log(props.childrenString.childrenStrings)
    console.log(props.item)

    const handleChange = (value) => {

        props.childrenString.onChangeSele = value;
        // console.log(props.childrenString.onChangeSele)
    }
    const hSumChangedele = () => {
        let addBoxx = props.childrenString.addBoxtwo;
        let expandedKeys = new Set(props.childrenString.expandedKeystwo);
        expandedKeys.delete(`${props.item.id}`)
        //console.log(addBoxx)
        addBoxx.delete(props.item.id)
        //console.log(addBoxx)
        props.childrenString.addBoxtwo = addBoxx
        props.childrenString.expandedKeystwo = [...expandedKeys]
        props.getList()

    }

    const hSumChange = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (values.departNamel != undefined && values.departNamel != "") {
                    if (values.departNamel.length <= 50) {
                        
                            ajax.post('/hcm/departmentin/savaDepartment', {
                                parentId: props.item.parentid,
                                id: props.item.id,
                                departName: values.departNamel,
                                departLeader: values.departName
                            })
                            .then((res) => {
                                if (res.data.status == 10000) {
                                    hSumChangedele()

                                } else if (res.data.status == 10400) {
                                    message.error(res.data.message)
                                    hSumChangedele()
                                }
                            })
                        
                            
                        
                    } else {
                        message.error("部门名称限制50个字符以内！")
                    }
                } else {

                    message.error("请输入新增的部门名称！")
                }
            }
        });
    }
    return (
        <Row className='item' type="flex" justify='space-between'>
            <Col span={9}>
                <FormItem >
                    {getFieldDecorator('departNamel', {
                        initialValue: props.item.departName
                    })(<Input placeholder="请输入部门名称" />)}
                </FormItem>
            </Col>
            <Col span={9}>
                <FormItem >
                    {getFieldDecorator('departName', {
                        initialValue: props.item.leaderid ?+props.item.leaderid :null
                    })(
                        <Select
                            style={{ display: "block", width: '250px', marginTop: "5px" }}
                            placeholder="请选择负责人"
                        >
                            {
                                props.childrenString.childrenString != "" ?
                                    props.childrenString.childrenString[0].map((d, i) => <Option key={i} value={d.id}>{d.realname}</Option>) : ""
                            }
                        </Select>
                        )}
                </FormItem>
            </Col>
            <Col span={4}>
                <Row type="flex" justify='space-between'>

                    <Col>
                        <a onClick={hSumChange}>保存</a>

                    </Col>
                    <Col>
                        <a onClick={hSumChangedele}>取消</a>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
});

class DepartmentManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: [],
            addshow: false,
            expandedKeys: [],
            expandedKeystwo: [],
            visible: false,
            confirmLoading: false,
            handleOk: "",
            handleOkEId: "",
            ModalText: '',
            ModalTexts: "",
            m: false,
            onChangeSele: [],
            childrenString: [],
            childrenStrings: [],
            addBox: new Set(),
            addBoxtwo: new Set()
        }
    }
    addStatus = (bl) => {
        this.setState({
            addshow: bl
        })
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        this.getList(()=>{
            let treeData = this.state.treeData;
            let arr = []
            function loop(data){
                data.forEach((item,index)=>{
                    if(item.subSysDepartmentIn){
                        arr.push(`${item.id}`)
                        loop(item.subSysDepartmentIn)
                    }
                })
            }
            loop(treeData)
            this.setState({
                expandedKeys:arr
            })
        })
        
    }
    handleCancels = () => {
        this.setState({
            visible: false,
        });
    }
    handleOk = () => {
        if (this.state.handleOk.subSysDepartmentIn == null) {
            this.setState({
                ModalText: '你确认要删除该部门嘛？',
                confirmLoading: true,
            });
            ajax.post('/hcm/departmentin/deleteDepartment', {
                id: this.state.handleOk.id
            })
                .then((res) => {
                    // console.log(res)
                    if (res.data.status == 10000) {
                        setTimeout(() => {
                            this.setState({
                                visible: false,
                                confirmLoading: false,
                            });
                            this.getList()
                        }, 2000);
                    } else if (res.data.status == 10420) {

                        message.error(res.data.message)
                        setTimeout(() => {
                            this.setState({
                                visible: false,
                                confirmLoading: false,
                            });
                            this.getList()
                        }, 2000);
                    }
                })
        } else {
            this.setState({
                ModalText: '您暂时不能删除该部门',
                ModalTexts: "原因该部门下存在子级或子账号！",
                confirmLoading: false,
                visible: false,
            });
        }
    }
    getList = (fun) => {
        ajax.get('/hcm/departmentin/fuByIds', {
            params: {
                id: 0
            }
        })
            .then((response) => {
                this.setState({
                    treeData: response.data.data
                },()=>fun?fun():null)
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }

    creatTreeDom = (data) => {
        let addBox = this.state.addBox;
        return (
            data.map((item, index) => {

                return (
                    <TreeNode className={item.subSysDepartmentIn || addBox.has(item.id) ? '' : 'leaf'} title={this.titleTreeNode(item)} key={item.id}>

                        {
                            addBox.has(item.id) ?
                                <TreeNode className={'leaf'} title={<AddItemFrom state={this.state} getList={this.getList} item={item} />} key={'add' + item.id} />
                                :
                                null
                        }
                        {
                            item.subSysDepartmentIn ?
                                this.creatTreeDom(item.subSysDepartmentIn)
                                :
                                null
                        }
                    </TreeNode>
                )
            })
        )
    }

    BJDepartNext = (item) => {
        ajax.post('/hcm/userin/getListByDepartment', {//负责人
            departmentId: item.id
        }).then((res) => {
            if (res.data.status == 10000) {
                const result = res.data.data;
                const data = [];
                const date = []
                result.forEach((r) => {
                 //   console.log(r)
                    data.push({
                        realname: r.realname,
                        id: r.id
                    });
                    date.push(r.id);
                });
               // console.log()
                this.setState({
                    childrenString: [],
                    childrenStrings: []
                }, () => {
                    this.state.childrenString.push(data)
                    this.state.childrenStrings.push(date)
                    let addBoxtwo = this.state.addBoxtwo;
                    let expandedKeys = new Set();
                    expandedKeys.add(`${item.id}`)
                    addBoxtwo.clear()
                    addBoxtwo.add(item.id)

                    this.setState({
                        addBoxtwo,
                        expandedKeystwo: [...expandedKeys]
                    })
                })
            }
        })

    }
    RemoveDepartNext = (item) => {
        this.setState({
            visible: true,
            handleOk: item
        });
        if (item.subSysDepartmentIn == null) {
            this.setState({
                ModalText: '你确认要删除该部门嘛？',
                ModalTexts: ""
            });
        } else {
            this.setState({
                ModalText: '您暂时不能删除该部门,',
                ModalTexts: "原因该部门下存在子级或子账号！"
            });
        }
    }
    addDepartNext = (item) => {
        let addBox = this.state.addBox;
        let expandedKeys = new Set(this.state.expandedKeys);
        expandedKeys.add(`${item.id}`)
        addBox.add(item.id)
        console.log(addBox)
        this.setState({
            addBox,
            expandedKeys: [...expandedKeys]
        })
    }

    titleTreeNode = (item) => {
        let {addBoxtwo,expandedKeystwo} = this.state;
        return (
            <React.Fragment>
                {
                    addBoxtwo.has(item.id) ? <AxlomisdBox childrenString={this.state} getList={this.getList} removeDepartNext={this.removeDepartNext} item={item} /> : <Row className='item' type="flex" justify='space-between'>
                        <Col span={9} style={{overflow:"hidden"}}>
                            {item.departName}
                        </Col>
                        <Col span={9}>
                            负责人:{item.departLeader}
                        </Col>
                        <Col span={4}>
                            <Row type="flex" style={{height:'100%'}} justify='space-between'>
                                <Col>
                                    <a onClick={() => this.addDepartNext(item)}>新增下级</a>
                                </Col>
                                <Col>
                                    <a  onClick={() => this.BJDepartNext(item)}>编辑</a>

                                </Col>
                                <Col>
                                    <a onClick={() => this.RemoveDepartNext(item)}>删除</a>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }
            </React.Fragment>

        )
    }
    onExpand = (expandedKeys, evtnt) => {
        this.setState({
            expandedKeys
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default DepartmentManagement




