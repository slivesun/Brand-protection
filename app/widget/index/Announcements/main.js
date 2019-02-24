import Tpl from './tpl';
import {message,Modal} from 'antd';
import ajax from '../../../js/common/ajax';
const confirm = Modal.confirm;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start_time:moment().subtract(3, 'months'),
            end_time:moment(),
            notice_title:null,
            notice_type:null,
            user_name:null,

            dataList:[],
            
            noticeTypeList:[],
            pageNo: 1,
            pageSize: 10,
            totalNum: null,
        }
    }
    componentDidMount() {
        this.getList()
        this.getNoticeTypeList();
    }
    onRangePicker = (e) =>{
        
        this.setState({
            start_time:e[0],
            end_time:e[1],
        })
    }
    chTreeSelect=(value, label, extra, type)=>{
        let state = this.state;
        state[type] = value;
        this.setState(state)
    }
    getNoticeTypeList=()=>{
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
    onSearch= () =>{
        this.setState({
            pageNo:1
        },()=>{
            this.getList()
        })
    }
    getList=()=>{
        let {pageNo,pageSize,start_time,end_time,notice_title,notice_type,user_name} = this.state;
        ajax.get('/hcm/notice/Getlist', {
            params: {
                pageNo:pageNo,
                pageSize:pageSize,
                start_time:start_time?start_time.format('YYYY-MM-DD HH:mm:ss'):null,
                end_time:end_time?end_time.format('YYYY-MM-DD HH:mm:ss'):null,
                notice_title,notice_type,user_name
            }
        }).then((response) => {
            let data = response.data.data;
            this.setState({
                dataList: data.content,
                pageNo: data.pageNumber,
                pageSize: data.pageSize,
                totalNum: data.totalElements,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    chSearchIpt = (e,type)=>{
        let state = this.state;
        state[type] = e.target.value;
        this.setState(state)

    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
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
    rmDepart = (item)=>{
        let that = this;
        confirm({
            title:null ,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确认要删除该通知公告吗？</p><p>删除后<span className='red'>相关人员将不再能看到该公告</span></p></div>,
            okText: '确定',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk() {
                ajax.post('/hcm/notice/Delete',{
                    notice_id:item.id
                })
                .then((response) => {
                    if (response.data.status == '10000') {
                        that.getList()
                        message.success(response.data.message);
                    }
                })
                .catch((error) => {
                    message.error(error.statusText);
                });
            },
            
        });
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
