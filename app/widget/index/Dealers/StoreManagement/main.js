import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, Select, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollapsed } from '../../../../js/actions/index';
import { getBrandList, setCurrentBrand } from '../../../../js/actions/dealer';
const Option = Select.Option;
const mapStateToProps = (state, ownProps) => {
    return {
        collapsed: state.collapsed,
        brandList: state.dealer.brandList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ toggleCollapsed, getBrandList, setCurrentBrand }, dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
class StoreManagement extends React.Component {
    constructor(props) {
        // document.title = '店铺管理';
        super(props)

        this.state = {
            type: "新增",
            codeValue: "",
            userName: '1',
            // childrenBTPl: "",
            onChangeSele: "",
            visible: false,//新增弹框
            Editvisible: false,//编辑弹框
            confirmLoading: false,
            StoreManagement_list: "",
            FieldName: "",//平台
            FieldID: "",
            shop_name: "",//店铺名称
            wangwang: "",//旺旺
            shop_url: "",//店铺首页地址
            shop_type: "",//店铺类型,
            children: [],//授权品牌方
            mcids: [],
            mcidx: [],
            mcidsID: "",
            childrenx: [],
            bmcShopList: [],
            BJ: false,
            XZ: false,
            id: "",
            StoreManagement: "",//Option平台列表
            WangWAN: false//旺旺显示隐藏
        }
    }

    componentDidMount() {
        this.StoreManagement_list()

        for (let i = 10; i < 36; i++) {

            this.state.children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        ajax.post('/hcm/sys/GetList', {
            "dictcode": "platform"
        }).then((res) => {
            if (res.data.status == 10000) {
                this.setState({
                    StoreManagement: res.data.data
                })
                this.state.StoreManagement.forEach((element, key) => {
                    this.state.childrenx.push(<Option key={element.id} >{element.dictName}</Option>);
                });
            }

        })
        // this.setState({
        //     childrenBTPl: this.props.brandList
        // })
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                if (this.state.XZ == true) {
                    if (values.shop_type != undefined) {
                        if (values.mcids != undefined && values.mcids != "") {
                            const bmcidsX = []
                            if (this.state.codeValue != "" && this.state.codeValue != undefined && values.FieldName.label!="") {
                                if (values.shop_name != "" && values.shop_name != undefined) {
                                    if (values.shop_url != "" && values.shop_url != undefined) {
                                        if (values.shop_type != "" && values.shop_type != undefined) {
                                            if (this.state.WangWAN != false) {

                                                if (values.wangwang != "" && values.wangwang != undefined) {
                                                   // var reg = /^[0-9]*$/
                                                  //  if (!reg.test(values.shop_url)) {
                                                      console.log(1)
                                                        this.setState({
                                                            XZ: false,
                                                            BJ: false
                                                        },()=>{
                                                            ajax.post('/hcm/dealerShop/Create', {
                                                                "platform_code": this.state.codeValue,
                                                                "shop_name": values.shop_name,
                                                                "wangwang": values.wangwang,
                                                                "shop_url": values.shop_url.replace(/\+/g,"%2B").replace(/\&/g,"%26").replace(/\=/g,"%27"),
                                                                "shop_type": values.shop_type,
                                                                "status": 0,
                                                                "bmcids": values.mcids.join(",")
                                                            }).then((res) => {
                                                                console.log(res)
                                                                if (res.data.status == 10000) {
                                                                    this.setState({
                                                                        visible: false,
                                                                        confirmLoading: false,
                                                                        XZ: false,
                                                                        BJ: false,
                                                                        WangWAN: false
                                                                    })
                                                                    this.StoreManagement_list()
                                                                    const { form: { resetFields, getFieldsValue } } = this.props
                                                                    //console.log(this.props)
                                                                    resetFields()
                                                                } else {
                                                                    this.setState({
                                                                        XZ: true,
                                                                        BJ: false
                                                                    })
                                                                   // console.log(this.state.XZ)
                                                                    message.error(res.data.message)
                                                                }
    
                                                            })
                                                        })
                                                       
                                                   // } else {
                                                      //  message.error("请输入正确格式！")
                                                   // }

                                                } else {
                                                    message.error("请输入旺旺！")
                                                }

                                            } else {
                                                var reg = /^[0-9]*$/
                                               // if (!reg.test(values.shop_url)) {
                                                    ajax.post('/hcm/dealerShop/Create', {
                                                        "platform_code": this.state.codeValue,
                                                        "shop_name": values.shop_name,
                                                        "wangwang": "",
                                                        "shop_url": values.shop_url.replace(/\+/g,"%2B").replace(/\&/g,"%26").replace(/\=/g,"%27"),
                                                        "shop_type": values.shop_type,
                                                        "status": 0,
                                                        "bmcids": values.mcids.join(",")
                                                    }).then((res) => {
                                                        console.log(res)
                                                        if (res.data.status == 10000) {
                                                            this.setState({
                                                                visible: false,
                                                                confirmLoading: false,
                                                                XZ: false,
                                                                BJ: false,
                                                                WangWAN: false
                                                            })
                                                            const { form: { resetFields, getFieldsValue } } = this.props
                                                            //console.log(this.props)
                                                            resetFields()
                                                            this.StoreManagement_list()
                                                        }else {
                                                            message.error(res.data.message)
                                                        }

                                                    })
                                                //} else {
                                                //    message.error("请输入正确格式！")
                                               // }

                                            }
                                        } else {
                                            message.error("请输入店铺类型名称！")
                                        }
                                    } else {
                                        message.error("请输入店铺首页地址名称！")
                                    }

                                } else {
                                    message.error("请输入店铺名称！")
                                }
                            } else {
                                message.error("请选择平台！")
                            }

                        } else {
                            message.error("请选择要新增的授权品牌方！")
                        }
                    }
                } else if (this.state.BJ == true) {
                    if (values.shop_type != undefined) {
                        if (values.mcids != undefined && values.mcids != "") {
                            const bmcidsX = []
                            if (this.state.codeValue != "" && this.state.codeValue != undefined || values.FieldName.key!="" || values.FieldName.key!=undefined) {
                                if (values.shop_name != "" && values.shop_name != undefined) {
                                    if (values.shop_url != "" && values.shop_url != undefined) {
                                        if (values.shop_type!="") {
                                            if (this.state.WangWAN != false) {

                                                if (values.wangwang != "" && values.wangwang != undefined) {
                                                    ajax.post('/hcm/dealerShop/Update', {
                                                        "platform_code": values.FieldName.key,
                                                        "shop_name": values.shop_name,
                                                        "wangwang": values.wangwang,
                                                        "shop_url": values.shop_url.replace(/\+/g,"%2B").replace(/\&/g,"%26").replace(/\=/g,"%27"),
                                                        "shop_type": values.shop_type,
                                                        "id": this.state.id,
                                                        "status": 0,
                                                        "bmcids": values.mcids.join(",")
                                                    }).then((res) => {
                                                        if (res.data.status == 10000) {
                                                            // console.log(res,"xs")
                                                            this.StoreManagement_list()
                                                            this.setState({
                                                                visible: false,
                                                                confirmLoading: false,
                                                                XZ: false,
                                                                BJ: false,
                                                                WangWAN: false
                                                            })
                                                            const { form: { resetFields, getFieldsValue } } = this.props
                                                            //console.log(this.props)
                                                            resetFields()
                                                        }else {
                                                            // this.setState({
                                                            //     XZ: false,
                                                            //     BJ: true
                                                            // })
                                                            message.error(res.data.message)
                                                        }
                    
                                                    })
                                                } else {
                                                    message.error("请输入旺旺！")
                                                }
                                            } else {
                                                ajax.post('/hcm/dealerShop/Update', {
                                                    "platform_code": values.FieldName.key,
                                                    "shop_name": values.shop_name,
                                                    "wangwang":"",
                                                    "shop_url": values.shop_url.replace(/\+/g,"%2B").replace(/\&/g,"%26").replace(/\=/g,"%27"),
                                                    "shop_type": values.shop_type,
                                                    "id": this.state.id,
                                                    "status": 0,
                                                    "bmcids": values.mcids.join(",")
                                                }).then((res) => {
                                                    if (res.data.status == 10000) {
                                                        // console.log(res,"xs")
                                                        this.StoreManagement_list()
                                                        this.setState({
                                                            visible: false,
                                                            confirmLoading: false,
                                                            XZ: false,
                                                            BJ: false,
                                                            WangWAN: false
                                                        })
                                                        const { form: { resetFields, getFieldsValue } } = this.props
                                                        //console.log(this.props)
                                                        resetFields()
                                                    }else {
                                                        message.error(res.data.message)
                                                    }
                
                                                })
                                                

                                            }
                                        } else {
                                            message.error("请输入店铺类型名称！")
                                        }
                                    } else {
                                        message.error("请输入店铺首页地址名称！")
                                    }

                                } else {
                                    message.error("请输入店铺名称！")
                                }
                            } else {
                                message.error("请选择平台！")
                            }
                        
                        } else {
                            message.error("请选择要编辑的授权品牌方！")
                        }
                    }

                }



            }
        })
    }
    addStore = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        resetFields()
        console.log(this.state.FieldName)
        this.setState({
            visible: true,
            confirmLoading: true,
            type: "新增",
            XZ: true,
            FieldName: "",//平台
            FieldID: "",
            shop_name: "",//店铺名称
            wangwang: "",//旺旺
            shop_url: "",//店铺首页地址
            shop_type: "",//店铺类型,
            mcids: [],
            bmcShopList: []
        });

    }
    BJStore = (username) => {
       const arr = []
        username.bmcShopList.forEach((v, i) => {

            arr.push({
                key: v.bmcid,
                value: v.bmcname
            })
        })
        this.setState({
            visible: true,
            confirmLoading: true,
            type: "编辑",
            BJ: true,
            FieldName: username.platform_name,//平台
            FieldID: username.platform_code,
            shop_name: username.shop_name,//店铺名称
            wangwang: username.wangwang,//旺旺
            shop_url: username.shop_url.replace(/\%2B/g,"+").replace(/\%26/g,"&").replace(/\%27/g,"="),//店铺首页地址
            shop_type: username.shop_type,//店铺类型,
            bmcShopList: username.bmcShopList,
            mcidsx: username.bmcShopList[0].bmcname,//授权品牌方username.wangwang
            mcidsID: username.bmcShopList[0].bmcid,
            id: username.id
        });
        // console.log()
        if (username.platform_name == "淘宝网" || username.platform_name == "天猫商城" || username.platform_name == "1688" || username.platform_name == "速卖通") {
            this.setState({
                WangWAN: true
            });
        } else {
            this.setState({
                WangWAN: false
            });
        }
    }
    handleChange = (value) => {
        if (value.label == "淘宝网" || value.label == "天猫商城" || value.label == "1688" || value.label == "速卖通") {
            this.setState({
                WangWAN: true,
                codeValue: value.key
            });
        } else {
            this.setState({
                WangWAN: false,
                codeValue: value.key
            });
        }
    }


    handleChangesx = (value) => {//授权品牌方
        this.setState({
            mcids: value.join(",")
        })

    }

    StoreManagement_list = () => {
        ajax.post('/hcm/dealerShop/GetList').then((res) => {
            if (res.data.status == 10000) {
                this.setState({
                    StoreManagement_list: res.data.data
                })
                console.log(this.state.StoreManagement_list)
            }
        })
    }
    BtnFun = () => {
        this.setState({
            userName: ""
        })
    }
    SearchFun = (value) => {
        ajax.post('/hcm/dealerShop/GetList', {
            "shop_name": value
        }).then((res) => {
            if (res.data.status == 10000) {

                this.setState({
                    StoreManagement_list: res.data.data
                })
            }
        })


    }
    DeleList = (e) => {
        ajax.post('/hcm/dealerShop/Delete', {
            "id": e.target.getAttribute("id")
        }).then((res) => {
            if (res.data.status == 10000) {
                this.StoreManagement_list()
            }
        })
    }
    handleCancel = () => {
        const { form: { resetFields, getFieldsValue } } = this.props
        //console.log(this.props)
        resetFields()
        this.setState({
            visible: false,
            confirmLoading: false,
            XZ: false,
            BJ: false,
            WangWAN: false
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(StoreManagement)