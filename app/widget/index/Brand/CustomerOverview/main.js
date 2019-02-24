import Tpl from './tpl';
import ajax from '../../../../js/common/ajax';
import data from './data.json';
class CustomerOverview extends React.Component {
    constructor(props) {
        // document.title = '客户总览';
        
        super(props)
        this.ChartTree = React.createRef();
        this.state = {
            data: data,
        }
    }

    componentDidMount() {
       
    }
    

    render() {
        return <Tpl that={this} />
    }
}
export default CustomerOverview