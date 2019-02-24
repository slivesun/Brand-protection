import './index.less'

const BrandIcon = props => {
  const ICON_CLASS = {
    '淘宝网': 'icon-taobao',
    '天猫商城': 'icon-tianmao',
    '京东商城': 'icon-jd',
    '苏宁易购': 'icon-suning',
    '国美在线': 'icon-gome',
    '拼多多': 'icon-pdd',
    '亚马逊': 'icon-amazon',
    '唯品会': 'icon-vip',
    '1688': 'icon-alibaba',
    '速卖通': 'icon-express'
  }
  return <i className={`ping-icon ${ICON_CLASS[props.pingName]}`}></i>
}

export default BrandIcon