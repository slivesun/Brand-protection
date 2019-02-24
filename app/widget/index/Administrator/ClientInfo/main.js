import Tpl from './tpl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goClientInfo } from '../../../../js/actions/index';
import { message } from 'antd';
import axios from '../../../../js/common/ajax';
const mapStateToProps = (state, ownProps) => {
    return {
        stateClient: state.stateClient
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ goClientInfo }, dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: '',
            des: '',
            spinning:false,
            params: this.props.match.params,
            bmaincustomer_list: [],
            page_info: {
                pageNo: 1,
                pageSize: 12,
                totalNum: 0,
            },
            targetId: null,
            ClientInfos:"",
            type:""
        }
    }

    componentDidMount() {
       
       
        console.log(this.props.match.path)
       this.setState({
        ClientInfos:this.props.match.path
       },()=>{
        if(this.state.ClientInfos=="/ClientInfos"){
            this.setState({
                type:"jingpin"
            },()=>{
                this.getList()
                this.props.goClientInfo(true)
            })
        }else{
            this.setState({
                type:""
            },()=>{
                this.getList()
                this.props.goClientInfo(true)
            })
        }
       })
    }

    componentWillUnmount(){
        this.props.goClientInfo(false)
    }
    getList(pageNo){
        let { cus_name, des, page_info } = this.state;
        this.setState({
            spinning:true,
        },()=>{
           
            axios.get('/hcm/cus/cus_customerlist', {
                params: {
                    "cus_name": cus_name,
                    "cus_memo_name": des,
                    "pageNo": pageNo ? pageNo :page_info.pageNo,
                    "pageSize": page_info.pageSize
                }
            })
            .then((response) => {
                
                console.log(response)
                if(response.data.status==10000){
                    this.setState({
                        bmaincustomer_list: response.data.data.bmaincustomer_list,
                        page_info: response.data.data.page_info,
                        spinning:false,
                    })
                }else{
                    message.error(response.data.message);
                }
                
            })
            .catch((error) => {
                message.error(error.message);
                this.setState({
                    spinning:false
                })
            });
        })
        
    }
    searchSubmit = () => {
        this.getList(1)
    }
    searchShow = (e, bmcid) => {
        this.setState({
            targetId: bmcid
        })
        this.props.goClientInfo(true)

    }
    searchHide = (e) => {
        this.setState({
            targetId: null
        },()=>{
            this.getList()
        })
        this.props.goClientInfo(false)

    }
    changeInput = (e, from) => {
        let state = this.state;
        state[from] = e.target.value;
        this.setState(state)
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    onLoading = () => {
        let { cus_name, des, page_info } = this.state;
        this.setState({
            spinning:true,
        },()=>{
            axios.get('/hcm/cus/cus_customerlist', {
                params: {
                    "cus_name": cus_name,
                    "cus_memo_name": des,
                    "pageNo": page_info.pageNo+1,
                    "pageSize": page_info.pageSize
                }
            })
            .then((response) => {
                let bmaincustomer_list = this.state.bmaincustomer_list;
                bmaincustomer_list.push(...response.data.data.bmaincustomer_list)
                this.setState({
                    bmaincustomer_list: bmaincustomer_list,
                    page_info: response.data.data.page_info,
                    spinning:false,
                })
            })
            .catch((error) => {
                message.error(error.message);
                this.setState({
                    spinning:false
                })
            });
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App