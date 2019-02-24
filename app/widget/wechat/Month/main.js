import Tpl from './tpl';
import ajax from '../../../js/common/ajax';
import lib from '../../../js/common/lib';
import echarts from 'echarts';
import { message } from 'antd';
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal';
const defData =[
    {value:0, name:'审核中'},
    {value:0, name:'审核不通过'},
    {value:0, name:'待申诉'},
    {value:0, name:'待响应'},
    {value:0, name:'小二介入'},
    {value:0, name:'撤诉'},
    {value:0, name:'申诉成立'},
    {value:0, name:'最终删除'}
]
class Month extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page:0,
            ipr_name:'',
            openid:null,
            ipr_id:'',
            platform: 'taobao',
            statr_date: this.props.match.params.startdate?moment(this.props.match.params.startdate).toDate():moment().subtract(7, 'days').toDate(),
            end_time: this.props.match.params.enddate?moment(this.props.match.params.enddate).toDate():new Date(),
            data:defData,
            tabs: [
                { title: '全部知识产权' }
            ],
            shopList:[]
        };
    }
    
    componentDidMount() {
        this.myChart(0)
        this.getWechatOpenId(()=>{
            this.getTabsList()
            this.getChartList()
            this.getShopList()
        })
    }
    getWechatOpenId = callback => {
        const code = lib.getQueryString('code');
        ajax.post('/hcm/wechat/getGZAccess_token', {
            code:code
        })
        .then(res => {
            if(res.data.openid){
                this.setState({
                    openid:res.data.openid,
                }, () => {
                    callback()
                })
            }else{
                message.error("微信接口调用失败，请关注公众号!并从公众号内进入 ")
            }
            
        }).catch(err => {
            message.error("微信接口调用失败，请稍后再试！")
        })
    }
    getTabsList(){
        ajax.get('/hcm/wechat/report_list', {
            params: {
                type:this.state.platform,
                openid:this.state.openid
            }
        }).then((response) => {
            if(response.data.status=='10000'){
                let dataList = response.data.data;
                this.setState({
                    tabs:[{ title: '全部知识产权' },...dataList.map((item,index)=>Object.assign({title:item.report_name},item))]
                })
            }else{
                message.error(response.data.message);
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }

    getChartList = ()=>{
        let {statr_date,end_time,ipr_name,ipr_id,platform} = this.state;
        ajax.get(`/hcm/wechat/${platform=='1688'?'report_sta_1688':'report_sta'}`, {
            params: {
                ipr_id,
                ipr_name:ipr_name,
                start_time:moment(statr_date).format('YYYY-MM-DD') ,
                end_time:moment(end_time).format('YYYY-MM-DD') ,
                openid:this.state.openid
            }
        }).then((response) => {
            if(response.data.status=='10000'){
                let dataList = response.data.data;
                    this.setState({
                        data:dataList.length ? dataList : defData
                    },()=>{
                        this.myChart(this.state.page)
                    })
               
            }else{
                message.error(response.data.message);
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getShopList = ()=>{
        let {statr_date,end_time,ipr_name,ipr_id,platform} = this.state;
        LoadingModal({bl:true})
        ajax.get(`/hcm/wechat/${platform=='1688'?'report_sort_1688':'report_sort'}`, {
            params: {
                ipr_id,
                ipr_name:ipr_name,
                start_time:moment(statr_date).format('YYYY-MM-DD') ,
                end_time:moment(end_time).format('YYYY-MM-DD') ,
                openid:this.state.openid
            }
        }).then((response) => {
            if(response.data.status=='10000'){
                let dataList = response.data.data;
                if(response.data.status=='10000'){
                    if(response.data.status=='10000'){
                        let dataList = response.data.data;
                        
                        this.setState({
                            shopList:dataList
                        })
                    }else{
                        message.error(response.data.message);
                    }
                }else{
                    message.error(response.data.message);
                }
            }else{
                message.error(response.data.message);
            }
            LoadingModal({bl:false})
        }).catch((error) => {
            message.error(error.statusText);
            LoadingModal({bl:false})
        });
    }

    onTabchange = (index)=>{
        let ipr_name =''
        let ipr_id = ''
        if(index){
            let target = this.state.tabs[index].complaintModelList;
            ipr_name = target.map(i=>i.ipr_name).join(',');
            ipr_id = target.map(i=>i.ipr_id).join(',');
        }else{
            ipr_name = '';
            ipr_id = '';
        }
        
        this.setState({
            page:index,
            ipr_name,
            ipr_id
        },()=>{
            this.getChartList()
            this.getShopList()
        })
    }
    myChart = (i) => {
        let { data } = this.state;
        const myChart = echarts.init(document.getElementsByClassName('echarts')[i]);
        let totnum = 0;

        if (data.length) {
            totnum = data.map(item => item.value).reduce((total, currentValue, index, arr) => {
                return total + currentValue
            })
        }
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                width: '100%',
                orient: 'horizontal',
                right: 'center',
                bottom: '20',
                itemGap: 20,
                data: data.map(item => item.name)
            },

            series: [
                {
                    name: '总提交数',
                    type: 'pie',
                    center: ['50%', '40%'],
                    radius: ['0%', '30%'],
                    color: ['#fff'],
                    silent: true,
                    label: {
                        position: 'center',
                        formatter: '{c| {c}}\n{a|{a}}',
                        color: '#333',
                        fontSize: 20,
                        rich: {
                            a: {
                                fontSize: 14,
                                color: '#999',
                                align: 'center'
                            },
                            c: {
                                color: '#333',
                                fontSize: 20,
                                padding: 10,
                                align: 'center'
                            }
                        }
                    },
                    data: [
                        { value: totnum, name: '' }
                    ]
                },
                {
                    type: 'pie',
                    center: ['50%', '40%'],
                    radius: ['30%', '50%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    avoidLabelOverlap: true,
                    color: ['#55a0f8', '#66c8ca', '#72c77c', '#f4d358', '#e17c7d', '#8e66dd'],
                    data: data
                }
            ]
        })

    }

    onChange = (date, type) => {
        let { statr_date, end_time } = this.state;
        let aDate = moment(date).format('YYYY-MM-DD');
        let astatr_date = moment(statr_date).format('YYYY-MM-DD');
        let aend_time = moment(end_time).format('YYYY-MM-DD');
        if (type == 'statr_date') {
            if (moment(aDate).isAfter(aend_time)) {
                message.warning('开始时间不能大于结束时间')
                return
            }
        } else if (type == 'end_time') {
            if (moment(aDate).isBefore(astatr_date)) {
                message.warning('结束时间不能小于开始时间')
                return
            }
        }
        this.setState({
            [type]: date,
        },()=>{
            this.getChartList()
            this.getShopList()
        });
    }
    onDismiss = () => {
        console.log('onDismiss');
    }

    show = () => {
        console.log('my click');
    }
    onActive = (platform) => {
        this.setState({
            platform,
            page:0,
            ipr_name:'',
            ipr_id:'',
        },()=>{
            this.getTabsList()
            this.getChartList()
            this.getShopList()
        })
    }
    render() {
        return <Tpl that={this} />
    }
}

export default Month