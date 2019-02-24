import Tpl from './tpl';
import {message as Msg, notification} from 'antd';
import axios from '../../../../js/common/ajax';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import moment from 'moment'
import { getBrandList } from '../../../../js/actions/dealer'

const mapStateToProps = (state, ownProps) => {
    return {
        currentBrand: state.dealer.currentBrand
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ getBrandList }, dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList:[],
            selectDateIndex: 0,
            isExpandShop: true,
            selectShopIndex: -1,
            sevenActivity: [],
            shopBtnList: [],
            currentDate: moment().format('YYYY-MM-DD'),
            productList: [],
            noticeList: [],
            binding: null,
            userId: null,
        }
    }
    componentWillMount() {
       this.getBrandActivityPublicDate()
       this.getBrandActivityPublicShop(this.state.currentDate)
       this.getList()
    //    notification.config({
    //        duration: null,
    //        top: 60
    //    })
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         try {
    //             if (!sessionStorage.getItem('exdate')) {
    //                 sessionStorage.setItem('exdate', true)
    //                 const { end_days, authorize_end } = this.props.currentBrand
    //                 !!end_days && end_days < 30 ?
    //                 notification.warning({
    //                     key: '999',
    //                     message: '账号即将到期提醒',
    //                     description: `你的账号有效期至${moment(authorize_end).format('YYYY-MM-DD')}日，使用期限仅剩${end_days}天，过期后账号将不能使用，请及时联系管理员续期`,
    //                 }) : null
    //             }
    //         } catch (error) {
    //             // Msg.warning('请关闭浏览器的无痕模式！')
    //         }
    //     }, 500);
    // }

    // componentWillUnmount() {
    //     notification.close('999')
    // }

    reSubmitApply = () => {
        axios({
            method: 'post',
            url: '/hcm/dealer/reSubmitApplying'
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                Msg.success(message)
                this.props.getBrandList()
            }
        }).catch()
    }

    handleDateClick = (index, date) => {
        this.setState({
            selectDateIndex: index,
            currentDate: date
        })
        this.getBrandActivityPublicShop(date)
    }
    handleToggleClick = () => {
        this.setState({
            isExpandShop: !this.state.isExpandShop
        })
    }

    getList = () => {
        axios({
            method: 'post',
            url: '/hcm/Index/dealerIndex',
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    productList: data.productList,
                    noticeList: data.noticeList,
                    binding: data.binding,
                    userId: data.userid,
                })
            }
        }).catch()
    }

    getBrandActivityPublicShop = date => {
        axios({
            method: 'post',
            url: '/hcm/campgign/PublicShops',
            data: {
                campaign_node: '已审核',
                type: moment().format('YYYY-MM-DD') === date ? 1 : 2,
                ser_day: date
            }
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    shopBtnList: data
                })
            }
        }).catch()
    }

    getBrandActivityPublicDate = () => {
        axios({
            method: 'post',
            url: '/hcm/campgign/ScheduleBMCSeven'
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    sevenActivity: data
                })
            }
        }).catch()
    }

    goTo = path => {
        this.props.history.push({
            pathname: path
        })
    }
   
    
    render() {
        return <Tpl that={this} />
    }
}
export default App;
