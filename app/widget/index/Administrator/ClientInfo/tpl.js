import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import SearchContent from './SearchContent';
import { Breadcrumb, Input, Button,Icon,Divider,Alert} from 'antd';
import FullSpin from '../../../components/FullSpin';

const Tpl = ThatMain((that) => {
    
    let { cus_name, des, targetId, page_info, bmaincustomer_list, spinning} = that.state;
    let { stateClient } = that.props;
    // stateClient=true
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
        <div className='clientinfo'>
            <FullSpin spinning={spinning} />
            <div style={!stateClient ? { display: 'flex' } : { display: 'none' }} className={!stateClient ? 'content search-show' : 'content'}>
                <div className='Breadcrumbbox'>
                    <Breadcrumb className='Breadcrumb'>
                        <Breadcrumb.Item>{that.state.ClientInfos=="/ClientInfos" ? "系统设置" : "系统设置"}</Breadcrumb.Item>
                        <Breadcrumb.Item>{that.state.ClientInfos=="/ClientInfos" ? `竞品商品库设置`:`商品库爬虫设置`}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='search-box'>
                    <div className='input-box'>
                    <h2>服务客户总数：{page_info.totalNum}</h2>
                    <div style={{    alignItems: 'center', display: 'flex'}}>
                        <span className='tit'>公司名称：</span>
                        <Input className='ipt' onChange={e => that.changeInput(e, 'cus_name')} value={cus_name} suffix={clearIcon('cus_name')} placeholder="请输入" />
                        <Button style={{marginLeft:'20px'}} onClick={that.searchSubmit}>查询</Button>
                    </div>
                    {/* <span className='tit' >备注名：</span>
                    <Input className='ipt' onChange={e => that.changeInput(e, 'des')} value={des} suffix={clearIcon('des')} placeholder="请输入" /> */}
                    </div>


                   
                </div>
                <ul id='items' className='items'>

                    {
                        bmaincustomer_list.length ?
                            bmaincustomer_list.map((item, index) => {
                                let { bmcid, companyname, company_memoname, brand_count, keyword_count, cat_count } = item
                                return (
                                    <li onClick={(e) => that.searchShow(e, bmcid)}  key={index} className='item'>
                                        <div className='top'>
                                            <div className='company'>
                                                <div className='tit'>
                                                    {companyname.substring(0, 1)}
                                                </div>
                                                <div className='info'>
                                                    <div className='title' >
                                                        {companyname}
                                                    </div>
                                                    <div>
                                                        备注名：{company_memoname}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='msg-info'>
                                                <div>
                                                    收录品牌：{brand_count}个
                                                </div>
                                                <Divider type="vertical" />
                                                <div>
                                                    关键词：{keyword_count}个
                                                </div>
                                                <Divider type="vertical" />
                                                <div>
                                                    涉及类目：{cat_count}个
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            <Alert style={{textAlign:'center',textAlign: 'center',width: '100%',height:'40px'}} message="暂无数据" type="error" />
                    }
                    {
                        +page_info.pageSize * +page_info.pageNo < page_info.totalNum ?
                            <li className='loading'>
                                <Button onClick={that.onLoading} className='loading-button'>加载更多...</Button>
                            </li>
                            : null
                    }

                </ul>
            </div>
            <SearchContent targetId={targetId} statex={that.state.ClientInfos} show={stateClient} onClose={e => that.searchHide(e)} />
            <Copyright />
            
           
        </div>
    )
})
export default Tpl