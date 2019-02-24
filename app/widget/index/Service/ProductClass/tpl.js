
import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout'
import { Breadcrumb, Avatar, Input,Icon, Select, Button ,Alert} from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList, totalElements, pageSize, pageNum, productClassifyName, companyname } = that.state;
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
        <ContentBox
            breadcrumbList={['售价监控设置', '产品分类']}
            linkList={['', '']}
        >
        <div className='productclass'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>

                    
                    <Breadcrumb.Item>
                            售价监控设置
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>产品分类</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}

            <div className='content'>
                <div className='search-box'>
                    <div>
                        {companyname}
                    </div>
                    <div className='input-box'>
                        <span style={{fontSize:'14px'}}>分类名称:</span>
                        <Input onChange={(e) => that.onChangeInput(e) }  suffix={clearIcon('productClassifyName')} style={{width:'200px'}}  value={productClassifyName} />
                        <Button onClick={() => that.getList(1)}>查询</Button>
                    </div>

                </div>
                <ul className='items'>
                    {
                        dataList.length ? 
                        dataList.map((item, index) => {
                            let { id, productClassifyName, pro_count } = item;
                            return (
                                <li className='item' key={index}>
                                    <div className='comp-box'>
                                        <Avatar
                                            style={{ backgroundColor: '#108CEE', margin: '0px 20px' }}
                                            size={40}>
                                            {productClassifyName.substr(0, 1)}
                                        </Avatar>
                                        <div style={{ paddingTop: '14px' }}>
                                            <a href={`/index.html#/KeywordSetting/${id}`}>
                                                <span className='text-overflow'>{productClassifyName}</span>
                                            </a>
                                            <p style={{ paddingTop: '23px', fontSize: '13px' }}>待设置产品信息：{Number(pro_count)}</p>
                                        </div>
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
            {/* <Copyright clazzName='copyright' /> */}

        </div>
        </ContentBox>
    )
})



export default Tpl
