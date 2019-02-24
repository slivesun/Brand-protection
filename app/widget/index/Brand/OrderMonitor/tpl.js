
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Table,Pagination,message, Button, Breadcrumb, Input,Select,DatePicker,Icon,Modal} from 'antd';
const Option = Select.Option;
const { RangePicker } = DatePicker;
const Tpl = ThatMain((that) => {
    let {platform, store, creattime, orderno, customer } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName]&&that.state[fieldName].length?
        <Icon
            type="close-circle"
            onClick={()=>that.handleClearIconClick(fieldName)}
            style={clearIconStyle}
        />
        :null
    )
    return (
        <ContentBox
            breadcrumbList={['数据中心', '订单监控']}
            linkList={['', '']}
        >
        <div className='ordermonitor'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>数据中心</Breadcrumb.Item>
                    <Breadcrumb.Item>订单监控</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'  style={{position: 'relative' }} id="platform">
                        <span className='lab'>平台:</span>
                        <Select value={platform}  onChange={(e) => that.chSearchIpt(e, 'platform')}  style={{ width: '100%' }} getPopupContainer={() => document.getElementById('platform')}>
                            <Option value={null}>全部</Option>
                            <Option value="1">淘宝</Option>
                        </Select>
                        
                    </div>
                    <div className='item'>
                        <span className='lab'>店铺旺旺:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'store')} value={store}  suffix={clearIcon('store')} className='ipt' />
                    </div>
                    <div className='item' style={{justifyContent:'flex-end'}}>
                        <span className='lab'>创建时间:</span>
                        <RangePicker onChange={(dates)=>that.onRangePicker(dates)} value={creattime}/>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>订单编号:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'orderno')} suffix={clearIcon('orderno')} value={orderno} className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>客户名称:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'customer')} suffix={clearIcon('customer')} value={customer} className='ipt' />
                    </div>
                    <div style={{ justifyContent: 'flex-end' }} className='item'>
                        <Button className="btn6" onClick={e => that.onSearch()}>查询</Button>
                    </div>
                </div>
            </div>
            <ClientCheck that={that} />
            {/* <Copyright clazzName='copyright' /> */}
            <InviteLink  that={that} />
        </div>
        </ContentBox>
    )
})

const ClientCheck = ThatMain((that) => {
    let { dataList, totalNum, pageSize, pageNo,store='',creattime,orderno='',customer='' } = that.state;
    
    return (
        <div className='content'>
            
            <div className='button-box'>
            <p className='p'><Icon type="sound" className='icon-sound' theme="outlined" />经销商店铺订购应用后，会显示订购店铺的订单数据，请尽快邀请经销商店铺订购。 </p>
                <div className='buts'>
                    <div>
                        <Button  href={`/hcm/monitorDingDan/downLoad?wangwang=${store?store:''}&dealer_name=${customer?customer:''}&tid=${orderno?orderno:''}&start_date=${creattime[0]?creattime[0].format('YYYY-MM-DD'):''}&end_date=${creattime[1]?creattime[1].format('YYYY-MM-DD'):''}`} style={{marginRight:'20px'}}>下载数据</Button>
                        <Button onClick={() => that.inviteLinkStatus(true)}>获取应用订购链接</Button>
                    </div>
                    <div>
                        <Button href='/index.html#/OrderSituation'>店铺订购情况</Button>
                    </div>
                </div>
                
            
            </div>
            
            <div className='content-tab'>
                <Table rowKey='id' pagination={false} columns={that.formatColumn()} dataSource={dataList} />
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
    )
})



const InviteLink = ThatMain((that) => {
    let { inviteLinkStatus} = that.state;

    return (
        <Modal
            title={'获取应用订购链接'}
            visible={inviteLinkStatus}
            maskClosable={false} 
            footer={[
                <Button key="back" onClick={() => that.inviteLinkStatus(false)}>取消</Button>,
            ]}
            onCancel={() => that.inviteLinkStatus(false)}
        >

            <div className='inviteLinkbox'>
                
                <div className='item'>
                    <span className='title'>订购链接：</span>
                    <p>
                        <Input onChange={() => null} value={`https://tb.cn/5VFmCNw`} />
                    </p>
                </div>
                <div className='item' style={{ padding: '0 0 10px 100px',marginTop:'13px' }}>
                    <CopyToClipboard text={`https://tb.cn/5VFmCNw`}
                        onCopy={() => message.success('链接成功复制至粘贴板')}>
                        <Button>复制订购链接</Button>
                    </CopyToClipboard>
                </div>

                <p style={{ padding: '0 0 10px 100px' }}>复制订购链接，发送给经销商店铺订购应用</p>
            </div>
        </Modal>)
})


export default Tpl