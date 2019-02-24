import ajax from '../../../../js/common/ajax';
import Copyright from "../../../components/Copyright";
import AddDepartment from './AddDepartment';
import { Input, Button, Breadcrumb, message, TreeSelect, Tooltip, Icon } from 'antd';
import lib from '../../../../js/common/lib';
import crypto from '../../../../js/common/crypto';
// import {LoadingModal} from '../.././../components/LoadingModal/LoadingModal';
const { TextArea } = Input;

class App extends React.Component {
    constructor(props) {
        super(props)
        let { id, type } = this.props.match.params;
        this.state = {
            id,
            type,
            addshow: false,
            departmentList: [],
            departid: null,
            username: null,
            realname: null,
            password: null,
            memo: null,
        }
    }
    componentDidMount() {
        this.getDepartmentList()
        if (this.state.type == 'edit') {
            this.getInfo()
        }
        ajax.get('/hcm/userout/getParentUseroutName')
            .then((response) => {
                this.setState({
                    masterName: response.data.data.username
                })
            }).catch((error) => {
                message.error(error.statusText);
            });
    }

    getInfo() {
        ajax.get('/hcm/userout/getUserById', {
            params: {
                userId: this.state.id,
                usertype: 'c'
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                departid: `${data.departid}`,
                username: data.username,
                realname: data.realname,
                password: '******',
                memo: data.memo,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getDepartmentList = () => {
        ajax.get('/hcm/department/fuByIds', {
            params: {
                id: 0,
            }
        }).then((response) => {
            if (response.data.status == '10000' && response.data.data) {
                let data = response.data.data;
                function format(data) {
                    return data.map((item, index) => {
                        if (item.subSysDepartment != null) {
                            return {
                                title: item.departName,
                                value: `${item.id}`,
                                key: `${item.id}`,
                                children: format(item.subSysDepartment)
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
                    departmentList: format(data)
                })
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    chTreeSelect = (value, label, extra, type) => {
        let state = this.state;
        state[type] = value;
        this.setState(state)
    }
    onChange = (e, type) => {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    onSubmit = () => {
        let { masterName, departid, username, realname, password, memo, id, type } = this.state;
        if (realname == null || realname.length == 0) {
            message.error('请输入姓名');
            return
        }
        if (!lib.legnthCheck(realname, 'INPUT')) {
            message.error('姓名长度不允许超过50');
            return
        }
        if (!lib.checkAccount(username)) {
            message.error('请按照要求用户名');
            return
        }
        if (!lib.checkPassword(password)) {
            message.error('密码长度不符');
            return
        }
        if (!departid) {
            message.error('请输入部门');
            return
        }
        if (!lib.legnthCheck(memo, 'URL')) {
            message.error('备注说明长度不允许超过500');
            return
        }
        LoadingModal({bl:true,text:'保存中,请稍后...'})
        ajax.post('/hcm/userout/saveUserOutChildren', {
            departid, 
            realname, 
            password: crypto.Encrypt(lib.trim(password)), 
            memo,
            username: `${masterName}:${lib.trim(username)}`,
            id: type == 'edit' ? id : null
        }).then((response) => {
            if (response.data.status == '10000') {
                message.success('成功')
                if (type == 'edit') {
                    window.location.href = '/index.html#/AccountManagement'
                } else {
                    this.setState({
                        addshow: false,
                        departid: null,
                        username: null,
                        realname: null,
                        password: null,
                        memo: null,
                    })
                }
                LoadingModal({bl:false})
            } else {
                message.warning(response.data.message)
                LoadingModal({bl:false})
            }

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onShowAdd = (bl) => {
        this.setState({
            addshow: bl
        })
    }
    render() {
        let { addshow, masterName, username, realname, password, memo, departid, departmentList, type } = this.state;

        return (
            <div className='info-item'>

                <div className='Breadcrumb'>
                    <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a href='/index.html#/AccountManagement'>账号管理</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {type == 'edit' ? '编辑' : '新增'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className='content'>
                    <li className='item'>
                        <span className='title red-ck'>姓名</span>
                        <div className='ipt-box'>
                            <Input onChange={(e) => this.onChange(e, 'realname')}  maxLength="32" value={realname} />
                        </div>
                    </li>
                    <li className='item'>
                        <span className='title red-ck'>用户名</span>
                        <div className='ipt-box'>
                            <Tooltip overlayStyle={{maxWidth:'400px'}} placement="right" title={<ul><li>6 - 16 个字符，可使用数字、字母、下划线;</li><li>需以字母开头，字母区分大小写。</li><li>首尾空格无效;</li><li>创建后不可修改;</li></ul>}>
                                <Input disabled={type == 'edit' ? true : false} addonBefore={`${masterName}:`} onChange={(e) => this.onChange(e, 'username')} value={username} />
                            </Tooltip>

                        </div>
                    </li>
                    <li className='item'>
                        <span className='title red-ck'>密码</span>
                        <div className='ipt-box'>
                            <Tooltip placement="right" title={'6 - 16  个字符'}>
                                <Input onChange={(e) => this.onChange(e, 'password')} type='password' value={password} />
                            </Tooltip>
                        </div>
                    </li>
                    <li className='item'>
                        <span className='title  red-ck'>所属部门</span>
                        <div className='ipt-box'>
                            <TreeSelect
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                                value={[departid]}
                                treeData={departmentList}
                                onChange={(value, label, extra) => this.chTreeSelect(value, label, extra, 'departid')}
                            />
                        </div>
                        <a 
                        onClick={() => this.onShowAdd(true)} 
                        style={{ fontSize: '14px', paddingLeft: '20px' }}>
                            <Icon style={{paddingRight: '10px' }} type="plus-circle" theme="outlined" />新增部门
                        </a>
                    </li>
                    <li className='item'>
                        <span className='title'>备注说明</span>
                        <div className='ipt-box'>
                            <TextArea onChange={(e) => this.onChange(e, 'memo')} value={memo} placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />

                        </div>
                    </li>
                    <li className='item'>
                        <span className='title'></span>
                        <div className='ipt-box'>
                            <Button className='AccountEdit btn2-main' onClick={() => this.onSubmit()}>确定</Button>
                            <a href='/index.html#/AccountManagement'><Button>返回</Button></a>
                        </div>
                    </li>
                </ul>
                <AddDepartment getDepartmentList={() => this.getDepartmentList()} onShowAdd={(bl) => this.onShowAdd(bl)} departmentList={departmentList} visible={addshow} />
                <Copyright clazzName='copyright' />
            </div>
        )
    }
}
export default App;