import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import { Row, Col, Tag } from 'antd'

const Tpl = ThatMain(that => {
  const { dealer, shopList = [] } = that.state
  const {
    dealername,
    dutynumber,
    take_people,
    address='',
    contact,
    province='',
    city='',
    companyname_list = []
  } = dealer
  return (
    <ContentBox 
      title="经销商详情" 
      breadcrumbList={['用户管理', '经销商账号', '经销商详情']}
      linkList={['', '1', '']}
      history={that.props.history}
    >
        <section className="dealer-detail-wrapper">
          <h2 className="title">{dealername}</h2>
          <Row className="row">
            <Col span={8}>公司税号：{dutynumber}</Col>
            <Col span={16}>公司地址：{`${province}${city}${address}`}</Col>
            <Col span={8}>对接人：{take_people}</Col>
            <Col span={16}>联系方式：{contact}</Col>
          </Row>
          <div className="brands">
            合约品牌方：
            {
              !!companyname_list.length ? 
              companyname_list.map((v, i) => <Tag key={i} color="#f2f2f2" style={{color:'#333'}}>{v.companyname}</Tag>) :
              null
            }
          </div>
        </section>
        <section className="shop-list-wrapper">
          {
            !!shopList.length ?
            shopList.map((value, index) => {
              const {
                shop_name,
                shop_url,
                shop_type,
                bmcShopList = [],
                id
              } = value
              return (
                <div className="shop-item" key={id}>
                  <h3 className="title">{shop_name}</h3>
                  <Row>
                    <Col span={9} className="overflow-hidden">
                      店铺首页地址：<a href={shop_url} target="_blank">{shop_url}</a>
                    </Col>
                    <Col span={15}>
                      店铺类型：{shop_type}
                    </Col>
                  </Row>
                  <div className="brand">
                    授权品牌方：
                    {
                      !!bmcShopList.length ?
                      bmcShopList.map((v, i) => <Tag key={i} color="#fff" style={{color:'#333'}}>{v.bmcname}</Tag>) :
                      null
                    }
                  </div>
                </div>
              )
            }) :
            null
          }
        </section>
    </ContentBox>
  )
})

export default Tpl