import Tpl from './tpl';
import { message } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            dataList: [],
            NeedRecheckSum: "",//客服查询需复查客户数量
            RecheckSum: "",//客服查询待复查活动数
            reptileRecheckCustomSum: "",//爬虫待设置客户数量
            priceMonitorCustomSum: "",//查询客服售价监控待设置客户数量
            priceMonitorProductSum: ""//查询客服售价监控待设置产品数量
        }
    }
    componentDidMount() {
        ajax.post('/hcm/Index/kefuIndex')
            .then((res) => {
                if (res.data.status == 10000) {
                    this.setState({
                        NeedRecheckSum: res.data.data.NeedRecheckSum,//客服查询需复查客户数量
                        RecheckSum: res.data.data.RecheckSum,//客服查询待复查活动数
                        reptileRecheckCustomSum: res.data.data.reptileRecheckCustomSum,//爬虫待设置客户数量
                        priceMonitorCustomSum: res.data.data.priceMonitorCustomSum,//查询客服售价监控待设置客户数量
                        priceMonitorProductSum: res.data.data.priceMonitorProductSum//查询客服售价监控待设置产品数量
                    })
                }

            })
    }

    HDJCbtn=()=>{
        window.location = "/index.html#/ActivityInspectDetail" 
    }
    SPPCbtn=()=>{
        if(window.localStorage.roleid!="3"){
            window.location.href = "/index.html#/ClientInfo" 
        }else{
            message.error("普通客服")
        }
        
    }
    SJJKbtn=()=>{
        window.location = "/index.html#/ProductClass" 
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
