import Tpl from './tpl';
import { message, Switch, Icon, Modal } from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dealername: null,
            takePeople: null,
            username: null,
            status: null,
            oldSearch:{
                dealername: null,
                takePeople: null,
                username: null,
                status: null,
            },

            dataList: [],
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            checkAll: false,


            selectedRowKeys: []
        }
    }
    componentDidMount() {
        this.getList()
    }
    onSearch= (bl=false) =>{
        this.setState({
            pageNo:1,
            dealername:  bl ? null : this.state.dealername,
            takePeople:  bl ? null : this.state.takePeople,
            username:  bl ? null : this.state.username,
            status:  bl ? null : this.state.status,
            oldSearch:{
                dealername:  bl ? null : this.state.dealername,
                takePeople:  bl ? null : this.state.takePeople,
                username:  bl ? null : this.state.username,
                status:  bl ? null : this.state.status,
            },
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let { pageNo, pageSize, dealername, takePeople, username, status } = this.state;
        ajax.get('/hcm/dealer/getlistOfAdmin', {
            params: {
                dealername, takePeople, username, status,
                pageNo: pageNo,
                pageSize: pageSize,
            }

        }).then((response) => {
            this.setState({
                dataList: response.data.data.dealer_list,
                pageNo: response.data.data.page_info.pageNo,
                pageSize: response.data.data.page_info.pageSize,
                totalNum: response.data.data.page_info.totalNum,
                checkAll: false,
                selectedRowKeys: []
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
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
    handleChange = (e, type) => {
        let state = this.state;
        state[type] = e;
        this.setState(state)

    }

    onTableCheckChange = (selectedRowKeys) => {
        // console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys,
            checkAll: false
        });
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
    formatColumn = () => {

        let column = [{
            title: 'No',
            dataIndex: 'index',
            width: '80px',
            key: 'index',
            render: (text, record, index) => <div style={{ width: '40px' }}>{index + 1}</div>
        }, {
            title: '公司名称',
            dataIndex: 'dealername',
            key: 'dealername',
            render: (text, record, index) => <a href={`/index.html#/DealerDetail/${record.dealer_id}`}>{text}</a>
        }, {
            title: '对接人',
            dataIndex: 'take_people',
            key: 'take_people',
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '绑定手机',
            dataIndex: 'mobile',
            key: 'mobile',
            render: (text, item) => <div>{lib.encryption(text)}{text && text.length ? <span onClick={() => this.unBindPhone(item)} className='unphone'><Icon type="link" />解绑手机</span> : null}</div>
        }, {
            title: '最近登陆',
            dataIndex: 'opreate_date',
            key: 'opreate_date',
            render: (text) => text?moment(text).format('YYYY年MM月DD日 HH:mm:ss'):'--'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, item, index) => <Switch loading={item.loading} onChange={(checked) => this.changeSwitch(checked, item, index)} checkedChildren="开" unCheckedChildren="关" checked={text ? true : false} />
        }]
        return column
    }
    allStopStart = (bl) => {
        let { selectedRowKeys,totalNum,checkAll} = this.state;
        let {dealername,takePeople,username,status} = this.state.oldSearch;
        let that = this;
        if(selectedRowKeys.length==0){
            message.warning('至少选择一项')
            return
        }
        confirm({

            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要{bl?'启用':'禁用'}{checkAll ? totalNum :selectedRowKeys.length}项吗</p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk() {
                ajax.post('/hcm/user/StartOrStop', {
                    userIds: checkAll ? 'checkAllDealer':selectedRowKeys.join(','),
                    status: bl,
                    usertype: 'c',
                    dealername:checkAll ? dealername :'',
                    takePeople:checkAll ? takePeople :'',
                    username:checkAll ? username :'',
                    status1:checkAll ? status :'',
                })
                    .then((response) => {
                        if (response.data.status == '10000') {
                            that.onSearch(true)
                            message.success(response.data.message);
                        }else{
                            message.error(response.data.message);
                        }
                    })
                    .catch((error) => {
                        message.error(error.statusText);
                    });
            }
        });
    }
    unBindPhone = (item) => {
        let that = this;
        confirm({

            title: null,
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要解绑手机吗</p></div>,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk() {
                ajax.get('/hcm/user/UnbindPhone', {
                    params: {
                        mobiles: item.id,
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
            }
        });

    }

    changeSwitch = (checked, item, index) => {
        let dataList = this.state.dataList;
        dataList[index].loading = true;
        this.setState({
            dataList
        }, () => {
            ajax.post('/hcm/user/StartOrStop', {
                userIds: item.id,
                status: checked ? 1 : 0,
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
        })

    }
    checkAll = (bl) => {
        let selectedRowKeys = this.state.selectedRowKeys;
        if (bl) {
            this.state.dataList.forEach((item, index) => {
                selectedRowKeys.push(item.id)
            })

        } else {
            selectedRowKeys = []
        }
        this.setState({
            checkAll: bl,
            selectedRowKeys: selectedRowKeys
        })
    }

    render() {
        return <Tpl that={this} />
    }
}
export default App