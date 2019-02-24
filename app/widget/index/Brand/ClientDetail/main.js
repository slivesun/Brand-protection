import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null, //经销商ID
            visible: false, //抽屉显示隐藏
            activeKey: '1', // 当前TAB的KEY
            diyList: [],
            baseInfo: {
                dealername: '--',
                contact: '--',
                dutynumber: '--',
                take_people: '--',
                address: '--',
                creditscore: '--',
                memo_dealername: '--',
                zssj: '--',
                authorize_num: '--',
                authorize_start: null,
                authorize_end: null,
            },//经销商档案数据（抽屉头部+经销商档案）
            authorizedShops: {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                show: 1 //1 正常点击 2 数据完了 3 没有数据
            },//授权店铺数据
            salesData: {
                list: [],
                pageNo: 1,
                pageSize: 1,
                totalNum: 0,
            },//销售数据
            activity: {
                date: [
                    moment().subtract(1, 'months'),
                    moment()
                ],
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            },//活动情况数据
        }
    }

    componentWillMount() {

    }
    componentDidMount() {

    }
    //打开抽屉
    onShow = (id) => {
        console.log(id)
        this.setState({
            visible: true,
            id
        }, () => {
            this.getDealerInfo()
        })
    }
    //关闭抽屉
    onClose = () => {
        this.setState({
            visible: false
        })
    }
    // 获取销售数据
    getMonth = () => {
        const { id } = this.state;
        let { list, pageNo, pageSize, } = this.state.salesData;
        axios.get('/hcm/dayReport/findMonitorDinDanDayReportPageListMonth',{
            params: {
                dealer_id: id,
                pageNo,
                pageSize
            }
        })
        .then(res => {

            const { data, status, message } = res.data;
            let salesData = this.state.salesData;
            salesData.list = data.content;
            salesData.pageNo = data.pageNumber;
            salesData.pageSize = data.pageSize;
            salesData.totalNum = data.totalElements;
            if (status === '10000') {
                this.setState({
                    salesData
                })
            }
        }).catch(err => {
            Msg.error('系统繁忙，请稍后再试！')
        })
    }
    // 获取活动列表
    getActivityList = (params = {}) => {
        const { id, ActivityPagination: { pageNo, pageSize } } = this.state
        axios({
            method: 'post',
            url: '/hcm/dealer/DealerDetail_Campaign',
            data: {
                dealer_id: id,
                pageNo,
                pageSize,
                ...params
            }
        })
    }

    // 获取客户详情信息
    getDealerInfo = () => {
        const { id } = this.state;
        LoadingModal({ bl: true });
        axios({
            method: 'post',
            url: '/hcm/hcmCustomModel/getBybmcidAndModule',
            data: {
                fieldSource: id,
                module: 'DEALER'
            }
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    diyList: data.add.data,
                    activeKey: '1',
                }, () => {
                    axios({
                        method: 'post',
                        url: '/hcm/dealer/update_page',
                        data: {
                            id
                        }
                    }).then(res => {
                        LoadingModal({ bl: false })
                        const { data, status, message } = res.data
                        if (status === '10000') {
                            this.setState({
                                baseInfo: data
                            }, () => {
                                this.getMonth()
                                this.getAuthorizedShops()
                            })
                        }
                    }).catch(err => {
                        LoadingModal({ bl: false })
                        Msg.error('系统繁忙，请稍后再试！')
                    })
                })
            }
        }).catch(err => {
            LoadingModal({ bl: false })
            Msg.error('系统繁忙，请稍后再试！')
        })

    }
    // 获取店铺列表
    getAuthorizedShops = () => {
        const authorizedShops = this.state.authorizedShops;
        const { id } = this.state;
        axios.get('/hcm/dealer/DealerDetail_Authshop', {
            params: {
                dealerid: id,
                pageNo: 1,
                pageSize: authorizedShops.list.length + 10
            }
        })
            .then(res => {
                const { data, status, message } = res.data;
                if (authorizedShops.list.length == data.length || data.length < 10) {
                    authorizedShops.show = 2
                } else {
                    authorizedShops.show = 1
                }
                if (data.length == 0) {
                    authorizedShops.show = 3
                }
                authorizedShops.list = data;
                if (status === '10000') {
                    this.setState({
                        authorizedShops
                    })
                }
            }).catch(err => {
                Msg.error('系统繁忙，请稍后再试！')
            })

    }
    //切换TAB
    onTabsChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    //销售数据分页事件
    onSalesDataPagination = (page, pageSize) => {
        let salesData = this.state.salesData;
        salesData.pageNo = page;
        salesData.pageSize = pageSize;
        this.setState({
            salesData
        },()=>{
            this.getMonth()
        })
    }
    //销售数据分页事件
    onSalesDataPaginationSize = (current, size) => {
        let salesData = this.state.salesData;
        salesData.pageNo = 1;
        salesData.pageSize = size;
        this.setState({
            salesData
        },()=>{
            this.getMonth()
        })
    }
    //活动情况时间框事件
    activityRangePicker = (e) => {
        let activity = this.state.activity;
        activity.date = e;
        this.setState({
            activity
        })
    }
    render() {
        return <Tpl that={this} />
    }
}

export default App