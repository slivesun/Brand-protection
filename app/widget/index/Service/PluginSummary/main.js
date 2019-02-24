import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platformList: [],
      platform: '',
      start_time: moment(moment().subtract(6, 'd').format('YYYY-MM-DD'), 'YYYY-MM-DD HH:mm:ss'),
      end_time: moment(moment().format('YYYY-MM-DD')+'T23:59:59', 'YYYY-MM-DD HH:mm:ss'),
      wangwang: '',
      itemid: '',
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      dataList: [],
      selectedTableRows: [],
      isCheckedAll: false,
    }
  }
  componentWillMount() {
    this.getPlatformDict()
    this.getDataList()
  }
  // 选择表格数据
  handleRowSelection = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    this.setState({
      selectedTableRows: selectedRows.length?selectedRows.map(v => v.id):[],
      isCheckedAll: false,
    })
  }
  // 清除搜索数据
  handleClearInput = key => {
    this.setState({
      [key]: ''
    })
  }
  // 获取表格数据
  getDataList = () => {
    const { platform, start_time, end_time, pagination, wangwang, itemid } = this.state
    LoadingModal({bl:true})
    axios.post('/hcm/plugin/getPluginList', {
      platform,
      start_time: start_time.format('YYYY-MM-DD HH:mm:ss'),
      end_time: end_time.format('YYYY-MM-DD HH:mm:ss'),
      wangwang,
      itemid,
      // ...pagination,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    }).then(res => {
      LoadingModal({bl:false})
      const result = this.handleResponse(res)
      this.setState({
        dataList: result.content,
        pagination: Object.assign({}, this.state.pagination, {
          pageNo: result.pageNumber,
          pageSize: result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        })
      })
    }).catch(this.handleResponseError)
  }
  // 选择时间
  // dateChange = (dates) => {
  //   if (dates.length) {
  //     this.setState({
  //       start_time: dates[0],
  //       end_time: dates[1],
  //     })
  //   }
  // }
  // 选择全部
  selectAll = () => {
    this.setState({
      isCheckedAll: true,
      selectedTableRows: [...this.state.dataList.map(v => v.id)],
    })
  }
  // 取消选择
  cancelAll = () => {
    this.setState({
      isCheckedAll: false,
      selectedTableRows: [],
    })
  }
  // 分页查询
  pageChange = page => {
    // console.log(page)
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page,
      })
    }, () => {
      this.getDataList()
    })
  }
  // 批量删除
  handleDelete = () => {
    const { isCheckedAll, selectedTableRows, platform, start_time, end_time, wangwang, itemid } = this.state

    if (!selectedTableRows.length) {
      Msg.warning('请至少选择一条记录！')
      return
    }

    const data = {
      platform,
      start_time: start_time.format('YYYY-MM-DD HH:mm:ss'),
      end_time: end_time.format('YYYY-MM-DD HH:mm:ss'),
      wangwang,
      itemid,
    }
    if (isCheckedAll) {
      data.ids = 'checkAll'
    } else {
      data.ids = selectedTableRows.join(',')
    }
    // console.log(data)
    LoadingModal({bl:true})
    axios.post('/hcm/plugin/deletePluginList', data).then(res => {
      LoadingModal({bl:false})
      const result = this.handleResponse(res)
      if (result) {
        Msg.success(res.data.message)
        this.getDataList()
        this.setState({
          selectedTableRows: [],
        })
      }
    }).catch(this.handleResponseError)
  }
  // 提交搜索数据
  handleSearchSubmit = (getFieldsValue, e) => {
    e.preventDefault();
    const values = getFieldsValue()
    if (!values.times.length) {
      Msg.warning('请选择时间！')
      return
    }
    this.setState({
      platform: values.platform,
      start_time: values.times[0],
      end_time: values.times[1],
      wangwang: values.wangwang?values.wangwang:'',
      itemid: values.itemid?values.itemid:'',
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: 1,
      }),
    }, () => {
      this.getDataList()
    })
  }
  // 获取平台字典值
  getPlatformDict = () => {
    axios.get('/hcm/sys/GetList', {
      params: {
        dictcode: 'platform',
      }
    }).then(res => {
      const result = this.handleResponse(res)
      if (result) {
        this.setState({
          platformList: result,
        })
      }
    }).catch(this.handleResponseError)
  }
  handleResponse = (res) => {
    const { data, status, message } = res.data
    if (status === '10000') {
      return data
    } else {
      Msg.error(message)
      return undefined
    }
  }
  handleResponseError = (err) => {
    LoadingModal({bl:false})
    Msg.error(err.statusText)
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App