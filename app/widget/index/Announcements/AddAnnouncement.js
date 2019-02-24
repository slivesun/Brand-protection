import {message,Breadcrumb,Input,Select,TreeSelect, Upload, Button, Icon} from 'antd';
import ajax from '../../../js/common/ajax';
import lib from '../../../js/common/lib';
import Copyright from "../../components/Copyright";
// import {LoadingModal} from '../../components/LoadingModal/LoadingModal';
const Option = Select.Option;
const SHOW_ALL = TreeSelect.SHOW_ALL;
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[],
            noticeTypeList:[],
            departmentList:[],
            fileList:[],
            receive_departids:[],
            notice_title:null,
            notice_type:null,
            notice_content:null
        }
    }
    componentDidMount() {
       this.getNoticeTypeList();
       this.getDepartmentList();
    }
    handleChange = (content) => {
        this.setState({
            notice_content:content
        })
    }
    getDepartmentList=()=>{
        ajax.get('/hcm/department/fuByIds', {
            params: {
                id:0,
            }
        }).then((response) => {
            if(response.data.status=='10000'&&response.data.data){
                let data = response.data.data;
                let departmentList = this.state.departmentList;
                function format(data){
                    return data.map((item,index)=>{
                        if(item.subSysDepartment!=null){
                            return {
                                title:item.departName,
                                value:`${item.id}`,
                                key: `${item.id}`,
                                children:format(item.subSysDepartment)
                            }
                        }else{
                            return {
                                title:item.departName,
                                value:`${item.id}`,
                                key: `${item.id}`,
                            }
                        }
                    })
                }
                departmentList = [{
                    title:'全部',
                    value:'all',
                    key:'all',
                    children:format(data)
                }]
                    
                this.setState({
                    departmentList:departmentList
                })
            }
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    getNoticeTypeList(){
        ajax.get('/hcm/sys/GetList', {
            params: {
                dictcode:'notice_type'
            }
        })
        .then((response) => {
            this.setState({
                noticeTypeList:response.data.data
            })
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }
    chTreeSelect=(value, label, extra, type)=>{
        let state = this.state;
        if(type == 'receive_departids'){
            if(extra.triggerValue==='all'){
                state[type] = extra.checked ?  this.checkAll() : [];
            }else{
                
                let checkAll = value.filter((item,index)=>item.value=='all');
                if((value.length ==  this.checkAll().length-1)&&checkAll.length==0){
                    state[type] = this.checkAll();
                }else{
                    if(checkAll.length){
                        value.splice(0,1)
                    }
                    state[type] = value;
                }
                
            }
        }else{
            state[type] = value;
        }
        this.setState(state)
    }
    checkAll(){
        let {departmentList} = this.state;
        let arr = [];
        
        const recursive = (data)=>{
            data.forEach((item,index)=>{
                let {title,value} = item;
                arr.push({
                    label:title,value
                })
                if(item.children){
                    recursive(item.children)
                }
            })
        }
        recursive(departmentList)
        console.log(arr);
        return arr
    }
    onSubmit=()=>{
        let {notice_title,receive_departids,notice_type,notice_content,fileList} = this.state;
        
        if(!notice_title||notice_title.length ==0){
            message.error('请输入公告主题');
            return
        }
        if(!lib.legnthCheck(notice_title.trim(),'INPUT')){
            message.error('公告主题字符长度不能超过50');
            return
        }
        if(!notice_type){
            message.error('请选择类型');
            return
        }
        if(!receive_departids||receive_departids.length ==0){
            message.error('请选择接收部门');
            return
        }
        let oDiv = document.createElement('div');
        oDiv.innerHTML = notice_content;
        if(notice_content==null||oDiv.innerText.length==0){
            message.error('请输入内容');
            return
        }
        LoadingModal({bl:true,text:'提交中,请稍后...'})
        if(receive_departids.findIndex(item=>item.value=='all')!==-1){
            receive_departids.splice(receive_departids.findIndex(item=>item.value=='all'),1)
        }
        ajax.post('/hcm/notice/Create', {
            notice_title,
            receive_departids:receive_departids.map((item,index)=>item.value).join(','),
            notice_type,
            notice_content,
            attach_urls: JSON.stringify(fileList)
        }).then((response) => {
            LoadingModal({bl:false})
            if(response.data.status=='10000'){
                message.success('成功')
                this.setState({
                    fileList:[],
                    receive_departids:[],
                    notice_title:null,
                    notice_type:null,
                    notice_content:null
                },()=>{
                    // this.editorInstance.setContent(null, 'html')
                    window.location.href = '/index.html#/Announcements';
                })
            }else{
                message.error(response.data.message)
            }
        }).catch((error) => {
            message.error(error.statusText);
            LoadingModal({bl:false})
        });
    }
    upChange = (info) => {
        let fileList = info.fileList;
        if(this.beforeUpload(info.file,false)){
            this.setState({ fileList });
        }
        
    }
    beforeUpload = (file,bl=true)=>{
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
    render() {
        let {noticeTypeList,departmentList,notice_title,receive_departids,notice_type,notice_content,fileList} = this.state;
        const editorProps = {
            contentFormat: 'html',
            media:{
                allowPasteImage: false, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: false, // 开启图片插入功能
                video: false, // 开启视频插入功能
                audio: false, // 开启音频插入功能
            },
            placeholder:'请输入公告内容',
            onChange: this.handleChange,
            initialContent:notice_content,
            controls:[
                'undo', 'redo', 'split', 'font-size', 'font-family', 'line-height', 'letter-spacing',
                'indent','text-color', 'bold', 'italic', 'underline', 'strike-through',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'split',  'list_ul',
                'list_ol', 'blockquote', 'code', 'split', 'link',   'split', 'clear'
            ]
        }
        const props = {
            action: '/hcm/hcmWorkOrder/headUpload',
            onChange: this.upChange,
            beforeUpload:this.beforeUpload,
            multiple: true,
        };
        return (
            <div className='add-announcements'>
                <div className='Breadcrumb'>
                    <Breadcrumb>

                        <Breadcrumb.Item><a href='/index.html#/Announcements'>通知公告</a></Breadcrumb.Item>
                        <Breadcrumb.Item>新增公告</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='content'>
                    <ul className='items'>
                        <li className='item'>
                            <span className='title red-ck'>公告主题</span>
                            <div className='ipt-box'>
                                <Input onChange={e=>{this.setState({notice_title:e.target.value})}} value={notice_title} placeholder='请输入'/>
                            </div>
                        </li>
                        <li className='item'>
                            <span className='title red-ck'>公告类型</span>
                            <div style={{position: 'relative' }} id="alert-type" className='ipt-box'>
                                <Select
                                    style={{width:'100%'}}
                                    showSearch
                                    placeholder='请选择'
                                    getPopupContainer={() => document.getElementById('alert-type')}
                                    value={notice_type?notice_type:undefined}
                                    onChange={(value, label, extra) => this.chTreeSelect(value, label, extra, 'notice_type')}
                                    
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        noticeTypeList.map((item,index)=>{
                                            return(
                                                <Option key={index} value={item.id}>{item.dictName}</Option>
                                            )
                                        })
                                    }
                                
                                </Select>
                            </div>
                        </li>
                        <li className='item'>
                            <span className='title red-ck'>接收部门</span>
                            <div style={{position: 'relative' }} id="department"  className='ipt-box'>
                                    <TreeSelect
                                    allowClear
                                    multiple
                                    showSearch
                                    getPopupContainer={() => document.getElementById('department')}
                                    treeCheckStrictly={true}
                                    placeholder='请选择'
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_ALL}
                                    treeDefaultExpandedKeys={['all']}
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                                    value={receive_departids}
                                    treeData={departmentList}
                                    onChange={(value, label, extra) => this.chTreeSelect(value, label, extra, 'receive_departids')}
                                    />
                            </div>
                        </li>
                        <li style={{width:'100%',alignItems: 'end'}} className='item'>
                            <span className='title red-ck'>公告内容</span>
                            <div style={{width:'80%',border: '1px solid #e5e5e5',borderRadius:'2px'}} className='ipt-box'>
                                <BraftEditor  ref={instance => this.editorInstance = instance} {...editorProps}/>
                            </div>
                        </li>
                        <li style={{width:'100%',alignItems: 'end'}} className='item'>
                            <span style={{paddingTop:'8px'}} className='title'>上传附件</span>
                            <div className='ipt-box'>
                                <Upload {...props} fileList={fileList}>
                                    <Button >
                                        <Icon type="upload" /> 选择文件
                                    </Button>
                                    <span>支持扩展名：.rar .zip .doc .docx .xls .xlsx .ppt .pptx .pdf .jpg .png</span>
                                </Upload>
                            </div>
                        </li>

                        
                        <li className='item'>
                            <span className='title'></span>
                            <div className='ipt-box'>
                               <Button className='upsure' onClick={()=>this.onSubmit()}>提交</Button>
                               <a href='/index.html#/Announcements'><Button>取消</Button></a>
                            </div>
                        </li>
                    </ul>
                </div>
                <Copyright clazzName='copyright' />
            </div>
        )
    }
}
export default App