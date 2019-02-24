import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'

const DEFAULT_PAGE = {
  pageNo: 1,
  pageSize: 10,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shopList: [],
      pagination: {...DEFAULT_PAGE},
      shop_name: '',
    }
  }
  componentWillMount() {
    this.getShopList()
  }
  getShopList = () => {
    const { shop_name, pagination } = this.state
    const params = {
      shop_nick: shop_name,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    }
    LoadingModal({bl:true})
    axios.get('/hcm/ItemMark/shopList',{params}).then(res => {
      LoadingModal({bl:false})
      const { data, status, message } = res.data
      if (status === '10000') {
        // console.log('-----res', data)
        this.setState({
          shopList: data.content,
          pagination: Object.assign({}, this.state.pagination, {
            pageNo: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
          })
        })
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error(err.statusText)
    })
  }
  handlePageChange = page => {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {
        pageNo: page,
      })
    }, () => {
      this.getShopList()
    })
  }
  handleInputChange = e => {
    this.setState({
      shop_name: e.target.value
    })
  }
  handleSearchClick = e => {
    // console.log(e.target.value)
    // if (!e.target.value.length) {
    //   return
    // }
    this.setState({
      // shop_name: e.target.value,
      pagination: {...DEFAULT_PAGE},
    }, () => {
      this.getShopList()
    })
  }
  goTo = path => {
    this.props.history.push(path)
  } 
  render() {
    return <Tpl that={this} />
  }
}

export default App