import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, Input } from 'antd';
class ProductInformation extends React.Component {
    constructor(props) {
        document.title = '产品信息';
        super(props)
        this.state = {
            ProductInformation_list: [],
            data: [],
            type: "新增",
            pagination: {},
            loading: false,
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            confirmLoading:false,
            tit:""
        }

    }
    componentDidMount() {
        this.fetch();
        this.getByProduct();
    }
    getByProduct = () => {
        ajax.get('/hcm/hcmCustomModel/getByProduct', {
            params: {
                productClassifyid:this.props.match.params.id
            }
        }).then((response) => {
            let productList = response.data.data;
            this.setState({
                ProductInformation_list: this.formAtDom(productList)
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    
    formAtDom = (data) =>{
        let arr = [{
            title: '序号',
            dataIndex: 'index',
            fixed: 'left',
            sort:0,
            width:'100px',
            render: (text, record, index) => (
                <span style={{width:'50px',display:'inline-block'}}>
                   {index+1}
                </span>
            )
        }];
        for (const key in data) {
            data[key].data.forEach((item,index)=>{
                if(item.isChecked){
                    item.target = [key,index,item]
                    return (
                        arr.push({
                            title: item.fieldname,
                            dataIndex: item.fieldvalue,
                            key:item.id,
                            sort:item.sort,
                            width:'400px',
                            className:'item-column'
                        })
                    )
                }
                
            })
        }
        arr.push({
            title: '操作',
            dataIndex: 'action',
            key:'action',
            sort:999999,  
            width:'150px',
            align:'center',
            fixed: 'right',
            render: (text, record, index) => (
                <span style={{width:"170px"}}>
                    
                <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_history.png' />
                    <a onClick={(text)=>this.HistoryBtn(record)}>变更历史</a>
                </span>
            )
        })
        return arr
    }  
    HistoryBtn = (index) => { //变更历史
        console.log(index)
        window.location="/index.html#/PricePublicity/ChangeHistory/Product/"+index.brand_name+"/"+index.id
    }
    handleClearIconClick =  () => {
        const { form: { resetFields, getFieldsValue } } = this.props
       // console.log(getFieldsValue())
        //console.log(resetFields())
             resetFields("productName")
    }
    handleClearIconClicks =  () => {
        const { form: { resetFields, getFieldsValue } } = this.props
             resetFields("brandName")
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           // console.log(values)
            if (!err) {
                console.log(this.state.pageNo,this.state.pageSize,)
                ajax.post('/hcm/hcmProduct/getPageBybmcid', {
                    classifyid:this.props.match.params.id,
                    pageNo:1,
                    pageSize:this.state.pageSize,
                    brandName:values.brandName,
                    productName:values.productName
                }).then((res) => {
                    console.log(res)
                    if (res.data.status == 10000) {
                        if(res.data.data.content!=""){
                            this.setState({
                                data: res.data.data.content,
                                loading: false,
                                totalNum:res.data.data.totalElements,
                                pageNo:res.data.data.pageNumber,
                                pageSize:res.data.data.pageSize,

                            });
                        }else{
                            this.setState({
                                data: "",
                                loading: false,
                                totalNum:"0"
                            });
                        }
                        
                    }
                })
                
            }
        })

    }


    changePagination = (current, pageSize) => {
        console.log(current, pageSize);

        ajax.post('/hcm/hcmProduct/getPageBybmcid', {
            classifyid:this.props.match.params.id,
            pageNo:current,
            pageSize:pageSize,
        }).then((res) => {
            console.log(res)
            if(res.data.status==10000){
                
                this.setState({
                    totalNum:res.data.data.totalElements,
                    pageNo:res.data.data.pageNumber,
                    pageSize:res.data.data.pageSize,
                },()=>{
                    this.fetch();
                })
            }
            
        })
       
    }
    onPaginationSize = (current, size) => {
        console.log(size)
      
        ajax.post('/hcm/hcmProduct/getPageBybmcid', {
            classifyid:this.props.match.params.id,
            pageNo:current,
            pageSize:size,
        }).then((res) => {
            console.log(res)
            if(res.data.status==10000){
                this.setState({
                    pageNo:current,
                    pageSize: size
                },()=>{
                    this.fetch();
                })
              
            }
            
        })
       
    }
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }


    fetch = (params = {}) => {
        ajax.post('/hcm/productread/create', {
            classifyId:this.props.match.params.id
        }).then((res) => {
            console.log(res)
        })
        this.setState({ loading: true });
        this.setState({
            tit:this.props.match.params.tit
        });
        ajax.post('/hcm/hcmProduct/getPageBybmcid', {
            classifyid:this.props.match.params.id,
            pageNo:this.state.pageNo,
            pageSize:this.state.pageSize
        }).then((res) => {
            console.log(res,"123321")
            if (res.data.status == 10000) {
                if(res.data.data.content!=""){
                    console.log()
                    this.setState({
                        data: res.data.data.content,
                        loading: false,
                        totalNum:res.data.data.totalElements,
                        pageNo:res.data.data.pageNumber,
                        pageSize:res.data.data.pageSize,
                    });
                }else{
                    this.setState({
                        data: "",
                        loading: false,
                        totalNum:"0"
                    });
                }
                
            }
        })
        

    }

    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(ProductInformation)