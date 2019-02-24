import Tpl from './tpl';
import { message, Switch, Icon, Modal,Input } from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            platform:'TB',
            title:null,
            dataList: [],
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            checkAll: false,
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
            })
        }
        
    }
    changeTabs = (activeKey)=>{
        console.log(activeKey)
        this.setState({
            platform:activeKey,
            pageNo: 1,
            pageSize: 10,
            dataList:[],
            selectedRowKeys: [],
            title:null,
        },()=>{
            this.getList()
        })
    }
    onSearch = ()=>{
        this.setState({
            pageNo: 1,
            pageSize: 10,
            selectedRowKeys: [],
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
        values.whitetype = this.state.platform;
        values.whitename = values.title.join(',');
        delete  values.title
        ajax.post('/hcm/iprWhitelist/save',values)
        .then((response) => {
            if(response.data.status =='10000'){
                this.getList()
                this.onAddBoxFrom(false)
                resetFields()
                message.success(response.data.data)
                
            }else{
                message.error(response.data.message)
            }
        })
    }
    getList = () => {
        let { pageNo, pageSize,platform,title} = this.state;
        ajax.get('/hcm/iprWhitelist/getPageBybmcid', {
            params: {
                whitename:title,
                whitetype:platform,
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
            title: '店铺名称',
            dataIndex: 'whitename',
            key: 'whitename',
            render: (text, record, index) => {
                if(record.show){
                    return <Input maxLength={32} onChange={(e)=>this.changName(e,record, index)} value={record.oldData.whitename}/>
                }else{
                    return text
                }
            }
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align:'right',
            render: (text,item,index)=>{
                if(item.show){
                    return (
                        <React.Fragment>
                            <a onClick={()=>this.saveItem(item,index)} style={{marginRight:'20px'}}>保存</a>
                            <a onClick={()=>this.cancelItem(item,index)}>取消</a>
                        </React.Fragment>
                    )
                }else{
                    return (
                        <React.Fragment>
                            <a onClick={()=>this.editItem(item,index)} style={{marginRight:'20px'}}>编辑</a>
                            <a onClick={()=>this.rmItem(item)}>删除</a>
                        </React.Fragment>
                    )
                }
            }
        }]
        if(this.state.platform == 'TB'||this.state.platform == '1688'||this.state.platform == 'XY'){
            column[1].title = '旺旺名称'
        }
        return column
    }
    saveItem = (item,index)=>{
        let {platform} = this.state;
        ajax.post('/hcm/iprWhitelist/update', {
            whitename:item.oldData.whitename,
            whitetype:item.oldData.whitetype,
            id:item.oldData.id
        })
        .then((response) => {
            if(response.data.status=='10000'){
                this.changeTabs(platform)
                message.success(response.data.message);
            }else{
                message.error(response.data.message);
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    editItem = (item,index)=>{
        let dataList = this.state.dataList;
        dataList[index].oldData = Object.assign({},item);
        dataList[index].show = true;
        this.setState({
            dataList
        })
    }
    cancelItem = (item,index)=>{
        let dataList = this.state.dataList;
        delete dataList[index].oldData 
        delete dataList[index].show 
        this.setState({
            dataList
        })
    }
    changName =(e,item, index) =>{
        let dataList = this.state.dataList;
        dataList[index].oldData.whitename= e.target.value;
        this.setState({
            dataList
        })
    }
    rmItem = (item)=>{
        let that = this;
        let { platform} = this.state;
        confirm({
            title: null,
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除这一项吗?</p><p >删除后<span className='red'>将无法恢复!</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            onOk() {
                ajax.post('/hcm/iprWhitelist/delete', {
                    iprWhitelistIds:item.id,
                    whitetype:platform
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
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除{checkAll ? totalNum :selectedRowKeys.length}项吗?</p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            onOk() {
                ajax.post('/hcm/iprWhitelist/delete', {
                    iprWhitelistIds:checkAll?'checkAll':selectedRowKeys.join(','),
                    whitename:oldTitle,
                    whitetype:platform
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