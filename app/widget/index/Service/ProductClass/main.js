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
            productClassifyName:null,
            dataList:[],
            companyname:null,
            
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
        let {pageSize,pageNum,productClassifyName} = this.state;
        ajax.get('/hcm/monitorPrice/GetProClass',{
            params:{
                pageSize,
                pageNum:Num ? Num : pageNum,
                productClassifyName
            }
        })
        .then((response) => {
            if(response.data.status=='10000'){
                this.setState({
                    dataList:response.data.data.list,
                    pageNum:Num ? Num : this.state.pageNum,
                    totalElements:response.data.data.count,
                    companyname:response.data.data.companyname,
                })
            }else{
                message.error(response.data.message);
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onChangeInput = (e) =>{
        this.setState({
            productClassifyName:e.target.value
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
