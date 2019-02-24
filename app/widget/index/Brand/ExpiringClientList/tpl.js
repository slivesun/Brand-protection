
import ThatMain from '../../../HOC/That';
// import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout';

import { Table, Icon, Pagination, Input, Modal, Button, Alert, Breadcrumb, DatePicker, Inputx } from 'antd';
const { RangePicker } = DatePicker;

import FullSpin from '../../../components/FullSpin';

const Tpl = ThatMain((that) => {
    return (
        <ContentBox
            breadcrumbList={['客户盘点', '客户信息', '合同到期']}
            linkList={['', '1', '']}
            history={that.props.history}
        >
            <div className='ExpiringClientList'>
                {/* <div className='Breadcrumb'>
                <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a style={{margin:'0'}} href='/index.html#/ClientCheck'>
                                客户信息
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>解约客户</Breadcrumb.Item>
                    </Breadcrumb>
                </div> */}
                <ExpiringClientList that={that} />
                {/* <Copyright clazzName='copyright' /> */}
            </div>
        </ContentBox>
    )
})

const ExpiringClientList = ThatMain((that) => {
    let { dataList, spinning, restorePicker, rangePicker, selectedRowKeys, dealername, takePeople, totalNum, pageSize, pageNo, checkAll } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => that.onTableCheckChange(selectedRowKeys),
    };
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName] && that.state[fieldName].length ?
            <Icon
                type="close-circle"
                onClick={() => that.handleClearIconClick(fieldName)}
                style={clearIconStyle}
            />
            : null
    )
    return (
        <div className='content ExpiringClientList'>
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>客户名称:</span>
                        <Input placeholder="请输入" style={{width:'280px'}} onChange={(e) => that.chSearchIpt(e, 'dealername')} value={dealername} suffix={clearIcon('dealername')} className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>对接人:</span>
                        <Input placeholder="请输入" style={{width:'280px'}} onChange={(e) => that.chSearchIpt(e, 'takePeople')} value={takePeople} suffix={clearIcon('takePeople')} className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>到期时间:</span>
                        <RangePicker onChange={(dates) => that.chSearchIpt(dates, 'rangePicker')} value={[rangePicker[0], rangePicker[1]]} className='ipt' />
                    </div>
                </div>
                <div className='input-box' style={{ justifyContent: 'flex-end',paddingBottom:0 }}>

                    <div style={{ justifyContent: 'flex-end' }} className='item'>
                        <Button className='btn6 seh' onClick={e => that.onSearch()}>查询</Button>
                    </div>
                </div>
            </div>
            <div className='button-box'>
                <Button onClick={() => that.allStartConfirm('all', null, true)}>批量合同续期</Button>
                <Button onClick={() => that.allRmConfirm('all', null)}>批量删除</Button>
            </div>
            <div style={{ padding: '21px 0 11px 0' }}>
                <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
            </div>
            <div className='content-tab'>
                <Table style={{    flexShrink: 4,flexGrow: 44}} locale={{ emptyText: <span>暂无数据</span> }} rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList.dealer_list} />
                <div className='footer'>
                    <div className='info'>
                        {`共 ${totalNum} 条记录 `}
                        &nbsp;&nbsp;
                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                    </div>
                    <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                </div>
            </div>

            <Modal
                title="恢复合约"
                maskClosable={false}
                visible={that.state.visible}
                onOk={() => that.allStart()}
                onCancel={() => that.allStartConfirm('close', null, false)}
            >
                <div style={{ textAlign: 'center', padding: '10px 0px' }}>
                    <span style={{ paddingRight: '10px' }}><span className='red'>*</span>授权期限:</span>
                    <RangePicker disabledDate={(currentDate) => currentDate && currentDate < moment().subtract(1, 'days')} allowClear={false} onChange={(dates) => that.chSearchIpt(dates, 'restorePicker')} value={[restorePicker[0], restorePicker[1]]} className='ipt' />
                </div>
            </Modal>



            <FullSpin spinning={spinning} />
        </div>
    )
})


export default Tpl