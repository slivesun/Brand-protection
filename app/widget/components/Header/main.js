import Tpl from './tpl';
import ajax from '../../../js/common/ajax'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleCollapsed,setCurrentBrandToKefu,getBrandListToKefu,getMenuList} from '../../../js/actions/index';
import { getBrandList, setCurrentBrand } from '../../../js/actions/dealer';
import {message} from 'antd'
const mapStateToProps = (state, ownProps) => {
   
    return {
        collapsed: state.collapsed,
        brandList: state.dealer.brandList,
        currentBrand: state.dealer.currentBrand,
        brandListToKefu: state.dealer.brandListToKefu,
        currentBrandToKefu:state.dealer.currentBrandToKefu,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({toggleCollapsed, getBrandList, setCurrentBrand,getBrandListToKefu,setCurrentBrandToKefu,getMenuList},dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
class Header extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            feedbackVisible:false,
            FeedbackList:[],
            Message_list:"",
            totalElements:0
        }
    }
    componentDidMount(){
        this.getFeedbackList()
        this.MessageListDom()
    }
    checkVisible=(type,bl)=>{
        let state = this.state;
        state.messageVisible = false;
        state.feedbackVisible = false;
        state[type] = bl;
        this.setState(state)
    }
    getFeedbackList(){
        ajax.get('/hcm/hcmWorkOrder/selectStatus')
        .then((response) => {
            if(response.data.status=='10000'){
                this.setState({
                    FeedbackList:response.data.data
                })
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    MessageListLIGO=(e)=>{
        
        window.location = "/index.html#/MessageDetails/" + e.target.getAttribute("id") + "/" + e.target.getAttribute("sys_type") + "/" + e.target.getAttribute("messagetype")
    }
    SUNBTN=()=>{
        window.location = "/index.html#/MessageCenter"
    }
    

    MessageListDom=()=>{
        ajax.post('/hcm/hcmMessageCenter/GetNotReadlist')
            .then((res) => {
                //console.log(res)
                if (res.data.status == 10000) {
                    this.setState({
                        Message_list: res.data.data,
                        totalElements:res.data.data.length
                    })
                    //console.log(this.state.Message_list)
                }

            })
    }
    componentWillMount(){
        
    }
    handleSwitchBrand = value => {
        const { setCurrentBrand, brandList } = this.props;
        const data = brandList.filter(v => v.bmcid === value)[0] || {};
       
        ajax.get('/hcm/changeBmcId',{
            params:{
                bmcid:data.bmcid
            }
        })
        .then((response) => {
            
            if (window.location.hash.substr(1) === '/') {
                window.location.reload()
            } else {
                window.location.href = '/index.html#/?date='+moment().format('YYYY-MM-DD-HH:mm:ss');
                window.location.reload()
            }
        })
        
    }
    handleSwitchBrandToKefu = value => {
        const { setCurrentBrandToKefu, brandListToKefu } = this.props;
        const data = brandListToKefu.filter(v => v.bmcid === value)[0] || {};
       
        ajax.get('/hcm/changeBmcId',{
            params:{
                bmcid:data.bmcid
            }
        })
        .then((response) => {
            
            if (window.location.hash.substr(1) === '/') {
                window.location.reload()
            } else {
                window.location.href = '/index.html#/?date='+moment().format('YYYY-MM-DD-HH:mm:ss');
                window.location.reload()
            }
        })
        
    }
    userOur=()=>{
        sessionStorage.removeItem('exdate')
        sessionStorage.removeItem('wechatModalStatus')
        ajax.get('/hcm/logout')
        .then((response) => {
            if(response.data.status=='10000'){
                message.success('退出成功')
                
                if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
                    
                    window.location = "/user.html#/loginu";
                }else{
                    
                    window.location = "/user.html#/loginc";
                }
                window.localStorage.clear()
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    render(){
        return  <Tpl that={this}/>
    }
}
export default Header