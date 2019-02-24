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
            companyname:null,
            dataList:[],
            
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
    getList=(Num)=>{
        let {pageSize,pageNum,companyname} = this.state;
        ajax.get('/hcm/monitorPrice/GetBmc',{
            params:{
                pageSize,
                pageNum:Num ? Num : pageNum,
                companyname
            }
        })
        .then((response) => {
            if(response.data.status=='10000'){
                this.setState({
                    pageNum:Num ? Num : this.state.pageNum,
                    dataList:response.data.data.list,
                    totalElements:response.data.data.count
                })
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onChangeInput = (e) =>{
        this.setState({
            companyname:e.target.value
        })
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
