import ajax from '../../../../js/common/ajax';
import Copyright from "../../../components/Copyright";
import { Popover, DatePicker, Button, Breadcrumb, message, Icon ,Pagination,Table,Badge} from 'antd';
import {ImgModal} from '../../../components/ImgModal/ImgModal'
const { RangePicker } = DatePicker;
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,
            start_date:moment().subtract(7, 'days'),
            end_date:moment(),
            itemInfo:{},
            dataList: [ ]
        }
    }
    componentDidMount() {
        
    }
    componentWillMount(){
        this.getInfo()
    }
    getInfo = ()=>{
        ajax.get('/hcm/monitorLink/GetObj', {
            params: {
                id:this.props.match.params.id
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                itemInfo:data
            },()=>{
                this.getList()
            })
            
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getList = () =>{
        let {itemInfo,pageNo,pageSize,start_date,end_date} = this.state;
        ajax.get('/hcm/monitorLink/GetDetailList', {
            params: {
                
                pageNo,
                pageSize,
                start_date:moment(start_date).format('YYYY-MM-DD'),
                end_date:moment(end_date).format('YYYY-MM-DD'),
                id:itemInfo.id,
                itemlink:itemInfo.itemlink
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                dataList:data.content,
                pageNo: data.pageNumber,
                pageSize: data.pageSize,
                totalNum: data.totalElements,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onRangePicker = (dates)=>{
        this.setState({
            pageNo:1,
            start_date:dates[0],
            end_date:dates[1],
        },()=>{
            this.getList()
        })
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
    formatColumn = ()=>{
        return[
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width:'7%',
                render: (text,item,index)=> index+1
            },
            {
                title: '更新时间',
                dataIndex: 'monitor_time',
                key: 'monitor_time',
                width:'20%',
                
                render: (text,item,index)=> 
                    <div style={{whiteSpace: 'nowrap'}}>
                        {moment(text).format('YYYY年MM月DD日 HH:mm:ss')}
                        <Badge count={item.islowprice ? '低' : null} />
                    </div>
                
            },
            {
                title: '监控信息',
                dataIndex: 'itemtitle',
                key: 'itemtitle',
                width:'35%',
                render: (text,item,index)=> {
                    return(
                        <div style={{display:'flex'}}>
                            <Popover content={ <img style={{width:'200px'}} src={item.logopicurl}/>}  trigger="hover">
                            <img style={{width:'50px',height:'50px'}} src={item.logopicurl}/>
                            </Popover>
                            <p style={{paddingLeft:'10px'}}>{text}</p>
                        </div>
                    )
                }
            },
            {
                title: '价格',
                align:'right',
                dataIndex: 'itemprice',
                key: 'itemprice'
            },
            {
                title: '销量',
                align:'right',
                dataIndex: 'salevolume',
                key: 'salevolume'
            },
            {
                title: '状态',
                align:'right',
                dataIndex: 'status',
                key: 'status',
                render: (text, item, index) => <span>
                    {text}
                    {
                        text=='上架'? 
                        <img style={{ verticalAlign: '-1px', paddingLeft: '4px' }} src='../../../img/icon/Shelf.png' />
                        :
                        <img style={{ verticalAlign: '-1px', paddingLeft: '4px' }} src='../../../img/icon/Obtained.png' />
                    }
                </span>
            },
            {
                title: '低价快照',
                align:'right',
                dataIndex: 'lowprice_screenshot',
                key: 'lowprice_screenshot',
                render: (text,item,index)=> <a disabled={!item.islowprice} onClick={()=>ImgModal({bl:true,urls:[text],index:0,close:true})} >查看快照</a>
            },
        ]
    }
    render() {
        let { itemInfo,start_date,end_date,dataList,pageNo,pageSize,totalNum} = this.state;
        return (
            <div className='infomonitor'>
                <div className='Breadcrumb'>
                    <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a href='/index.html#/UrlMonitor'>单链接监控</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            监控详情
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='item-info'>
                    <h5>计划信息</h5>
                    <div className='item'>
                        <div style={{paddingRight:'50px'}}>
                            <span>商品名称：</span><a target='_blank' href={itemInfo.itemlink}>{itemInfo.itemtitle}</a>
                        </div>

                        <div>
                            <span>限价：</span>{itemInfo.itemprice}
                        </div>
                    </div>
                    <div style={{fontSize:'14px',color:'#666'}}>
                        <span style={{color:'#333'}}>店铺：</span>
                        <span>{itemInfo.shopname} </span>
                        <span style={{padding:'0px 10px'}}>{itemInfo.dealer_id&&itemInfo.dealer_id>0 ? '已授权' :null }</span>
                        
                        {
                            itemInfo.platform == '天猫' ?
                                <img style={{ verticalAlign: 'bottom', paddingRight: '10px' }} src='../../../img/icon/Tmall.png' />
                                :
                                <img style={{ verticalAlign: 'bottom', paddingRight: '10px' }} src='../../../img/icon/Taobao.png' />
                        }
                    </div>
                </div>
                <div className='content'>
                    <div className='buts'>
                       <Button href={`/hcm/monitorLink/downLoad?start_date=${moment(start_date).format('YYYY-MM-DD')}&end_date=${moment(end_date).format('YYYY-MM-DD')}&id=${itemInfo.id}&itemlink=${itemInfo.itemlink}`}>下载数据</Button>
                       <RangePicker allowClear={false} onChange={dates=>this.onRangePicker(dates)} value={[start_date,end_date]} />
                    </div>
                    <div  className='content-tab'>
                        <Table rowKey='id' pagination={false}  columns={this.formatColumn()} dataSource={dataList} />
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

                <Copyright clazzName='copyright' />

            </div>
        )
    }
}
export default App;