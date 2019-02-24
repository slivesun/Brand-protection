import './home.less'
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";

const Tpl = ThatMain((that) => {

    return (
        <div className='KEFUhome'>
            
            <div className='content'>
                <div className='contentBox'>
                    <h5 className="CONH" onClick={that.HDJCbtn} >今日活动稽查待办</h5>
                    <ul>
                        <li>
                            <span className="ContentSl">
                                <img src="../../../../img/home/Customer service_Customer service.png" alt=""/>
                            </span>
                            <span className="ContentSr">
                                <h4>{that.state.NeedRecheckSum}</h4>
                                <p>需复查客户数量</p>
                            </span>
                        </li>
                        <li>
                            <span className="ContentSl">
                                <img src="../../../../img/home/Customer service_activity.png" alt=""/>
                            </span>
                            <span className="ContentSr">
                                <h4>{that.state.RecheckSum}</h4>
                                <p>待复查活动</p>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className='contentBox'>
                <h5 className="CONH"  onClick={that.SPPCbtn}>商品库爬虫设置待办</h5>
                    <ul>
                        <li>
                            <span className="ContentSl">
                                <img src="../../../../img/home/Customer service_Commodity library.png" alt=""/>
                            </span>
                            <span className="ContentSr">
                                <h4>{that.state.reptileRecheckCustomSum}</h4>
                                <p>待设置客户数量</p>
                            </span>
                        </li>
                    </ul>

                </div>
                <div className='contentBox'>
                <h5 className="CONH"  onClick={that.SJJKbtn}>售价监控爬虫设置待办</h5>
                    <ul>
                        <li>
                            <span className="ContentSl">
                                <img src="../../../../img/home/Customer service_Price List.png" alt=""/>
                            </span>
                            <span className="ContentSr">
                                <h4>{that.state.priceMonitorCustomSum}</h4>
                                <p>待设置客户数量</p>
                            </span>
                        </li>
                        <li>
                            <span className="ContentSl">
                                <img src="../../../../img/home/Customer service_commodity.png" alt=""/>
                            </span>
                            <span className="ContentSr">
                                <h4>{that.state.priceMonitorProductSum}</h4>
                                <p>待设置产品数</p>
                            </span>
                        </li>
                    </ul>

                </div>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    )
})

export default Tpl