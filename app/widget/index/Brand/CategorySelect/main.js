import Tpl from './tpl';
import ajax from '../../../../js/common/ajax';
import {message} from 'antd';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            id:null
        }
    }
    componentDidMount() {
        this.getList()
    }
   
    getList = () => {
        ajax.get('/hcm/sys/GetList',{
            params: {
                dictcode: 'category'
            }
        })
        .then((response) => {
            this.setState({
                dataList: response.data.data
            })
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    chSelect = (value, option) =>{
        this.setState({
            id:value
        })
    }
    onSubmit=()=>{
        ajax.post('/hcm/sys/SetCat',{
            id:this.state.id
        })
        .then((response) => {
            if(response.data.status =='10000'){
                message.success('设置成功')
                localStorage.catid = this.state.id;
                window.location.href = '/index.html#/';
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