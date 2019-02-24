
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import { AddIcon } from '../../../components/Component';
import Copyright from "../../../components/Copyright";
import { Breadcrumb,TreeSelect, Button, Input,Select,Alert,Table,Pagination,Icon } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let {username,realname,departid,departmentList=[],status,dataList,totalNum, pageSize, pageNo, checkAll,selectedRowKeys} = that.state;
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
            breadcrumbList={['子账号管理', '账号管理']}
            linkList={['', '']}
            // history={that.props.history}
        >
        <div className='accountmanagement'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>子账号管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        账号管理
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='search-box'>
                    <div className='input-box'>
                        <div className='item'>
                            <span className='lab'>姓名:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'realname')} value={realname}  suffix={clearIcon('realname')} className='ipt' />
                        </div>
                        <div className='item'>
                            <span className='lab'>用户名:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'username')} value={username} suffix={clearIcon('username')} className='ipt' />
                        </div>
                        <div style={{position: 'relative' }} id="department" className='item'>
                            <span className='lab'>所在部门:</span>

                            <TreeSelect
                            style={{ width: '100%' }}
                            getPopupContainer={() => document.getElementById('department')}
                            dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                            value={[departid]}
                            treeData={departmentList}
                            onChange={(value, label, extra) => that.chTreeSelect(value, label, extra, 'departid')}
                            />
                        </div>
                    </div>
                    <div className='input-box'>
                        <div style={{position: 'relative' }} id="status" className='item'>
                            <span className='lab'>状态:</span>
                            <Select
                                showSearch
                                value={status} 
                                onChange={(e) => that.chSearchIpt(e, 'status')}
                                placeholder=""
                                getPopupContainer={() => document.getElementById('status')}
                                style={{width:'100%'}}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value={null}>全部</Option>
                                <Option value={1}>启用</Option>
                                <Option value={0}>禁用</Option>
                            </Select>
                        </div>
                        <div style={{ justifyContent: 'flex-end' }} className='item'>
                            <Button className="btn6" onClick={e => that.onSearch()}>查询</Button>
                        </div>
                    </div>
                </div>
                <div className='button-box'>
                    <div className='action'>
                        <a href = '/index.html#/AccountManagement/add'>
                            <Button type="primary" className="btn1-main"><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                        </a>
                        <Button className="btn1-sub" onClick={()=>that.allStartOrStop('all','1')}>批量启用</Button>
                        <Button className="btn1-sub" onClick={()=>that.allStartOrStop('all','0')}>批量停用</Button>
                    </div>
                </div>
                <div style={{ padding: '10px 0px 20px 10px' }}>
                <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                </div>
                <div className='content-tab'>
                    <Table rowKey='userid' pagination={false}  rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
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







