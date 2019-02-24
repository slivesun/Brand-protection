import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form } from 'antd'

class PricePublicity extends React.Component {
    constructor(props) {
        // document.title = '售价公示';
        super(props)
        this.state = {
            cus_name: '',
            des: "",
            spinning: false,
            PricePublicity_list: [],
            productClassifyName:"",
            page_info: {
                pageNo: 1,
                pageSize: 6,
                totalNum: 0,
                SubmitStyle:false
            },
            sumx:6,
            targetId: null,
            count:0
        }
    }
    onLoading = () => {
        let { cus_name, des, page_info } = this.state;
        console.log(this.state.page_info.pageNo,this.state.page_info.pageNo ++)
        ajax.post('/hcm/ProductClassify/seletProductClassify', {
            pageNum: this.state.page_info.pageSize,
            pageSize: this.state.page_info.pageNo ++
        })
            .then((res) => {
                console.log(res)

                if (res.data.status == 10000) {
                    this.setState({
                        PricePublicity_list: res.data.data.data.list,
                        count:res.data.data.data.count
                        
                    })
                    console.log(res.data.data.data.count.length,)
                    if(res.data.data.data.list.length==res.data.data.data.count){
                        this.setState({
                            SubmitStyle:true
                        })
                    }
                }
            })
    }
    handleClearIconClick =  () => {
        const { form: { resetFields, getFieldsValue } } = this.props
             resetFields()
        this.setState({
            productClassifyName :""
        })
    }
    onChange = (e) =>{
        this.setState({
            productClassifyName :e.target.value
        })
        console.log(e.target.value)
    }
    componentDidMount() {
        this.PricePublicity_list()
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(values)
            if (!err) {
                ajax.post('/hcm/ProductClassify/seletProductClassify', {
                    pageNum: this.state.page_info.pageSize,
                    pageSize: this.state.page_info.pageNo,
                    productClassifyName:values.FieldName
                })
                    .then((res) => {
                        if (res.data.status == 10000) {
                            this.setState({
                                PricePublicity_list: res.data.data.data.list
                            })
                            // if(this.state.page_info.pageSize<res.data.data.data.count){
                            //     this.setState({
                            //         SubmitStyle:true
                            //     })
                            // }
                            //console.log(values.FieldName)
                            if(values.FieldName!=undefined && values.FieldName!=""){
                                this.setState({
                                    SubmitStyle:true
                                })
                            }else{
                                this.setState({
                                    SubmitStyle:false
                                })
                            }
                        }
                    })


            }
        })

    }
    PricePublicity_list = () => {
        //console.log(this.state.page_info.pageSize)
        ajax.post('/hcm/ProductClassify/seletProductClassify', {
            pageNum: this.state.page_info.pageSize,
            pageSize: this.state.page_info.pageNo
        })
            .then((res) => {
                console.log(res, "21321")
                if (res.data.status == 10000) {
                    this.setState({
                        PricePublicity_list: res.data.data.data.list,
                        count:res.data.data.data.count
                    })
                    // if(this.state.page_info.pageSize<res.data.data.data.count){
                    //     this.setState({
                    //         SubmitStyle:true
                    //     })
                    // }
                }
            })
    }
    bmids=(e)=>{
        
        window.location="/index.html#/ProductInformation/"+e.target.getAttribute("tit")+"/"+e.target.getAttribute("id")
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(PricePublicity)