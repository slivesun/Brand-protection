import Tpl from './tpl';
import ajax from '../../../js/common/ajax'
import { Form } from 'antd';

class ChangeHistory extends React.Component {
    constructor(props) {
        // document.title = '变更历史';
        super(props)

        this.state = {
            ChangeHistory_list: "",
            onLoading:10,
            ChangeHistory:"",
            TwoTitle:"",
            paths:"",
            TWOtit:"",
            typeos:""
        }
        

    }
    componentDidMount() {
        this.DidMountText()
        this.setState({
            typeos:this.props.match.params.tit
        })
    }
    onLoading=()=>{
       // this.DidMountText()
        this.setState({
            onLoading:this.state.onLoading+10
        },()=>{
            this.DidMountText()
        })
       
    }

    onChange = (date, dateString) => {
       // console.log(this.props);
        
        if(this.props.match.params.type=="TYpe"){
            ajax.post('/hcm/hcmChangeHistory/getList', {
                pageSize: this.state.onLoading,
                pageNum: 1,
                begintime: dateString[0]+" 00:00:00",
                endtime: dateString[1]+" 23:59:59",
                modulename:this.props.match.params.tit,
                objectid:this.props.match.params.FJId,
                classifyid:this.props.match.params.FJId
            })
            .then((res) => {
              //  console.log(res)
              //  this.DidMountText()
                if(res.data.status==10000){
                    this.setState({
                        ChangeHistory_list:res.data.data
                    })
                   // this.DidMountText()
                }
            })
        }else{
            ajax.post('/hcm/hcmChangeHistory/getList', {
                pageSize: this.state.onLoading,
                pageNum: 1,
                begintime: dateString[0]+" 00:00:00",
                endtime: dateString[1]+" 23:59:59",
                modulename:this.props.match.params.tit,
                objectid:this.props.match.params.id,
                classifyid:this.props.match.params.FJId
            })
            .then((res) => {
              //  console.log(res)
              //  this.DidMountText()
                if(res.data.status==10000){
                    this.setState({
                        ChangeHistory_list:res.data.data
                    })
                   // this.DidMountText()
                }
            })
        }
        
    }
    HistoryGo=()=>{
        window.history.go(-1)
    }
    DidMountText = () => {
        //console.log(this.props.match.params.type)
       let d = new Date();
       let Time= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      // let Times= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate()-90) + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
       this.setState({
           paths: + this.props.match.params.id,
           TWOtit:this.props.match.params.twotit
       })
        //console.log(Times)
       // console.log( moment(Date.now() - 2160 * 60 * 60 * 1000))
     //  console.log( moment(Date.now(), "YYYY-MM-DD"))
            if(this.props.match.params.type=="TYpe"){
                ajax.post('/hcm/hcmChangeHistory/getList', {
                    pageSize: this.state.onLoading,
                    pageNum: 1,
                    begintime: moment(moment(Date.now() - 2160 * 60 * 60 * 1000)._i).format('YYYY-MM-DD HH:mm:ss'),
                    endtime: Time,
                    objectid:this.props.match.params.FJId,
                    itemid:this.props.match.params.id,
                    modulename:this.props.match.params.tit,
                    classifyid:this.props.match.params.FJId
                })
                    .then((res) => {
                       // console.log(res) 
                        if(res.data.status==10000){
                            this.setState({
                                ChangeHistory_list:res.data.data
                            })
                        }
                    })
            }else if(this.props.match.params.plp=="Sjsj"){
                ajax.post('/hcm/hcmChangeHistory/getList', {
                    pageSize: this.state.onLoading,
                    pageNum: 1,
                    begintime: moment(moment(Date.now() - 2160 * 60 * 60 * 1000)._i).format('YYYY-MM-DD HH:mm:ss'),
                    endtime: Time,
                    objectid:this.props.match.params.id,
                    modulename:this.props.match.params.tit,
                    classifyid:this.props.match.params.FJId
                })
                    .then((res) => {
                 //       console.log(res) 
                        if(res.data.status==10000){
                            this.setState({
                                ChangeHistory_list:res.data.data
                            })
                        }
                    })
            }else{
                ajax.post('/hcm/hcmChangeHistory/getList', {
                    pageSize: this.state.onLoading,
                    pageNum: 1,
                    begintime: moment(moment(Date.now() - 2160 * 60 * 60 * 1000)._i).format('YYYY-MM-DD HH:mm:ss'),
                    endtime: Time,
                    objectid:this.props.match.params.id,
                    modulename:this.props.match.params.tit,
                    classifyid:this.props.match.params.FJId
                })
                    .then((res) => {
                    //    console.log(res) 
                        if(res.data.status==10000){
                            this.setState({
                                ChangeHistory_list:res.data.data
                            })
                        }
                    })
            }

    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(ChangeHistory)