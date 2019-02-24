
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Tooltip, Popover, Breadcrumb, Input, Button, Table, Pagination,Icon } from 'antd';
import lib from '../../../../js/common/lib'
const Search = Input.Search;
const Tpl = ThatMain((that) => {
    let { pagination, list ,keyWord} = that.state;

    const columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        fixed: 'left',
        width: '70px',
        className: 'text-center',
        render: (text, record, index) => index + 1
    }, {
        title: '平台',
        dataIndex: 'platform',
        key: 'platform',
        width: '150px'
    }, {
        title: '商品ID',
        dataIndex: 'num_iid',
        key: 'num_iid',
        width: '200px'
    }, {
        title: '主图',
        dataIndex: 'pic_url',
        key: 'pic_url',
        width: '100px',
        render: (text, record, index) => {
            let title = (
                <div className='text-center'>
                    <a target='_blank' href={text}>查看原图</a>
                </div>

            )
            let content = (
                <div >
                    <img style={{ width: '200px' }} src={text} />
                </div>
            )
            return (
                text.length ? 
                    <Popover content={content} title={title} trigger="hover">
                        <a target='_blank' href={text}>查看</a>
                    </Popover>
                :
                '--'
            )
        }
    }, {
        title: '商品标题',
        dataIndex: 'title',
        key: 'title',
        width: '300px',
        render: (text='', record, index) => {
            text = text ? text : ''
            return (

                <a target='_blank' href={record.item_url}>
                    <Tooltip title={text}>
                        {text.substring(0, 15)}{text.length > 15 ? '...' : null}
                    </Tooltip>
                </a>

            )
        }
    }, {
        title: '原价',
        dataIndex: 'price',
        key: 'price',
        width: '150px',
        className: 'text-right',
        render: (text, record, index) => lib.formatThousandMoney(text)

    }, {
        title: '价格',
        dataIndex: 'discount_price',
        key: 'discount_price',
        width: '150px',
        className: 'text-right',
        render: (text, record, index) => lib.formatThousandMoney(text)
    }, {
        title: '手机端价',
        dataIndex: '',
        key: '',
        width: '150px',
        className: 'text-right',
    }, {
        title: '邮费',
        dataIndex: '',
        key: '',
        width: '100px',
        className: 'text-right',
    }, {
        title: '库存数量',
        dataIndex: '',
        key: '',
        width: '100px',
        className: 'text-right',
    }, {
        title: '聚划算',
        dataIndex: '',
        key: '',
        width: '100px'
    }, {
        title: '商品类目',
        dataIndex: '',
        key: '',
        width: '200px'
    }, {
        title: '店铺名称',
        dataIndex: 'shopname',
        key: 'shopname',
        width: '200px',
        render: (text, record, index) => {
            text = text ? text : ''
            return (
                <Tooltip title={text}>
                    {text.substring(0, 8)}{text.length > 8 ? '...' : null}
                </Tooltip>
            )
        }
    }, {
        title: '旺旺名称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: '150px',
        render: (text='', record, index) => {
            text = text ? text : ''
            return (
                <Tooltip title={text}>
                    {text.substring(0, 8)}{text.length > 8 ? '...' : null}
                </Tooltip>
            )
        }
    }, {
        title: '所在省',
        dataIndex: 'state',
        key: 'state',
        width: '100px'
    }, {
        title: '所在市',
        dataIndex: 'area',
        key: 'area',
        width: '100px'
    }];
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        paddingRight:'20px',
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
        <div className='data-search'>
            <div className='content'>
                <div className='Breadcrumbbox'>
                    <Breadcrumb className='Breadcrumb'>
                        <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                        <Breadcrumb.Item>数据检索</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className='search-box'>
                    <Search
                        placeholder='请输入商品标题'
                        enterButton="搜索"
                        size="default"
                        suffix={clearIcon('keyWord')}
                        className='search-input'
                        onChange={e=>that.changeSearch(e)}
                        value={keyWord}
                        onSearch={e => that.getData(true)}
                    />
                    {/* <Button >下载数据</Button> */}
                </div>
                {
                    list.length ?
                        <div className='table-box'>
                            <Table rowKey='itemlistid' scroll={{ x: 2200 }} pagination={false} dataSource={list} columns={columns} />
                            <div className='footer'>
                                <div className='info'>
                                {`共 ${pagination.total} 条记录 `}
                                    &nbsp;&nbsp;
                                {`第  ${pagination.page}  / ${Math.ceil(pagination.total / pagination.pageSize)} 页`}
                                </div>
                                <Pagination pageSize={pagination.pageSize} current={pagination.page} total={pagination.total} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                            </div>
                        </div>
                    : 
                        <p style={{width:'100%'}} className='text-center'>暂无数据</p>
                }

            </div>
            <Copyright />
        </div>
    )
})
export default Tpl