import Tpl from './tpl'
import { Form, message as Msg } from 'antd'

import axios from '../../../js/common/ajax'
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal'

const PLATFORM = {
  tb: 'taobao',
  tm: 'tmall',
  tmhk: 'tmallhk'
}
const COMPLAINT_LINK_TYPE = {
  goods: 'item',
  shops: 'shop'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 投诉链接相关
      linkList: [],
      link_textarea_value: '',
      current_link_item: -1,
      
      complaintAccount: '',
      complatinAccountList: [],
      knowledgeRightTypeList: [],
      knowledgeRightTypeDetailList: [],
      complaintPlatform: PLATFORM.tb,

      complaintLinkType: COMPLAINT_LINK_TYPE.goods,
      complaintReasonList: [],
      
      complaintReasonId: '',

      fileList: [],
      showFileList: [],

      isVerifyLink: false,
    }
  }
  componentWillMount() {
    this.getComplaintAccount()
    // this.getKnowledgeRightType(this.state.complaintPlatform)
  }
  // 移除文件
  handleRemoveFile = (file) => {
    const arr = this.state.fileList.slice()
    const list = arr.filter(v => v.uid !== file.uid)
    this.setState({
      fileList: list
    })
  }
  // 上传文件之前
  handleBeforeUpload = (file, list) => {
    const ALLOW_TYPE = ['jpg', 'png', 'bmp', 'pdf', 'zip', 'rar', 'doc', 'docx']
    const type = file.name.substring(file.name.lastIndexOf('.') + 1)
    
    const isAllow = ALLOW_TYPE.includes(type)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      Msg.error('上传的文件必须小于 5MB!');
    }
    if (!isAllow) {
      Msg.error('请按正确格式上传文件！')
    }
    return isAllow && isLt5M;
  }
  // 上传文件改变
  handleUploadChange = info => {
    // const { fileList, showFileList } = this.state
    // const list = fileList.slice()
    // console.log(info)
    const { fileList } = info
    if (info.file.status === 'done') {
      // console.log(info)
      const { data, status, message } = info.file.response
      if (status === '10000') {
        Msg.success(message)
        // list.push({link: data.url, uid: info.file.uid, url: data.url})
        // this.setState({
        //   fileList: list
        // })
      } else {
        Msg.error(message)
      }
    }
    if (this.handleBeforeUpload(info.file)) {
      this.setState({
        fileList
      })
    }

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
          complatinAccountList: data
        })
      }
    }).catch(err => {
      // console.log(err)
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 验证链接
  verifyLink = (callback) => {
    const { complaintPlatform, complaintLinkType, linkList, complaintAccount } = this.state
    this.props.form.validateFieldsAndScroll(['complaintAccount', 'knowledgeRightTypeDetail'], (err, values) => {
      if (!err) {
        const cId = values.knowledgeRightTypeDetail
        if (!linkList.length) {
          Msg.warning('请至少添加一条链接！')
          return
        }
        LoadingModal({bl:true})
        axios.post('/hcm/taobaoCheckLink', {
          id: complaintAccount,
          platform: complaintPlatform,
          cId,
          urlType: complaintLinkType,
          linkers: linkList.map(v => typeof(v) === 'string' ? v : v.errorLink).join(',')
        }).then(res => {
          LoadingModal({bl:false})
          // const data = this.handleResponse(res)
          const { data, status, message } = res.data
          if (status === '10000') {
            if (data.data) {
              // console.log(data)
              const { success, error } = data.data
              // if (success !== false) {
              this.setState({
                isVerifyLink: true,
                linkList: error ? error.map(v => Object.assign({}, {errorLink: v})).concat(success?success:[]) : (success?success:[])
              }, () => {
                callback && callback()
              })
              // } else {
              //   Msg.error(data.data.message)
              // }
            }
          } else {
            Msg.error(message)
          }

        }).catch(err => {
          LoadingModal({bl:false})
          this.catchError(err)
        })
      }
    })

  }
  // 获取投诉理由
  getComplaintReason = (platform, typeId) => {
    this.getListFn('/hcm/getTaobaoIprReason', {platform, type: typeId}, 'complaintReasonList')
  }
  // 获取知识产权类别详情
  getKnowledgeRightTypeDetail = typeId => {
    this.getListFn('/hcm/getTaobaoIpr', {type: typeId}, 'knowledgeRightTypeDetailList')
  }
  // 获取知识产权类型
  getKnowledgeRightType = platform => {
    this.getListFn('/hcm/getTaobaoiprType', {platform}, 'knowledgeRightTypeList')
  }
  getListFn = (url, params, key) => {
    const { complaintAccount } = this.state
    axios.post(url, {id: complaintAccount, ...params}).then(res => {
      const data = this.handleResponse(res)
      if (data) {
        this.setState({
          [key]: [...data]
        })
      }
    }).catch(this.catchError)
  }
  catchError = err => {
    Msg.error('系统繁忙，请稍后再试！')
  }
  handleResponse = response => {
    // console.log('=-=-=-=', response)
    const { data: {data}, status, message } = response.data
    if (status === '10000') {
      return data
    } else {
      Msg.error(message)
      // return null
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.verifyLink(() => {
      const { 
        complaintPlatform, 
        knowledgeRightTypeList, 
        knowledgeRightTypeDetailList, 
        complaintReasonList, 
        complaintLinkType,
        linkList,
        fileList,
      } = this.state
      const { validateFieldsAndScroll } = this.props.form
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (values.reportComment.length > 1500) {
            Msg.warning('投诉理由超过1500字，请修改！')
            return
          }
          let reasonText = '', iprName = '', cName = '', url = ''
          complaintReasonList.forEach(v => {
            v.items.forEach(val => {
              if (val.id === values.reason) {
                reasonText = val.text
              }
            })
          })
          iprName = knowledgeRightTypeList.filter(v => v.id == values.knowledgeRightType)[0].text
          cName = knowledgeRightTypeDetailList.filter(v => v.id == values.knowledgeRightTypeDetail)[0].text
          url = !!fileList.length ? fileList.map(v => v.response.data.url).join(',') : ''
          const data = {
            id:values.complaintAccount,
            platform:complaintPlatform,
            iprName,
            type:values.knowledgeRightType,
            cName,
            cId:values.knowledgeRightTypeDetail,
            urlType:complaintLinkType,
            reasonText: complaintLinkType === COMPLAINT_LINK_TYPE.goods?reasonText:'明显假冒',
            reason:complaintLinkType === COMPLAINT_LINK_TYPE.goods?values.reason:'frontReason.trademark.fake.mxjh',
            reportComment:values.reportComment,
            links: linkList.map(v => typeof(v) === 'string' ? v : v.errorLink).join(','),
            url,
          }
          // console.log(data)
          // return
          LoadingModal({bl:true})
          axios.post('/hcm/taobaoComplaint', data).then(res => {
            LoadingModal({bl:false})
            const { data, status, message } = res.data
            if (status === '10000') {
              // if (data.success && data.success !== false) {
                // Msg.success((data.message && data.message) || message)
                Msg.success(message)
                this.props.form.resetFields()
                this.setState({
                  linkList: [],
                  isVerifyLink: false,
                  complaintReasonId: '',
                  fileList: [],
                })
              // } else {
              //   Msg.error(data.message && data.message)
              // }
            } else {
              Msg.error(message)
            }
          }).catch(err => {
            LoadingModal({bl:false})
            this.catchError(err)
          })
        }
      })
    })

  }
  handleRadioChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
    if (key === 'complaintPlatform') {
      this.props.form.validateFields(['complaintAccount'], (err, values) => {
        if (!err) {
          this.getKnowledgeRightType(e.target.value)
        }
      })
    }
  }
  handleSelect = (key, value) => {
    if (key === 'knowledgeRightType') {
      // 选择知识产权类型
      this.props.form.resetFields(['knowledgeRightTypeDetail'])
      this.getKnowledgeRightTypeDetail(value)
      this.getComplaintReason(this.state.complaintPlatform, value)
    } else if (key === 'complaintAccount') {
      this.props.form.resetFields(['knowledgeRightType', 'knowledgeRightTypeDetail', 'reason'])
      this.setState({
        [key]: value
      }, () => {
        this.getKnowledgeRightType(this.state.complaintPlatform)
      })
    } else {
      this.setState({
        [key]: value
      })
    }
  }
  // 修改链接结束
  handleLinkItemBlur = () => {
    const list = this.state.linkList.slice()
    this.setState({
      current_link_item: -1,
      linkList: Array.from(new Set(list))
    })
  }
  // 修改链接
  handleLinkItemChange = (index, e) => {
    const value = e.target.value
    const list = this.state.linkList.slice()
    list[index] = value
    this.setState({
      linkList: list,
      isVerifyLink: false,
    })
  }
  // 选中要修改的链接
  handleLinkItemEdit = index => {
    this.setState({
      current_link_item: index
    })
  }
  // 删除选中的链接
  handleLinkItemDelete = index => {
    // console.log(index)
    const list = this.state.linkList.slice()
    list.splice(index, 1)
    this.setState({
      linkList: list,
      isVerifyLink: false,
    })
  }
  // 添加链接
  handleLinkChange = e => {
    const list = this.state.linkList.slice()
    if (list.length < 300) {
      this.setState({
        link_textarea_value: e.target.value
      })
    } else {
      Msg.warning('超出限制！')
    }

  }
  // 添加链接结束
  handleLinkBlur = e => {
    // console.log(this._textarea)
    const values = e.target.value.split('\n')
    const list = this.state.linkList.slice()
    const arr = list.concat(values)

    const value_set = new Set(arr.filter(v => v !== ''))
    const list_value = Array.from(value_set)

    this.setState({
      linkList: [...list_value],
      link_textarea_value: ''
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

// export default App
export default Form.create()(App)