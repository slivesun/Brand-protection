import { connect } from 'react-redux'
import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import moment from 'moment'

const PARAMS_CONST = {
    product: 'product',
    shop: 'shop'
}

@connect(state => ({
    currentBrand: state.dealer.currentBrand
}))
class BrandActivityPublicity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,   // 选中的日期下标
            moreButton: false,  // 更多店铺按钮状态
            togglePriceIndex: -1,   // 价格区域显隐状态
            activityList: [],   // 活动日期列表（一周）
            // sevenActivity: {},  // 缓存每日活动店铺对象信息
            // sevenProductInfo: {}, // 缓存每日活动产品对象信息
            // productInfoList: [],    // 当前产品信息对象列表
            currentDate: moment().format('YYYY-MM-DD'),    // 当前选中日期
            currentShopBtn: 'all',   // 当前选中按钮
            shopBtnList: [],
            pagination: {
                pageNum: 1,
                pageSize: 10
            },
            activityInfoList: []
        }
    }
    componentWillMount() {
        this.getBrandSevenActivity()
        this.getShopBtnList({
            type: 1,
            date: moment().format('YYYY-MM-DD')
        })
        this.getActivityList({
            type: 1,
            date: moment().format('YYYY-MM-DD'),
            ...this.state.pagination
        })
        // this.switchActivity(this.formatTime(Date.now()), 0, 1)
    }
    // 获取店铺列表
    getShopBtnList = params => {
        axios({
            method: 'post',
            url: '/hcm/campgign/PublicShops',
            data: {
                campaign_node: '已审核',
                type: params.type,
                ser_day: params.date
            }
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    shopBtnList: data,
                    // currentDate: params.date
                })
            }
        }).catch()
    }
    // 获取活动列表
    getActivityList = params => {
        let data = {
            campaign_node: '已审核',
            type: params.type,
            ser_day: params.date,
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
        if (params.shop_id !== undefined && params.shop_id !== 'all') {
            // shop_id入参格式 'id','id','id'...
            data.shop_id = `'${params.shop_id}'`
        }
        axios({
            method: 'post',
            url: '/hcm/campgign/ScheduleBMC',
            data
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    activityInfoList: data.list,
                    pagination: Object.assign({}, this.state.pagination, {count: data.count})
                })
            }
        }).catch()
    }
    formatTime = (timestamp, showTime = false) => {
        const date = new Date(timestamp)
        let str = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        if (showTime) {
            str += ` ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
        }
        return str;
    }
    // 获取当天活动信息
    // params: {type(区分当日(1)和当日以后(2)), url, bmcId, date(日期), flag(区分店铺(shop)和产品(product))}
    // getCurrentDateInfo = params => {
    //     let data = {
    //         bmcid: params.bmcId,
    //         campaign_node: '已审核',
    //         type: params.type,
    //         ser_day: params.date,
    //         pageNum: 1,
    //         pageSize: 1
    //     }
    //     if (params.flag === PARAMS_CONST.shop) {
    //         data.shop_id = params.shop_id
    //     }
    //     axios({
    //         method: 'post',
    //         url: params.url,
    //         data: data
    //     }).then(res => {
    //         const { sevenActivity, sevenProductInfo } = this.state
    //         if (params.flag === PARAMS_CONST.product) {
    //             this.setState({
    //                 sevenProductInfo: Object.assign({}, sevenProductInfo, {
    //                     [params.date]: res.data.data
    //                 }),
    //                 productInfoList: res.data.data
    //             })
    //         } else if (params.flag === PARAMS_CONST.shop) {
    //             this.setState({
    //                 sevenActivity: Object.assign({}, sevenActivity, {
    //                     [params.date]: res.data.data
    //                 })
    //             })
    //         }
    //     }).catch(err => {
    //         console.log('----publicshop', err)
    //     })
    // }
    // 获取7日活动信息
    getBrandSevenActivity = () => {
        axios({
            method: 'post',
            url: '/hcm/campgign/ScheduleBMCSeven'
        }).then(res => {
            this.setState({
                activityList: res.data.data
            })
        }).catch(err => {
            console.log('-----brandseven', err)
        })
    }
    togglePrice = index => {
        this.setState({
            togglePriceIndex: this.state.togglePriceIndex === index ? -1 : index
        })
    }
    moreButton = () => {
        this.setState({
            moreButton: !this.state.moreButton
        })
    }
    // 切换店铺按钮
    switchShopBtn = (shopId, list) => {
        // const array = shopId === 'all' ? list : list.filter(v => v.shop_id == shopId)
        this.setState({
            currentShopBtn: shopId,
        //     activityInfoList: []
        })
        const { currentDate, pagination } = this.state
        this.getActivityList({
            type: moment().format('YYYY-MM-DD') === currentDate ? 1 : 2,
            date: currentDate,
            shop_id: shopId,
            ...pagination
        })
    }
    // 切换日期对应的数据
    switchActivity = (date, index, type) => {
        const { sevenActivity, sevenProductInfo } = this.state
        this.setState({
            selectedIndex: index,
            currentDate: date,
            currentShopBtn: 'all',
            togglePriceIndex: -1,
            // productInfoList: sevenProductInfo[date] ? [...sevenProductInfo[date]] : []
        })
        this.getShopBtnList({
            type,
            date
        })
        this.getActivityList({
            type,
            date,
            ...this.state.pagination
        })
        // !sevenActivity[date] && this.getCurrentDateInfo({
        //     type,
        //     date,
        //     url: '/hcm/campgign/PublicShops',
        //     flag: PARAMS_CONST.shop,
        //     shop_id: null
        // })
        // !sevenProductInfo[date] && this.getCurrentDateInfo({
        //     type,
        //     date,
        //     url: '/hcm/campgign/ScheduleBMC',
        //     flag: PARAMS_CONST.product
        // })
    }
    // 加载更多按钮
    handleLoadMore = () => {
        // console.log(123)
        this.setState({
            pagination: Object.assign({}, this.state.pagination, {
                pageNum: this.state.pagination.pageNum+1
            })
        }, () => {
            const { currentDate, currentShopBtn, pagination } = this.state
            let data = {
                type: moment().format('YYYY-MM-DD') === currentDate ? 1 : 2,
                date: currentDate,
                ...pagination
            }
            if (currentShopBtn !== 'all') {
                data.shop_id = currentShopBtn
            }
            this.getActivityList(data)
        })
    }
    render() {
        return <Tpl that={this}/>
    }
}

export default BrandActivityPublicity