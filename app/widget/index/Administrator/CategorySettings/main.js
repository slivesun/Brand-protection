import Tpl from './tpl';
import ajax from '../../../../js/common/ajax';
import { message } from 'antd';
import lib from '../../../../js/common/lib';
class App extends React.Component {
    constructor(props) {
        // document.title = '行业类目设置';
        super(props)
        this.state = {
            addState: false,
            editState: false,
            dictName: null,
            dictType: null,
            dataList: [],

        }
    }
    componentDidMount() {
        this.getList()
    }
    addChangev = (e, type) => {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    addBoxState = (bl) => {
        this.setState({
            addState: bl,
            dictName: null,
            dictType: null,
        })
    }
    getList = () => {
        ajax.get('/hcm/sys/GetList',{
            params: {
                dictcode: 'category'
            }
        })
            .then((response) => {
                response.data.data.forEach((item, index) => {
                    item.dictName2 = item.dictName;
                    item.dictType2 = item.dictType;
                    item.pricename2 = item.pricename;
                    
                })
                this.setState({
                    dataList: response.data.data,
                    editState:false
                })
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    subAdd = () => {
        let { dictName, dictType } = this.state;
        if (!lib.required(dictName)) {
            message.error('请输入行业类目名称');
            return
        }
        if (!lib.required(dictType)) {
            message.error('请输入行业类目对应关键字');
            return
        }
        if(!lib.legnthCheck(dictName,'INPUT')){
            message.error('行业类目名称长度不允许超过50');
            return
        }
        if(!lib.legnthCheck(dictType,'INPUT')){
            message.error('行业类目对应关键字长度不允许超过50');
            return
        }
        ajax.post('/hcm/sys/Create', {
            dictName: dictName,
            pricename: dictType,
            dictType:'category'
        })
            .then((response) => {
                if(response.data.status=='10000'){
                    message.success(response.data.message);
                    this.addBoxState(false)
                    this.getList()
                }else{
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    rmDict = (item) => {
        ajax.post('/hcm/sys/delete', {
            id: item.id,
            dictType: 'category'
        })
            .then((response) => {
                message.success(response.data.message);
                this.getList()
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    editDict = (item, index, bl) => {

        if (item.status!=true&& this.state.editState) {
            message.warning('请先保存已编辑条目');
            return
        }
        let dataList = this.state.dataList;
        dataList[index].status = bl;
        if (!bl) {
            dataList[index].dictName = dataList[index].dictName2;
            dataList[index].pricename = dataList[index].pricename2;
        }
        this.setState({
            dataList: dataList,
            editState: bl
        })
    }
    editChangev = (e, index, type) => {
        let dataList = this.state.dataList;
        let tarItem = this.state.tarItem;
        dataList[index][type] = e.target.value;
        this.setState({
            dataList: dataList
        })
    }
    saveDict = (item) => {
        if (!lib.required(item.dictName)) {
            message.error('请输入行业类目名称');
            return
        }
        if (!lib.required(item.pricename)) {
            message.error('请输入行业类目对应关键字');
            return
        }
        if(!lib.legnthCheck(item.dictName,'INPUT')){
            message.error('行业类目名称长度不允许超过50');
            return
        }
        if(!lib.legnthCheck(item.pricename,'INPUT')){
            message.error('行业类目对应关键字长度不允许超过50');
            return
        }
        ajax.post('/hcm/sys/Update', {
            id: item.id,
            dictName: item.dictName,
            pricename: item.pricename,
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
export default App