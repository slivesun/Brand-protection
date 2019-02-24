import Tpl from './tpl';
import { Modal, message,Divider, Menu, Dropdown, Icon,Tooltip } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.ClientDetail = React.createRef()
        this.state = {
            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalNum: 0,

            dealername: null,
            bossid: null,
            takePeople: null,
            contact: null,
            memoDealername: null,

            oldSearch:{
                dealername: null,
                bossid: null,
                takePeople: null,
                contact: null,
                memoDealername: null,

            },

            spinning: false,
            selectedRowKeys: [],
            setTableStatus: false,
            addModalStatus: false,
            inviteLinkStatus: false,
            linkSwitch: false,
            clientNames: [],
            dataList: {}
        }
    }
    componentDidMount() {
        this.getList()
        this.getColumn()
    }
    onSearch= (bl=false) =>{
        this.setState({
            pageNo:1,
            dealername:   bl ? null : this.state.dealername,
            bossid:   bl ? null : this.state.bossid,
            takePeople:  bl ? null : this.state.takePeople,
            contact:   bl ? null : this.state.contact,
            memoDealername:  bl ? null : this.state.memoDealername,
            oldSearch:{
                dealername:   bl ? null : this.state.dealername,
                bossid:   bl ? null : this.state.bossid,
                takePeople:  bl ? null : this.state.takePeople,
                contact:   bl ? null : this.state.contact,
                memoDealername:  bl ? null : this.state.memoDealername,
            },
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let { dealername, bossid, takePeople, contact, memoDealername } = this.state;
        ajax.get('/hcm/dealer/getlist', {
            params: {
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                dealername: dealername,
                bossid: bossid,
                takePeople: takePeople,
                contact: contact,
                memoDealername: memoDealername,
            }
        }).then((response) => {
            let dataList = response.data.data;
            this.setState({
                dataList: dataList,
                pageNo: dataList.page_info.pageNo,
                pageSize: dataList.page_info.pageSize,
                linkSwitch: dataList.bmainCustomer.invitestatus == '0' ? false : true,
                checkAll: false,
                selectedRowKeys: [],
                totalNum: dataList.page_info.totalNum,
            })

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getColumn = () => {
        ajax.get('/hcm/hcmCustomModel/getBybmcidAndModule', {
            params: {
                module: 'DEALER',
            }
        }).then((response) => {
            this.setState({
                setTableData: response.data.data
            })

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    chSearchIpt = (e, type) => {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)

    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    formatColumn = () => {
        let arr = []
        let column = [{
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            fixed: 'left',
            width:'80px',
            render: (text, record, index) => <div style={{width:'80px'}}>{index + 1}</div>
        }]
        let data = this.state.setTableData;
        for (const key in data) {
            data[key].data.forEach((item, index) => {
                if (item.isChecked) {
                    item.target = [key, index, item.fieldRequired]
                    return (
                        arr.push(item)
                    )
                }

            })
        }
        arr.sort((a, b) => a.sort - b.sort)
        arr.forEach((item, index) => {
            column.push({
                title: item.fieldname,
                dataIndex: item.fieldvalue,
                key: item.fieldvalue,
                width:arr.length >4?  item.fieldvalue === 'dealername' ? '400px' : '200px': `${100/arr.length}%`,
                render: (text, record, index) => {

                    return (
                        item.fieldtype == 'DATE' ?
                            text ? moment(text).format('YYYY-MM-DD') : text
                            :
                            (item.fieldvalue === 'dealername' ?
                                
                                    
                                    JSON.stringify(record.status_info) == '{}' ?
                                        <a className='tab-a-text' onClick={()=>this.ClientDetail.current.onShow(record.id)}>{text}</a>
                                        :
                                        <div>
                                            <a  className='tab-a-text' href={`/index.html#/ClientDetail/${record.id}`}>{text}</a>
                                            <Tooltip placement="bottom" title={record.status_info.info}>
                                            <span className={record.status_info.info_type}>{record.status_info.title}</span>
                                            </Tooltip>
                                        </div>
                                :
                                
                                <div className='table-tb-box'>
                                    <Tooltip placement="bottom" title={text}>
                                        {text}
                                    </Tooltip>
                                </div>
                            )
                    )
                }

            })
        })
        column.push({
            title: <div className='action'>
                <span>操作</span>
                
            </div>,
            key: 'action',
            fixed: 'right',
            width:'160px',
            render: (text, record, index) => (
                <div className='action'>
                    <a href={`/index.html#/CustomerEditor/${record.id}`}>
                        <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_edit.png' />
                        编辑
                    </a>
                    <Divider type="vertical" />
                    <Dropdown overlay={<Menu>
                        <Menu.Item>
                            <a className='A-COLOR' href={`/index.html#/ChangeHistorys/DEALER/${record.dealername}/${record.id}`}>
                            <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_history.png' />
                            变更历史
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className='A-COLOR' style={{color:'#1890ff'}} onClick={() => this.allStopConfirm('item', record.id)}>
                            <img style={{verticalAlign:'text-bottom',paddingRight:'4px'}} src='../../../img/icon/icon_operating_Release.png' />
                            解约
                            </a>
                        </Menu.Item>
                        {/* <Menu.Item>
                            <a onClick={() => this.allRmConfirm('item', record.id)}>删除</a>
                        </Menu.Item> */}
                    </Menu>}>
                        <a className="ant-dropdown-link">
                            ···&nbsp;更多
                        </a>
                    </Dropdown>
                </div>
            )
        })
        return column
    }
    addModalStatus = (bl) => {
        this.setState({
            addModalStatus: bl,
            clientNames: [],
        })
    }
    addClientChange = (value) => {
        this.setState({
            clientNames: value
        })
    }
    onSubClients = () => {
        if(this.state.clientNames.length > 300){
            message.error(
                <span>客户名称数量每次最多添加300个！当前数量为<span>{this.state.clientNames.length}</span></span>
            )
            return
        }
        this.setState({
            spinning: true
        }, () => {
            ajax.post('/hcm/dealer/create', {
                dealernameList: JSON.stringify(this.state.clientNames)
            }).then((response) => {
                if(response.data.data.dbRepeateSet.length){
                    response.data.data.dbRepeateSet.forEach(item=>{
                        message.error(`已有名为${item}的客户，请勿重复添加`);
                    })
                }else{
                    this.setState({
                        clientNames:[]
                    })
                }
                this.setState({
                    spinning: false,
                    addModalStatus: false,
                    
                }, () => {
                    this.getList()
                    if(response.data.data.insertSet.length){
                        message.success(response.data.message)
                    }
                })
            }).catch((error) => {

                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })
    }
    //---
    inviteLinkStatus = (bl) => {
        this.setState({
            inviteLinkStatus: bl
        })
    }
    inviteLinkSwitch = (checked) => {
        this.setState({
            linkSwitch: checked
        }, () => {
            ajax.get('/hcm/cus/changeInviteStatus', {
                params: {
                    invitecode: this.state.dataList.bmainCustomer.invitecode,
                    status: this.state.linkSwitch ? 1 : 0,
                }
            }).then((response) => {
                this.getList()
            }).catch((error) => {
                message.error(error.statusText);
            });
        })
    }

    setTableStatus = (bl) => {
        this.setState({
            setTableStatus: bl
        }, () => {
            if (bl == false) {
                this.getColumn()
            }

        })
    }
    num = 100
    oCheckitem = (e, key, item, index) => {
        let setTableData = this.state.setTableData;
        setTableData[key].data[index].isChecked = e.target.checked ? 1 : 0;
        setTableData[key].data[index].sort = this.num++
        this.setState({
            setTableData: setTableData
        })
    }
    onSortList = (data) => {
        this.setState({
            setTableData: data
        })
    }
    onSortSubmit = (data) => {
        let arr = [];
        data.forEach((item, index) => { arr.push(item.id) })
        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/hcmCustomModel/saveSort', {
                params: {
                    ids: arr.join(','),
                    module: 'DEALER'
                }
            }).then((response) => {
                if (response.data.status == '10000') {
                    this.getColumn()
                    this.setTableStatus(false)
                }

                this.setState({
                    spinning: false
                })

            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })

    }
    onTableCheckChange = (selectedRowKeys) => {
        // console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys: selectedRowKeys,
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
    checkAll = (bl) => {
        let selectedRowKeys = this.state.selectedRowKeys;
        if (bl) {
            this.state.dataList.dealer_list.forEach((item, index) => {
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
    allStop = (type, id) => {
        let { selectedRowKeys, checkAll } = this.state;

        let params = {}
        if (type == 'all') {
            let { dealername, bossid, takePeople, contact, memoDealername } = this.state.oldSearch;
            
            params = {
                ids : selectedRowKeys.join(','),
                checkAll : checkAll,
                dealername:   !checkAll ? null : dealername,
                bossid:   !checkAll ? null : bossid,
                takePeople:  !checkAll ? null : takePeople,
                contact:   !checkAll ? null : contact,
                memoDealername:  !checkAll ? null : memoDealername,
                
            }
        } else {
            params.ids = id
            params.checkAll = false
        }

        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/dealer/stop', {
                params: params
            }).then((response) => {

                this.setState({
                    spinning: false,
                    selectedRowKeys:[]
                }, () => {
                    message.success(response.data.message);
                    if (response.data.status == '10000') {
                        this.getColumn()
                        this.onSearch(true)
                    }
                })

            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })

    }

    allRm = (type, id) => {
        let { selectedRowKeys, checkAll } = this.state;
        let params = {}
        if (type == 'all') {
            params.ids = selectedRowKeys.join(',')
            params.checkAll = checkAll
        } else {
            params.ids = id
            params.checkAll = false
        }

        this.setState({
            spinning: true
        }, () => {
            ajax.get('/hcm/dealer/delete', {
                params: params
            }).then((response) => {
                this.setState({
                    spinning: false
                }, () => {

                    if (response.data.status == '10000') {
                        this.getColumn()
                        this.getList()
                    }
                    message.success(response.data.message);
                })

            }).catch((error) => {
                this.setState({
                    spinning: false
                })
                message.error(error.statusText);
            });
        })

    }
    allStopConfirm = (type, id) => {
        let { checkAll, totalNum, selectedRowKeys } = this.state;
        if (!selectedRowKeys.length && type == 'all') {
            message.error('至少选择一条');
            return
        }
        Modal.confirm({
            title: null,
            maskClosable: false,
            content: type == 'all' ?
                <div>
                    <div className='tips'>提示</div>
                    <div className='pline'></div>
                    <p className='Dtitle'>你确认要将勾选的<span className='red'>{checkAll ? totalNum : selectedRowKeys.length}</span>项客户移入解约吗？</p>
                    <p>解约后<span className='red'>将与客户取消合作关系</span></p>
                </div>
                :
                <div>
                    <div className='tips'>提示</div>
                    <div className='pline'></div>
                    <p className='Dtitle'>你确认要将该客户移入解约吗</p>
                    <p>解约后<span className='red'>将与客户取消合作关系</span></p>
                </div>,
            okText: '确定',
            cancelText: '取消',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className: 'btn2-sub'},
            className:'alert-item-confirm',
            onOk: () => this.allStop(type, id),
        });
    }
    allRmConfirm = (type, id) => {
        let { checkAll, totalNum, selectedRowKeys } = this.state;
        if (!selectedRowKeys.length && type == 'all') {
            message.error('至少选择一条');
            return
        }
        Modal.confirm({
            title: null,
            maskClosable: false,
            content: type == 'all' ?
                <div>
                    <div className='tips'>提示</div>
                    <div className='pline'></div>
                    <p>你确认要删除勾选的<span className='red'>{checkAll ? totalNum : selectedRowKeys.length}</span>项客户信息吗</p>
                    <p>删除后<span className='red'>相关客户信息将无法找回</span></p>
                </div>
                :
                <div>
                    <div className='tips'>提示</div>
                    <div className='pline'></div>
                    <p>你确认要删除该客户信息吗？</p>
                    <p>删除后<span className='red'>相关客户信息将无法找回</span></p>
                </div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm YellowWhite',
            onOk: () => this.allRm(type, id),
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
