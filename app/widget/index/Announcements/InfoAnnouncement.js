import { message, Breadcrumb, Button, Icon,Tooltip } from 'antd';
import ajax from '../../../js/common/ajax';
import Copyright from "../../components/Copyright";

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                noticeDepartsList: [],
                attach_urls: [],
                dealist:[]
            }
        }
    }
    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {

        ajax.get('/hcm/notice/Detail', {
            params: {
                notice_id: this.props.match.params.id
            }
        })
        .then((response) => {
            response.data.data.attach_urls = JSON.parse(response.data.data.attach_urls);
            this.setState({
                data:response.data.data
            })
        })
        .catch((error) => {
            message.error(error.statusText);
        });
    }

    render() {
        let { data } = this.state;
        const editorProps = {
            contentFormat: 'html',
            disabled: true,
            height: '100%',
            controls: [],
            initialContent: data.notice_content
        }
        let {noticeDepartsList = [],dealist=[]} = data;
        return (
            <div className='info-announcements'>
                <div className='Breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item><a href='/index.html#/Announcements'>通知公告</a></Breadcrumb.Item>
                        <Breadcrumb.Item>公告详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='content'>
                    <header className='header-box'>
                        <h5 className='title'>{data.notice_title}</h5>
                        <div className='info-text'>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <span >{data.notice_typename}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                <span>{moment(data.createtime).format('YYYY-MM-DD HH:mm:ss')}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                {
                                localStorage.logintype == "HCM"||localStorage.logintype == "HCMSUB" ? 
                                <React.Fragment>
                                <span>From：{data.user_name}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                <Tooltip overlayStyle={{maxWidth:'inherit'}} placement="bottom" title={`To：${noticeDepartsList ? noticeDepartsList.map((item,index)=>item.depart_name):null}、`}>
                                    <span className='departs'>To：{noticeDepartsList ? noticeDepartsList.map((item, index) => item.depart_name + ' 、'):null}</span>
                                </Tooltip>
                                
                                </React.Fragment>
                                :null
                                }
                            </div>
                            <div className='unread'>
                                {
                                localStorage.logintype == "HCM"||localStorage.logintype == "HCMSUB" ? 
                                    <React.Fragment>
                                    <Tooltip placement="bottom" title={<ul>{dealist? dealist.map((item,index)=><li key = {index} >{item}</li>):null}</ul>}>
                                        <span className=''>共 {dealist? dealist.length:null} 人未读</span>
                                    </Tooltip>
                                    </React.Fragment>
                                :null
                                }
                            </div>
                            
                            
                        </div>
                    </header>
                    <div className='editor-box'>
                        <BraftEditor {...editorProps} />
                    </div>
                    {
                        data.attach_urls.length ?
                            <ul className='attach-urls'>
                                <li className='attach-header'>
                                    <span style={{ fontSize: '22px' }}>附件</span>
                                    <span>共 {
                                        data.attach_urls.length
                                    } 个附件</span>
                                </li>
                                {
                                    data.attach_urls.map((item, index) => {
                                        console.log(item)
                                        return (
                                            <li key={index}><Icon type="paper-clip" /><a href={`/hcm/hcmWorkOrder/downLoadFile?filename=${item.response.data.data}`}>{item.name}</a></li>
                                        )
                                    })
                                }
                            </ul>
                            : null
                    }

                </div>
                <Copyright clazzName='copyright' />
            </div>
        )
    }
}
export default App