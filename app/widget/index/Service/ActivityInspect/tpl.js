import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright"

import { Input, Button, Row, Col, Icon } from 'antd'

const Tpl = ThatMain(that => {
    const { waitInspectList = [], brandName } = that.state

    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
      }

    return (
        <div className="service-activity-inspect">
            <header>活动稽查</header>
            <main>
                <section className="summary">
                    <div className="left">服务客户数量：{waitInspectList.length}</div>
                    <div className="right">
                        公司名称
                        &nbsp;&nbsp;
                        <Input 
                            placeholder="请输入" 
                            value={brandName}
                            style={{width:'242px'}} 
                            onChange={that.handleInputChange} 
                            suffix={<Icon type="close-circle" style={clearIconStyle} onClick={that.handleClearIconClick} />}
                        />
                        &nbsp;&nbsp;
                        <Button style={{color:'#1890ff',borderColor:'#1890ff'}} onClick={that.handleBtnClick}>查询</Button>
                    </div>
                </section>
                <section className="card-wrapper">
                    <Row type="flex">
                        {
                            !!waitInspectList.length && waitInspectList.map((value, index) => {
                                return (
                                    <Col span={6} key={index} onClick={that.goToDetail.bind(that, value.bmcid)}>
                                        <h3>{value.brand_name}</h3>
                                        <p>今日待稽查活动：{value.act_count}</p>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
            </main>
            <footer className="footer">
                <Copyright />
            </footer>
        </div>
    )
})

export default Tpl