import Tpl from './tpl';
import { connect } from 'react-redux';
const mapStateToProps = (state, ownProps) => {
    return {
        collapsed: state.collapsed,
        menulist:  state.dealer.menulist,
        currentBrand: state.dealer.currentBrand

    }
}
@connect(mapStateToProps)
class Nav extends React.Component{
    constructor(props){
        super(props)
        let arr = []
        if(this.props.menulist.data&&this.props.menulist.status=='10000'){
            this.props.menulist.data.forEach((item,index)=>{
                if(item.children&&item.children.length&&item.menuUrl == 'false'){
                    arr.push(`${item.id}`)
                }
            })
        }
        this.state = {
            menuList:[],
            openKeys: [],
            rootSubmenuKeys : arr
        }
    }
    componentDidMount(){
        
    }
    componentWillMount(){
        
        
    }
    ondefOpenChange = (openKeys) => {
        
        this.setState({
        openKeys: openKeys
        });
      }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    formAt=()=>{
        let arr = [];
        let forData = (data) => {
            data.forEach((item, index) => {
                
                arr.push(item)
                if (item.children !== null) {
                    forData(item.children)
                }
            })
        }
        if(this.props.menulist.data==null||this.props.menulist.status!='10000'){
            console.log(this.props.menulist)
        }else{
            forData(this.props.menulist.data)
        }
        
        return arr
    }
    oStyle = (item,tarUrl,bl)=>{
        let c = '_normal';
        if(tarUrl.parentid== 0){
            if(tarUrl.id ==item.id){
                c = '';
            }
        }else{
            if(tarUrl.parentid ==item.id|| (item.children&&item.children.filter(item=>item.id ==tarUrl.parentid).length)){
                c = '';
            }
        }
        return {
            verticalAlign:'middle',
            background:`url(../../../../img/nav/${item.menuIcon}${c}.png) no-repeat`,
            fontSize:'0px',
            width:'22px',
            height:'23px'
        }
    }
    render(){
        return <Tpl that={this}/>
    }
}
export default Nav