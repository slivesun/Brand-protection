import ajax from '../../../../js/common/ajax';
import echarts from 'echarts';
import {Icon } from 'antd';
let myChart = null;
class App extends React.Component {
    constructor(props) {
        // document.title = '客户总览';
        super(props)
        this.state = {
            data: this.props.data,
            scale: 1,
            clientHeight: 0,
            clientWidth: 0
        }
    }

    componentDidMount() {
        let that = this;
        let customerOverview = $(".CustomerOverview")[0];
        $('.scale-box').css({
            height: customerOverview.clientHeight + 'px',
            width: customerOverview.clientWidth + 'px'
        })
        $('#container').css({
            height: customerOverview.clientHeight + 'px',
            width: customerOverview.clientWidth + 'px'
        })
        this.setState({
            clientHeight: customerOverview.clientHeight,
            clientWidth: customerOverview.clientWidth
        })
        this.inChart()
    }
    onScale = (bl) => {
        let scale = this.state.scale;
        let { clientHeight, clientWidth } = this.state;
        if (bl) {
            this.setState({
                scale: scale >= 2 ? 2 : scale + 0.1
            }, () => {
                $('#container').css({
                    height: Math.floor(clientHeight * (this.state.scale < 1 ? 1 : this.state.scale)) + 'px',
                    width: Math.floor(clientWidth * this.state.scale) + 'px'
                })
                myChart.resize()
            })

        } else {
            this.setState({
                scale: scale <= 0.2 ? 0.2 : scale - 0.1
            }, () => {
                $('#container').css({
                    height: clientHeight + 'px',
                    width: Math.floor(clientWidth * this.state.scale) + 'px'
                })
                myChart.resize()
            })
        }


    }
    inChart = (value='') => {
        let {data} = this.state;
        let bl = false;
        myChart = echarts.init(document.getElementById("container"))
        myChart.showLoading();

        myChart.hideLoading();
        
        function recursive(data){
            echarts.util.each(data, function (datum, index) {
                datum.collapsed = true;
                delete datum.label
                if(value.length){
                    
                    if(datum.children&&datum.children.length){
                        bl = false;
                        if(recursiveColor(datum.children,value)){
                            datum.collapsed = false;
                            console.log(datum.children)
                        }else{
                            datum.collapsed = true;
                        }
                    }
                    if(datum.name.toUpperCase().indexOf(value)!=-1){
                        console.log(datum.name)
                        datum.label = {
                            'color':'red'
                        }
                    }
                    if(datum.children&&datum.children.length){
                        recursive(datum.children)
                    }

                }else{
                    datum.collapsed = true;
                }
            });
        }
        
        function recursiveColor(data,value){
            if(value){
                for(let i = 0 ; i< data.length; i++){
                    if(data[i].name.toUpperCase().indexOf(value)!=-1 ){
                        bl = true;
                        break;
                    }
                    if(data[i].children&&data[i].children.length){
                        recursiveColor(data[i].children,value)
                    }
                }
            }
            return bl
        }
        
        recursive(data.children)
        
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                formatter: function (params) {
                    let { name, value } = params.data
                    return `<div>
                        Name:${name}
                        ${value ? `<p>Value:${value}</p>` : ''}
                    </div>`
                }
            },
            series: [
                {
                    type: 'tree',
                    data: [data],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    // width:'1000px',
                    // height:'1000px',

                    symbolSize: [40, 20],
                    symbol: 'rect',
                    lineStyle: {
                        curveness: 0.8
                    },
                    itemStyle: {
                        borderWidth: 10,
                        borderColor: 'none'
                    },
                    label: {
                        formatter: function (params) {
                            return `${params.data.name} ${params.data.children ? '>' : ''}`
                        },
                        position: 'inside',
                        color: '#fff',
                        backgroundColor: '#000',
                        borderRadius: 2,
                        padding: [5, 20],

                    },
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });
        
    }
    render = ()=>{
        let {scale} = this.state;
        return(
            <div className='scale-box'>
            <div id="container">

            </div>
            <div className='bs-box'>
                <Icon onClick={() => this.onScale(false)} type="minus-circle" />
                {Math.round(scale * 100)}%
                <Icon onClick={() => this.onScale(true)} type="plus-circle" />
            </div>
        </div>
        )
    }
}
export default App