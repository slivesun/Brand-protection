import Tpl from './tpl';
import { message } from 'antd';
import echarts from 'echarts';
import ajax from '../../../../js/common/ajax';
class CommodityStore extends React.Component {
    constructor(props) {
        super(props)
        this.refx = React.createRef()
        this.state = {

            shopGroupData: [{
                name: "1",
                value: 123
            }, {
                name: "2",
                value: 456
            }],
            jingPinBrandList: [],
            styleSX: "",
            JingPinPTx: [],
            CardStyle: ""
        }
    }
    componentDidMount() {

        // this.myChart();
        // this.contertier()
        this.JINGPINGList()
    }
    JINGPINGList = () => {
        ajax.post('/hcm/search/jingPinBrandList', {

        })
            .then((res) => {
                console.log(res)
                if (res.data.status == 10000) {
                    if (res.data.data != "" && res.data.data != []) {

                        this.setState({
                            jingPinBrandList: res.data.data,
                            styleSX: res.data.data[0].bid
                        }, () => {
                            this.JingPinPT(this.state.styleSX)
                        })

                    }
                } else {
                    message.error(res.data.message)
                }
            }).catch((error) => {
                message.error(error.statusText);

            })
    }
    JingPinPT = (dataCompare) => {
        ajax.post('/hcm/search/dataCompare', {
            bid: dataCompare,
            type: "jingpin"
        })
            .then((res) => {
                console.log(res)
                if (res.data.status == 10000) {
                    if (res.data.data != "" && res.data.data != []) {

                        this.setState({
                            JingPinPTx: res.data.data,
                            CardStyle:res.data.data[0].platform_code
                        }, () => {
                            console.log(this.state.JingPinPTx[0].platform_name)
                        })

                    }
                } else {
                    message.error(res.data.message)
                }
            }).catch((error) => {
                message.error(error.statusText);

            })
    }
    myChart = () => {
        let shopGroupData = this.state.shopGroupData;
        console.log(shopGroupData)
        var myChart = echarts.init(document.getElementById('echartsxx'));
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
            series: [
                {
                    name: '店铺数量',
                    type: 'pie',
                    radius: ['0%', '30%'],
                    center: ['50%', '50%'],
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
                    center: ['50%', '50%'],
                    color: ['#66c8ca', '#ccc'],
                    data: shopGroupData
                }
            ]
        })

    }
    onChange = (a, b, c) => {
        console.log(a, b, c);
    }
    beforeChange = (a, b, v) => {
        console.log(a, b, v)
    }
    handlePrev = () => {
        this.refx.current.prev()
    }
    handleNext = () => {
        this.refx.current.next()
    }
    JPList = (style) => {

        this.setState({
            styleSX: style,
            JingPinPT: []
        }, () => {
            this.JingPinPT(this.state.styleSX)
        })
    }
    CardStyle = (CardStyle) => {
        this.setState({
            CardStyle
        },()=>{
            console.log(this.state.CardStyle)
        })
    }
    contertier = () => {
        //var dom = document.getElementById("container");
        var myChart = echarts.init(document.getElementById("container"));
        const app = {}
        const option = null;
        app.title = '坐标轴刻度与标签对齐';

        myChart.setOption({
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['我的品牌', '竞品品牌'],
                center: ['38%', '50%'],
                color: "#666",
                fontSize: 14
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '我的品牌',
                    type: 'bar',
                    barWidth: '40%',
                    color: "#108CEE",
                    data: [1, 10, 20, 30, 40, 50, 60]
                },
                {
                    name: '竞品品牌',
                    type: 'bar',
                    barWidth: '40%',
                    color: "#4ECB73",
                    data: [70, 80, 90, 100, 90, 80, 70]
                }
            ]
        }, true);

    }
    render() {
        return <Tpl that={this} />
    }
}
export default CommodityStore;
