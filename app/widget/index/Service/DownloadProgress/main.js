import Tpl from './tpl';
import { message,Progress, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class DownloadProgress extends React.Component {
    constructor(props) {
        super(props)
        const columns = [{
            title: '序号',
            render: (content, record, index) => (
                <span key={index}>
                    {index+1}
                </span>
            )
        }, {
            title: '旺旺名称',
            render: (content, record, index) => (
                <span key={index}>
                {record.shop_nick}
                </span>
            )
        }, {
            title: '进度',
            render: (content, record, index) => (
                <span key={index} style={{display: "inline-block",width:"100%"}}>
                    {
                        record.status=="已完成" ?  <span  style={{display: "inline-block",width:"100%"}}><b>{record.status}</b><b style={{float:"right"}}><a href={`/hcm/search/redownLoad_search?filePath=${record.down_url}`}>立即下载</a></b></span> : 
                        record.status=="进行中" || record.status=="开始下载" ?  <Progress percent={parseInt(record.current_page/record.total_page*100)} size="small" /> : 
                        record.status=="失败" ? <Progress percent={record.current_page/record.total_page*100} size="small" status="exception" /> : null 
                    }
                    
                </span>
            )
        }, {
            title: '下载时间',
            render: (content, record, index) => (
                <span key={index}>
                    {moment(record.start_time).format('YYYY-MM-DD HH:mm:ss')}
                </span>
            )
        }, {
            title: '下载预计完成时间',
            render: (content, record, index) => (
                <span key={index}>
                    {moment(record.end_time).format('YYYY-MM-DD HH:mm:ss')}
                </span>
            )
        }]
        this.state = {
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            loading: false,
            data: [],
            ProductInformation_list: columns,
            storeName:"",
            titButton:""
        }

    }

    componentDidMount() {
        this.DownloadProgress(this.state.pageNo,this.state.pageSize)
        
    }
    downLoads=()=>{
        this.setState({          
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            data: []
        },()=>{
            this.DownloadProgress(this.state.pageNo,this.state.pageSize)
        })
        
    }
    DownloadProgress=(pageNum,pageSize)=>{
        LoadingModal({bl:true})
        ajax.post("/hcm/search/downLoadRecord_list", {
            pageNo:pageNum,
            pageSize:pageSize
        }).then((res) => {
            if (res.data.status == 10000) {
                if(res.data.data.content!="" && res.data.data.content!=null){
                    
                        this.setState({
                            data:res.data.data.content                    ,
                            totalNum:res.data.data.totalElements,
                            pageSize:res.data.data.pageSize,
                            pageNo:res.data.data.pageNumber,
                            loading: false
                        })
                        LoadingModal({bl:false})
                   
                }else{
                    this.setState({
                        loading: false,
                        data:[]
                    })
                    LoadingModal({bl:false})
                
                     
                }
            }else{
                this.setState({
                    loading: false
                })
                LoadingModal({bl:false})
            }
                
        }).catch((error) => {
            message.error(error.statusText);
            this.setState({
              loading: false,
              data:[]
            })
            LoadingModal({bl:false})
        })
    
    }

    changePagination = (a,b) => {
       
        this.setState({
            loading: true,
            pageSize: b,
            pageNo: a,
            titButton:""
        },()=>{
            this.DownloadProgress(this.state.pageNo,this.state.pageSize)
        })
    }
    onPaginationSize = (a,b) => {
        this.setState({
            loading: true,
            pageSize: b,
            pageNo: a,
            titButton:""
        },()=>{
            this.DownloadProgress(this.state.pageNo,this.state.pageSize)
        })
        
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(DownloadProgress);
