import Tpl from './tpl';
import { message, Menu, Dropdown, Divider, Modal, Button } from 'antd';
import ajax from '../../../../js/common/ajax';
const confirm = Modal.confirm;
class App extends React.Component {
    constructor(props) {
        super(props)
        let { id, name } = this.props.match.params;
        this.state = {
            id,
            name,
            fileList: [],
            percent: null,
            uploading: false,
            uploadVisible: false,
            formatColumn: [],
            selectedRowKeys: [],


            addStatus: false,
            visible: false,
            dataList: [],

            setTableVisible: false,

            brandName: null,
            productName: null,
            oldSearch:{
                brandName: null,
                productName: null,

            },

            pageNo: 1,
            pageSize: 10,
            checkAll: false,
            totalElements: null,
        }
    }
    componentDidMount() {
        this.getList()
        this.getByProduct()
        let { id } = this.state;
        //已读
        ajax.get('/hcm/productread/create', {
            params: {
                classifyId: id,
            }
        })
    }
    onSearch = (bl=false) => {
        this.setState({
            pageNo: 1,
            brandName:  bl ? null : this.state.brandName,
            productName: bl ? null : this.state.productName,
            oldSearch:{
                brandName:  bl ? null : this.state.brandName,
                productName: bl ? null : this.state.productName,
            },
        }, () => {
            this.getList()
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
    onChange = (e, type) => {
        let state = this.state;
        state[type] = e.target.value
        this.setState(state)
    }
    handleClearIconClick = (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    getList = () => {
        let { pageNo, pageSize, brandName, productName, totalNum, id } = this.state;
        ajax.get('/hcm/hcmProduct/getPageBybmcid', {
            params: {
                brandName: brandName,
                productName: productName,
                classifyid: id,
                pageNo: pageNo,
                pageSize: pageSize,
            }
        }).then((response) => {
            let { content, pageNumber, pageSize, totalElements, obj } = response.data.data;
            this.setState({
                selectedRowKeys: [],
                setTableVisible: obj == 1 ? false : true,
                dataList: content,
                pageNumber,
                pageSize,
                totalElements
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    rmAll = () => {
        let that = this;
        let { checkAll, selectedRowKeys, id, totalElements } = this.state;
        let { brandName,productName} = this.state.oldSearch;
        if (selectedRowKeys.length == 0) {
            message.error('至少选择一条')
            return
        }
        confirm({
            title: null,
            content: <div>
                        <div className='tips'>提示</div>
                        <div className='pline'></div>
                        <p className='Dtitle'>你确认要删除勾选的{checkAll ? totalElements : selectedRowKeys.length}项公示信息吗？</p>
                        <p>删除后<span className='red'>相关公示信息将无法找回</span></p>
                    </div>,
            okText: '确定',
            cancelText: '取消',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            className:'alert-item-confirm',
            onOk() {
                ajax.get('/hcm/hcmProduct/delete', {
                    params: {
                        classifyId: id,
                        hcmProductIds: checkAll ? 'checkAll' : selectedRowKeys.join(','),
                        brandName: checkAll ? brandName : '',
                        productName: checkAll ? productName : '',
                    }
                }).then((response) => {
                    message.success(response.data.message);
                    that.onSearch(true)

                }).catch((error) => {
                    message.error(error.statusText);
                })
            }
        })

    }
    rmItem = (item) => {
        let { id } = this.state;
        let that = this;
        confirm({
            title: null,
            content: <div>
                        <div className='tips'>提示</div>
                        <div className='pline'></div>
                        <p className='Dtitle'>你确认要删除该公示信息吗？</p>
                        <p>删除后<span className='red'>相关公示信息将无法找回</span></p>
                </div>,
            okText: '确定',
            cancelText: '取消',
            okButtonProps: {className:'btn2-main'},
            cancelButtonProps: {className:'btn2-sub'},
            className:'alert-item-confirm',
            onOk() {
                ajax.get('/hcm/hcmProduct/delete', {
                    params: {
                        classifyId: id,
                        hcmProductIds: item.id
                    }
                }).then((response) => {
                    message.success(response.data.message);
                    that.getList()

                }).catch((error) => {
                    message.error(error.statusText);
                });
            }
        })

    }
    getByProduct = () => {
        ajax.get('/hcm/hcmCustomModel/getByProduct', {
            params: {
                productClassifyid: this.state.id
            }
        }).then((response) => {
            let productList = response.data.data;
            this.setState({
                formatColumn: this.formAtDom(productList)
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }

    formAtDom = (data) => {
        let { name, id, setTableVisible } = this.state;
        let arr = [{
            title: '序号',
            dataIndex: 'index',
            fixed: 'left',
            sort: 0,
            width: 80,
            key: 'index',
            render: (text, item, index) => index + 1,
        }];
        for (const key in data) {
            data[key].data.forEach((item, index) => {
                if (item.isChecked) {
                    item.target = [key, index, item]
                    return (
                        arr.push({
                            title: item.fieldname,
                            dataIndex: item.fieldvalue,
                            key: item.id,
                            sort: item.sort,
                            className: 'item-column',
                            render: (text, item, index) => text ? text : '--'
                        })
                    )
                }

            })
        }
        arr.push({
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            sort: 999999,
            width: 180,
            align: 'center',
            fixed: 'right',
            render: (text, item, index) => <div>
                <a href={`index.html#/ActionPriceInfo/${id}/${setTableVisible}/${name}/${'edit'}/${item.id}`}>
                    <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating_edit.png' />
                    编辑
                </a>
                <Divider type="vertical" />
                <Dropdown overlay={<Menu>
                    <Menu.Item>
                        <a className='A-COLOR' onClick={() => this.rmItem(item)}>
                            <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating_del.png' />
                            删除
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a className='A-COLOR' onClick={() => this.ChangeHis(item)}>
                            <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_history.png' />
                            变更历史
                        </a>
                    </Menu.Item>
                </Menu>}>
                    <a >··· &nbsp;更多</a>
                </Dropdown>
            </div>,
        })
        return arr
    }
    ChangeHis = (item) => {
        window.location = "/index.html#/ChangeHistorys/Product/" + item.brand_name + "/" + item.id
    }
    ProduHistory = () => {
        window.location = "/index.html#/ChangeHistory/HcmCustomModel/" + this.props.match.params.id + "/TYpe"
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
    handleUpload = () => {
        const { fileList, id } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
            formData.append('classifyId', id);
        });

        this.setState({
            uploading: true,
        });
        ajax({
            method: 'post',
            url: '/hcm/hcmProduct/readExcelFile',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

                this.setState({
                    percent: percentCompleted
                })
            }
        })
            .then((rep) => {
                this.setState({
                    fileList: [],
                    uploading: false,
                    uploadVisible: false,
                });
                this.getList()
                if(rep.data.status=='10000'){
                    message.success(rep.data.message);
                }else{
                    message.warning(rep.data.message);
                }
                
            })
            .catch(() => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            });
    }
    propsUpload = () => {
        return {
            action: '/hcm/hcmProduct/readExcelFile',
            accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(() => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        }
    }
    onuploadVisible = (bl) => {
        this.setState({
            uploadVisible: bl,
            fileList: [],
            uploading: false,
            percent: null
        })
    }
    onShowSetTable = (bl, type) => {
        if (type == 'getlist') {
            this.getByProduct()
            this.onSearch()
        }
        this.setState({
            setTableVisible: bl
        })
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
