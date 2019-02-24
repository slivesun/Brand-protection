import Tpl from './tpl';
import {message} from 'antd';
import ajax from '../../../../js/common/ajax';
import echarts from 'echarts';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:{
                customereSum:0,
                dataSum:0,
                dealerSum:0,
                itemListSum:0,
                brandSum:0,
                linkDataSum:0,
                shopSum:0,
                productSum:0,
                customereProportion:[ 
                    {value:0, name:'品牌方'}
                ],
                dealerProportion:[ 
                    {value:0, name:'经销商'}
                ],
            }
        }
    }
    
    componentDidMount() {
        this.getList();
        
    }
    
    getList(){
        ajax.get('/hcm/Index/adminIndex')
        .then((response) => {
            
            if (response.data.status == '10000') {
                this.setState({
                    dataList:response.data.data
                },()=>{
                    this.myChart()
                    this.myChart2()
                })
            }else{
                message.error(response.data.message);
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    myChart= ()=>{
        let customereProportion = this.state.dataList.customereProportion;
        const myChart = echarts.init(document.getElementById('echarts'));
        let totnum = 0;
        if(customereProportion.length){
            totnum = customereProportion.map(item=>item.value).reduce((total,currentValue, index,arr)=>{
                return total+currentValue 
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
                top:'center',
                itemGap:20,
                data:customereProportion.map(item=>item.name)
            },
            
            series: [
                {
                    name:'品牌方',
                    type:'pie',
                    radius: ['0%', '30%'],
                    center: ['38%', '50%'],
                    color:['#fff'],
                    silent:true,
                    label: {
                        position:'center',
                        formatter:'{c| {c}}\n{a|{a}}',
                        color:'#333',
                        fontSize:20,
                        rich: {
                            a:{
                                fontSize:14,
                                color:'#999',
                                align:'center'
                            },
                            c:{
                                color: '#333',
                                fontSize:20,
                                padding:10,
                                align:'center'
                            }
                        }
                    },
                    data:[
                        {value:totnum, name:''}
                    ]
                },
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['38%', '50%'],
                    avoidLabelOverlap: true,
                    color:['#55a0f8','#66c8ca','#72c77c','#f4d358','#e17c7d','#8e66dd'],
                    data:customereProportion
                }
            ]
        })
        
    }
    myChart2= ()=>{
        let dealerProportion = this.state.dataList.dealerProportion;
        const myChart = echarts.init(document.getElementById('echarts2'));
        let totnum = 0;
        if(dealerProportion.length){
            totnum = dealerProportion.map(item=>item.value).reduce((total,currentValue, index,arr)=>{
                return total+currentValue 
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
                top:'center',
                itemGap:20,
                data:dealerProportion.map(item=>item.name)
            },
            
            series: [
                {
                    name:'经销商',
                    type:'pie',
                    radius: ['0%', '30%'],
                    center: ['38%', '50%'],
                    color:['#fff'],
                    silent:true,
                    label: {
                        position:'center',
                        formatter:'{c| {c}}\n{a|{a}}',
                        color:'#333',
                        fontSize:20,
                        rich: {
                            a:{
                                fontSize:14,
                                color:'#999',
                                align:'center'
                            },
                            c:{
                                color: '#333',
                                fontSize:20,
                                padding:10,
                                align:'center'
                            }
                        }
                    },
                    data:[
                        {value:totnum, name:''}
                    ]
                },
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['38%', '50%'],
                    avoidLabelOverlap: true,
                    color:['#55a0f8','#66c8ca','#72c77c','#f4d358','#e17c7d','#8e66dd'],
                    data:dealerProportion
                }
            ]
        })
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
