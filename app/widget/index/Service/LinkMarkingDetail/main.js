import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'

const DEFAULT_PAGE = {
  pageNo: 1,
  pageSize: 10,
}
const TYPE_MAP = {
  all: '0',
  marked: '1',
  nobrand: '2',
  unmarked: '3',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shopName: props.match.params.shopName,
      pagination: {...DEFAULT_PAGE},
      type: TYPE_MAP.all,
      dataList: [],
      dataCounts: null,
      classifyList: [],
    }
  }
  componentWillMount() {
    this.getDataList()
    this.getNum()
    this.getClassifyList()
  }
  // 获取数量
  getNum = () => {
    const params = {
      shop_nick: this.state.shopName
    }
    axios.get('/hcm/ItemMark/tyepCount',{params}).then(res => {
      const result = this.handleResponseSucc(res)
      if (!result) {
        return
      }
      this.setState({
        dataCounts: Object.assign({}, {...result})
      })
    }).catch(this.handleResponseErr)
  }
  // 
  handlePageChange = (page, pageSize) => {
    this.setState({
      pagination: {...this.state.pagination, pageNo: page}
    }, () => {
      this.getDataList()
    })
  }
  // 
  submitMark = index => {
    const { dataList, shopName } = this.state
    const {
      item_id, 
      item_link, 
      item_title, 
      _isCheckboxStatus,
      _selected,
      product_class_id,
      product_class_name,
      product_id,
      product_name,
      type,
    } = dataList[index]
    let data = {
      item_id,
      item_link,
      item_title,
      shop_nick: shopName,
    }
    if (_isCheckboxStatus) {
      // 非本品牌商品
      data.type = parseInt(TYPE_MAP.nobrand, 10)
      data.product_class_id = null
      data.product_class_name = null
      data.product_id = null
      data.product_name = null
    } else {
      if (!!_selected.length && _selected.every(v => v !== null && v.id !== undefined)) {
        // 本品牌商品
        data.type = parseInt(TYPE_MAP.marked, 10)
        data.product_class_id = _selected[0].id
        data.product_class_name = _selected[0].productClassifyName
        data.product_id = _selected[1].id
        data.product_name = _selected[1].productName
      } else if (!!_selected.length && _selected.every(v => v === null)) {
        data.type = null
      }else {
        data.type = !!_selected.length ? type : null
        data.product_class_id = !!_selected.length ? product_class_id : null
        data.product_class_name = !!_selected.length ? product_class_name : null
        data.product_id = !!_selected.length ? product_id : null
        data.product_name = !!_selected.length ? product_name : null
      }
    }
    // console.log('---submit',data)
    // return
    LoadingModal({bl:true})
    axios.post('/hcm/ItemMark/save', data).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        Msg.success(message)
        this.getNum()
        this.getDataList()
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      this.handleResponseErr(err)
    })
  }
  // 
  handleCheckboxChange = (index, e) => {
    const copyList = [...this.state.dataList]
    const targetObj = {...copyList[index]}
    targetObj._isCheckboxStatus = e.target.checked
    targetObj._selected = [null, null]
    copyList[index] = targetObj
    this.setState({
      dataList: copyList
    })
  }
  // 获取列表数据
  getDataList = () => {
    const { shopName, type, pagination } = this.state
    const params = {
      type,
      shop_nick: shopName,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    }
    LoadingModal({bl:true})
    axios.get('/hcm/ItemMark/List', {params}).then(res => {
      LoadingModal({bl:false})
      const result = this.handleResponseSucc(res)
      if (!result) {
        return
      }
      this.setState({
        dataList: result.content.map(v => {
          return  Object.assign({}, v, {
            _isCheckboxStatus:v.type==TYPE_MAP.nobrand,
            _selected: [v.product_class_id, v.product_id],
          })
        }),
        pagination: Object.assign({}, this.state.pagination, {
          pageNo: result.pageNumber,
          pageSize: result.pageSize,
          totalElements: result.totalElements,
        })
      })
    }).catch(err => {
      LoadingModal({bl:false})
      this.handleResponseErr(err)
    })
  }
  // 获取下拉数据
  getClassifyList = () => {
    axios.get('/hcm/ProductClassify/list').then(res => {
      const result = this.handleResponseSucc(res)
      if (!result) {
        return
      }
      this.setState({
        classifyList: result.map(v => Object.assign({}, v, {value:v.id,label:v.productClassifyName,isLeaf:false}))
      })
    }).catch(this.handleResponseErr)
  }
  // 点击加载下拉数据
  handleLoadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length-1]
    targetOption.loading = true
    const params = {
      product_classify_id: targetOption.id,
    }
    axios.get('/hcm/hcmProduct/listByClass', {params}).then(res => {
      targetOption.loading = false
      const result = this.handleResponseSucc(res)
      if (!result) {
        return
      }
      if (result.length) {
        targetOption.children = result.map(v => Object.assign({}, v, {value:v.id,label:v.productName}))
      } else {
        targetOption.disabled = true
        targetOption.isLeaf = true
      }
      this.setState({
        classifyList: [...this.state.classifyList],
      })
    }).catch(err => {
      targetOption.loading = false
      this.handleResponseErr(err)
    })
  }
  // 切换面板回调
  handleTabChange = activekey => {
    // console.log(activekey)
    // const { dataList } = this.state
    // let isGetData = false
    // activekey === '' && !dataList.length ? isGetData = true : null
    // activekey !== '' && !this.state[COMMON_MAP[activekey]].length ? isGetData = true : null
    // if (!isGetData) {
    //   return
    // }
    this.setState({
      type: activekey,
      pagination: {...DEFAULT_PAGE}
    }, () => {
      this.getDataList()
    })
  }
  // 选择下拉选项
  handleCascaderChange = (index, value, selectedOptions) => {
    // console.log(value, selectedOptions)
    const copyList = [...this.state.dataList]
    const targetObj = copyList[index]
    targetObj._selected = selectedOptions
    copyList[index] = targetObj
    this.setState({
      dataList: copyList
    })
  }
  // 
  toggleFn = (index, flag) => {
    const copyList = [...this.state.dataList]
    const targetObj = {...copyList[index]}
    targetObj._isShowEdit = flag
    if (!flag) {
      // 取消操作
      targetObj._isCheckboxStatus = targetObj.type==TYPE_MAP.nobrand
      targetObj._selected = [targetObj.product_class_id, targetObj.product_id]
    }
    copyList[index] = targetObj
    this.setState({
      dataList: copyList
    })
  }
  // 处理响应
  handleResponseSucc = res => {
    const { data, status, message } = res.data
    if (status !== '10000') {
      Msg.error(message)
      return undefined
    }
    return data
  }
  handleResponseErr = err => {
    Msg.error(err.statusText)
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App