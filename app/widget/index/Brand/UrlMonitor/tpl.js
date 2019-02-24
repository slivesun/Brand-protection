
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import { AddIcon } from '../../../components/Component'
import Copyright from "../../../components/Copyright";
import { Breadcrumb,Icon, Alert, Button, Input, Select, Table, Pagination ,Modal} from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { pageNo, pageSize, totalNum, itemlink, shop_name, selectedRowKeys, checkAll, dataList } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => that.onTableCheckChange(selectedRowKeys, selectedRows),
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
            breadcrumbList={['单链接监控']}
            linkList={['']}
        >
        <div className='urlmonitor'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    
                    <Breadcrumb.Item>
                        单链接监控
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>监控链接:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'itemlink')} value={itemlink}  suffix={clearIcon('itemlink')} className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>店铺名称:</span>
                        <Input onChange={(e) => that.chSearchIpt(e, 'shop_name')} value={shop_name}  suffix={clearIcon('shop_name')} className='ipt' />
                    </div>
                    <div className='item'>
                        <Button className="btn6" onClick={e => that.onSearch()}>查询</Button>
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='buts'>
                    <div>
                        <a  href='/index.html#/AddMonitor'><Button className='btn1-main' style={{color:'#fff'}}><AddIcon style={{paddingRight:'8px'}} />新增</Button></a>
                        <Button className="btn1-sub" onClick={e => that.rmAll()}>批量删除</Button>
                    </div>
                    <a href='/index.html#/ChangeHistoryx/MonitorLink_Delete'><Button className="btn1-sub">变更历史</Button></a>
                </div>
                <div style={{ padding: '21px 0px 11px 0px' ,flexShrink:0}}>
                    <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                </div>
                <div className='content-tab'>
                    <Table rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
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
            <EditItem that={that}/>
            {/* <Copyright clazzName='copyright' /> */}

        </div>
        </ContentBox>

    )
})

export default Tpl

const EditItem = ThatMain((that) => {
    let {editItemStatus,targetEdit} = that.state;

    return (
        <Modal
            title={'编辑'}
            visible={editItemStatus}
            maskClosable={false} 
            onCancel={e=>that.editItemStatus(false)}
            onOk={()=>that.editItemSubmit()}
            // className='YellowWhite'
            okButtonProps={{className:'btn2-main'}}
            cancelButtonProps={{className:'btn2-sub'}}
        >
            <div className='edit-item-box'>
               
                <div className='item'>
                    <span className='title red'>限价:</span>
                    <p>
                        <Input onChange={e=>that.onEditItem(e)} value={targetEdit.itemprice}/>
                    </p>
                </div>
                
            </div>
        </Modal>)
})





