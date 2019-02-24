import Tpl from './tpl'
import axios from '../../../js/common/ajax'

import { message as Msg } from 'antd'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.productId,
      createtime: props.match.params.optionId,
      detail: {},
      start_time: moment().subtract(90, 'd'),
      end_time: moment(),
      low_pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      sale_pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      lowPriceList: [],
      salesRankList: [],
    }
  }
  componentWillMount() {
    this.getMonitorDetail()
  }
  getMonitorDetail = () => {
    const { id, createtime } = this.state
    axios.post('/hcm/keyword_monitor/obj', {
      id,
      createtime: moment(parseInt(createtime, 10)).format('YYYY-MM-DD HH:mm:ss'),
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        // console.log(data)
        this.setState({
          detail: data
        })
        this.getList('/hcm/keyword_monitor/low_sort', data.platform, 'lowPriceList', this.state.low_pagination, 'low_pagination')
        this.getList('/hcm/keyword_monitor/sale_sort', data.platform, 'salesRankList', this.state.sale_pagination, 'sale_pagination')
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 获取低价次数排行榜
  getList = (url, platform, key, pagination, pageKey) => {
    const { start_time, end_time, id } = this.state
    const data = {
      platform,
      keyword_id: id,
      start_time: start_time.format('YYYY-MM-DD HH:mm:ss'),
      end_time: end_time.format('YYYY-MM-DD HH:mm:ss'),
      pageSize: pagination.pageSize,
      pageNo: pagination.pageNo,
    }
    LoadingModal({bl:true})
    axios.post(url, data).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        // console.log(data)
        this.setState({
          [key]: data.content,
          [pageKey]: Object.assign({}, this.state[pageKey], {
            pageNo: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
          })
        })
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleDateChange = (dates, datestrings) => {
    // console.log(dates, datestrings)
    if (!dates.length) {
      return
    }
    this.setState({
      start_time: dates[0],
      end_time: dates[1],
    }, () => {
      this.getList('/hcm/keyword_monitor/low_sort', this.state.detail.platform, 'lowPriceList', this.state.low_pagination, 'low_pagination')
      this.getList('/hcm/keyword_monitor/sale_sort', this.state.detail.platform, 'salesRankList', this.state.sale_pagination, 'sale_pagination')
    })
  }
  pageChange = (url, platform, key, pagination, pageKey, page) => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page,
      })
    }, () => {
      this.getList(url, platform, key, pagination, pageKey)
    })
  }
  // salesRankPageChange = page => {
  //   this.setState({
  //     pagination: Object.assign({}, this.state.pagination, {
  //       pageNo: page,
  //     })
  //   }, () => {
  //     this.getList('/hcm/keyword_monitor/sale_sort', this.state.detail.platform, 'salesRankList')
  //   })
  // }
  // lowPricePageChange = page => {
  //   this.setState({
  //     pagination: Object.assign({}, this.state.pagination, {
  //       pageNo: page,
  //     })
  //   }, () => {
  //     this.getList('/hcm/keyword_monitor/low_sort', this.state.detail.platform, 'lowPriceList')
  //   })
  // }
  render() {
    return <Tpl that={this} />
  }
}

export default App