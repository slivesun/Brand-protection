import Tpl from './tpl'
import axios from '../../../../js/common/ajax'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dealer_id: props.match.params.dealer_id,
      shop_id: props.match.params.shop_id,
      month: props.match.params.month,
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      saleDataList: [],
      dealerShopList: [],
    }
  }
  componentWillMount() {
    this.getSaleData()
    this.getDealerShopList()
  }
  // 获取客户店铺列表
  getDealerShopList = () => {
    const { dealer_id } = this.state
    axios({
      method: 'post',
      url: '/hcm/dealer/DealerDetail_Authshop',
      data: {
        dealer_id
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          dealerShopList: data
        })
      }
    }).catch()
  }
  // 获取每天的销售数据
  getSaleData = (params = {}) => {
    const { dealer_id, shop_id, month, pagination: { pageNo, pageSize } } = this.state
    axios({
      method: 'post',
      url: '/hcm/dayReport/day',
      data: {
        dealer_id,
        shop_id,
        ser_month: month,
        pageNo,
        pageSize,
        ...params
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          saleDataList: data.content,
          pagination: Object.assign({}, this.state.pagination, {
            pageNo: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements
          })
        })
      }
    }).catch()
  }
  handleDateChange = (value, values) => {
    // console.log(value, values)
    this.setState({
      month: values === '' ? this.props.match.params.month : values
    }, () => {
      this.getSaleData()
    })
  }
  handleSelectChange = (value) => {
    // console.log(value)
    this.setState({
      shop_id: value === '' ? this.props.match.params.shop_id : value
    }, () => {
      this.getSaleData()
    })
  }
  handlePageChange = (page) => {
    // console.log(page)
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page
      })
    }, () => {
      this.getSaleData()
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App