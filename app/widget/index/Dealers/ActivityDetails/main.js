import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { Form, message as Msg } from 'antd'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'

class ActivityDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandPriceIndex: -1,
      id: props.match.params.id,
      status: props.match.params.status,
      detail: {},
      cplist: [],
      selectIndex: -1
    }
    this._forms = []
  }

  componentWillMount() {
    this.getActiveDetail()
  }
  // componentDidMount() {
  //   const { search } = this.props.location
  //   const str = decodeURIComponent(search.slice(1).split('=')[1])
  //   this.setState({
  //     status: str
  //   })
  // }

  // 获取活动详情
  getActiveDetail = () => {
    const { id } = this.state
    axios({
      method: 'post',
      url: '/hcm/campgign/Detail',
      data: {
        id
      }
    }).then(res => {
      const { data, status } = res.data
      this.setState({
        detail: data,
        cplist: data.cplist.map(v => Object.assign({}, v, {_isShowReeditForm: false, _isExpandPrice: false}))
      })
    }).catch(err => {

    })
  }

  handleEditSubmit = (id, index, campaign_id, e) => {
    e.preventDefault()
    // console.log(this)
    // return
    this._forms[index].validateFields((err, values) => {
      if (!err) {
        // console.log(id, values, index, this)
        // return
        LoadingModal({bl:true})
        axios({
          method: 'post',
          url: '/hcm/campgign/Reapply',
          data: {
            id,
            campaign_id,
            ...values
          }
        }).then(res => {
          LoadingModal({bl:false})
          const { data, status, message } = res.data
          if (status === '10000') {
            Msg.success(message)
            this.getActiveDetail()
          }
        }).catch(err => {
          LoadingModal({bl:false})
          Msg.error('系统繁忙，请稍后再试！')
        })
      }
    })
  }

  handleCancelEdit = () => {
    this.setState({
      selectIndex: -1
    })
  }

  handleReeditClick = (index, flag) => {
    const { cplist } = this.state
    const list = cplist.slice()
    list[index]._isShowReeditForm = flag
    this.setState({
      // selectIndex: index
      cplist: list
    })
  }

  handleExpandPrice = index => {
    const { expandPriceIndex, cplist } = this.state
    const list = cplist.slice()
    list[index]._isExpandPrice = !list[index]._isExpandPrice
    this.setState({
      // expandPriceIndex: index === expandPriceIndex ? -1 : index
      cplist: list
    })
  }

  render() {
    return <Tpl that={this} />
  }
}

export default Form.create()(ActivityDetails)