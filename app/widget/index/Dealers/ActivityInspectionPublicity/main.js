import Tpl from './tpl'
import { ImgModal } from '../../../components/ImgModal/ImgModal'
import axios from '../../../../js/common/ajax'
import moment from 'moment'

class ActivityInspectionPublicity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 6,
      moreButton: false,
      sevenData: [],
      currentShopBtn: 'all',
      shopBtnList: [],
      inspectInfoList: [],
      pagination: {
        pageNum:1,
        pageSize:10
      },
      // sevenActivity: {},  // 缓存每日活动店铺对象信息
      // sevenProductInfo: {}, // 缓存每日活动产品对象信息
      // productInfoList: [],    // 当前产品信息对象列表
      currentDate: '',    // 当前选中日期
      // priceImgModal: false,       // 标价截图模态框
      // dealPriceImgModal: false,   // 成交价截图模态框
      // otherPriceImgModal: false   // 其他截图模态框
    }
  }
  componentWillMount() {
    // 先拿日期
    this.getInspectPublicSeven()
    // 再获取店铺
    this.getShopNum(moment().subtract(1, 'd').format('YYYY-MM-DD'))
    // 最后查产品列表
    this.getInspectPublicList({
      date: this.formatTime(moment().subtract(1, 'd').format('YYYY-MM-DD')),
      shop_id: this.state.currentShopBtn,
      ...this.state.pagination
    })
  }
  formatTime = (timestamp, showTime = false) => {
    const date = new Date(timestamp)
    let str = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    if (showTime) {
        str += ` ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    }
    return str;
  }
  // 获取稽查公示列表
  getInspectPublicList = params => {
    axios({
      method: 'post',
      url: '/hcm/campgign/PublicInspectList',
      data: {
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          ser_date: params.date,
          shop_ids: params.shop_id === 'all' ? '' : params.shop_id
        }
    }).then(res => {
      const { data, status } = res.data
      this.setState({
        inspectInfoList: data.list,
        pagination: Object.assign({}, this.state.pagination, {count: data.count})
      })
    }).catch(err => {

    })
  }
  // 获取不合格店铺数量
  getShopNum = (date) => {
    axios({
      method: 'post',
      url: '/hcm/campgign/PublicInspectShops',
      data: {
        ser_date: date
      }
    }).then(res => {
      const { data, status } = res.data
      this.setState({
        // sevenActivity: Object.assign({}, this.state.sevenActivity, {
        //   [date]: data
        // })
        shopBtnList: data
      })
    }).catch(err => {

    })
  }
  // 切换店铺
  switchShopBtn = id => {
    this.setState({
      currentShopBtn: id
    })
    this.getInspectPublicList({
      ...this.state.pagination,
      date: this.state.currentDate === '' ? this.formatTime(Date.now()) : this.state.currentDate,
      shop_id: id === 'all' ? 'all' : `'${id}'`
    })
  }
  // 切换日期对应的数据
  switchActivity = (date, index, type) => {
    this.setState({
        selectedIndex: index,
        currentDate: date
    })
    this.getShopNum(date)
    this.getInspectPublicList({
      date,
      shop_ids: this.state.currentShopBtn,
      ...this.state.pagination
    })
  }
  // 获取稽查公示7日不合格数量
  getInspectPublicSeven = () => {
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectPublicSeven',
    }).then(res => {
      const { data, status } = res.data
      const list = data.sort((a, b) => a.my_date - b.my_date)
      this.setState({
        sevenData: list
      })
    }).catch(err => {

    })
  }
  handleLoadMoreClick = () => {
    const { pagination, currentDate, currentShopBtn } = this.state
    this.setState({
      pagination: Object.assign({}, pagination, {
        pageNum: pagination.pageNum + 1
      })
    }, () => {
      this.getInspectPublicList({
        date: currentDate === '' ? this.formatTime(Date.now()) : currentDate,
        shop_id: currentShopBtn === 'all' ? 'all' : `'${currentShopBtn}'`,
        ...this.state.pagination
      })
    })
  }
  handleImgClick = params => {
    ImgModal(params)
  }
  moreButton = () => {
    this.setState({
      moreButton: !this.state.moreButton
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default ActivityInspectionPublicity