import Tpl from './tpl';
import { message,Divider,Dropdown,Menu,Modal,Icon,Switch} from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:null,
            realname:null,
            departid:null,
            status:null,

            oldSearch:{
                username:null,
                realname:null,
                departid:null,
                status1:null,
            },


            departmentList:[],
            selectedRowKeys:[],
            checkAll:false,
            dataList:[],
            totalNum:0,
            pageSize:10,
            pageNo:1,

        }
    }
    componentDidMount() {
        this.getList()
        this.getDepartmentList()
       
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
    checkAll = (bl) => {
        let selectedRowKeys = this.state.selectedRowKeys;
        if (bl) {
            this.state.dataList.forEach((item, index) => {
                selectedRowKeys.push(item.userid)
            })

        } else {
            selectedRowKeys = []
        }
        this.setState({
            checkAll: bl,
            selectedRowKeys: selectedRowKeys
        })
    }


    allStartOrStop = (type,status)=>{
        let {selectedRowKeys,checkAll,totalNum} = this.state;
        if (type=='all'&&selectedRowKeys.length == 0) {
            message.error('至少选择一条');
            return
        }
        let data = {};
        let confirminfo = {};
        let {username,realname,departid,status1} = this.state.oldSearch;
        if(type=='all'){
            data = {
                userIds: checkAll ? 'checkAllBmc':selectedRowKeys.join(','),
                status: status,
                usertype:'c',
                realname: checkAll  ? realname : '',
                departid: checkAll  ? departid : '',
                username: checkAll  ? username: '',
                status1: checkAll ? status1: '',
            }
            if(status=='0'){
                confirminfo.title = null
                confirminfo.content = <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要停用勾选的 {checkAll? totalNum :selectedRowKeys.length} 项用户账号吗?</p><p>停用后<span className='red'>账号将无法使用</span></p></div>
            }else{
                confirminfo.title = null
                confirminfo.content = <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要启用勾选的 {checkAll? totalNum :selectedRowKeys.length} 项用户账号吗?</p><p>启用后<span className='red'>账号将恢复正常使用</span></p></div>
            }
            
        }else{
            data = {
                userIds: type,
                status: status,
                usertype:'c'
            }
            if(status=='0'){
                confirminfo.title = null
                confirminfo.content = <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要停用该用户吗？</p><p>停用后<span className='red'>账号将无法使用</span></p></div>
            }else{
                confirminfo.title = null 
                confirminfo.content = <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要启用该用户账号吗？</p><p>启用后<span className='red'>账号将恢复正常使用</span></p></div>
            }
        }
        let that = this;
        confirm({
            title: confirminfo.title,
            content: confirminfo.content,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm YellowWhite',
            onOk() {
                ajax.post('/hcm/user/StartOrStop',data)
                .then((response) => {
                    if (response.data.status == '10000') {
                        that.setState({
                            checkAll:false,
                            selectedRowKeys:[]
                        },()=>{
                            that.onSearch(true)
                        })
                        
                        message.success(response.data.message);
                    }
                })
                .catch((error) => {
                    message.error(error.statusText);
                });
            },
            
        });
        
    }

    unBindphone = (record) => {
        let that = this;
        confirm({
            title: '你确认要解绑该用户绑定手机吗？',
            content: <p>解绑后<span className='red'>账号将取消当前绑定手机</span></p>,
            okText: '确定',
            cancelText: '取消',
            className:'YellowWhite',
            onOk() {
                ajax.get('/hcm/user/UnbindPhone', {
                    params: {
                        mobiles:record.userid,
                        usertype: 'c'
                    }
                })
                .then((response) => {
                    message.success(response.data.message);
                    if (response.data.status == '10000') {
                        that.getList()
                    }
                })
                .catch((error) => {
                    message.error(error.statusText);
                });
            },
            
        });
        
    }
    onTableCheckChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
            checkAll: false
        });
    }
    getDepartmentList=()=>{
        ajax.get('/hcm/department/fuByIds', {
            params: {
                id:0,
            }
        }).then((response) => {
            if(response.data.status=='10000'&&response.data.data){
                let data = response.data.data;
                function format(data){
                    return data.map((item,index)=>{
                        if(item.subSysDepartment!=null){
                            return {
                                title:item.departName,
                                value:`${item.id}`,
                                key: `${item.id}`,
                                children:format(item.subSysDepartment)
                            }
                            
                        }else{
                            return {
                                title:item.departName,
                                value:`${item.id}`,
                                key: `${item.id}`,
                            }
                        }
                        
                    })
                }
                let arr = format(data);
                
                arr.unshift({
                    title:'全部',
                    value:null,
                    key: null
                })
                this.setState({
                    departmentList:arr
                })
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onSearch= (bl=false) =>{
        this.setState({
            pageNo:1,
            username: bl ? null :this.state.username,
            realname: bl ? null :this.state.realname,
            departid: bl ? null :this.state.departid,
            status: bl ? null :this.state.status,
            oldSearch:{
                username: bl ? null :this.state.username,
                realname: bl ? null :this.state.realname,
                departid: bl ? null :this.state.departid,
                status1: bl ? null :this.state.status,
            },
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {realname,username,departid,status,pageNo,pageSize} = this.state;
        ajax.get('/hcm/userout/getUseroutChildrenPage', {
            params: {
                realname,username,departid,status,pageNo,pageSize
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                dataList:data.content,
                totalNum:data.totalElements,
                pageSize:data.pageSize,
                pageNo:data.pageNumber,
                
            })
            
        }).catch((error) => {
            message.error(error.statusText);
        });
        
        
    }
    chSearchIpt = (e,type)=>{
        let state = this.state;
        if(e&&e.target && e.target.nodeName=="INPUT"){
            state[type] = e.target.value;
        }else{
            state[type] = e;
        }
        this.setState(state)

    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    chTreeSelect=(value, label, extra, type)=>{
        if(value !== undefined){
            let state = this.state;
            state[type] = value;
            this.setState(state)
        }
        
    }
    
    formatColumn = ()=>{
        return[
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text,item,index)=> index+1
            },
            {
                title: '姓名',
                dataIndex: 'realname',
                key: 'realname',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '绑定手机',
                dataIndex: 'mobile',
                key: 'mobile',
                render: (text,item,index)=>text&&text.length ? 
                <p>
                    {text}
                    <a  style={{paddingLeft:'10px'}} onClick={() => this.unBindphone(item)}><Icon type="link" />解绑手机</a>
                </p>:'--'
            },
            {
                title: '所在部门',
                dataIndex: 'depart_name',
                key: 'depart_name',
            },
            {
                title: '备注说明',
                dataIndex: 'memo',
                key: 'memo',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, item, index) => {
                    // text == '1' ? <span className='open'>启用</span> : <span className='close'>禁用</span>
                    return (
                        <Switch checked={text == '1' ? true:false} onChange={()=>this.allStartOrStop(item.userid,item.status =='0'?'1':'0')} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                       
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width:116,
                className:'action-padding',
                align:'right',
                render: (text,item,index) => <div>
                    <a href={`/index.html#/AccountManagement/edit/${item.userid}`}>
                        <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_edit.png' />
                        编辑
                    </a>
                </div>,
            },
        ]
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
