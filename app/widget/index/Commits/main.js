import Tpl from './tpl';
import ajax from '../../../js/common/ajax';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList:[],
            dataList:[],
            page:1,
            loading:false,
            show:true,
        }
    }
    componentDidMount() {
       this.getList()
    }
    
    getList = () => {
        ajax.get('http://n1a6884762.iok.la/api/v4/projects/95/repository/commits',{
            params:{
                private_token:'iHARe64RLtMbPFQcnJEt',
                per_page:'20',
                page:this.state.page,
            }
        })
        .then((response) => {
            this.setState({
                dataList:this.state.dataList.concat(response.data),
                loading:false,
                show:response.data.length == 20 ? true :false
            })
        }).catch((error) => {
            message.error(error.statusText);
            this.setState({
                loading:true,
            })
        });
    }
    loading = ()=>{
        this.setState({
            loading:true,
            page:this.state.page+1
        },this.getList)
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
