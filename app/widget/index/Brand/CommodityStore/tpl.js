import './CommodityStore.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Card, Carousel, Icon, Row, Col } from "antd"
const Tpl = ThatMain((that) => {
    const styleSXx = {
        borderBottom: "2px solid #fff"
    }
    const styleSX = {
        color: "dodgerblue",
        borderBottom: "2px solid dodgerblue"
    }
    const CardStylex={
        cursor: "pointer",
        border:"1px solid dodgerblue"
    }
    const CardStyles={
        cursor: "pointer",
        border:"1px solid #fff"
    }
    return (
        <div className='CommodityStore'>

            <div className='content'>
                <div className="contentBox">
                    {
                        that.state.jingPinBrandList ? <ul>
                            {
                                that.state.jingPinBrandList.map((v, i) => {
                                    return <li key={i} style={that.state.styleSX == v.bid ? styleSX : styleSXx} onClick={() => that.JPList(v.bid)}>{v.name}</li>
                                })
                            }
                        </ul> : null
                    }


                </div>
                <div className="contentBox" style={{ height: "400px" }}>
                    <Card bodyStyle={{ padding: '0px', display: 'flex', flexGrow: '1' }} title="品牌商品库信息概览" bordered={false} style={{ width: '100%', display: 'flex', height: "100%", flexDirection: 'column', color: "#333" }}>
                        <div>
                            <Icon type="left" theme="outlined" style={{ fontSize: '30px', lineHeight: "344px", margin: "0px 5px", color: "#D9D9D9" }} onClick={that.handlePrev} />
                        </div>
                        {
                            that.state.JingPinPTx != "" ? <Carousel style={{ width: "95%", height: "320px" }} dots={false} beforeChange={that.beforeChange} afterChange={that.onChange} ref={that.refx}>
                                <div style={{ height: "320px", marginTop: "10px" }}>
                                    <Row gutter={16}>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginLeft: "30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[0].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[0].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[0].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[0].my_brand.itemcount}</b> {that.state.JingPinPTx[0].my_brand.itemcount < that.state.JingPinPTx[0].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[0].my_brand.shopcount}</b>{that.state.JingPinPTx[0].my_brand.shopcount < that.state.JingPinPTx[0].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[0].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[0].my_brand.shopcount / that.state.JingPinPTx[0].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[0].my_brand.shopcount / that.state.JingPinPTx[0].my_brand.itemcount) < parseInt(that.state.JingPinPTx[0].jingpin_brand.shopcount / that.state.JingPinPTx[0].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>

                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[0].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[0].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[0].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[0].jingpin_brand.shopcount / that.state.JingPinPTx[0].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", margin: "0 30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[1].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[1].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[1].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[1].my_brand.itemcount}</b> {that.state.JingPinPTx[1].my_brand.itemcount < that.state.JingPinPTx[1].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[1].my_brand.shopcount}</b>{that.state.JingPinPTx[1].my_brand.shopcount < that.state.JingPinPTx[1].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[1].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[1].my_brand.shopcount / that.state.JingPinPTx[1].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[1].my_brand.shopcount / that.state.JingPinPTx[1].my_brand.itemcount) < parseInt(that.state.JingPinPTx[1].jingpin_brand.shopcount / that.state.JingPinPTx[1].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5></div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>
                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[1].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[1].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[1].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[1].jingpin_brand.shopcount / that.state.JingPinPTx[1].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginRight: "30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[2].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[2].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[2].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[2].my_brand.itemcount}</b> {that.state.JingPinPTx[2].my_brand.itemcount < that.state.JingPinPTx[2].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[2].my_brand.shopcount}</b>{that.state.JingPinPTx[2].my_brand.shopcount < that.state.JingPinPTx[2].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[2].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[2].my_brand.shopcount / that.state.JingPinPTx[2].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[2].my_brand.shopcount / that.state.JingPinPTx[2].my_brand.itemcount) < parseInt(that.state.JingPinPTx[2].jingpin_brand.shopcount / that.state.JingPinPTx[2].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>
                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[2].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[2].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[2].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[2].jingpin_brand.shopcount / that.state.JingPinPTx[2].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ height: "320px", marginTop: "10px" }}>
                                    <Row gutter={16}>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginLeft: "30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[3].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[3].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[3].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[3].my_brand.itemcount}</b> {that.state.JingPinPTx[3].my_brand.itemcount < that.state.JingPinPTx[3].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[3].my_brand.shopcount}</b>{that.state.JingPinPTx[3].my_brand.shopcount < that.state.JingPinPTx[3].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[3].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[3].my_brand.shopcount / that.state.JingPinPTx[3].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[3].my_brand.shopcount / that.state.JingPinPTx[3].my_brand.itemcount) < parseInt(that.state.JingPinPTx[3].jingpin_brand.shopcount / that.state.JingPinPTx[3].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>

                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[3].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[3].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[3].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[3].jingpin_brand.shopcount / that.state.JingPinPTx[3].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", margin: "0 30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[4].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[4].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[4].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[4].my_brand.itemcount}</b> {that.state.JingPinPTx[4].my_brand.itemcount < that.state.JingPinPTx[4].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[4].my_brand.shopcount}</b>{that.state.JingPinPTx[4].my_brand.shopcount < that.state.JingPinPTx[4].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[4].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[4].my_brand.shopcount / that.state.JingPinPTx[4].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[4].my_brand.shopcount / that.state.JingPinPTx[4].my_brand.itemcount) < parseInt(that.state.JingPinPTx[4].jingpin_brand.shopcount / that.state.JingPinPTx[4].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>
                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[4].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[4].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[4].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[4].jingpin_brand.shopcount / that.state.JingPinPTx[4].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginRight: "30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[5].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[5].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[5].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[5].my_brand.itemcount}</b> {that.state.JingPinPTx[5].my_brand.itemcount < that.state.JingPinPTx[5].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[5].my_brand.shopcount}</b>{that.state.JingPinPTx[5].my_brand.shopcount < that.state.JingPinPTx[5].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[5].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[5].my_brand.shopcount / that.state.JingPinPTx[5].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[5].my_brand.shopcount / that.state.JingPinPTx[5].my_brand.itemcount) < parseInt(that.state.JingPinPTx[5].jingpin_brand.shopcount / that.state.JingPinPTx[5].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>
                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[5].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[5].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[5].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[5].jingpin_brand.shopcount / that.state.JingPinPTx[5].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ height: "320px", marginTop: "10px" }}>
                                    <Row gutter={16}>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginLeft: "30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[6].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[6].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[6].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[6].my_brand.itemcount}</b> {that.state.JingPinPTx[6].my_brand.itemcount < that.state.JingPinPTx[6].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[6].my_brand.shopcount}</b>{that.state.JingPinPTx[6].my_brand.shopcount < that.state.JingPinPTx[6].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[6].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[6].my_brand.shopcount / that.state.JingPinPTx[6].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[6].my_brand.shopcount / that.state.JingPinPTx[6].my_brand.itemcount) < parseInt(that.state.JingPinPTx[6].jingpin_brand.shopcount / that.state.JingPinPTx[6].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>

                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[6].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[6].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[6].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[6].jingpin_brand.shopcount / that.state.JingPinPTx[6].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", margin: "0 30px" }}>
                                            <Card style={that.state.CardStyle==that.state.JingPinPTx[7].platform_code ? CardStylex : CardStyles} onClick={()=>that.CardStyle(that.state.JingPinPTx[7].platform_code)} title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[7].platform_name}</b></div>} bordered={false}>
                                                <div className="CardDivs" style={{ float: "left", textAlign: "left" }}>
                                                    <h4>我的品牌</h4>
                                                    <h5><b>{that.state.JingPinPTx[7].my_brand.itemcount}</b> {that.state.JingPinPTx[7].my_brand.itemcount < that.state.JingPinPTx[7].jingpin_brand.itemcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}  </h5>
                                                    <h5><b>{that.state.JingPinPTx[7].my_brand.shopcount}</b>{that.state.JingPinPTx[7].my_brand.shopcount < that.state.JingPinPTx[7].jingpin_brand.shopcount ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                    <h5><b>{that.state.JingPinPTx[7].my_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[7].my_brand.shopcount / that.state.JingPinPTx[7].my_brand.itemcount) : 0}个/店</b>{parseInt(that.state.JingPinPTx[7].my_brand.shopcount / that.state.JingPinPTx[7].my_brand.itemcount) < parseInt(that.state.JingPinPTx[7].jingpin_brand.shopcount / that.state.JingPinPTx[7].jingpin_brand.itemcount) ? <img src="../../../../img/icon/under.png" alt="" /> : null}</h5>
                                                </div>
                                                <div className="CardDiv" style={{ float: "left", width: "104px", textAlign: "center" }}>
                                                    <h4>
                                                        <b className="vs">vs</b>
                                                    </h4>
                                                    <h5 style={{ marginTop: "12px" }}>店铺数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>商品数</h5>
                                                    <h5 style={{ marginTop: "20px" }}>平均铺货密度</h5>
                                                </div>
                                                <div className="CardDivs" style={{ float: "right", textAlign: "right" }}>
                                                    <h4>竞品品牌</h4>
                                                    <h5>{that.state.JingPinPTx[7].jingpin_brand.itemcount} </h5>
                                                    <h5>{that.state.JingPinPTx[7].jingpin_brand.shopcount}</h5>
                                                    <h5>{that.state.JingPinPTx[7].jingpin_brand.itemcount > 0 ? parseInt(that.state.JingPinPTx[7].jingpin_brand.shopcount / that.state.JingPinPTx[7].jingpin_brand.itemcount) : 0}/个店</h5>
                                                </div>
                                            </Card>
                                        </Col>
                                        {/* <Col span={7} style={{ padding: "0px", background: "rgba(255,255,255,1)", boxShadow: "0px 3px 8px 0px rgba(11,72,120,0.15)", marginRight: "30px" }}>
                                        <Card title={<div style={{ width: "100%" }}> <img style={{ float: "left", marginLeft: "80px", width: "34px", height: "34px" }} src="../../../../img/icon/tao.png" /> <b style={{ fontSize: "14px", color: "#666", float: "left", marginTop: " 5px", marginLeft: "10px" }}>{that.state.JingPinPTx[1].platform_name}</b></div>} bordered={false}>
                                          
                                        </Card>
                                    </Col> */}
                                    </Row>
                                </div>
                            </Carousel> : null}
                        <div>
                            <Icon type="right" theme="outlined" style={{ fontSize: '30px', lineHeight: "344px", margin: "0px 5px", color: "#D9D9D9" }} onClick={that.handleNext} />
                        </div>
                    </Card>

                </div>
                <div className="contentBox" style={{ background: "#f2f2f9" }}>
                    <Row gutter={16} style={{ margin: "0" }}>
                        <Col span={14} style={{ background: "#fff" }}>
                            <Card title="价格区间内商品数量占比分布" style={{ color: "#333333", fontSize: "16px" }} bordered={false} />
                            <div id="container">

                            </div>
                        </Col>
                        <Col span={10}>
                            <Card title="重合店铺占比" style={{ color: "#333333", fontSize: "16px" }} bordered={false} />
                            <div id='echartsxx' style={{ background: "#fff" }}>

                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl