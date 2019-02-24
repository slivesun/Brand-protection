
import { message, Breadcrumb ,Input, Button} from 'antd';
import ajax from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
import ContentBox from '../../../components/Layout'


const { TextArea } = Input;
// import {LoadingModal} from '../../../components/LoadingModal/LoadingModal'
class App extends React.Component {
    constructor(props) {
        super(props)
        let { id, name, status, type, itemid } = this.props.match.params;
        this.state = {
            id,
            name,
            status,
            type,
            itemid,
            formatColumn:{},
            product_classify_id:null,
            bmcid:1,
            product_name:null,
            brand_name:null,
            addField:{}
        }
    }
    componentWillMount(){
        let {type} = this.props.match.params;
        this.getByProduct()
        if(type=='add'){
            
        }else{
            this.getInfo()
        }
        
    }
    getInfo(){
        let { itemid } = this.props.match.params;
        ajax.get('/hcm/hcmProduct/getById', {
            params: {
                id: itemid
            }
        }).then((response) => {
            let {product_classify_id,bmcid,product_name,brand_name, ...addField} = response.data.data;
            this.setState({
                product_classify_id:product_classify_id,
                bmcid:bmcid,
                product_name:product_name,
                brand_name:brand_name,
                addField:addField
            })
            
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getByProduct = () => {
        ajax.get('/hcm/hcmCustomModel/getByProduct', {
            params: {
                productClassifyid:this.state.id
            }
        }).then((response) => {
            let productList = response.data.data;
            this.setState({
                formatColumn: productList
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    fixedIptChange(e,type){
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    iptChange(e,type){
        if(type.fieldClassify == 'PRICE'){
            if(isNaN(+e.target.value)){
                return
            }
            
        }
        let addField = this.state.addField;
        addField[type.fieldvalue] = e.target.value;
        this.setState({
            addField:addField
        })
    }
    onSubmit(){
        let { id,name,itemid,type ,product_classify_id,bmcid,product_name,brand_name,addField,formatColumn} =this.state;
        if(!brand_name||!(brand_name.trim().length)){
            message.error('品牌不可为空')
            return
        }
        if(!product_name||!(product_name.trim().length)){
            message.error('品名不可为空')
            return
        }
        if(!lib.legnthCheck(brand_name.trim(),'INPUT')){
            message.error('产品信息字符长度不能超过50')
            return
        }
        if(!lib.legnthCheck(product_name.trim(),'INPUT')){
            message.error('产品信息字符长度不能超过50')
            return
        }
        let {memo,price,product} = formatColumn;
        let arr = [...memo.data,...price.data,...product.data];
        for(var key in addField){
            let item = arr.filter(i=>i.fieldvalue== key)
            if(item[0].fieldClassify=="MEMO"&&!lib.legnthCheck(addField[key],'URL')){
                message.error('备注信息字符长度不能超过500')
                return
                
            }else if((item[0].fieldClassify=="PRICE")&&!lib.legnthCheck(addField[key],'INPUT')){
                message.error('价格信息字符长度不能超过50')
                return
            }else if((item[0].fieldClassify=='PRODUCT')&&!lib.legnthCheck(addField[key],'INPUT')){
                message.error('产品信息字符长度不能超过50')
                return
            }
        }
        LoadingModal({bl:true,text:'保存中,请稍后...'})
        ajax.get('/hcm/hcmProduct/save', {
            params: {
                bmcid: bmcid,
                productClassifyId:id,
                brandName:brand_name,
                productName:product_name,
                addField:addField,
                id:type=='add' ? null :itemid

            }
        }).then((response) => {
            
            if(response.data.status =='10000'){
                message.success(response.data.message)
                if(type=='add'){
                    this.setState({
                        product_name:null,
                        brand_name:null,
                        addField:{}
                    })
                }else{
                    window.location.href = `/index.html#/ProductInfo/${id}/${name}`;
                }
            }else{
                message.warning(response.data.message)
            }
            
            LoadingModal({bl:false})
        }).catch((error) => {
            LoadingModal({bl:false})
            message.error(error.statusText);
        });
    }
    render() {
        let { id, name, status, type, itemid ,product_classify_id,bmcid,product_name,brand_name,addField,formatColumn} =this.state;
        
        let {memo,price,product} = formatColumn;
        let productName = product ? product.data.filter((item,index)=>item.fieldvalue == 'product_name'):null;
        return (
            <ContentBox 
            breadcrumbList={['售价公示', name, type=='add'? '新增公示信息':'编辑公示信息']}
            linkList={['2', '1', '']}
            history={this.props.history}
            >
            <div className='ActionPriceInfo'>
                {/* <div className='Breadcrumb'>
                    <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a href='/index.html#/PriceNotice'>售价公示</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item><a href={`/index.html#/ProductInfo/${id}/${name}`}>{name}</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{type=='add'? '新增公示信息':'编辑公示信息'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div> */}
                <div className='content'>
                    <div className='box'>
                        <h4>产品信息</h4>
                        <div className='items'>
                            <div className='item'>
                                <span className='text red'>品牌</span>
                                <Input placeholder="请输入" onChange={e=>this.fixedIptChange(e,'brand_name')} value={brand_name} className='input'/>
                            </div>
                            <div className='item'>
                                <span className='text red'>{productName?productName[0].fieldname:'品名'}</span>
                                <Input placeholder="请输入" onChange={e=>this.fixedIptChange(e,'product_name')} value={product_name} className='input'/>
                            </div>
                            {
                                product?
                                    product.data.map((item,index)=>{
                                        if(item.fieldvalue!=="brand_name"&&item.fieldvalue!=="product_name"){
                                            return (
                                                <div key={index} className='item'>
                                                    <span className='text'>{item.fieldname}</span>
                                                    <Input placeholder="请输入" onChange={e=>this.iptChange(e,item)} value={addField[item.fieldvalue]} className='input'/>
                                                </div>
                                            )
                                        }
                                        
                                    })
                                :null
                            }
                        </div>
                        <h4>价格信息</h4>
                        <div className='items'>
                            {
                                price?
                                    price.data.map((item,index)=>{
                                        return (
                                            <div key={index} className='item'>
                                                <span className='text'>{item.fieldname}</span>
                                                <Input placeholder="请输入" onChange={e=>this.iptChange(e,item)} value={addField[item.fieldvalue]} className='input'/>
                                            </div>
                                        )
                                        
                                    })
                                :null
                            }
                        </div>
                        <h4>备注信息</h4>
                        <div className='items'>
                            {
                                memo?
                                    memo.data.map((item,index)=>{
                                        return (
                                            <div key={index} className='item'>
                                                <span className='text'>{item.fieldname}</span>
                                                <Input placeholder="请输入" onChange={e=>this.iptChange(e,item)} value={addField[item.fieldvalue]} className='input'/>
                                            </div>
                                        )
                                        
                                    })
                                :null
                            }
                            
                        </div>
                        <div className='items'>
                            <div className='item'>
                                <span className='text'></span>
                                <Button className="btn2-main" onClick={()=>this.onSubmit()} style={{marginLeft:'20px'}}>确认</Button>
                                <a href={`/index.html#/ProductInfo/${id}/${name}`}><Button className="btn2-sub noneFloat" >取消</Button></a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </ContentBox>
        )
    }
}
export default App;
