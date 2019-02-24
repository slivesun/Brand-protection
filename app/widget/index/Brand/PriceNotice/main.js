import Tpl from './tpl';
import {message,Modal} from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
// import {LoadingModal} from '../../../components/LoadingModal/LoadingModal';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addStatus:false,
            visible:false,


            pageNo:1,
            pageSize:15,
            totalElements:0,
            productClassifyName:null,
            addDroductClassifyName:null,
            dataList:[],
            classfiyUpdate:{
                MonitorDate:moment(`${moment().hour()}:00'`, 'HH:mm'),
                platform_code:1,
                productClassifyName:null,
                frequency:'1次/24H',
                monitor_range:'授权店铺',
                id:null,
            }
        }
    }
    editOnchange=(e,type)=>{
        let classfiyUpdate = this.state.classfiyUpdate;
        classfiyUpdate[type] = e;
        this.setState({
            classfiyUpdate:classfiyUpdate
        })
    }
    componentDidMount() {
        this.getList()
    }
    onChange = (e,type) =>{
        let state = this.state;
        state[type] = e.target.value
        this.setState(state)
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    addSubmit=()=>{
        let {addDroductClassifyName} = this.state;
        if(!addDroductClassifyName||!addDroductClassifyName.length){
            message.error('分类名不可为空');
            return
        }
        if(!lib.legnthCheck(addDroductClassifyName,'INPUT')){
            message.error('分类名长度不允许超过50');
            return
        }
        LoadingModal({bl:true,text:'保存中,请稍后...'})
        ajax.get('/hcm/ProductClassify/save', {
            params: {
                productClassifyName:addDroductClassifyName,
            }
        }).then((response) => {
            if(response.data.status=='10000'){
                this.setState({
                    addDroductClassifyName: null,
                    addStatus:false
                })
                this.getList()
                message.success(response.data.message);
            }else{
                message.warning(response.data.message);
            }
            
            LoadingModal({bl:false})
        }).catch((error) => {
            message.error(error.statusText);
            LoadingModal({bl:false})
        });
    }
    getMore = ()=>{
        this.setState({
            pageNo : this.state.pageNo+1
        },()=>{
            this.getList()
        })
    }
    onSearch= () =>{
        this.setState({
            pageNo:1
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {pageNo,pageSize,productClassifyName} = this.state;
        ajax.get('/hcm/ProductClassify/seletProductClassify', {
            params: {
                pageNum:pageNo,
                pageSize:pageSize,
                productClassifyName:productClassifyName,
            }
        }).then((response) => {
            let {count,list} = response.data.data.data;
            
            this.setState({
                dataList: list,
                totalElements:count,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onRmItem=(item)=>{
        let that = this;
        confirm({
            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除该产品分类吗？</p><p>删除后<span className='red'>录入的公示信息将会被删除</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            onOk() {
                ajax.get('/hcm/ProductClassify/deleteById', {
                    params: {
                        id:item.id
                    }
                }).then((response) => {
                    message.success(response.data.message)
                    that.getList()
                }).catch((error) => {
                    message.error(error.statusText);
                });
            }
        });
    }
  
    onMonitorStop=(item)=>{
        let that = this;
        confirm({
            title: '你确认要停止该产品分类监控吗？',
            okText: '确定',
            cancelText: '取消',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            onOk() {
                ajax.get('/hcm/priceMonitor/MonitorStop', {
                    params: {
                        id:item.id,
                        productClassifyName:item.productClassifyName
                    }
                }).then((response) => {
                    message.success(response.data.message)
                    that.getList()
                }).catch((error) => {
                    message.error(error.statusText);
                });
            }
        });
    }
    onUpdateMonitoring=()=>{
        let that = this;
        let {MonitorDate,platform_code,frequency,monitor_range,id,productClassifyName} = this.state.classfiyUpdate;
                
        ajax.get('/hcm/priceMonitor/ClassfiyUpdate', {
            params: {
                MonitorDate:moment(MonitorDate).format('HH:mm'),
                platform_code:platform_code,
                frequency:frequency,
                monitor_range:monitor_range,
                type:'1',
                id:id,
                productClassifyName,
            }
        }).then((response) => {
            
            that.onVisible(false)
            if(response.data.status=='10000'){
                message.success(response.data.message)
                that.getList()
            }else{
                message.warning(response.data.message)
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onEditItem=(item)=>{
        let that = this;
        confirm({
            content: <input style={{width:'90%'}} id='edit-item-input' defaultValue={item.productClassifyName} />,
            okText: '确定',
            className:'edit-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            cancelText: '取消',
            onOk(close) {
                
                if(!lib.legnthCheck(document.getElementById('edit-item-input').value,'INPUT')){
                    message.error('分类名长度不允许超过50');
                    
                }else{
                    ajax.get('/hcm/ProductClassify/save', {
                        params: {
                            productClassifyName:document.getElementById('edit-item-input').value,
                            id:item.id
                        }
                    }).then((response) => {
                        if(response.data.status == '10000'){
                            message.success(response.data.message)
                            that.getList()
                            close()
                        }else{
                            message.warning(response.data.message)
                        }
                    }).catch((error) => {
                        message.error(error.statusText);
                    });
                }
            }
        });
    }
    onVisible=(bl,item)=>{
        let classfiyUpdate = this.state.classfiyUpdate;
        if(item){
            classfiyUpdate.id =  item.id
            classfiyUpdate.productClassifyName  = item.productClassifyName
        }
        this.setState({
            visible:bl,
            classfiyUpdate
        })
    }
    onAddStatus = (bl)=>{
        this.setState({
            addStatus:bl
        })
    }
    
    
    render() {
        return <Tpl that={this} />
    }
}
export default App;
