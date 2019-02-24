import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class OneSIXInquiries extends React.Component {
    constructor(props) {
        super(props)
        const columns = [{
            title: '投诉时间',
            dataIndex: 'complaint_time',
            render: (content, record, index) => (
                <div> 
                    {moment(record.complaint_time).format('YYYY-MM-DD')}
                </div>
            )
        }, {
            title: '投诉单号',
            width: "150px",
            dataIndex: 'complaint_num'
        }, {
            title: '知识产权编号',
            dataIndex: 'ipr_num'
        }, {
            title: '被投诉方名称',
            width: "150px",
            dataIndex: 'company_name'
        }, {
            title: '侵权链接',
            width: "150px",
            dataIndex: 'tort_link'
        }, , {
            title: '所属站点',
            dataIndex: 'site'
        }, {
            title: '状态',
            dataIndex: 'state'
        }, {
            title: '操作',
            dataIndex: 'addressb',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.state == "案件处理中" ? <span>
                            <a href={`/index.html?#/OneSIXAppealDetails/${record.case_id}/${this.state.account_id}`} target="_blank" style={{ marginRight: "10px" }}><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop:"4px",float:"left"}} alt=""/><b>案件详情</b></a>
                            <a style={{ marginRight: "10px" }} onClick={() => this.CSBtn(record)}>撤诉</a></span>
                            : record.state == "投诉方已接收反通知" || record.state == "投诉内容保留" || record.state == "投诉方撤诉" ? <span>
                                <a href={`/index.html?#/OneSIXAppealDetails/${record.case_id}/${this.state.account_id}`} target="_blank" style={{ marginRight: "10px" }}><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop:"4px",float:"left"}}  alt=""/><b>案件详情</b></a>
                                <a href={`/index.html?#/OneSIXcomplaints/${record.case_id}/${this.state.account_id}/${record.ipr_num}`} target="_blank" style={{ marginRight: "10px" }}>反通知详情</a></span>
                                : record.state == "投诉侵权内容处理" ? <span>
                                    <a href={`/index.html?#/OneSIXAppealDetails/${record.case_id}/${this.state.account_id}`} target="_blank" style={{ marginRight: "10px" }}><img src="../../../../img/icon/icon_operating_Details.png"  style={{marginTop:"4px",float:"left"}} alt=""/><b>案件详情</b></a>
                                    <a style={{ marginRight: "10px" }} onClick={() => this.CSBtn(record)}>撤诉</a>
                                </span>
                                    : record.state == "投诉未受理" ? <span>
                                        <a href={`/index.html?#/OneSIXAppealDetails/${record.case_id}/${this.state.account_id}`} target="_blank" style={{ marginRight: "10px" }}><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop:"4px",float:"left"}}  alt=""/><b>案件详情</b></a>

                                    </span>
                                        : null
                    }
 
                </span>
            )
        }]
        this.state = {
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            ProductInformation_list: columns,
            get1688List: [],
            loading: false,
            AppayIDs: [],
            selectedRowKeys: [],
            account_id: "",
            ipr_num: "", // -> 知识产权编号
            complaint_num: "", //              ->投诉单号          
            company_name: "", //  ->公司/商铺名称
            start_time: "", //        开始时间
            end_time: "", //  结束时间
            site: "", //
            state: "", //
            currentData: [],
            token: "",
            pageNo: 1, // 第几页
            successBTN: "",
            TITBoy: "",
            visible: false
        }

    }
    getNowFormatDate = () => {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    GetDateStr = (AddDayCount) => {
        var dd = new Date(); dd.setDate(dd.getDate() + AddDayCount);
        var y = dd.getFullYear(); var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
    }
    componentDidMount() {
        ajax.post("/hcm/complaiont/getListByBmcid", {
            platform: "ALIBABA"
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                // const currentData = res.data.data.filter(x => {

                //     return x.cookie1688 != null;
                // });
                if (res.data.data.length > 0) {
                    this.setState({
                        account_id: res.data.data[0].username,
                        currentData: res.data.data,
                        loading: true
                        // start_time: this.GetDateStr(-90),
                        // end_time: this.GetDateStr(0)
                    }, () => {
                        this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)

                    })
                }

            }
        })

    }
    get1688List = (account_id, ipr_num, complaint_num, company_name, start_time, end_time, site, state, pageNo, pageSize) => {
        LoadingModal({bl:true})
        ajax.post('/hcm/complaint/get1688List', {
            account_id: account_id,
            ipr_num: ipr_num, // -> 知识产权编号
            complaint_num: complaint_num, //              ->投诉单号          
            company_name: company_name, //  ->公司/商铺名称
            start_time: start_time, //        开始时间
            end_time: end_time, //  结束时间
            site: site, //
            state: state, //
            pageNo: pageNo, // 第几页
            pageSize: pageSize
        })
            .then((res) => {
                console.log(res)
                if (res.data.status == 10000) {
                    this.setState({
                        pageNumber: res.data.data.pageNumber,
                        totalNum: res.data.data.totalElements,
                        pageSize: res.data.data.pageSize,
                        get1688List: res.data.data.content,
                        loading: false,
                        selectedRowKeys:[]
                        
                    })
                    LoadingModal({bl:false})
                    message.success(res.data.message)
                } else if(res.data.status == 10001){
                    this.setState({
                        pageNumber: res.data.data.pageNumber,
                        totalNum: res.data.data.totalElements,
                        pageSize: res.data.data.pageSize,
                        get1688List: res.data.data.content,
                        loading: false,
                        selectedRowKeys:[]
                        
                    })
                    LoadingModal({bl:false})
                    message.error(res.data.message)
                } else {
                    this.setState({
                        loading: false,
                        selectedRowKeys:[]
                    })
                    LoadingModal({bl:false})
                    message.error(res.data.message)
                }
            }) .catch((error) => {
                message.error(error.statusText);
                this.setState({
                    loading: false,
                    selectedRowKeys:[]
                })
                LoadingModal({bl:false})
            });
    }
    handleCancels = () => {
        this.setState({
            visible: false,
            AppayIDs: [],
            selectedRowKeys:[]
        })
    }
    handleOk = () => {

        if (this.state.successBTN == "1") {
            ajax.post('/hcm/complaint/cheShu1688', {
                caseIds: this.state.AppayIDs.join(","),
                account_id: this.state.account_id,
                tbToken: this.state.token,
                loading: true
            }).then((res) => {
                if (res.data.status == 10000) {
                    console.log(res)
                    this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)
                    this.setState(({
                        visible: false,
                        selectedRowKeys:[]
                    }))
                    message.success(res.data.message)
                }else{
                    this.setState({
                        selectedRowKeys:[]
                    })
                }
            })
        } else {
            //console.log(this.state.AppayIDs)
            ajax.post('/hcm/complaint/cheShu1688', {
                caseIds: this.state.AppayIDs,
                account_id: this.state.account_id,
                tbToken: this.state.token,
                loading: true
            }).then((res) => {
                if (res.data.status == 10000) {
                    console.log(res)
                    this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)
                    this.setState(({
                        visible: false,
                        selectedRowKeys:[]
                    }))
                    message.success(res.data.message)
                }else{
                    this.setState({
                        selectedRowKeys:[]
                    })
                }
            })
        }

    }
    PLCS = () => {//批量撤诉

        if (this.state.AppayIDs != "") {
            this.setState({
                visible: true,
                successBTN: "1",
                TITBoy: "您确认需要此操作嘛?"
            })
        } else {
            message.error("请勾选需要批量操作的目标！")
        }
    }
    CSBtn = (record) => {
        this.setState({
            visible: true,
            successBTN: "2",
            TITBoy: "您确认需要此操作嘛?",
            AppayIDs: record.case_id,
            tbToken: record.token
        })

    }

    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
               
                this.setState({
                    ipr_num: values.productName,
                    complaint_num: values.brandName,
                    company_name: values.DesName,
                    pageNo: 1,
                    loading: true
                },()=>{
                    this.get1688List(this.state.account_id, values.productName, values.brandName, values.DesName, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)

                })
              
            }
        })
    }
    onChange = (date, dateString) => {//时间
        console.log(dateString)
        this.setState({
            start_time: dateString[0],
            end_time: dateString[1]
        })
        console.log(this.state.start_time)
    }
    handleChange = (value) => {//投诉账号
        this.setState({
            account_id: value,
            pageNo: 1,
            pageSize: 10,
            loading: true,
            selectedRowKeys:[]
        }, () => {
            this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)

        })

    }
    handleChanges = (value) => {//站点
        this.setState({
            site: value
        })

    }
    handleChangex = (value) => {//状态
        this.setState({
            state: value
        })

    }
    onSelectChange = (selectedRowKeys, appay) => {//全选
        console.log(selectedRowKeys, appay)
        const AppayID = []
        appay.forEach((v, l) => {
            //console.log(v,l)
            AppayID.push(v.case_id)
        })
        console.log(appay)
        if (appay != "") {
            this.setState({
                selectedRowKeys,
                AppayIDs: AppayID,
                token: appay[0].token
            });
        } else {
            this.setState({
                selectedRowKeys,
                AppayIDs: AppayID,
                token: ""
            });
        }



    }
    changePagination = (current, pageSize) => {
        this.setState({
            pageNo: current,
            pageSize: pageSize,
            selectedRowKeys:[],
            loading: true
        }, () => {
            this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)

        })
    }
    onPaginationSize = (current, pageSize) => {
        this.setState({
            pageNo: current,
            pageSize: pageSize,
            selectedRowKeys:[],
            loading: true
        }, () => {
            this.get1688List(this.state.account_id, this.state.ipr_num, this.state.complaint_num, this.state.company_name, this.state.start_time, this.state.end_time, this.state.site, this.state.state, this.state.pageNo, this.state.pageSize)

        })
    }
    handleTableChange = (current, pageSize) => {
        //console.log()
    }
    handleClearIconClick = (productName) => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields(productName)
    }
  
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(OneSIXInquiries);
