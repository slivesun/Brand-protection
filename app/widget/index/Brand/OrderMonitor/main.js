import Tpl from './tpl';
import {Icon,Popover} from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        let arr = [];
        
        this.state = {
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,

            platform : '1', 
            store : null, 
            creattime : [moment().subtract(7, 'days'),moment()], 
            orderno : null, 
            customer : null,

            dataList: arr,

            inviteLinkStatus:false
        }
    }
    componentDidMount() {
        this.getList()
        
    }
    inviteLinkStatus = (bl) => {
        this.setState({
            inviteLinkStatus: bl
        })
    }
    onRangePicker = (dates)=>{
        this.setState({
            creattime:dates
        })
    }
    onSearch= () =>{
        this.setState({
            pageNo:1
        },()=>{
            this.getList()
        })
    }
    getList = () => {
        
        let {pageNo,pageSize,store,creattime,orderno,customer} = this.state;
        ajax.get('/hcm/monitorDingDan/list', {
            params: {
                pageNo,pageSize,
                wangwang:store,
                dealer_name:customer,
                tid:orderno,
                start_date:creattime[0]?creattime[0].format('YYYY-MM-DD'):null,
                end_date:creattime[1]?creattime[1].format('YYYY-MM-DD'):null
            }
        }).then((response) => {
            let {content,pageNumber,pageSize,totalElements} = response.data.data;
            this.setState({
                pageNo: pageNumber,
                pageSize: pageSize,
                totalNum: totalElements,
                dataList: content,
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    
    chSearchIpt = (e,type)=>{
        let state = this.state;
        state[type] =  type=='platform' ? e : e.target.value;
        this.setState(state)

    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    domPopoverContent = (item)=>{
        return(
            <div className='popover-content'>
                <div className='img-box'>
                    <a target='_blank' href={item.img}>
                        <img src={item.itempic} />
                    </a>
                </div>
                <div className='info-box'>
                    <h6>商品名称</h6>
                    <p>{item.itemtitle}</p>
                    <h6>SKU信息</h6>
                    <p>{item.itemskuprop}</p>
                    <h6>价格</h6>
                    <p>¥ {item.itemprice}</p>
                </div>
            </div>
        )
    }
    formatColumn = () => {
        let column = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1
        },{
            title: '创建时间',
            dataIndex: 'tradecreated',
            key: 'tradecreated',
            render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },{
            title: '订单编号',
            dataIndex: 'tid',
            key: 'tid',
            render: (text, record, index) => {
                return(
                    <Popover content={this.domPopoverContent(record)} trigger="hover">
                        <a>{text}</a>
                    </Popover>
                )
            }
        },
        // {
        //     title: '买家昵称',
        //     dataIndex: 'buyer_nick',
        //     key: 'buyer_nick',
        //     render:(text, record, index) =>(
        //         <p>
        //             {text}
        //             {
        //                 record.platform_name.indexOf('天猫') >=0 ?
        //                 <img style={{verticalAlign:'bottom',paddingLeft:'10px'}} src='../../../img/icon/Tmall.png'/>
        //                 :
        //                 <img style={{verticalAlign:'bottom',paddingLeft:'10px'}} src='../../../img/icon/Taobao.png'/>
        //             }
                    
        //         </p>
        //     )
        // },
        {
            title: '购买数量',
            dataIndex: 'buy_num',
            key: 'buy_num'
        },{
            title: '订单金额',
            dataIndex: 'trade_money',
            key: 'trade_money'
        },{
            title: '店铺旺旺',
            dataIndex: 'wangwang',
            key: 'wangwang',
            render: (text,item,index)=> {
                return(
                    <React.Fragment>
                        <span style={{padding:'10px 0px 0px'}}>{text}</span>
                        <span style={{padding:'5px 10px'}}>
                            {
                                item.platform == '天猫' ?
                                <img style={{verticalAlign:'bottom',paddingRight:'10px'}} src='../../../img/icon/Tmall.png'/>
                                :
                                <img style={{verticalAlign:'bottom',paddingRight:'10px'}} src='../../../img/icon/Taobao.png'/>
                            }
                        </span>
                    </React.Fragment>
                )
            }
        },{
            title: '订单状态',
            dataIndex: 'status',
            key: 'status'
        }]
        return column
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
        //console.log(1)
        this.setState({
            pageNo: 1,
            pageSize: size,
        }, () => {
            this.getList()
        })
    }
    
    render() {
        return <Tpl that={this} />
    }
}
export default App
