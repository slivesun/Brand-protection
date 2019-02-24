import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import moment from 'moment'
import { message as Msg } from 'antd'
import { ImgModal } from '../../../components/ImgModal/ImgModal'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'
import utils from '../../../../js/common/lib'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bmcid: props.match.params.id,
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      date: '',
      counts: {},
      details: [],
      sysInspectInfo: {},
      inspectResultBtn: [],
      currentTabIndex: 1,
      currentDate: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }
  componentWillMount() {
    const { currentDate } = this.state
    this.getCounts(currentDate)
    this.getInspectDetail({
      type: 1,
      date: currentDate
    })
  }
  // 获取数量
  getCounts = start_time => {
    const { bmcid } = this.state
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectStaCount',
      data: {
        start_time,
        bmcid
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          counts: data
        })
      }
    }).catch()
  }
  // 获取详情
  getInspectDetail = params => {
    const { bmcid, pagination } = this.state
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectDetail',
      data: {
        bmcid,
        type: params.type,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        start_time: params.date
      }
    }).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          details: data.length !== 0 ? data.map(v => {
            v.screenshot_b = !!v.screenshot_b ? v.screenshot_b : "[]"
            v.screenshot_c = !!v.screenshot_c ? v.screenshot_c : "[]"
            v.screenshot_o = !!v.screenshot_o ? v.screenshot_o : "[]"
            return Object.assign({}, v, {_isShowInspectForm:false})
          }) : []
        })
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleImgShotClick = params => {
    ImgModal(params)
  }
  handleInputReview = (_index, e) => {
    this.setState({
      sysInspectInfo: Object.assign({}, this.state.sysInspectInfo, {
        [_index]: Object.assign({}, this.state.sysInspectInfo[_index], {
          system_review_explain: e.target.value
        })
      })
    })
  }
  // index:表示上传的需号
  // _index: 表示外层循环的序号
  handleUploadChange = (key, index, _index, params) => {
    const { details } = this.state
    const copyDetail = details.slice()
    const arr = JSON.parse(copyDetail[_index][key])

    if (params.file.status === 'done') {
      const { data, message, status } = params.file.response
      arr[index] = data.data
      copyDetail[_index][key] = JSON.stringify(arr)
      if (status === '10000') {
        Msg.success(data.msg)
        this.setState({
          details: copyDetail
        })
      }
    }
  }
  inspectOptionResultClick = (value, _index) => {
    const { inspectResultBtn } = this.state
    const list = inspectResultBtn.slice()
    list[_index] = value === '合格' ? 0 : 1
    this.setState({
      inspectResultBtn: list,
      sysInspectInfo: Object.assign({}, this.state.sysInspectInfo, {
        [_index]: Object.assign({}, this.state.sysInspectInfo[_index], {
          system_review: value
        })
      })
    })
  }
  handleBeforeUpload = (file, fileList) => {
    // console.log(file)
    // const isImage = !!file.type ? file.type.split('/')[0] === 'image' : false
    const type = !!file.type ? file.type.split('/')[1] : ''
    const isJPGORPNG = type === 'jpg' || type === 'png' || type === 'jpeg'
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      Msg.error('图片必须小于 10MB!');
    }
    if (!isJPGORPNG) {
      Msg.error('只能上传JPG或者PNG格式的图片！')
    }
    return isJPGORPNG && isLt10M;
  }
  handleTimeChange = (date, dateString) => {
    // console.log(date, dateString)
    this.setState({
      currentDate: moment(date).format("YYYY-MM-DD HH:mm:ss")
    })
    this.getCounts(moment(date).format("YYYY-MM-DD HH:mm:ss"))
    this.getInspectDetail({
      type: this.state.currentTabIndex,
      date: moment(date).format("YYYY-MM-DD HH:mm:ss")
    })
  }
  handleTabChange = activeKey => {
    this.setState({
      currentTabIndex: activeKey
    })
    this.getInspectDetail({
      type: activeKey,
      date: this.state.currentDate
    })
  }
  handleConfirmBtnClick = (params, _index) => {
    const { sysInspectInfo, details, currentDate } = this.state
    const list = details.slice()
    const {
      screenshot_b,
      screenshot_c,
      screenshot_o
    } = list[_index]
    // 有效性验证
    if (JSON.parse(screenshot_b).length !== 1) {
      Msg.warning('请上传标价截图！')
      return
    }
    if (JSON.parse(screenshot_c).length !== 1) {
      Msg.warning('请上传成交价截图！')
      return
    }
    if (Object.keys(sysInspectInfo).length === 0 || !sysInspectInfo[_index] || Object.keys(sysInspectInfo[_index]).length === 0 || !sysInspectInfo[_index].system_review) {
      Msg.warning('请选择稽查结果！')
      return
    }
    const { system_review = '', system_review_explain = '' } = sysInspectInfo[_index]
    console.log(system_review_explain, system_review_explain.length)
    if (system_review_explain && !utils.legnthCheck(system_review_explain, 'TEXTAREA')) {
      Msg.warning(`请限制结果说明在${utils.LENGTH.TEXTAREA}字符内！`)
      return
    }
    const data = {
      ...params,
      ...sysInspectInfo[_index],
      screenshot_b,
      screenshot_c,
      screenshot_o,
      type: 'sys',
      createtime: currentDate
    }
    // console.log(data)
    // return
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/InspectCamPro',
      data
    }).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        this.getCounts(this.state.currentDate)
        this.getInspectDetail({
          type: 1,
          date: this.state.currentDate
        })
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleInspectBtnClick = (flag, index) => {
    const { details, inspectResultBtn, sysInspectInfo } = this.state
    const list = details.slice()
    list[index]._isShowInspectForm = flag
    if (!flag) {
      // 点击取消按钮，清除数据
      const copyInspectResultBtn = inspectResultBtn.slice()
      copyInspectResultBtn[index] = null
      const copyObj = Object.assign({}, sysInspectInfo, {[index]: {}})
      const copyList = details.slice()
      copyList[index].screenshot_b = "[]"
      copyList[index].screenshot_c = "[]"
      copyList[index].screenshot_o = "[]"
      this.setState({
        inspectResultBtn: copyInspectResultBtn,
        sysInspectInfo: copyObj,
        details: copyList
      })
    }
    this.setState({
      details: list
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App