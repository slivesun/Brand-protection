import Tpl from './tpl'
import { message as Msg } from 'antd'
import axios from '../../../js/common/ajax'
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platform: props.match.params.platform,
      // reportList: [{id: 0, name:'', list: [''], info: []}],
      reportList: [],
      alreadyReportList: [],

      complatinAccountList: [],
    }
  }
  componentWillMount() {
    this.getAlreadyReportList()
    this.getComplaintAccount()
  }
  // 获取投诉账号
  getComplaintAccount = () => {
    axios.post('/hcm/complaiont/getListByBmcid', {
      platform: 'ALIBABA'
    }).then(res => {
      // console.log(res)
      const { data, message, status } = res.data
      if (status === '10000') {
        this.setState({
          complatinAccountList: data.map(v => Object.assign({}, v, {isLeaf: false, label: v.username, value: v.username}))
        })
      }
    }).catch(err => {
      // console.log(err)
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 获取知识产权类型
  getIprType = (account_id, callback) => {
    const platform = this.state.platform
    let url = '', param = {} 
    // if (platform === 'taobao') {
    //   url = '/hcm/getTaobaoiprType'
    //   param.id = account_id
    //   param.platform = platform
    // }
    // if (platform === '1688') {
      url = '/hcm/complaint/get1688iprType'
      param.account_id = account_id
    // }
    axios.post(url, param).then(res => {
      // console.log(res)
      const { data: { data }, status, message } = res.data
      if (status === '10000') {
        callback(data)
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleLoadData = selectOptions => {
    const platform = this.state.platform
    const targetOption = selectOptions[selectOptions.length - 1]
    targetOption.loading = true
    // console.log('---t',targetOption)
    // if (platform === 'taobao') {
    //   this.getIprType(targetOption.id, data => {
    //     targetOption.loading = false
    //     const list = data.map(v => Object.assign({}, v, {label:v.text,value:v.id}))
    //     targetOption.children = list
    //     // console.log('-00-',this.state.complatinAccountList)
    //     this.setState({
    //       complatinAccountList: [...this.state.complatinAccountList]
    //     })
    //   })
    // }
    // if (platform === '1688') {
      this.getIprType(targetOption.username, data => {
        targetOption.loading = false
        // console.log('--data',data)
        const list = data.map(v => Object.assign({}, v, {label:v.name,value:v.number}))
        targetOption.children = list
        // console.log('-00-',this.state.complatinAccountList)
        this.setState({
          complatinAccountList: [...this.state.complatinAccountList]
        })
      })
    // }
  }
  // 编辑删除知识产权
  handleDeleteAlreadyKnowledge = (outIndex, index) => {
    const copyReportList = JSON.parse(JSON.stringify(this.state.alreadyReportList))
    const copyList = copyReportList[outIndex].complaintModelList
    if (copyList.length === 1) {
      Msg.warning('至少保留一条数据！')
      return
    }
    copyList.splice(index, 1)
    copyReportList[outIndex].complaintModelList = copyList
    this.setState({
      alreadyReportList: copyReportList,
    })
  }
  // 重新编辑
  handleEdit = (index, flag) => {
    const copyList = JSON.parse(JSON.stringify(this.state.alreadyReportList))
    copyList[index]._isEdit = flag
    this.setState({
      alreadyReportList: copyList
    })
  }
  handleEditInputChange = (index, e) => {
    const list = this.state.alreadyReportList.slice()
    if (e.target.value.length > 30) {
      Msg.warning('请输入30个字符以内！')
      return
    }
    list[index] = Object.assign({}, list[index], {report_name: e.target.value})
    this.setState({
      alreadyReportList: list
    })
  }
  // 获取已有的报表列表
  getAlreadyReportList = () => {
    LoadingModal({bl:true})
    axios.post('/hcm/complaint/report_list', {type: this.state.platform}).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        // console.log(data)
        this.setState({
          alreadyReportList: data.map(v => Object.assign({}, v, {_isEdit: false}))
        })
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 删除已添加的报表
  handleDeleteAlreadyComplaintReport = id => {
    LoadingModal({bl:true})
    axios.post('/hcm/complaint/report_del', {report_id: id}).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        this.getAlreadyReportList()
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 保存报表
  handleSaveReport = (values, index) => {
    const { platform, alreadyReportList } = this.state
    if (values.name === '' || values.report_name === '') {
      Msg.warning('请填写报表名称！')
      return
    }

    if (values.report_id) {
      // 更新操作
      // 去重报表名称开始
      const arr = !!alreadyReportList.length ? alreadyReportList.filter(v => values.report_name === v.report_name) : []
      if (arr.length !== 1) {
        Msg.warning('报表名称重复请修改！')
        return
      }
      // 结束
      LoadingModal({bl:true})
      axios({
        method: 'post',
        url: '/hcm/complaint/report_update',
        transformRequest: [function (data, headers) {
          return data;
        }],
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          complaintModelList: values.complaintModelList,
          type: values.type,
          report_name: values.report_name,
          report_id: values.report_id,
        })
      }).then(res => {
        LoadingModal({bl:false})
        const { status, data, message } = res.data
        if (status === '10000') {
          Msg.success(message)
          this.getAlreadyReportList()
        } else {
          Msg.error(message)
        }
      }).catch(err => {
        LoadingModal({bl:false})
        Msg.error('系统繁忙，请稍后再试！')
      })
    } else {
      // 新增操作
      if (values.info.length === 0) {
        Msg.warning('请至少添加一个知识产权！')
        return
      }
      const list = values.info.map(v => ({
        account_id: v[0].label,
        ipr_name: v[1].label,
        ipr_id: v[1].value,
      }))
      LoadingModal({bl:true})
      axios({
        method: 'post',
        url: '/hcm/complaint/report_save',
        transformRequest: [function (data, headers) {
          return data;
        }],
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          complaintModelList: list,
          type: platform,
          report_name: values.name,
        })
      }).then(res => {
        // console.log(res)
        LoadingModal({bl:false})
        const { data, status, message } = res.data
        if (status === '10000') {
          Msg.success(message)
          this.getAlreadyReportList()
          if (this.state.reportList.length === 1) {
            this.setState({
              reportList :[{id: 0, name:'', list: [''], info: []}]
            })
          } else {
            this.handleDeleteReport(index)
          }
        } else {
          Msg.error(message)
        }
      }).catch(err => {
        LoadingModal({bl:false})
        Msg.error('系统繁忙，请稍后再试！')
      })
    }

  }
  handleInputChange = (index, e) => {
    const list = this.state.reportList.slice()
    if (e.target.value.length > 30) {
      Msg.warning('请输入30个字符以内！')
      return
    }
    list[index] = Object.assign({}, list[index], {name: e.target.value})
    this.setState({
      reportList: list,
    })
  }
  handleAddReport = () => {
    const copyReportList = JSON.parse(JSON.stringify(this.state.reportList))
    if (copyReportList.length) {
      copyReportList.push({id: copyReportList[copyReportList.length-1].id + 1, name:'', list: [''], info: []})
    } else {
      copyReportList.push({id: 0, name: '', list: [''], info: []})
    }
    this.setState({
      reportList: copyReportList,
    })
  }
  handleDeleteReport = index => {
    const copyReportList = JSON.parse(JSON.stringify(this.state.reportList))
    // if (copyReportList.length === 1) {
    //   Msg.warning('至少保留一条数据！')
    //   return
    // }
    copyReportList.splice(index, 1)
    this.setState({
      reportList: copyReportList,
    })
  }
  handleDeleteKnowledgeRight = (outIndex, index) => {
    const copyReportList = JSON.parse(JSON.stringify(this.state.reportList))
    const copyList = copyReportList[outIndex].list
    if (copyList.length === 1) {
      Msg.warning('至少保留一条数据！')
      return
    }
    copyList.splice(index, 1)
    copyReportList[outIndex].list = copyList
    this.setState({
      reportList: copyReportList,
    })
  }

  handleCascaderChange = (outIndex, index, status, value, selectOptions) => {
    // console.log(status)
    if (status === 'add') {
      const copyReportList = JSON.parse(JSON.stringify(this.state.reportList))
      // list 保存要回显的数据
      copyReportList[outIndex].list[index] = value
      // info保存要提交给后台的数据
      copyReportList[outIndex].info.push(selectOptions)
      this.setState({
        reportList: copyReportList,
      })
    }
    if (status === 'edit') {
      const copyAlreadyReport = JSON.parse(JSON.stringify(this.state.alreadyReportList))
      // console.log(outIndex,copyAlreadyReport[outIndex], value, selectOptions)
      // copyAlreadyReport[outIndex].complaintModelList[index].account_num = selectOptions[0].value
      copyAlreadyReport[outIndex].complaintModelList[index].account_id = selectOptions[0].label
      copyAlreadyReport[outIndex].complaintModelList[index].ipr_id = selectOptions[1].value
      copyAlreadyReport[outIndex].complaintModelList[index].ipr_name = selectOptions[1].label
      this.setState({
        alreadyReportList: copyAlreadyReport,
      })
    }

  }
  handleAddKnowledgeRight = (outIndex) => {
    const copyReportList = JSON.parse(JSON.stringify(this.state.reportList))
    copyReportList[outIndex].list.push('')
    this.setState({
      reportList: copyReportList,
    })
  }

  render() {
    return <Tpl that={this} />
  }
}

export default App