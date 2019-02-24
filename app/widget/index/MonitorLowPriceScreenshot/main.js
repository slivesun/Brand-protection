import Tpl from './tpl'
import axios from '../../../js/common/ajax'

import { message as Msg } from 'antd'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.productId,
      platform: props.match.params.optionId,
      detail: {},
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      start_time: moment().subtract(90, 'd'),
      end_time: moment(),
      screenshotList: [],
    }
  }
  componentWillMount() {
    this.getDetailData()
  }
  dateChange = (dates) => {
    if (!dates.length) {
      return
    }
    this.setState({
      start_time: dates[0],
      end_time: dates[1],
      pagination: {
        pageNum: 1,
        pageSize: 10
      }
    }, () => {
      this.getScreenShot()
    })
  }
  MoreClick = () => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNum: parseInt(this.state.pagination.pageNum, 10) + 1
      })
    }, () => {
      this.getScreenShot()
    })
  }
  getScreenShot = (itemid) => {
    const { platform, pagination, start_time, end_time, detail } = this.state
    const data = {
      platform,
      start_time: start_time.format('YYYY-MM-DD HH:mm:ss'),
      end_time: end_time.format('YYYY-MM-DD HH:mm:ss'),
      itemid: detail.itemid,
      pageSize: pagination.pageSize,
      pageNum: pagination.pageNum,
    }
    LoadingModal({bl:true})
    axios.post('/hcm/keyword_monitor/PhotoHis', data).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        console.log(data)
        this.setState({
          screenshotList: data.list,
          pagination: Object.assign({}, this.state.pagination, {
            count: data.count,
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
  getDetailData = () => {
    const { id, platform } = this.state
    axios.post('/hcm/keyword_monitor/getObj', {
      platform,
      id,
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        console.log(data)
        this.setState({
          detail: data
        }, () => {
          this.getScreenShot()
        })
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })

  }
  render() {
    return <Tpl that={this} />
  }
}

export default App