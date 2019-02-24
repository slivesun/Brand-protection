import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class OneSIXcomplaints extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            get1688NoticeDetail:"",
            ipr_num:""
        }

    }

    componentDidMount() {
        this.get1688NoticeDetail()
        console.log(this.props.match.params)
    }
    get1688NoticeDetail = () => {
        ajax.post("/hcm/complaint/get1688NoticeDetail",{
            caseId:this.props.match.params.caseId,
            account_id:this.props.match.params.account_id,
            ipr_num:this.props.match.params.ipr_num
        }).then((res)=>{
            console.log(res)
            if(res.data.status==10000){
                if(res.data.status!=400){
                    this.setState({
                        ipr_num:this.props.match.params.ipr_num,
                        get1688NoticeDetail:res.data.data
                    })
                }else{
                    this.setState({
                        ipr_num:this.props.match.params.ipr_num
                    })
                }
                
            }
        })
    }
    
render() {
    return <Tpl that={this} />
}
}
export default Form.create()(OneSIXcomplaints);
