import Tpl from './tpl';
import ajax from '../../../../js/common/ajax'
import { Form, TreeNode, message } from 'antd';

class CustomerEditor extends React.Component {
    constructor(props) {
        // document.title = '编辑';
        super(props)
        const treeData = [{
            title: 'Node1',
            value: '1',
            key: '1',
            children: [{
                title: 'Child Node1',
                value: '0-0-1',
                key: '0-0-1',
            }, {
                title: 'Child Node2',
                value: '0-0-2',
                key: '0-0-2',
            }],
        }, {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
        }];
        this.state = {
            TShow: false,
            IMGS: "",
            IMGStxt: "",
            USERS: "",
            dealername: "",
            dutynumber: "",
            approve_start: "",
            approve_end: "",
            approve_date: "",
            apply_person: "",
            apply_content: "",
            subordinate: "",
            Array: "",
            Brrby: [],
            addField: {},
            authorize_num: "",
            value: undefined,
            treeData: "",
            apply_statuS: "",
            treetitle: "",
            treeid: "",
            showX: false
        }
    }
    componentDidMount() {
        this.component_list()
        this.component()
        this.Subordinate()
 
    }
    createJson = (prop, val, str) => {
        if (typeof val === "undefined") {
            delete str[prop];
        }
        else {
            str[prop] = val;
        }
    }
    lolo = (v) => {
        v.children.forEach((vs, i) => {
            if (vs.type === "dept") {
                this.createJson("disabled", true, vs);
                if (vs.children != null) {
                    this.lolo(vs)
                }

            } else if (vs.type === "user") {
                this.createJson("disabled", false, vs);
            }
        })
    }
    Subordinate = () => {
        ajax.post('/hcm/userout/getUserTreeByDepartId')
            .then((res) => {
                //  console.log(res.data.data, "12")
                if (res.data.status == 10000) {
                    res.data.data.forEach((v, i) => {
                        //   console.log(v,i)
                        if (v.type === "dept") {
                            //  console.log(1)
                            this.createJson("disabled", true, v);
                            ///  console.log(v)
                            if (v.children != null) {
                                this.lolo(v)
                            }

                        } else if (v.type === "user") {
                            this.createJson("disabled", false, v);
                        }
                        // console.log(v,"21")
                    })

                     console.log(res.data.data,"21")
                    this.setState({
                        treeData: res.data.data,
                        treetitle: res.data.data.length?res.data.data[0].title:null
                    })
                }
            })
    }
    onChangeSubor = (value) => {
        // console.log(value)
        this.setState({
            value
        })
    }
    component = () => {
        //  console.log(this.props.match.params.id)
        ajax.post('/hcm/dealer/update_page', {
            id: this.props.match.params.id
        })
            .then((res) => {
                  console.log(res, "123")
                if (res.data.data != null || res.data.data != undefined) {
                    const {brand_take_people,contact,dealer_id,dealername,dutynumber,id,status,status_info,take_people,bmcid,...adx}=res.data.data
                    const abc=[]
                    this.setState({
                        // memoDealername: values.authorize_num,
                        //authorize_num  
                        subordinate: res.data.data.brand_take_people,
                        dealername: res.data.data.dealername,
                        dutynumber: res.data.data.memo_dealername,
                        approve_start: res.data.data.authorize_start,
                        approve_end: res.data.data.authorize_end,
                        approve_date: res.data.data.approve_date,
                        authorize_num: res.data.data.authorize_num,
                        Brrby: adx
                    })
                    
                   // console.log(abc.push(this.state.Brrby), JSON.parse(abc[0].add_field))
                    if (res.data.data.apply_status == "APPLYING" || res.data.data.apply_status == "DISAGREE") {
                        this.setState({
                            IMGS: "../../../img/userTB.jpg",
                            IMGStxt: "客户暂未入驻",
                            USERS: "usersTS",//usersBS成功注入
                            apply_statuS: "APPLYING"
                        })
                    }  else if (res.data.data.status_info.info_type == "CON_EXPIRE") {//合约即将到期
                        this.setState({
                            IMGS: "../../../img/userTB.jpg",
                            IMGStxt: res.data.data.status_info.title,
                            USERS: "usersBS",//usersBS成功注入
                            apply_statuS: "APPLYING"
                        })
                    } else if (res.data.data.status_info.info_type == "WAIT_APPROVE") {//等待审核
                        this.setState({
                            IMGS: "../../../img/userTB.jpg",
                            IMGStxt: res.data.data.status_info.info,
                            USERS: "usersBS",//usersBS成功注入
                            apply_statuS: "APPLYING"
                        })
                    } else if (res.data.data.status_info.info_type == "UN_INVITED") {//暂未入驻
                        this.setState({
                            IMGS: "../../../img/icon_Login_prompt_failure.png",
                            IMGStxt: res.data.data.status_info.info,
                            USERS: "usersBS",//usersBS成功注入
                            apply_statuS: "APPLYING"
                        })
                    } else if (res.data.data.status_info.info_type == "WRONG_NAME") {//名称有误
                        this.setState({
                            IMGS: "../../../img/icon_Login_prompt_failure.png",
                            IMGStxt: res.data.data.status_info.info,
                            USERS: "usersBS",//usersBS成功注入
                            apply_statuS: "APPLYING"
                        })
                    } else {
                        this.setState({
                            IMGS: "../../../img/userBS.jpg",
                            IMGStxt: "客户成功入驻",
                            USERS: "usersBS",//usersBS成功注入
                            apply_statuS: "APPROVED"
                        })
                    }
                }



            })

    }
    component_list = () => {
   

        ajax.post('/hcm/hcmCustomModel/getBybmcidAndModule', {
            module: "DEALER",
            fieldSource: 2
        })
            .then((res) => {
                console.log(res,"12")
                const str = ""
                this.setState({
                    Array: res.data.data.add.data
                })

            })

    }
    handle = (value) => {
        //  console.log(value)
    }

