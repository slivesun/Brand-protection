import Tpl from './tpl';
import { message, Switch, Icon, Modal } from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            platform:'ALIBABA',
            title:null,
            dataList: [],
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            checkAll: false,

            targetData:{},

            selectedRowKeys: [],

            actionVisible:false
        }
    }
    componentDidMount() {
        this.getList()
    }
    onAddBoxFrom = (bl)=>{
        if(bl){
            this.setState({
                actionVisible:bl
            })
        }else{
            this.setState({
                actionVisible:bl,
                targetData:{}
            })
        }
        
    }
    changeTabs = (activeKey)=>{
        this.setState({
            platform:activeKey,
            pageNo: 1,
            pageSize: 10,
            selectedRowKeys: [],
            title:null,
            targetData:{}
        },()=>{
            this.getList()
        })
    }
    onSearch = ()=>{
        this.setState({
            pageNo: 1,
            pageSize: 10,
            selectedRowKeys: [],
            targetData:{}
        },()=>{
            this.getList()
        })
    }
    searchChange= (e)=>{
        this.setState({
            title:e.target.value
        })
    }
    onSubmit = (values,resetFields)=>{
        values.platform = this.state.platform;
        values.id = this.state.targetData.id;
        ajax.post('/hcm/complaiont/save',values)
        .then((response) => {
            if(response.data.status =='10000'){
                this.getList()
                resetFields()
                this.onAddBoxFrom(false)
                
                message.success(response.data.message)
            }else{
                message.error(response.data.message)
            }
        })
    }
    getList = () => {
        let { pageNo, pageSize,platform,title} = this.state;
        ajax.get('/hcm/complaiont/getPage', {
            params: {
                title,
                platform,
                pageNo: pageNo,
                pageSize: pageSize,
            }
        }).then((response) => {
            this.setState({
                dataList: response.data.data.content,
                pageNo: response.data.data.pageNumber,
                pageSize: response.data.data.pageSize,
                totalNum: response.data.data.totalElements,
                checkAll: false,
                oldTitle:title,
                selectedRowKeys: []
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
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
    formatColumn = () => {

        let column = [{
            title: 'No',
            dataIndex: 'index',
            width: '80px',
            key: 'index',
            render: (text, record, index) => <div style={{ width: '40px' }}>{index + 1}</div>
        }, {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '淘宝Cookie',
            dataIndex: 'cookie',
            key: 'cookie',
            render: (text='', record, index) => <div>{ text?text.substring(0,20):null}{text&&text.length>=20?'...':null}</div>
        }, {
            title: '1688Cookie',
            dataIndex: 'cookie1688',
            key: 'cookie1688',
            render: (text='', record, index) => <div>{text?text.substring(0,20):null}{text&&text.length>=20?'...':null}</div>
            
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'right',
            render: (text,item,index)=>
            <React.Fragment>
                <a style={{marginRight:'20px'}} onClick={()=>this.editItem(item)}>编辑</a>
                <a onClick={()=>this.rmItem(item)}>删除</a>
            </React.Fragment>
        }]
        if(this.state.platform =='JINGDONG'){
            column.splice(4, 1);
            column[3].title = '京东Cookie'
        }
        return column
    }
    editItem = (item)=>{
        this.setState({
            targetData:item
        },()=>{
            this.onAddBoxFrom(true)
        })
    }
    rmItem = (item)=>{
        let that = this;
        let { platform} = this.state;
        confirm({
            title: null,
            className:'alert-item-confirm YellowWhite',
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除这一项吗?</p><p >删除后<span className='red'>将无法恢复!</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                ajax.post('/hcm/complaiont/delete', {
                    ids:item.id,
                    platform
                })
                .then((response) => {
                    if(response.data.status=='10000'){
                        that.changeTabs(platform)
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
    allStopStart = () => {
        let { selectedRowKeys,totalNum,checkAll,oldTitle,platform} = this.state;
        
        let that = this;
        if(selectedRowKeys.length==0){
            message.warning('至少选择一项')
            return
        }
        confirm({
            title: null,
            className:'alert-item-confirm YellowWhite',
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除{checkAll ? totalNum :selectedRowKeys.length}项吗</p></div>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                ajax.post('/hcm/complaiont/delete', {
                    ids:checkAll?'checkAll':selectedRowKeys.join(','),
                    title:oldTitle,
                    platform
                })
                .then((response) => {
                    if(response.data.status=='10000'){
                        that.changeTabs(platform)
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