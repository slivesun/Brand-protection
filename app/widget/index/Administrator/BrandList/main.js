import Tpl from './tpl';
import { Form, Modal, message, Checkbox, Menu, Dropdown, Icon ,Switch} from 'antd';
import ajax from '../../../../js/common/ajax';
import crypto from '../../../../js/common/crypto';
import lib from '../../../../js/common/lib';
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching:false,
            versionList:[],
            version:null,
            actionVisible:false,
            jdList:[],
            aliList:[],
            oldaliList:[],
            oldjdList:[],
            targetData:{},
            rolePage:[],
            login:false,
            fullSpinVisible: false,
            type: null,
            oService: [],
            dataList: [],
            editService: false,
            oldSearch:{
                companyname: null,
                username: null,
                companyMemoname: null,
                status: null,
                kefu: null,
            },
            targetModal: {
                bid: null,
                username: null,
                roleIds:null,
                versionid:null,
                companyname: null,
                kefu: null,
                validtime: null,
                password: '******',
                memo: null,
                companyMemoname: null,
            },
            customerList: [],
            companyname: null,
            status: null,
            username: null,
            companyMemoname: null,
            kefu: null,
            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalNum: null,
            columns: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: '5%',
                render: (text, record, index) => index + 1,
            }, {
                title: '客户名称',
                dataIndex: 'companyname',
                key: 'companyname',
                width: '10%',
                render: (text, record, index) => (
                    <a onClick={()=>this.Department(record)}>{record.companyname}</a>
                )
              
            }, {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: '10%',
            }, {
                title: '绑定手机',
                dataIndex: 'mobile',
                key: 'mobile',
                width: '10%',
                render: (text, item) => 
                    <div>
                        {text && text.length ? text :'--' }
                        {
                            text && text.length ? 
                            <span onClick={() => this.unBindphone(item)} className='unphone'>
                                <Icon type="link" />
                                解绑手机
                            </span> 
                            :
                            null
                        }
                    </div>
            }, {
                title: '服务客服',
                dataIndex: 'kefuname',
                key: 'kefuname',
                width: '10%',
            }, {
                title: '备注说明',
                dataIndex: 'memo',
                key: 'memo',
                width: '10%',
            }, {
                title: '备注名',
                dataIndex: 'companyMemoname',
                key: 'companyMemoname',
                width: '10%',
            }, {
                title: '账号有效期',
                dataIndex: 'validtime',
                key: 'validtime',
                width: '10%',
                render: text => text ? moment(text).format('YYYY-MM-DD') : null
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: '4%',
                render: (text, record, index) => {

                    return (
                        <Switch checked={text == '1' ? true:false} onChange={() => this.aAction('/hcm/user/StartOrStop',record.userid,text == '1' ? 0 :1)} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                    )
                }
            }, { 
                title: '操作',
                key: 'action',
                align: 'right',
                width: '10%',
                render: (text, record, index) => (
                    <span key='index'>
                        <a onClick={() => this.stateModal(true, '编辑', record)}>
                        <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_edit.png' />
                        编辑
                        </a>

                        <a style={{marginLeft:10}} onClick={() => this.actionVisible(true,record)}>
                            绑定
                        </a>
                    </span>
                ),
            }]
        }
    }
    actionVisible = (bl,item={}) =>{
        this.setState({
            actionVisible:bl,
            targetData:item
        },()=>{
            // this.getComplaintsAccountListJd()
            if(bl&&item.alid){
                this.getOldaliList(item.alid)
                
                
            }
            if(bl&&item.jdid){
                this.getOldjdList(item.jdid)
            }
            this.setState({
                jdList:[],
                aliList:[],
                oldaliList:[],
                oldjdList:[],
            })
            
        })
        
    }
    componentDidMount() {
        this.getList()
        this.getUserCustomer()
        this.getRolePage()
        this.getVersionList()
    }

    getVersionList = () => {
        ajax.get('/hcm/sys/GetList', {
            params: {
                dictcode: 'version'
            }
        }).then(res => {
            this.setState({
                versionList: res.data.data
            })
        })
    }
    onBindSubmit = (values,resetFields)=>{
        values.bmcid = this.state.targetData.bmcid;
        values.ALcomplaiontId = values.ALcomplaiontId.join(',');
        values.JDcomplaiontId = values.JDcomplaiontId.join(',');
        values.oldALcomplaiontId = this.state.targetData.alid;
        values.oldJDcomplaiontId = this.state.targetData.jdid;
        this.actionVisible(false)
        this.setState({
            login:true
        },()=>{
            ajax.post('/hcm/complaiont/saveBmcid',values)
            .then((response) => {
                if (response.data.status == '10000') {
                    this.getList()
                    
                    resetFields()
                    message.success(response.data.message);
                    this.setState({
                        login:false
                    })
                }else{
                    this.setState({
                        login:false
                    })
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                this.setState({
                    login:false
                })
                message.error(error.statusText);
            });
        })
        
    }
    
    getComplaintsAccountListAli=(value)=>{
        if(value==''){
            this.setState({
                aliList:[]
            })
            return
        }
        ajax.get('/hcm/complaiont/getList', {
            params: {
                platform:'ALIBABA',
                checkedids:this.state.oldaliList.map((item,index)=>item.id).join(','),
                keyword:value
            }
        }).then((response) => {
            this.setState({
                aliList:response.data.data
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
        
    }
    getComplaintsAccountListJd=(value)=>{
        if(value==''){
            this.setState({
                jdList:[]
            })
            return
        }
        ajax.get('/hcm/complaiont/getList', {
            params: {
                platform:'JINGDONG',
                checkedids:this.state.oldjdList.map((item,index)=>item.id).join(','),
                keyword:value
            }
        }).then((response) => {
            this.setState({
                jdList:response.data.data
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
        
    }
    fetchUser = (value,type)=>{
        if(type=='aliList'){
            this.getComplaintsAccountListAli(value)
        }else{
            this.getComplaintsAccountListJd(value)
        }
        
    }
    onSelectBlur = (value,type)=>{
        this.setState({
            [type]: [],
        });
    }
    getOldaliList = (checkedids)=>{
        ajax.get('/hcm/complaiont/getMapByCheckids', {
            params: {
                platform:'ALIBABA',
                checkedids:checkedids
            }
        }).then((response) => {
            this.setState({
                oldaliList:response.data.data||[]
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getOldjdList = (checkedids)=>{
        ajax.get('/hcm/complaiont/getMapByCheckids', {
            params: {
                platform:'JINGDONG',
                checkedids:checkedids
            }
        }).then((response) => {
            this.setState({
                oldjdList:response.data.data||[]
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onSelect = (e,option,type,oldtype)=>{
        let list = this.state[type];
        let target = list.filter((item,index)=>item.id==e);
        let oldList = this.state[oldtype];
        oldList.push(target[0])
        this.setState({
            [oldtype]:oldList,
            [type]:list.filter((item,index)=>item.id!=e)
        })
    }
    onDeselect = (e,option,type,oldtype)=>{
        let oldList = this.state[oldtype];
        let target = oldList.filter((item,index)=>item.id==e);
        let list = this.state[type];
        list.push(target[0])
        this.setState({
            [oldtype]:oldList.filter((item,index)=>item.id!=e),
            [type]:list
        })
    }

    
    Department = (value) => {
        window.location = "/index.html#/DepartmentManagements/"+value.bmcid+"/"+value.companyname
    }
    getUserCustomer = () => {
        // /hcm/userin/getUserCustomer
        ajax.get('/hcm/userin/getUserCustomer', {
            params: {
                status: 1
            }
        })
            .then((response) => {
                console.log(response)
                this.setState({
                    customerList: response.data.data
                })
            }).catch((error) => {
                message.error(error.statusText);
            });
    }
    getRolePage = () => {
        
        ajax.get('/hcm/role/getRolePage', {
            params: {
                pageNo:1,pageSize:999
            }
        }).then(res => {
            this.setState({
                rolePage: res.data.data.content,
            })
        })
    }
    chSearchIpt = (e, type) => {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    seSearchIpt = (e, type) => {
        let state = this.state;
        state[type] = e;
        this.setState(state)
    }
    onCheckbox(e, text, record, index) {
        // console.log(e,text, record, index);
        let dataList = this.state.dataList;
        if (dataList[index].checkStatue) {
            dataList[index].checkStatue = false;
        } else {
            dataList[index].checkStatue = true;
        }
        this.setState({
            dataList: dataList,
            checkAll: false
        })
    }
    onSearch= (bl=false) =>{
        this.setState({
            pageNo:1,
            version: bl ? null :this.state.version,
            companyname: bl ? null :this.state.companyname,
            username: bl ? null :this.state.username,
            status: bl ? null :this.state.status,
            kefu: bl ? null :this.state.kefu,
            companyMemoname: bl ? null :this.state.companyMemoname,
            oldSearch:{
                version: bl ? null :this.state.version,
                companyname: bl ? null :this.state.companyname,
                username: bl ? null :this.state.username,
                status: bl ? null :this.state.status,
                kefu: bl ? null :this.state.kefu,
                companyMemoname: bl ? null :this.state.companyMemoname,
            },
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {version, companyname, username, status,companyMemoname, kefu, pageNo, pageSize } = this.state;
        ajax.get('/hcm/userout/getUserPage', {
            params: {
                version:version,
                companyname: companyname,
                status: status,
                kefu: kefu,
                username: username,
                companyMemoname:companyMemoname,
                pageNo: pageNo,
                pageSize: pageSize,
            }

        }).then((response) => {
            this.setState({
                dataList: response.data.data.content,
                pageNo: response.data.data.pageNumber,
                pageSize: response.data.data.pageSize,
                totalNum: response.data.data.totalElements,
            }, () => {
                this.allClick(true)
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    allClick = (bl) => {
        let columns = this.state.columns;
        if (bl == true) {
            if (columns[0].key == 'checkStatue') {
                columns.splice(0, 1)
            }
            this.setState({
                columns: columns
            })
            return
        }
        if (columns[0].key == 'checkStatue') {
            columns.splice(0, 1)
        } else {
            columns.unshift(
                {
                    title: '',
                    dataIndex: 'checkStatue',
                    key: 'checkStatue',
                    width: '4%',
                    render: (text, record, index) => <Checkbox checked={record.checkStatue} onChange={e => this.onCheckbox(e, text, record, index)}></Checkbox>,
                }
            )
        }
        this.setState({
            columns: columns
        })
    }

    checkAll = (bl) => {
        let dataList = this.state.dataList;
        dataList.forEach((item, index) => {
            item.checkStatue = bl
        })
        this.setState({
            dataList: dataList,
            checkAll: bl
        })
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
    fullSpinVisible = (bl) => {
        this.setState({
            fullSpinVisible: bl
        })
    }
    allStart = () => {
        let arr = [];
        let {companyname,username,companyMemoname,status,kefu,version} = this.state.oldSearch;
        let dataList = this.state.dataList.filter((item, index) => item.checkStatue)
        dataList.forEach((item, index) => {
            arr.push(item.userid)
        })
        if (arr.length == 0) {
            message.error('至少选择一条');
            return
        }
        this.fullSpinVisible(true)
        ajax.post('/hcm/user/StartOrStop', {
            userIds: this.state.checkAll ? 'checkAllBmc' : arr.join(','),
            status: 1,
            usertype: 'c',
            companyname: this.state.checkAll  ? companyname : '',
            username: this.state.checkAll  ? username: '',
            companyMemoname: this.state.checkAll  ? companyMemoname: '',
            status1: this.state.checkAll ? status: '',
            kefu: this.state.checkAll ? kefu: '',
            version: this.state.checkAll ? version: '',
            
        })
            .then((response) => {
                this.fullSpinVisible(false)
                
                if (response.data.status == '10000') {
                    this.onSearch(true)
                    message.success(response.data.message);
                }else{
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                this.fullSpinVisible(false)
                message.error(error.statusText);
            });
    }
    allStop = () => {
        let arr = [];
        let {companyname,username,companyMemoname,status,kefu,version} = this.state.oldSearch;
        let dataList = this.state.dataList.filter((item, index) => item.checkStatue)
        dataList.forEach((item, index) => {
            arr.push(item.userid)
        })
        if (arr.length == 0) {
            message.error('至少选择一条');
            return
        }
        this.fullSpinVisible(true)
        ajax.post('/hcm/user/StartOrStop', {
            userIds: this.state.checkAll ? 'checkAllBmc' : arr.join(','),
            status: 0,
            usertype: 'c',
            companyname: this.state.checkAll  ? companyname : '',
            username: this.state.checkAll  ? username: '',
            companyMemoname: this.state.checkAll  ? companyMemoname: '',
            status1: this.state.checkAll ? status: '',
            kefu: this.state.checkAll ? kefu: '',
            version: this.state.checkAll ? version: '',
        })
            .then((response) => {
                this.fullSpinVisible(false)
                if (response.data.status == '10000') {
                    this.onSearch(true)
                    message.success(response.data.message);
                }else{
                    message.error(response.data.message);
                }
                
            })
            .catch((error) => {
                this.fullSpinVisible(false)
                message.error(error.statusText);
            });
    }
    aAction = (url, id, status) => {
        ajax.post(url, {
            userIds: id,
            status: status,
            usertype: 'c'
        })
            .then((response) => {
                message.success(response.data.message);
                if (response.data.status == '10000') {
                    this.getList()
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });

    }
    //---------
    handleSubmit = (e) => {
        e.preventDefault();
        let add_edit = (url, params) => {

            ajax.post(url, 
                params
            )
                .then((response) => {
                    LoadingModal({ bl: false })
                    message.success(response.data.message);
                    if (response.data.status == '10000') {
                        this.stateModal(false, '', false)
                        this.getList()
                    }
                })
                .catch((error) => {
                    LoadingModal({ bl: false })
                    message.error(error.statusText);
                });
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { targetModal, type } = this.state;

                targetModal.userid ? values.userId = targetModal.userid : values.userId = null
                targetModal.bid ? values.bid = targetModal.bid : values.bid = null;

                values.validtime = moment(values.validtime).format('YYYY-MM-DD');

                if (!lib.required(values.companyname)) {
                    message.error('请输入公司名称');
                    return
                }
                if(!lib.legnthCheck(values.companyname,'INPUT')){
                    message.error('公司名称长度不允许超过50');
                    return
                }
                
                if (type == '新增') {
                    if (!lib.checkAccount(values.username)) {
                        message.error('请按照要求用户名');
                        return
                    }
                }

                if (!lib.checkPassword(values.password)) {
                    message.error('密码长度不符');
                    return
                }
                if (!lib.required(values.kefuid)||(values.kefuid&&values.kefuid.length==0)) {
                    message.error('请选择服务客服');
                    return
                }
                if(!lib.legnthCheck(values.memo,'URL')){
                    message.error('备注说明长度不允许超过500');
                    return
                }
                
                LoadingModal({ bl: true, text: '保存中,请稍后...' })
                values.companyname = lib.trim(values.companyname);
                values.username = lib.trim(values.username);
                values.password = crypto.Encrypt(lib.trim(values.password));
                values.kefuid = values.kefuid.join(',');
                if (type == '新增') {
                    values.userId = '';
                    values.bid = '';
                    add_edit('/hcm/userout/saveUserOut', values)

                } else if (type == '编辑') {
                    add_edit('/hcm/userout/saveUserOut', values)

                }

            }

        })

    }
    stateModal = (visible, type, data) => {

        if (data === false) {
            data = {
                username: null,
                companyname: null,
                roleIds:null,
                versionid:null,
                kefu: null,
                Date: null,
                password: '******',
                memo: null,
            }
        }
        data.password = '******'
        data.roleIds = data.roleid
        this.setState({
            visible: visible,
            type: type,
            targetModal: data
        })
    }
    unBindphone = (record) => {
        ajax.get('/hcm/user/UnbindPhone', {
            params: {
                mobiles: record.userid,
                usertype: 'c'
            }
        })
            .then((response) => {
                message.success(response.data.message);
                if (response.data.status == '10000') {
                    this.getList()
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    allEditService = () => {
        let userIds = [];
        let bid = [];
        if (!lib.required(this.state.oService)||(this.state.oService&&this.state.oService.length==0)) {
            message.error('请选择服务客服');
            return
        }
        let {companyname,username,companyMemoname,status,kefu,version} = this.state.oldSearch;
        let dataList = this.state.dataList.filter((item, index) => item.checkStatue)
        dataList.forEach((item, index) => {
            userIds.push(item.userid);
            bid.push(item.bid);
        })
        
        ajax.post('/hcm/cus/multil_update_kefu', {
            
            bmcids: this.state.checkAll ? null : bid.join(','),
            userIds: this.state.checkAll ? null : userIds.join(','),
            kefu: this.state.oService.join(','),
            checkAll: this.state.checkAll ? true : null,
            companyname: this.state.checkAll  ? companyname : '',
            username: this.state.checkAll  ? username: '',
            companyMemoname: this.state.checkAll  ? companyMemoname: '',
            status: this.state.checkAll ? status: '',
            kefu1: this.state.checkAll ? kefu: '',
            version: this.state.checkAll ? version: '',
            
        })
            .then((response) => {
                
                if (response.data.status == '10000') {
                    message.success(response.data.message);
                    this.setState({
                        editService: false,
                        oService: []
                    }, () => {
                        this.getList()
                    })

                }else{
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });

    }
    selectService = (e) => {
        this.setState({
            oService: e
        })
    }
    stateEditService = (bl) => {
        if (this.state.dataList.filter((item, index) => item.checkStatue).length == 0) {
            message.error('至少选择一条');
            return
        }
        this.setState({
            editService: bl,
            oService: []
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);