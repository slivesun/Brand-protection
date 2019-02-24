
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Input, Button, Select, Alert, Table, Pagination,Icon } from 'antd';
const Option = Select.Option;

const Tpl = ThatMain((that) => {
    let { pageNo, pageSize, totalNum, checkAll, dealername, takePeople, username, status, selectedRowKeys, dataList } = that.state;
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
        breadcrumbList={['用户管理', '经销商账号']}
        linkList={['',  '']}
        history={that.props.history}
        >
        <div className='dealerlist'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>经销商账号</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='search-box'>
                    <div className='input-box'>
                        <div className='item'>
                            <span className='lab'>客户名称:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'dealername')} value={dealername} suffix={clearIcon('dealername')}  className='ipt' />
                        </div>

                        <div className='item'>
                            <span className='lab'>对接人:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'takePeople')} value={takePeople} suffix={clearIcon('takePeople')}  className='ipt' />
                        </div>
                        <div className='item'>
                            <span className='lab'>用户名:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'username')} value={username} suffix={clearIcon('username')}  className='ipt' />
                        </div>
                    </div>
                    <div className='input-box'>

                        <div  style={{position: 'relative' }} id="status" className='item'>
                            <span className='lab'>状态:</span>
                            <Select style={{ width: '100%' }} value={status} onChange={(e) => that.handleChange(e, 'status')}  getPopupContainer={() => document.getElementById('status')}>
                                <Option value={null}>全部</Option>
                                <Option value={1}>启用</Option>
                                <Option value={0}>禁用</Option>
                            </Select>
                        </div>
                        <div style={{ justifyContent: 'flex-end' }} className='item'>
                            <Button onClick={e => that.onSearch()}>查询</Button>
                        </div>
                    </div>
                </div>
                <div className='list-box'>
                    <div>
                        <div>
                            <Button onClick={()=>that.allStopStart(1)}  style={{marginRight:'10px'}} >批量启用</Button>
                            <Button onClick={()=>that.allStopStart(0)}  type="danger">批量停用</Button>
                        </div>
                        <div style={{ padding: '10px 0px' }}>
                            <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                        </div>

                        <Table rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
                    </div>
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