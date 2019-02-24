import Tpl from './tpl';
import { message, Form, Popover } from 'antd';
import ajax from '../../../../js/common/ajax';
class JDInquiries extends React.Component {
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
            height:"200px",
            overflow: "hidden",
            dataIndex: 'tort_link',
            render: (content, record, index) => (
                <Popover placement="bottom" key={index} content={<div style={{width:"200px",overflow:"hidden"}}>{record.tort_link}</div>} trigger="click">
                    <a style={{height:"20px",width:"200px",display: "inline-block",overflow:"hidden"}}>{record.tort_link}</a>
                </Popover>
            )
        }, {
            title: '处理状态',
            dataIndex: 'state',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.state!=null ? <span>
                        {
                            record.state=="完成" ? <span>
                                <img src="../../../../img/icon_Login_prompt_succes.png" style={{marginTop:"4px",float:"left"}}  alt=""/><b>{record.state}</b>
                            </span>: <span>{record.state}</span>    
                            }
                            </span>:null
                    }
                </span>
            )
        }, {
            title: '投诉时间',
            dataIndex: 'complaint_time'
        }, {
            title: '操作',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.state=="待举证" || record.state=="资料审核" ?
                        <a onClick={() => this.chesu(record)}>撤诉</a> :null
                    }
                    
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
            if (res.data.status == 10000) {
                if (res.data.data.length) {
                    this.setState({
                        accountId: res.data.data[0].username,
                        currentData: res.data.data,
                        loading:true
                    }, () => {
                        this.getJDList(this.state.pageNo, this.state.accountId,this.state.state,this.state.pageSize)
                    })  
                }
            }else{
                message.error(res.data.message)
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
    handleChange=(value)=>{
        this.setState({
            accountId:value,
            pageNo:1,
            pageSize:10,
            loading: true
        },()=>{
            this.getJDList(this.state.pageNo, this.state.accountId,this.state.state,this.state.pageSize)
        })
    }
    handleChangex=(value)=>{
        this.setState({
            state: value,
            loading: true
        },()=>{
            this.getJDList(this.state.pageNo, this.state.accountId,this.state.state,this.state.pageSize)
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
                    AppayIDs: "",
                    loading: true
                })
                message.success("撤诉成功")
                this.getJDList(this.state.pageNo, this.state.accountId,this.state.state,this.state.pageSize)

            }else{
                message.error(res.data.data)
            }
        })
    }
    getJDList = (pageNo, account_id, state,pageSize) => {
        LoadingModal({bl:true})
        ajax.post("/hcm/complaint/getJDList", {
            pageNo: pageNo,
            account_id: account_id,
            state: state,
            pageSize:pageSize
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                    this.setState({
                        data: res.data.data.content,
                        totalNum:res.data.data.totalElements,
                        loading:false
                    })
                    LoadingModal({bl:false})
                    message.success(res.data.message)
            }else if(res.data.status == 10001){
                this.setState({
                    data: res.data.data.content,
                    totalNum:res.data.data.totalElements,
                    loading:false
                })
                LoadingModal({bl:false})
                message.error(res.data.message)
            }else{
                this.setState({
                    data: [],
                    totalNum:0,
                    loading:false
                })
                LoadingModal({bl:false})
                message.error(res.data.message)
            }
        }).catch((error) => {
            message.error(error.statusText);
            this.setState({
                data: [],
                totalNum:0,
                loading:false
            })
            LoadingModal({bl:false})
        });
    }
    DL=()=>{
        
        ajax.post("/hcm/complaint/downLoad_jd", {
            account_id: this.state.accountId,
            state:this.state.state
        }).then((res) => {
            console.log(res)
            if (res.data.status == 400) {
                message.error(res.data.message)
            } else {
                window.location.href="/hcm/complaint/downLoad_jd?account_id="+this.state.accountId+"&state="+this.state.state 
        
            }
           // window.URL.revokeObjectURL=res.data
           
        })
        
    }
    changePagination = (current, pageSize) => {
        this.setState({
            pageNo:current,
            pageSize:pageSize,
            loading: true
        },()=>{
            this.getJDList(this.state.pageNo, this.state.accountId,this.state.state,this.state.pageSize)
        })
    }
    onPaginationSize = (current, pageSize) => {
        console.log(current, pageSize)
    }
    handleTableChange = (current, pageSize) => {
        console.log(current, pageSize)
    }
    handleClearIconClick = (productName) => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields(productName)
    }

    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(JDInquiries);
