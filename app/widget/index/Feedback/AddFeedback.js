
import {message} from 'antd';
import ajax from '../../../js/common/ajax';
import Copyright from "../../components/Copyright";
import {Breadcrumb,Input,Upload, Icon,Button} from 'antd';
const { TextArea } = Input;
// import {LoadingModal} from '../../components/LoadingModal/LoadingModal';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workTitle:null,
            details:'',
            screenshotUrls:[]
        }
    }
    componentDidMount() {
       
    }

    onChanges(e,type){
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
    }
    
    onSubmit(){
        let {workTitle,details,screenshotUrls} = this.state;
        if(!workTitle||workTitle.length<=0){
            message.error('请输入标题');
            return
        }else if(workTitle&&workTitle.length>30){
            message.error(`标题长度不允许超过30字符，当前字符长度${workTitle.length}`);
            return
        }else if(!details||details.length<=0){
            message.error('请输入详情');
            return
        }else if(details&&details.length>500){
            message.error(`详情长度不允许超过500字符，当前字符长度${details.length}`);
            return
        }
        LoadingModal({bl:true,text:'提交中,请稍后...'})
        ajax.get('/hcm/hcmWorkOrder/saveWorkOrder', {
            params: {
                sysType:localStorage.logintype,
                workTitle:workTitle,
                details:details,
                screenshotUrls:screenshotUrls.length ? screenshotUrls.map((item,index)=>item.response.data.data).join(','): null,
                status:1
            }
        }).then((response) => {
            LoadingModal({bl:false})
            if(response.data.status == '10000'){
                message.success(response.data.message);
                window.location.href = '/index.html#/Feedback';
            }
            
        }).catch((error) => {
            LoadingModal({bl:false})
            message.error(error.statusText);
        });
    }
    changeUpload(info){
        const type = 'image/jpeg image/jpg image/png';
        const iStype = info.file.type.length ? type.indexOf(info.file.type) == -1 ? false : true :false;
        if (info.file.size / 1024 / 1024 < 10&&iStype) {
            this.setState({
                screenshotUrls:info.fileList
            })
        }
    }
    render() {
        let {workTitle,details,screenshotUrls} = this.state;
        return (
            <div className='addfeedback'>
            
                <div className='Breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href='/index.html#/Feedback'>
                                工单信息
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>新增工单</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            
                <div className='content'>
                    <div className='tit item'>
                        <span className='red-ck text'>工单标题：</span>
                        <Input value={workTitle} onChange={(e)=>this.onChanges(e,'workTitle')} placeholder='请输入，30字以内' className='input' />
                    </div>
                    <div style={{position:'relative'}} className='info item'>
                        <span className='red-ck text'>工单详情：</span>
                        <TextArea value={details} onChange={(e)=>this.onChanges(e,'details')} placeholder='请输入，500字以内' className='textArea' />
                        <p style={details.length>500 ? { color:'red'}:{ color:'#999'}} className='length-alert'>{`${details.length}/500`}</p>
                    </div>
                    <div className='upload item'>
                        <span className='text'>上传截图：</span>
                        <div style={{width:'100%'}}>
                            <Upload
                                action="/hcm/hcmWorkOrder/headImgUpload"
                                listType="picture-card"
                                accept="image/*"
                                onChange={info=>this.changeUpload(info)}
                                beforeUpload = {(file)=>{
                                    const isLt10M = file.size / 1024 / 1024 < 10;
                                    const type = 'image/jpeg image/jpg image/png';
                                    const iStype = file.type.length ? type.indexOf(file.type) == -1 ? false : true :false;
                                    if (!isLt10M) {
                                        message.error('图片不能大于10MB!');
                                    }
                                    if (!iStype) {
                                        message.error('支持图片格式jpeg，jpg，png。请重新选择');
                                    }
                                    return isLt10M&&iStype;
                                }}
                                fileList={screenshotUrls}
                                
                            >
                                <div>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            </Upload>
                        </div>
                    </div>
                    <div className='buts'>
                        <Button className='gdsubm' onClick={()=>this.onSubmit()}>提交</Button>
                        <a href='/index.html#/Feedback'>
                            <Button>
                                取消
                            </Button>
                        </a>
                    </div>
                </div>
                <Copyright clazzName='copyright' />
            </div>
        )
    }
}
export default App;
