import Tpl from './tpl';
import { message, Form, Popover } from 'antd';
import axios from '../../../../js/common/ajax'
import ajax from '../../../../js/common/ajax';
class TaobaoInquiries extends React.Component {
    constructor(props) {
        super(props)
        const columns = [{
            title: '投诉信息',
            dataIndex: 'entity_owner_name',
            render: (content, record, index) => (
                <span key={index}>
                    <h5 style={{color:"#333"}}>{record.entity_owner_name}</h5>
                    <h5 style={{color:"#666"}}>投诉单号：{record.batch_id}</h5>
                    <h5 style={{color:"#666"}}>发起投诉时间：{moment(parseInt(record.gmt_create)).format('YYYY-MM-DD HH:mm:ss')}</h5>
                    <h5 style={{color:"#666"}}>{record.entity_content}</h5>
                </span>
            )
        }, {
            title: '平台',
            dataIndex: 'platform_code',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.platform_code == "taobao"
                            ? <span><img src="../../../../img/icon/tao.png" style={{marginTop:"10px"}} alt="" /></span>
                            : <span><img src="../../../../img/icon/Tmall.png" style={{marginTop:"10px"}}  alt="" /></span>
                    }
                </span>
            )
        }, {
            title: '知识产权',
            dataIndex: 'ipr_name'
        }, {
            title: '处理状态/备注',
            width: "200px",
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.status == "auditNoPass" ? <span>
                            <h4>{record.status_str}</h4>

                            {/* <h5>投诉时间：{record.gmt_create}</h5> */}

                            {
                                record.complaint_remark ?
                                    <Popover placement="bottom" key={index} content={<div style={{ width: "200px", overflow: "hidden" }}>{record.complaint_remark}</div>} trigger="hover">
                                        投诉理由： <p className="pp" style={{ height: "20px", display: "inline-block", overflow: "hidden" }}>{record.complaint_remark}...</p>
                                    </Popover>
                                    : null
                            }

                        </span> : record.status == "appealPass" ? <span>
                            <h4>{record.status_str}</h4>
                            <h5>申诉时间：{record.appeal_date}  </h5>
                            {
                                record.appeal_comment ? <Popover placement="bottom" key={index} content={<div style={{ width: "200px", overflow: "hidden" }}>{record.appeal_comment}</div>} trigger="hover">
                                    申请理由： <p className="pp" style={{ height: "20px", display: "inline-block", overflow: "hidden" }}>{record.appeal_comment}...</p>
                                </Popover> : null
                            }
                            {
                                record.status == "appealPass" ? <a href={`/index.html?#/TaoBaocomplaints/${record.batch_id}/${record.id}/${this.state.accountId}/${record.id}`} target="_blank">查看更多</a> : null
                            }
                        </span> : <span>
                                    <h4>{record.status_str}</h4>
                                    {
                                        record.status == "appealPass" ? <a href={`/index.html?#/TaoBaocomplaints/${record.batch_id}/${record.id}/${this.state.accountId}/${record.id}`} target="_blank">查看更多</a> : null
                                    }
                                </span>
                    }
                </span>
            )
        }, {
            title: '操作',
            render: (content, record, index) => (
                <span key={index}>
                    {/* record.status == "appealNoPass" || record.status == "auditNoPass" || record.status == "withdrawal" || record.status=="invalid"  ? <span>
                            <h4><a href={`/index.html?#/TaoBaoAppealDetails/${record.batch_id}/${record.id}/${this.state.accountId}`} target="_blank">查看投诉详情</a></h4>
                        </span> : */}
                    {
                        record.status == "submitted" || record.status == "auditPass" || record.status == "involved" ? <span>
                            <h4><a href={`/index.html?#/TaoBaoAppealDetails/${record.batch_id}/${record.id}/${this.state.accountId}`} target="_blank"><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>查看投诉详情</b></a></h4>
                            <h4><a onClick={() => this.PLCSBtn(record)}><img src="../../../../img/icon/fh.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>撤诉</b></a></h4>
                        </span> : record.status == "appeal" ? <span>
                            <h4><a href={`/index.html?#/TaoBaoAppealDetails/${record.batch_id}/${record.id}/${this.state.accountId}`} target="_blank"><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>查看投诉详情</b></a></h4>
                            <h4><a onClick={() => this.XEBtn(record)} ><img src="../../../../img/icon/xe.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>申请小二介入</b></a></h4>
                            <h4><a onClick={() => this.PLCSBtn(record)}><img src="../../../../img/icon/fh.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>撤诉</b></a></h4>
                        </span> : <h4><a href={`/index.html?#/TaoBaoAppealDetails/${record.batch_id}/${record.id}/${this.state.accountId}`} target="_blank"><img src="../../../../img/icon/icon_operating_Details.png" style={{marginTop: "4px",float: "left"}} alt=""/><b>查看投诉详情</b></a></h4>
                    }
                </span>
            )
        }]
        this.state = {
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            ProductInformation_list: columns,
            loading: false,
            linknum_taobao: "",
            link_taobao: [],
            AppayIDs: [],
            selectedRowKeys: [],
            accountId: "",
            platform: "淘宝",
            platformCode: "taobao",
            entityType: "item",
            visible: false,
            typeDA: "",
            status: "",
            start_time: "",
            end_time: "",
            iprName: "",//知识产权名称
            entityOwnerName: "",//被投诉方
            batchId: "",//投诉单号
            currentData: [],
            successBTN: "",
            TITBoy: "",
            AppayIDb: [],
            a: "",
            num: ""
        }

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
            if (res.data.status == 10000) {

                if (res.data.data.length) {
                    this.setState({
                        accountId: res.data.data[0].username,
                        currentData: res.data.data,
                        start_time: this.GetDateStr(-90),
                        end_time: this.GetDateStr(0),
                        loading: true
                    }, () => {
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                }

            } else {

                message.error(res.data.message)
            }
        })

    }
    function = (ar) => {
        var arr = ar;
        var s = 0;
        arr.forEach(function (val, idx, arr) {
            s += val;
        }, 0);

        return s;

    };
    linknum_taobao = () => {
        this.setState({
            linknum_taobao: []
        }, () => {
            ajax.post('/hcm/complaint/linknum_taobao', {
                accountId: this.state.accountId,
                platform: this.state.platform,
                platformCode: this.state.platformCode,
                entityType: this.state.entityType,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                iprName: this.state.iprName,//知识产权名称
                entityOwnerName: this.state.entityOwnerName,//被投诉方
                batchId: this.state.batchId//投诉单号
            }).then((res) => {

                
                if (res.data.status == 10000) {
                    if (res.data.data != null) {
                        const DataList = {}
                        const num = []
                        res.data.data.forEach((v, l) => {
                            DataList[v.sta_value] = v.sta_count
                            num.push(v.sta_count)
                        })
                        this.setState({
                            linknum_taobao: DataList,
                            num: this.function(num)
                        })
                    } else {
                        message.error(res.data.message)
                    }


                } else {
                    message.error(res.data.message)
                }
            })
        })

    }




    PLCSBtn = (record) => {
        const arr = []
        this.setState({
            visible: true,
            successBTN: "2",
            TITBoy: "您确认需要撤诉嘛?",
            AppayIDb: record.id + "#" + record.batch_id
        }, () => {


        })
    }
    XEBtn = (record) => {
        const arr = []
        this.setState({
            visible: true,
            successBTN: "4",
            TITBoy: "您确认需要小二介入嘛?",
            AppayIDb: record.id + "#" + record.batch_id
        })
    }
    handleCancels = () => {
        this.setState({
            visible: false,
            selectedRowKeys: []
        })
    }
    handleOk = () => {
        if (this.state.successBTN == "1") {//批量撤诉 
            const data = {
                idAndBatchId: this.state.AppayIDs,
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                accountId: this.state.accountId,
                platform: this.state.platform,
                platformCode: this.state.platformCode,
                entityType: this.state.entityType,
                status: this.state.status,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                iprName: this.state.iprName,//知识产权名称
                entityOwnerName: this.state.entityOwnerName,//被投诉方
                batchId: this.state.batchId//投诉单号
            }
            axios({
                method: 'post',
                url: '/hcm/complaint/withdraw_taobao',
                transformRequest: [function (data, headers) {
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then((res) => {
                if (res.data.status == 10000) {
                    message.success(res.data.data)
                    this.setState({
                        visible: false,
                        AppayIDs: [],
                        AppayIDb: [],
                        selectedRowKeys: [],
                        loading:true
                    }, () => {

                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                } else {
                    this.setState({
                        selectedRowKeys: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                    
                }
            })
        } else if (this.state.successBTN == "2") {////单个撤诉
            const data = {
                idAndBatchId: this.state.AppayIDb,
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                accountId: this.state.accountId,
                platform: this.state.platform,
                platformCode: this.state.platformCode,
                entityType: this.state.entityType,
                status: this.state.status,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                iprName: this.state.iprName,//知识产权名称
                entityOwnerName: this.state.entityOwnerName,//被投诉方
                batchId: this.state.batchId//投诉单号
            }
            axios({
                method: 'post',
                url: '/hcm/complaint/withdraw_taobao',
                transformRequest: [function (data, headers) {
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then((res) => {
                if (res.data.status == 10000) {
                    message.success(res.data.data)
                    this.setState({
                        visible: false,
                        AppayIDs: [],
                        AppayIDb: [],
                        selectedRowKeys: []
                    }, () => {
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                } else {
                    this.setState({
                        selectedRowKeys: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                    
                }
            })
        } else if (this.state.successBTN == "3") {//批量小二  
            const data = {
                idAndBatchId: this.state.AppayIDs,
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                accountId: this.state.accountId,
                platform: this.state.platform,
                platformCode: this.state.platformCode,
                entityType: this.state.entityType,
                status: this.state.status,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                iprName: this.state.iprName,//知识产权名称
                entityOwnerName: this.state.entityOwnerName,//被投诉方
                batchId: this.state.batchId//投诉单号
            }
            axios({
                method: 'post',
                url: '/hcm/complaint/xiaoer_taobao',
                transformRequest: [function (data, headers) {
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then((res) => {
                if (res.data.status == 10000) {
                    message.success(res.data.data)
                    this.setState({
                        visible: false,
                        AppayIDs: [],
                        AppayIDb: [],
                        selectedRowKeys: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                    
                } else {
                    this.setState({
                        selectedRowKeys: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                    
                }
            })
        } else if (this.state.successBTN == "4") {//  单个小二
            const data = {
                idAndBatchId: this.state.AppayIDb,
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                accountId: this.state.accountId,
                platform: this.state.platform,
                platformCode: this.state.platformCode,
                entityType: this.state.entityType,
                status: this.state.status,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                iprName: this.state.iprName,//知识产权名称
                entityOwnerName: this.state.entityOwnerName,//被投诉方
                batchId: this.state.batchId//投诉单号
            }
            axios({
                method: 'post',
                url: '/hcm/complaint/xiaoer_taobao',
                transformRequest: [function (data, headers) {
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: JSON.stringify(data)
            }).then((res) => {
                if (res.data.status == 10000) {
                    message.success(res.data.data)
                    this.setState({
                        visible: false,
                        AppayIDs: [],
                        AppayIDb: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                    })
                    
                }else{
                    this.setState({
                        visible: false,
                        AppayIDs: [],
                        AppayIDb: []
                    },()=>{
                        this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

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
                TITBoy: "您共需要批量操作" + this.state.AppayIDs.length + "条"
            })
        } else {
            message.error("请勾选需要批量操作的目标！")
        }


    }
    XIAOtwo = () => {//批量小二
        if (this.state.AppayIDs != "") {
            this.setState({
                visible: true,
                successBTN: "3",
                TITBoy: "您共需要批量操作" + this.state.AppayIDs.length + "条"
            })
        } else {
            message.error("请勾选需要批量操作的目标！")
        }


    }
    link_taobao = (pageNo, pageSize, accountId, platform, platformCode, entityType, status, start_time, end_time, iprName, entityOwnerName, batchId) => {
        LoadingModal({bl:true})
        this.setState({
            num:"",  
            totalNum: 0,
            link_taobao: [],
            totalNum: 0,
            selectedRowKeys: []
        },()=>{
            ajax.post('/hcm/complaint/link_taobao', {
                pageNo: pageNo,
                pageSize: pageSize,
                accountId: accountId,
                platform: platform,
                platformCode: platformCode,
                entityType: entityType,
                status: status,
                start_time: start_time,
                end_time: end_time,
                iprName: iprName,//知识产权名称
                entityOwnerName: entityOwnerName,//被投诉方
                batchId: batchId//投诉单号
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.status == 10000) {
                        if (res.data.data != null || res.data.data.content != null) {
                            this.setState({
                                link_taobao: res.data.data.content,
                                totalNum: res.data.data.totalElements,
                                loading: false,
                                selectedRowKeys: []
                            })
                            LoadingModal({bl:false})
                            this.linknum_taobao()
                        } else {
                            this.setState({
                                link_taobao: [],
                                totalNum: 0,
                                pageSize: 10,
                                pageNo: 1,
                                loading: false,
                                selectedRowKeys: []
                            })
                            LoadingModal({bl:false})
                            message.error(res.data.message)
                        }
    
                    } else if (res.data.status == 10001) {
                        this.setState({
                            link_taobao: res.data.data.content,
                            totalNum: res.data.data.totalElements,
                            loading: false,
                            selectedRowKeys: []
                        })
                        LoadingModal({bl:false})
                        this.linknum_taobao()
                        message.success(res.data.message)
                    } else {
                        this.setState({
                            link_taobao: [],
                            pageSize: 10,
                            pageNo: 1,
                            totalNum: 0,
                            loading: false,
                            selectedRowKeys: []
                        })
                        LoadingModal({bl:false})
                        message.error(res.data.message)
                    }
                }).catch((error) => {
                    message.error(error.statusText);
                    this.setState({
                        link_taobao: [],
                        pageSize: 10,
                        pageNo: 1,
                        totalNum: 0,
                        loading: false,
                        selectedRowKeys: []
                    })
                    LoadingModal({bl:false})
                });
        })
       
    }
    onChange = (date, dateString) => {//投诉时间
        console.log(date, dateString)
        if (date != "" && date != [] && date != undefined) {
            this.setState({
                start_time: dateString[0] + " 00:00:00",
                end_time: dateString[1] + " 23:59:59",
                selectedRowKeys: [],
                loading:true
            }, () => {
                this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

            })
        } else {
            this.setState({
                start_time: this.GetDateStr(-90),
                end_time: this.GetDateStr(0),
                selectedRowKeys: [], 
                loading:true
            }, () => {
                this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

            })

        }

    }
    ForgetSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.setState({
                    pageNo: 1,
                    pageSize: 10,
                    totalNum: 0,
                    linknum_taobao: [],
                    batchId: values.productbrandName,
                    iprName: values.productName,//知识产权名称
                    entityOwnerName: values.brandName,//被投诉方,
                    loading:true
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })


            }
        })
    }
    handleButton = (e) => {//状态
        //console.log(e)
        this.setState({
            status: e.target.getAttribute("value"),
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            selectedRowKeys: [],
            loading:true
        }, () => {
            if (this.state.status == "") {
                const a = this.state.num ? this.state.num : "0"
                this.setState({
                    totalNum: a,
                    typeDA: ""
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "submitted") {
                const a = this.state.linknum_taobao.submitted ? this.state.linknum_taobao.submitted : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "submitted"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "auditNoPass") {
                const a = this.state.linknum_taobao.auditNoPass ? this.state.linknum_taobao.auditNoPass : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "auditNoPass"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "auditPass") {
                const a = this.state.linknum_taobao.auditPass ? this.state.linknum_taobao.auditPass : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "auditPass"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "appeal") {
                const a = this.state.linknum_taobao.appeal ? this.state.linknum_taobao.appeal : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "appeal"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "involved") {
                const a = this.state.linknum_taobao.involved ? this.state.linknum_taobao.involved : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "involved"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "withdrawal") {
                const a = this.state.linknum_taobao.withdrawal ? this.state.linknum_taobao.withdrawal : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "withdrawal"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "appealPass") {
                const a = this.state.linknum_taobao.appealPass ? this.state.linknum_taobao.appealPass : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "appealPass"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "appealNoPass") {
                const a = this.state.linknum_taobao.appealNoPass ? this.state.linknum_taobao.appealNoPass : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "appealNoPass"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            } else if (this.state.status == "invalid") {
                const a = this.state.linknum_taobao.invalid ? this.state.linknum_taobao.invalid : "0"
                this.setState({

                    totalNum: a,
                    typeDA: "invalid"
                }, () => {
                    this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

                })
            }


        })

    }
    
    handleChangex = (value) => {//投诉账号
        this.setState({
            accountId: value,
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            num: 0,
            loading: true,
            selectedRowKeys: [],
            status: "",
            typeDA: ""
        }, () => {
            this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

        })

    }
    handleChange = (value) => {//平台
        this.setState({
            platformCode: value,
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            num:"",
            selectedRowKeys: [],
            loading:true
        })
        if (value == "taobao") {
            this.setState({
                platform: "淘宝"
            }, () => {
                this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

            })
        } else if (value == "tmall") {
            this.setState({
                platform: "天猫"
            }, () => {
                this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

            })
        } else if (value == "tmallhk") {
            this.setState({
                platform: "天猫国际"
            }, () => {
                this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

            })
        }

    }
    handleChanges = (value) => {//投诉链接类型
        this.setState({
            entityType: value,
            selectedRowKeys: [],
            num:"",
            loading:true
        }, () => {
            this.link_taobao(this.state.pageNo, this.state.pageSize, this.state.accountId, this.state.platform, this.state.platformCode, value, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

        })
    }
    onSelectChange = (selectedRowKeys, appay) => {//全选

        const AppayID = []
        appay.forEach((v, l) => {
            console.log(v, l)
            AppayID.push(v.id + "#" + v.batch_id)
        })
        this.setState({
            selectedRowKeys,
            AppayIDs: AppayID
        }, () => {
            console.log(this.state.AppayIDs)
        });

    }
    changePagination = (current, pageSize) => {
        
        console.log(current, pageSize)
        this.setState({
            pageNo: current,
            selectedRowKeys: [],
            loading:true
        }, () => {
            this.link_taobao(current, pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

        })

    }
    onPaginationSize = (current, pageSize) => {
        console.log(current, pageSize)
        this.setState({
            pageSize: pageSize,
            selectedRowKeys: [],
            loading:true
        }, () => {
            this.link_taobao(current, pageSize, this.state.accountId, this.state.platform, this.state.platformCode, this.state.entityType, this.state.status, this.state.start_time, this.state.end_time, this.state.iprName, this.state.entityOwnerName, this.state.batchId)

        })

    }
    handleTableChange = (current, pageSize) => {
        console.log(current, pageSize)
    }
    handleClearIconClick = (resetField) => { 
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields(resetField)
        if(resetField=="productName"){
            this.setState({
                iprName: " "//知识产权名称
            })
           // console.log("1")
        }else if(resetField=="brandName"){
            this.setState({
                entityOwnerName: " "//被投诉方
            })
           // console.log("2")
        }else{
            this.setState({
                batchId: " "//投诉单号
            })
           // console.log("3")
        }
    
    }
    
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(TaobaoInquiries);
