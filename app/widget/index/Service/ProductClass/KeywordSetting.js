
import { message ,Breadcrumb,Table,Pagination,Input, Select,Icon} from 'antd';
const Option = Select.Option;
import lib from '../../../../js/common/lib';
import ajax from '../../../../js/common/ajax';
import Copyright from "../../../components/Copyright";
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageSize: 10,
            pageNum: 1,
            totalElements: 0,
            dataList: [],
            productList:[]

        }
    }
    componentDidMount() {
        this.getByProduct()
    }

    getByProduct =() =>{
        ajax.get('/hcm/hcmCustomModel/getByProduct', {
            params: {
                productClassifyid:this.props.match.params.id,
            }
        })
        .then((response) => {
            if (response.data.status == '10000') {
                this.setState({
                    productList:response.data.data.product.data
                })
                this.getList()
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    formatColumn=()=>{
        let column = [{
            title: '序号', 
            dataIndex: 'index', 
            key: 'index', 
            render:(text,item,index) => <div className={item.key_status_kefu===0?'key-status-kefu':null} style={{width:'80px'}}>{index+1 }</div>
        }];
        let {productList} = this.state;
        productList.forEach((item,index)=>{
            column.push({
                title: item.fieldname, 
                dataIndex: item.fieldvalue, 
                key: item.fieldvalue,
                render:(text)=> <div style={{width:'200px'}}>{text}</div>
            })
        })
        return column;
    }
    changePagination = (page, pageSize) => {
        this.setState({
            pageNum: page,
            pageSize: pageSize,
        }, () => {
            this.getList()
        })
    }
    onPaginationSize = (current, size) => {
        this.setState({
            pageNum: 1,
            pageSize: size,
        }, () => {
            this.getList()
        })
    }
    getList = () => {
        let { pageSize, pageNum } = this.state;
        ajax.get('/hcm/monitorPrice/GetProductList', {
            params: {
                pageSize,
                pageNo:pageNum,
                productClassifyId:this.props.match.params.id,
            }
        })
        .then((response) => {
            if (response.data.status == '10000') {
                this.setState({
                    dataList: response.data.data.content,
                    pageNum: response.data.data.pageNumber,
                    totalElements: response.data.data.totalElements,
                    pageSize: response.data.data.pageSize,
                })
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    etidItem=(record,index,bl)=>{
        let {dataList} = this.state;
        if(bl){
            dataList[index].oldData = Object.assign({},record);
        }else{
            dataList[index] = dataList[index].oldData
        }
        dataList[index].editStatus = bl;
        this.setState({
            dataList
        })

    }
    onChangeIpt=(e,type,index)=>{
        let {dataList} = this.state;
        dataList[index][type] = e.target.value;
        this.setState({
            dataList
        })
    }

    onChangeSlc=(e,type,index)=>{
        let {dataList} = this.state;
        dataList[index][type] = e;
        this.setState({
            dataList
        })
    }
    submitItem=(record)=>{
        let {id,key1='',key2='',key3='',logic1='',logic2=''} =  record;
        
        if(!(key1.trim())){
            message.error('请输入关键词1');
            return
        }
        if(!lib.legnthCheck(key1,'INPUT')){
            message.error('关键词1长度不允许超过50');
            return
        }
        if(logic1.length||key2.trim().length){
            if(!(key2.trim())){
                message.error('请输入关键词2');
                return
            }
            if(logic1.length==0){
                message.error('请选择关键词2检索条件');
                return
            }
            if(!lib.legnthCheck(key2,'INPUT')){
                message.error('关键词2长度不允许超过50');
                return
            }
        }
        if(logic2.length||key3.trim().length){
            if(!(key3.trim())){
                message.error('请输入关键词3');
                return
            }
            if(logic2.length==0){
                message.error('请选择关键词3检索条件');
                return
            }
            if(!lib.legnthCheck(key3,'INPUT')){
                message.error('关键词3长度不允许超过50');
                return
            }
        }
        ajax.post('/hcm/hcmProduct/setProductMonitorKeyword',{id,key1,key2,key3,logic1,logic2} )
        .then((response) => {
            if (response.data.status == '10000') {
                message.success(response.data.message);
                this.getList()
            }else{
                message.error(response.data.message);
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    expandedRowRender=(record, index, indent, expanded)=>{
        let {editStatus,id,key1,key2,key3,logic1,logic2} = Object.assign({},record);
        key1   =  key1 ? key1 : '';
        key2   =  key2 ? key2 : '';
        key3   =  key3 ? key3 : '';
        logic1 =  logic1 ? logic1 : '';
        logic2 =  logic2 ? logic2 : '';
        if(!editStatus){
            return (
                <div className='ipt-box'>
                    <div style={{paddingRight:'100px'}} className='ipts infospan'>
                        {
                            key1.trim().length ? 
                            <React.Fragment>
                                <span title={key1} >{key1}</span>
                                <span title={logic1} >{logic1}</span>
                                <span title={key2} >{key2}</span>
                                <span title={logic2} >{logic2}</span>
                                <span title={key3} >{key3}</span>
                            </React.Fragment>
                            :<p>未设置</p>
                        }
                        
                        
                    </div>
                    <div className='buts'>
                    <span onClick={()=>this.etidItem(record,index,true)} className='a'><img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_edit.png' />编辑</span>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='ipt-box'>
                    <div style={{position: 'relative' }} id="KeywordSetting" className='ipts'>
                        <Input onChange={e=>this.onChangeIpt(e,'key1',index)} placeholder='请输入关键词1' value={key1} style={{ width: 200 }} />
                        
                        <Input addonBefore={
                            <Select  onChange={e=>this.onChangeSlc(e,'logic1',index)} placeholder='请选择' value={logic1} style={{ width: 100 }} getPopupContainer={() => document.getElementById('KeywordSetting')}>
                                <Option value={''}>请选择</Option>
                                <Option value="或">或</Option>
                                <Option value="且">且</Option>
                                <Option value="不包含">不包含</Option>
                            </Select>
                        } onChange={e=>this.onChangeIpt(e,'key2',index)}  placeholder='请输入关键词2'  value={key2} style={{ width: 320 }}/>
                        
                        <Input addonBefore={
                            <Select onChange={e=>this.onChangeSlc(e,'logic2',index)} placeholder='请选择' value={logic2} style={{ width: 100 }} getPopupContainer={() => document.getElementById('KeywordSetting')}>
                                <Option value={''}>请选择</Option>
                                <Option  value="或">或</Option>
                                <Option value="且">且</Option>
                                <Option value="不包含">不包含</Option>
                            </Select>
                        } onChange={e=>this.onChangeIpt(e,'key3',index)}  placeholder='请输入关键词3'  value={key3} style={{ width: 320 }}/>
                    </div>
                    <div className='buts a'>
                        <a  onClick={()=>this.submitItem(record)}><Icon type="check" /></a>
                        
                        <Icon onClick={()=>this.etidItem(record,index,false)} type="close" />
                    </div>
                </div>
            )
        }
        
        
        
    }

    render() {
        let {dataList, pageSize, pageNum:pageNo,totalElements:totalNum} = this.state;
        return <div className='keyword-setting'>
            <div className='Breadcrumb'>
                <Breadcrumb>

                    
                    <Breadcrumb.Item>
                        售价监控设置
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href={`/index.html#/ProductClass`}>
                            产品分类
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>关键词设置</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='content'>
                {
                    
                    <Table
                        columns={this.formatColumn()}
                        rowKey='id'
                        pagination={false} 
                        expandedRowRender={(record, index, indent, expanded)=>this.expandedRowRender(record, index, indent, expanded)}
                        dataSource={dataList}
                    />
                   
                }
                
                <div className='footer'>
                    <div className='info'>
                        {`共 ${totalNum} 条记录 `}
                        &nbsp;&nbsp;
                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                    </div>
                    <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={this.changePagination} onShowSizeChange={this.onPaginationSize} showSizeChanger showQuickJumper />
                </div>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    }
}
export default App;
