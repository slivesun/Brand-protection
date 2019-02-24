import ajax from '../../../../js/common/ajax';
import {Input, Button,Select,Modal,message,TreeSelect} from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departmentList:this.props.departmentList,
            visible:this.props.visible,
            parentId:null,
            departName:null,
            leaderList:[],
            departLeader:[]
        }
    }
    componentDidMount() {
        
    }
    getDepartmentLeaderList = ()=>{
        let {parentId} = this.state;
        ajax.get('/hcm/userout/getDepartmentLeaderList', {
            params:{
                departmentId: parentId
            }
        }).then((response) => {
            this.setState({
                leaderList:response.data.data,
                departLeader:[]
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    chTreeSelect=(value, label, extra, type)=>{
        let state = this.state;
        state[type] = value;
        this.setState(state,()=>{
            // this.getDepartmentLeaderList()
        })
    }
    onChange = (e,type)=>{
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    componentWillReceiveProps(nextProps){
        let {departmentList=[]} = nextProps;
        // let departmentList = []
        this.setState({
            parentId:null,
            departName:null,
            departLeader:[],
            visible: nextProps.visible,
            departmentList:departmentList
        },()=>{
            if(departmentList.length==0|| (departmentList[0]&&departmentList[0].key != '0')){
                departmentList.unshift({
                    key:'0',
                    title:'无',
                    value:'0',
                })
            }
            
        })
    }
    handleChange=(e)=>{
        this.setState({
            departLeader:e
        })
    }
    onSubmit = ()=>{
        let {parentId,departName,departLeader} = this.state;
        if(!parentId){
            message.error('请选择父级部门');
            return
        }
        if(!departName||departName.length <= 0 ){
            message.error('请输入部门名称');
            return
        }
        ajax.post('/hcm/department/savaDepartment', {
            parentId,departName,
            departState:1,
            departLeader:departLeader.join(',')
        }).then((response) => {
            if(response.data.status=='10000'){
                message.success(response.data.message)
                let {onShowAdd,getDepartmentList} = this.props;
                getDepartmentList()
                onShowAdd(false)
            }else{
                message.warning(response.data.message)
            }
            
        }).catch((error) => {
            message.error(error.statusText);
        });
    
    }
    render(){
        let {departmentList,visible,parentId,departName,leaderList,departLeader} = this.state;
        let {onShowAdd} = this.props;
        return(
            <Modal
                maskClosable={false} 
                title="新增部门"
                visible={visible}
                className='add-department'
                onCancel={()=>onShowAdd(false)}
                onOk={()=>this.onSubmit()}
                >
                <ul className='items'>
                    <li className='item'>
                        <span className='title  red-ck'>父级部门</span>
                        <div className='ipt-box'>
                            <TreeSelect
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                            value={[parentId]}
                            treeData={departmentList}
                            onChange={(value, label, extra) => this.chTreeSelect(value, label, extra, 'parentId')}
                            />
                        </div>
                    </li>
                    <li className='item'>
                        <span className='title  red-ck'>部门名称</span>
                        <div className='ipt-box'>
                            <Input onChange={(e)=>this.onChange(e,'departName')} value={departName}/>
                        </div>
                    </li>
                    {/* <li className='item'>
                        <span className='title'>部门负责人</span>
                        <div className='ipt-box'>
                            <Select
                                mode="multiple"
                                onChange={e=>this.handleChange(e)}
                                value={departLeader}
                                style={{width:'100%'}}
                            >
                            {
                                leaderList.map((item,index)=><Option key={index} value={item.id}>{item.realname}</Option>)
                            }
                            </Select>
                        </div>
                    </li> */}
                </ul>
            </Modal>
        )
    }
}
export default App;