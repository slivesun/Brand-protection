import {Switch, HashRouter, Route } from 'react-router-dom';

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
            path:'/daily',
            component:'./Daily/main.js'
        },{
            path:'/month/:startdate?/:enddate?',
            component:'./Month/main.js'
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