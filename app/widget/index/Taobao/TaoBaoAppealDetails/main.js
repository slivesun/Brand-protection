import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class TaoBaoAppealDetails extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = {
            detail_taobao:"",
            batchid:"",
            accountId:"",
            ID:""
        }

    }

    
    componentDidMount() {
        this.detail_taobao()
       // console.log(this.props.match.params)
    }
    detail_taobao=()=>{
        ajax.post('/hcm/complaint/detail_taobao',{
                batchId:this.props.match.params.batch_id,
                accountId:this.props.match.params.accountId,
                id:this.props.match.params.id
        })
        .then((res)=>{
            console.log(res)
            if(res.data.status==10000){
                    this.setState({
                         detail_taobao:res.data.data.data,
                         batchid:this.props.match.params.batch_id,
                         ID:this.props.match.params.id,
                         accountId:this.props.match.params.accountId

                    })       
                
            }else{
                message.error(res.data.message)
            }
        }).catch((error) => {
            message.error(error.statusText);
            
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(TaoBaoAppealDetails);
