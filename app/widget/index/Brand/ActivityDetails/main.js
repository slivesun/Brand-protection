import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'
import utils from '../../../../js/common/lib'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {},
      cplist: [],
      examine_view: [],
      isExpandPrice: false
    }
  }
  componentWillMount() {
    this.getActivityDetail()
  }
  handleTogglePriceClick = (_index) => {
    const { cplist } = this.state
    const list = cplist.slice()
    list[_index]._isExpandPrice = !list[_index]._isExpandPrice
    this.setState({
      cplist: list
    })
  }
  handleInputChange = (_index, e) => {
    // console.log(_index)
    const { examine_view } = this.state
    const list = examine_view.slice()
    list[_index] = e.target.value
    this.setState({
      examine_view: list
    })
  }
  submitReviewInfo = (params, _index) => {
    // console.log(params,_index)
    // 验证有效性
    const { examine_view } = params
    if (examine_view && !utils.legnthCheck(examine_view, 'INPUT')) {
      Msg.warning(`请限制审核意见在${utils.LENGTH.INPUT}字符内！`)
      return
    }
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/Verify',
      data: {...params}
    }).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        // window.location.reload()
      } else {
        Msg.error(message)
      }
      this.getActivityDetail()
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('网络繁忙，稍后再试！')
    })
  }
  // 获取活动详情
  getActivityDetail = () => {
    const { id } = this.props.match.params
    axios({
      method: 'post',
      url: '/hcm/campgign/Detail',
      data: { id }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          detail: data,
          cplist: data.cplist.map(v => Object.assign({}, v, {_isExpandPrice: false}))
        })
      }
    }).catch()
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App