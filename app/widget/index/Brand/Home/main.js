import Tpl from './tpl';
import { message, Button, notification } from 'antd';
import ajax from '../../../../js/common/ajax';
import echarts from 'echarts';
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expire: moment(),
            dataList: {
                campaign_examine_apply: '-',
                campaign_inspect_num: '-',
                dealer_uninvited_num: '-',
                dealer_applying_num: '-',
                dealer_apporved_num: '-',
                dealer_shop_num: '-',
                monitor_itemlist_num: '-',
                monitor_link_num_w_count: '-',
                monitor_link_num_all_count: '-',
                monitor_itemlist_date: '-',
                monitorLink_date_time: '-',
                shopGroupData: [{ name: "暂无数据", value: 0 }]
            }
        }
    }
    componentDidMount() {
        // LoadingModal({bl:true,text:'加载中...'})
        this.getList()
    }
    componentWillUnmount() {
        notification.close('date')
    }
    getList() {
        ajax.get('/hcm/Index/bmaincustomerIndex')
            .then((response) => {
                if (response.data.status == '10000') {
                    this.setState({
                        dataList: response.data.data,
                        expire: moment(response.data.data.bmaincustomer_validtime),
                    }, () => {
                        this.myChart();
                        const { expire } = this.state;
                        let exDay = Math.ceil((expire.format('X') - moment().format('X')) / 60 / 60 / 24)+1;
                        const close = () => {
                            notification.close('date')
                            sessionStorage.setItem('exdate',true)
                        }
                        const args = {
                            message: '账号即将到期提醒',
                            description: `你的账号有效期至 ${expire.format('YYYY年MM月DD日')} ，使用期限仅剩 ${exDay}天，过期后账号将不能使用，请及时联系管理员续期`,
                            duration: 0,
                            key: 'date',
                            btn: <Button onClick={close}>我知道了</Button>,
                            onClose: close
                        };
                        notification.config({
                            top: 60
                        });
                        if (exDay <= 30&&!sessionStorage.getItem('exdate')) {
                            notification.warning(args);
                        }
                    })
                } else {
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    myChart = () => {
        let shopGroupData = this.state.dataList.shopGroupData;
        const myChart = echarts.init(document.getElementById('echarts'));
        let totnum = 0;
        if (shopGroupData.length) {
            totnum = shopGroupData.map(item => item.value).reduce((total, currentValue, index, arr) => {
                return total + currentValue
            })
        }

        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '30',
                top: 'center',
                itemGap: 20,
                data: shopGroupData.map(item => item.name)
            },

            series: [
                {
                    name: '店铺总数量',
                    type: 'pie',
                    radius: ['0%', '30%'],
                    center: ['38%', '50%'],
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
                    radius: ['50%', '70%'],
                    center: ['38%', '50%'],
                    avoidLabelOverlap: true,
                    color: ['#55a0f8', '#66c8ca', '#72c77c', '#f4d358', '#e17c7d', '#8e66dd'],
                    data: shopGroupData
                }
            ]
        })

    }


    render() {
        return <Tpl that={this} />
    }
}
export default App;
