import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class OneSIXAppealDetails extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = {
            basicInfo:"",
            defendantInfo:"",
            history_lis:[]
        }

    }

    componentDidMount() {
        this.get1688Detail()
        console.log(this.props.match.params)
    }
    get1688Detail=()=>{
        
        ajax.post('/hcm/complaint/get1688Detail', {
            caseId:this.props.match.params.caseId,
            account_id:this.props.match.params.ipr_num
        }).then((replaceState)=>{
            console.log(replaceState)
            if(replaceState.data.status==10000){
                this.setState({
                    basicInfo:replaceState.data.data.basicInfo,
                    defendantInfo:replaceState.data.data.defendantInfo,
                    history_lis:replaceState.data.data.history_lis
                })
            }
        })
    }
    
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(OneSIXAppealDetails);
