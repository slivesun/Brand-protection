import { connect } from 'react-redux';
import { HashRouter, Route ,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading'
import Nav from '../components/Nav/main';
import Header from '../components/Header/main';
import NoMatch from '../components/NoMatch';
import LogIns from '../user/LogIns/main';
const SpecialComplaint = Loadable({
    loader: () => import('./SpecialComplaint/main.js'),
    loading: Loading,
})

// const ChangeHistory = Loadable({
//     loader: () => import('./ChangeHistory/main.js'),
//     loading: Loading,
// })

const mapStateToProps = (state, ownProps) => {
    return {
        menulist: state.dealer.menulist,
    }
}
@connect(mapStateToProps)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: []
        }
    }
    componentDidMount() {

    }
    componentWillMount() {
        this.setState({
            menuList:this.formAt()
        })
    }
    formAt(){
        let arr = [];
        let forData = (data) => {
            data.forEach((item, index) => {
                if (item.menuUrl !== 'false') {
                    arr.push(item)
                }
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
    render() {
        
        let { menuList } = this.state;
        return (
            <HashRouter >
                <React.Fragment>
                    <Route component={Nav} />
                    <div className='right-box'>
                        <Route component={Header} />
                        <Switch>
                            {
                                menuList.map((item, index) => {
                                    return (
                                        <Route key={item.menuUrl} path={item.menuUrl} exact component={Loadable({
                                            loader: () => import(`${item.modulename}`),
                                            loading: Loading
                                        })} />
                                    )
                                })
                            }
                            
                            <Route path='/SpecialComplaint' exact component={SpecialComplaint} />   
                            <Route component={NoMatch}/>

                        </Switch>
                    </div>
                </React.Fragment>
            </HashRouter>
        )
    }
}
export default App
