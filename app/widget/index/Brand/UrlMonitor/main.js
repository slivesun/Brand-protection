import Tpl from './tpl';
import { message, Badge, Dropdown, Icon, Divider, Menu, Modal } from 'antd';
const confirm = Modal.confirm;
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalNum: 0,
            itemlink: null,
            shop_name: null,
            oldSearch:{
                itemlink:null,
                shop_name:null,
            },
            dataList: [],
            selectedRowKeys: [],

            targetEdit: {},
            editItemStatus: false,
        }
    }
    componentDidMount() {

        this.getList()

    }
    onEditItem = (e) => {
        let { targetEdit } = this.state;
        if (isNaN(+e.target.value)) {
            return
        }
        targetEdit.itemprice = e.target.value;
        this.setState({
            targetEdit
        })
    }
    onTableCheckChange = (selectedRowKeys, selectedRows) => {
        let setArr = new Set(selectedRowKeys);
        this.setState({
            selectedRowKeys: [...setArr],
            checkAll: false
        });
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
    formatColumn = () => {
        return [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, item, index) =><Badge count={item.islowprice ? '低' : null}> {index + 1}</Badge>
            },
            {
                title: '监控信息',
                dataIndex: 'itemtitle',
                key: 'itemtitle',
                render: (text, item, index) => {
                    return (
                        <React.Fragment>
                            
                            <p style={{ maxWidth: '500px' }}>{text}</p>
                            
                            <p style={{ width: '500px' }}><a target='_blank' href={item.itemlink}>{item.itemlink}</a></p>
                        </React.Fragment>
                    )
                }
            },
            {
                title: '店铺名称',
                dataIndex: 'shopname',
                key: 'shopname',
                render: (text, item, index) => {
                    return (
                        <React.Fragment>
                            <p style={{ padding: '10px 0px 0px' }}>{text}</p>
                            <p style={{ padding: '5px 0px' }}>
                                {
                                    item.platform == '天猫' ?
                                        <img style={{ verticalAlign: 'bottom', paddingRight: '10px' }} src='../../../img/icon/Tmall.png' />
                                        :
                                        <img style={{ verticalAlign: 'bottom', paddingRight: '10px' }} src='../../../img/icon/Taobao.png' />
                                }
                                {
                                    item.dealer_id && item.dealer_id > 0 ?
                                    <img style={{verticalAlign:'middle'}} width="52" height="15" src="../../../../img/Authorized.png" />
                                        : null
                                }
                            </p>
                        </React.Fragment>
                    )
                }
            },
            {
                title: '限价',
                dataIndex: 'itemprice',
                key: 'itemprice',
                render: (text, item, index) => text
            },
            {
                title: '状态',
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
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                align: 'right',
                render: (text, item, index) => <div>
                    <a href={`/index.html#/InfoMonitor/${item.id}`}>
                        <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_Details.png' />
                        详情
                    </a>
                    <Divider type="vertical" />
                    <Dropdown overlay={<Menu>
                        <Menu.Item>
                            <a className='A-COLOR' onClick={e => this.ChangeHis(item)}>
                                <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_history.png' />

                                变更历史
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className='A-COLOR' onClick={e => this.editItemStatus(true, item)}>
                                <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_edit.png' />

                                编辑
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className='A-COLOR' onClick={e => this.rmItem(item)}>
                                <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_del.png' />

                                删除
                            </a>
                        </Menu.Item>
                    </Menu>}>
                        <a >···&nbsp;更多</a>
                    </Dropdown>
                </div>,
            }

        ]
    }
    editItemStatus = (bl, item = {}) => {
        this.setState({
            editItemStatus: bl,
            targetEdit: Object.assign({}, item)
        })
    }
    ChangeHis = (item) => {
        window.location = "/index.html#/ChangeHistoryx/MonitorLink/" + item.shopname + "/" + item.itemid
    }
    editItemSubmit = () => {
        let { targetEdit } = this.state;
        if (targetEdit.itemprice.length == 0) {
            message.error('限价不能为空')
            return
        }
        ajax.post('/hcm/monitorLink/Edit', {
            id: targetEdit.id,
            itemprice: targetEdit.itemprice,
        })
            .then((response) => {
                if (response.data.status == '10000') {
                    this.getList()
                    this.editItemStatus(false)
                    message.success(response.data.message);
                }else{
                    message.error(response.data.message);
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });
    }
    checkAll = (bl) => {
        let selectedRowKeys = this.state.selectedRowKeys;
        if (bl) {
            this.state.dataList.forEach((item, index) => {
                selectedRowKeys.push(item.id)
            })

        } else {
            selectedRowKeys = []
        }
        this.setState({
            checkAll: bl,
            selectedRowKeys: selectedRowKeys
        })
    }
    rmAll = () => {

        let { selectedRowKeys, checkAll, totalNum } = this.state;
        if (selectedRowKeys.length == 0) {
            message.error('至少选择一条');
            return
        }
        let { itemlink, shop_name } = this.state.oldSearch;
        let that = this;
        let data = {
            ids: checkAll ? 'checkAll' : selectedRowKeys.join(','),
            itemlink: checkAll ? itemlink : '',
            shop_name: checkAll ? shop_name : '',
        }
        confirm({
            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除勾选的 {checkAll ? totalNum : selectedRowKeys.length} 项监控信息吗？</p><p>删除后<span className='red'>相关的低价记录将会被删除</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className: 'btn2-sub'},
            onOk() {
                ajax.post('/hcm/monitorLink/DeleteBatch', data)
                    .then((response) => {
                        if (response.data.status == '10000') {
                            that.onSearch(true)
                            message.success(response.data.message);
                        }
                    })
                    .catch((error) => {
                        message.error(error.statusText);
                    });
            },

        });

    }
    rmItem = (item) => {
        let that = this;
        confirm({
            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除该监控信息吗？</p><p>删除后<span className='red'>相关的低价记录将会被删除</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className: 'btn2-sub'},
            onOk() {
                ajax.post('/hcm/monitorLink/Delete', {
                    id: item.id,
                    itemlink: item.itemlink,
                    shopname: item.shopname,
                    itemprice: item.itemprice,
                })
                    .then((response) => {
                        if (response.data.status == '10000') {
                            that.getList()
                            message.success(response.data.message);
                        }else{
                            message.error(response.data.message);
                        }
                    })
                    .catch((error) => {
                        message.error(error.statusText);
                    });
            },

        });
    }
    onSearch = (bl=false) => {
        this.setState({
            pageNo: 1,
            itemlink: bl ? null : this.state.itemlink,
            shop_name:bl ? null : this.state.shop_name,
            oldSearch:{
                itemlink: bl ? null : this.state.itemlink,
                shop_name:bl ? null : this.state.shop_name,
            },
        }, () => {
            this.getList()
        })
    }
    getList = () => {
        let { pageNo, pageSize, itemlink, shop_name } = this.state;
        ajax.get('/hcm/monitorLink/GetList', {
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
                itemlink: itemlink,
                shop_name: shop_name,
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                pageNo: data.pageNumber,
                pageSize: data.pageSize,
                totalNum: data.totalElements,
                dataList: data.content,
                selectedRowKeys: []
            })

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    chSearchIpt = (e, type) => {
        let state = this.state;
        if (e && e.target && e.target.nodeName == "INPUT") {
            state[type] = e.target.value;
        } else {
            state[type] = e;
        }
        this.setState(state)

    }

    handleClearIconClick = (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
