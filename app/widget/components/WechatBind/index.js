import { Button, message as Msg } from 'antd'
import axios from '../../../js/common/ajax'

import './wechatbind.less'


class WechatBind extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      isBinding: props.binding,
      qrCodeUrl: '',
    }
  }
  componentWillMount() {
    if (!window.sessionStorage.getItem('wechatModalStatus') && !this.state.isBinding) {
      this.getQrcode()
      this.timer = setInterval(this.getData, 5000)
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  getData = () => {
    const logintype = window.localStorage.getItem('logintype')
    let apiUrl = ''
    if (logintype === 'DEALER') {
      // 经销商
      apiUrl = '/hcm/Index/dealerIndex'
    } else {
      // 品牌方
      apiUrl = '/hcm/Index/bmaincustomerIndex'
    }
    axios.get(apiUrl).then(res => {
      if (res.data.status === '10000') {
          this.setState({
              isBinding: res.data.data.binding
          })
          if (!!res.data.data.binding) {
            clearInterval(this.timer)
          }
      }
    }).catch(err => {
        Msg.error('系统繁忙，请稍后再试！')
    })
  }
  getQrcode = () => {
    axios.post('/hcm/wechat/getQRcode', {
      userid: this.props.userId,
      usertype: 'c'
    }).then(response => {
      const { data, message, status } = response.data
      if (status === '10000') {
        // console.log(data)
        this.setState({
          qrCodeUrl: `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${data}`
        })
      } else {
        Msg.error(message)
      }
    }).catch(error => {
      Msg.error('网络繁忙，请稍后再试！')
    })
  }
  handleClickFn = () => {
    window.sessionStorage.setItem('wechatModalStatus', '123')
    this.setState({
      show: false
    })
    clearInterval(this.timer)
  }
  render() {
    const { isBinding, show, qrCodeUrl } = this.state
    if (!isBinding && show && !window.sessionStorage.getItem('wechatModalStatus')) {
      return (
        <div className="out-wrapper">
          <div className="mask"></div>
          <div className="wechat-bind-wrapper">
            <div className="qrcode">
              <img src={qrCodeUrl} alt="二维码" />
            </div>
            <h6>关注微信公众号，绑定微信</h6>
            <p className="text">关注后：</p>
            <p className="text">1、你可以便捷接收业务提醒，查看业务消息。</p>
            <p className="text">2、你可以在登录时使用微信扫码登录。</p>
            <Button className="btn" onClick={this.handleClickFn}>稍后绑定</Button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default WechatBind