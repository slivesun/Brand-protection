import {Switch, HashRouter, Route } from 'react-router-dom';
// var context = require.context('.', true,/\.js$/);
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if(window.location.pathname==='/'){
            window.location.href = '/user.html#/loginc'
        }
    }
   
    render() {
        var arr = [{
            path:'/loginu',
            component:'./LogIn/main.js'
        },{
            path:'/loginc/:invitecode?',
            component:'./LogIn/main.js'
        },{
            path:'/Forgetpwd/:type',
            component:'./Forgetpwd/main.js'
        },{
            path:'/Registered/:id',
            component:'./registered/main.js'
        },{
            path:'/LogIns',
            component:'./LogIns/main.js'
        }]
       
        
        return (
            
            <HashRouter>
                <React.Fragment>
                    <Switch>
                        {
                            arr.map((item,index)=>{
                                return(
                                     <Route key={index} exact path={item.path} component={Loadable({
                                        loader: () => import(`${item.component}`),
                                        loading: Loading
                                    })} />
                                )
                            })
                        }
                        
                    </Switch>
                </React.Fragment>
            </HashRouter>
        )
    }
}
export default App