import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class StoreSearch extends React.Component {
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
            title: '商品信息',
            render: (content, record, index) => (
                <span key={index}>
                    <img style={{width:"50px",float: "left",height:"60px",marginTop:"10px"}} src={record.mainPicUrl} alt=""/>
                    <p style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px"}}>{record.itemTitle}</p>
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                   {record.priceShow.unit} {record.priceShow.price}
                </span>
            )
        }, {
            title: '30天销量',
            render: (content, record, index) => (
                <span key={index}>
                    {record.totalSoldQuantity}
                </span>
            )
        }, {
            title: '优惠活动',
            render: (content, record, index) => (
                <span key={index}>
                    
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
        // this.setState({
        //     loading: true
        // },()=>{
        //     this.store_search(this.state.storeName,this.state.pageNo,this.state.pageSize)
        // })
        
    }
    downLoad=()=>{
        LoadingModal({bl:true})
        ajax.post("/hcm/search/downLoad_search", {
            storeName:this.state.storeName
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                message.success(res.data.data)
                LoadingModal({bl:false})
              //  window.location.href="/hcm/search/downLoad_search?storeName="+this.state.storeName
            }else{
                message.error(res.data.data)
                LoadingModal({bl:false})
            }
        }).catch((error) => {
            message.error(error.statusText);
          
            LoadingModal({bl:false})
        })
    
    }
    store_search=(storeName,pageNum,pageSize)=>{
        LoadingModal({bl:true})
        ajax.post("/hcm/search/store_search", {
            storeName:storeName,
            pageNum:pageNum,
            pageSize:pageSize
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                if(res.data.data.content!="" && res.data.data.content!=null){
                  
                    this.setState({
                        data:res.data.data.content                    ,
                        totalNum:res.data.data.totalElements,
                        pageSize:res.data.data.pageSize,
                        pageNo:res.data.data.pageNumber,
                        loading: false
                    })
                   
                }else{
                    this.setState({
                                loading: false,
                                data:[]
                            })
                            
                    message.success(res.data.data) 
                }
                LoadingModal({bl:false})
            }else{
                this.setState({
                    loading: false,
                    data:[]
                })
                message.error(res.data.message) 
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
    ForgetSubmit=(e)=>{
        e.preventDefault();
        this.setState({
            loading: true,
            titButton:"",
            pageSize: 10,
            pageNo: 1,
            totalNum: 0
        },()=>{
            this.props.form.validateFields((err, values) => {
                if(!err){
                    this.setState({
                        storeName:values.DPandWW_name
                    },()=>{
                        this.store_search(this.state.storeName,this.state.pageNo,this.state.pageSize)
                    })
                    
                    
                }
            })
        })
        
       
    }
    changePagination = (a,b) => {
       
        this.setState({
            loading: true,
            pageSize: b,
            pageNo: a,
            titButton:""
        },()=>{
            this.store_search(this.state.storeName,this.state.pageNo,this.state.pageSize)
        })
    }
    onPaginationSize = (a,b) => {
        this.setState({
            loading: true,
            pageSize: b,
            pageNo: a,
            titButton:""
        },()=>{
            this.store_search(this.state.storeName,this.state.pageNo,this.state.pageSize)
        })
        
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(StoreSearch);
