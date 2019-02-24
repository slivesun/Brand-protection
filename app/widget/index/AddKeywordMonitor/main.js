import Tpl from './tpl'
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal'
import axios from '../../../js/common/ajax'
import { Form, message as Msg } from 'antd'

const PLATFORM_MAP = {
  'taobao': '淘宝天猫',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keywordList: [{_id: 0}],
      monitorTime: [],
      isDisabledMonitorTime: false,
    }
  }
  handleSelectFocus = e => {
    const { getFieldValue, validateFields } = this.props.form
    const { monitorTime } = this.state
    validateFields(['monitorRate'], (err, values) => {
      if (!err) {
        const num = parseInt(values.monitorRate, 10)
        // console.log(monitorTime.length >= num)
        if (monitorTime.length > num || monitorTime.length == num) {
          // Msg.warning(`只能选择${num}个时间!`)
          this.setState({
            isDisabledMonitorTime: true
          })
        } else {
          this.setState({
            isDisabledMonitorTime: false
          })
        }
      } else {
        this.setState({
          isDisabledMonitorTime: true
        })
      }
    })
  }
  handleSelectTimeChange = value => {
    const { getFieldValue, validateFields } = this.props.form
    validateFields(['monitorRate'], (err, values) => {
      if (!err) {
        const num = parseInt(values.monitorRate, 10)
        if (value.length >= num) {
          this.setState({
            isDisabledMonitorTime: true
          })
        } else {
          this.setState({
            isDisabledMonitorTime: false
          })
        }
        this.setState({
          monitorTime: [...value],
        })
      }
    })
  }
  handleInputChange = (key, index, e) => {
    const list = JSON.parse(JSON.stringify(this.state.keywordList))
    if (key === 'name') {
      if (e.target.value.length > 50) {
        Msg.warning('超出50个字符限制！')
        return
      }
    }
    if (key === 'value') {
      if (isNaN(Number(e))) {
        Msg.warning('请输入数字！')
        return
      }
    }
    list[index][key] = key === 'value' ? e : e.target.value
    this.setState({
      keywordList: list
    })
  }
  handleDeleteKeyword = index => {
    const list = JSON.parse(JSON.stringify(this.state.keywordList))
    if (list.length === 1) {
      Msg.warning('请至少保留一个关键字！')
      return
    }
    list.splice(index, 1)
    this.setState({
      keywordList: list
    })
  }
  handleAddKeyword = () => {
    const list = JSON.parse(JSON.stringify(this.state.keywordList))
    list.push({_id: list[list.length-1]._id+1})
    this.setState({
      keywordList: list
    })
  }
  checkKeyword = () => {
    return this.state.keywordList.every(v => !!v.name && !!v.value)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        if (!this.checkKeyword()) {
          Msg.warning('请完善关键字信息！')
          return
        }
        // console.log(values, this.state.keywordList)
        const keywords = this.state.keywordList
        if (values.monitorTime.length !== parseInt(values.monitorRate, 10)) {
          Msg.warning(`必须选择${values.monitorRate}个时间!`)
          return
        }
        const data = {
          platform: values.platform,
          plarform_code: values.platform,
          key_range: values.monitorRange,
          frequency: values.monitorRate,
          key_times: values.monitorTime.join(','),
          keywordModelList: keywords.map(v => Object.assign({}, {fielda: v.name, fieldb: v.value}))
        }
        // console.log('uu',data)
        // return
        LoadingModal({bl:true})
        axios({
          method: 'post',
          url: '/hcm/keyword/add',
          transformRequest: [function (data, headers) {
            return data;
          }],
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          data: JSON.stringify(data)
        }).then(res => {
          LoadingModal({bl:false})
          // console.log(res)
          const { data,status,message } = res.data
          if (status === '10000') {
            Msg.success(message)
            this.props.form.resetFields()
            this.setState({
              keywordList: [{_id:0}],
              isDisabledMonitorTime: false,
              monitorTime: [],
            })
          } else {
            Msg.error(message)
          }
        }).catch(err => {
          LoadingModal({bl:false})
          Msg.error('系统繁忙，请稍后再试！')
        })
      }
    })
  }
  handleReset = () => {
    // this.props.form.resetFields()
    this.props.history.push('/keywordMonitor')
  }
  render() {
    return <Tpl that={this} />
  }
}

export default Form.create()(App)