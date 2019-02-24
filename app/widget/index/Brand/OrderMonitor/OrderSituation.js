import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import {Table,Pagination,Breadcrumb,Input,Select,DatePicker,Button,Icon} from 'antd';
import ajax from '../../../../js/common/ajax';
const Option = Select.Option;
class App extends React.Component {
    constructor(props) {
        super(props)
        let arr = [];
        this.state = {
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,

            shopname: null,
            dealers: null,
            status: null,

            dataList: arr,
        }
    }
    componentDidMount() {
        this.getList()
        
    }
    onSearch= () =>{
        this.setState({
            pageNo:1
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {pageNo,pageSize,shopname,dealers,status} = this.state;
        ajax.get('/hcm/monitorDingDan/shops', {
            params: {
                pageNo,pageSize,
                shop_name:shopname,
                dealer_name:dealers,
                isauthed:status
            }
        }).then((response) => {
            let {content,pageNumber,pageSize,totalElements} = response.data.data;
            this.setState({
                pageNo: pageNumber,
                pageSize: pageSize,
                totalNum: totalElements,
                dataList: content,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    
    chSearchIpt = (e,type)=>{
        let state = this.state;
        state[type] =  type=='status' ? e : e.target.value;
        this.setState(state)

    }
    formatColumn = () => {
        let column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1
        },{
            title: '店铺名称',
            dataIndex: 'shop_name',
            key: 'shop_name'
        },{
            title: '所属经销商',
            dataIndex: 'dealer_name',
            key: 'dealer_name'
        },{
            title: '状态',
            dataIndex: 'isauthed',
            key: 'isauthed',
            width:'10%',
            align:'center',
            render: (text, record, index) => text == 'AUTHED' ? '已订购' : '未订购'
        }]
        return column
    }
   
    
    changePagination = (page, pageSize) => {
        this.setState({
            pageNo: page,
            pageSize: pageSize,
        }, () => {
            this.getList()
        })
    }
    onPaginationSize = (current, size) => {
        this.setState({
            pageNo: 1,
            pageSize: size,
        }, () => {
            this.getList()
        })
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    render() {
        let { dataList, totalNum, pageSize, pageNo,shopname,dealers,status } = this.state;
        const clearIconStyle = {
            width: '14px',
            height: '14px',
            opacity: 0.25,
            cursor: 'pointer'
        }
        const clearIcon = fieldName => (
            this.state[fieldName]&&this.state[fieldName].length?
            <Icon
                type="close-circle"
                onClick={()=>this.handleClearIconClick(fieldName)}
                style={clearIconStyle}
            />
            :null
        )
        return (
            <ContentBox
                breadcrumbList={['数据中心', '订单监控', '店铺订购情况']}
                linkList={['', '1', '']}
                history={this.props.history}
            >
            <div className='OrderSituation'>
           
                 {/* <div className='Breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item>数据中心</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href='/index.html#/OrderMonitor'> 
                                订单监控
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>店铺订购情况</Breadcrumb.Item>
                    </Breadcrumb>
                </div> */}
               <div className='search-box'>
                    <div className='input-box'>
                        <div className='item'>
                            <span className='lab'>店铺名称:</span>
                            <Input onChange={(e) => this.chSearchIpt(e, 'shopname')} value={shopname}  suffix={clearIcon('shopname')} className='ipt' />
                        </div>
                        <div className='item'>
                            <span className='lab'>所属经销商:</span>
                            <Input onChange={(e) => this.chSearchIpt(e, 'dealers')} value={dealers}  suffix={clearIcon('dealers')} className='ipt' />
                        </div>
                        <div className='item'  style={{position: 'relative' }} id="status" >
                            <span className='lab'>状态:</span>
                            <Select value={status}  onChange={(e) => this.chSearchIpt(e, 'status')}  style={{ width: '100%' }}  getPopupContainer={() => document.getElementById('status')} >
                                <Option value={null}>全部</Option>
                                <Option value="NOTAUTH">未订购</Option>
                                <Option value="AUTHED">已订购</Option>
                            </Select>
                            
                        </div>
                        <div style={{ justifyContent: 'flex-end' }} className='itembut'>
                            <Button className="btn6" onClick={e => this.onSearch()}>查询</Button>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-tab'>
                        <Table rowKey='shop_id' pagination={false} columns={this.formatColumn()} dataSource={dataList} />
                        <div className='footer'>
                            <div className='info'>
                                {`共 ${totalNum} 条记录 `}
                                &nbsp;&nbsp;
                            {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                            </div>
                            <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={this.changePagination} onShowSizeChange={this.onPaginationSize} showSizeChanger showQuickJumper />
                        </div>
                    </div>
                </div>
            </div>
            </ContentBox>
        )
    }
}

// const ClientShop = ThatMain((that) => {
//     let { dataList, totalNum, pageSize, pageNo } = that.state;
//     console.log(that)
//     return (
        
//     )
// })
export default App
