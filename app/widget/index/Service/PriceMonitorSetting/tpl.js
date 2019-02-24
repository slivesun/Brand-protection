
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Avatar, Icon, Divider, Input, Select, Button,Alert } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList, totalElements, pageSize, pageNum, companyname } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName]&&that.state[fieldName].length?
        <Icon
            type="close-circle"
            onClick={()=>that.handleClearIconClick(fieldName)}
            style={clearIconStyle}
        />
        :null
    )
    return (
        <div className='price-monitor-setting'>
            <div className='Breadcrumb'>
                <Breadcrumb>


                    <Breadcrumb.Item>
                        系统设置
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>售价监控设置</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='content'>
                <div className='search-box'>
                    <div>
                        服务客户数量：{totalElements}
                    </div>
                    <div className='input-box'>
                        <span>公司名称:</span>
                        <Input onChange={(e) => that.onChangeInput(e)} suffix={clearIcon('companyname')} style={{width:'200px'}} value={companyname} />
                        <Button onClick={() => that.getList(1)}>查询</Button>
                    </div>
                </div>
                <ul className='items'>
                    {
                        dataList.length ?
                        dataList.map((item, index) => {
                            let {bmcid,companyname,brand_count,keyword_count,cat_count} = item;
                            return (
                                <li className='item' key={index}>
                                    <div className='comp-box'>
                                        <Avatar 
                                        style={{ backgroundColor: '#108CEE', margin: '0px 20px' }} 
                                        size={40}>
                                            {companyname.substr(0, 1)}
                                        </Avatar>
                                        <div style={{paddingTop:'14px'}}>
                                            <a href={`/index.html#/ProductClass/${bmcid}`}>
                                                <span className='text-overflow'>{companyname}</span>
                                            </a>
                                            <p style={{paddingTop:'13px',fontSize:'13px'}}>待设置产品信息：{Number(brand_count)}</p>
                                        </div>
                                    </div>
                                    <div className='footer-buts'>
                                        <span>监控产品分类：{Number(keyword_count)}</span>
                                        <Divider type="vertical" />
                                        <span>监控产品数：{Number(cat_count)}</span>
                                    </div>
                                </li>
                            )
                        })
                        :
                        <Alert style={{textAlign:'center',textAlign: 'center',width: '100%',height:'40px',marginTop: '20px'}} message="暂无数据" type="error" />
                    }

                </ul>
                <div style={{ textAlign: 'center' }} className='addbut'>
                    {
                        pageNum * pageSize >= totalElements ? null :
                            <Button onClick={() => that.getMore()}>加载更多...</Button>
                    }
                </div>
            </div>
            <Copyright clazzName='copyright' />

        </div>
    )
})



export default Tpl
