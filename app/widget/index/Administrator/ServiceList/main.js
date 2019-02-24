import Tpl from './tpl';
import { Form,Modal, message, Checkbox, Menu, Dropdown, Icon,Switch } from 'antd';
import ajax from '../../../../js/common/ajax';
import crypto from '../../../../js/common/crypto';
import lib from '../../../../js/common/lib';
// import {LoadingModal} from '../../../components/LoadingModal/LoadingModal';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            rolePage:[],
            treeData:[],

            fullSpinVisible:false,
            type: null,
            dataList: [],
            targetModal: {
                username: null,
                roleIds:null,
                realname: null,
                password: '******',
                memo: null,
            },
            realname: null,
            status: null,
            username: null,
            oldSearch:{
                realname: null,
                status: null,
                username: null,
            },
            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalNum: null,
            columns: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: '6%',
                render: (text, record, index) => index + 1,
            }, {
                title: '姓名',
                dataIndex: 'realname',
                key: 'realname',
                width: '12%',
            }, {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: '12%',
            }, {
                title: '绑定手机',
                dataIndex: 'mobile',
                key: 'mobile',
                width: '17%',
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
                title: '备注说明',
                dataIndex: 'memo',
                key: 'memo',
                width: '20%',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: '6%',
                render: (text, record, index) => {

                    return (
                        <Switch checked={text == '1' ? true:false} onChange={() => this.aAction('/hcm/user/StartOrStop',record.id,text == '1' ? 0 :1)} checkedChildren="开" unCheckedChildren="关" defaultChecked />
                    )
                }
            }, {
                title: '操作',
                key: 'action',
                align: 'right',
                width: '8%',
                render: (text, record, index) => (
                    <span key='index'>
                        <a style={{ marginRight: '10px' }} onClick={() => this.stateModal(true, '编辑', record)}>
                        <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_edit.png' />
                            编辑
                        </a>
                    </span>
                ),
            }]
        }
    }
    componentDidMount() {
        this.getList()
        this.getRolePage()
        this.getFuByIds()
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
            realname: bl ? null : this.state.realname,
            status: bl ? null : this.state.status,
            username: bl ? null : this.state.username,
            oldSearch:{
                realname: bl ? null :  this.state.realname,
                status: bl ? null :   this.state.status,
                username: bl ? null :   this.state.username,
            },
        },()=>{
            this.getList()
        })
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
    getFuByIds = () => {
        
        ajax.get('/hcm/departmentin/fuByIds', {
            params: {
                id:0
            }
        }).then(response => {
            let data = response.data.data;
            function format(data) {
                return data.map((item, index) => {
                    if (item.subSysDepartmentIn != null) {
                        return {
                            title: item.departName,
                            value: `${item.id}`,
                            key: `${item.id}`,
                            children: format(item.subSysDepartmentIn)
                        }
                    } else {
                        return {
                            title: item.departName,
                            value: `${item.id}`,
                            key: `${item.id}`,
                        }
                    }
                })
            }
            this.setState({
                treeData:  format(data || [])
            })
            
        })
    }
    getList = () => {
        let { realname, username, status, pageNo, pageSize } = this.state;
        ajax.get('/hcm/userin/getlist', {
            params: {
                realname: realname,
                status: status,
                username: username,
                pageNo: pageNo,
                pageSize: pageSize,
            }

        }).then((response) => {
            this.setState({
                dataList: response.data.data.userin_list,
                pageNo: response.data.data.page_info.pageNo,
                pageSize: response.data.data.page_info.pageSize,
                totalNum: response.data.data.page_info.totalNum,
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
                    width: '5%',
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
    fullSpinVisible =(bl)=>{
        this.setState({
            fullSpinVisible:bl
        })
    }
    allStart = () => {
        let arr = [];
        let {realname,username,status} = this.state.oldSearch;
        let dataList = this.state.dataList.filter((item, index) => item.checkStatue)
        dataList.forEach((item, index) => {
            arr.push(item.id)
        })
        if (arr.length == 0) {
            message.error('至少选择一条');
            return
        }
        this.fullSpinVisible(true)
        ajax.post('/hcm/user/StartOrStop', {
            userIds: this.state.checkAll ? 'checkAllKefu':arr.join(','),
            status: 1,
            usertype:'u',
            realname:this.state.checkAll ? realname :'',
            username:this.state.checkAll ? username :'',
            status1:this.state.checkAll ? status :'',
        })
            .then((response) => {
                this.fullSpinVisible(false)
                
                if (response.data.status == '10000') {
                    message.success(response.data.message);
                    this.onSearch(true)
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
        let {realname,username,status} = this.state.oldSearch;
        let dataList = this.state.dataList.filter((item, index) => item.checkStatue)
        dataList.forEach((item, index) => {
            arr.push(item.id)
        })
        if (arr.length == 0) {
            message.error('至少选择一条');
            return
        }
        this.fullSpinVisible(true)
        ajax.post('/hcm/user/StartOrStop', {
            userIds: this.state.checkAll ? 'checkAllKefu':arr.join(','),
            status: 0,
            usertype:'u',
            realname:this.state.checkAll ? realname :'',
            username:this.state.checkAll ? username :'',
            status1:this.state.checkAll ? status :'',
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
    aAction=(url,id,status)=>{
        ajax.post(url, {
            userIds: id,
            status: status,
            usertype:'u'
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

            ajax.post(url,  params)
                .then((response) => {
                    LoadingModal({bl:false})
                    
                    if (response.data.status == '10000') {
                        this.stateModal(false, '', false)
                        this.getList()
                        this.props.form.setFieldsValue({})
                        message.success(response.data.message);
                    }else{
                        message.warning(response.data.message);
                    }
                })
                .catch((error) => {
                    LoadingModal({bl:false})
                    message.error(error.statusText);
                });
        }
        this.props.form.validateFields((err, values) => {

            // /hcm/userin/update?
            // /hcm/userin/create?
            if (!err) {
                let { targetModal, type } = this.state;

                targetModal.id ? values.id = targetModal.id : delete values.id 
                if (type == '新增') {
                    if(!lib.checkAccount(values.username)){
                        message.error('请按照要求用户名');
                        return
                    }
                }
                if(!lib.checkPassword(values.password)){
                    message.error('密码长度不符');
                    return
                }
                if(!lib.legnthCheck(values.realname,'INPUT')){
                    message.error('姓名长度不允许超过50');
                    return
                }
                if(!lib.legnthCheck(values.memo,'URL')){
                    message.error('备注说明长度不允许超过500');
                    return
                }

                LoadingModal({bl:true,text:'保存中,请稍后...'})
                values.username = lib.trim(values.username);
                values.password = crypto.Encrypt(lib.trim(values.password));
                values.departmentId = values.departmentid;
                delete values.departmentid
                if (type == '新增') {
                    add_edit('/hcm/userin/create', values)

                } else if (type == '编辑') {
                    add_edit('/hcm/userin/update', values)

                }

            }

        })

    }
    stateModal = (visible, type, data) => {
        if (data === false) {
            data = {
                username: null,
                realname: null,
                roleIds:null,
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
                mobiles: record.id,
                usertype: 'u'
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
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);