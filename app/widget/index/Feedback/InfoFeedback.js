
import { message } from 'antd';
import ajax from '../../../js/common/ajax';
import Copyright from "../../components/Copyright";
import ContentBox from '../../components/Layout'
import {ImgModal} from "../../components/ImgModal/ImgModal";
// import {LoadingModal} from '../../components/LoadingModal/LoadingModal';
import { Breadcrumb, Input, Upload, Icon, Button } from 'antd';
const { TextArea } = Input;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            details: '',
            screenshotUrls: [],
            id:this.props.match.params.id
        }
    }
    componentDidMount() {
        this.getDetail()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.match.params.id!==nextProps.match.params.id){
            this.setState({
                id:nextProps.match.params.id
            },()=>{
                this.getDetail()
            })
            
        }
    
    }
    lookImg(urls,index){
        ImgModal({bl:true,urls:urls,index:index,close:true})
    }
    getDetail() {
        ajax.get('/hcm/hcmWorkOrder/selectdetail', {
            params: {
                id: this.state.id,
                replyId: this.state.id,
            }
        }).then((response) => {
            this.setState({
                details: null,
                screenshotUrls: [],
                dataList: response.data.data
            })

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onChanges(e, type) {
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)
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
    onSubmit() {
        let { details, screenshotUrls } = this.state;
        if (!details || details.length <= 0) {
            message.error('请输入详情');
            return
        }
        if(details&&details.length>500){
            message.error(`详情长度不允许超过500字符，当前字符长度${details.length}`);
            return
        }
        LoadingModal({bl:true,text:'提交中,请稍后...'})
        ajax.get('/hcm/hcmWorkOrder/saveWorkOrder', {
            params: {
                workTitle:'',
                sysType: localStorage.logintype,
                details: details,
                screenshotUrls: screenshotUrls.map((item,index)=>item.response.data.data).join(','),
                status: 1,
                replyId:this.props.match.params.id
            }
        }).then((response) => {
            LoadingModal({bl:false})
            if (response.data.status == '10000') {
                message.success(response.data.message);
                this.getDetail()
            }
        }).catch((error) => {
            LoadingModal({bl:false})
            message.error(error.statusText);
        });
    }
    render() {
        let { dataList, details='', screenshotUrls } = this.state;
        return (
            <ContentBox
                breadcrumbList={['工单信息', '工单详情']}
                linkList={['1', '']}
                history={this.props.history}
            >
            <div className='infofeedback'>

                {/* <div className='Breadcrumb'>
                    <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a href='/index.html#/Feedback'>
                                工单信息
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            工单详情
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div> */}
                {
                    dataList.length ?


                        <div className='content'>

                            <h2>{dataList[0].workTitle}</h2>
                            <ul className='infolist'>
                                {dataList.map((item,index)=>{
                                    let {realname,details,screenshotUrls,createtime=0} = item;
                                    let urls = screenshotUrls==null || screenshotUrls == '' ? [] :screenshotUrls.split(',');
                                    return(
                                        <li className='infolist-item' key={index}>
                                            <h6>{realname}</h6>
                                            <p>{moment(createtime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                            <pre style={{whiteSpace:'inherit'}}>{details}</pre>
                                            <div className='imgBox'>
                                                {
                                                    urls.length ? 
                                                    urls.map((url,index2)=>{
                                                        return <img onClick={()=>this.lookImg(urls,index2)} key={index2} src={url}/>
                                                    })
                                                    :null
                                                }
                                            </div>
                                        </li>
                                    )
                                })}
                                
                            </ul>

                            <h3>回复</h3>
                            <div  style={{position:'relative'}} className='info item'>
                                <TextArea value={details} onChange={(e) => this.onChanges(e, 'details')} placeholder='回复内容' className='textArea' />
                                <p style={details&&details.length>500 ? { color:'red'}:{ color:'#999'}} className='length-alert'>{`${details ? details.length:0}/500`}</p>
                            </div>
                            <div className='upload item'>
                                <div style={{ width: '100%' }}>
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
                                            <div className="ant-upload-text">上传截图</div>
                                        </div>
                                    </Upload>
                                </div>
                            </div>
                            <div className='buts'>
                                <Button className='btn2-main' onClick={() => this.onSubmit()}>提交</Button>
                                <a href='/index.html#/Feedback'>
                                    <Button>
                                        取消
                                    </Button>
                                </a>



                            </div>
                        </div>
                        : null
                }
                {/* <Copyright clazzName='copyright' /> */}
            </div>
            </ContentBox>
        )
    }
}
export default App;
