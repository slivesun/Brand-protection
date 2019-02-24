// 品牌活动稽查
import Tpl from './tpl'
import moment from 'moment'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'
import { ImgModal } from '../../../components/ImgModal/ImgModal'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'
import utils from '../../../../js/common/lib'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shop_name: '',
      sys_result: '',
      start_time: moment().format(FORMAT_TIME),
      currentTab: '1',
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      activityNums: {},
      detailList: [],
      isShowInspectInput: false,
      brandInspectInfo: {},
      inspectResultBtn: []
    }
  }
  componentWillMount() {
    this.getActivityNums(moment().format(FORMAT_TIME), {
      shop_name: this.state.shop_name,
      system_review: this.state.sys_result
    })
    this.getInspectDetail({
      type: 1,
      start_time: moment().format(FORMAT_TIME),
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      shop_name: this.state.shop_name,
      sys_result: this.state.sys_result
    })
  }
  // 获取活动数量
  getActivityNums = (date, {shop_name = '', system_review = ''} = {}) => {
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectStaCount',
      data: {
        start_time: date,
        shop_name,
        system_review
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          activityNums: data
        })
      }
    }).catch(err => {

    })
  }
  // 获取稽查详情
  getInspectDetail = params => {
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectDetail',
      data: params
    }).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          detailList: data.length !== 0 ? data.map(v => Object.assign({},v,{_isShowInspectInput:false})) : []
        })
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleSearchClick = () => {
    const { shop_name, sys_result, start_time: time, currentTab, pagination } = this.state
    this.getInspectDetail({
      shop_name,
      sys_result,
      start_time: time === '' ? moment().format(FORMAT_TIME) : time,
      type: '1',
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    this.getActivityNums(
      time === '' ? moment().format(FORMAT_TIME) : time,
      {
        shop_name,
        system_review: sys_result
      }
    )
    this.setState({
      currentTab: '1'
    })
  }
  handleComSubmitResult = (params, _index) => {
    const { brandInspectInfo, start_time } = this.state
    // 有效性验证
    if (Object.keys(brandInspectInfo).length === 0 || !brandInspectInfo[_index] || Object.keys(brandInspectInfo[_index]).length === 0 || !brandInspectInfo[_index].brand_review) {
      Msg.warning('请选择稽查结果！')
      return
    }
    const { brand_review = '', brand_review_view = '' } = this.state.brandInspectInfo[_index]
    if (brand_review_view && !utils.legnthCheck(brand_review_view, 'TEXTAREA')) {
      Msg.warning(`请限制稽查意见在${utils.LENGTH.TEXTAREA}字符内！`)
      return
    }
    // console.log({
    //   brand_review,
    //   brand_review_view,
    //   ...params
    // })
    // return
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectCamPro',
      data: {
        brand_review,
        brand_review_view,
        createtime: start_time,
        ...params
      }
    }).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        // this.getActivityNums(moment().format(FORMAT_TIME))
        this.handleSearchClick()
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('网络繁忙，请稍后再试！')
    })
  }
  handleComInspectInfo = (value, _index, ev) => {
    const { inspectResultBtn } = this.state
    const list = inspectResultBtn.slice()
    list[_index] = value === '合格' ? 0 : 1
    if (value === 'input') {
      this.setState({
        brandInspectInfo: Object.assign({}, this.state.brandInspectInfo, {
          [_index]: Object.assign({}, this.state.brandInspectInfo[_index], {
            brand_review_view: ev.target.value
          })
        })
      })
    } else {
      this.setState({
        brandInspectInfo: Object.assign({}, this.state.brandInspectInfo, {
          [_index]: Object.assign({}, this.state.brandInspectInfo[_index], {
            brand_review: value
          })
        }),
        inspectResultBtn: list
      })
    }
  }
  handleComToggleClick = (flag, index) => {
    const { detailList, inspectResultBtn, brandInspectInfo } = this.state
    const list = [...detailList]
    list[index]._isShowInspectInput = flag
    if (!flag) {
      // 点击取消，清除数据
      const copyInspectResultBtn = inspectResultBtn.slice()
      copyInspectResultBtn[index] = null
      const copyObj = Object.assign({}, brandInspectInfo, {[index]: {}})
      this.setState({
        inspectResultBtn: copyInspectResultBtn,
        brandInspectInfo: copyObj
      })
    }
    this.setState({
      detailList: list
    })
  }
  handleComImageClick = params => {
    ImgModal(params)
  }
  handleTabChange = activeKey => {
    const { start_time, pagination, shop_name, sys_result } = this.state
    this.setState({
      currentTab: activeKey
    })
    this.getInspectDetail({
      type: activeKey,
      start_time: start_time === '' ? moment().format(FORMAT_TIME) : start_time,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      shop_name,
      sys_result
    })
  }
  handleChange = (key, value) => {
    const val = key === 'start_time' ? (!!value ? moment(value).format(FORMAT_TIME) : '') : value
    this.setState({
      [key]: val
    })
  }
  handleClearIconClick = () => {
    // console.log(123)
    this.setState({
      shop_name: ''
    })
  }
  handleInputChange = e => {
    this.setState({
      shop_name: e.target.value
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App