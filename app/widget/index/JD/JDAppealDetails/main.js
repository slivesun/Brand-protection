import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class JDAppealDetails extends React.Component {
    constructor(props) {
        super(props)
        const columns = [{
            title: '处理时间',
            dataIndex: '处理时间',
            render: (content, record, index) => (
                <span key={index}>
                    {record.处理时间}
                </span>
            )
        },{
            title: '处理信息',
            dataIndex: '处理信息',
            render: (content, record, index) => (
                <span key={index}>
                  {record.处理信息}
                </span>
            )
        },{
            title: '操作人',
            dataIndex: '操作人'
        }]
        this.state = {
            getJDDetail:"",
            loading: false,
            ProductInformation_list:columns,
            data:[]
        }

    }

    componentDidMount() {
        
        ajax.post("/hcm/complaint/getJDDetail", {
            right_id: this.props.match.params.case_id,
            account_id:this.props.match.params.accountId
        }).then((res) => {
            if (res.data.status == 10000) {
                    this.setState({
                        getJDDetail:res.data.data,
                        data:res.data.data.track_info_lis
                    })
                
               console.log(this.state.getJDDetail)
            }
        })

    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(JDAppealDetails);
