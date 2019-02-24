import Tpl from './tpl'
import axios from '../../../../js/common/ajax'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      detail: {}
    }
  }
  componentWillMount() {
    this.getActivityDetail()
  }
  // 获取活动详情
  getActivityDetail = () => {
    const { id } = this.state
    axios({
      method: 'post',
      url: '/hcm/dealer/searchCampaignProductList',
      data: {
        campaign_id: id
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          detail: data
        })
      }
    }).catch()
  }
  handleBtnClick = (activity_pro_id) => {
    const { id } = this.state
    this.props.history.push({
      pathname: `/ClientInspectDetail/${id}/${activity_pro_id}`
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App