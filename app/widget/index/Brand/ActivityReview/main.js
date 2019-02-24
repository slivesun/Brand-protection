// 品牌活动审查
import Tpl from './tpl'
import { Form } from 'antd'
import axios from '../../../../js/common/ajax'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platformList: [],
      cacheActivityList: {},
      currentTabIndex: "1",
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      statusNums: {},
      searchCondition: {}
    }
  }
  
  componentWillMount() {
    this.getPlatformList('platform')
    this.getActivityNums()
    this.getActivityList({
      url: '/hcm/campgign/List',
      data: {
        type: this.state.currentTabIndex,
        ...this.state.pagination
      }
    })
  }
  handleClearIconClick = fieldName => {
    // console.log(fieldName, this.props)
    this.props.form.resetFields([fieldName])
  }
  // tab导航切换
  handleTabChange = activeKey => {
    this.getActivityList({
      url: '/hcm/campgign/List',
      data: {
        type: activeKey,
        pageNo: 1,
        pageSize: this.state.pagination.pageSize,
        ...this.state.searchCondition,
        ping_id: this.state.searchCondition.ping_id === 'all' ? '' : this.state.searchCondition.ping_id
      }
    })
    this.setState({
      currentTabIndex: activeKey
    })
  }
  // 查询每个状态对应的数量
  getActivityNums = (params = {}) => {
    axios.post('/hcm/campgign/ListCount', {...params}).then(res => {
      const { data, status, message } = res.data
      this.setState({
        statusNums: data
      })
    }).catch(err => {

    })
  }
  // 获取活动列表
  getActivityList = params => {
    this.postFn(params).then(res => {
      this.setState({
        cacheActivityList: Object.assign({}, this.state.cacheActivityList, {
          [this.state.currentTabIndex]: res.content
        }),
        pagination: Object.assign({}, this.state.pagination, {
          pageNo: res.pageNumber,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
          // totalPages: res.totalPages
        })
      })
    }).catch()
  }
  // post请求
  postFn = params => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: params.url,
        data: params.data || {}
      }).then(res => {
        const { data, status, message } = res.data
        if (status === '10000') {
          resolve(data)
        } else {
          reject({message})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 查询平台字典
  getPlatformList = dictType => {
    axios({
      method: 'post',
      url: '/hcm/sys/GetList',
      data: {
        dictcode:dictType
      }
    }).then(res => {
      const { data, status, message } = res.data
      this.setState({
        platformList: data
      })
    }).catch(err => {

    })
  }
  goToDetail = path => {
    this.props.history.push({
      pathname: path
    })
  }
  handleFormSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      // console.log(values)
      const {
        campaign_name,
        dealer_name,
        ping_id,
        shop_name,
        time
      } = values
      // console.log(time)
      const start_time = time.length === 0 ? '' : time[0].format('YYYY-MM-DD HH:mm:ss')
      const end_time = time.length === 0 ? '' : time[1].format('YYYY-MM-DD HH:mm:ss')
      this.getActivityList({
        url: '/hcm/campgign/List',
        data: {
          type: "1",
          pageNo: 1,
          pageSize: this.state.pagination.pageSize,
          campaign_name,
          dealer_name,
          ping_id: ping_id === 'all' ? '' : ping_id,
          shop_name,
          start_time: start_time,
          end_time: end_time
        }
      })
      this.getActivityNums({
        campaign_name,
        shop_name,
        dealer_name,
        ping_id: ping_id === 'all' ? '' : ping_id,
        start_time: start_time,
        end_time: end_time
      })
      this.setState({
        searchCondition: Object.assign({}, this.state.searchCondition, {
          campaign_name,
          dealer_name,
          ping_id,
          shop_name,
          start_time,
          end_time,
        }),
        currentTabIndex: '1'
      })
    })
  }
  handlePageChange = (page, pageSize) => {
    const { searchCondition } = this.state
    this.getActivityList({
      url: '/hcm/campgign/List',
      data: {
        type: this.state.currentTabIndex,
        pageNo: page,
        pageSize,
        ...searchCondition,
        ping_id: searchCondition.ping_id === 'all' ? '' : searchCondition.ping_id
      }
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default Form.create()(App)