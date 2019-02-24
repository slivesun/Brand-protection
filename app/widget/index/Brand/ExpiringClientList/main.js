import Tpl from './tpl';
import { Form, Modal, message, Checkbox, Menu, Dropdown, Icon } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalNum: null,
            dataList: [],

            dealername:null,
            takePeople:null,
            rangePicker:[null,null],
            oldSearch:{
                dealername:null,
                takePeople:null,
                rangePicker:[null,null],
            },

            restorePicker:[moment(),moment().add(1, 'year')],
            spinning: false,
            selectedRowKeys: [],
            startTarget:{}
            
        }
    }
    componentDidMount() {
        this.getList()
    }
    onSearch= (bl=false) =>{
        this.setState({
            pageNo:1,
            dealername: bl ? null : this.state.dealername,
            takePeople: bl ? null : this.state.takePeople,
            rangePicker: bl ? [null,null] : this.state.rangePicker,
            oldSearch:{
                dealername: bl ? null : this.state.dealername,
                takePeople: bl ? null : this.state.takePeople,
                rangePicker: bl ? [null,null] : this.state.rangePicker,
            },
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {dealername,takePeople,rangePicker} = this.state;
        ajax.get('/hcm/dealer/getlistStop', {
            params: {
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                dealername:dealername,
                takePeople:takePeople,
                stopDateStart:rangePicker[0] ? `${rangePicker[0].format('YYYY-MM-DD')} 00:00:00`:null,
                stopDateEnd:rangePicker[1] ? `${rangePicker[1].format('YYYY-MM-DD')} 23:59:59` : null,
            }
        }).then((response) => {
            let dataList = response.data.data;
            this.setState({
                dataList: dataList,
                pageNo: dataList.page_info.pageNo,
                pageSize: dataList.page_info.pageSize,
                checkAll: false,
                selectedRowKeys: [],
                startTarget:{},
                visible:false,
                totalNum: dataList.page_info.totalNum,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    
    chSearchIpt = (e,type)=>{
        let state = this.state;
        if(type=='rangePicker'||type=='restorePicker'){
            state[type][0] = e[0];
            state[type][1] = e[1];
            console.log(state[type])
        }else{
            state[type] = e.target.value;
        }
        this.setState(state)

    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    formatColumn = () => {
        let arr = []
        let column = [{
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1
        },{
            title: '客户名称',
            dataIndex: 'dealername',
            key: 'dealername'
        },{
            title: '对接人',
            dataIndex: 'take_people',
            key: 'take_people'
        },{
            title: '联系方式',
            dataIndex: 'contact',
            key: 'contact'
        },{
            title: '到期时间',
            dataIndex: 'stop_date',
            key: 'stop_date',
            render:text=> text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '--'
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'right',
            width:150,
            render: (text, record, index) => (
                <div className='action'>
                    <a onClick={()=>this.allStartConfirm('item',record.id,true)}>恢复合约</a>
                    <a  onClick={()=>this.allRmConfirm('item',record.id)}>删除</a>
                </div>
            )
        }]
        return column
    }
    
    
    itemStart=(record)=>{
        let {restorePicker} = this.state;
        
        let params = {}
        
        params.ids = record.id
        params.checkAll = false
        
        params.authorizeStart=restorePicker[0].format('YYYY-MM-DD')
        params.authorizeEnd =restorePicker[1].format('YYYY-MM-DD')
        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/dealer/start', {
                params: params
            }).then((response) => {
                
                this.setState({
                    spinning: false
                },()=>{
                    
                    if (response.data.status == '10000') {
                        this.getList()
                    }
                    message.success(response.data.message);
                })
                
            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })
    }

    
   
    onTableCheckChange = (selectedRowKeys) => {
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
    checkAll = (bl) => {
        let selectedRowKeys = this.state.selectedRowKeys;
        if (bl) {
            this.state.dataList.dealer_list.forEach((item, index) => {
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
    allStart = () => {
        let {restorePicker,selectedRowKeys, checkAll,startTarget } = this.state;
        
        let params = {}
        if (startTarget.type == 'all') {
            let { dealername, takePeople, rangePicker} = this.state.oldSearch;
            params = {
                ids :selectedRowKeys.join(','),
                checkAll :checkAll,
                dealername: checkAll ? dealername : '',
                takePeople: checkAll ? takePeople : '',
                stopDateStart:checkAll ? rangePicker[0] ? `${rangePicker[0].format('YYYY-MM-DD')} 00:00:00`:'' : '',
                stopDateEnd:checkAll ? rangePicker[1] ? `${rangePicker[1].format('YYYY-MM-DD')} 23:59:59` : '' : '',
            }
        }else{
            params.ids = startTarget.id
            params.checkAll = false
        }
        params.authorizeStart=restorePicker[0].format('YYYY-MM-DD')
        params.authorizeEnd=restorePicker[1].format('YYYY-MM-DD')
        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/dealer/start', {
                params: params
            }).then((response) => {
                
                this.setState({
                    spinning: false
                },()=>{
                    
                    if (response.data.status == '10000') {
                        this.onSearch(true)
                    }
                    message.success(response.data.message);
                })
                
            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })

    }

    allRm = (type, id) => {
        let { selectedRowKeys, checkAll } = this.state;
        let params = {}
        if (type == 'all') {
            let { dealername, takePeople, rangePicker} = this.state.oldSearch;
           
            params = {
                ids :selectedRowKeys.join(','),
                checkAll :checkAll,
                dealername:checkAll ?  dealername: '',
                takePeople:checkAll ?  takePeople: '',
                stopDateStart:checkAll ? rangePicker[0] ? `${rangePicker[0].format('YYYY-MM-DD')} 00:00:00`:'': '',
                stopDateEnd:checkAll ? rangePicker[1] ? `${rangePicker[1].format('YYYY-MM-DD')} 23:59:59` : '': '',
            }
        }else{
            params.ids = id
            params.checkAll = false
        }

        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/dealer/delete', {
                params: params
            }).then((response) => {
                this.setState({
                    spinning: false
                },()=>{
                    
                    if (response.data.status == '10000') {
                        this.onSearch(true)
                    }
                    message.success(response.data.message);
                })

            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })

    }
    allStartConfirm = (type,id,bl) => {
        let {selectedRowKeys,startTarget } = this.state;
        if (!selectedRowKeys.length&&type == 'all' ) {
            message.error('至少选择一条');
            return
        }
        startTarget.type = type;
        startTarget.id = id
        if(type=='close'){
            startTarget = {}
        }
        
        this.setState({
            visible:bl,
            startTarget:startTarget
        })
    }
    allRmConfirm = (type,id) => {
        let { checkAll, totalNum, selectedRowKeys } = this.state;
        if (!selectedRowKeys.length&&type == 'all' ) {
            message.error('至少选择一条');
            return
        }
        Modal.confirm({
            title: null,
            maskClosable: false,
            content:type == 'all' ? 
                    <div>
                        <div className='tips'>提示</div>
                        <div className='pline'></div>
                        <p>你确认要删除勾选的<span className='red'>{checkAll ? totalNum : selectedRowKeys.length}</span>项客户信息吗</p>
                        <p>删除后<span className='red'>相关客户信息将无法找回</span></p>
                    </div>
                    :
                    <div>
                        <div className='tips'>提示</div>
                        <div className='pline'></div>
                        <p>你确认要删除该客户信息吗？</p>
                        <p>删除后<span className='red'>相关客户信息将无法找回</span></p>
                    </div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk: () => this.allRm(type, id),
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);
