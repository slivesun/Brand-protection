
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout';
import {AddIcon} from '../../../components/Component';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TagInput from '../../../components/TagInput/main'
import { Table,  Switch,Pagination, Button, Modal, message, Alert,Input, Dropdown, Icon, Menu } from 'antd';
import ClientDetail from '../ClientDetail/main';
import FullSpin from '../../../components/FullSpin';
import SetTable from '../../../components/SetTable/main';
const Tpl = ThatMain((that) => {
    return (
        <ContentBox
        breadcrumbList={['客户盘点', '客户信息']}
            linkList={['', '']}
        >
            <div className='clientcheck'>
                <ClientCheck that={that} />
            </div>
        </ContentBox>
        
    )
})

const ClientCheck = ThatMain((that) => {
    let { dataList, spinning, setTableData, selectedRowKeys, dealername, bossid, takePeople, contact, memoDealername, setTableStatus, totalNum, pageSize, pageNo, checkAll } = that.state;
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
        <div className='content ClientCheck'>
            <div className='search-box'>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>客户名称:</span>
                        <Input 
                            placeholder='请输入'
                            onChange={(e) => that.chSearchIpt(e, 'dealername')} 
                            value={dealername} 
                            suffix={clearIcon('dealername')} 
                            className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>备注名称:</span>
                        <Input 
                            placeholder='请输入'
                            onChange={(e) => that.chSearchIpt(e, 'memoDealername')} 
                            value={memoDealername} 
                            suffix={clearIcon('memoDealername')} 
                            className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>直属上级:</span>
                        <Input 
                            placeholder='请输入'
                            onChange={(e) => that.chSearchIpt(e, 'bossid')} 
                            value={bossid} 
                            suffix={clearIcon('bossid')} 
                            className='ipt' />
                    </div>
                </div>
                <div className='input-box'>
                    <div className='item'>
                        <span className='lab'>对接人:</span>
                        <Input 
                            placeholder='请输入'
                            onChange={(e) => that.chSearchIpt(e, 'takePeople')} 
                            value={takePeople} 
                            suffix={clearIcon('takePeople')} 
                            className='ipt' />
                    </div>
                    <div className='item'>
                        <span className='lab'>联系方式:</span>
                        <Input 
                            placeholder='请输入'
                            onChange={(e) => that.chSearchIpt(e, 'contact')} 
                            value={contact} 
                            suffix={clearIcon('contact')} 
                            className='ipt' />
                    </div>
                    <div style={{ justifyContent: 'flex-end' }} className='item'>
                        <Button className='btn6 seh' onClick={e => that.onSearch()}>查询</Button>
                    </div>
                </div>
            </div>
            <div className='button-box'>
                <div className='action'>
                    <Button className="btn1-main" onClick={() => that.addModalStatus(true)} type="primary">
                        <AddIcon style={{paddingRight:8}} />
                        新增
                    </Button>
                    <Button className="btn1-sub" onClick={() => that.allStopConfirm('all', null)} >批量合同到期</Button>
                    {/* <Dropdown overlay={
                        <Menu>
                            <Menu.Item onClick={() => that.allStopConfirm('all', null)} key="1">批量移入停约</Menu.Item>
                            <Menu.Item onClick={() => that.allRmConfirm('all', null)} key="2">批量删除</Menu.Item>
                        </Menu>}>
                        <Button style={{ marginLeft: 8 }}>
                            批量操作 <Icon type="down" />
                        </Button>
                    </Dropdown> */}
                    <a href = {`/hcm/dealer/download?${dealername ? 'dealername='+dealername: ''}${bossid ? '&bossid='+bossid: ''}${takePeople ? '&takePeople='+takePeople: ''}${contact ? '&contact='+contact: ''}${memoDealername ? '&memoDealername='+memoDealername: ''}`}>
                        <Button className="btn1-sub" >下载数据</Button>
                    </a>
                    <Button className="btn1-sub" onClick={() => that.inviteLinkStatus(true)}>获取邀请链接</Button>
                </div>
                <div className='info'>
                    
                    {
                        +dataList.waitApprovedCount > 0 ?
                        <Button  href='/index.html#/PendingClient' className='TYPE1-BUTTON'>待审批客户({dataList.waitApprovedCount})</Button>
                        : null
                    }
                    <Button  href='/index.html#/ExpiringClientList' className='TYPE1-BUTTON'>合同到期({dataList.statusStopCount})</Button>
                    
                    <Button className="btn1-sub" href='/index.html#/ChangeHistorys/DEALER_DELETE'>变更历史</Button>
                    
                    <Dropdown overlay={<Menu>
                        <Menu.Item>
                            <a href="/index.html#/CustomFields">自定义字段</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={() => that.setTableStatus(true)}>设置表格</a>
                        </Menu.Item>

                    </Menu>}>
                        <Icon type="setting" />
                    </Dropdown>
                </div>
            </div>
            <div style={{ padding: '11px 10px 0px 10px' }}>
                <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
            </div>
            <div className='content-tab'>
                <Table rowKey='id' pagination={false} scroll={{ x: (that.formatColumn().length * 200)+100 }} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList.dealer_list} />
                <div className='footer'>
                    <div className='info'>
                        {`共 ${totalNum} 条记录 `}
                        &nbsp;&nbsp;
                    {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                    </div>
                    <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                </div>
            </div>
            <SetTable onSubmit={(data) => that.onSortSubmit(data)} onSortList={(data) => that.onSortList(data)} oCheckitem={(e, key, item, index) => that.oCheckitem(e, key, item, index)} data={setTableData} visible={setTableStatus} setTableStatus={(bl) => that.setTableStatus(bl)} clazzName='set-table' />
            <InviteLink that={that} />
            <AddModal that={that} />
            <FullSpin spinning={spinning} />
            <ClientDetail ref={that.ClientDetail} />
        </div>
    )
})

