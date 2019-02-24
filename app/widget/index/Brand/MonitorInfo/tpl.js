
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import {Breadcrumb,Icon,Button,Pagination,Table,Select,DatePicker} from 'antd';
import {ImgModal} from '../../../components/ImgModal/ImgModal';
const Option = Select.Option;
const columns = [
    { 
        title: '序号', 
        dataIndex: 'index', 
        key: 'index',
        render: (text,item,index) =>  index+1,
        align:'left',
        width:'7%'
    },
    { 
        title: '商品名称', 
        dataIndex: 'title', 
        key: 'title',
        render: (text,item,index) =>    
        <div style={{display:'flex',alignItems:'center'}}>
            <img onClick={()=>ImgModal({bl:true,urls:[item.pic_url],index:0,close:true})} style={{width:'50px',height:'50px',marginRight:'10px'}} src={item.pic_url}/> 
            <a target='_blank' href={item.item_url}>{item.title}</a>
        </div>,
        align:'left',
        width:'40%'
    },
    { 
        title: '店铺', 
        dataIndex: 'shopname', 
        key: 'shopname',
        align:'right',
        width:'18%'
    },
    { 
        title: '价格', 
        dataIndex: 'discount_price', 
        key: 'discount_price',
        align:'right',
        width:'15%'
    },
    { 
        title: '销量', 
        dataIndex: 'salesvolume', 
        key: 'salesvolume',
        align:'right',
        width:'10%'
    },
    { 
        title: '发货地', 
        dataIndex: 'state;', 
        key: 'state;',
        render: (text,item,index) => <div style={{width:'150px'}}>{item.state} {item.area}</div>,
        align:'right',
        width:'15%'
    },
];
  

const Tpl = ThatMain((that) => {
    let {date,totalNum, pageSize, pageNo,classInfo,priceList,dataList,targetItem} = that.state;
    return (
        <ContentBox 
        breadcrumbList={['售价监控', '监控详情']}
        linkList={['1', '']}
        history={that.props.history}
        >
        <div className='monitorinfo'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                   
                    <Breadcrumb.Item>
                        <a href='/index.html#/PriceMonitor'>售价监控</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>监控详情</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='class-info'>
                    <h3>
                        {classInfo.productClassifyName}
                    </h3>
                    <ul className='info'>
                        <li>平台：<span>{classInfo.platform_name}</span></li>
                        <li>监控范围：<span>{classInfo.monitor_range}</span></li>
                        <li>监控时间：<span>{classInfo.monitorDate}</span></li>
                        <li>频次：<span>{classInfo.frequency}</span></li>
                    </ul>
                </div>
                <div className='price-list-box'>
                    <Icon onClick={()=>that.onScrollLeft(false)} type="left" />
                    <ul className='price-list'>
                        <li className='space'></li>
                        {
                            priceList.map((item,index)=>{
                                return (
                                    <li onClick={()=>that.onSelectItem(item)}  className={item.fieldvalue === targetItem.fieldvalue ?'price-item active' : 'price-item' }key={index}>
                                        <strong>{item.fieldname}</strong>
                                        <p><span>低价商品数量</span><span style={{fontSize:'24px',color:'#000'}}>{item.my_count}</span></p>
                                    </li>
                                )
                            })
                        }
                        <li className='space'></li>
                    </ul>
                    <Icon onClick={()=>that.onScrollLeft(true)} type="right" />
                </div>
                <div className='data-list-box'>
                    <div className='buts'>
                    
                        <Button href={`/hcm/monitorPrice/downLoad?price_type=${targetItem.fieldvalue}&id=${that.props.match.params.id}&my_date=${moment(date).format('YYYY-MM-DD')}`}>下载数据</Button>
                   
                        <DatePicker allowClear={false} onChange={(e)=>that.editDate(e)} value={date} />
                       
                        
                    </div>   
                    <Table
                        columns={columns}
                        pagination={false}
                        rowKey='itemlistid'
                        onExpand = {(expanded, record)=>that.onExpand(expanded, record)}
                        expandedRowRender={(record, index, indent, expanded)=>that.rowRender(record, index, indent, expanded)}
                        dataSource={dataList}
                    />
                    <div className='footer'>
                        <div className='info'>
                            {`共 ${totalNum} 条记录 `}
                            &nbsp;&nbsp;
                        {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                        </div>
                        <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                    </div>
                </div>
            </div>  
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>
    )
})



export default Tpl
