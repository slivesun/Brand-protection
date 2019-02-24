import Tpl from './tpl'
import { ImgModal } from '../../../components/ImgModal/ImgModal'
import axios from '../../../../js/common/ajax'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity_id: props.match.params.activity_id,
      activity_pro_id: props.match.params.activity_pro_id,
      inspectDetail: {}
    }
  }
  componentWillMount() {
    this.getInspectList()
  }
  // 获取稽查列表
  getInspectList = () => {
    const { activity_id, activity_pro_id } = this.state
    axios({
      method: 'post',
      url: '/hcm/dealer/searchCampaignProductInspectList',
      data: {
        cam_pro_id: activity_pro_id,
        campaign_id: activity_id
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000') {
        this.setState({
          inspectDetail: data
        })
      }
    }).catch()
  }
  handleImgClick = params => {
    ImgModal(params)
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App