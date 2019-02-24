import Tpl from './tpl';
import { Modal, message,Divider, Menu, Dropdown, Icon,Tooltip } from 'antd';
import ajax from '../../../js/common/ajax';
import Shopicon from '../../components/platform';
import Ptchat from '../../components/ptchat';
const confirm = Modal.confirm;


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Identity:'',//用户身份信息
            size: 'large',
            checkAll: false,
            selectedRowKeys: [],
            Draweroff: true,//抽屉是否可见
            NewComplaint: false,//新增对话框是否可见
            platformData:[],
            endValue: null,//下次跟进时间
            endOpen: false,//下次跟进时间
            startValue: null,
            newPT:'',//商家平台
            newSJ:'',//商家名称
            newSP:'',//商品链接
            shopid:'10003',//商品ID，10003为默认不存在商品ID唤醒对话框
            newSPD:'',//新增商品短连接
            querySJ:'',//查询商家名称
            queryPT:'',//查询商家平台
            queryZT:'',//查询状态
            queryTIMEp:'',//查询时间上个
            queryTIMEn:'',//查询时间下个
            pageNumber:1,//页码
            pageNo:1,//页码
            pageSize:10,//数量
            SCdata:[],//table数据
            shopname:'',//抽屉店铺名
            status:'',//抽屉店铺状态
            Remark:'',//备注
            statusAll:['邮件待发送','邮件已发送','邮件已驳回','邮件已回复','完结'],
            shoplink:'',//抽屉店铺链接
            processing_times:'',//抽屉第几次处理
            id:'',//数据库ID
            Shopicon:'',//抽屉平台图标
            newZT:'',//抽屉添加时状态
            nextTIME:'',//新增历史记录下次跟进时间
            previewVisible: false,//shanchuan
            previewImage: '',
            fileList: [],
            upfileList:[],
            totalElements:null,//列表总条数
            idAll:[],//删除ID数组
            historyList:[1,2],//历史记录数组
        }
    }
    componentDidMount(){
        this.platform()
        //this.ceshi()
        this.querycontent()
        this.getinfo()
    }
    //获取用户身份信息
    getinfo = () =>{
        let {Identity} = this.state;
        Identity = localStorage.getItem("logintype")
        this.setState({Identity})
    }
    //获取平台信息
    platform = async()=>{
        let {platform,platformData} = this.state
        console.log('999999999999')
        await ajax.post('/hcm/sys/GetList', {
            dictcode:'platform'
        })
        .then((res) => {
            console.log(res)
            if(res.data.status =='10000'){
                let platformData = res.data.data
                
                console.log(platformData)
                this.setState({platformData})
            }else{
                message.error(res.data.message);
            }
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }


    //搜索商家名称change
    querysj = (ev) =>{
        let {value:querySJ} = ev.target;
        this.setState({querySJ})
        console.log(querySJ)
    }
    //搜索下拉框状态选择change
    queryzt = (value) =>{
        let {queryZT} = this.state;
        if (value.key == '请选择') {
            queryZT = '';
        } else {
            queryZT = value.key;
        }
        
        this.setState({queryZT})
    }
    //时间选择框change
    selecttime = (dates, dateStrings) => {
        let {queryTIMEp,queryTIMEn} = this.state;
        //判断是否有选择时间 上一个时间dateStrings[0] 下一个时间dateStrings[1]
        if (dateStrings[0]) {
            queryTIMEp = dateStrings[0] + ' 00:00:00'
            queryTIMEn = dateStrings[1] + ' 23:59:59'
            console.log('有树枝')
        } else {
            queryTIMEp = ''
            queryTIMEn = ''
        }
        this.setState({queryTIMEp,queryTIMEn})
    }
    //平台change
    querypt = (value) =>{
        let {queryPT} = this.state
        if (value.key == '请选择') {
            queryPT = '';
        } else {
            queryPT = value.key;
        }
        
        this.setState({queryPT})

    }


    //查询按钮
    querycontent = () =>{
        let {querySJ,queryPT,queryZT,pageNumber,pageSize,queryTIMEp,queryTIMEn,SCdata,pageNo,totalElements,statusAll} = this.state
        if (queryTIMEn != '' && queryTIMEp != '' ) {
            ajax.get('/hcm/hcmComplaintHandling/getList', {
                params: {
                    shopName:querySJ,
                    platform:queryPT,
                    status:queryZT,
                    pageNo:pageNo,
                    pageSize:pageSize,
                    begintime:queryTIMEp,
                    endtime:queryTIMEn,
                }
            }).then(res => {
                console.log(res)
                console.log('111111111111')
                if(res.data.status == 10000){
                    let data = res.data.data.content;
                    totalElements = res.data.data.totalElements
                    SCdata = data.map((e,i)=>{
                        return {
                            key:pageSize*(pageNo-1) + (pageNo*i+1),
                            onumber:pageSize*(pageNo-1) + (pageNo*i+1),
                            pticon:Shopicon(e.platform),
                            ptchat:Shopicon(e.platform),
                            shopname:e.shop_name,
                            shoplink:e.shoplink,
                            shopid:e.shopid,
                            bmcid:e.bmcid,
                            clockstatus:e.clockstatus,//脑中线是状态
                            send_number:e.send_number,
                            againtime:e.againtime,
                            status:statusAll[e.status],
                            updatetime:e.updatetime,
                            id:e.id,
                            processing_times:e.processing_times,
                            platform:e.platform
                        }
                    })
                    this.setState({SCdata,totalElements})
                }
                
            })
            console.log(queryTIMEn,queryTIMEp)
        } else {
            queryTIMEp = moment().subtract(3, 'months').format('YYYY-MM-DD HH:mm:ss')
            queryTIMEn = moment().format('YYYY-MM-DD HH:mm:ss')
            console.log(queryTIMEp,queryTIMEn)
            ajax.get('/hcm/hcmComplaintHandling/getList', {
                params: {
                    shopName:querySJ,
                    platform:queryPT,
                    status:queryZT,
                    pageNo:pageNo,
                    pageSize:pageSize,
                    begintime:queryTIMEp,
                    endtime:queryTIMEn
                }
            }).then(res => {
                console.log(res)
                
                if(res.data.status == 10000){
                    let data = res.data.data.content;
                    totalElements = res.data.data.totalElements
                    console.log(data)
                    SCdata = data.map((e,i)=>{
                        return {
                            key:pageSize*(pageNo-1) + (i+1),
                            onumber:pageSize*(pageNo-1) + (i+1),
                            pticon:Shopicon(e.platform),
                            ptchat:Shopicon(e.platform),
                            shopname:e.shop_name,
                            shoplink:e.shoplink,
                            shopid:e.shopid,
                            bmcid:e.bmcid,
                            clockstatus:e.clockstatus,//闹钟状态
                            send_number:e.send_number,
                            againtime:e.againtime,
                            status:statusAll[e.status],
                            updatetime:e.updatetime,
                            id:e.id,
                            processing_times:e.processing_times,
                            platform:e.platform
                        }
                    })
                    this.setState({SCdata,totalElements})
                }
                
            })
        }

    }
    //内容勾选框
    onTableCheckChange = (selectedRowKeys) => {
        let {SCdata} = this.state;
        let idAll = []
        selectedRowKeys.forEach((e,i)=>{
            idAll.push(SCdata[selectedRowKeys[i]-1].id)
        })
        console.log(idAll)
        this.setState({
            selectedRowKeys: selectedRowKeys,
            checkAll: false,
            idAll
        });
    }
    //取消勾选全部
    cancelcheckAll = (status) =>{
        let {selectedRowKeys} = this.state;
        selectedRowKeys.length=0;
        this.setState({checkAll:status,selectedRowKeys})
    }
    //勾选全部
    DelecheckAll = (status) =>{
        let {selectedRowKeys,totalElements,pageNo,pageSize} = this.state;
        selectedRowKeys = [];
        for (let i = pageSize*(pageNo-1); i < pageSize*pageNo; i++) {
            selectedRowKeys.push(i+1)
        }
        this.setState({selectedRowKeys,checkAll:status})
    }
    //批量删除对话框
    DeleteComplaint = (item)=>{
        let {selectedRowKeys,totalElements,checkAll,idAll,querySJ,queryPT,queryZT,queryTIMEp,queryTIMEn} =this.state;
        let that = this;
        idAll = checkAll == true?'checkAll':idAll.join(",")
        confirm({
            title: null,
            className:'alert-item-confirm YellowWhite',
            content:<div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除这{selectedRowKeys.length == 0 ? 0 :checkAll == true ? totalElements :selectedRowKeys.length}项吗?</p><p >删除后<span className='red'>将无法恢复!</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                ajax.post('/hcm/hcmComplaintHandling/delectHcmComplaintHandling', {
                    ids:idAll,
                    shopName:checkAll == true?querySJ:null,
                    platform:checkAll == true?queryPT:null,
                    status:checkAll == true?queryZT:null,
                    begintime:checkAll == true?queryTIMEp:null,
                    endtime:checkAll == true?queryTIMEn:null
                })
                .then((response) => {
                    console.log(response)
                    if(response.data.status=='10000'){
                        this.querycontent()
                        message.success(response.data.message);
                        console.log('222222222')
                    }else{
                        console.log('111111111111')
                        message.error(response.data.message);
                    }
                })
                .catch((error) => {
                    message.error('错误');
                });
            }
        });
    }
    

    
    ///打开抽屉
    showDrawer = (id,shopname,status,shoplink,processing_times,platform) => {
        console.log(id)
        let ic = Ptchat(platform)
        this.setState({
            Draweroff: true,
            shopname,
            status,
            shoplink,
            processing_times,
            id,
            Shopicon:ic
        });
    };
    //抽屉投诉状态处理
    newState = (value) =>{
        let {newZT} = this.state;
        console.log(value.key)
        this.setState({newZT:value.key})
    }
    upfilechange = (info) => {
        let {upfileList} = this.state;
        upfileList = info.fileList;
        console.log(upfileList)
        if(this.upfile(info.file,false)){
            this.setState({ upfileList });
        }
    }
    upfile = (file,bl=true) => {
        let type = '.rar .zip .doc .docx .xls .xlsx .ppt .pptx .pdf .jpg .png';
        let filename = file.name;
        var index = filename.lastIndexOf(".");
        var ext = filename.substr(index+1);
        if(type.indexOf(ext)===-1){
            if(bl){
                message.error(`暂不支持${filename}文件格式`);
            }
            return false
        }
        return true
        
    }
    // 抽屉备注
    remark =(ev) =>{
        let {Remark} = this.state;
        Remark = ev.target.value;
        this.setState({Remark})
        console.log(Remark)
    }
    //历史记录新增确定
    newHistory = () =>{
        let {newZT,status,id,Remark,nextTIME,fileList,upfileList,processing_times} = this.state;
        if (newZT != status) {
            ajax.post('/hcm/hcmComplaintHandling/saveHistory', {
                handlingid:id,
                status:newZT,
                againtime:nextTIME?nextTIME:null,//// 下次跟进时间,
                image:fileList.length ? fileList.map((item,index)=>item.response.data.data).join(','): null,
                file:upfileList.length ? fileList.map((item,index)=>item.response.data.data).join(','): null,// 附件,
                remark:Remark?Remark:null,// 备注,
                processingTimes:processing_times// 链接处理次数 必传

            })
            .then((res) => {
                console.log(res)
                if(res.data.status =='10000'){
                    message.success(res.data.message);
                    this.setState({Draweroff:false})
                }else{
                    message.error(res.data.message);
                }
            })
            .catch((error) => {
                message.error(error.statusText);
            });
        } else {
            message.error('状态不能与当前状态一致');
        }
    }
    //历史记录获取
    Drawertabschange = (key) => {
        console.log(key);
        let {id,historyList} = this.state;
        if (key == '2') {
            ajax.get('/hcmComplaintHandling/selectHistoryList', {
                params: {
                    handlingid:id,
                    
                }
            }).then(res => {
                console.log(res)
                if(res.data.status == 10000){
                    historyList = res.data.list
                    this.setState({historyList})
                }
                
            })
        }
    }
    ///关闭抽屉
    onClose = () => {
        this.setState({
            Draweroff: false,
        });
    };


    //新增对话框
    //--新增平台下拉change
    newAchange =(value)=> {
        let {newPT,op} =this.state;
        console.log(value);
        this.setState({newPT:value.key})
    }
    newsj = (ev) => {
        let {value:newSJ} =ev.target;
        newSJ = newSJ.replace(/\s+/g,'')
        this.setState({newSJ})
    }
    newsp = (ev) => {
        let {shopid,newSPD} = this.state
        let {value:newSP} =ev.target;
        let SP = newSP.replace(/\s+/g,'')
        //淘宝天猫
        if (SP.indexOf('tmall.com') != -1 || SP.indexOf('taobao.com') != -1) {
            
            if (SP.indexOf('?')) {
                let Website = SP.split('?')[0]
                if (SP.indexOf('?') && SP.indexOf('&')) {
                    let arr = SP.split('?')[1].split('&').map(e=>{
                        return e.split('=')
                    })
                    let id = ''
                    arr.forEach((e,i)=>{
                        if(e[0] == 'id'){
                            id = e[1]
                        }
                    })
    
                    newSPD = Website + '?id=' + id
                    
                    console.log(newSPD,id)
                    this.setState({shopid:id,newSPD})
                }
                
            }
        } else if(SP.indexOf('jd.com') != -1){
            shopid = SP.replace(/[^0-9]/ig,"")
            newSPD = SP
            console.log(shopid,newSPD)
            this.setState({newSPD,shopid})
        } else if(SP.indexOf('1688.com') != -1){
            if (SP.indexOf('?')) {
                newSPD = SP.split('?')[0]
            } else {
                newSPD = SP
            }
            console.log(newSPD)
            this.setState({newSPD})
        } else if(SP.indexOf('suning.com') != -1 || SP.indexOf('gome.com') != -1 || SP.indexOf('amazon') != -1 || SP.indexOf('vip.com') != -1 || SP.indexOf('aliexpress.com') != -1){
            if (SP.indexOf('?')) {
                newSPD = SP.split('?')[0]
                console.log(shopid,newSPD)
                this.setState({newSPD})
            }
        } else if(SP.indexOf('yangkeduo.com') != -1){
            if (SP.indexOf('?')) {
                let Website = SP.split('?')[0]
                if (SP.indexOf('?') && SP.indexOf('&')) {
                    let arr = SP.split('?')[1].split('&').map(e=>{
                        return e.split('=')
                    })
                    let goods_id = ''
                    arr.forEach((e,i)=>{
                        if(e[0] == 'goods_id'){
                            goods_id = e[1]
                        }
                    })
                   
                    newSPD = Website + '?goods_id=' + goods_id
                    console.log(newSPD)
                    this.setState({newSPD})
                }
                
            }
        }
        console.log(SP)
        this.setState({newSP:SP})
        
    }
    //打开新增对话框
    showModal = () => {
        this.setState({
            NewComplaint: true,
        });
      }
    //新增确定按钮事件
    Newcomplaints = () => {
        let {newPT,newSPD,newSJ,shopid} = this.state;
        if(newPT && newSPD && newSJ){
            console.log(newPT,newSJ,newSPD,shopid)
            ajax.get('/hcm/hcmComplaintHandling/save', {
                params: {
                    platform:newPT,
                    shopName:newSJ,
                    shoplink:newSPD, 
                    shopid:shopid
                }
            }).then(res => {
                console.log(res)
                if(res.data.status == 10000){
                    message.success(res.data.message);
                    this.querycontent()
                    this.setState({newSJ:'',newSP:''})
                }
                
            })
            this.setState({
                NewComplaint: false,
            });
        }else {
            message.error('至少有一项未填');
        }
        
    }
    //关闭对话框事件
    Closecomplaints = () => {
        let {NewComplaint,newSJ,newSP} = this.state;
        this.setState({
            NewComplaint: false,
            newSJ:'',
            newSP:''
        });
    }



    //未来时间选择
    nexttime = (value, dateString) =>{
        let {nextTIME} = this.state;
        console.log(dateString)
        this.setState({nextTIME:dateString})
    }
    
    onOk = (value) => {
        console.log('onOk: ', value);
    }


    //----------------------------------------------------
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        console.log(file.thumbUrl,file.url)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        console.log(fileList)
        this.setState({ fileList })
    }



    

    //页码跳转
    changePagination = (page, pageSize) =>{
        console.log(page, pageSize)
        let {checkAll} = this.state;
        
        this.setState({pageNo:page,pageSize:pageSize},()=>{
            this.querycontent()
            if (checkAll) {
                this.DelecheckAll()
                this.setState({checkAll:true})
            }
        })
    }
    onPaginationSize = (page, pageSize) => {
        let {checkAll} = this.state;
        console.log(page,pageSize)
        
        this.setState({pageNo:page,pageSize:pageSize},()=>{
            this.querycontent()
            if (checkAll) {
                this.DelecheckAll()
                this.setState({checkAll:true})
            }
        })
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;