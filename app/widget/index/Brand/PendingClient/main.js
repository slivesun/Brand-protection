import Tpl from './tpl';
import { Form, Modal, message, Checkbox, Menu, Dropdown, Icon } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[],
            dealerVerify:[],
            id:null
        }
    }
    componentDidMount() {
        this.getList()
        
    }

    getList = () => {
        ajax.get('/hcm/dealer/getlistVerify').
        then((response) => {
            let dataList = response.data.data;
            this.setState({
                dataList: dataList
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getlistDealerVerify=()=>{
        ajax.get('/hcm/dealer/getlistDealerVerify', {
            params: {
                id:this.state.id
            }
        }).then((response) => {
            let dataList = response.data.data;
            this.setState({
                dealerVerify: dataList
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    editClient=(item,index,bl)=>{
        let dataList = this.state.dataList;
        dataList[index].webStatus=bl;
        dataList[index].match_id = '';
        this.setState({
            dataList:dataList,
            id:item.dealer_id
        },()=>{
            this.getlistDealerVerify()
        })
    }
    aChangeClient = (value,index)=>{
        let dataList = this.state.dataList;
        dataList[index].match_id = value;
        this.setState({
            dataList:dataList
        })
    }
    onSubkit=(item,apply_status)=>{
        
        ajax.get('/hcm/dealer/verify', {
            params: {
                applyStatus:apply_status,
                id:item.id,
                match_id:item.webStatus ==true ?item.match_id : ''
            }
        }).then((response) => {
            this.getList()
            message.success(response.data.message);
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);
