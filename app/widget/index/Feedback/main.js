import Tpl from './tpl';
import {message} from 'antd';
import ajax from '../../../js/common/ajax';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:null,
            pageNo: 1,
            pageSize: 10,
            totalNum: null,
            dataList:[]
        }
    }
    componentDidMount() {
       this.getList()
    }
    onSearch= () =>{
        this.setState({
            pageNo:1
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        let {pageNo,pageSize,title,totalNum} = this.state;
        ajax.get('/hcm/hcmWorkOrder/getListWorkOrder', {
            params: {
                title:title,
                sysType:localStorage.logintype,
                pageNo:pageNo,
                pageSize:pageSize,
                userid:23
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
    onChange = (e,type) =>{
        let state = this.state;
        state[type] = e.target.value
        this.setState(state)
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
    
    formatColumn = ()=>{
        return[{
            title: '序号',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            align:'left',
            render:(text,item,index)=>index+1
          }, {
            title: '工单标题',
            dataIndex: 'work_title',
            key: 'work_title',
            width:'35%',
            render:(text,item,index)=>{
                if(localStorage.logintype=="ADMIN"){
                    return <a className={item.adminstatus ?  'title-text ':'title-text red-ck'} href={`/index.html#/InfoFeedback/${item.id}`}>{text}</a>
                }else{
                    return <a className={item.userstatus ?  'title-text ':'title-text red-ck'}  href={`/index.html#/InfoFeedback/${item.id}`}>{text}</a>
                }
            }
          }, {
            title: '提交用户',
            dataIndex: 'realname',
            key: 'realname',
            width:'25%',
          }, {
            title: '回复时间',
            dataIndex: 'updatetime',
            key: 'updatetime',
            align:'right',
            width:'25%',
            render:(text,item,index)=>moment(text).format('YYYY年MM月DD日 HH:mm:ss')
          }]
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
