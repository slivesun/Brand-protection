import Tpl from './tpl';
import { message, Form, Popover } from 'antd';
import ajax from '../../../../js/common/ajax';
class MonitoringDetails extends React.Component {
    constructor(props) {
        super(props)
        // 投诉详情,288
        // BRM-客服-维权服务-投诉查询-京东投诉查询-单号详情
        // /JDAppealDetails/:case_id/:accountId
        // /JDAppealDetails/:case_id/:accountId
        // ./JD/JDAppealDetails/main
        // null
        // 264
        // 9005
        // JDAppealDetails
        const columns = [{
            title: '投诉编号',
            dataIndex: 'complaint_num',
            render: (content, record, index) => (
                <span key={index}>
                    <a href={`/index.html?#/JDAppealDetails/${record.case_id}/${this.state.accountId}`}  target="_blank" style={{ marginRight: "10px" }}>{record.complaint_num}</a>
                </span>
            )
        }, {
            title: '产权类型',
            dataIndex: 'ipr_type'
        }, {
            title: '投诉链接',
            width: "30%",
            height:"50px",
            overflow: "hidden",
            dataIndex: 'tort_link',
            render: (content, record, index) => (
                <Popover placement="bottom" key={index} content={<div style={{width:"200px",overflow:"hidden"}}>{record.tort_link}</div>} trigger="click">
                    <a style={{height:"20px",display: "inline-block",overflow:"hidden"}}>{record.tort_link}</a>
                </Popover>
            )
        }, {
            title: '处理状态',
            dataIndex: 'state',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.state
                    }
                </span>
            )
        }, {
            title: '投诉时间',
            dataIndex: 'complaint_time'
        }, {
            title: '操作',
            fixed:"right",
            render: (content, record, index) => (
                <span key={index}>
                    <a onClick={() => this.chesu(record)}>撤诉</a>
                </span>
            )
        }]
        this.state = {
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            ProductInformation_list: columns,
            data: [],
            loading: false,
            accountId: "",
            currentData: "",
            state: "",
            TITBoy: "",
            visible: false,
            AppayIDs: ""
        }

    }

    componentDidMount() {
        ajax.post("/hcm/complaiont/getListByBmcid", {
            platform: "JINGDONG"
        }).then((res) => {
            if (res.data.status == 10000&&res.data.data.legth) {

                this.setState({
                    accountId: res.data.data[0].username,
                    currentData: res.data.data
                }, () => {
                    this.getJDList(this.state.pageNo, this.state.accountId)
                })
            }
        })

    }
    chesu=(record)=>{
        this.setState({
            visible:true,
            AppayIDs:record.case_id,
            TITBoy:"您确认撤诉此项嘛?"
        })
    }
    handleChangex=(value)=>{
        this.setState({
            state: value
        },()=>{
            this.getJDList(this.state.pageNo, this.state.accountId,this.state.state)
        })
    }
    handleCancels = () => {
        this.setState({
            visible: false,
            AppayIDs: ""
        })
    }
    handleOk = () => {
        ajax.post("/hcm/complaint/cheShuJD", {
            right_id : this.state.AppayIDs,
            account_id: this.state.accountId
        }).then((res) => {
            if(res.data.status==10000){
                this.setState({
                    visible: false,
                    AppayIDs: ""
                })
                message.success("撤诉成功")
            }else{
                message.error(res.data.data)
            }
        })
    }
    getJDList = (pageNo, account_id, state) => {
        ajax.post("/hcm/complaint/getJDList", {
            pageNo: pageNo,
            account_id: account_id,
            state: state
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                if (res.data.data.status != 400) {
                    this.setState({
                        data: res.data.data.data.content,
                        totalNum:res.data.data.data.totalElements
                    })
                    console.log(res.data.data.data.content[0].tort_link.split("↵"))
                } else {
                    message.error(res.data.data.message)
                }

            }
        })
    }
    changePagination = (current, pageSize) => {
        this.setState({
            pageNo:current
        },()=>{
            this.getJDList(this.state.pageNo, this.state.accountId,this.state.state)
        })
    }
    onPaginationSize = (current, pageSize) => {
        console.log(current, pageSize)
    }
    handleTableChange = (current, pageSize) => {
        console.log(current, pageSize)
    }
    handleClearIconClick = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields("productName")
    }
    handleClearIconClicks = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields("brandName")
    }
    handleClearIconClickx = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields("productbrandName")
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(MonitoringDetails);
