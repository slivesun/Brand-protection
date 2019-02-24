import Tpl from './tpl';
import { message } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            pageSize:12,
            pageNum:1,
            totalElements:0,

            dataList:[],
            visible: false,
            classfiyUpdate:{
                monitorDate:moment(`${moment().hour()}:00'`, 'HH:mm'),
                platform_code:'1',
                frequency:'1次/24H',
                monitor_range:'授权店铺',
                id:null,
            }
        }
    }
    componentDidMount() {
        this.getList()
    }
    getMore = ()=>{
        this.setState({
            pageNum : this.state.pageNum+1
        },()=>{
            this.getList()
        })
    }
    chAngeHis=(item)=>{
        window.location="/index.html#/ChangeHistoryx/HcmProductClassify_MonitorPrice/"+item.productClassifyName+"/"+item.id+"/Sjsj"
        
    }
    getList(){
        let {pageSize,pageNum} = this.state;
        ajax.get('/hcm/priceMonitor/GetList',{
            params:{
                pageSize,
                pageNum
            }
        })
        .then((response) => {
            if(response.data.status=='10000'){
                this.setState({
                    dataList:response.data.data.list,
                    totalElements:response.data.data.count
                })
            }
            
        }).catch((error) => {
            message.error(error.statusText);
        });
    }

    editVisible = (bl,item) => {
        let classfiyUpdate = this.state.classfiyUpdate;
        if(item){
            classfiyUpdate.id = item.id;
            classfiyUpdate.monitorDate = moment(`${item.monitorDate}`, 'HH:mm');
        }
        this.setState({
            visible: bl,
            classfiyUpdate:classfiyUpdate
        })
    }
    editOnchange=(e,type)=>{
        let classfiyUpdate = this.state.classfiyUpdate;
        classfiyUpdate[type] = e;
        this.setState({
            classfiyUpdate:classfiyUpdate
        })
    }
    editSubmit = () =>{
        
        let that = this;
        let {monitorDate,platform_code,frequency,monitor_range,id} = this.state.classfiyUpdate;
                
        ajax.get('/hcm/priceMonitor/ClassfiyUpdate', {
            params: {
                MonitorDate:moment(monitorDate).format('HH:mm'),
                platform_code:platform_code,
                frequency:frequency,
                type:'2',
                monitor_range:monitor_range,
                id:id,
            }
        }).then((response) => {
            that.editVisible(false)
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
    
    render() {
        return <Tpl that={this} />
    }
}
export default App;