    iptChange = (e, type) => {
        const { CustomerName, NameOfNote, approve_start, approve_date, AuthorizedContent, Applicant, ...adds } = this.state.Array

        this.setState({
            addField: adds
        })
        let addField = this.state.addField;
        addField[type] = e.target.value;
        this.setState({
            addField: addField
        })
        // console.log(addField.toString())
    }
    add0 = (m) => { return m < 10 ? '0' + m : m }
    format = (shijianchuo) => {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate() + 1;
        var h = time.getHours() + 1;
        var mm = time.getMinutes() + 1;
        var s = time.getSeconds() + 1;
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    }
    ForgetSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { CustomerName, NameOfNote, approve_start, approve_date, AuthorizedContent, authorize_num, Subordinate, Applicant, ...adds } = values

            if (!err) {
                     console.log(values)

                if (this.state.approve_start != undefined && this.state.approve_start != "") {

                    if (values.approve_start != null && values.approve_start != "" && values.approve_start != undefined) {

                        if (this.state.approve_date != undefined && this.state.approve_date != "") {

                            console.log(adds)   
                            ajax.post('/hcm/dealer/update', {
                                module: "DEALER",
                                fieldSource: 2,
                                dealername: values.CustomerName,
                                id: this.props.match.params.id,
                                memoDealername: values.NameOfNote,
                                authorizeStart: moment(this.state.approve_start).format('YYYY-MM-DD'),
                                authorizeEnd: moment(this.state.approve_end).format('YYYY-MM-DD'),
                                authorizeNum: values.authorize_num,
                                brandTakePeople: values.Subordinate,
                                approveDate: moment(this.state.approve_date).format('YYYY-MM-DD HH:mm:ss'),
                                addField: JSON.stringify(adds)
                            })
                                .then((res) => {
                                    //          console.log(res)
                                    if (res.data.status == 10000) {
                                        window.location = "/index.html#/ClientCheck"
                                    } else if (res.data.status == 310001) {
                                        message.error(res.data.message)
                                    }else{
                                        message.error(res.data.message)
                                    }
                                })
                        } else {


                            console.log(this.state.approve_date, "3")
                            ajax.post('/hcm/dealer/update', {
                                module: "DEALER",
                                fieldSource: 2,
                                dealername: values.CustomerName,
                                id: this.props.match.params.id,
                                memoDealername: values.NameOfNote,
                                authorizeStart: moment(this.state.approve_start).format('YYYY-MM-DD'),
                                authorizeEnd: moment(this.state.approve_end).format('YYYY-MM-DD'),
                                authorizeNum: values.authorize_num,
                                brandTakePeople: values.Subordinate,
                                approveDate: moment(Date.now()._i).format('YYYY-MM-DD HH:mm:ss'),
                                addField: JSON.stringify(adds)
                            })
                                .then((res) => {
                                    //          console.log(res)
                                    if (res.data.status == 10000) {
                                        window.location = "/index.html#/ClientCheck"
                                    } else if (res.data.status == 310001) {
                                        message.error(res.data.message)
                                    }else{
                                        message.error(res.data.message)
                                    }
                                })

                        }
                    } else {
                        message.error("请选择授权期限！")
                    }



                } else {
                    if (values.approve_start != null && values.approve_start != "" && values.approve_start != undefined) {

                        if (this.state.approve_date != undefined && this.state.approve_date != "") {
                            console.log(this.state.approve_date, "1")
                            ajax.post('/hcm/dealer/update', {
                                module: "DEALER",
                                fieldSource: 2,
                                dealername: values.CustomerName,
                                id: this.props.match.params.id,
                                memoDealername: values.NameOfNote,
                                authorizeStart: moment(Date.now()._i).format('YYYY-MM-DD'),
                                authorizeEnd: moment(Date.now()._i).format('YYYY-MM-DD'),
                                authorizeNum: values.authorize_num,
                                brandTakePeople: values.Subordinate,
                                approveDate: moment(this.state.approve_date).format('YYYY-MM-DD HH:mm:ss'),
                                addField: JSON.stringify(adds)
                            })
                                .then((res) => {
                                    //         console.log(res)
                                    if (res.data.status == 10000) {
                                        window.location = "/index.html#/ClientCheck"
                                    }else{
                                        message.error(res.data.message)
                                    }
                                })
                        } else {
                            console.log(this.state.approve_date, "2")
                            ajax.post('/hcm/dealer/update', {
                                module: "DEALER",
                                fieldSource: 2,
                                dealername: values.CustomerName,
                                id: this.props.match.params.id,
                                memoDealername: values.NameOfNote,
                                authorizeStart: moment(Date.now()._i).format('YYYY-MM-DD'),
                                authorizeEnd: moment(Date.now()._i).format('YYYY-MM-DD'),
                                authorizeNum: values.authorize_num,
                                brandTakePeople: values.Subordinate,
                                approveDate: moment(Date.now()._i).format('YYYY-MM-DD HH:mm:ss'),
                                addField: JSON.stringify(adds)
                            })
                                .then((res) => {
                                    //         console.log(res)
                                    if (res.data.status == 10000) {
                                        window.location = "/index.html#/ClientCheck"
                                    }else{
                                        message.error(res.data.message)
                                    }
                                })
                        }

                    } else {
                        message.error("请选择授权期限！")
                    }

                }
 
            }
        })

    }
    SuccessBTN = () => {

    }
    ErrorBTN = () => {
        window.location = "/index.html#/ClientCheck"
    }
    handleChange = (value) => {
        //console.log(value)
    }
    onChange = (date, dateString) => {
        // console.log(dateString);
        this.setState({
            approve_end: dateString[1],
            approve_start: dateString[0]
        })
    }
    onChangeX = (date, dateString) => {
        console.log(date._i,dateString)
        this.setState({
            approve_date: dateString+" 00:00:00"
        })
        console.log(this.state.approve_date)
    }


    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(CustomerEditor)