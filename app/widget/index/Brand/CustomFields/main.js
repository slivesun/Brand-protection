import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, Input, message } from 'antd';
class CustomFields extends React.Component {
    constructor(props) {
        // document.title = '自定义字段';
        super(props)

        const columns = [{
            title: '序号',
            dataIndex: 'index',
            width: '10%',
            render: (text, item, index) => index + 1
        }, {
            title: '字段名称',
            dataIndex: 'fieldname',
            width: '30%',
        }, {
            title: '字段类型',
            dataIndex: '',
            width: '40%',
            render: (text, record, index) => (
                <span>
                    {
                        text.fieldtype == "TEXT" ? <span>文本框</span>
                            : text.fieldtype == "Single" ? <span>文本域</span>
                                : text.fieldtype == "SINGLESELECT" ? <span>单选下拉框</span>
                                    : text.fieldtype == "MULTISELECT" ? <span>多选下拉框</span>
                                        : null
                    }
                </span>
            )
        }, {
            title: '操作',
            dataIndex: '',
            width: '20%',
            render: (text, record, index) => (
                <span>

                    <a  className="BJ" onClick={this.Edit.bind(this, text)}>
                        <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_edit.png' />

                        编辑</a>

                    <a onClick={this.DeleteBtn.bind(this, text)}>
                        <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_del.png' />

                        删除</a>
                </span>
            )
        }];
        this.state = {
            CustomFields_list: columns,
            data: [],
            type: "新增",
            pagination: {},
            loading: false,
            pageNo: 1,
            pageSize: 10,
            totalNum: "",
            visible: false,//新增弹框
            Editvisible: false,//编辑弹框
            confirmLoading: false,
            FORMtitHides: false,
            FieldNameValue: "",
            Bmcid: "",//品牌商ID 判断编辑保存
            FieldName: "",//字段名称
            FieldOccupancy: "",//字段占位
            FieldType: "",//字段类型
            FieldOccupancyValue: "",
            onChangeValue: [],
            uuid: 0,
            id: "",
            arr: [],
            ajson: "",
            bBRRay: []

        }

    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        console.log(keys)
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        console.log(keys.filter(key => key !== k))
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {


        //console.log(this.state.uuid,"1")
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        console.log(keys)
        const nextKeys = keys.concat(this.state.uuid);
        this.state.uuid++;
        form.setFieldsValue({
            keys: nextKeys
        });
        


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    componentDidMount() {
        this.fetch();

    }
    NewJ = () => {//新增
        const { form: { resetFields, getFieldsValue } } = this.props
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        console.log(keys)
        const nextKeys = keys.concat([]);
        console.log(nextKeys)
        form.setFieldsValue({
            keys: nextKeys,
        });
        //console.log(this.props)
        resetFields()
        this.setState({
            visible: true,
            uuid: 0,
            confirmLoading: true,
            type: "新增",
            FORMtitHides: false,
            FieldName: "",//字段名称
            FieldOccupancy: "",//字段占位
            FieldType: "请选择"//字段类型
        });
    }
    Edit = (index) => {//编辑
        //  console.log(index)
        const { form } = this.props;
        if (index.opotion != undefined && index.opotion != "" && index.opotion != null) {
            this.setState({
                bBRRay: index.opotion.split(","),
                uuid: index.opotion.split(",").length
            }, () => {
                form.setFieldsValue({
                    names: this.state.bBRRay
                });
            })
        }

        const { form: { resetFields, getFieldsValue } } = this.props
        //console.log(this.props)
        resetFields()
        if (index.fieldtype == "TEXT" || index.fieldtype == "文本框") {
            this.setState({
                FieldType: "文本框",//字段类型

                FORMtitHides: false
            });
        } else if (index.fieldtype == "Single" || index.fieldtype == "文本域") {
            this.setState({
                FieldType: "文本域",//字段类型

                FORMtitHides: false
            });
        } else if (index.fieldtype == "SINGLESELECT" || index.fieldtype == "单选下拉框") {
            this.setState({
                FieldType: "单选下拉框",//字段类型，
                FORMtitHides: true,
                ajson: index.opotion
            });
        } else if (index.fieldtype == "MULTISELECT" || index.fieldtype == "多选下拉框") {
            this.setState({
                FieldType: "多选下拉框",//字段类型
                FORMtitHides: true,
                ajson: index.opotion
            });
        }

        this.setState({
            visible: true,
            Editvisible: true,
            type: "编辑",
            FieldName: index.fieldname,//字段名称
            FieldOccupancy: index.prompt,//字段占位
            Bmcid: index.id
        });

    }

    DeleteBtn = (index) => { //删除列表
        //console.log(index)
        ajax.post('/hcm/hcmCustomModel/delete', {
            id: index.id,
            module: 'DEALER'
        }).then((res) => {
            //console.log(res)
            this.fetch();
        })
    }
    onChangeValue = (e) => {
        console.log(e.target.value)
        const arr = []
        arr.push(e.target.value)
        this.setState({
            onChangeValue: arr
        })

    }
    removeDuplicatedItem = (str) => {
        var ar2 = str.split(",");
        var array = new Array();
        var j = 0
        for (var i = 0; i < ar2.length; i++) {
            if ((array == "" || array.toString().match(new RegExp(ar2[i], "g")) == null) && ar2[i] != "") {
                array[j] = ar2[i];
                array.sort();
                j++;
            }
        }
        return array.toString();
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values, "123")
            const { FieldName, FieldOccupancy, FieldType, ...aaw } = values

            if (!err) {
                console.log(this.state.onChangeValue)
                if (this.state.confirmLoading == true) {
                    if (values.FieldName != undefined && values.FieldName != "") {
                        if (values.FieldName.length <= 6) {
                            if (values.FieldType != "请选择" && values.FieldType != "") {
                                if (this.state.FORMtitHides == true) {
                                    if (values.keys.length != 0) {
                                        console.log(this.removeDuplicatedItem(values.keys.map((e, v) => {
                                            return aaw.names[e]
                                        }).join(',')))
                                        ajax.post('/hcm/hcmCustomModel/save', {
                                            fieldClassify: "add",
                                            fieldname: values.FieldName,
                                            fieldtype: values.FieldType,
                                            opotion: this.removeDuplicatedItem(values.keys.map((e, v) => {
                                                return aaw.names[e]
                                            }).join(',')),
                                            prompt: values.FieldOccupancy,
                                            module: "DEALER"
                                        }).then((res) => {
                                            if (res.data.status == 10000) {
                                                this.setState({
                                                    visible: false,
                                                    confirmLoading: false,
                                                    Editvisible: false,
                                                    bBRRay: [],
                                                    uuid: 0
                                                });
                                                this.fetch();
                                            } else {
                                                message.error(res.data.message)
                                            }

                                        })
                                    } else {
                                        message.error("请填写字段类型！")

                                    }

                                } else {
                                    ajax.post('/hcm/hcmCustomModel/save', {
                                        fieldClassify: "add",
                                        fieldname: values.FieldName,
                                        fieldtype: values.FieldType,
                                        opotion: [],
                                        prompt: values.FieldOccupancy,
                                        module: "DEALER"
                                    }).then((res) => {

                                        if (res.data.status == 10000) {
                                            this.setState({
                                                visible: false,
                                                confirmLoading: false,
                                                Editvisible: false,
                                                bBRRay: [],
                                                uuid: 0
                                            });
                                            this.fetch();
                                        } else {
                                            message.error(res.data.message)
                                        }
                                    })
                                }


                            } else {
                                message.error("请选择字段类型！")
                            }
                        } else {
                            message.error("请输入6个字以内！")
                        }

                    } else {
                        message.error("请输入字段名称！")
                    }

                } else if (this.state.Editvisible == true) {
                    if (this.state.Bmcid != "") {
                        if (values.FieldName != undefined && values.FieldName != "") {
                            if (values.FieldName.length <= 6) {
                                if (values.FieldType != "请选择" && values.FieldType != "") {

                                    if (this.state.FieldType == "文本框") {
                                        if (this.state.FORMtitHides == true) {

                                            if (values.keys.length != 0) {

                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "TEXT",
                                                    opotion: this.removeDuplicatedItem(values.keys.map((e, v) => {
                                                        return aaw.names[e]
                                                    }).join(',')),
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props

                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            } else {
                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    bmcid: "1",//品牌商ID
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "TEXT",
                                                    opotion: this.state.ajson,
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props
                                                        //console.log(this.props)
                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            }

                                        } else {
                                            ajax.post('/hcm/hcmCustomModel/save', {
                                                id: this.state.Bmcid,
                                                fieldname: values.FieldName,
                                                fieldtype: "TEXT",
                                                opotion: [],
                                                prompt: values.FieldOccupancy,
                                                module: "DEALER"
                                            }).then((res) => {

                                                if (res.data.status == 10000) {
                                                    this.setState({
                                                        visible: false,
                                                        confirmLoading: false,
                                                        Editvisible: false,
                                                        bBRRay: [],
                                                        uuid: 0
                                                    });
                                                    const { form: { resetFields, getFieldsValue } } = this.props
                                                    //console.log(this.props)
                                                    resetFields()
                                                    this.fetch();
                                                } else {
                                                    message.error(res.data.message)
                                                }


                                            })
                                        }
                                    } else if (this.state.FieldType == "文本域") {
                                        if (this.state.FORMtitHides == true) {

                                            if (values.keys.length != 0) {

                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "Single",
                                                    opotion: this.removeDuplicatedItem(values.keys.map((e, v) => {
                                                        return aaw.names[e]
                                                    }).join(',')),
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props

                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            } else {
                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    bmcid: "1",//品牌商ID
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "Single",
                                                    opotion: this.state.ajson,
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props
                                                        //console.log(this.props)
                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            }

                                        } else {
                                            ajax.post('/hcm/hcmCustomModel/save', {
                                                id: this.state.Bmcid,
                                                fieldname: values.FieldName,
                                                fieldtype: "Single",
                                                opotion: [],
                                                prompt: values.FieldOccupancy,
                                                module: "DEALER"
                                            }).then((res) => {

                                                if (res.data.status == 10000) {
                                                    this.setState({
                                                        visible: false,
                                                        confirmLoading: false,
                                                        Editvisible: false,
                                                        bBRRay: [],
                                                        uuid: 0
                                                    });
                                                    const { form: { resetFields, getFieldsValue } } = this.props
                                                    //console.log(this.props)
                                                    resetFields()
                                                    this.fetch();
                                                } else {
                                                    message.error(res.data.message)
                                                }


                                            })
                                        }
                                    } else if (this.state.FieldType == "单选下拉框") {
                                        if (this.state.FORMtitHides == true) {

                                            if (values.keys.length != 0) {

                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "SINGLESELECT",
                                                    opotion: this.removeDuplicatedItem(values.keys.map((e, v) => {
                                                        return aaw.names[e]
                                                    }).join(',')),
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props

                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            } else {
                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    bmcid: "1",//品牌商ID
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "SINGLESELECT",
                                                    opotion: this.state.ajson,
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props
                                                        //console.log(this.props)
                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            }

                                        } else {
                                            ajax.post('/hcm/hcmCustomModel/save', {
                                                id: this.state.Bmcid,
                                                fieldname: values.FieldName,
                                                fieldtype: "SINGLESELECT",
                                                opotion: [],
                                                prompt: values.FieldOccupancy,
                                                module: "DEALER"
                                            }).then((res) => {

                                                if (res.data.status == 10000) {
                                                    this.setState({
                                                        visible: false,
                                                        confirmLoading: false,
                                                        Editvisible: false,
                                                        bBRRay: [],
                                                        uuid: 0
                                                    });
                                                    const { form: { resetFields, getFieldsValue } } = this.props
                                                    //console.log(this.props)
                                                    resetFields()
                                                    this.fetch();
                                                } else {
                                                    message.error(res.data.message)
                                                }


                                            })
                                        }
                                    } else if (this.state.FieldType == "多选下拉框") {
                                        if (this.state.FORMtitHides == true) {

                                            if (values.keys.length != 0) {

                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    id: this.state.Bmcid,
                                                    fieldname: values.FieldName,
                                                    fieldtype: "MULTISELECT",
                                                    opotion: this.removeDuplicatedItem(values.keys.map((e, v) => {
                                                        return aaw.names[e]
                                                    }).join(',')),
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props

                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            } else {
                                                ajax.post('/hcm/hcmCustomModel/save', {
                                                    bmcid: "1",//品牌商ID
                                                    id: this.state.Bmcid, 
                                                    fieldname: values.FieldName,
                                                    fieldtype: "MULTISELECT",
                                                    opotion: this.state.ajson,
                                                    prompt: values.FieldOccupancy,
                                                    module: "DEALER"
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            Editvisible: false,
                                                            bBRRay: [],
                                                            uuid: 0
                                                        });
                                                        const { form: { resetFields, getFieldsValue } } = this.props
                                                        //console.log(this.props)
                                                        resetFields()
                                                        this.fetch();

                                                    } else {
                                                        message.error(res.data.message)
                                                    }



                                                })
                                            }

                                        } else {
                                            ajax.post('/hcm/hcmCustomModel/save', {
                                                id: this.state.Bmcid,
                                                fieldname: values.FieldName,
                                                fieldtype: "MULTISELECT",
                                                opotion: [],
                                                prompt: values.FieldOccupancy,
                                                module: "DEALER"
                                            }).then((res) => {

                                                if (res.data.status == 10000) {
                                                    this.setState({
                                                        visible: false,
                                                        confirmLoading: false,
                                                        Editvisible: false,
                                                        bBRRay: [],
                                                        uuid: 0
                                                    });
                                                    const { form: { resetFields, getFieldsValue } } = this.props
                                                    //console.log(this.props)
                                                    resetFields()
                                                    this.fetch();
                                                } else {
                                                    message.error(res.data.message)
                                                }


                                            })
                                        }
                                    }


                                } else {
                                    message.error("请选择字段类型！")
                                }
                            } else {
                                message.error("请输入6个字以内！")
                            }

                        } else {
                            message.error("请输入字段名称！")
                        }

                    }

                }
            }
        })

    }
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
        })
    }
    handleCancel = () => {

        this.setState({
            visible: false,
            confirmLoading: false,
            Editvisible: false,
            bBRRay: [],
            uuid: 0
        });
    }
    changePagination = (current, pageSize) => {
        console.log(current, pageSize);
        ajax.post('/hcm/hcmCustomModel/getPagination', {
            module: "DEALER",
            pageNo: current,
            pageSize: pageSize,
        }).then((res) => {
            console.log(res)
            if (res.data.status == 10000) {
                this.fetch();
                this.setState({
                    pageNo: current
                })
            }

        })

    }
    onPaginationSize = (current, size) => {
        console.log(size)
        ajax.post('/hcm/hcmCustomModel/getPagination', {
            module: "DEALER",
            pageNo: current,
            pageSize: size,
        }).then((res) => {
            console.log(res, "123312")
            if (res.data.status == 10000) {
                this.fetch();
                this.setState({
                    pageNo: current,
                    pageSize: size
                })

            }

        })

    }
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    handleChange = (value) => { //字段类型
        if (value == "SINGLESELECT" || value == "MULTISELECT" || value == "单选下拉框" || value == "多选下拉框") {
            this.setState({
                FORMtitHides: true
            });
            if (value == "SINGLESELECT") {
                this.setState({
                    FieldType: "单选下拉框"
                })
            } else if (value == "TEXT") {
                this.setState({
                    FieldType: "文本框"
                })
            } else if (value == "Single") {
                this.setState({
                    FieldType: "文本域"
                })
            } else if (value == "MULTISELECT") {
                this.setState({
                    FieldType: "多选下拉框"
                })
            }
        } else {
            this.setState({
                FORMtitHides: false
            });
            if (value == "SINGLESELECT") {
                this.setState({
                    FieldType: "单选下拉框"
                })
            } else if (value == "TEXT") {
                this.setState({
                    FieldType: "文本框"
                })
            } else if (value == "Single") {
                this.setState({
                    FieldType: "文本域"
                })
            } else if (value == "MULTISELECT") {
                this.setState({
                    FieldType: "多选下拉框"
                })
            }
        }
    }
    AddField = () => {

        this.state.FieldTypesA.push("")
        this.setState({
            FieldTypes: this.state.FieldTypesA
        })
    }
    DeleteInp = (index) => {
        var lists = this.state.FieldTypes;
        lists.splice(index, 1);
        this.setState({ FieldTypes: lists })
    }
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        ajax.post('/hcm/hcmCustomModel/getBybmcidAndModule', {
            module: "DEALER",
        }).then((res) => {
            // const pagination = { ...this.state.pagination };
            console.log(res, "541541")
            // Read total count from server
            // pagination.total = data.totalCount;
            // pagination.total = 200;
            if (res.data.status == 10000) {

                this.setState({
                    data: res.data.data.add.data,
                    loading: false,
                    totalNum: res.data.data.add.data.length

                });
            }
        })


    }

    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(CustomFields)