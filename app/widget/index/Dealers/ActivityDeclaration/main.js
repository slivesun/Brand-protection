import { connect } from 'react-redux'
import { getShopList, getProductList } from '../../../../js/actions/dealer'
import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'
// import { LoadingModal } from '../../../components/LoadingModal/LoadingModal'
import utils from '../../../../js/common/lib'


@connect(state => (
  {
    shopList: state.dealer.shopList,
    productList: state.dealer.productList
  }
))
class ActivityDeclaration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addActivityProductList: [{
        product_id: '',
        product_url: '',
        apply_price: '',
        actual_price: '',
        campaign_type: '',
        gift_situation: '',
        play_content: '',
        prices_map: '',
      }], // 添加活动产品列表
      shop_id: '', // 店铺编号
      campaign_name: '', // 活动主题
      start_time: Date.now(), // 开始时间
      end_time: Date.now(), // 结束时间
      campaign_desc: '', // 活动描述
      // prices_map: {} // 价格map
      // selectHttp: 'Http://'
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getShopList())
    dispatch(getProductList())
  }
  checkInputLength = list => {
    const LIST = {
      'product_url': {
        label: '商品链接',
        type: 'URL'
      },
      // 'apply_price': {
      //   label: '申请标价',
      //   type: 'INPUT'
      // },
      // 'actual_price': {
      //   label: '实际成交价',
      //   type: 'INPUT'
      // },
      'campaign_type': {
        label: '活动类型',
        type: 'INPUT'
      },
      'gift_situation': {
        label: '赠品情况',
        type: 'TEXTAREA'
      },
      'play_content': {
        label: '玩法说明',
        type: 'TEXTAREA'
      }
    }
    if (list.length) {
      const arr = list.map((v, i) => {
        return Object.keys(v).map(key => {
          if (LIST[key] && !utils.legnthCheck(v[key], LIST[key].type)) {
            return `请把${i+1}号产品的${LIST[key].label}限制在${utils.LENGTH[LIST[key].type]}字符内！`
          }
        })
      })
      const temList = arr.reduce((a, b) => a.concat(b), []).filter(v => v !== undefined)
      // console.log('---------------arr', temList)
      if (temList.length) {
        temList.forEach(msg => Msg.warning(msg))
        return false
      } else {
        return true
      }
    } else {
      Msg.warning('请至少添加一个活动产品！')
      return false
    }
  }
  // 提交表单
  handleSubmit = e => {
    const {
      shop_id,
      campaign_name,
      start_time,
      end_time,
      campaign_desc,
      addActivityProductList
    } = this.state
    if (shop_id === '') {
      Msg.warning('请选择店铺！')
      return
    }
    if (campaign_name === '') {
      Msg.warning('请输入活动主题！')
      return
    }
    if (start_time === end_time) {
      Msg.warning('请选择活动时间！')
      return
    }
    if (!this.checkInputValue(addActivityProductList)) {
      Msg.warning('请完善活动产品信息！')
      return
    }
    if (!utils.legnthCheck(campaign_name, 'INPUT')) {
      Msg.warning(`请把活动主题限制在${utils.LENGTH.INPUT}字符内！`)
      return
    }
    if (campaign_desc && !utils.legnthCheck(campaign_desc, 'TEXTAREA')) {
      Msg.warning(`请把活动说明限制在${utils.LENGTH.TEXTAREA}字符内！`)
      return
    }
    if (!this.checkInputLength(addActivityProductList)) return
    const shop_name = this.props.shopList.filter(v => v.id === shop_id)[0].shop_name;
    const list = addActivityProductList.slice()
    const data = {
      shop_id,
      shop_name,
      campaign_name,
      start_time,
      end_time,
      campaign_desc,
      cplist: list.map(
        v => {
          const product_id = v.product_id[1]
          // const product_url = v.selectHttp + v.product_url
          return Object.assign({}, v, {product_id})
        }
      )
    }
    // console.log(data)
    // return
    LoadingModal({bl:true})
    axios({
      method: 'post',
      url: '/hcm/campgign/Apply',
      transformRequest: [function (data, headers) {
        return data;
      }],
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify(data)
    }).then(res => {
      LoadingModal({bl:false})
      const {data, status, message} = res.data
      if (status === '10000') {
        Msg.success(message)
        this.handleClearForm()
      } else {
        Msg.error(message)
      }
    }).catch(err => {
      LoadingModal({bl:false})
      Msg.error('网络繁忙，请稍后再试！')
    })
  }
  handleSelectBeforeChange = (index, value) => {
    const { addActivityProductList } = this.state
    const list = addActivityProductList.slice()
    // list[index].selectHttp = value
    this.setState({
      addActivityProductList: list
    })
  }
  // 清空表单
  handleClearForm = () => {
    this.setState({
      shop_id: '',              // 店铺编号
      campaign_name: '',        // 活动主题
      start_time: Date.now(),           // 开始时间
      end_time: Date.now(),             // 结束时间
      campaign_desc: '', 
      addActivityProductList: [{
        product_id: '',
        product_url: '',
        apply_price: '',
        actual_price: '',
        campaign_type: '',
        gift_situation: '',
        play_content: '',
        prices_map: '',
      }]
    })
  }
  // 删除产品
  handleDeleteProduct = index => {console.log(index)
    const { addActivityProductList } = this.state
    let list = [...addActivityProductList]
    list.splice(index, 1)
    this.setState({
      addActivityProductList: list
    })
  }
  // 选择活动日期
  handleSwitchDateChange = dates => {console.log(dates)
    this.setState({
      start_time: dates.length === 0 ? Date.now() : dates[0].valueOf(),
      end_time: dates.length === 0 ? Date.now() : dates[1].valueOf()
    })
  }
  // 选择店铺
  handleSwitchShopChange = (value) => {
    this.setState({
      shop_id: value
    })
  }
  // 选择产品
  handleSwitchProductChange = (index, value, selectOption) => {
    // console.log(value)
    const { addActivityProductList } = this.state
    const list = addActivityProductList.slice()
    list[index].product_id = value
    this.setState({
      addActivityProductList: list
    })
    value.length === 2 && this.getProductPrices(value[1], index)
  }
  // inputchange事件回调（params: {flag: false(产品信息)true(活动信息)，key: 更改的字段, event: 事件对象)}）
  handleInputChange = (params) => {
    const {flag, key, event, index = 0} = params
    if (!flag) {
      // 修改产品信息
      const list = [...this.state.addActivityProductList]
      const obj = {...list[index]}
      obj[key] = typeof event === 'object' ? event.target.value : event
      list[index] = obj
      this.setState({
        addActivityProductList: list
      })
    } else {
      // 修改活动信息
      this.setState({
        [key]: event.target.value
      })
    }
  }
  // 获取产品价格
  getProductPrices = (id, index) => {
    axios({
      method: 'post',
      url: '/hcm/campgign/productPrice',
      data: {
        product_id: id
      }
    }).then(res => {
      const { data, status, message } = res.data
      const { addActivityProductList } = this.state
      const list = addActivityProductList.slice()
      list[index].prices_map = data
      if (status === '10000') {
        this.setState({
          addActivityProductList: list
        })
      }
    }).catch()
  }
  // 验证产品信息是否完整
  checkInputValue = list => {
    const arr = list.map(v => Object.keys(v).every(val => v[val] !== '' && !!v.apply_price && !!v.actual_price))
    return arr.every(v => v === true)
  }
  // 添加产品
  handleAddClick = index => {
    const { addActivityProductList, shop_id, campaign_name, start_time, end_time } = this.state
    addActivityProductList.push({
      product_id: '',
      product_url: '',
      apply_price: '',
      actual_price: '',
      campaign_type: '',
      gift_situation: '',
      play_content: '',
      prices_map: '',
      // selectHttp: 'Http://'
    })
    this.setState({
      addActivityProductList
    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default ActivityDeclaration