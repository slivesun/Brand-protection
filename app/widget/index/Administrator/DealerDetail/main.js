import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      dealer: {
        dealername:null,
        dutynumber:null,
        take_people:null,
        address:null,
        contact:null,
        province:null,
        city:null,
        companyname_list:[]
      },
      shopList: []
    }
  }
  componentWillMount() {
    this.getData('id', 'dealer', '/hcm/dealer/searchDealerInfoOfAdmin')
    this.getData('dealer_id', 'shopList', '/hcm/dealer/DealerDetail_AuthshopOfAdmin')
  }
  getData = (flag, statusKey, url) => {
    const { id } = this.state
    axios({
      method: 'post',
      url,
      data: {
        [flag]: id,
        // bmcid: 365
      }
    }).then(res => {
      const { data, status, message } = res.data
      if (status === '10000'&&data) {
        this.setState({
          [statusKey]: data
        })
      }else if(status !== '10000'){
        Msg.error(message)
      }
    }).catch()
  }


  render() {
    return <Tpl that={this} />
  }
}

export default App