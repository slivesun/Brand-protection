import Tpl from './tpl';
import { Form,Modal,Divider, message, Checkbox, Menu, Dropdown, Icon,Switch } from 'antd';
import ajax from '../../../../js/common/ajax';

// import {LoadingModal} from '../../../components/LoadingModal/LoadingModal';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            actionVisible:false,  
            targetData:{}
        }
    }
    componentDidMount() {
       this.getList()
    }
    columns = () => [{
        title: '名称',
        dataIndex: 'dictName',
        key: 'dictName',
      }, {
        title: 'Code',
        dataIndex: 'dictCode',
        key: 'dictCode',
        width: '12%',
      }, {
        title: '排序',
        dataIndex: 'sortNumber',
        key: 'sortNumber',
    }, {
        title: '备注',
        dataIndex: 'pricename',
        key: 'pricename',
    }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align:'right',
        render:(text,item,index)=>
            <React.Fragment>
                <a onClick={()=>this.addChild(item,'add')}>新增下级</a>
                <Divider type="vertical" />
                <a onClick={()=>this.addChild(item,'edit')}>编辑</a>
                <Divider type="vertical" />
                <a onClick={()=>this.rmItem(item)}>删除</a>
            </React.Fragment>
        
    }]
    addChild = (item,type) =>{
        item.type = type;
        this.setState({
            targetData:item
        },()=>{
            this.actionVisible(true)
        })
    }
    actionVisible = (bl,fn)=> {
        this.setState({
            actionVisible:bl,
            targetData:bl?this.state.targetData:{}
        },()=>{
            fn ? fn() : null
        })
    }
    getList(){
        ajax.get('/hcm/sys/getTree')
        .then(response=>{
            if(response.data.status=='10000'){
                this.setState({
                    data:response.data.data
                })
            }else{
                message.error(response.data.message);
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    subAdd = (values,fn,type) => {
        let patt1 = /[\u4e00-\u9fa5]/;
        if(patt1.test(values.dictCode)){
            message.warning('Code不允许出现汉字')
            return
        }
        
        ajax.post(type=='edit'?'/hcm/sys/Update':'/hcm/sys/Create', values)
        .then((response) => {
            if(response.data.status=='10000'){
                message.success(response.data.message);
                this.actionVisible(false,fn)
                this.getList()
            }else{
                message.error(response.data.message);
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    rmItem = (item) => {
        ajax.post('/hcm/sys/delete', {
            id: item.id
        })
        .then((response) => {
            if(response.data.status=='10000'){
                message.success(response.data.message);
                this.getList()
            }else{
                message.error(response.data.message);
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
export default App;