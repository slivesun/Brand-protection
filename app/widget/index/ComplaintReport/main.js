import Tpl from './tpl';
import echarts from 'echarts';

import { message as Msg } from 'antd'
import axios from '../../../js/common/ajax'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      platform: props.match.params.platform,
      data: [],
      inner_platform: 'taobao',
      start_time: moment().subtract(90, 'd'),
      end_time: moment(),
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      tablePage: {
        pageNo: 1,
        pageSize: 10,
      },
      shopComplaintRank: [],
      complaintListDetail: [],

      alreadyComplaintList: [],
      currentTab: '',
      currentIpr: '',
    }
  }
  componentWillMount() {
    this.getAlreadyComplaintList()
    this.getAllData(this.state.platform, '')
  }
  getAllData = (platform, ipr) => {
    if (platform === 'taobao') {
      this.getComplaintLinkSummary(ipr)
      this.getShopComplaintCount(ipr)
      this.getComplaintList(ipr)
    }
    if (platform === '1688') {
      // 默认获取全部
      this.getComplaintLinkSummary_1688(ipr)
      this.getShopComplaintCount_1688(ipr)
      this.getComplaintList_1688(ipr)
    }
  }
  handleTabChange = key => {
    // console.log('-------tab', key)
    this.setState({
      currentTab: key,
      tablePage: {
        pageNo: 1,
        pageSize: 10,
      },
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
    }, () => {
      const platform = this.state.platform
      const ipr = this.state.alreadyComplaintList.filter(v => v.report_id === key)
      const str = ipr.length ? ipr[0].complaintModelList.map(v => {
        if (platform === 'taobao') {
          return v.ipr_name
        }
        if (platform === '1688') {
          return v.ipr_id
        }
      }).join(',') : ''
      this.setState({
        currentIpr: str,
      })
      this.getAllData(platform, key?str:key)
    })

  }
  goTo = path => {
    this.props.history.push(path)
  }
  // 获取已设置投诉报表列表
  getAlreadyComplaintList = () => {
    axios.post('/hcm/complaint/report_list', {type: this.state.platform}).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          alreadyComplaintList: data
        })
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 1688投诉链接情况概览数据
  getComplaintLinkSummary_1688 = (iprNum) => {
    const {
      start_time,
      end_time,
      alreadyComplaintList,
      currentTab,
    } = this.state
    // const list = alreadyComplaintList.length?alreadyComplaintList.map(v => v.complaintModelList).reduce((a,b) => a.concat(b), []):[]
    // const account_ids = list.length?list.map(v => v.account_id).join(','):''
    // console.log('--account', account_ids, currentTab === '')
    axios.post('/hcm/complaint/link_1688', {
      start_time: start_time.format('YYYY-MM-DD'),
      end_time: end_time.format('YYYY-MM-DD'),
      ipr_num: iprNum,
      // account_id: currentTab === '' ? '' : account_ids,
    }).then(res => {
      // console.log(res)
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          data: data
        },()=>{
          this.myChart()
        })
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 1688获取店铺投诉次数
  getShopComplaintCount_1688 = (iprNum) => {
    this.getData('/hcm/complaint/reportSort_1688', 'shopComplaintRank', iprNum, '1688', 'pagination')
  }
  // 1688获取投诉列表
  getComplaintList_1688 = iprNum => {
    this.getData('/hcm/complaint/reportList_1688', 'complaintListDetail', iprNum, '1688', 'tablePage')
  }
  // taobao投诉链接概览数据
  getComplaintLinkSummary = (iprName) => {
    const {
      start_time,
      end_time,
    } = this.state
    axios.post('/hcm/complaint/reportStatus_taobao', {
      start_time: start_time.format('YYYY-MM-DD'),
      end_time: end_time.format('YYYY-MM-DD'),
      iprName,
    }).then(res => {
      // console.log(res)
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          data: data
        },()=>{
          this.myChart()
        })
      }
    }).catch(err => {
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // taobao获取店铺被投诉次数
  getShopComplaintCount = (iprName) => {
    this.getData('/hcm/complaint/reportSort_taobao', 'shopComplaintRank', iprName, 'taobao', 'pagination')
  }
  // taobao获取投诉列表
  getComplaintList = (iprName) => {
    this.getData('/hcm/complaint/reportList_taobao', 'complaintListDetail', iprName, 'taobao', 'tablePage')
  }
  rankPageChange = page => {
    // console.log(page)
    const { platform, alreadyComplaintList, currentTab, currentIpr } = this.state
    // const list = alreadyComplaintList.length?alreadyComplaintList.map(v => v.complaintModelList).reduce((a,b) => a.concat(b), []):[]
    // const ipr_names = list.length?list.map(v => v.ipr_name).join(','):''
    // const ipr_nums = list.length?list.map(v => v.ipr_id).join(','):''
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page,
      })
    }, () => {
      if (platform === 'taobao') {
        this.getShopComplaintCount(currentTab === '' ? '' : currentIpr)
      }
      if (platform === '1688') {
        this.getShopComplaintCount_1688(currentTab === '' ? '' : currentIpr)
      }
    })
  }
  tablePageChange = page => {
    const { platform, alreadyComplaintList, currentTab, currentIpr } = this.state
    // const list = alreadyComplaintList.length?alreadyComplaintList.map(v => v.complaintModelList).reduce((a,b) => a.concat(b), []):[]
    // const ipr_names = list.length?list.map(v => v.ipr_name).join(','):''
    // const ipr_nums = list.length?list.map(v => v.ipr_id).join(','):''
    this.setState({
      tablePage: Object.assign({}, this.state.tablePage, {
        pageNo: page,
      })
    }, () => {
      if (platform === 'taobao') {
        this.getComplaintList(currentTab === '' ? '' : currentIpr)
      }
      if (platform === '1688') {
        this.getComplaintList_1688(currentTab === '' ? '' : currentIpr)
      }
      
    })
  }
  dateChange = dates => {
    // console.log(dates)
    // return
    if (!dates.length) {
      return
    }
    const { platform, alreadyComplaintList, currentTab } = this.state
    const list = alreadyComplaintList.length?alreadyComplaintList.map(v => v.complaintModelList).reduce((a,b) => a.concat(b), []):[]
    const ipr_names = list.length?list.map(v => v.ipr_name).join(','):''
    const ipr_nums = list.length?list.map(v => v.ipr_id).join(','):''
    // if (platform === 'taobao') {
      this.setState({
        start_time: dates[0],
        end_time: dates[1],
        pagination: Object.assign({}, this.state.pagination, {
          pageNo: 1,
        }),
        tablePage: Object.assign({}, this.state.tablePage, {
          pageNo: 1,
        })
      }, () => {
        // this.getComplaintLinkSummary()
        this.getAllData(platform, currentTab === '' ? '' : (platform === 'taobao' ? ipr_names : ipr_nums))
      })
    // }
    // if (platform === '1688') {

    // }
  }
  // 获取数据
  getData = (url, key, ipr, flag, pageKey, isPage=true) => {
    const {
      inner_platform,
      start_time,
      end_time,
      // pagination,
      alreadyComplaintList,
      currentTab,
    } = this.state
    const data = {
      // iprName: 'FLYCO飞科',
      // platformCode: inner_platform,
      start_time: start_time.format('YYYY-MM-DD'),
      end_time: end_time.format('YYYY-MM-DD'),
    }
    if (isPage) {
      // data.pageNo = pagination.pageNo
      // data.pageSize = pagination.pageSize
      data.pageNo = this.state[pageKey].pageNo
      data.pageSize = this.state[pageKey].pageSize
    }
    if (flag === 'taobao') {
      data.iprName = ipr
    }
    if (flag === '1688') {
      // const list = alreadyComplaintList.length?alreadyComplaintList.map(v => v.complaintModelList).reduce((a,b) => a.concat(b), []):[]
      // const account_ids = list.length?list.map(v => v.account_id).join(','):''
      data.ipr_num = ipr
      // data.account_id = currentTab === '' ? '' : account_ids
    }
    LoadingModal({bl:true})
    axios.post(url,data).then(res => {
      // console.log(res)
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          [key]: data.content,
          // pagination: Object.assign({}, this.state.pagination, {
          //   pageNo: data.pageNumber,
          //   pageSize: data.pageSize
          // })
          [pageKey]: Object.assign({}, this.state[pageKey], {
            pageNo: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements
          }),
        })
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('系统繁忙，请稍后再试！')
    })
  }
  // 90天之内的可以选择
  handleDisabledDate = current => {
    // return current > moment() || current < moment().subtract(90, 'd')
    return current > moment()
  }

  componentDidMount(){
    
  }
  myChart = () => {
    let {data} = this.state;
    const myChart = echarts.init(document.getElementById('echarts'));
    let totnum = 0;
    
    if (data.length) {
      totnum = data.map(item => item.value).reduce((total, currentValue, index, arr) => {
        return total + currentValue
      })
    }
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        width:'100%',
        orient: 'horizontal',
        right: 'center',
        bottom: '20',
        itemGap: 20,
        data: data.map(item => item.name)
      },

      series: [
        {
          name: '总提交数',
          type: 'pie',
          radius: ['0%', '30%'],
          center: ['50%', '48%'],
          color: ['#fff'],
          silent: true,
          label: {
            position: 'center',
            formatter: '{c| {c}}\n{a|{a}}',
            color: '#333',
            fontSize: 20,
            rich: {
              a: {
                fontSize: 14,
                color: '#999',
                align: 'center'
              },
              c: {
                color: '#333',
                fontSize: 20,
                padding: 10,
                align: 'center'
              }
            }
          },
          data: [
            { value: totnum, name: '' }
          ]
        },
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '48%'],
          label: {
            formatter: '{b}：{c}  ({d}%)',
          },
          avoidLabelOverlap: true,
          color: ['#55a0f8', '#66c8ca', '#72c77c', '#f4d358', '#e17c7d', '#8e66dd','#2b5fb9','#50e667','#e650cf'],
          data: data
        }
      ]
    })

  }
  render() {
    return <Tpl that={this} />
  }
}

export default App