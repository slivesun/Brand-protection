import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class TaoBaocomplaints extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            HistoryFile_taobao: [],
            batch_id: "",
            id: "",
            accountId: "",
            null:""
        }

    }
    reurl=() =>{
          

       var url = location.href; 
    
        var times = url.split("?"); 
    
        if (times[1] != 1) { 
    
            url += "?1"; 
            
            
            window.location.replace(url)
        }
        
    }
  
    componentDidMount() {

        this.HistoryFile_taobao()
        this.setState({
            batch_id: this.props.match.params.batch_id,
            ID: this.props.match.params.IDx,
            accountId: this.props.match.params.accountId
        })
       // window.location.href=="/index.html?#/TaoBaocomplaints/"+this.props.match.params.accountId+"/"+this.props.match.params.id+"/"+this.props.match.params.batch_id+"/"+this.props.match.params.id
        //window.location.reload()
         //window.setInterval(this.reurl(), 2000);
        //this.reurl()
        //console.log(this.props.match.params)
        
    }
    handleImageErrored=()=>{
        this.setState({
            null:"加载失败"
        })
    }
    handleImageLoaded=()=>{
        this.setState({
            null:"加载成功"
        })
    }
    HistoryFile_taobao = () => {
        ajax.post('/hcm/complaint/HistoryFile_taobao', {
            batchId: this.props.match.params.batch_id,
            id: this.props.match.params.id,
            accountId: this.props.match.params.accountId
        })
            .then((res) => {
                console.log(res)
                if (res.data.status == 10000) {
                    if (res.data.data != null && res.data.data != "" && res.data.data != undefined) {
                       setInterval(this.setState({
                        HistoryFile_taobao: res.data.data
                    }),2000)

                    }
                 } else{
                        message.error(res.data.message)
                    }
                }).catch((error) => {
                    message.error(error.statusText);
                    
                });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(TaoBaocomplaints);
