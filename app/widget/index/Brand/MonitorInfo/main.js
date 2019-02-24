import Tpl from './tpl';
import { message } from 'antd';
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        let arr = [];
        let arr2 = []
        // for (let i = 0; i < 20; i++) {
        //     arr.push({
        //         fieldname:'fieldname'+i,
        //         fieldvalue:i,
        //         my_count:Math.floor(Math.random()*1000+100)
        //     })
        // }
        // for (let j = 0; j < 10; j++) {
        //     arr2.push({
        //         id:j,
        //         title:'商品名称'+j,
        //         picUrl:'http://d.hiphotos.baidu.com/image/pic/item/b17eca8065380cd79a75c52cad44ad3458828183.jpg',
        //         itemUrl:'https://item.taobao.com/item.htm?spm=a21bo.2017.201876.45.5af911d9DBg0D8&scm=1007.12493.92624.100200300000005&id=569041410305&pvid=3675afbd-6deb-4fdf-b24c-3ca2f31a3e69',
        //         shopname:'店铺'+j,
        //         discountPrice:j*20,
        //         sold30:j*10,
        //         state:'山西',
        //         area:'太原'
        //     })
        // }

        this.state = {
            pageNo: 1,
            pageSize: 10,
            totalNum: 0,

            date: moment(),
            priceList: arr,
            dataList: arr2,
            classInfo: {},
            targetItem: {}

        }
    }
    componentDidMount() {
        this.getClassInfo()
        this.getList()
    }
    
    getList = () => {
        let { date, pageNo, pageSize, targetItem } = this.state;
        LoadingModal({bl:true})
        ajax.get('/hcm/priceMonitor/Detail', {
            params: {
                pageNo,
                pageSize,
                price_type: targetItem.fieldvalue,
                id: this.props.match.params.id,
                my_date: moment(date).format('YYYY-MM-DD')
            }
        }).then((response) => {
            LoadingModal({bl:false})
            if (response.data.status == '10000') {

                this.setState({
                    pageNo: response.data.data.pageNumber,
                    pageSize: response.data.data.pageSize,
                    totalNum: response.data.data.totalElements,
                    dataList: response.data.data.content,
                    priceList: response.data.data.obj,
                    targetItem: JSON.stringify(targetItem)=='{}' ? response.data.data.obj[0] : targetItem
                })
            } else {
                message.error(response.data.message);
            }
        }).catch((error) => {
            LoadingModal({bl:false})
            message.error(error.statusText);
        });
    }
    
    editDate = (e) => {
        this.setState({
            date: e,
            pageNo:1
        }, () => {
            this.getList()
        })
    }
    getClassInfo = () => {
        ajax.get('/hcm/priceMonitor/DetailCount', {
            params: {
                id: this.props.match.params.id
            }
        }).then((response) => {
            this.setState({
                classInfo: response.data.data
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
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

    onScrollLeft = (bl) => {
        let num = $('.price-item').length * 240;
        let left = $('.price-list').scrollLeft();
        $('.price-list').stop(true, true);
        if (bl) {
            $('.price-list').animate({ scrollLeft: left + 900 }, 300)
        } else {
            $('.price-list').animate({ scrollLeft: left - 900 }, 300)
        }
    }
    onSelectItem = (item) => {
        this.setState({
            targetItem: item
        }, () => {
            this.getList()
        })
    }

    onExpand = (expanded, record) => {
        if (expanded) {
            let dataList = this.state.dataList;
            let num = null;
            dataList.forEach((item, index) => {
                if (item.itemlistid == record.itemlistid) {
                    num = index;
                }

            })
            let {targetItem } = this.state;
            ajax.get('/hcm/priceMonitor/DetailExp', {
                params: {
                    price_type: targetItem.fieldvalue,
                    id: this.props.match.params.id,
                    product_id: record.product_id,
                    wangwang:record.nickname
                }
            }).then((response) => {
                if (response.data.status == '10000') {
                    dataList[num].info = response.data.data;
                    this.setState({ dataList })
                } else {
                    message.error(response.data.message);
                }
            }).catch((error) => {
                message.error(error.statusText);
            });
            // dataList[num].info = 'ggggg'
            // this.setState({ dataList })
            //record => <p style={{ margin: 0 }}>{record.info}</p>
        }

    }
    rowRender = (record, index, indent, expanded)=>{
        if(record.info){
            let {custom_my,wangwang_my,accept_my,...list} = record.info;
            let dataList = Object.values(list)
            return <div className='rowRender'>
                <div className='a-info'>
                    
                    <h6>授权状态：{accept_my}</h6>
                    
                    <h6>旺旺名称：{wangwang_my}</h6>
                    <h6>所属客户：{custom_my}</h6>
                </div>
                <ul className='list-info'>
                    {
                        dataList.map((item,index)=>{
                            return(
                                <li key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        }
        
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App;
