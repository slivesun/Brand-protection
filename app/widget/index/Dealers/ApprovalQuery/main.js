import Tpl from './tpl'
import { Form, message as Msg } from 'antd'
import axios from '../../../../js/common/ajax'

const APPROVAL_STATUS = {
  all: 1,               // 全部状态
  wait_approval: 2,     // 待审核状态
  expired_approval: 3,  // 审核已过期状态
  already_approval: 4,  // 已审核状态
  activiting: 5,        // 活动进行中
  activited: 6          // 活动已完成
}
class ApprovalQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusNum: {},   // 各个状态的数量
      cacheListObj: {},  // 缓存列表对象，包含每个状态对应的列表
      currentStatus: "1",
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      searchCondition: {}
    }
  }

  componentWillMount() {
    this.getApprovalStatusNum()
    this.getActivityList({
      status: APPROVAL_STATUS.all
    })
  }

  handlePageChange = (page) => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page
      })
    }, () => {
      this.getActivityList({
        status: this.state.currentStatus
      })
    })
  }

  handleClearIconClick = fieldName => {
    this.props.form.resetFields([fieldName])
  }

  handleSearchSubmit = e => {
    e.preventDefault()
    // const { currentStatus } = this.state
    this.props.form.validateFields((err, values) => {
      this.getActivityList({
        status: "1",
        search: {
          ...values
        }
      })
      this.getApprovalStatusNum({
        ...values,
        start_time: values.time.length !== 0 ? values.time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        end_time: values.time.length !== 0 ? values.time[1].format('YYYY-MM-DD HH:mm:ss') : ''
      })
      this.setState({
        searchCondition: Object.assign({}, values),
        currentStatus: "1"
      })
    })
  }

  handleTabChange = activeKey => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: 1,
        pageSize: 10
      }),
      currentStatus: activeKey
    }, () => {
      const { searchCondition } = this.state
      let data = {
        status: activeKey
      }
      if (Object.keys(searchCondition).length !== 0) {
        data.search = Object.assign({}, searchCondition)
      }
      this.getActivityList(data)
    })
  }

  goTo = path => {
    this.props.history.push({
      pathname: path
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

  // 获取活动列表
  getActivityList = params => {
    const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'
    const { pagination } = this.state
    let data = {
      type: params.status,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize
    }
    if (params.search) {
      const { shop_name, campaign_name, time: [start_time, end_time] } = params.search
      data.shop_name = shop_name
      data.campaign_name = campaign_name
      data.start_time = !!start_time ? start_time.format(FORMAT_TIME) : ''
      data.end_time =  !!end_time ? end_time.format(FORMAT_TIME) : ''
    }
    axios({
      method: 'post',
      url: '/hcm/campgign/List',
      data
    }).then(res => {
      const { cacheListObj, pagination } = this.state
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          cacheListObj: Object.assign({}, cacheListObj, {
            [params.status]: data.content
          }),
          currentStatus: params.status,
          pagination: Object.assign({}, pagination, {
            pageNo: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages
          })
        })
      }
    }).catch(err => {
      Msg.error('系统繁忙，稍后再试！')
    })
  }

  // 获取每个状态的数量
  getApprovalStatusNum = (params = {}) => {
    axios({
      method: 'post',
      url: '/hcm/campgign/ListCount',
      data: {
        // dealer_id: 15
        ...params
      }
    }).then(res => {
      this.setState({
        statusNum: res.data.data
      })
    }).catch(err => {
      Msg.error('网络繁忙，稍后再试！')
    })
  }

  render() {
    return <Tpl that={this} />
  }
}

export default Form.create()(ApprovalQuery)