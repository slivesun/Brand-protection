import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, message } from 'antd';

class MessageCenter extends React.Component {
    constructor(props) {
        // document.title = '消息中心';
        super(props)
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            width: "10%",
            render: (text, item, index) => index + 1
        }, {
            title: '标题',
            dataIndex: 'topic',
            render: (content, record, index) => (
                <span key={index}>
                    {
                        record.isread == 0
                            ?
                            <a className="WEIDU" onClick={this.MessageCenters.bind(this, content, record, index)}>{record.topic}</a>
                            : <span className="YIDU" onClick={this.MessageCenters.bind(this, content, record, index)}>{record.topic}</span>

                    }
                </span>
            )
        }, {
            title: '内容',
            width: "30%",
            height:"50px",
            overflow: "hidden",
            dataIndex: 'content',
            render: (content, record, index) => ( 
                <span key={index}>
                {
                    record.messagetype=="JGGSXXBG"  ?
                    <span>
                            所属客户：{JSON.parse(record.content).change_people},
                            所属分类：{
                                JSON.parse(record.content).obj.map((item,i)=>{
                                    return <span key={i}>{item.classify}</span>
                                })
                            }
                    </span>:record.messagetype=="HDSQYSH" ?
                    <span>
                            活动主题：{JSON.parse(record.content).campaign_name},店铺名称：{JSON.parse(record.content).shop_name}
                    </span>:record.messagetype=="HDJCBHG" ?
                    <span>
                            活动主题：{JSON.parse(record.content).campaign_name},店铺名称：{JSON.parse(record.content).shop_name}
                    </span>:record.messagetype=="TZGG" ?
                    <span>
                            公告主题：{JSON.parse(record.content).notice_title}
                    </span>:record.messagetype=="SJGSXXBG" ?
                    <span>
                        所属客户：{JSON.parse(record.content).change_people},
                            所属分类：{
                                JSON.parse(record.content).obj.map((item,i)=>{
                                    return <span key={i}>{item.classify}</span>
                                })
                            }
                    </span>:record.messagetype=="HDDSH" ?
                    <span>
                        活动主题：{JSON.parse(record.content).campaign_name},店铺名称：{JSON.parse(record.content).shop_name}
                    </span>:record.messagetype=="KHXXBG" ?
                    <span>
                        客户名称：{JSON.parse(record.content).dealername},变更人：{JSON.parse(record.content).change_user}
                    </span>:record.messagetype=="KHXXDSH" ?
                    <span>
                        客户名称：{JSON.parse(record.content).dealername},公司税号：{JSON.parse(record.content).dutynumber}
                    </span>:record.messagetype=="SPKPCDSZ" ?
                    <span>
                        新客户：{JSON.parse(record.content).companynames}
                    </span>:record.messagetype=="SJJKDSZ" ?
                    <span>
                        所属客户：{JSON.parse(record.content).change_people},
                            所属分类：{
                                JSON.parse(record.content).obj.map((item,i)=>{
                                    return <span key={i}>{item.classify}</span>
                                })
                            }
                    </span>:null
                }
                    

                </span>
            )
        }, {
            title: '时间',
            dataIndex: 'createtime',
            render: (content, record, index) => (
                <span key={index}>
                    {moment(record.createtime).format('YYYY-MM-DD HH:mm:ss')}
                </span>
            )
        }];
        this.state = {
            MessageCenter_list: columns,
            selectedRowKeys: [],
            loading: false,
            loadings: false,
            data: [],
            totalNum: 10,//数量
            pageNo: 1,//页数
            pageSize: 10,
            AppayIDs: []

        }


    }
    componentDidMount() {
        this.DidMountText()
    }
    start = () => {//已读
        if (this.state.AppayIDs.join(",") != "" && this.state.AppayIDs.join(",") != undefined) {
            this.setState({ loading: true });
            //console.log(this.state.AppayIDs.join(","))
            setTimeout(() => {

                ajax.post('/hcm/hcmMessageCenter/Read', {
                    message_id: this.state.AppayIDs.join(",")
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            //console.log(res)
                            this.setState({
                                selectedRowKeys: [],
                                loading: false,
                                AppayIDs:[]
                            });
                            this.DidMountText()
                        }

                    })

            }, 1000);
        } else {
            message.error("请选择要已读的内容")
        }

    }
    startError = () => {
        if (this.state.AppayIDs.join(",") != "" && this.state.AppayIDs.join(",") != undefined) {
            this.setState({ loadings: true });
            setTimeout(() => {

                ajax.post('/hcm/hcmMessageCenter/Delete', {
                    message_id: this.state.AppayIDs.join(",")
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            this.setState({
                                selectedRowKeys: [],
                                loadings: false,
                                AppayIDs:[]
                            });
                            this.DidMountText()
                        }

                    })

            }, 1000);
        } else {
            message.error("请选择要删除的内容")
        }

    }
    onSelectChange = (selectedRowKeys, appay) => {//全选

        const AppayID = []
        appay.forEach((v, l) => {
            //console.log(v,l)
            AppayID.push(v.id)
        })
        this.setState({
            selectedRowKeys,
            AppayIDs: AppayID
        });

    }

    changePagination = (current, pageSize) => {
        ajax.post('/hcm/hcmMessageCenter/Getlist', {
            pageNo: current,
            pageSize: pageSize
        })
            .then((res) => {
                if (res.data.status == 10000) {
                    // console.log(res)
                    this.setState({
                        data: res.data.data.content,
                        totalNum: res.data.data.totalElements,
                        pageNo: current
                    })
                    //console.log(JSON.parse(this.state.data[0].content))
                    //  console.log(this.state.data)
                }

            })
    }
    onPaginationSize = (current, size) => {

        ajax.post('/hcm/hcmMessageCenter/Getlist', {
            pageNo: current,
            pageSize: size
        })
            .then((res) => {
                if (res.data.status == 10000) {
                    console.log(res)
                    this.setState({
                        data: res.data.data.content,
                        pageNo: current,
                        pageSize: size
                    })
                    // console.log(this.state.data)
                }

            })

    }
    HistoryGo = () => {
        window.history.go(-1)
    }
    MessageCenters = (index, record, value) => {
        window.location = "/index.html#/MessageDetails/" + record.id + "/" + record.sys_type + "/" + record.messagetype
        //console.log(index, record, value)
    }


    DidMountText = () => {

        ajax.post('/hcm/hcmMessageCenter/Getlist', {
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        })
            .then((res) => {
                if (res.data.status == 10000) {
                    console.log(res)
                    this.setState({
                        data: res.data.data.content,
                        totalNum: res.data.data.totalElements
                    })
                    // console.log(JSON.parse(this.state.data[4].content).obj[0].classify)
                    // console.log(this.state.data)
                }

            })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(MessageCenter)