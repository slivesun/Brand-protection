import Tpl from './tpl'
import axios from '../../../js/common/ajax'
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal'

import { message as Msg } from 'antd'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalData: null,
      loading:false,
      key_name: '',
      platform_code: '',
      
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      dataList: [],
      allLength: '', // 是否勾选全部

      selectedTableData: [],

      editKeyword: {},

      isDisabledSelectTime: false,
      temptRecord: {},  //临时保存一条记录
    }
  }
  componentWillMount() {
    this.getDataList()
  }
  handleKeywordChange = e => {
    this.setState({
      key_name: e.target.value
    })
  }
  handlePlatformSelect = value => {
    this.setState({
      platform_code: value
    })
  }
  inputChange = (record, key, e) => {
    if (e.target.value.length > 20) {
      Msg.warning('关键词超过20个字符限制！')
    }
    record[key] = e.target.value
  }
  selectChange = (record, key, value) => {
    record[key] = value
  }
  handleSaveKeywordSet = record => {
    // console.log(record)
    this.setState({
      loading:true
    },()=>{
      const data = {
        id: record.id,
        key1: record.key1,
        key2: record.key2,
        key3: record.key3,
        logic1: record.logic1,
        logic2: record.logic2,
        key_name: record.key_name,
        key_price: record.key_price,
        key_range: record.key_range,
        key_times: record.key_times,
        platform: record.platform,
        
      }
      if (!data.key1) {
        this.setState({
          loading:false
        })
        Msg.warning('请输入关键词1！')
        return
      }
      if (!!data.key2 && !data.logic1) {
        this.setState({
          loading:false
        })
        Msg.warning('请选择关键词2筛选条件！')
        return
      }
      if (!!data.logic1 && !data.key2) {
        this.setState({
          loading:false
        })
        Msg.warning('请输入关键词2！')
        return
      }
      if (!!data.key3 && !data.logic2) {
        this.setState({
          loading:false
        })
        Msg.warning('请选择关键词3筛选条件！')
        return
      }
      if (!!data.logic2 && !data.key3) {
        this.setState({
          loading:false
        })
        Msg.warning('请输入关键词3！')
        return
      }
      if ((data.key1 && data.key1.length > 20) || (data.key2 && data.key2.length >20) || (data.key3 && data.key3.length > 20)) {
        this.setState({
          loading:false
        })
        Msg.warning('关键词超过20个字符限制！')
        return
      }
      axios.post('/hcm/keyword/addkeys', data).then(res => {
        const {data,status,message} = res.data
        if (status === '10000') {
          Msg.success(message)
          this.setState({
            loading:false
          })
          this.getDataList()
        } else {
          this.setState({
            loading:false
          })
          Msg.error(message)
        }
      }).catch(err => {
        this.setState({
          loading:false
        })
        Msg.error('系统繁忙，请稍后再试！')
      })
    })
   
  }
  handleClearIconClick=()=>{
      this.setState({
        key_name:""
      })
  }
  handleDeleteAll = () => {
    const { selectedTableData, key_name, platform_code, allLength } = this.state
    if (!selectedTableData.length) {
      Msg.warning("请至少勾选一个！")
      return
    }
    const data = {
      ids: allLength === ''? selectedTableData.join(',') : "checkAll",
      key_name,
      platform: platform_code,
    }
    this.deleteFn(data)
  }
  handleDeleteOne = (record) => {
    const data = {
      ids: record.id,
      key_name: record.key_name,
      platform_code: record.platform_code,
    }
    this.deleteFn(data)
  }
  deleteFn = (param) => {
    // console.log(data)
    axios.post('/hcm/keyword/delete', param).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        // console.log(data)
        Msg.success(message)
        this.getDataList()
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  selectedTableChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys, selectedRows)
    this.setState({
      selectedTableData: selectedRowKeys
    })
  }
  selectedAll = flag => {
    this.setState({
      selectedTableData: flag ? this.state.dataList.map(v => v.id) : [],
      allLength: flag ? this.state.pagination.totalElements : '',
    })
  }
  handleShowKeywordInput = (flag, index) => {
    const copyDatalist = [...this.state.dataList]
    if (flag) {
      copyDatalist[index].temptRecord = Object.assign({}, copyDatalist[index])
    } else {
      copyDatalist[index] = copyDatalist[index].temptRecord
    }
    copyDatalist[index]._isShowInput = flag
    this.setState({
      dataList: copyDatalist
    })
  }
  getDataList = () => {
    const { pagination, key_name, platform_code } = this.state
    LoadingModal({bl:true})
    axios.post('/hcm/keyword/list', {
      key_name,
      platform: platform_code,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    }).then(res => {
      // console.log(res)
      const { data, status, message } = res.data
      LoadingModal({bl:false})
      if (status === '10000') {
        this.setState({
          pagination: Object.assign({}, this.state.pagination, {
            pageNo: data.pageNumber,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
          }),
          dataList: !!data.content.length ? data.content.map(v => Object.assign({}, v, {_isShowInput: false})) : [],
          selectedTableData: [],
        })
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handlePageChange = page => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {pageNo: page})
    }, () => {
      this.getDataList()
    })
  }
  handleModalOk = () => {
    const { editKeyword, modalData } = this.state
    if (!Object.keys(editKeyword).length) {
      this.setState({
        isShowModal: false
      })
      return
    }
    const isShowInfo = editKeyword.frequency ?
                       (editKeyword.key_times ? 
                        editKeyword.key_times.split(',').length != editKeyword.frequency:
                        modalData.key_times.split(',').length != editKeyword.frequency
                        ) : (
                          editKeyword.key_times?
                          editKeyword.key_times.split(',').length != modalData.frequency:
                          false
                        )
    if (isShowInfo) {
      Msg.warning(`只能选择${editKeyword.frequency||modalData.frequency}个时间！`)
      return
    }
    const arr = Object.values(editKeyword)
    if (!arr.length || arr.includes('')) {
      Msg.warning('请完善表单！')
      return
    }
    // if (editKeyword.frequency && (editKeyword.key_times && editKeyword.key_times.split(',').length != editKeyword.frequency) || )
    const data = {
      ...modalData,
      ...editKeyword,
    }
    if (data.updatetime && data.createtime) {
      delete data.updatetime
      delete data.createtime
    }
    // console.log(data)
    // return
    axios.post('/hcm/keyword/update', data).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        this.setState({
          isShowModal: false,
          editKeyword: {}
        })
        this.getDataList()
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  handleFocusSelect = record => {
    const { modalData, editKeyword } = this.state
    const num = parseInt(editKeyword.frequency?editKeyword.frequency:modalData.frequency, 10)
    const length = editKeyword.key_times !== undefined?(editKeyword.key_times===''?0:editKeyword.key_times.split(',').length):modalData.key_times.split(',').length
    // console.log(num, length)
    if (length > num || length == num) {
      this.setState({
        isDisabledSelectTime: true
      })
    } else {
      this.setState({
        isDisabledSelectTime: false
      })
    }
  }
  formChange = (type, key, val) => {
    if (key === 'key_price') {
      if (isNaN(Number(val))) {
        Msg.warning('请输入数字！')
        return
      }
    }
    if (type === 'input') {
      this.setState({
        editKeyword: Object.assign({}, this.state.editKeyword, { [key]: val }),
      })
    }
    if (type === 'select') {
      this.setState({
        editKeyword: Object.assign({}, this.state.editKeyword, { [key]: typeof val === 'string' ? val : val.join(',') })
      })
    }

    if (key === 'key_times') {
      const { modalData, editKeyword } = this.state
      const num = parseInt(editKeyword.frequency?editKeyword.frequency:modalData.frequency, 10)
      if (val.length >= num) {
        this.setState({
          isDisabledSelectTime: true
        })
      } else {
        this.setState({
          isDisabledSelectTime: false
        })
      }
    }
  }
  modalClick = (flag, record=null) => {
    if (flag) {
      this.setState({
        isShowModal: flag,
        modalData: record,
      })
    } else {
      this.setState({
        isShowModal: flag,
        editKeyword: {},
      })
    }
  }
  goTo = (path) => {
    this.props.history.push(path)
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App