const AddModal = ThatMain((that) => {
    let { addModalStatus, clientNames,tokenSeparators } = that.state;
    
    return (
        <Modal
            maskClosable={false} 
            title={'新增'}
            wrapClassName='boxModal'
            visible={addModalStatus}
            onOk={() => that.onSubClients()}
            onCancel={() => that.addModalStatus(false)}
            okButtonProps={{className:'btn2-main'}}
            cancelButtonProps={{className:'btn2-sub'}}
        >
            <div className='Selectbox'>
                <p>
                   
                    客户名称:
                   
                </p>
                <TagInput
                    className=''
                    style={{width: 376,height:300}}
                    value={clientNames}
                    placeholder=' 请输入客户公司名称,一行一个，可多个，最多300个.'
                    onChange={(value) => that.addClientChange(value)}
                    maxText={64}
                />
                
            </div>
            <div className='alertbox'>
                <p>说明:</p>
                <p>为了保证信息匹配精准度，请输入客户公司的全称。暂不支持非公司类型客户。</p>
            </div>

        </Modal>)
})
const InviteLink = ThatMain((that) => {
    let { inviteLinkStatus, linkSwitch, dataList } = that.state;

    return (
        <Modal
            maskClosable={false} 
            title={'邀请链接'}
            visible={inviteLinkStatus}
            footer={[
                <Button className="btn2-sub noneFloat" key="back" onClick={() => that.inviteLinkStatus(false)}>取消</Button>,
            ]}
            onCancel={() => that.inviteLinkStatus(false)}
        >

            <div className='inviteLinkbox'>
                <div className='item'>
                    <span className='title'>邀请状态：</span>
                    <p>
                        <Switch checked={linkSwitch} onChange={(checked) => that.inviteLinkSwitch(checked)} />
                        <span style={{ marginLeft: '20px', color: '#999' }}>关闭后，邀请链接将失效。</span>
                    </p>
                </div>
                <div className='item'>
                    <span className='title'>邀请链接：</span>
                    <p>
                        <Input disabled={!linkSwitch} onChange={() => null} value={`${window.location.origin}/user.html#/Registered/${dataList.bmainCustomer ? dataList.bmainCustomer.invitecode : null}`} />
                    </p>
                </div>
                <div className='item' style={{ padding: '0 0 50px 100px' }}>
                    <CopyToClipboard text={`${window.location.origin}/user.html#/Registered/${dataList.bmainCustomer ? dataList.bmainCustomer.invitecode : null}`}
                        onCopy={() => message.success('链接成功复制至粘贴板')}>
                        <Button disabled={!linkSwitch}>复制邀请链接</Button>
                    </CopyToClipboard>
                </div>
            </div>
        </Modal>)
})

export default Tpl