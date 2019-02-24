import Tpl from './tpl';
import { message, Form } from 'antd';
import ajax from '../../../../js/common/ajax';
class PlatformRetrieval extends React.Component {
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
                <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '旺旺名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.nickname}
                    <h4 style={{marginTop:"20px"}}><b className="TBBB">{record.platform}</b></h4>
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.price}
                </span>
            )
        }, {
            title: '30天销量',
            render: (content, record, index) => (
                <span key={index}>
                    {record.salesvolume}
                </span>
            )
        }, {
            title: '优惠活动',
            render: (content, record, index) => (
                <span key={index}>
                    
                </span>
            )
        }, {
            title: '发货地址',
            render: (content, record, index) => (
                <span key={index}>
                    {record.area}
                </span>
            )
        }]
        const JDcolumns = [{
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
                    <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '店铺名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.nickname}
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.price}
                </span>
            )
        }, {
            title: '评价数',
            render: (content, record, index) => (
                <span key={index}>
                    {record.ratenum}
                </span>
            )
        }, {
            title: '优惠信息',
            render: (content, record, index) => (
                <span key={index}>
                    {record.promotions}
                </span>
            )
        }]
        const PDDcolumns= [{
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
                    <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '店铺名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.nickname}
                </span>
            )
        }, {
            title: '拼单价',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.vip_price}
                </span>
            )
        }, {
            title: '已拼件数',
            render: (content, record, index) => (
                <span key={index}>
                    {record.salesvolume}
                </span>
            )
        }, {
            title: '评价数',
            render: (content, record, index) => (
                <span key={index}>
                    {record.ratenum}
                </span>
            )
        }]
        const OneSixcolumns=[{
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
                    <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '公司名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.companyname}
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.secondgearprice}
                </span>
            )
        }, {
            title: '30天成交数',
            render: (content, record, index) => (
                <span key={index}>
                    {record.salesvolume}
                </span>
            )
        }, {
            title: '发货地',
            render: (content, record, index) => (
                <span key={index}>
                    {record.itemarea}
                </span>
            )
        }]
        const WPHcolumns=[{
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
                    <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '店铺名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.nickname}
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.discount_price}
                </span>
            )
        }, {
            title: '原价',
            render: (content, record, index) => (
                <span key={index}>
                    {record.price}
                </span>
            )
        }, {
            title: '折扣率',
            render: (content, record, index) => (
                <span key={index}>
                    {record.discount}
                </span>
            )
        }, {
            title: '优惠信息',
            render: (content, record, index) => (
                <span key={index}>
                    {record.promotions}
                </span>
            )
        }]
        const XYcolumns=[{
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
                    <img style={{width:"50px",float: "left",marginTop:"10px",height: "60px"}} src={record.pic_url} alt=""/>
                    <a  href={record.item_url} target="_blank" style={{width: "150px",float: "left",marginLeft: "10px",overflow: "hidden",lineHeight:"20px",marginTop:"10px",height:"40px"}}>{record.title}</a>
                </span>
            )
        }, {
            title: '旺旺名称',
            render: (content, record, index) => (
                <span key={index}>
                    {record.nickname}
                </span>
            )
        }, {
            title: '价格',
            render: (content, record, index) => (
                <span key={index}>
                    ￥{record.price}
                </span>
            )
        }, {
            title: '所在地',
            render: (content, record, index) => (
                <span key={index}>
                    {record.itemarea}
                </span>
            )
        }]
        this.state = {
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            loading: false,
            data: [],
            styleSX:"淘宝天猫",
            ProductInformation_list: columns,
            JD_list:JDcolumns,
            PDD_list:PDDcolumns,
            OneSix_list:OneSixcolumns,
            WPH_list:WPHcolumns,
            XY_list:XYcolumns,
            title:"",
            type:"taobao",
            TBTM:["taobao"],
            visible:false,
        }

    }

    componentDidMount() {
        this.setState({
            loading:true
        },()=>{
            this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
      
        })
       
    }
    handleOk=()=>{
        this.setState({
            visible:false
        })
    }
    handleCancels=()=>{
        this.setState({
            visible:false
        })
    }
    down_itemlist=()=>{
        ajax.post("/hcm/search/down_itemlist", {
            pageNo:this.state.pageNo,
            pageSize:this.state.pageSize,
            type:this.state.type, //taobao,jd,pdd,tianmao
            title:this.state.title, // 关键字
        }).then((res)=>{
            
            if (res.status == 200) {
                window.location.href="/hcm/search/down_itemlist?type="+this.state.type+"&title="+this.state.title+"&pageSize="+this.state.pageSize+"&pageNo="+this.state.pageNo
            }
                this.setState({
                    visible:true
                })

            
        })
    }
    itemlist=(pageNo,pageSize,type,title)=>{
        LoadingModal({bl:true})
        ajax.post("/hcm/search/itemlist", {
            pageNo:pageNo,
            pageSize:pageSize,
            type:type, //taobao,jd,pdd,tianmao
            title:title, // 关键字
        }).then((res)=>{
            if(res.data.status==10000){
                        console.log(res)
                this.setState({
                    data:res.data.data.content? res.data.data.content: [],
                    pageSize: res.data.data.pageSize,
                    pageNo: res.data.data.pageNumber,
                    totalNum: res.data.data.totalElements,
                    loading:false
                })
                LoadingModal({bl:false})
            }else{
                this.setState({
                
                    loading:false
                })
                LoadingModal({bl:false})
                message.error(res.data.message)
            }
        }).catch((error) => {
            message.error(error.statusText);
            this.setState({
              loading: false,
            })
            LoadingModal({bl:false})
        })
        
    }
    
    onChange=(checkedValues)=>{
        console.log('checked = ', checkedValues);
        this.setState({
            type:checkedValues.join(","),
            loading:true
        },()=>{
            this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
       
        })
       
      }
    ForgetSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    title:values.DPandWW_name,
                    data:[],
                    loading:true
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }
        })
    }
    styleSXbtn=(num)=>{
        this.setState({
            styleSX:num,
            pageSize: 10,
            pageNo: 1,
            totalNum: 0,
            loading: true,
            data: []
        },()=>{
            if(num=="淘宝天猫"){
                this.setState({
                    type:"taobao"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="1688网"){
                this.setState({
                    type:"1688"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="闲鱼"){
                this.setState({
                    type:"xianyu"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="拼多多"){
                this.setState({
                    type:"pdd"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="京东商城"){
                this.setState({
                    type:"jd"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="苏宁易购"){
                this.setState({
                    type:"suning"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="当当网"){
                this.setState({
                    type:"dd"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }else if(num=="唯品会"){
                this.setState({
                    type:"wph"
                },()=>{
                    this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)
   
                })
            }
        })
    }
    changePagination = (a,b) => {
        this.setState({
            pageNo:a,
            pageSize:b,
            loading:true
        },()=>{
            this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)

        })
    }
    onPaginationSize = (a,b) => {
        this.setState({
            pageNo:a,
            pageSize:b,
            loading:true
        },()=>{
            this.itemlist(this.state.pageNo,this.state.pageSize,this.state.type,this.state.title)

        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(PlatformRetrieval);
