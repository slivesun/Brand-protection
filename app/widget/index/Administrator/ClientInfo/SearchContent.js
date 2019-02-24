
import FullSpin from '../../../components/FullSpin';
import axios from '../../../../js/common/ajax';
import lib from '../../../../js/common/lib';
import TagInput from '../../../components/TagInput/main'
import { Breadcrumb, message, Input, Button, Table, Icon, Popconfirm, Modal, Tooltip, Select } from 'antd';
const alert = '请先保存或取消编辑新增状态的条目';
const alert_success = '成功';
const nameAlert = '品牌名不能为空';
const keywordnameAlert = '关键字不能为空';
const categoryAlert = '类目名不能为空';
const catAlert = '淘宝cat值不能为空';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addData: {
                key: 'add',
                spinning: false,
                state: false,
                name: null,
                category: null,
                cat: null,
                catidJd: null,
            },
            addKeyState: false,
            expandedRowKeys: [],
            editKey: [],
            brand_list: [],
            addModalStatus: false,
            clientNames: [],
            spinning: false,
            bl: "",
            LeiM: null,
            TBCat: null,
            JDCat: null,
            brandId: "",
            myFuntions: ""

        }
    }
    reset() {

        this.setState({
            addData: {
                key: 'add',
                spinning: false,
                state: false,
                name: null,
                category: null,
                cat: null,
                catidJd: null,
                type:"",
                ClientInfos:""
            }
        })
    }
    componentDidMount() {
       // console.log( this)
        this.setState({
            ClientInfos: this.props.statex
        }, () => {
            //console.log(this.props.statex)
            if (this.props.statex == "/ClientInfos") {
                this.setState({
                    type: "jingpin"
                }, () => {

                    console.log(this.state.type)
                    this.getData()
                })
            } else {
                this.setState({
                    type: ""
                }, () => {
                    console.log(this.state.type)
                    this.getData()
                })
            }
        })
    }
    getData() {

        axios.post('/hcm/cus/get_cus_detail_list',{
                 type:this.state.type
        })
            .then((response) => {
                if (response.data.status == '10000' && response.data.data.brand_list) {
                    this.setState({
                        brand_list: this.formatData(response.data.data.brand_list ? response.data.data.brand_list : [])
                    })
                } else {
                    message.error(response.data.message);
                }

            })
            .catch((error) => {
                message.error(error.message);
            });
    }
    formatData(data) {
        let num = Math.random()
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
            let { bid: brandId, name: brandName, updatetime: updateTime, level: level, catidJd, keyword_list: keywordList } = data[i];
            // let { brandId,brandName,updateTime,level,keywordList} = data[i];
            let newKeyword = [];
            for (let n = 0; n < keywordList.length; n++) {
                // let { keywordId,keywordname,catid ,catname,level,categoryList} = keywordList[n];
                let { keyword_id: keywordId, keywordname, catid, catname, level, catidJd, category_list: categoryList, kid } = keywordList[n];
                let children = categoryList.length ? [] : null;
                for (let x = 0; x < categoryList.length; x++) {
                    let { catid, catname, level, kid, catidJd } = categoryList[x];
                    children.push({
                        "brandId": brandId,
                        "index": [i, n, x],
                        "key": `${catid}${catname}${kid}${x}`,
                        "keywordId": keywordId,
                        "kid": kid,
                        "catid": catid,
                        "catidJd": catidJd,
                        "keywordname": keywordname,
                        "catname": catname,
                        "level": level,
                        "celData": {
                            "catid": catid,
                            "catidJd": catidJd,
                            "catname": catname,
                        },
                    })
                }

                newKeyword.push({
                    "celData": {
                        "keywordname": keywordname,
                        "catid": catid,
                        "catidJd": catidJd,
                        "catname": catname,
                    },
                    "index": [i, n],
                    "kid": kid,
                    "key": `${keywordname}${keywordId}${kid}${n}`,
                    "keywordId": keywordId,
                    "keywordname": keywordname,
                    "catid": catid,
                    "catidJd": catidJd,
                    "catname": catname,
                    "brandId": brandId,
                    "level": level,
                    "children": children
                })

            }
            newArr.push({
                "celData": {
                    "brandName": brandName,
                    "updateTime": updateTime,
                },
                "key": `${brandName}${brandId}${updateTime}${i}`,
                "brandId": brandId,
                "index": [i],
                "brandName": brandName,
                "updateTime": updateTime,
                "level": level,
                "keywordList": newKeyword
            })
        }
        return newArr
    }


    addBoxState(state) {
        if (!state) {
            this.reset()
        } else {
            let addData = this.state.addData;
            addData.state = state;
            this.setState({
                addData: addData
            })
        }
    }
    addChange(e, type) {
        let addData = this.state.addData;
        addData[type] = e.target.value;
        this.setState({
            addData: addData
        })

    }
    //
    addSubmit() {
        let { name, category, cat, catidJd } = this.state.addData;
        if (name == null || name.length == 0) {
            message.error(nameAlert, 5);
            return
        }
        if (category == null || category.length == 0) {
            message.error(categoryAlert, 5)
            return
        }
        if (cat == null || cat.length == 0) {
            message.error(catAlert, 5)
            return
        }

        if (!lib.legnthCheck(name, 'INPUT')) {
            message.error('品牌名长度不允许超过50');
            return
        }
        if (!lib.legnthCheck(category, 'INPUT')) {
            message.error('类目长度不允许超过50');
            return
        }
        if (!lib.legnthCheck(cat, 'INPUT')) {
            message.error('淘宝Cat值长度不允许超过50');
            return
        }
        if (!lib.legnthCheck(catidJd, 'INPUT')) {
            message.error('京东Cat值长度不允许超过50');
            return
        }




        let addData = this.state.addData;
        addData.spinning = true;
        axios.post('/hcm/cus/save_brand', {
            "brand_name": name,
            "catid": cat,
            "catidJd": catidJd,
            "catname": category,
            "type":this.state.type
        })
            .then((response) => {
                // console.log(response.data.status)
                if (response.data.status == 10000) {
                    message.success(alert_success, 5);
                    addData.name = null;
                    addData.cat = null;
                    addData.category = null;
                    addData.catidJd = null;
                } else {
                    message.error(response.data.message, 5);
                }

                addData.spinning = false;
                this.setState({
                    addData: addData
                }, () => {
                    this.getData()
                })
            })
            .catch((error) => {
                // console.log(error)
                message.error(error.message);
                addData.spinning = false;
                this.setState({
                    addData: addData
                })
            });

    }
    componentWillReceiveProps(nextProps, a) {
        if (this.props.show !== nextProps.show) {
            this.reset()
        }


    }
    onExpand = (expanded, record) => {
        // console.log(expanded, record, this)
        let setArr = new Set(this.state.expandedRowKeys);
        if (expanded) {
            setArr.add(record.key)
        } else {
            setArr.delete(record.key)
        }
        this.setState({
            expandedRowKeys: [...setArr]
        })
    }
    addCategory(record) {

        if (this.state.addKeyState || this.state.editKey.length) {
            message.warning(alert, 5);
            return
        }
        let [a, b, c] = record.index;
        let setArr = new Set(this.state.expandedRowKeys);

        let brand_list = this.state.brand_list;
        let editKey = new Set(this.state.editKey);
        let num = Math.random()
        if (brand_list[a].keywordList[b].children == null) {
            brand_list[a].keywordList[b].children = [{
                "key": num,
                "level": 3,
                "brandId": record.brandId,
                "index": [a, b, 0],
                "keywordId": record.keywordId,
                "keywordname": record.keywordname,
                "catid": null,
                "catidJd": null,
                "catname": null,
                "addKeyword": true
            }]
        } else {
            brand_list[a].keywordList[b].children.unshift({
                "key": num,
                "level": 3,
                "brandId": record.brandId,
                "index": [a, b, 0],
                "keywordId": record.keywordId,
                "keywordname": record.keywordname,
                "catid": null,
                "catidJd": null,
                "catname": null,
                "addKeyword": true
            })
        }

        editKey.add(num)
        setArr.add(record.key)
        this.setState({
            addKeyState: true,
            expandedRowKeys: [...setArr],
            brand_list: brand_list,
            editKey: [...editKey]
        })
    }
    editKeyword(record, bl) {
        if (this.state.addKeyState) {
            message.warning(alert, 5);
            return
        }
        let setArr = new Set(this.state.editKey);
        setArr.add(record.key)
        this.setState({
            editKey: [...setArr]
        })

    }
    cancelKeyword(record) {
        let setArr = new Set(this.state.editKey);
        let brand_list = this.state.brand_list;
        let addKeyState = this.state.addKeyState;
        let [a, b, c] = record.index;
        if (record.addKeyword) {
            if (record.index.length == 2) {
                brand_list[a].keywordList.shift();
                addKeyState = false;
            } else if (record.index.length == 3) {
                brand_list[a].keywordList[b].children.shift();
                addKeyState = false;
            }
        } else {
            if (record.index.length == 2) {
                brand_list[a].keywordList[b].keywordname = record.celData.keywordname;
                brand_list[a].keywordList[b].catid = record.celData.catid;
                brand_list[a].keywordList[b].catidJd = record.celData.catidJd;

                brand_list[a].keywordList[b].catname = record.celData.catname;
            } else if (record.index.length == 3) {
                brand_list[a].keywordList[b].children[c].catid = record.celData.catid;
                brand_list[a].keywordList[b].children[c].catidJd = record.celData.catidJd;
                brand_list[a].keywordList[b].children[c].catname = record.celData.catname;
            }
        }
        setArr.delete(record.key);

        this.setState({
            editKey: [...setArr],
            addKeyState: addKeyState,
            brand_list: brand_list
        })
    }
    rmKeyword(record) {

        let { keywordId, kid, level, keywordname, brandId } = record;

        let addData = this.state.addData;
        addData.spinning = true;
        let rmData = (url, params) => {
            axios.get(url, { params: params })
                .then((response) => {
                    // console.log(response)
                    if (response.data.status == 10000) {
                        message.success(alert_success, 5);
                        this.setState({
                            addKeyState: false
                        }, () => {
                            close(this.getData())
                        })
                    } else {
                        close()
                        message.error(response.data.message, 5);
                    }

                })
                .catch((error) => {
                    close()
                    message.error(error.message);
                });
            close = (fn = () => { }) => {

                addData.spinning = false;
                this.setState({
                    addData: addData
                }, fn())
            }
        }
        if (level == 2) {
            rmData('/hcm/cus/del_keyword', { "keyword_id": keywordId, 'bid': brandId, 'keywordname': keywordname,'type':this.state.type })

        } else if (level == 3) {
            rmData('/hcm/cus/del_keyword_cat', { "kid": kid,"type":this.state.type })
        } else if (level == 1) {
            rmData('/hcm/cus/del_brand', { 'bid': brandId,"type":this.state.type })
        }
    }
    changInp(e, record, type) {
        let brand_list = this.state.brand_list;
        let [a, b, c] = record.index;
        if (record.index.length == 2) {
            brand_list[a].keywordList[b][type] = e.target.value
        } else if (record.index.length == 3) {
            brand_list[a].keywordList[b].children[c][type] = e.target.value
        }
        this.setState({
            brand_list: brand_list
        })
    }
    addModalStatus = (bl, item, index) => {
        this.setState({
            addModalStatus: bl,
            clientNames: [],
            brandId: item.brandId,
            TBCat: "",//淘宝
            JDCat: "",//京东
            LeiM: "",//类目
        })
    }
    addModal = (bl) => {
        this.setState({
            addModalStatus: bl,
            clientNames: [],
            brandId: "",
            TBCat: "",//淘宝
            JDCat: "",//京东
            LeiM: "",//类目
        })
    }
    addClientChange = (value) => {


        this.setState({
            clientNames: value
        })

        // console.log()
    }
    chSearchIpt = (e, type) => {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)

    }
    deletelast = (arr) => {
        //  var newarr=arr.slice(0);
        var newarr = arr.concat();
        newarr.pop();
        return newarr;
    }


    onSubClients = () => {
        if (this.state.clientNames.length > 50) {
            message.error(
                <span>品牌关键词数量每次最多添加50个！当前数量为<span>{this.state.clientNames.length}</span></span>
            )
            return
        }
        LoadingModal({ bl: true })


        if (this.state.clientNames.length < 51 && this.state.clientNames != "" && this.state.clientNames != undefined) {
            if (this.state.TBCat.length < 51) {
                if (this.state.JDCat.length < 51) {
                    if (this.state.LeiM.length < 51 && this.state.LeiM != "" && this.state.LeiM != undefined) {

                        axios.post('/hcm/cus/save_keyword_batch', {
                            bid: this.state.brandId,
                            keywordname: this.state.clientNames.join(","),//关键词
                            catid: this.state.TBCat,//淘宝
                            catidJd: this.state.JDCat,//京东
                            catname: this.state.LeiM,//类目
                            save_flag: "save",
                            type:this.state.type
                        }).then((response) => {
                            if (response.data.status == 10000) {
                                // message.success(alert_success, 5);
                                this.getData()
                                this.setState({
                                    addModalStatus: false,
                                    clientNames: []
                                })
                                LoadingModal({ bl: false })
                            } else {
                                this.getData()
                                message.error(response.data.message);
                                this.setState({
                                    addModalStatus: false
                                })
                                LoadingModal({ bl: false })
                            }
                            // this.getData()
                        }).catch((error) => {

                            this.setState({
                                spinning: false,
                                addModalStatus: false
                            })
                            LoadingModal({ bl: false })
                            message.error(error.statusText);
                        });


                    } else {
                        message.error("类目不能为空并且长度不允许超过50")

                        LoadingModal({ bl: false })
                    }
                } else {
                    message.error("京东Cat长度不允许超过50")

                    LoadingModal({ bl: false })
                }
            } else {
                message.error("淘宝Cat长度不允许超过50")

                LoadingModal({ bl: false })
            }
        } else {
            message.error("品牌关键字不能为空并且长度不允许超过50")

            LoadingModal({ bl: false })
        }
    }
    addKeyword(item, index) {
        if (this.state.editKey.length) {
            message.warning(alert, 5);
            return
        }
        let brand_list = this.state.brand_list;
        let setArr = new Set(this.state.editKey);
        let num = Math.random()
        setArr.add(num)
        brand_list[index].keywordList.unshift({
            "key": num,
            "level": 2,
            "brandId": item.brandId,
            "index": [index, 0],
            "keywordname": null,
            "catid": null,
            "catidJd": null,
            "catname": null,
            "addKeyword": true
        })
        this.setState({
            addKeyState: true,
            editKey: [...setArr],
            brand_list: brand_list
        })
    }
    save(record) {
        let { addKeyword, bmcid, kid, level, keywordname, brandId, keywordId, catid, catidJd, catname } = record;
        let addData = this.state.addData;
        close = (fn = () => { }) => {

            addData.spinning = false;
            this.setState({
                addData: addData,
                addKeyState: false
            }, fn())
        }
        addData.spinning = true;
        this.setState({
            addData: addData
        })
        if (level == 2) {
            if (keywordname == null || keywordname.length == 0) {
                message.error(keywordnameAlert, 5)
                close()
                return
            }
            if (catname == null || catname.length == 0) {
                message.error(categoryAlert, 5)
                close()
                return
            }
            // if(catid==null||catid.length==0){
            //     message.error(catAlert,5)
            //     close()
            //     return
            // }

            if (!lib.legnthCheck(keywordname, 'INPUT')) {
                message.error('品牌关键字长度不允许超过50');
                close()
                return
            }
            if (!lib.legnthCheck(catname, 'INPUT')) {
                message.error('类目长度不允许超过50');
                close()
                return
            }
            if (!lib.legnthCheck(catid, 'INPUT')) {
                message.error('Cat值长度不允许超过50');
                close()
                return
            }
            if (!lib.legnthCheck(catidJd, 'INPUT')) {
                message.error('京东Cat值长度不允许超过50');
                close()
                return
            }
            let params = {
                "bid": brandId,
                "keyword_id": keywordId,
                "kid": kid,
                "keywordname": keywordname,
                "catid": catid,
                "catidJd": catidJd,
                "catname": catname,
                "save_flag": "save",
                "type":this.state.type
            };
            if (!addKeyword) {
                params.save_flag = 'update'
            }
            axios.post('/hcm/cus/saveOrUpdate_keyword', params)
                .then((response) => {
                    // console.log(response)
                    if (response.data.status == 10000) {
                        message.success(alert_success, 5);
                        this.setState({
                            addKeyState: false,
                            editKey: []
                        }, () => {
                            close(this.getData())
                        })
                    } else {
                        close()
                        message.error(response.data.message, 5);
                    }

                })
                .catch((error) => {
                    close()
                    message.error(error.message);
                });

        } else if (level == 3) {

            if (catname == null || catname.length == 0) {
                message.error(categoryAlert, 5)
                close()
                return
            }
            // if(catid==null||catid.length==0){
            //     message.error(catAlert,5)
            //     close()
            //     return
            // }

            if (!lib.legnthCheck(catname, 'INPUT')) {
                message.error('类目长度不允许超过50');
                close()
                return
            }
            if (!lib.legnthCheck(catid, 'INPUT')) {
                message.error('Cat值长度不允许超过50');
                close()
                return
            }
            if (!lib.legnthCheck(catidJd, 'INPUT')) {
                message.error('京东Cat值长度不允许超过50');
                close()
                return
            }
            let params = {
                "keywordname": keywordname,
                "bid": brandId,
                "catid": catid,
                "catidJd": catidJd,
                "kid": kid,
                "catname": catname,
                "save_flag": "save",
                "type":this.state.type
            };
            if (!addKeyword) {
                params.save_flag = 'update';
            }
            axios.post('/hcm/cus/saveOrUpdate_keyword_cat', params)
                .then((response) => {
                    // console.log(response)
                    if (response.data.status == 10000) {
                        message.success(alert_success, 5);
                        this.setState({
                            addKeyState: false,
                            editKey: []
                        }, () => {
                            close(this.getData())
                        })
                    } else {
                        close()
                        message.error(response.data.message, 5);
                    }

                })
                .catch((error) => {
                    close()
                    message.error(error.message);
                });

        }

    }
    updateKeyword = (item, index) => {
        axios.post('/hcm/cus/updateGoodsLibraries', {
            bid: item.brandId,
            type:this.state.type
        })
            .then((response) => {
                if (response.data.status == 10000) {
                    message.success('商品库更新命令已执行，请等待一定时间后刷新。');

                } else {
                    message.error(response.data.message);
                }

            })
            .catch((error) => {
                message.error(error.message);
            });
    }
    deleteAll = () => {
        LoadingModal({ bl: true })
        axios.post('/hcm/search/deleteItemlistByBmcid',{
            type:this.state.type
        })
            .then((response) => {
                if (response.data.status == 10000) {
                    message.success(response.data.message);
                    this.getData()
                } else {
                    message.error(response.data.message);
                }
                LoadingModal({ bl: false })
            })
            .catch((error) => {
                message.error(error.message);
                LoadingModal({ bl: false })
            });
    }
    render() {
        let { show, onClose, targetId } = this.props;
        let { TBCat, JDCat, LeiM, addData, brand_list, expandedRowKeys, addKeyState, addModalStatus, clientNames, tokenSeparators } = this.state;
        const EDIT = <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_edit.png' />;
        const DELETE = <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_del.png' />;
        const ADD = <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_add.png' />;
        const columns2 = [{
            title: '品牌关键词',
            dataIndex: 'keywordname',
            key: 'keywordname',
            className: 'pad-left-30 ',
            width: '30',
            render: (text, record, index) => {
                let setArr = new Set(this.state.editKey)

                if (setArr.has(record.key) && record.level <= 2) {
                    return (
                        <Input disabled={!record.addKeyword && index == 0} placeholder='请输入关键词' onChange={(e) => this.changInp(e, record, 'keywordname')} style={{ maxWidth: '200px' }} value={text} />
                    )
                } else if (record.level <= 2) {
                    return <span style={{ maxWidth: '500px', display: 'inline-block' }}>{text}</span>
                } else {
                    return null
                }
            }
        }, {
            title: '类目',
            dataIndex: 'catname',
            key: 'catname',
            width: '15',
            render: (text, record, index) => {
                let setArr = new Set(this.state.editKey)

                if (setArr.has(record.key)) {
                    return (
                        <Input placeholder='请输入类目' onChange={(e) => this.changInp(e, record, 'catname')} style={{ maxWidth: '200px' }} value={text} />
                    )
                } else {
                    return text
                }
            }
        }, {
            title: '淘宝Cat值',
            dataIndex: 'catid',
            key: 'catid',
            width: '15',
            render: (text, record, index) => {
                let setArr = new Set(this.state.editKey)

                if (setArr.has(record.key)) {
                    return (
                        <Input placeholder='请输入淘宝Cat值' onChange={(e) => this.changInp(e, record, 'catid')} style={{ maxWidth: '200px' }} value={text} />
                    )
                } else {
                    return text
                }
            }
        }, {
            title: '京东Cat值',
            dataIndex: 'catidJd',
            key: 'catidJd',
            width: '15',
            render: (text, record, index) => {
                let setArr = new Set(this.state.editKey)

                if (setArr.has(record.key)) {
                    return (
                        <Input placeholder='请输入京东Cat值' onChange={(e) => this.changInp(e, record, 'catidJd')} style={{ maxWidth: '200px' }} value={text} />
                    )
                } else {
                    return text
                }
            }
        }, {
            title: '操作',
            dataIndex: 'address',
            width: '30',
            className: 'text-right pad-rig-30',
            key: 'address',
            render: (text, record, index) => {
                let setArr = new Set(this.state.editKey)
                if (record.level == 2) {
                    if (index == 0 || (index == 1 && this.state.addKeyState)) {
                        if (setArr.has(record.key)) {
                            return (
                                <span style={{ fontSize: '20px' }} className='action-box'>
                                    <a style={{ marginRight: '10px' }} onClick={() => this.save(record)} href="javascript:;"><Icon type="check" /></a>
                                    <a onClick={() => this.cancelKeyword(record)} href="javascript:;"><Icon type="close" /></a>
                                </span>
                            )
                        } else {
                            return (
                                <span className='action-box-one'>
                                    <a onClick={() => this.addCategory(record)} href="javascript:;">{ADD}新增类目</a>
                                    <a onClick={() => this.editKeyword(record)} href="javascript:;">{EDIT}编辑</a>
                                </span>
                            )
                        }

                    } else {
                        if (setArr.has(record.key)) {
                            return (
                                <span style={{ fontSize: '20px' }} className='action-box'>
                                    <a style={{ marginRight: '10px' }} onClick={() => this.save(record)} href="javascript:;"><Icon type="check" /></a>
                                    <a onClick={() => this.cancelKeyword(record)} href="javascript:;"><Icon type="close" /></a>
                                </span>
                            )
                        } else {
                            return (
                                <span className='action-box'>
                                    <a onClick={() => this.addCategory(record)} href="javascript:;">{ADD}新增类目</a>
                                    <a onClick={() => this.editKeyword(record)} href="javascript:;">{EDIT}编辑</a>
                                    <Popconfirm title="你确定要删除此项吗?" onConfirm={() => this.rmKeyword(record)} okText="删除" cancelText="取消">
                                        <a href="javascript:;">{DELETE}删除</a>
                                    </Popconfirm>
                                </span>
                            )
                        }

                    }
                } else if (record.level == 3) {
                    if (setArr.has(record.key)) {
                        return (
                            <span style={{ fontSize: '20px' }} className='action-box'>
                                <a style={{ marginRight: '10px' }} onClick={() => this.save(record)} href="javascript:;"><Icon type="check" /></a>
                                <a onClick={() => this.cancelKeyword(record)} href="javascript:;"><Icon type="close" /></a>
                            </span>
                        )
                    } else {
                        return (
                            <span className='action-box'>
                                <a onClick={() => this.editKeyword(record)} href="javascript:;">{EDIT}编辑</a>
                                <Popconfirm title="你确定要删除此项吗?" onConfirm={() => this.rmKeyword(record)} okText="删除" cancelText="取消">
                                    <a href="javascript:;">{DELETE}删除</a>
                                </Popconfirm>

                            </span>
                        )
                    }

                }
            },
        }];

        const columns = [{
            title: '品牌名',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: (text, record) => (
                <Input onChange={e => this.addChange(e, 'name')} value={text} placeholder="请输入品牌名" />
            ),
        }, {
            title: '类目',
            dataIndex: 'category',
            key: 'category',
            width: '20%',
            render: (text, record) => (
                <Input onChange={e => this.addChange(e, 'category')} value={text} placeholder="请输入类目名称" />
            ),
        }, {
            title: '淘宝Cat值',
            dataIndex: 'cat',
            key: 'cat',
            width: '20%',
            render: (text, record) => (
                <Input onChange={e => this.addChange(e, 'cat')} value={text} placeholder="请输入淘宝Cat值" />
            ),
        }, {
            title: '京东Cat值',
            dataIndex: 'catidJd',
            key: 'catidJd',
            width: '20%',
            render: (text, record) => (
                <Input onChange={e => this.addChange(e, 'catidJd')} value={text} placeholder="请输入京东Cat值" />
            ),
        }, {
            title: '操作',
            key: 'action',
            width: '20%',
            className: 'action-table',
            render: (text, record) => (
                <span style={{ width: 100, display: 'block', fontSize: '20px' }}>
                    <a style={{ marginRight: '10px' }} onClick={() => this.addSubmit()} href="javascript:;"><Icon type="check" /></a>
                    <a onClick={() => this.addBoxState(false)} href="javascript:;"><Icon type="close" /></a>
                </span>
            ),
        }];
        const text = <div>
            <p>按ENTER键默认所有文字为一行数据</p>
            <p>按TAB键默认所有文字按照空格拆分为多行数据</p>
        </div>;

        return (
            <div className={show ? 'search-content search-show' : 'search-content'} style={show ? { display: 'flex' } : { display: 'none' }} >

                <div className='Breadcrumbbox'>
                    <Breadcrumb className='Breadcrumb'>

                        <Breadcrumb.Item>{this.state.type=="jingpin" ? "竞品商品库设置" : "商品库爬虫设置"}</Breadcrumb.Item>
                        <Breadcrumb.Item>关键字类目设置</Breadcrumb.Item>
                    </Breadcrumb>
                    <h2>关键字类目设置</h2>
                </div>
                <div className='content'>

                    <div className='but-box-add'>
                        <Button type="dashed" disabled={addData.state} onClick={() => this.addBoxState(true)} className='add'>+ 新增品牌</Button>
                        <Popconfirm title={<span className='red'>你确定要清空商品库数据吗?</span>} onConfirm={() => this.deleteAll()} okText="删除" cancelText="取消">
                            <Button type="danger">清空商品库数据</Button>
                        </Popconfirm>
                    </div>


                    {
                        addData.state ?
                            <div className='add-box'>
                                <Table pagination={false} columns={columns} dataSource={[addData]} />
                            </div>
                            : null
                    }
                    <ul className='searchItems'>
                        {
                            brand_list.length ? brand_list.map((item, index) => {
                                return (
                                    <li key={index} className='item'>
                                        <div className='item-header'>
                                            <div>{item.brandName}</div>
                                            <div>商品库更新时间 {item.updateTime}</div>
                                            <div className='action'>

                                                <Button className='btn1-main' disabled={addKeyState} onClick={e => this.addKeyword(item, index)} type="primary">新增关键词</Button>

                                                <Button onClick={() => this.addModalStatus(true, item, index)}>批量新增</Button>
                                                <Popconfirm title="你确定要删除此项吗?" onConfirm={() => this.rmKeyword(item)} okText="删除" cancelText="取消">
                                                    <Button>删除</Button>
                                                </Popconfirm>


                                                <Button onClick={e => this.updateKeyword(item, index)}>更新商品库</Button>
                                            </div>
                                        </div>
                                        {console.log(item.keywordList)}
                                        <Table onExpand={this.onExpand} expandedRowKeys={expandedRowKeys} rowKey={record => record.key} className='item-table' pagination={false} columns={columns2} dataSource={item.keywordList} />
                                    </li>
                                )
                            }) : null
                        }

                    </ul>
                </div>

                <FullSpin spinning={addData.spinning} />
                <Modal
                    maskClosable={false}
                    title={'批量新增'}
                    wrapClassName='boxModal'
                    visible={addModalStatus}
                    onOk={() => this.onSubClients()}
                    onCancel={() => this.addModal(false)}
                    className='YellowWhite'
                >
                    <div className='alertbox'>
                        <p>小提示:</p>
                        <p>本批量新增仅适用于多关键词共用一个Cat值的情况。</p>
                    </div>
                    <div className='Selectbox'>
                        <p>
                            <Tooltip placement="top" arrowPointAtCenter title={text}>
                                <Icon style={{ color: 'red', marginRight: '6px' }} type="info-circle" />
                            </Tooltip>
                            品牌关键词:

                </p>
                        {/* <Select
                            mode="tags"
                            placeholder={`请输入客户公司名称,一行一个，可多个，最多50个.`}
                            style={{ width: '100%' }}
                            className='addclient'
                            maxTagCount={50}
                            dropdownClassName='dropdownaddclient'
                            onChange={(value) => this.addClientChange(value)}
                            value={clientNames}
                            tokenSeparators={['    ']}
                        >

                        </Select> */}
                        <TagInput
                            className='addclient'
                            style={{ width: 376, height: 300 }}
                            value={clientNames}
                            placeholder=' 请输入关键词名称,一行一个，可多个，最多50个.'
                            onChange={(value) => this.addClientChange(value)}
                            maxText={50}
                        />
                    </div>

                    <div className='alertbox'>
                        <p style={{ color: "#333" }}>*类目:</p>
                        <p><Input onChange={(e) => this.chSearchIpt(e, 'LeiM')} placeholder="请输入" value={LeiM}></Input></p>
                    </div>
                    <div className='alertbox'>
                        <p style={{ color: "#333" }}>淘宝Cat值:</p>
                        <p><Input onChange={(e) => this.chSearchIpt(e, 'TBCat')} placeholder="请输入" value={TBCat}></Input></p>
                    </div>
                    <div className='alertbox'>
                        <p style={{ color: "#333" }}>京东Cat值:</p>
                        <p><Input onChange={(e) => this.chSearchIpt(e, 'JDCat')} placeholder="请输入" value={JDCat}></Input></p>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Header